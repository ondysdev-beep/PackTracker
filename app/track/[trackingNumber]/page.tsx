"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import TrackingCard from "@/components/TrackingCard";
import Timeline from "@/components/Timeline";
import AISummary from "@/components/AISummary";
import NotificationToggle from "@/components/NotificationToggle";
import SearchInput from "@/components/SearchInput";
import { TrackingResult } from "@/types/shipment";

export default function TrackResultPage() {
  const params = useParams();
  const trackingNumber = decodeURIComponent(
    params.trackingNumber as string
  );
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTracking() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trackingNumber }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(
            data.error || "Nepodařilo se načíst informace o zásilce"
          );
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Nepodařilo se načíst informace o zásilce"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (trackingNumber) {
      fetchTracking();
    }
  }, [trackingNumber]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-text-muted">Hledám zásilku {trackingNumber}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <motion.div
          className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <h2 className="mt-4 font-syne text-xl font-bold text-text-primary">
            Zásilka nenalezena
          </h2>
          <p className="mt-2 text-sm text-text-muted">{error}</p>
          <div className="mx-auto mt-6 max-w-md">
            <SearchInput size="sm" defaultValue={trackingNumber} />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <SearchInput size="sm" defaultValue={trackingNumber} />
      </div>

      <div className="space-y-6">
        <TrackingCard shipment={result.shipment} />

        {result.aiSummary && <AISummary summary={result.aiSummary} />}

        <div className="flex items-center gap-3">
          <NotificationToggle shipmentId={result.shipment.id} isLoggedIn={false} />
        </div>

        <div className="rounded-2xl border border-border bg-surface1 p-6">
          <h3 className="mb-4 font-syne text-lg font-bold text-text-primary">
            Historie zásilky
          </h3>
          <Timeline events={result.events} />
        </div>
      </div>
    </div>
  );
}
