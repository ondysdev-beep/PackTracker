import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const QuerySchema = z.object({
  status: z.string().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
  offset: z.coerce.number().min(0).optional().default(0),
});

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Přihlaste se pro zobrazení zásilek" },
        { status: 401 }
      );
    }

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = QuerySchema.safeParse(searchParams);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Neplatné parametry dotazu" },
        { status: 400 }
      );
    }

    const { status, search, limit, offset } = parsed.data;

    let query = supabase
      .from("shipments")
      .select("*", { count: "exact" })
      .eq("user_id", session.user.id)
      .order("last_updated", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq("current_status", status);
    }

    if (search) {
      query = query.or(
        `tracking_number.ilike.%${search}%,label.ilike.%${search}%`
      );
    }

    const { data: shipments, count, error } = await query;

    if (error) {
      console.error("Shipments query error:", error);
      return NextResponse.json(
        { error: "Nepodařilo se načíst zásilky" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      shipments: (shipments || []).map((s: Record<string, unknown>) => ({
        id: s.id,
        userId: s.user_id,
        trackingNumber: s.tracking_number,
        carrierCode: s.carrier_code,
        label: s.label,
        createdAt: s.created_at,
        lastUpdated: s.last_updated,
        currentStatus: s.current_status,
        rawEvents: s.raw_events,
        aiSummary: s.ai_summary,
        estimatedDelivery: s.estimated_delivery,
      })),
      total: count || 0,
    });
  } catch (error) {
    console.error("Shipments API error:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 }
    );
  }
}
