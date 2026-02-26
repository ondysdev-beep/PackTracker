"use client";

import { motion } from "framer-motion";
import { ShipmentEvent } from "@/types/shipment";
import { formatDateTime } from "@/lib/utils";

interface TimelineProps {
  events: ShipmentEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface1 p-8 text-center">
        <p className="text-text-muted">Zatím žádné události</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, index) => (
        <motion.div
          key={event.id || index}
          className="relative flex gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="flex flex-col items-center">
            <div
              className={`z-10 flex h-3 w-3 items-center justify-center rounded-full ${
                index === 0
                  ? "bg-accent shadow-[0_0_12px_rgba(79,255,176,0.4)]"
                  : "bg-surface2 border border-border"
              }`}
            />
            {index < events.length - 1 && (
              <div className="w-px flex-1 bg-border" />
            )}
          </div>

          <div className="pb-8 pt-0">
            <p
              className={`text-sm font-medium ${
                index === 0 ? "text-accent" : "text-text-primary"
              }`}
            >
              {event.descriptionHuman || event.descriptionRaw}
            </p>
            <div className="mt-1 flex items-center gap-3">
              <span className="font-mono text-xs text-text-muted">
                {formatDateTime(event.timestamp)}
              </span>
              {event.location && (
                <>
                  <span className="text-text-muted">•</span>
                  <span className="text-xs text-text-muted">
                    {event.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
