import { GoogleGenerativeAI } from "@google/generative-ai";
import { AISummaryResult, ShipmentEvent } from "@/types/shipment";

const SYSTEM_PROMPT = `You are a parcel tracking assistant. You will receive a list of technical shipment events in JSON format. Your tasks are: 1) Write a brief, friendly summary in Czech (2–3 sentences) from the perspective of the recipient. 2) Estimate the delivery date and time if the data makes this possible. 3) Flag any issues or delays clearly. Write naturally, without technical jargon. Do not use bullet points. Respond only with a JSON object in this exact format: { "summary": string, "estimatedDelivery": string | null, "hasIssue": boolean, "issueDescription": string | null }`;

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return genAI;
}

export async function summarizeShipmentEvents(
  events: ShipmentEvent[]
): Promise<AISummaryResult> {
  const client = getClient();
  const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

  const eventsData = events.map((e) => ({
    timestamp: e.timestamp,
    location: e.location,
    status: e.statusCode,
    description: e.descriptionRaw,
  }));

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: SYSTEM_PROMPT + "\n\n" + JSON.stringify(eventsData) },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.3,
    },
  });

  const responseText = result.response.text();
  if (!responseText) {
    throw new Error("No text response from Gemini");
  }

  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
    return {
      summary: parsed.summary,
      estimatedDelivery: parsed.estimatedDelivery || null,
      confidence: parsed.confidence ?? 0.7,
      hasIssue: parsed.hasIssue ?? false,
      issueDescription: parsed.issueDescription || null,
    };
  } catch {
    return {
      summary: responseText,
      estimatedDelivery: null,
      confidence: 0.5,
      hasIssue: false,
      issueDescription: null,
    };
  }
}
