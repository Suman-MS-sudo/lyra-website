import { SITE } from "@/lib/data";
import { describeMailError, esc, missingMailSettings, sendToCustomer, sendToTeam } from "@/lib/mail";
import type { Customer } from "@/lib/order-core";
import type { RazorpayOrder } from "@/lib/razorpay";
import { recordRentalSignup, supabaseConfigured } from "@/lib/rental-db";
import { AGREEMENT_VERSION, type AgreementParties } from "@/lib/rental-agreement";
import { buildAgreementPdf } from "@/lib/rental-agreement-pdf";
import type { MailAttachment } from "@/lib/mail";
import {
  RENTAL_ADVANCE_MONTHS,
  RENTAL_MIN_YEARS,
  RENTAL_MODELS,
  RENTAL_PLANS,
  RECHARGE_PATH,
  rupees,
  signingCharge,
  type RentalPlan,
  type SigningCharge,
  type Upfront,
} from "@/lib/rental";

/**
 * Server-side pricing and emails for paying a rental's upfront amount online (/api/rental/*).
 * Amounts always come from lib/rental, never from the browser.
 */

export type RentalSelection = {
  plan: RentalPlan;
  model: (typeof RENTAL_MODELS)[number];
  qty: number;
  upfront: Upfront;
};

export type RentalCharge = SigningCharge & {
  /** Rupees as paise for Razorpay. */
  paise: number;
};

export const MAX_RENTAL_QTY = 50;

/** Parses {plan, model, qty, upfront} from the request; null if anything is invalid. */
export function parseRental(body: Record<string, unknown>): RentalSelection | null {
  const plan = RENTAL_PLANS.find((p) => p.id === body.plan);
  const model = RENTAL_MODELS.find((m) => m.slug === body.model);
  const qty = Math.floor(Number(body.qty));
  const upfront = body.upfront === "advance" ? "advance" : body.upfront === "deposit" ? "deposit" : null;
  if (!plan || !model || !upfront || !Number.isFinite(qty) || qty < 1 || qty > MAX_RENTAL_QTY) return null;
  return { plan, model, qty, upfront };
}

/** What is paid now, priced from lib/rental (deposit + month 1, or 3 months in advance; all plus 18% GST). */
export function rentalCharge(s: RentalSelection): RentalCharge {
  const c = signingCharge(s.plan, s.qty, s.upfront);
  return { ...c, paise: Math.round(c.total * 100) };
}

export function rentalSummary(s: RentalSelection): string {
  return `${s.qty} × Lyra ${s.model.name} on the ${s.plan.capacity}-napkin plan (${rupees(s.plan.price)}/month + GST)`;
}

/** Fits Razorpay's 256-character note limit; also read by the webhook backup email. */
export function rentalNote(s: RentalSelection): string {
  return `RENTAL ${s.qty}x ${s.model.name} ${s.plan.capacity}-napkin ${rupees(s.plan.price)}/mo, paid ${s.upfront === "deposit" ? "deposit+month1" : `${RENTAL_ADVANCE_MONTHS}mo advance`}`;
}

function chargeTableHtml(s: RentalSelection, c: RentalCharge): string {
  const monthly = s.plan.price * s.qty;
  const r = (k: string, v: string, strong = false) =>
    `<tr><td style="padding:7px 6px;border-bottom:1px solid #e5e7eb;color:#374151;">${k}</td><td align="right" style="padding:7px 6px;border-bottom:1px solid #e5e7eb;${strong ? "font-weight:800;color:#111827;" : ""}">${v}</td></tr>`;
  return `<table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;">
    ${r("Machine", `${s.qty} × Lyra ${esc(s.model.name)} (${esc(s.model.tech)})`)}
    ${r("Plan", `${s.plan.capacity}-napkin capacity · ${rupees(s.plan.price)}/month + GST per machine`)}
    ${r("Monthly rent", `${rupees(monthly)} + GST`)}
    ${c.lines.map((l) => r(esc(l.label), rupees(l.amount))).join("")}
    ${r("GST 18%", rupees(c.gst))}
    ${r("Paid now", rupees(c.total), true)}
  </table>
  <p style="font-size:12px;color:#6b7280;line-height:1.7;margin:10px 0 0;">
    ${RENTAL_MIN_YEARS}-year minimum agreement. Rent covers installation, regular servicing, parts replacement, breakdown support and live monitoring with alerts.
    Napkin refills are not included and are purchased from Lyra.${s.upfront === "deposit" ? " Rent from month 2 is billed monthly. The security deposit is refundable at the end of the agreement." : ` Rent from month ${RENTAL_ADVANCE_MONTHS + 1} is billed monthly.`}
  </p>`;
}

