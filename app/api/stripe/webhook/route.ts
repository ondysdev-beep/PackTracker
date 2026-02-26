import { NextResponse } from "next/server";

export const runtime = "edge";

// Stripe removed — all features are free
export async function POST() {
  return NextResponse.json(
    { error: "Platby nejsou aktivní. Všechny funkce jsou zdarma." },
    { status: 410 }
  );
}
