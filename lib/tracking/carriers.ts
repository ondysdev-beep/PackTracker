export interface CarrierPattern {
  code: string;
  name: string;
  patterns: RegExp[];
}

export const CARRIERS: CarrierPattern[] = [
  {
    code: "ppl",
    name: "PPL",
    patterns: [/^(CZ|SK)\d{13}$/],
  },
  {
    code: "dpd",
    name: "DPD",
    patterns: [/^\d{14}$/],
  },
  {
    code: "gls",
    name: "GLS",
    patterns: [/^\d{8,11}$/],
  },
  {
    code: "zasilkovna",
    name: "Zásilkovna",
    patterns: [/^Z\d{9}$/],
  },
  {
    code: "dhl",
    name: "DHL Express",
    patterns: [/^\d{10,11}$/, /^[A-Z]{3}\d{7}$/],
  },
  {
    code: "ceska-posta",
    name: "Česká pošta",
    patterns: [/^RR\d{9}CZ$/, /^DR\d{9}CZ$/, /^BA\d{9}CZ$/],
  },
  {
    code: "ups",
    name: "UPS",
    patterns: [/^1Z[A-Z0-9]{16}$/],
  },
  {
    code: "fedex",
    name: "FedEx",
    patterns: [/^\d{12,15}$/],
  },
];

export const CARRIER_DISPLAY = [
  { code: "ppl", name: "PPL" },
  { code: "dpd", name: "DPD" },
  { code: "gls", name: "GLS" },
  { code: "zasilkovna", name: "Zásilkovna" },
  { code: "dhl", name: "DHL" },
  { code: "ceska-posta", name: "Česká pošta" },
];

export function detectCarrier(trackingNumber: string): string | null {
  const normalized = trackingNumber.trim().toUpperCase();
  for (const carrier of CARRIERS) {
    for (const pattern of carrier.patterns) {
      if (pattern.test(normalized)) {
        return carrier.code;
      }
    }
  }
  return null;
}

export function getCarrierName(code: string): string {
  const carrier = CARRIERS.find((c) => c.code === code);
  return carrier?.name ?? code.toUpperCase();
}
