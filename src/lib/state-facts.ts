/**
 * State-specific buying facts for the /vending-machine-<state> pages, so each page carries
 * information that is genuinely different (and useful) for that state rather than only a
 * swapped state name.
 */

/** Official GST state codes (first two digits of a GSTIN). */
export const GST_STATE_CODE: Record<string, string> = {
  JK: "01", HP: "02", PB: "03", CH: "04", UK: "05", HR: "06", DL: "07", RJ: "08", UP: "09",
  BR: "10", SK: "11", AR: "12", NL: "13", MN: "14", MZ: "15", TR: "16", ML: "17", AS: "18",
  WB: "19", JH: "20", OD: "21", CG: "22", MP: "23", GJ: "24", DN: "26", MH: "27", KA: "29",
  GA: "30", LD: "31", KL: "32", TN: "33", PY: "34", AN: "35", TG: "36", AP: "37", LA: "38",
};

/** Lyra bills from Tamil Nadu: intra-state sales carry CGST + SGST, everything else IGST. */
export const LYRA_STATE = "TN";

/**
 * States where Lyra installs purchased machines on-site (as stated across the site).
 * Everywhere else purchases get installation guidance and remote support; rentals are
 * installed by Lyra across India.
 */
const ONSITE_STATES = new Set(["TN", "KL", "KA", "AP", "TG", "MH", "DL"]);

/** State-government menstrual hygiene schemes (only well-established ones are listed). */
const STATE_SCHEMES: Record<string, { name: string; note: string }> = {
  TN: { name: "Menstrual Hygiene Programme", note: "free sanitary napkins for adolescent girls, run by the Tamil Nadu government since 2011" },
  KL: { name: "She Pad scheme", note: "free sanitary napkins for girls in government and aided schools" },
  KA: { name: "Shuchi scheme", note: "free sanitary napkins for adolescent girls in government schools" },
  AP: { name: "Swechha scheme", note: "free sanitary napkins for girls in government schools and colleges" },
  MH: { name: "Asmita Yojana", note: "subsidised sanitary napkins for schoolgirls and rural women" },
  RJ: { name: "Udaan scheme", note: "free sanitary napkins for women and girls through schools and health centres" },
  OD: { name: "Khushi scheme", note: "free sanitary napkins for girls in government and aided schools" },
};

export type StateFacts = {
  gstCode: string;
  taxNote: string;
  office: { name: string; place: string };
  onsite: boolean;
  installNote: string;
  scheme?: { name: string; note: string };
};

export function stateFacts(stateCode: string, region: string): StateFacts {
  const gstCode = GST_STATE_CODE[stateCode] ?? "";
  const intra = stateCode === LYRA_STATE;
  const east = /North India|East India|Northeast/.test(region);
  const onsite = ONSITE_STATES.has(stateCode);
  return {
    gstCode,
    taxNote: intra
      ? "Intra-state sale: CGST 9% + SGST 9% on machines, invoiced from Tamil Nadu"
      : `Inter-state sale: IGST 18% on machines, invoiced from Tamil Nadu (GST code 33) to state code ${gstCode}`,
    office: east ? { name: "North India office", place: "Hooghly, West Bengal" } : { name: "South India head office", place: "Chennai, Tamil Nadu" },
    onsite,
    installNote: onsite
      ? "On-site installation, staff training and service for purchased machines"
      : "Purchased machines: installation guidance and remote support. Rented machines: installed and serviced by Lyra",
    scheme: STATE_SCHEMES[stateCode],
  };
}
