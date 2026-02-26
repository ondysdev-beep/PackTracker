import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getTrackingProvider } from "@/lib/tracking/provider";
import { detectCarrier } from "@/lib/tracking/carriers";

import { summarizeShipmentEvents } from "@/lib/ai/gemini";
import { trackRateLimiter, checkRateLimit } from "@/lib/ratelimit";

const TrackSchema = z.object({
  trackingNumber: z.string().min(1, "Sledovací číslo je povinné"),
  carrier: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";

    try {
      const limiter = trackRateLimiter();
      const rateLimit = await checkRateLimit(limiter, ip);
      if (!rateLimit.success) {
        return NextResponse.json(
          { error: "Příliš mnoho požadavků. Zkuste to později." },
          {
            status: 429,
            headers: {
              "Retry-After": String(Math.ceil((rateLimit.reset - Date.now()) / 1000)),
            },
          }
        );
      }
    } catch {
      // Rate limiting unavailable — continue without it
    }

    const body = await request.json();
    const parsed = TrackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { trackingNumber, carrier } = parsed.data;
    const carrierCode = carrier || detectCarrier(trackingNumber) || "auto";

    const provider = getTrackingProvider();
    const trackingResult = await provider.track(trackingNumber, carrierCode);

    const supabase = createServerSupabaseClient();

    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id || null;

    const { data: existingShipment } = await supabase
      .from("shipments")
      .select("id, raw_events")
      .eq("tracking_number", trackingNumber)
      .maybeSingle();

    let shipmentId: string;
    const events = trackingResult.events.map((e) => ({
      timestamp: e.timestamp,
      location: e.location,
      status_code: e.statusCode,
      description_raw: e.descriptionRaw,
      description_human: e.descriptionHuman || null,
    }));

    if (existingShipment) {
      shipmentId = existingShipment.id;

      await supabase
        .from("shipments")
        .update({
          carrier_code: trackingResult.carrierCode,
          current_status: trackingResult.currentStatus,
          raw_events: events,
          last_updated: new Date().toISOString(),
          ...(userId && !existingShipment ? { user_id: userId } : {}),
        })
        .eq("id", shipmentId);

      await supabase.from("events").delete().eq("shipment_id", shipmentId);
    } else {
      const { data: newShipment, error: insertError } = await supabase
        .from("shipments")
        .insert({
          user_id: userId,
          tracking_number: trackingNumber,
          carrier_code: trackingResult.carrierCode,
          current_status: trackingResult.currentStatus,
          raw_events: events,
          last_updated: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (insertError || !newShipment) {
        return NextResponse.json(
          { error: "Nepodařilo se uložit zásilku" },
          { status: 500 }
        );
      }

      shipmentId = newShipment.id;
    }

    const eventRows = trackingResult.events.map((e) => ({
      shipment_id: shipmentId,
      timestamp: e.timestamp,
      location: e.location,
      status_code: e.statusCode,
      description_raw: e.descriptionRaw,
      description_human: e.descriptionHuman || null,
    }));

    if (eventRows.length > 0) {
      await supabase.from("events").insert(eventRows);
    }

    let aiSummary = null;
    try {
      const eventsForAI = trackingResult.events.map((e, i) => ({
        id: `evt-${i}`,
        shipmentId,
        timestamp: e.timestamp,
        location: e.location,
        statusCode: e.statusCode,
        descriptionRaw: e.descriptionRaw,
        descriptionHuman: e.descriptionHuman || null,
      }));

      if (eventsForAI.length > 0) {
        aiSummary = await summarizeShipmentEvents(eventsForAI);

        await supabase
          .from("shipments")
          .update({
            ai_summary: aiSummary.summary,
            estimated_delivery: aiSummary.estimatedDelivery,
          })
          .eq("id", shipmentId);
      }
    } catch {
      // AI summary failed — continue without it
    }

    const { data: shipment } = await supabase
      .from("shipments")
      .select("*")
      .eq("id", shipmentId)
      .single();

    const { data: savedEvents } = await supabase
      .from("events")
      .select("*")
      .eq("shipment_id", shipmentId)
      .order("timestamp", { ascending: false });

    return NextResponse.json({
      shipment: shipment
        ? {
            id: shipment.id,
            userId: shipment.user_id,
            trackingNumber: shipment.tracking_number,
            carrierCode: shipment.carrier_code,
            label: shipment.label,
            createdAt: shipment.created_at,
            lastUpdated: shipment.last_updated,
            currentStatus: shipment.current_status,
            rawEvents: shipment.raw_events,
            aiSummary: shipment.ai_summary,
            estimatedDelivery: shipment.estimated_delivery,
          }
        : null,
      events: (savedEvents || []).map((e: Record<string, unknown>) => ({
        id: e.id,
        shipmentId: e.shipment_id,
        timestamp: e.timestamp,
        location: e.location,
        statusCode: e.status_code,
        descriptionRaw: e.description_raw,
        descriptionHuman: e.description_human,
      })),
      aiSummary,
    });
  } catch (error) {
    console.error("Track API error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se načíst informace o zásilce" },
      { status: 500 }
    );
  }
}
