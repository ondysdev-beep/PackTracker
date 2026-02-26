export type ShipmentStatus =
  | "pending"
  | "info_received"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed_attempt"
  | "exception"
  | "expired"
  | "unknown";

export interface ShipmentEvent {
  id: string;
  shipmentId: string;
  timestamp: string;
  location: string | null;
  statusCode: string;
  descriptionRaw: string;
  descriptionHuman: string | null;
}

export interface Shipment {
  id: string;
  userId: string | null;
  trackingNumber: string;
  carrierCode: string;
  label: string | null;
  createdAt: string;
  lastUpdated: string | null;
  currentStatus: ShipmentStatus;
  rawEvents: Record<string, unknown>[] | null;
  aiSummary: string | null;
  estimatedDelivery: string | null;
}

export interface TrackingResult {
  shipment: Shipment;
  events: ShipmentEvent[];
  aiSummary: AISummaryResult | null;
}

export interface AISummaryResult {
  summary: string;
  estimatedDelivery: string | null;
  confidence: number;
  hasIssue: boolean;
  issueDescription: string | null;
}

export interface TrackRequest {
  trackingNumber: string;
  carrier?: string;
}

export interface ShipmentsQuery {
  status?: ShipmentStatus;
  search?: string;
  limit?: number;
  offset?: number;
}
