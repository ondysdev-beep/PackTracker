export interface TrackingEvent {
  timestamp: string;
  location: string | null;
  statusCode: string;
  descriptionRaw: string;
  descriptionHuman?: string | null;
}

export interface ProviderResponse {
  trackingNumber: string;
  carrierCode: string;
  currentStatus: string;
  events: TrackingEvent[];
  origin: string | null;
  destination: string | null;
}
