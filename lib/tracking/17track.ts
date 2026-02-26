import { ProviderResponse, TrackingEvent } from "@/types/events";
import { TrackingProvider } from "./provider";

export class TrackingMoreProvider implements TrackingProvider {
  name = "TrackingMore";
  private apiKey: string;
  private baseUrl = "https://api.trackingmore.com/v4";

  constructor() {
    this.apiKey = process.env.TRACKINGMORE_API_KEY || "";
  }

  async track(
    trackingNumber: string,
    carrierCode: string
  ): Promise<ProviderResponse> {
    const response = await fetch(`${this.baseUrl}/trackings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Tracking-Api-Key": this.apiKey,
      },
      body: JSON.stringify({
        tracking_number: trackingNumber,
        courier_code: this.mapCarrierCode(carrierCode),
      }),
    });

    if (response.status === 409) {
      return this.getExistingTracking(trackingNumber, carrierCode);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `TrackingMore API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return this.normalizeResponse(data.data, trackingNumber, carrierCode);
  }

  private async getExistingTracking(
    trackingNumber: string,
    carrierCode: string
  ): Promise<ProviderResponse> {
    const mappedCode = this.mapCarrierCode(carrierCode);
    const response = await fetch(
      `${this.baseUrl}/trackings/${mappedCode}/${trackingNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Tracking-Api-Key": this.apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TrackingMore API error: ${response.status}`);
    }

    const data = await response.json();
    return this.normalizeResponse(data.data, trackingNumber, carrierCode);
  }

  private normalizeResponse(
    data: Record<string, unknown>,
    trackingNumber: string,
    carrierCode: string
  ): ProviderResponse {
    const originInfo = data.origin_info as Record<string, unknown> | undefined;
    const destinationInfo = data.destination_info as Record<string, unknown> | undefined;

    const rawEvents: Record<string, unknown>[] = [];

    if (originInfo?.trackinfo && Array.isArray(originInfo.trackinfo)) {
      rawEvents.push(...(originInfo.trackinfo as Record<string, unknown>[]));
    }
    if (destinationInfo?.trackinfo && Array.isArray(destinationInfo.trackinfo)) {
      rawEvents.push(...(destinationInfo.trackinfo as Record<string, unknown>[]));
    }

    const events: TrackingEvent[] = rawEvents.map((event) => ({
      timestamp: (event.Date as string) || new Date().toISOString(),
      location: (event.Details as string) || null,
      statusCode: (event.checkpoint_status as string) || "in_transit",
      descriptionRaw: (event.StatusDescription as string) || "",
    }));

    events.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return {
      trackingNumber,
      carrierCode,
      currentStatus: this.mapStatus(
        (data.delivery_status as string) || "pending"
      ),
      events,
      origin: (data.original_country as string) || null,
      destination: (data.destination_country as string) || null,
    };
  }

  private mapStatus(status: string): string {
    const statusMap: Record<string, string> = {
      pending: "pending",
      notfound: "pending",
      transit: "in_transit",
      pickup: "in_transit",
      delivered: "delivered",
      expired: "expired",
      undelivered: "failed_attempt",
      exception: "exception",
      inforeceived: "info_received",
    };
    return statusMap[status.toLowerCase()] || "unknown";
  }

  private mapCarrierCode(code: string): string {
    const carrierMap: Record<string, string> = {
      ppl: "ppl",
      dpd: "dpd",
      gls: "gls",
      zasilkovna: "zasilkovna",
      dhl: "dhl",
      "ceska-posta": "ceskaposta",
      ups: "ups",
      fedex: "fedex",
    };
    return carrierMap[code] || code;
  }
}
