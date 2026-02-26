import twilio from "twilio";

let twilioClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (!twilioClient) {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
  }
  return twilioClient;
}

interface SmsParams {
  to: string;
  shipmentLabel: string;
  trackingNumber: string;
  newStatus: string;
  location: string | null;
}

export async function sendStatusChangeSms({
  to,
  shipmentLabel,
  trackingNumber,
  newStatus,
  location,
}: SmsParams) {
  const client = getTwilioClient();
  const statusText = getStatusText(newStatus);
  const locationText = location ? ` (${location})` : "";
  const label = shipmentLabel || trackingNumber;

  await client.messages.create({
    body: `TrackFlow: ${label} — ${statusText}${locationText}`,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to,
  });
}

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Čeká na vyzvednutí",
    info_received: "Informace přijaty",
    in_transit: "Na cestě",
    out_for_delivery: "Doručuje se",
    delivered: "Doručeno",
    failed_attempt: "Neúspěšný pokus o doručení",
    exception: "Problém se zásilkou",
    expired: "Vypršela platnost",
    unknown: "Neznámý stav",
  };
  return statusMap[status] || status;
}
