"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const integrationOptions = [
  {
    title: "REST API",
    description:
      "Jednoduchá integrace přes naše API. Kompletní dokumentace s příklady.",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  },
  {
    title: "Webhooky",
    description:
      "Automatické notifikace při změnách stavu zásilek přímo do vašeho systému.",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  },
  {
    title: "Brandovaná stránka",
    description:
      "Sledovací stránka s vaším logem, barvami a vlastní doménou.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
];

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Děkujeme za váš zájem! Brzy se vám ozveme.");
    setFormData({ name: "", company: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-syne text-4xl font-extrabold text-text-primary md:text-5xl">
          TrackFlow pro <span className="gradient-text">e-shopy</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
          Nabídněte svým zákazníkům prémiový zážitek ze sledování zásilek.
          S vaším brandem, na vaší doméně.
        </p>
      </motion.div>

      {/* Demo */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="rounded-2xl border border-border bg-surface1 p-8">
          <h2 className="mb-6 text-center font-syne text-2xl font-bold text-text-primary">
            Ukázka brandované stránky
          </h2>
          <div className="rounded-xl border border-border bg-bg p-6">
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="h-8 w-8 rounded-lg bg-accent/20" />
              <span className="font-syne text-lg font-bold text-accent">
                Váš E-shop
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-text-muted">
                  CZ1234567890123
                </span>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                  Na cestě
                </span>
              </div>
              <div className="rounded-xl bg-surface2 p-4">
                <p className="text-sm text-text-primary">
                  Vaše zásilka je na cestě a dorazí dnes do 18:00. Vše
                  probíhá bez komplikací.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Integration Options */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="mb-8 text-center font-syne text-2xl font-bold text-text-primary">
          Možnosti integrace
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {integrationOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-border bg-surface1 p-6 transition-all hover:border-accent/20"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10">
                <svg
                  className="h-5 w-5 text-accent-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={option.icon}
                  />
                </svg>
              </div>
              <h3 className="font-syne text-lg font-bold text-text-primary">
                {option.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Free CTA */}
      <motion.div
        className="mb-16 rounded-2xl border border-accent/30 bg-surface1 p-8 text-center shadow-[0_0_40px_rgba(79,255,176,0.05)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <h2 className="font-syne text-2xl font-bold text-text-primary">
          Vše kompletně <span className="text-accent">zdarma</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-text-muted">
          TrackFlow je bezplatný pro všechny — včetně API přístupu, AI shrnutí,
          e-mailových i SMS notifikací. Chcete vlastní brandovanou stránku pro
          váš e-shop? Napište nám.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="mx-auto max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="rounded-2xl border border-border bg-surface1 p-8">
          <h2 className="mb-6 text-center font-syne text-2xl font-bold text-text-primary">
            Kontaktujte nás
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-text-muted">
                  Jméno
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-muted">
                  Firma
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-text-muted">
                E-mail
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-text-muted">
                Zpráva
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="input-field h-32 resize-none"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Odeslat
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
