"use client";

import { motion } from "framer-motion";
import SearchInput from "@/components/SearchInput";
import PricingTable from "@/components/PricingTable";
import StatusBadge from "@/components/StatusBadge";

const carrierChips = [
  "PPL",
  "DPD",
  "GLS",
  "Zásilkovna",
  "DHL",
  "Česká pošta",
  "+200 dalších",
];

const features = [
  {
    title: "AI shrnutí",
    description:
      "Umělá inteligence přeloží technické stavy zásilky do srozumitelné češtiny.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
      />
    ),
  },
  {
    title: "Okamžitá upozornění",
    description:
      "E-mail nebo SMS notifikace při každé změně stavu vaší zásilky.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    ),
  },
  {
    title: "200+ dopravců",
    description:
      "PPL, DPD, GLS, Zásilkovna, DHL, Česká pošta a stovky dalších.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    ),
  },
  {
    title: "Hromadné sledování",
    description:
      "Zadejte více sledovacích čísel najednou a mějte přehled o všech zásilkách.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
      />
    ),
  },
  {
    title: "Sdílení odkazu",
    description:
      "Sdílejte stav zásilky s kýmkoli pomocí jednoduchého odkazu.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.343 8.07"
      />
    ),
  },
  {
    title: "Pro e-shopy",
    description:
      "Brandovaná sledovací stránka s vaším logem a barvami pro vaše zákazníky.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.996 2.996 0 00.966-2.404A3 3 0 016.75 4.5h10.5A3 3 0 0120.034 6.945 2.996 2.996 0 0021 9.349"
      />
    ),
  },
];

const stats = [
  { value: "200+", label: "Podporovaných dopravců" },
  { value: "< 2s", label: "Průměrná doba načtení" },
  { value: "99%", label: "Uptime SLA" },
];

const demoEvents = [
  {
    time: "Dnes, 14:32",
    status: "Zásilka je na cestě k vám",
    location: "Depo Praha-Štěrboholy",
    active: true,
  },
  {
    time: "Dnes, 08:15",
    status: "Zásilka opustila třídící centrum",
    location: "Třídící centrum Brno",
    active: false,
  },
  {
    time: "Včera, 19:40",
    status: "Zásilka přijata dopravcem",
    location: "Výdejní místo Ostrava",
    active: false,
  },
  {
    time: "Včera, 14:20",
    status: "Informace o zásilce přijaty",
    location: "Odesílatel",
    active: false,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,255,176,0.05),transparent_60%)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-syne text-4xl font-extrabold leading-tight text-text-primary md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Sledujte zásilky{" "}
            <span className="gradient-text">chytře</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-lg text-text-muted md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Zadejte sledovací číslo a okamžitě zjistěte, kde je vaše zásilka.
            S AI shrnutím v češtině.
          </motion.p>

          <motion.div
            className="mx-auto mt-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SearchInput />
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {carrierChips.map((carrier) => (
              <span
                key={carrier}
                className="rounded-full border border-border bg-surface1 px-3 py-1 text-xs text-text-muted"
              >
                {carrier}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Card */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="rounded-2xl border border-border bg-surface1 p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-muted">Ukázka sledování</p>
                <p className="mt-1 font-mono text-sm text-text-primary">
                  CZ1234567890123
                </p>
              </div>
              <StatusBadge status="in_transit" />
            </div>

            <div className="mt-4 rounded-xl bg-surface2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/10">
                  <svg
                    className="h-3 w-3 text-accent"
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
                <span className="text-xs text-text-muted">AI shrnutí</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-primary">
                Vaše zásilka je aktuálně na cestě z Brna do Prahy. Podle
                aktuálního průběhu by měla dorazit dnes do 18:00. Vše probíhá
                bez komplikací.
              </p>
            </div>

            <div className="mt-5 space-y-0">
              {demoEvents.map((event, i) => (
                <div key={i} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`z-10 h-2.5 w-2.5 rounded-full ${
                        event.active
                          ? "bg-accent shadow-[0_0_8px_rgba(79,255,176,0.4)]"
                          : "border border-border bg-surface2"
                      }`}
                    />
                    {i < demoEvents.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p
                      className={`text-sm ${
                        event.active ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {event.status}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-text-muted">
                      {event.time} • {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-border bg-surface1 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            >
              <p className="font-syne text-2xl font-bold text-accent md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="mb-12 text-center font-syne text-3xl font-bold text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Vše, co potřebujete
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="rounded-2xl border border-border bg-surface1 p-6 transition-all hover:border-accent/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="font-syne text-lg font-bold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 pb-20" id="pricing">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-12 text-center font-syne text-3xl font-bold text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Vše zdarma
          </motion.h2>
          <PricingTable />
        </div>
      </section>
    </div>
  );
}
