import type { RazorpayOrder } from "@/lib/razorpay";
import { eq, insert, rpc, select, supabaseConfigured, update } from "@/lib/supabase-server";
import {
  RECHARGE_PLANS,
  RENTAL_ADVANCE_MONTHS,
  RENTAL_DEPOSIT,
  RENTAL_GRACE_DAYS,
  RENTAL_MIN_YEARS,
  RENTAL_MODELS,
  RENTAL_PLANS,
  rechargeCharge,
  signingCharge,
  type RechargeCharge,
  type RechargePeriod,
} from "@/lib/rental";

/**
 * Rentals and recharges in the shared monitoring database (tables from lyra-app-v3 migration
 * 20261026000001_rental_recharges.sql). Server-only.
 */

export type Agreement = {
  id: string;
  rental_code: string;
  booking_ref: string;
  machine_index: number;
  plan_id: "r25" | "r50" | "r100";
  capacity: number;
  monthly_rent: number;
  model_slug: string;
  model_name: string;
  machine_id: string | null;
  start_date: string | null;
  paid_until: string | null;
  prepaid_months: number;
  status: "open" | "ended" | "cancelled";
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  organisation: string | null;
  site_address: string | null;
};

export type RentalState = "pending_install" | "active" | "grace" | "locked" | "ended" | "cancelled";

export { supabaseConfigured };

/* ─── Dates (UTC calendar days, matching Postgres CURRENT_DATE on Supabase) ─── */

export const todayUTC = () => new Date().toISOString().slice(0, 10);

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Same as Postgres `date + interval 'n months'`: clamps to the last day of shorter months. */
function addMonths(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const total = m - 1 + n;
  const ty = y + Math.floor(total / 12);
  const tm = ((total % 12) + 12) % 12;
  const last = new Date(Date.UTC(ty, tm + 1, 0)).getUTCDate();
  return new Date(Date.UTC(ty, tm, Math.min(d, last))).toISOString().slice(0, 10);
}

const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);

/** Mirrors public.rental_state() in the database. */
export function stateOf(a: Pick<Agreement, "status" | "start_date" | "paid_until">, today = todayUTC()): RentalState {
  if (a.status !== "open") return a.status;
  if (!a.start_date || !a.paid_until) return "pending_install";
  if (a.paid_until >= today) return "active";
  if (addDays(a.paid_until, RENTAL_GRACE_DAYS) >= today) return "grace";
  return "locked";
}

/** paid_until after adding `months` (same rule as apply_rental_recharge). */
export function paidUntilAfter(a: Pick<Agreement, "start_date" | "paid_until">, months: number): string | null {
  if (!a.start_date) return null;
  const from = a.paid_until ? addDays(a.paid_until, 1) : a.start_date;
  return addDays(addMonths(from, months), -1);
}

/* ─── Signup (first payment on the rental page) ─── */

/**
 * Creates one agreement per machine plus its paid signup recharge, from the Razorpay order notes
 * (written by our own /api/rental/create, so they are trusted). Idempotent: safe to call from
 * verify, status and the webhook for the same order. Returns the rental codes.
 */
export async function recordRentalSignup(order: RazorpayOrder, paymentId: string): Promise<string[]> {
  const n = order.notes ?? {};
  const plan = RENTAL_PLANS.find((p) => p.id === n.plan);
  const model = RENTAL_MODELS.find((m) => m.slug === n.model);
  const qty = Math.floor(Number(n.qty));
  const upfront = n.upfront === "advance" ? "advance" : "deposit";
  const ref = n.ref || order.receipt;
  if (!plan || !model || !ref || !(qty >= 1)) throw new Error(`Rental order ${order.id} is missing plan details in its notes`);

  const rows = Array.from({ length: qty }, (_, k) => ({
    rental_code: `${ref}-${k + 1}`,
    booking_ref: ref,
    machine_index: k + 1,
    plan_id: plan.id,
    capacity: plan.capacity,
    monthly_rent: plan.price,
    model_slug: model.slug,
    model_name: model.name,
    min_term_months: RENTAL_MIN_YEARS * 12,
    deposit_amount: upfront === "deposit" ? RENTAL_DEPOSIT : 0,
    deposit_status: upfront === "deposit" ? "held" : "none",
    customer_name: n.name ?? "",
    customer_phone: n.phone ?? "",
    customer_email: n.email ?? "",
    organisation: n.organisation || null,
    gstin: n.gstin || null,
    site_address: n.address || null,
  }));
  await insert("rental_agreements", rows, { onConflict: "booking_ref,machine_index" });
  const agreements = await select<Agreement>("rental_agreements", `select=*&booking_ref=${eq(ref)}&order=machine_index`);

  const per = signingCharge(plan, 1, upfront);
  const months = upfront === "deposit" ? 1 : RENTAL_ADVANCE_MONTHS;
  const deposit = upfront === "deposit" ? RENTAL_DEPOSIT : 0;
  await insert(
    "rental_recharges",
    agreements.map((a) => ({
      agreement_id: a.id,
      kind: "signup",
      months,
      rent_amount: plan.price * months,
      deposit_amount: deposit,
      gst_amount: per.gst,
      total_amount: per.total,
      source: "website",
      razorpay_order_id: order.id,
    })),
    { onConflict: "agreement_id,razorpay_order_id" },
  );
  const recharges = await select<{ id: string }>("rental_recharges", `select=id&razorpay_order_id=${eq(order.id)}`);
  for (const r of recharges) await rpc("apply_rental_recharge", { p_recharge: r.id, p_payment_id: paymentId });
  return agreements.map((a) => a.rental_code);
}

