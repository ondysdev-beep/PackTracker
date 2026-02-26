"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  "Neomezené sledování zásilek",
  "AI shrnutí stavu v češtině",
  "E-mailová a SMS upozornění",
  "Hromadné sledování",
  "API přístup",
  "Sdílení odkazem",
  "200+ dopravců",
  "Brandovaná sledovací stránka",
];

export default function PricingTable() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
      <motion.div
        className="relative rounded-2xl border border-accent/30 bg-surface1 p-8 shadow-[0_0_40px_rgba(79,255,176,0.05)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-bg">
            Kompletně zdarma
          </span>
        </div>

        <div className="mb-6">
          <h3 className="font-syne text-xl font-bold text-text-primary">
            TrackFlow
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Všechny funkce, bez limitů, navždy zdarma.
          </p>
        </div>

        <div className="mb-6">
          <span className="font-syne text-4xl font-bold text-accent">
            0 Kč
          </span>
          <span className="ml-1 text-sm text-text-muted">/navždy</span>
        </div>

        <ul className="mb-8 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-text-primary">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="block w-full rounded-xl bg-accent px-6 py-3 text-center text-sm font-medium text-bg transition-all hover:brightness-110"
        >
          Začít sledovat
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-col justify-center rounded-2xl border border-border bg-surface1 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/10">
          <svg
            className="h-6 w-6 text-accent-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.996 2.996 0 00.966-2.404A3 3 0 016.75 4.5h10.5A3 3 0 0120.034 6.945 2.996 2.996 0 0021 9.349"
            />
          </svg>
        </div>
        <h3 className="font-syne text-xl font-bold text-text-primary">
          Máte e-shop?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Můžeme vytvořit brandovanou sledovací stránku přímo pro váš e-shop —
          s vaším logem, barvami a vlastní doménou. Kontaktujte nás pro více
          informací.
        </p>
        <Link
          href="/business"
          className="mt-6 inline-block rounded-xl border border-border bg-surface2 px-6 py-3 text-center text-sm font-medium text-text-primary transition-all hover:border-accent/30"
        >
          Zjistit více
        </Link>
      </motion.div>
    </div>
  );
}
