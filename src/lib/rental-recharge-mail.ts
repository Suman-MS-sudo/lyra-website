import { SITE } from "@/lib/data";
import { describeMailError, esc, missingMailSettings, sendToCustomer, sendToTeam } from "@/lib/mail";
import type { RazorpayOrder } from "@/lib/razorpay";
import { applyRecharge, type Agreement, type ReminderKind } from "@/lib/rental-db";
import { eq, select } from "@/lib/supabase-server";
import { RECHARGE_PATH, RECHARGE_PLANS, RENTAL_GRACE_DAYS, rechargeCharge, rupees, type RechargePeriod } from "@/lib/rental";

/** Emails for rent recharges and expiry reminders. All helpers swallow mail errors. */

const fmtDate = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—";

const rechargeLink = (code: string) => `${SITE.url}${RECHARGE_PATH}?code=${encodeURIComponent(code)}`;

function shell(title: string, sub: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;background:#f9fafb;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:16px 16px 0 0;padding:28px 34px;text-align:center;">
  <div style="font-size:22px;font-weight:800;color:#fff;">Lyra Enterprises</div>
  <div style="font-size:20px;font-weight:700;color:#fff;margin-top:14px;">${title}</div>
  <div style="font-size:14px;color:rgba(255,255,255,.9);margin-top:6px;">${sub}</div>
</td></tr>
<tr><td style="background:#fff;padding:26px 34px;font-size:14px;color:#374151;line-height:1.7;">${body}
  <p style="font-size:13px;color:#6b7280;margin:18px 0 0;">Questions? Call <a href="tel:${SITE.phone}" style="color:#1d4ed8;font-weight:600;">${SITE.phoneDisplay}</a> or reply to this email.</p>
</td></tr>
<tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:16px 34px;text-align:center;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">${esc(SITE.address)}</td></tr>
</table></td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<p style="text-align:center;margin:22px 0 4px;"><a href="${href}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:50px;">${label}</a></p>`;

/** Receipt to the customer + note to the team after a recharge is applied. */
export async function notifyRecharge(o: { a: Agreement; period: RechargePeriod; orderId: string; paymentId: string; amountPaise: number }) {
  if (missingMailSettings().length) return;
  const { a, period, paymentId } = o;
  const plan = RECHARGE_PLANS.find((p) => p.id === period)!;
  const c = rechargeCharge(Number(a.monthly_rent), period);
  const paid = rupees(o.amountPaise / 100);
  const coverage = a.start_date
    ? `Rent is now paid until <strong>${fmtDate(a.paid_until)}</strong>.`
    : `Your machine is not installed yet, so these ${c.months} month${c.months > 1 ? "s are" : " is"} added to your prepaid balance (${a.prepaid_months} month${a.prepaid_months === 1 ? "" : "s"} in total) and start from installation.`;
  const table = `<table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;margin-top:12px;">
    <tr><td style="padding:6px 0;">${plan.label} rent (${rupees(Number(a.monthly_rent))} × ${c.months})</td><td align="right">${rupees(c.rent)}</td></tr>
    ${c.discount ? `<tr><td style="padding:6px 0;color:#15803d;">Discount ${c.discountPct}%</td><td align="right" style="color:#15803d;">−${rupees(c.discount)}</td></tr>` : ""}
    <tr><td style="padding:6px 0;">GST 18%</td><td align="right">${rupees(c.gst)}</td></tr>
    <tr><td style="padding:8px 0;border-top:1px solid #e5e7eb;font-weight:800;color:#111827;">Paid</td><td align="right" style="border-top:1px solid #e5e7eb;font-weight:800;color:#111827;">${paid}</td></tr>
  </table>`;

  const buyer = a.customer_email
    ? sendToCustomer({
        to: a.customer_email,
        subject: `Rent recharged: ${a.rental_code} | Lyra Enterprises`,
        html: shell(
          "Recharge successful",
          `${esc(a.rental_code)} · ${esc(a.model_name)} · ${a.capacity}-napkin plan`,
          `<p style="margin:0;">Thank you, ${esc(a.customer_name.split(" ")[0])}. We received <strong>${paid}</strong> (Razorpay ID ${esc(paymentId)}). ${coverage}</p>${table}`,
        ),
      }).catch((e) => console.error("Recharge receipt email error:", describeMailError(e)))
    : Promise.resolve();

  const team = sendToTeam({
    subject: `Rental recharge ${a.rental_code}: ${plan.label} – ${paid}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;color:#111827;">
      <p><strong>${esc(a.rental_code)}</strong> (${esc(a.organisation || a.customer_name)}) recharged <strong>${plan.label}</strong>: ${paid}.</p>
      <p>${a.start_date ? `Paid until ${fmtDate(a.paid_until)}.` : `Not installed yet; prepaid months now ${a.prepaid_months}.`}</p>
      <p style="color:#6b7280;">Payment ${esc(paymentId)} · order ${esc(o.orderId)}</p></div>`,
  }).catch((e) => console.error("Recharge team email error:", describeMailError(e)));

  await Promise.all([buyer, team]);
}

const REMINDER_COPY: Record<ReminderKind, { subject: (a: Agreement) => string; title: string; body: (a: Agreement) => string }> = {
  due_7: {
    subject: (a) => `Rent due in 7 days: ${a.rental_code}`,
    title: "Your rent is due in 7 days",
    body: (a) => `Rent for your ${esc(a.model_name)} (${esc(a.rental_code)}) is paid until <strong>${fmtDate(a.paid_until)}</strong>. Recharge before then to keep the machine running without interruption. Quarterly saves 5% and yearly saves 10%.`,
  },
  due_1: {
    subject: (a) => `Rent due tomorrow: ${a.rental_code}`,
    title: "Your rent is due tomorrow",
    body: (a) => `Rent for ${esc(a.rental_code)} is paid until <strong>${fmtDate(a.paid_until)}</strong>. Please recharge today.`,
  },
  expired: {
    subject: (a) => `Rent overdue, ${RENTAL_GRACE_DAYS}-day grace period started: ${a.rental_code}`,
    title: "Your rent is overdue",
    body: (a) => `Rent for ${esc(a.rental_code)} ran out on <strong>${fmtDate(a.paid_until)}</strong>. The machine keeps working for a ${RENTAL_GRACE_DAYS}-day grace period. If rent is not recharged by then, UPI and RFID-card vending on the machine will be paused.`,
  },
  locked: {
    subject: (a) => `Machine paused for unpaid rent: ${a.rental_code}`,
    title: "Your machine has been paused",
    body: (a) => `Rent for ${esc(a.rental_code)} has been unpaid since <strong>${fmtDate(a.paid_until)}</strong> and the grace period has ended, so UPI and RFID-card vending on the machine has been paused. Recharge the overdue rent to restore it straight away.`,
  },
};

/** Sends one reminder to the customer (team copied on expiry and lock). */
export async function sendReminder(a: Agreement, kind: ReminderKind) {
  if (missingMailSettings().length || !a.customer_email) return;
  const copy = REMINDER_COPY[kind];
  const html = shell(copy.title, `${esc(a.rental_code)} · ${esc(a.organisation || a.customer_name)}`, `<p style="margin:0;">${copy.body(a)}</p>${button(rechargeLink(a.rental_code), "Recharge rent now")}`);
  await Promise.all([
    sendToCustomer({ to: a.customer_email, subject: `${copy.subject(a)} | Lyra Enterprises`, html }).catch((e) =>
      console.error(`Rental reminder ${kind} email error:`, describeMailError(e)),
    ),
    kind === "expired" || kind === "locked"
      ? sendToTeam({ subject: `[Rental] ${copy.subject(a)}`, html }).catch((e) => console.error("Rental reminder team email error:", describeMailError(e)))
      : Promise.resolve(),
  ]);
}

/**
 * Applies a recharge Razorpay has confirmed (idempotent) and sends the receipt the first time.
 * Returns the updated agreement, or null if the order is not a rental recharge.
 */
export async function confirmPaidRecharge(order: RazorpayOrder, paymentId: string): Promise<Agreement | null> {
  if (order.notes?.kind !== "recharge") return null;
  const [r] = await select<{ id: string; status: string; kind: RechargePeriod }>(
    "rental_recharges",
    `select=id,status,kind&razorpay_order_id=${eq(order.id)}&limit=1`,
  );
  if (!r) throw new Error(`No rental recharge saved for order ${order.id}`);
  const firstTime = r.status !== "paid";
  const a = await applyRecharge(r.id, paymentId);
  if (firstTime) await notifyRecharge({ a, period: r.kind, orderId: order.id, paymentId, amountPaise: order.amount });
  return a;
}
