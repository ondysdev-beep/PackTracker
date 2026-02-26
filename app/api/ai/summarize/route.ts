import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { summarizeShipmentEvents } from "@/lib/ai/gemini";

const SummarizeSchema = z.object({
  events: z.array(
    z.object({
      id: z.string().optional().default(""),
      shipmentId: z.string().optional().default(""),
      timestamp: z.string(),
      location: z.string().nullable(),
      statusCode: z.string(),
      descriptionRaw: z.string(),
      descriptionHuman: z.string().nullable().optional(),
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SummarizeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Neplatný formát událostí" },
        { status: 400 }
      );
    }

    const { events } = parsed.data;

    if (events.length === 0) {
      return NextResponse.json(
        { error: "Žádné události k shrnutí" },
        { status: 400 }
      );
    }

    const eventsForAI = events.map((e, i) => ({
      id: e.id || `evt-${i}`,
      shipmentId: e.shipmentId || "",
      timestamp: e.timestamp,
      location: e.location,
      statusCode: e.statusCode,
      descriptionRaw: e.descriptionRaw,
      descriptionHuman: e.descriptionHuman || null,
    }));

    const result = await summarizeShipmentEvents(eventsForAI);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Summarize error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se vytvořit shrnutí" },
      { status: 500 }
    );
  }
}
