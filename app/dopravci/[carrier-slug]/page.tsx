import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";

const CARRIERS_DATA: Record<
  string,
  {
    name: string;
    fullName: string;
    description: string;
    website: string;
    trackingExample: string;
  }
> = {
  ppl: {
    name: "PPL",
    fullName: "Professional Parcel Logistic s.r.o.",
    description:
      "PPL je jedním z předních expresních přepravců v České republice. Společnost nabízí komplexní logistická řešení pro firemní i soukromé zákazníky. PPL doručuje balíky po celé České republice i do zahraničí, s možností sledování zásilek v reálném čase. Díky rozsáhlé síti depo a výdejních míst zajišťuje PPL spolehlivé a rychlé doručení. Zásilky jsou obvykle doručeny do druhého pracovního dne od podání. PPL nabízí také služby jako dobírka, pojištění zásilky, doručení na konkrétní adresu nebo na výdejní místo. Společnost je součástí mezinárodní skupiny DPDgroup, což zajišťuje bezproblémové doručení i do zahraničí. Sledování zásilek PPL je jednoduché pomocí sledovacího čísla začínajícího písmeny CZ nebo SK následovanými 13 číslicemi.",
    website: "https://www.ppl.cz",
    trackingExample: "CZ1234567890123",
  },
  dpd: {
    name: "DPD",
    fullName: "DPD CZ s.r.o.",
    description:
      "DPD je mezinárodní balíková přepravní společnost s dlouholetou tradicí v České republice. DPD nabízí expresní doručování balíků s možností sledování v reálném čase prostřednictvím moderního sledovacího systému. Zásilky DPD jsou identifikovány 14místným číslem, které umožňuje přesné sledování od převzetí až po doručení. DPD provozuje rozsáhlou síť Pickup bodů po celé České republice, kde si zákazníci mohou vyzvednout své zásilky v čase, který jim vyhovuje. Společnost klade důraz na ekologické doručování a nabízí službu DPD Predict, která příjemci zasílá přesný časový interval doručení. DPD je součástí skupiny DPDgroup, jedné z největších balíkových sítí v Evropě s pokrytím ve více než 230 zemích světa.",
    website: "https://www.dpd.cz",
    trackingExample: "12345678901234",
  },
  gls: {
    name: "GLS",
    fullName: "General Logistics Systems Czech Republic s.r.o.",
    description:
      "GLS je spolehlivá balíková přepravní společnost působící v celé Evropě. V České republice patří mezi nejoblíbenější dopravce díky rychlému a spolehlivému doručování. GLS nabízí sledování zásilek pomocí 8 až 11místného čísla balíku. Společnost provozuje síť ParcelShopů, kam mohou zákazníci směrovat své zásilky pro vyzvednutí v pohodlný čas. GLS se zaměřuje na B2B i B2C segment a nabízí služby jako FlexDeliveryService, která umožňuje příjemci změnit den nebo místo doručení. GLS garantuje doručení balíků do druhého pracovního dne v rámci České republiky. Mezinárodní přeprava je zajištěna díky rozsáhlé evropské síti s pokrytím ve více než 40 zemích.",
    website: "https://gls-group.eu/CZ",
    trackingExample: "12345678",
  },
  zasilkovna: {
    name: "Zásilkovna",
    fullName: "Zásilkovna s.r.o.",
    description:
      "Zásilkovna je český přepravní a logistický startup, který se stal jedním z nejvyužívanějších dopravců v České republice. Zásilkovna provozuje tisíce výdejních míst po celé České republice i v zahraničí, včetně Z-Boxů — automatických schránek pro vyzvednutí zásilek 24/7. Sledování zásilek Zásilkovny je možné pomocí sledovacího čísla začínajícího písmenem Z následovaným 9 číslicemi. Zásilkovna je oblíbená zejména díky nízkým cenám přepravy a vysoké hustotě výdejních míst. E-shopy oceňují jednoduchou integraci a široké možnosti API. Zásilkovna také nabízí přepravu do zahraničí s pokrytím více než 30 evropských zemí. Díky mobilní aplikaci mohou zákazníci snadno sledovat své zásilky a spravovat doručení.",
    website: "https://www.zasilkovna.cz",
    trackingExample: "Z123456789",
  },
  dhl: {
    name: "DHL Express",
    fullName: "DHL Express (Czech Republic) s.r.o.",
    description:
      "DHL Express je světový lídr v expresní přepravě zásilek a dokumentů. V České republice nabízí DHL kompletní portfolio přepravních služeb od expresního doručení do druhého dne až po same-day delivery. DHL Express využívá globální síť pokrývající více než 220 zemí a teritorií. Sledování zásilek DHL je možné pomocí 10 nebo 11místného sledovacího čísla. DHL nabízí pokročilé technologie sledování včetně upozornění v reálném čase, přesného časového okna doručení a možnosti přesměrování zásilky za letu. DHL je známý svou spolehlivostí, rychlostí a profesionálním přístupem. Pro firemní zákazníky nabízí kompletní logistická řešení včetně celního odbavení a skladování.",
    website: "https://www.dhl.cz",
    trackingExample: "1234567890",
  },
  "ceska-posta": {
    name: "Česká pošta",
    fullName: "Česká pošta, s.p.",
    description:
      "Česká pošta je státní podnik a tradiční poskytovatel poštovních služeb v České republice. S více než 3 200 poštami a výdejními místy má nejhustší síť doručovacích bodů v zemi. Česká pošta nabízí širokou škálu služeb od standardních dopisů přes balíky až po expresní zásilky. Sledování zásilek České pošty je možné pomocí podacího čísla ve formátu RR následovaném 9 číslicemi a kódem CZ. Česká pošta provozuje službu Balík Do ruky, Balík Na poštu a Balíkovnu. Pro e-shopy nabízí integrační rozhraní a hromadné podání zásilek. Česká pošta je také členem Světové poštovní unie, což zajišťuje doručení do prakticky jakékoli země světa.",
    website: "https://www.ceskaposta.cz",
    trackingExample: "RR123456789CZ",
  },
};