const row = (k: string, v: string) =>
  `<tr><td style="padding:6px 0;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">${k}</td><td style="padding:6px 0;">${v}</td></tr>`;

/**
 * Everything that happens once Razorpay confirms a rental signup payment: save the rental(s) to the
 * monitoring database, then email the team and the customer. Never throws.
 */
export async function confirmPaidRental(o: { ref: string; order: RazorpayOrder; paymentId: string; customer: Customer; rental: RentalSelection | null }) {
  let codes: string[] = [];
  let dbError = "";
  if (!supabaseConfigured()) dbError = "Database not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing)";
  else {
    try {
      codes = await recordRentalSignup(o.order, o.paymentId);
    } catch (e) {
      dbError = e instanceof Error ? e.message : String(e);
      console.error(`Rental ${o.ref} paid but not saved to the database:`, dbError);
    }
  }
  // The customer's executed agreement, built from the Razorpay order notes (server-written, trusted).
  let attachment: MailAttachment | undefined;
  try {
    const parties = partiesFromOrder(o.order, o.paymentId, codes);
    if (parties) {
      attachment = {
        filename: `Lyra-Rental-Agreement-${parties.ref}.pdf`,
        content: await buildAgreementPdf(parties),
        contentType: "application/pdf",
      };
    }
  } catch (e) {
    console.error(`Rental ${o.ref}: agreement PDF failed:`, e instanceof Error ? e.message : e);
  }
  await notifyPaidRental({ ...o, codes, dbError, attachment });
  return codes;
}

/** Schedule A + acceptance record for the agreement PDF, from the Razorpay order notes. */
export function partiesFromOrder(order: RazorpayOrder, paymentId: string, codes: string[]): AgreementParties | null {
  const n = order.notes ?? {};
  const qty = Math.floor(Number(n.qty));
  if (!n.plan || !n.model || !(qty >= 1)) return null;
  const [version = AGREEMENT_VERSION, at = new Date().toISOString(), ip = ""] = (n.consent ?? "").split("|");
  return {
    ref: n.ref || order.receipt,
    rentalCodes: codes,
    customerName: n.name ?? "",
    organisation: n.organisation ?? "",
    gstin: n.gstin ?? "",
    email: n.email ?? "",
    phone: n.phone ?? "",
    siteAddress: n.address ?? "",
    planId: n.plan,
    modelSlug: n.model,
    qty,
    upfront: n.upfront === "advance" ? "advance" : "deposit",
    signingTotal: order.amount / 100,
    acceptedAt: at,
    acceptedIp: ip,
    acceptedVersion: version,
    paymentId,
    orderId: order.id,
  };
}

