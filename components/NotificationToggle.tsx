"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NotificationToggleProps {
  shipmentId: string;
  isLoggedIn: boolean;
  onLoginRequired?: () => void;
}

export default function NotificationToggle({
  shipmentId,
  isLoggedIn,
  onLoginRequired,
}: NotificationToggleProps) {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      onLoginRequired?.();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/notify/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId,
          email: !emailEnabled,
          sms: false,
          push: false,
        }),
      });

      if (response.ok) {
        setEmailEnabled(!emailEnabled);
        setSubscribed(true);
      }
    } catch (error) {
      console.error("Failed to toggle notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
          emailEnabled
            ? "border-accent/30 bg-accent/10 text-accent"
            : "border-border bg-surface1 text-text-primary hover:border-accent/20"
        } disabled:opacity-50`}
      >
        {isLoading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              fill="currentColor"
              className="opacity-75"
            />
          </svg>
        ) : (
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        )}
        {subscribed
          ? emailEnabled
            ? "Upozornění zapnuta"
            : "Upozornění vypnuta"
          : "Zapnout upozornění"}
      </button>
    </motion.div>
  );
}
