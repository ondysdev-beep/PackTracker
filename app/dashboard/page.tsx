"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shipment, ShipmentStatus } from "@/types/shipment";
import ShipmentRow from "@/components/ShipmentRow";

const tabs: { label: string; value: ShipmentStatus | "all" }[] = [
  { label: "Všechny", value: "all" },
  { label: "Na cestě", value: "in_transit" },
  { label: "Doručeno", value: "delivered" },
  { label: "Problém", value: "exception" },
];

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [activeTab, setActiveTab] = useState<ShipmentStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bulkInput, setBulkInput] = useState("");
  const [showBulk, setShowBulk] = useState(false);

  const fetchShipments = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== "all") params.set("status", activeTab);
      if (search) params.set("search", search);

      const response = await fetch(`/api/shipments?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setShipments(data.shipments || []);
      }
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  async function handleBulkTrack() {
    const numbers = bulkInput
      .split(/[,\n]+/)
      .map((n) => n.trim())
      .filter(Boolean);

    for (const num of numbers) {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trackingNumber: num }),
        });
      } catch (error) {
        console.error(`Failed to track ${num}:`, error);
      }
    }

    setBulkInput("");
    setShowBulk(false);
    fetchShipments();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-syne text-2xl font-bold text-text-primary">
          Moje zásilky
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulk(!showBulk)}
            className="btn-secondary text-sm"
          >
            Hromadné sledování
          </button>
          <a href="/dashboard/settings" className="btn-secondary text-sm">
            Nastavení
          </a>
        </div>
      </div>

      {showBulk && (
        <motion.div
          className="mb-6 rounded-2xl border border-border bg-surface1 p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <h3 className="mb-3 text-sm font-medium text-text-primary">
            Zadejte sledovací čísla (oddělená čárkou nebo novým řádkem)
          </h3>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="CZ1234567890123&#10;12345678901234&#10;Z123456789"
            className="input-field mb-3 h-32 resize-none font-mono text-sm"
          />
          <div className="flex gap-2">
            <button onClick={handleBulkTrack} className="btn-primary text-sm">
              Sledovat všechny
            </button>
            <button
              onClick={() => setShowBulk(false)}
              className="btn-secondary text-sm"
            >
              Zrušit
            </button>
          </div>
        </motion.div>
      )}

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Hledat v zásilkách..."
          className="input-field font-mono text-sm"
        />
      </div>

      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.value
                ? "bg-accent text-bg"
                : "border border-border bg-surface1 text-text-muted hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      ) : shipments.length === 0 ? (
        <motion.div
          className="rounded-2xl border border-border bg-surface1 p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg
            className="mx-auto h-16 w-16 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <h3 className="mt-4 font-syne text-xl font-bold text-text-primary">
            Zatím žádné zásilky
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Zadejte sledovací číslo a začněte sledovat svou první zásilku.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <a href="/" className="btn-primary inline-block text-sm">
              Sledovat zásilku
            </a>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {shipments.map((shipment, index) => (
            <ShipmentRow
              key={shipment.id}
              shipment={shipment}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
