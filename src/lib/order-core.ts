import { SITE, getProductBySlug, formatINR } from "@/lib/data";
import { GST_RATE, computeTotals, type Totals } from "@/lib/pricing";
import { clean, esc } from "@/lib/mail";

/**
 * Server-side order building for /api/checkout/* (Razorpay).
 * Prices always come from the catalogue, never from the browser.
 */

export type Line = { slug: string; name: string; code: string; qty: number; unit: number; total: number; napkin: boolean };

export type Customer = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

export function reference(): string {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LYR-${ymd}-${rand}`;
}

/** Validates the buyer details. Returns the cleaned customer and the names of any invalid fields. */
export function parseCustomer(body: Record<string, unknown>): { customer: Customer; errors: string[] } {
  const customer: Customer = {
    name: clean(body.name, 100),
    organisation: clean(body.organisation, 150),
    email: clean(body.email, 150).toLowerCase(),
    phone: clean(body.phone, 20).replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""),
    gstin: clean(body.gstin, 15).toUpperCase(),
    address: clean(body.address, 400),
    city: clean(body.city, 80),
    state: clean(body.state, 60),
    pincode: clean(body.pincode, 6),
    notes: clean(body.notes, 1000),
  };
  const c = customer;
  const errors: string[] = [];
  if (c.name.length < 2) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) errors.push("email");
  if (!/^[6-9]\d{9}$/.test(c.phone)) errors.push("phone");
  if (c.address.length < 5) errors.push("address");
  if (c.city.length < 2) errors.push("city");
  if (!c.state) errors.push("state");
  if (!/^\d{6}$/.test(c.pincode)) errors.push("pincode");
  if (c.gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(c.gstin)) errors.push("gstin");
  return { customer, errors };
}

/** Turns the browser's [{slug, qty}] into priced lines from the catalogue (unknown slugs dropped). */
export function buildLines(rawItems: unknown): Line[] {
  const items = Array.isArray(rawItems) ? (rawItems as { slug?: unknown; qty?: unknown }[]) : [];
  const lines: Line[] = [];
  for (const it of items.slice(0, 20)) {
    const p = typeof it.slug === "string" ? getProductBySlug(it.slug) : undefined;
    const qty = Math.floor(Number(it.qty));
    if (!p || !Number.isFinite(qty) || qty < 1 || qty > 100000) continue;
    if (lines.some((l) => l.slug === p.slug)) continue;
    lines.push({ slug: p.slug, name: p.fullName, code: p.code, qty, unit: p.price, total: p.price * qty, napkin: p.category === "napkin" });
  }
  return lines;
}

export function totalsFor(lines: Line[]): Totals {
  return computeTotals(lines.map((l) => ({ price: l.unit, qty: l.qty, category: l.napkin ? "napkin" : "vending-machine" })));
}

/** Compact item summary that fits Razorpay's 256-character note limit. */
export function compactItems(lines: Line[]): string {
  return lines.map((l) => `${l.qty}x ${l.code}`).join(", ").slice(0, 250);
}

export function itemsTableHtml(lines: Line[], opts: { paid?: boolean } = {}): string {
  const t = totalsFor(lines);
  const hasNapkins = lines.some((l) => l.napkin);
  const rows = lines
    .map(
      (l) => `<tr>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${esc(l.name)}<div style="font-size:11px;color:#9ca3af;">${esc(l.code)}</div></td>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;text-align:center;">${l.qty}</td>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatINR(l.unit)}${l.napkin ? " /napkin" : ""}</td>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">${formatINR(l.total)}</td>
        </tr>`,
    )
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:#374151;border-collapse:collapse;">
        <tr style="background:#f3f4f6;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">
          <th align="left" style="padding:8px 6px;">Item</th><th style="padding:8px 6px;">Qty</th><th align="right" style="padding:8px 6px;">Unit (ex-GST)</th><th align="right" style="padding:8px 6px;">Amount</th>
        </tr>
        ${rows}
        <tr><td colspan="3" align="right" style="padding:8px 6px;color:#6b7280;">Subtotal (ex-GST)</td><td align="right" style="padding:8px 6px;">${formatINR(t.subtotal)}</td></tr>
        <tr><td colspan="3" align="right" style="padding:4px 6px;color:#6b7280;">GST ${Math.round(GST_RATE * 100)}% (machines &amp; incinerators)</td><td align="right" style="padding:4px 6px;">${formatINR(t.gst)}</td></tr>
        <tr><td colspan="3" align="right" style="padding:8px 6px;font-weight:700;color:#111827;">${opts.paid ? "Amount paid" : "Estimated total"}</td><td align="right" style="padding:8px 6px;font-weight:800;color:#111827;">${formatINR(t.total)}</td></tr>
      </table>
      <p style="font-size:11px;color:#9ca3af;margin:8px 0 0;">${
        opts.paid
          ? `Freight is billed separately by delivery pincode${hasNapkins ? "; sanitary napkins are GST-exempt" : ""}.`
          : `Estimate only: freight is extra${hasNapkins ? ", and sanitary napkins are GST-exempt" : ""}. No payment has been taken.`
      }</p>`;
}

