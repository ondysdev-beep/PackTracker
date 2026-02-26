import { ProviderResponse } from "@/types/events";
import { TrackingMoreProvider } from "./17track";

export interface TrackingProvider {
  name: string;
  track(trackingNumber: string, carrierCode: string): Promise<ProviderResponse>;
}

let currentProvider: TrackingProvider | null = null;

export function setTrackingProvider(provider: TrackingProvider) {
  currentProvider = provider;
}

export function getTrackingProvider(): TrackingProvider {
  if (!currentProvider) {
    currentProvider = new TrackingMoreProvider();
  }
  return currentProvider;
}
