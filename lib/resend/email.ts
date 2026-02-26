import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY!);
  }
  return resendClient;
}

interface StatusChangeEmailParams {
  to: string;
  shipmentLabel: string;
  trackingNumber: string;
  newStatus: string;
  location: string | null;
  trackingUrl: string;
}

export async function sendStatusChangeEmail({
  to,
  shipmentLabel,
  trackingNumber,
  newStatus,
  location,
  trackingUrl,
}: StatusChangeEmailParams) {
  const resend = getResend();

  const statusText = getStatusText(newStatus);
  const locationText = location ? ` • ${location}` : "";

  await resend.emails.send({
    from: "TrackFlow <noreply@trackflow.cz>",
    to,
    subject: `${shipmentLabel || trackingNumber} — ${statusText}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="margin-bottom:32px;">
      <h1 style="color:#4fffb0;font-size:24px;font-weight:700;margin:0;">TrackFlow</h1>
    </div>
    <div style="background-color:#111118;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;">
      <h2 style="color:#f0f0f5;font-size:18px;font-weight:600;margin:0 0 8px;">
        ${shipmentLabel || "Vaše zásilka"}
      </h2>
      <p style="color:#6b6b80;font-size:14px;margin:0 0 24px;font-family:'DM Mono',monospace;">
        ${trackingNumber}
      </p>
      <div style="background-color:#1a1a25;border-radius:12px;padding:16px;margin-bottom:24px;">
        <p style="color:#4fffb0;font-size:16px;font-weight:500;margin:0;">
          ${statusText}${locationText}
        </p>
      </div>
      <a href="${trackingUrl}" style="display:inline-block;background-color:#4fffb0;color:#0a0a0f;text-decoration:none;padding:12px 24px;border-radius:12px;font-weight:500;font-size:14px;">
        Zobrazit detail zásilky
      </a>
    </div>
    <p style="color:#6b6b80;font-size:12px;text-align:center;margin-top:32px;">
      TrackFlow — Chytré sledování zásilek
    </p>
  </div>
</body>
</html>
    `.trim(),
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
    expired: "Vypršela platnost sledování",
    unknown: "Neznámý stav",
  };
  return statusMap[status] || status;
}
