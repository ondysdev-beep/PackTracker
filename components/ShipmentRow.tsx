"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shipment } from "@/types/shipment";
import StatusBadge from "./StatusBadge";
import CarrierBadge from "./CarrierBadge";
import { formatRelativeTime } from "@/lib/utils";

interface ShipmentRowProps {
  shipment: Shipment;
  index?: number;
}

export default function ShipmentRow({ shipment, index = 0 }: ShipmentRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Link
        href={`/track/${shipment.trackingNumber}`}
        className="group flex items-center justify-between rounded-2xl border border-border bg-surface1 p-4 transition-all hover:border-accent/20 hover:bg-surface2/50"
      >
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <p className="font-medium text-text-primary group-hover:text-accent transition-colors">
              {shipment.label || shipment.trackingNumber}
            </p>
            <CarrierBadge carrierCode={shipment.carrierCode} size="sm" />
          </div>
          {shipment.label && (
            <p className="font-mono text-xs text-text-muted">
              {shipment.trackingNumber}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={shipment.currentStatus} size="sm" />
          {shipment.lastUpdated && (
            <span className="hidden text-xs text-text-muted sm:inline">
              {formatRelativeTime(shipment.lastUpdated)}
            </span>
          )}
          <svg
            className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
