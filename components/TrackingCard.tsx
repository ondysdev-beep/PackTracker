"use client";

import { motion } from "framer-motion";
import { Shipment } from "@/types/shipment";
import StatusBadge from "./StatusBadge";
import CarrierBadge from "./CarrierBadge";

interface TrackingCardProps {
  shipment: Shipment;
  origin?: string | null;
  destination?: string | null;
}

export default function TrackingCard({
  shipment,
  origin,
  destination,
}: TrackingCardProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}/track/${shipment.trackingNumber}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Odkaz zkopírován do schránky");
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
  };

  return (
    <motion.div
      className="rounded-2xl border border-border bg-surface1 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          {shipment.label && (
            <h2 className="font-syne text-xl font-bold text-text-primary">
              {shipment.label}
            </h2>
          )}
          <p className="font-mono text-sm text-text-muted">
            {shipment.trackingNumber}
          </p>
          <div className="flex items-center gap-2">
            <CarrierBadge carrierCode={shipment.carrierCode} size="sm" />
            <StatusBadge status={shipment.currentStatus} />
          </div>
        </div>

        <button
          onClick={handleShare}
          className="btn-secondary flex items-center gap-2 self-start text-sm"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Sdílet
        </button>
      </div>

      {(origin || destination) && (
        <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
          {origin && <span>{origin}</span>}
          {origin && destination && (
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          )}
          {destination && <span>{destination}</span>}
        </div>
      )}

      {shipment.estimatedDelivery && (
        <div className="mt-4 rounded-xl bg-surface2 p-3">
          <p className="text-xs text-text-muted">Odhadované doručení</p>
          <p className="mt-0.5 font-mono text-sm text-accent">
            {new Date(shipment.estimatedDelivery).toLocaleDateString("cs-CZ", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      )}
    </motion.div>
  );
}
