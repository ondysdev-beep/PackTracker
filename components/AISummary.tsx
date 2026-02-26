"use client";

import { motion } from "framer-motion";
import { AISummaryResult } from "@/types/shipment";

interface AISummaryProps {
  summary: AISummaryResult;
}

export default function AISummary({ summary }: AISummaryProps) {
  return (
    <motion.div
      className="rounded-2xl border border-border bg-surface1 p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10">
          <svg
            className="h-3.5 w-3.5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-text-muted">AI shrnutí</h3>
      </div>

      <p className="text-sm leading-relaxed text-text-primary">
        {summary.summary}
      </p>

      {summary.estimatedDelivery && (
        <div className="mt-4 rounded-xl bg-surface2 p-3">
          <p className="text-xs text-text-muted">Odhadované doručení</p>
          <p className="mt-0.5 font-mono text-sm text-accent">
            {summary.estimatedDelivery}
          </p>
        </div>
      )}

      {summary.hasIssue && summary.issueDescription && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
          <p className="text-xs text-red-400">Upozornění</p>
          <p className="mt-0.5 text-sm text-red-300">
            {summary.issueDescription}
          </p>
        </div>
      )}
    </motion.div>
  );
}
