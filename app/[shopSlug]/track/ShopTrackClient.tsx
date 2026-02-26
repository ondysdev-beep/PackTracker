"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BrandedLayout from "@/components/BrandedLayout";
import TrackingCard from "@/components/TrackingCard";
import Timeline from "@/components/Timeline";
import AISummary from "@/components/AISummary";
import SearchInput from "@/components/SearchInput";
import { Shop } from "@/types/shop";
import { TrackingResult } from "@/types/shipment";

export default function ShopTrackClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const shopSlug = params.shopSlug as string;
  const trackingNumber = searchParams.get("q") || "";

  const [shop, setShop] = useState<Shop | null>(null);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [isLoadingShop, setIsLoadingShop] = useState(true);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShop() {
      try {
        const response = await fetch(`/api/shop/${shopSlug}`);
        if (response.ok) {
          const data = await response.json();
          setShop(data.shop);
        } else {
          setError("Obchod nenalezen");
        }
      } catch {
        setError("Nepodařilo se načíst data obchodu");
      } finally {
        setIsLoadingShop(false);
      }
    }

    fetchShop();
  }, [shopSlug]);

  useEffect(() => {
    async function fetchTracking() {
      if (!trackingNumber) return;
      setIsLoadingTrack(true);
      try {
        const response = await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trackingNumber }),
        });

        if (response.ok) {
          const data = await response.json();
          setResult(data);
        }
      } catch {
        setError("Nepodařilo se načíst zásilku");
      } finally {
        setIsLoadingTrack(false);
      }
    }

    fetchTracking();
  }, [trackingNumber]);

  if (isLoadingShop) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4">
        <div className="rounded-2xl border border-border bg-surface1 p-8 text-center">
          <h2 className="font-syne text-xl font-bold text-text-primary">
            {error || "Stránka nenalezena"}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <BrandedLayout shop={shop}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1
            className="font-syne text-2xl font-bold"
            style={{ color: shop.primaryColor }}
          >
            Sledování zásilky
          </h1>
          <div className="mt-4">
            <SearchInput
              size="sm"
              placeholder="Zadejte číslo zásilky..."
              defaultValue={trackingNumber}
            />
          </div>
        </div>

        {isLoadingTrack && (
          <div className="flex justify-center py-8">
            <div
              className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: shop.primaryColor }}
            />
          </div>
        )}

        {result && (
          <>
            <TrackingCard shipment={result.shipment} />
            {result.aiSummary && <AISummary summary={result.aiSummary} />}
            <div className="rounded-2xl border border-border bg-surface1 p-6">
              <h3 className="mb-4 font-syne text-lg font-bold text-text-primary">
                Historie zásilky
              </h3>
              <Timeline events={result.events} />
            </div>
          </>
        )}
      </div>
    </BrandedLayout>
  );
}
