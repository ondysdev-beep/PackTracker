import type { Metadata } from "next";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

export const runtime = "edge";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrackFlow — Chytré sledování zásilek",
    template: "%s | TrackFlow",
  },
  description:
    "Sledujte své zásilky v reálném čase. Podpora 200+ dopravců, AI shrnutí stavu, notifikace. PPL, DPD, GLS, Zásilkovna, DHL, Česká pošta a další.",
  keywords: [
    "sledování zásilek",
    "tracking",
    "PPL",
    "DPD",
    "GLS",
    "Zásilkovna",
    "DHL",
    "Česká pošta",
    "zásilky",
  ],
  openGraph: {
    title: "TrackFlow — Chytré sledování zásilek",
    description:
      "Sledujte své zásilky v reálném čase. Podpora 200+ dopravců, AI shrnutí stavu.",
    type: "website",
    locale: "cs_CZ",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      className={`${syne.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-text-primary antialiased">
        <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-syne text-xl font-bold text-accent">
              TrackFlow
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/business"
                className="hidden text-sm text-text-muted hover:text-text-primary sm:inline"
              >
                Pro firmy
              </Link>
              <Link
                href="/docs"
                className="hidden text-sm text-text-muted hover:text-text-primary sm:inline"
              >
                API Docs
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-border bg-surface1 px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent/30 hover:bg-surface2"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="border-t border-border bg-surface1">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="font-syne text-lg font-bold text-accent">
                  TrackFlow
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  Chytré sledování zásilek s AI.
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium text-text-primary">
                  Produkt
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      Sledování zásilek
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      Pro firmy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      API dokumentace
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium text-text-primary">
                  Dopravci
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/dopravci/ppl"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      PPL
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dopravci/dpd"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      DPD
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dopravci/gls"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      GLS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dopravci/zasilkovna"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      Zásilkovna
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium text-text-primary">
                  Právní
                </h4>
                <ul className="space-y-2">
                  <li>
                    <span className="text-sm text-text-muted">
                      Podmínky služby
                    </span>
                  </li>
                  <li>
                    <span className="text-sm text-text-muted">
                      Ochrana osobních údajů
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="text-xs text-text-muted">
                © {new Date().getFullYear()} TrackFlow. Všechna práva vyhrazena.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
