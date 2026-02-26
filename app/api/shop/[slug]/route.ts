import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createServerSupabaseClient();

    const { data: shop, error } = await supabase
      .from("shops")
      .select("id, slug, name, logo_url, primary_color, domain")
      .eq("slug", params.slug)
      .single();

    if (error || !shop) {
      return NextResponse.json(
        { error: "Obchod nenalezen" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      shop: {
        id: shop.id,
        slug: shop.slug,
        name: shop.name,
        logoUrl: shop.logo_url,
        primaryColor: shop.primary_color,
        domain: shop.domain,
      },
    });
  } catch (error) {
    console.error("Shop API error:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 }
    );
  }
}
