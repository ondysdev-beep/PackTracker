"use client";

import { motion } from "framer-motion";
import { getCarrierName } from "@/lib/tracking/carriers";

interface CarrierBadgeProps {
  carrierCode: string;
  size?: "sm" | "md";
}

export default function CarrierBadge({
  carrierCode,
  size = "md",
}: CarrierBadgeProps) {
  const name = getCarrierName(carrierCode);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <motion.span
      className={`inline-flex items-center rounded-full border border-border bg-surface2 font-medium text-text-primary ${sizeClasses[size]}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {name}
    </motion.span>
  );
}