const row = (k: string, v: string) =>
  `<tr><td style="padding:6px 0;font-weight:600;color:#6b7280;width:130px;vertical-align:top;">${k}</td><td style="padding:6px 0;">${v}</td></tr>`;

/** Internal notification to the Lyra team. */
export function teamEmailHtml(o: { ref: string; heading: string; badge: string; customer: Customer; lines: Line[]; paid?: boolean; extraRows?: [string, string][] }): string {
  const c = o.customer;
  const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 12px;"><tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">
  <tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:22px 28px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;">Lyra Enterprises · Internal notification</div>
    <div style="font-size:22px;font-weight:800;color:#fff;margin-top:4px;">${esc(o.heading)}</div>
    <div style="margin-top:6px;font-size:14px;color:${o.paid ? "#86efac" : "#93c5fd"};font-weight:600;">${esc(o.ref)} · ${esc(o.badge)}</div>
  </td></tr>
  <tr><td style="background:#fff;padding:26px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
      ${row("Name", esc(c.name))}
      ${row("Organisation", esc(c.organisation) || "—")}
      ${row("Email", `<a href="mailto:${esc(c.email)}" style="color:#1d4ed8;">${esc(c.email)}</a>`)}
      ${row("Phone", `<a href="tel:+91${c.phone}" style="color:#1d4ed8;">+91 ${c.phone}</a>`)}
      ${row("GSTIN", esc(c.gstin) || "—")}
      ${row("Delivery address", `${esc(c.address)}<br>${esc(c.city)}, ${esc(c.state)} – ${esc(c.pincode)}`)}
      ${c.notes ? row("Notes", esc(c.notes).replace(/\n/g, "<br>")) : ""}
      ${(o.extraRows ?? []).map(([k, v]) => row(k, v)).join("")}
    </table>
    <div style="margin:22px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;font-weight:700;">Items</div>
    ${itemsTableHtml(o.lines, { paid: o.paid })}
    <div style="margin-top:22px;text-align:center;">
      <a href="tel:+91${c.phone}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">Call ${esc(c.name.split(" ")[0])}</a>
      <a href="https://wa.me/91${c.phone}" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">WhatsApp</a>
      <a href="mailto:${esc(c.email)}?subject=${encodeURIComponent(`Your Lyra order ${o.ref}`)}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">Reply by email</a>
    </div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:14px 28px;text-align:center;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">${esc(o.ref)} · ${when}</td></tr>
</table></td></tr></table></body></html>`;
}

/** Confirmation to the buyer. */
export function customerEmailHtml(o: { ref: string; title: string; intro: string; customer: Customer; lines: Line[]; paid?: boolean }): string {
  const c = o.customer;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:16px 16px 0 0;padding:30px 36px;text-align:center;">
    <div style="font-size:24px;font-weight:800;color:#fff;">Lyra Enterprises</div>
    <div style="font-size:12px;color:rgba(255,255,255,.8);margin-top:4px;text-transform:uppercase;letter-spacing:2px;">Direct manufacturer · Chennai</div>
    <div style="font-size:21px;font-weight:700;color:#fff;margin-top:18px;">${esc(o.title)}</div>
    <div style="font-size:14px;color:rgba(255,255,255,.9);margin-top:6px;">Thank you, ${esc(c.name.split(" ")[0])}. Reference <strong>${esc(o.ref)}</strong></div>
  </td></tr>
  <tr><td style="background:#fff;padding:28px 36px;">
    <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">${o.intro}</p>
    ${itemsTableHtml(o.lines, { paid: o.paid })}
    <div style="margin:22px 0 0;padding:16px;background:#eff6ff;border-radius:12px;border-left:4px solid #1d4ed8;font-size:13px;color:#374151;line-height:1.8;">
      <strong>Delivery to:</strong> ${esc(c.name)}${c.organisation ? `, ${esc(c.organisation)}` : ""}<br>${esc(c.address)}, ${esc(c.city)}, ${esc(c.state)} – ${esc(c.pincode)}<br><strong>Phone:</strong> +91 ${c.phone}
    </div>
    <p style="font-size:13px;color:#6b7280;line-height:1.7;margin:18px 0 0;">Need to change something? Call <a href="tel:${SITE.phone}" style="color:#1d4ed8;font-weight:600;">${SITE.phoneDisplay}</a> or reply to this email with reference ${esc(o.ref)}.</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;">
    <div style="font-size:14px;font-weight:700;color:#111827;">Lyra Enterprises</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">${esc(SITE.address)}</div>
  </td></tr>
</table></td></tr></table></body></html>`;
}