/* ─── Recharges ─── */

/**
 * Rentals matching a rental code (e.g. LYR-R261026-AB12-1) or a booking reference (LYR-R261026-AB12,
 * which covers every machine in that booking), only where the mobile number is the one booked with.
 */
export async function findAgreements(code: string, phone: string): Promise<Agreement[]> {
  const c = code.trim().toUpperCase();
  let rows = await select<Agreement>("rental_agreements", `select=*&rental_code=${eq(c)}&limit=1`);
  if (!rows.length) rows = await select<Agreement>("rental_agreements", `select=*&booking_ref=${eq(c)}&order=machine_index`);
  return rows.filter((a) => a.customer_phone === phone);
}

/** A single rental by code (or by booking reference when that booking has one machine). */
export async function findAgreement(code: string, phone: string): Promise<Agreement | null> {
  const rows = await findAgreements(code, phone);
  return rows.length === 1 ? rows[0] : null;
}

export type RechargeOption = RechargeCharge & { id: RechargePeriod; label: string; note: string; newPaidUntil: string | null; unlocks: boolean };

export type RechargeQuote = {
  code: string;
  model: string;
  capacity: number;
  monthlyRent: number;
  organisation: string | null;
  state: RentalState;
  startDate: string | null;
  paidUntil: string | null;
  prepaidMonths: number;
  daysOverdue: number;
  options: RechargeOption[];
};

export function quoteFor(a: Agreement): RechargeQuote {
  const today = todayUTC();
  const state = stateOf(a, today);
  const daysOverdue = a.paid_until && a.paid_until < today ? daysBetween(a.paid_until, today) : 0;
  const options = RECHARGE_PLANS.map((p) => {
    const newPaidUntil = paidUntilAfter(a, p.months);
    return {
      id: p.id,
      label: p.label,
      note: p.note,
      ...rechargeCharge(Number(a.monthly_rent), p.id),
      newPaidUntil,
      // Back in service once the new paid-until date is within the grace window.
      unlocks: !newPaidUntil || addDays(newPaidUntil, RENTAL_GRACE_DAYS) >= today,
    };
  });
  return {
    code: a.rental_code,
    model: a.model_name,
    capacity: a.capacity,
    monthlyRent: Number(a.monthly_rent),
    organisation: a.organisation,
    state,
    startDate: a.start_date,
    paidUntil: a.paid_until,
    prepaidMonths: a.prepaid_months,
    daysOverdue,
    options,
  };
}

/** Saves an unpaid recharge tied to its Razorpay order. */
export async function createRecharge(a: Agreement, period: RechargePeriod, orderId: string, source: "website" | "dashboard") {
  const c = rechargeCharge(Number(a.monthly_rent), period);
  const [row] = await insert<{ id: string }>("rental_recharges", {
    agreement_id: a.id,
    kind: period,
    months: c.months,
    rent_amount: c.rent,
    discount_pct: c.discountPct,
    discount_amount: c.discount,
    gst_amount: c.gst,
    total_amount: c.total,
    source,
    razorpay_order_id: orderId,
  });
  return row;
}

/** Applies a paid recharge (idempotent) and returns the updated agreement. */
export async function applyRecharge(rechargeId: string, paymentId: string): Promise<Agreement> {
  return rpc<Agreement>("apply_rental_recharge", { p_recharge: rechargeId, p_payment_id: paymentId });
}

export async function markRechargeFailed(orderId: string) {
  await update("rental_recharges", `razorpay_order_id=${eq(orderId)}&status=eq.created`, { status: "failed" });
}

/* ─── Reminders ─── */

export type ReminderKind = "due_7" | "due_1" | "expired" | "locked";

/** Which reminder (if any) is due today for an agreement. */
export function reminderFor(a: Agreement, today = todayUTC()): ReminderKind | null {
  if (a.status !== "open" || !a.start_date || !a.paid_until) return null;
  const d = daysBetween(today, a.paid_until); // positive = days left
  if (d === 7) return "due_7";
  if (d === 1) return "due_1";
  if (d === -1) return "expired";
  if (d === -(RENTAL_GRACE_DAYS + 1)) return "locked";
  return null;
}

/** Agreements whose paid period ends within the reminder window around today. */
export function agreementsNearDue(today = todayUTC()): Promise<Agreement[]> {
  return select<Agreement>(
    "rental_agreements",
    `select=*&status=eq.open&start_date=not.is.null&paid_until=gte.${addDays(today, -(RENTAL_GRACE_DAYS + 1))}&paid_until=lte.${addDays(today, 7)}`,
  );
}

/** Records a reminder; returns false if it was already sent (so it is never sent twice). */
export async function claimReminder(a: Agreement, kind: ReminderKind): Promise<boolean> {
  const rows = await insert("rental_reminders", { agreement_id: a.id, kind, paid_until: a.paid_until }, { onConflict: "agreement_id,kind,paid_until" });
  return rows.length > 0;
}
