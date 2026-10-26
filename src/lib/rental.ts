/**
 * Rental plans: the single source for every page, schema block and FAQ that mentions renting,
 * so the monthly prices can never drift apart. Client-safe (no imports from data.ts).
 */

export const RENTAL_PATH = "/sanitary-napkin-vending-machine-on-rent";
export const RENTAL_GST_RATE = 0.18;

export type RentalPlan = {
  id: "r25" | "r50" | "r100";
  /** Napkins the machine holds per fill. */
  capacity: number;
  /** Monthly rent in rupees, ex-GST. */
  price: number;
  name: string;
  idealFor: string;
  popular?: boolean;
};

export const RENTAL_PLANS: RentalPlan[] = [
  { id: "r25", capacity: 25, price: 999, name: "Essential", idealFor: "A single washroom, small office or school block" },
  { id: "r50", capacity: 50, price: 1499, name: "Plus", idealFor: "Busy washrooms, college hostels and hospital wards", popular: true },
  { id: "r100", capacity: 100, price: 1999, name: "Max", idealFor: "Large campuses, factories, IT parks and public restrooms" },
];

export const RENTAL_FROM = RENTAL_PLANS[0].price;

/** Machines offered on the rental plans, in display order. */
export const RENTAL_MODELS = [
  {
    slug: "solo-wifi-vending-machine",
    name: "Solo WiFi",
    tech: "IoT · WiFi",
    summary: "UPI QR and coin payment, touch display and a live cloud dashboard over your WiFi.",
  },
  {
    slug: "solo-ethernet-vending-machine",
    name: "Solo Ethernet",
    tech: "IoT · Ethernet",
    summary: "The same cloud dashboard over a wired LAN connection, for sites where WiFi is unreliable.",
  },
  {
    slug: "solo-rfid-vending-machine",
    name: "Solo RFID",
    tech: "RFID card",
    summary: "Card-based access for staff and students, with per-card usage reports and no coins.",
  },
] as const;

/* ─── Agreement terms ─────────────────────────────────────── */

/** Refundable security deposit per machine (ex-GST), paid at signing with month 1's rent (alternative: advance rent). */
export const RENTAL_DEPOSIT = 4999;
/** Months of rent paid in advance at signing, instead of the deposit. */
export const RENTAL_ADVANCE_MONTHS = 3;
/** Minimum agreement length. */
export const RENTAL_MIN_YEARS = 3;

/** Everything the monthly rent covers. Napkin refills are the one exclusion. */
export const RENTAL_INCLUDED = [
  { key: "install", title: "Installation", body: "Lyra's team mounts, wires and sets up the machine at your site and shows your staff how to refill it." },
  { key: "service", title: "Regular servicing", body: "Scheduled preventive maintenance for the whole agreement, so the machine keeps dispensing reliably." },
  { key: "parts", title: "Parts replacement", body: "Worn or faulty parts are repaired or replaced at no extra charge for as long as you rent." },
  { key: "breakdown", title: "Breakdown support", body: "Report a fault by phone or WhatsApp and we fix it, remotely where possible and on-site where needed." },
  { key: "monitor", title: "Live monitoring", body: "Your own login on the Lyra website shows stock level, usage and machine status at any time." },
  { key: "alerts", title: "Regular alerts", body: "Low-stock and fault alerts, so napkins are refilled before the machine runs empty." },
  { key: "updates", title: "Software updates", body: "Firmware and dashboard updates are delivered over the air, with no technician visit needed." },
] as const;

export const RENTAL_EXCLUDED = "Napkin refills, which are purchased from Lyra";

export const RENTAL_SLUGS: ReadonlySet<string> = new Set(RENTAL_MODELS.map((m) => m.slug));

export const rentWithGst = (price: number) => Math.round(price * (1 + RENTAL_GST_RATE) * 100) / 100;

export const rupees = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

/* ─── What is paid at signing ─────────────────────────────── */

export type Upfront = "deposit" | "advance";
export type SigningCharge = { lines: { label: string; amount: number }[]; base: number; gst: number; total: number };

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Amount due at signing. Rent starts from month 1, so it is always included:
 * - "deposit": refundable deposit + the first month's rent, both plus 18% GST
 * - "advance": the first 3 months' rent plus 18% GST (no deposit)
 */
export function signingCharge(plan: RentalPlan, qty: number, upfront: Upfront): SigningCharge {
  const lines =
    upfront === "deposit"
      ? [
          { label: `Refundable security deposit (${rupees(RENTAL_DEPOSIT)} × ${qty})`, amount: RENTAL_DEPOSIT * qty },
          { label: `First month's rent (${rupees(plan.price)} × ${qty})`, amount: plan.price * qty },
        ]
      : [{ label: `${RENTAL_ADVANCE_MONTHS} months' rent in advance (${rupees(plan.price)} × ${RENTAL_ADVANCE_MONTHS} × ${qty})`, amount: plan.price * RENTAL_ADVANCE_MONTHS * qty }];
  const base = lines.reduce((n, l) => n + l.amount, 0);
  const gst = round2(base * RENTAL_GST_RATE);
  return { lines, base, gst, total: round2(base + gst) };
}

/* ─── Recharge plans (paying rent after signup) ───────────── */

export type RechargePeriod = "monthly" | "quarterly" | "yearly";

export const RECHARGE_PLANS: { id: RechargePeriod; label: string; months: number; discountPct: number; note: string }[] = [
  { id: "monthly", label: "Monthly", months: 1, discountPct: 0, note: "Pay one month at a time" },
  { id: "quarterly", label: "Quarterly", months: 3, discountPct: 5, note: "3 months, save 5% on rent" },
  { id: "yearly", label: "Yearly", months: 12, discountPct: 10, note: "12 months, save 10% on rent" },
];

/** Days a machine keeps working after its paid period ends, before it is locked. */
export const RENTAL_GRACE_DAYS = 7;

export const RECHARGE_PATH = "/rental/recharge";

export type RechargeCharge = { months: number; rent: number; discountPct: number; discount: number; base: number; gst: number; total: number };

/** Price of one recharge for one machine: discount on the rent, then 18% GST. */
export function rechargeCharge(monthlyRent: number, period: RechargePeriod): RechargeCharge {
  const p = RECHARGE_PLANS.find((x) => x.id === period)!;
  const rent = monthlyRent * p.months;
  const discount = round2((rent * p.discountPct) / 100);
  const base = round2(rent - discount);
  const gst = round2(base * RENTAL_GST_RATE);
  return { months: p.months, rent, discountPct: p.discountPct, discount, base, gst, total: round2(base + gst) };
}

/** Plain-English description of the two signing options, reused across pages. */
export const RENTAL_SIGNING_TEXT = `a ${rupees(RENTAL_DEPOSIT)} refundable deposit plus the first month's rent, or ${RENTAL_ADVANCE_MONTHS} months' rent in advance, plus 18% GST`;

/** One-line terms summary for FAQs, llms.txt-style copy and schema descriptions. */
export const RENTAL_TERMS_TEXT = `Installation, regular servicing, parts replacement, breakdown support, live monitoring and alerts are included; napkin refills are bought from Lyra. A ${RENTAL_MIN_YEARS}-year minimum agreement applies, and rent starts from month 1: at signing you pay ${RENTAL_SIGNING_TEXT}.`;

export const RENTAL_SUMMARY =RENTAL_PLANS.map((p) => `${p.capacity}-napkin ${rupees(p.price)}/month`).join(", ");
