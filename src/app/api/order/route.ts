import { NextRequest, NextResponse } from "next/server";
import { SITE, GST_RATE, getProductBySlug, formatINR } from "@/lib/data";
import { clean, describeMailError, esc, missingMailSettings, rateLimited, sendToCustomer, sendToTeam } from "@/lib/mail";

export const runtime = "nodejs";

function reference(): string {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LYR-${ymd}-${rand}`;
}

type Line = { slug: string; name: string; code: string; qty: number; unit: number; total: number; napkin: boolean };

/* ── route ───────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited("order", ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes or call us." }, { status: 429 });
    }

    const body = (await req.json()) as Record<string, unknown>;

    // Spam trap: a hidden field that real users never fill in.
    if (clean(body.website, 200)) return NextResponse.json({ success: true, reference: "LYR-0000" });

    const name = clean(body.name, 100);
    const organisation = clean(body.organisation, 150);
    const email = clean(body.email, 150).toLowerCase();
    const phone = clean(body.phone, 20).replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
    const gstin = clean(body.gstin, 15).toUpperCase();
    const address = clean(body.address, 400);
    const city = clean(body.city, 80);
    const state = clean(body.state, 60);
    const pincode = clean(body.pincode, 6);
    const notes = clean(body.notes, 1000);

    const errors: string[] = [];
    if (name.length < 2) errors.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("email");
    if (!/^[6-9]\d{9}$/.test(phone)) errors.push("phone");
    if (address.length < 5) errors.push("address");
    if (city.length < 2) errors.push("city");
    if (!state) errors.push("state");
    if (!/^\d{6}$/.test(pincode)) errors.push("pincode");
    if (gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(gstin)) errors.push("gstin");

    // Prices always come from the catalogue, never from the browser.
    const rawItems = Array.isArray(body.items) ? (body.items as { slug?: unknown; qty?: unknown }[]) : [];
    const lines: Line[] = [];
    for (const it of rawItems.slice(0, 20)) {
      const p = typeof it.slug === "string" ? getProductBySlug(it.slug) : undefined;
      const qty = Math.floor(Number(it.qty));
      if (!p || !Number.isFinite(qty) || qty < 1 || qty > 100000) continue;
      if (lines.some((l) => l.slug === p.slug)) continue;
      lines.push({ slug: p.slug, name: p.fullName, code: p.code, qty, unit: p.price, total: p.price * qty, napkin: p.category === "napkin" });
    }
    if (lines.length === 0) errors.push("items");

    if (errors.length) {
      return NextResponse.json({ error: "Please check your details.", fields: errors }, { status: 400 });
    }

    const subtotal = lines.reduce((s, l) => s + l.total, 0);
    const gstBase = lines.filter((l) => !l.napkin).reduce((s, l) => s + l.total, 0);
    const gst = Math.round(gstBase * GST_RATE);
    const est = subtotal + gst;
    const hasNapkins = lines.some((l) => l.napkin);

    const ref = reference();
    const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";

    const itemRows = lines
      .map(
        (l) => `<tr>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${esc(l.name)}<div style="font-size:11px;color:#9ca3af;">${esc(l.code)}</div></td>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;text-align:center;">${l.qty}</td>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatINR(l.unit)}${l.napkin ? " /napkin" : ""}</td>
          <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">${formatINR(l.total)}</td>
        </tr>`
      )
      .join("");

    const itemsTable = `<table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:#374151;border-collapse:collapse;">
        <tr style="background:#f3f4f6;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">
          <th align="left" style="padding:8px 6px;">Item</th><th style="padding:8px 6px;">Qty</th><th align="right" style="padding:8px 6px;">Unit (ex-GST)</th><th align="right" style="padding:8px 6px;">Amount</th>
        </tr>
        ${itemRows}
        <tr><td colspan="3" align="right" style="padding:8px 6px;color:#6b7280;">Subtotal (ex-GST)</td><td align="right" style="padding:8px 6px;">${formatINR(subtotal)}</td></tr>
        <tr><td colspan="3" align="right" style="padding:4px 6px;color:#6b7280;">GST ${Math.round(GST_RATE * 100)}% (machines &amp; incinerators)</td><td align="right" style="padding:4px 6px;">${formatINR(gst)}</td></tr>
        <tr><td colspan="3" align="right" style="padding:8px 6px;font-weight:700;color:#111827;">Estimated total</td><td align="right" style="padding:8px 6px;font-weight:800;color:#111827;">${formatINR(est)}</td></tr>
      </table>
      <p style="font-size:11px;color:#9ca3af;margin:8px 0 0;">Estimate only: freight is extra${hasNapkins ? ", and GST on napkins is as applicable" : ""}. No payment has been taken.</p>`;

    const row = (k: string, v: string) =>
      `<tr><td style="padding:6px 0;font-weight:600;color:#6b7280;width:130px;vertical-align:top;">${k}</td><td style="padding:6px 0;">${v}</td></tr>`;

    const ownerHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 12px;"><tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">
  <tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:22px 28px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;">Lyra Enterprises · Internal notification</div>
    <div style="font-size:22px;font-weight:800;color:#fff;margin-top:4px;">New order request</div>
    <div style="margin-top:6px;font-size:14px;color:#93c5fd;font-weight:600;">${ref} · ${formatINR(est)} est.</div>
  </td></tr>
  <tr><td style="background:#fff;padding:26px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
      ${row("Name", esc(name))}
      ${row("Organisation", esc(organisation) || "—")}
      ${row("Email", `<a href="mailto:${esc(email)}" style="color:#1d4ed8;">${esc(email)}</a>`)}
      ${row("Phone", `<a href="tel:+91${phone}" style="color:#1d4ed8;">+91 ${phone}</a>`)}
      ${row("GSTIN", esc(gstin) || "—")}
      ${row("Delivery address", `${esc(address)}<br>${esc(city)}, ${esc(state)} – ${esc(pincode)}`)}
      ${notes ? row("Notes", esc(notes).replace(/\n/g, "<br>")) : ""}
    </table>
    <div style="margin:22px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;font-weight:700;">Items</div>
    ${itemsTable}
    <div style="margin-top:22px;text-align:center;">
      <a href="tel:+91${phone}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">Call ${esc(name.split(" ")[0])}</a>
      <a href="https://wa.me/91${phone}" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">WhatsApp</a>
      <a href="mailto:${esc(email)}?subject=${encodeURIComponent(`Your Lyra order request ${ref}`)}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">Reply by email</a>
    </div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:14px 28px;text-align:center;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">${ref} · ${when}</td></tr>
</table></td></tr></table></body></html>`;

    const customerHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:16px 16px 0 0;padding:30px 36px;text-align:center;">
    <div style="font-size:24px;font-weight:800;color:#fff;">Lyra Enterprises</div>
    <div style="font-size:12px;color:rgba(255,255,255,.8);margin-top:4px;text-transform:uppercase;letter-spacing:2px;">Direct manufacturer · Chennai</div>
    <div style="font-size:21px;font-weight:700;color:#fff;margin-top:18px;">Order request received</div>
    <div style="font-size:14px;color:rgba(255,255,255,.9);margin-top:6px;">Thank you, ${esc(name.split(" ")[0])}. Reference <strong>${ref}</strong></div>
  </td></tr>
  <tr><td style="background:#fff;padding:28px 36px;">
    <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">We have received your order request. <strong>No payment has been taken.</strong> Our team will contact you within <strong>24 hours</strong> to confirm availability, freight to ${esc(city)} and payment details.</p>
    ${itemsTable}
    <div style="margin:22px 0 0;padding:16px;background:#eff6ff;border-radius:12px;border-left:4px solid #1d4ed8;font-size:13px;color:#374151;line-height:1.8;">
      <strong>Delivery to:</strong> ${esc(name)}${organisation ? `, ${esc(organisation)}` : ""}<br>${esc(address)}, ${esc(city)}, ${esc(state)} – ${esc(pincode)}<br><strong>Phone:</strong> +91 ${phone}
    </div>
    <p style="font-size:13px;color:#6b7280;line-height:1.7;margin:18px 0 0;">Need to change something? Call <a href="tel:${SITE.phone}" style="color:#1d4ed8;font-weight:600;">${SITE.phoneDisplay}</a> or reply to this email with reference ${ref}.</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;">
    <div style="font-size:14px;font-weight:700;color:#111827;">Lyra Enterprises</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">${esc(SITE.address)}</div>
  </td></tr>
</table></td></tr></table></body></html>`;

    const missing = missingMailSettings();
    if (missing.length) {
      console.error(`Order email not sent: missing environment variable(s) on this deployment: ${missing.join(", ")}`);
      return NextResponse.json({ error: "We couldn't send your order. Please try again or call us." }, { status: 500 });
    }

    const subjectItems = lines.map((l) => `${l.qty}× ${l.name}`).join(", ").slice(0, 90);

    // The team notification is the one that matters: if it fails, report failure so the customer can retry or call.
    await sendToTeam({
      replyTo: email,
      subject: `New order request ${ref}: ${name} (${phone}) – ${subjectItems}`,
      html: ownerHtml,
    });
    // A failed confirmation must not turn a recorded order into an error.
    sendToCustomer({ to: email, subject: `Order request received ${ref} | Lyra Enterprises`, html: customerHtml }).catch((e) =>
      console.error("Order confirmation email error:", describeMailError(e)),
    );

    return NextResponse.json({ success: true, reference: ref });
  } catch (err) {
    console.error("Order email error:", describeMailError(err));
    return NextResponse.json({ error: "We couldn't send your order. Please try again or call us." }, { status: 500 });
  }
}
