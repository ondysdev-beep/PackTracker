import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description:
    "Zásady ochrany osobních údajů služby TrackFlow pro sledování zásilek.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-syne text-3xl font-bold text-text-primary">
        Ochrana osobních údajů
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Poslední aktualizace: 26. února 2026
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-text-muted">
        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            1. Správce osobních údajů
          </h2>
          <p>
            Správcem osobních údajů je provozovatel služby TrackFlow (dále jen
            &bdquo;Správce&ldquo;). Tyto zásady popisují, jak shromažďujeme, používáme a
            chráníme vaše osobní údaje v souladu s nařízením GDPR (General Data
            Protection Regulation) a zákonem č. 110/2019 Sb., o zpracování
            osobních údajů.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            2. Jaké údaje shromažďujeme
          </h2>
          <p>V rámci poskytování Služby zpracováváme následující údaje:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong className="text-text-primary">E-mailová adresa</strong> —
              pro registraci, přihlášení a zasílání upozornění
            </li>
            <li>
              <strong className="text-text-primary">Telefonní číslo</strong> —
              pouze pokud aktivujete SMS upozornění (volitelné)
            </li>
            <li>
              <strong className="text-text-primary">Sledovací čísla zásilek</strong> —
              pro zajištění funkce sledování
            </li>
            <li>
              <strong className="text-text-primary">Technické údaje</strong> —
              IP adresa, typ prohlížeče, operační systém (pro bezpečnost a
              analytiku)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            3. Účel zpracování
          </h2>
          <p>Vaše osobní údaje zpracováváme za těmito účely:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Poskytování služby sledování zásilek</li>
            <li>Správa uživatelského účtu</li>
            <li>Zasílání upozornění o změnách stavu zásilek</li>
            <li>Zajištění bezpečnosti a prevence zneužití</li>
            <li>Zlepšování kvality Služby</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            4. Právní základ zpracování
          </h2>
          <p>Osobní údaje zpracováváme na základě:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong className="text-text-primary">Plnění smlouvy</strong> —
              poskytování Služby dle Podmínek služby
            </li>
            <li>
              <strong className="text-text-primary">Oprávněný zájem</strong> —
              zajištění bezpečnosti a funkčnosti Služby
            </li>
            <li>
              <strong className="text-text-primary">Souhlas</strong> — zasílání
              marketingových sdělení (pokud je udělen)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            5. Sdílení údajů s třetími stranami
          </h2>
          <p>
            Vaše údaje můžeme sdílet s následujícími třetími stranami, které nám
            pomáhají poskytovat Službu:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong className="text-text-primary">Supabase</strong> — hosting
              databáze a autentizace
            </li>
            <li>
              <strong className="text-text-primary">Cloudflare</strong> — hosting
              aplikace a CDN
            </li>
            <li>
              <strong className="text-text-primary">TrackingMore</strong> —
              poskytovatel dat o zásilkách
            </li>
            <li>
              <strong className="text-text-primary">Twilio</strong> — zasílání
              SMS upozornění
            </li>
            <li>
              <strong className="text-text-primary">Resend</strong> — zasílání
              e-mailových upozornění
            </li>
          </ul>
          <p className="mt-2">
            Vaše údaje nikdy neprodáváme třetím stranám pro marketingové účely.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            6. Doba uchovávání údajů
          </h2>
          <p>
            Vaše osobní údaje uchováváme po dobu trvání vašeho účtu. Po zrušení
            účtu budou vaše údaje smazány do 30 dnů, s výjimkou údajů, které
            jsme povinni uchovávat na základě právních předpisů.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            7. Vaše práva
          </h2>
          <p>Jako subjekt údajů máte následující práva:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong className="text-text-primary">Právo na přístup</strong> —
              získat informace o zpracování vašich údajů
            </li>
            <li>
              <strong className="text-text-primary">Právo na opravu</strong> —
              požádat o opravu nepřesných údajů
            </li>
            <li>
              <strong className="text-text-primary">Právo na výmaz</strong> —
              požádat o smazání vašich údajů
            </li>
            <li>
              <strong className="text-text-primary">
                Právo na omezení zpracování
              </strong>{" "}
              — požádat o omezení zpracování údajů
            </li>
            <li>
              <strong className="text-text-primary">
                Právo na přenositelnost
              </strong>{" "}
              — získat své údaje ve strojově čitelném formátu
            </li>
            <li>
              <strong className="text-text-primary">Právo vznést námitku</strong>{" "}
              — vznést námitku proti zpracování údajů
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            8. Zabezpečení údajů
          </h2>
          <p>
            Vaše údaje chráníme pomocí moderních bezpečnostních opatření,
            včetně šifrování dat při přenosu (TLS/SSL), šifrování hesel a
            pravidelného zálohování dat. Přístup k údajům je omezen pouze na
            oprávněné osoby.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            9. Soubory cookies
          </h2>
          <p>
            Služba používá pouze nezbytné technické cookies pro zajištění
            správného fungování přihlášení a relace. Nepoužíváme sledovací ani
            reklamní cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            10. Kontakt
          </h2>
          <p>
            Pro uplatnění vašich práv nebo v případě dotazů ohledně zpracování
            osobních údajů nás kontaktujte na e-mailové adrese uvedené na
            webových stránkách. Na vaši žádost odpovíme nejpozději do 30 dnů.
          </p>
        </section>
      </div>
    </div>
  );
}
