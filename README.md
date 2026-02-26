# TrackFlow — Chytré sledování zásilek

Bezplatná webová aplikace pro sledování zásilek. Všechny funkce zdarma pro všechny uživatele. Nabízíme i brandované sledovací stránky pro e-shopy.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, Supabase (DB + Auth)
- **Tracking API:** TrackingMore (abstraktní provider pattern)
- **AI:** Google Gemini (shrnutí stavu zásilky v češtině)
- **E-maily:** Resend
- **SMS:** Twilio
- **Rate limiting:** Upstash Redis
- **Hosting:** Cloudflare Pages (OpenNext)

## Spuštění lokálně

```bash
# 1. Naklonujte repo a nainstalujte závislosti
npm install

# 2. Zkopírujte a vyplňte env proměnné
cp .env.local.example .env.local

# 3. Spusťte databázovou migraci
# Otevřete Supabase SQL Editor a spusťte obsah souboru supabase/migration.sql

# 4. Spusťte vývojový server
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000).

## Deployment na Cloudflare Pages

### Krok 1: Supabase

1. Vytvořte projekt na [supabase.com](https://supabase.com)
2. Spusťte SQL migraci ze souboru `supabase/migration.sql` v SQL Editoru
3. V Authentication → Providers zapněte Google OAuth a Magic Link
4. Zkopírujte `SUPABASE_URL` a `SUPABASE_ANON_KEY` ze Settings → API

### Krok 2: Externí služby

1. **TrackingMore** — zaregistrujte se na [trackingmore.com](https://www.trackingmore.com) a získejte API klíč
2. **Google Gemini** — vytvořte API klíč na [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
3. **Resend** — zaregistrujte se na [resend.com](https://resend.com), ověřte doménu
4. **Twilio** — zaregistrujte se na [twilio.com](https://www.twilio.com) pro SMS notifikace
5. **Upstash** — vytvořte Redis databázi na [upstash.com](https://upstash.com)

### Krok 3: Cloudflare Pages

1. Pushněte kód na GitHub
2. Na [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Connect to Git
3. Framework preset: **Next.js (Static HTML Export)** nebo **Next.js**
4. Build command: `npx @cloudflare/next-on-pages`
5. Build output directory: `.vercel/output/static`
6. Přidejte všechny environment variables z `.env.local.example`
7. V Settings → Environment variables přidejte `NODE_VERSION` = `18`
8. Deploy

## Struktura projektu

```
/app                    # Next.js App Router pages & API routes
  /api                  # Serverless API endpoints
  /track/[trackingNumber]  # Dynamická sledovací stránka
  /dashboard            # Autentizovaná sekce
  /business             # B2B landing page
  /docs                 # API dokumentace
  /dopravci/[carrier]   # SEO stránky dopravců
  /[shopSlug]/track     # White-label sledování
/components             # React komponenty
/lib                    # Business logika, integrace
/types                  # TypeScript typy
/supabase               # SQL migrace
```

## Licence

Proprietární software.
