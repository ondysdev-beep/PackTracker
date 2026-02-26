"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SearchInputProps {
  size?: "sm" | "lg";
  placeholder?: string;
  defaultValue?: string;
}

export default function SearchInput({
  size = "lg",
  placeholder = "Zadejte číslo zásilky...",
  defaultValue = "",
}: SearchInputProps) {
  const [trackingNumber, setTrackingNumber] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim();
    if (!trimmed) return;
    setIsLoading(true);
    router.push(`/track/${encodeURIComponent(trimmed)}`);
  };

  const sizeClasses = {
    sm: "h-12 text-sm",
    lg: "h-14 text-base md:h-16 md:text-lg",
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-border bg-surface1 pl-5 pr-32 font-mono text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/20 ${sizeClasses[size]}`}
        />
        <motion.button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
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
              Hledám...
            </span>
          ) : (
            "Sledovat"
          )}
        </motion.button>
      </div>
    </form>
  );
}
