import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const SubscribeSchema = z.object({
  shipmentId: z.string().uuid("Neplatné ID zásilky"),
  email: z.boolean().default(true),
  sms: z.boolean().default(false),
  push: z.boolean().default(false),
  phoneNumber: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Pro zapnutí upozornění se musíte přihlásit" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = SubscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { shipmentId, email, sms, push, phoneNumber } = parsed.data;

    const { data: shipment } = await supabase
      .from("shipments")
      .select("id")
      .eq("id", shipmentId)
      .maybeSingle();

    if (!shipment) {
      return NextResponse.json(
        { error: "Zásilka nenalezena" },
        { status: 404 }
      );
    }

    const { data: existing } = await supabase
      .from("notification_settings")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("shipment_id", shipmentId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("notification_settings")
        .update({
          email,
          sms,
          push,
          phone_number: phoneNumber || null,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("notification_settings").insert({
        user_id: session.user.id,
        shipment_id: shipmentId,
        email,
        sms,
        push,
        phone_number: phoneNumber || null,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify subscribe error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se nastavit upozornění" },
      { status: 500 }
    );
  }
}
