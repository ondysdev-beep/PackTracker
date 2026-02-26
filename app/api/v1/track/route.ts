import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getTrackingProvider } from "@/lib/tracking/provider";
import { detectCarrier } from "@/lib/tracking/carriers";
import { summarizeShipmentEvents } from "@/lib/ai/gemini";
import { apiRateLimiter, checkRateLimit } from "@/lib/ratelimit";

const TrackSchema = z.object({
  trackingNumber: z.string().min(1, "Sledovací číslo je povinné"),
  carrier: z.string().optional(),
});

async function validateApiKey(
  request: NextRequest
): Promise<{ userId: string } | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const apiKey = authHeader.substring(7);
  const supabase = createServerSupabaseClient();

  const { data: apiKeys } = await supabase
    .from("api_keys")
    .select("id, user_id, key_hash");

  if (!apiKeys) return null;

  for (const key of apiKeys) {
    const isValid = await bcryptjs.compare(apiKey, key.key_hash);
    if (isValid) {
      await supabase
        .from("api_keys")
        .update({
          last_used_at: new Date().toISOString(),
          requests_this_month: (key as Record<string, unknown>).requests_this_month
            ? ((key as Record<string, unknown>).requests_this_month as number) + 1
            : 1,
        })
        .eq("id", key.id);

      return { userId: key.user_id };
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await validateApiKey(request);

    if (!auth) {
      return NextResponse.json(
        { error: "Neplatný nebo chybějící API klíč" },
        { status: 401 }
      );
    }

    try {
      const limiter = apiRateLimiter.pro();

      const rateLimit = await checkRateLimit(limiter, auth.userId);
      if (!rateLimit.success) {
        return NextResponse.json(
          { error: "Překročen limit požadavků" },
          {
            status: 429,
            headers: {
              "Retry-After": String(
                Math.ceil((rateLimit.reset - Date.now()) / 1000)
              ),
              "X-RateLimit-Remaining": String(rateLimit.remaining),
            },
          }
        );
      }
    } catch {
      // Rate limiting unavailable — continue
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

    const events = trackingResult.events.map((e) => ({
      timestamp: e.timestamp,
      location: e.location,
      status_code: e.statusCode,
      description_raw: e.descriptionRaw,
    }));

    const { data: existingShipment } = await supabase
      .from("shipments")
      .select("id")
      .eq("tracking_number", trackingNumber)
      .eq("user_id", auth.userId)
      .maybeSingle();

    let shipmentId: string;

    if (existingShipment) {
      shipmentId = existingShipment.id;
      await supabase
        .from("shipments")
        .update({
          carrier_code: trackingResult.carrierCode,
          current_status: trackingResult.currentStatus,
          raw_events: events,
          last_updated: new Date().toISOString(),
        })
        .eq("id", shipmentId);

      await supabase.from("events").delete().eq("shipment_id", shipmentId);
    } else {
      const { data: newShipment } = await supabase
        .from("shipments")
        .insert({
          user_id: auth.userId,
          tracking_number: trackingNumber,
          carrier_code: trackingResult.carrierCode,
          current_status: trackingResult.currentStatus,
          raw_events: events,
          last_updated: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (!newShipment) {
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
        descriptionHuman: null,
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
      // AI summary failed
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
            trackingNumber: shipment.tracking_number,
            carrierCode: shipment.carrier_code,
            currentStatus: shipment.current_status,
            lastUpdated: shipment.last_updated,
            aiSummary: shipment.ai_summary,
            estimatedDelivery: shipment.estimated_delivery,
          }
        : null,
      events: (savedEvents || []).map((e: Record<string, unknown>) => ({
        id: e.id,
        timestamp: e.timestamp,
        location: e.location,
        statusCode: e.status_code,
        descriptionRaw: e.description_raw,
        descriptionHuman: e.description_human,
      })),
      aiSummary,
    });
  } catch (error) {
    console.error("Public API track error:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 }
    );
  }
}
