"use client";

import { motion } from "framer-motion";
import { ShipmentStatus } from "@/types/shipment";

const STATUS_CONFIG: Record<
  ShipmentStatus,
  { label: string; color: string; bgColor: string; pulse: boolean }
> = {
  pending: {
    label: "Čeká na vyzvednutí",
    color: "#6b6b80",
    bgColor: "rgba(107, 107, 128, 0.15)",
    pulse: false,
  },
  info_received: {
    label: "Informace přijaty",
    color: "#4f8fff",
    bgColor: "rgba(79, 143, 255, 0.15)",
    pulse: false,
  },
  in_transit: {
    label: "Na cestě",
    color: "#4fffb0",
    bgColor: "rgba(79, 255, 176, 0.15)",
    pulse: true,
  },
  out_for_delivery: {
    label: "Doručuje se",
    color: "#4fffb0",
    bgColor: "rgba(79, 255, 176, 0.15)",
    pulse: true,
  },
  delivered: {
    label: "Doručeno",
    color: "#4fffb0",
    bgColor: "rgba(79, 255, 176, 0.15)",
    pulse: false,
  },
  failed_attempt: {
    label: "Neúspěšné doručení",
    color: "#ff6b6b",
    bgColor: "rgba(255, 107, 107, 0.15)",
    pulse: true,
  },
  exception: {
    label: "Problém",
    color: "#ff6b6b",
    bgColor: "rgba(255, 107, 107, 0.15)",
    pulse: true,
  },
  expired: {
    label: "Vypršelo",
    color: "#6b6b80",
    bgColor: "rgba(107, 107, 128, 0.15)",
    pulse: false,
  },
  unknown: {
    label: "Neznámý",
    color: "#6b6b80",
    bgColor: "rgba(107, 107, 128, 0.15)",
    pulse: false,
  },
};

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.unknown;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]}`}
      style={{ backgroundColor: config.bgColor, color: config.color }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {config.pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: config.color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: config.color }}
          />
        </span>
      )}
      {config.label}
    </motion.span>
  );
}