export function generateStaticParams() {
  return Object.keys(CARRIERS_DATA).map((slug) => ({
    "carrier-slug": slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { "carrier-slug": string };
}): Promise<Metadata> {
  const carrier = CARRIERS_DATA[params["carrier-slug"]];
  if (!carrier) return {};

  return {
    title: `Sledování zásilek ${carrier.name} — TrackFlow`,
    description: `Sledujte zásilky ${carrier.name} (${carrier.fullName}) v reálném čase. Zadejte sledovací číslo a okamžitě zjistěte stav vaší zásilky.`,
  };
}

export default function CarrierPage({
  params,
}: {
  params: { "carrier-slug": string };
}) {
  const carrier = CARRIERS_DATA[params["carrier-slug"]];

  if (!carrier) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: carrier.fullName,
    url: carrier.website,
    description: carrier.description.substring(0, 200),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-syne text-3xl font-extrabold text-text-primary md:text-4xl">
        Sledování zásilek {carrier.name}
      </h1>

      <p className="mt-2 text-lg text-text-muted">{carrier.fullName}</p>

      <div className="mt-8">
        <SearchInput
          size="lg"
          placeholder={`Zadejte číslo zásilky ${carrier.name}...`}
          defaultValue=""
        />
        <p className="mt-2 text-sm text-text-muted">
          Příklad: <code className="font-mono text-accent">{carrier.trackingExample}</code>
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface1 p-8">
        <h2 className="mb-4 font-syne text-xl font-bold text-text-primary">
          O dopravci {carrier.name}
        </h2>
        <p className="leading-relaxed text-text-muted">{carrier.description}</p>
        <a
          href={carrier.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          Navštívit web {carrier.name}
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-text-muted hover:text-accent">
          ← Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