/** Emails the team and the customer about a rental upfront payment Razorpay has confirmed. Never throws. */
export async function notifyPaidRental(o: {
  ref: string;
  order: RazorpayOrder;
  paymentId: string;
  customer: Customer;
  rental: RentalSelection | null;
  codes?: string[];
  dbError?: string;
  attachment?: MailAttachment;
}) {
  const { ref, order, paymentId, customer: c, rental, codes = [], dbError, attachment } = o;
  const attachments = attachment ? [attachment] : undefined;
  if (missingMailSettings().length) {
    console.error(`PAID rental ${ref} (${paymentId}) could not be emailed: mail settings missing`);
    return;
  }
  const paid = rupees(order.amount / 100);
  const charge = rental ? rentalCharge(rental) : null;
  const mismatch = charge && charge.paise !== order.amount;
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";

  const team = sendToTeam({
    attachments,
    replyTo: c.email || undefined,
    subject: `PAID rental ${ref}: ${c.name || order.notes?.name} – ${paid}`,
    html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;background:#f9fafb;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center"><table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">
<tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:22px 28px;">
  <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;">Lyra Enterprises · Internal notification</div>
  <div style="font-size:22px;font-weight:800;color:#fff;margin-top:4px;">New rental: upfront paid</div>
  <div style="margin-top:6px;font-size:14px;color:#86efac;font-weight:600;">${esc(ref)} · Paid ${paid}</div>
</td></tr>
<tr><td style="background:#fff;padding:26px 28px;">
  <p style="margin:0 0 14px;font-size:14px;color:#111827;font-weight:600;">${
    attachment
      ? `The customer accepted the ${RENTAL_MIN_YEARS}-year rental agreement online; their executed copy (PDF) is attached and was emailed to them.`
      : `⚠ The agreement PDF could not be generated. Send the customer the rental agreement manually.`
  } Next: schedule installation, then use Start rental in the monitoring admin and set up the customer's login.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
    ${row("Name", esc(c.name))}
    ${row("Organisation", esc(c.organisation) || "—")}
    ${row("Email", `<a href="mailto:${esc(c.email)}" style="color:#1d4ed8;">${esc(c.email)}</a>`)}
    ${row("Phone", `<a href="tel:+91${c.phone}" style="color:#1d4ed8;">+91 ${c.phone}</a>`)}
    ${row("GSTIN", esc(c.gstin) || "—")}
    ${row("Installation site", `${esc(c.address)}<br>${esc(c.city)}, ${esc(c.state)} – ${esc(c.pincode)}`)}
    ${c.notes ? row("Notes", esc(c.notes).replace(/\n/g, "<br>")) : ""}
    ${row("Payment", `<strong style="color:#15803d;">Paid ${paid}</strong> via Razorpay`)}
    ${row("Payment ID", esc(paymentId))}
    ${row("Razorpay order", esc(order.id))}
    ${mismatch ? row("⚠ Check", `Re-priced to ${rupees(charge.total)} but Razorpay order is ${paid}. Notes: ${esc(order.notes?.items ?? "")}`) : ""}
    ${!rental ? row("⚠ Check", `Rental details missing from the browser; Razorpay notes say: ${esc(order.notes?.items ?? "")}`) : ""}
    ${codes.length ? row("Rental codes", codes.map(esc).join("<br>")) : ""}
    ${dbError ? row("⚠ Not saved", `This rental is NOT in the monitoring database yet: ${esc(dbError)}. Add it manually.`) : ""}
  </table>
  ${rental && charge ? `<div style="margin:22px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;font-weight:700;">Rental</div>${chargeTableHtml(rental, charge)}` : ""}
</td></tr>
<tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:14px 28px;text-align:center;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">${esc(ref)} · ${when}</td></tr>
</table></td></tr></table></body></html>`,
  }).catch((e) => console.error("Paid rental team email error:", describeMailError(e)));

  const buyer =
    !c.email || !rental || !charge
      ? Promise.resolve()
      : sendToCustomer({
          attachments,
          to: c.email,
          subject: `Payment received: rental ${ref} | Lyra Enterprises`,
          html: `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;background:#f9fafb;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:16px 16px 0 0;padding:30px 36px;text-align:center;">
  <div style="font-size:24px;font-weight:800;color:#fff;">Lyra Enterprises</div>
  <div style="font-size:21px;font-weight:700;color:#fff;margin-top:18px;">Rental confirmed, payment received</div>
  <div style="font-size:14px;color:rgba(255,255,255,.9);margin-top:6px;">Thank you, ${esc(c.name.split(" ")[0])}. Reference <strong>${esc(ref)}</strong></div>
</td></tr>
<tr><td style="background:#fff;padding:28px 36px;">
  ${codes.length ? `<div style="margin:0 0 18px;padding:14px 16px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;font-size:13px;color:#14532d;line-height:1.7;"><strong>Your rental code${codes.length > 1 ? "s" : ""}:</strong> ${codes.map(esc).join(", ")}<br>Keep ${codes.length > 1 ? "these" : "this"} with your registered mobile number to recharge rent online at <a href="${SITE.url}${RECHARGE_PATH}?code=${encodeURIComponent(codes[0])}" style="color:#15803d;font-weight:600;">${SITE.url.replace("https://", "")}${RECHARGE_PATH}</a>.</div>` : ""}
  <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">We have received <strong>${paid}</strong> (Razorpay ID ${esc(paymentId)}) for ${esc(rentalSummary(rental))}. ${
    attachment ? "Your executed Equipment Rental Agreement is attached to this email as a PDF; please keep it for your records. " : ""
  }Our team will call you within one working day to fix the installation date and set up your monitoring login on the Lyra website.</p>
  ${chargeTableHtml(rental, charge)}
  <div style="margin:20px 0 0;padding:16px;background:#eff6ff;border-radius:12px;border-left:4px solid #1d4ed8;font-size:13px;color:#374151;line-height:1.8;">
    <strong>Installation site:</strong> ${esc(c.organisation ? `${c.organisation}, ` : "")}${esc(c.address)}, ${esc(c.city)}, ${esc(c.state)} – ${esc(c.pincode)}<br><strong>Phone:</strong> +91 ${c.phone}
  </div>
  <p style="font-size:13px;color:#6b7280;line-height:1.7;margin:18px 0 0;">Questions? Call <a href="tel:${SITE.phone}" style="color:#1d4ed8;font-weight:600;">${SITE.phoneDisplay}</a> or reply to this email with reference ${esc(ref)}.</p>
</td></tr>
<tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">${esc(SITE.address)}</td></tr>
</table></td></tr></table></body></html>`,
        }).catch((e) => console.error("Paid rental confirmation email error:", describeMailError(e)));

  await Promise.all([team, buyer]);
}
