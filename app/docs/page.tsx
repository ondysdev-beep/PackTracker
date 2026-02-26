"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const languages = ["javascript", "python", "php"] as const;
type Language = (typeof languages)[number];

const codeExamples: Record<Language, string> = {
  javascript: `const response = await fetch('https://api.trackflow.cz/api/v1/track', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer tf_your_api_key_here'
  },
  body: JSON.stringify({
    trackingNumber: 'CZ1234567890123',
    carrier: 'ppl'
  })
});

const data = await response.json();
console.log(data.shipment);
console.log(data.events);`,
  python: `import requests

response = requests.post(
    'https://api.trackflow.cz/api/v1/track',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer tf_your_api_key_here'
    },
    json={
        'trackingNumber': 'CZ1234567890123',
        'carrier': 'ppl'
    }
)

data = response.json()
print(data['shipment'])
print(data['events'])`,
  php: `<?php
$ch = curl_init('https://api.trackflow.cz/api/v1/track');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer tf_your_api_key_here'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'trackingNumber' => 'CZ1234567890123',
        'carrier' => 'ppl'
    ])
]);

$response = curl_exec($ch);
$data = json_decode($response, true);

print_r($data['shipment']);
print_r($data['events']);`,
};

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/track",
    description: "Sledování zásilky podle čísla",
    body: '{ "trackingNumber": "string", "carrier?": "string" }',
    response:
      '{ "shipment": Shipment, "events": Event[], "aiSummary": AISummary }',
  },
  {
    method: "GET",
    path: "/api/shipments",
    description: "Seznam zásilek přihlášeného uživatele",
    body: null,
    response: '{ "shipments": Shipment[] }',
  },
  {
    method: "POST",
    path: "/api/ai/summarize",
    description: "AI shrnutí událostí zásilky",
    body: '{ "events": Event[] }',
    response:
      '{ "summary": "string", "estimatedDelivery": "string|null", "hasIssue": boolean }',
  },
  {
    method: "POST",
    path: "/api/notify/subscribe",
    description: "Přihlášení k upozorněním na zásilku",
    body: '{ "shipmentId": "string", "email": boolean, "sms": boolean }',
    response: '{ "success": boolean }',
  },
  {
    method: "GET",
    path: "/api/shop/[slug]",
    description: "Konfigurace brandované stránky",
    body: null,
    response: '{ "shop": Shop }',
  },
];

export default function DocsPage() {
  const [activeLang, setActiveLang] = useState<Language>("javascript");
  const [playgroundInput, setPlaygroundInput] = useState(
    '{\n  "trackingNumber": "CZ1234567890123",\n  "carrier": "ppl"\n}'
  );
  const [playgroundResult, setPlaygroundResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function runPlayground() {
    setIsLoading(true);
    try {
      const body = JSON.parse(playgroundInput);
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setPlaygroundResult(JSON.stringify(data, null, 2));
    } catch {
      setPlaygroundResult(
        JSON.stringify({ error: "Neplatný JSON nebo chyba požadavku" }, null, 2)
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-syne text-4xl font-extrabold text-text-primary">
          API dokumentace
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Integrujte TrackFlow do svého projektu pomocí jednoduchého REST API.
        </p>
      </motion.div>

      {/* Authentication */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="mb-4 font-syne text-2xl font-bold text-text-primary">
          Autentizace
        </h2>
        <div className="rounded-2xl border border-border bg-surface1 p-6">
          <p className="text-sm text-text-muted">
            Všechny API požadavky vyžadují autentizaci pomocí API klíče v
            hlavičce <code className="text-accent">Authorization</code>.
          </p>
          <div className="mt-4 rounded-xl bg-surface2 p-4">
            <code className="font-mono text-sm text-text-primary">
              Authorization: Bearer tf_your_api_key_here
            </code>
          </div>
          <p className="mt-4 text-sm text-text-muted">
            API klíč získáte v{" "}
            <a href="/dashboard/settings" className="text-accent hover:underline">
              nastavení dashboardu
            </a>
            . Rate limit: 100 req/hod (Free), 10 000 req/hod (Pro).
          </p>
        </div>
      </motion.section>

      {/* Code Examples */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="mb-4 font-syne text-2xl font-bold text-text-primary">
          Příklady kódu
        </h2>
        <div className="rounded-2xl border border-border bg-surface1 overflow-hidden">
          <div className="flex border-b border-border">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeLang === lang
                    ? "bg-surface2 text-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
          <pre className="overflow-x-auto p-6">
            <code className="font-mono text-sm text-text-primary">
              {codeExamples[activeLang]}
            </code>
          </pre>
        </div>
      </motion.section>

      {/* Endpoints */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="mb-4 font-syne text-2xl font-bold text-text-primary">
          Endpointy
        </h2>
        <div className="space-y-4">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.path}
              className="rounded-2xl border border-border bg-surface1 p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-lg px-2 py-1 font-mono text-xs font-bold ${
                    endpoint.method === "GET"
                      ? "bg-accent-blue/15 text-accent-blue"
                      : "bg-accent/15 text-accent"
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="font-mono text-sm text-text-primary">
                  {endpoint.path}
                </code>
              </div>
              <p className="mt-2 text-sm text-text-muted">
                {endpoint.description}
              </p>
              {endpoint.body && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-text-muted">Body:</p>
                  <code className="mt-1 block rounded-lg bg-surface2 p-2 font-mono text-xs text-text-primary">
                    {endpoint.body}
                  </code>
                </div>
              )}
              <div className="mt-3">
                <p className="text-xs font-medium text-text-muted">Response:</p>
                <code className="mt-1 block rounded-lg bg-surface2 p-2 font-mono text-xs text-text-primary">
                  {endpoint.response}
                </code>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Playground */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="mb-4 font-syne text-2xl font-bold text-text-primary">
          API Playground
        </h2>
        <div className="rounded-2xl border border-border bg-surface1 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-text-muted">
                Request Body (JSON)
              </p>
              <textarea
                value={playgroundInput}
                onChange={(e) => setPlaygroundInput(e.target.value)}
                className="input-field h-48 resize-none font-mono text-sm"
              />
              <button
                onClick={runPlayground}
                disabled={isLoading}
                className="btn-primary mt-3 w-full text-sm"
              >
                {isLoading ? "Odesílám..." : "Odeslat požadavek"}
              </button>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-text-muted">
                Response
              </p>
              <pre className="h-48 overflow-auto rounded-xl border border-border bg-surface2 p-4">
                <code className="font-mono text-xs text-text-primary">
                  {playgroundResult || "// Výsledek se zobrazí zde"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
