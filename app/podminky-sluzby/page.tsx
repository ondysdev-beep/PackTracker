import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podmínky služby",
  description: "Podmínky používání služby TrackFlow pro sledování zásilek.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-syne text-3xl font-bold text-text-primary">
        Podmínky služby
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Poslední aktualizace: 26. února 2026
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-text-muted">
        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            1. Úvodní ustanovení
          </h2>
          <p>
            Tyto podmínky služby (dále jen &bdquo;Podmínky&ldquo;) upravují práva a povinnosti
            uživatelů služby TrackFlow (dále jen &bdquo;Služba&ldquo;), provozované na webové
            adrese trackflow.cz. Používáním Služby souhlasíte s těmito Podmínkami.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            2. Popis služby
          </h2>
          <p>
            TrackFlow je bezplatná služba pro sledování zásilek od různých
            dopravců. Služba umožňuje:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Sledování zásilek v reálném čase</li>
            <li>AI shrnutí stavu zásilek</li>
            <li>E-mailová a SMS upozornění na změny stavu</li>
            <li>Dashboard pro správu více zásilek</li>
            <li>API pro integraci do e-shopů</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            3. Registrace a účet
          </h2>
          <p>
            Pro využívání některých funkcí Služby je nutná registrace. Při
            registraci jste povinni uvést pravdivé a aktuální údaje. Za
            zabezpečení svého účtu a hesla nesete plnou odpovědnost. Provozovatel
            nenese odpovědnost za škody vzniklé v důsledku neoprávněného přístupu
            k vašemu účtu.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            4. Pravidla používání
          </h2>
          <p>Při používání Služby se zavazujete:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nepoužívat Službu k nezákonným účelům</li>
            <li>Nezasahovat do fungování Služby</li>
            <li>Nepokoušet se o neoprávněný přístup k datům jiných uživatelů</li>
            <li>Nepřetěžovat servery nadměrným množstvím požadavků</li>
            <li>Dodržovat platné právní předpisy České republiky</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            5. Dostupnost služby
          </h2>
          <p>
            Provozovatel se snaží zajistit nepřetržitý provoz Služby, ale
            negarantuje její 100% dostupnost. Služba může být dočasně nedostupná
            z důvodu údržby, aktualizací nebo technických problémů. Provozovatel
            nenese odpovědnost za případné škody způsobené nedostupností Služby.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            6. Odpovědnost za data
          </h2>
          <p>
            Informace o zásilkách jsou získávány od třetích stran (dopravců) a
            provozovatel negarantuje jejich přesnost ani aktuálnost. TrackFlow
            slouží pouze jako agregátor informací a nenese odpovědnost za
            případné nesrovnalosti v datech o zásilkách.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            7. Bezplatnost služby
          </h2>
          <p>
            Všechny funkce Služby jsou poskytovány zdarma. Provozovatel si
            vyhrazuje právo v budoucnu zavést placené funkce, o čemž budou
            uživatelé informováni s dostatečným předstihem.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            8. Ukončení účtu
          </h2>
          <p>
            Svůj účet můžete kdykoli zrušit kontaktováním provozovatele.
            Provozovatel si vyhrazuje právo zrušit nebo pozastavit účet uživatele,
            který porušuje tyto Podmínky.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            9. Změny podmínek
          </h2>
          <p>
            Provozovatel si vyhrazuje právo tyto Podmínky kdykoli změnit.
            O významných změnách budou uživatelé informováni prostřednictvím
            e-mailu nebo oznámení ve Službě. Pokračováním v používání Služby po
            změně Podmínek vyjadřujete souhlas s novým zněním.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-syne text-lg font-bold text-text-primary">
            10. Kontakt
          </h2>
          <p>
            V případě dotazů k těmto Podmínkám nás kontaktujte na e-mailové
            adrese uvedené na webových stránkách.
          </p>
        </section>
      </div>
    </div>
  );
}
