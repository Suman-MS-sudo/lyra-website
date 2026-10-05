import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { clean, describeMailError, esc, missingMailSettings, rateLimited, sendToCustomer, sendToTeam } from "@/lib/mail";

export const runtime = "nodejs";

/** Quote request from a product page. Emails the team and confirms to the customer, both from the website mailbox. */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited("enquiry", ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes or call us." }, { status: 429 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const name = clean(body.name, 100);
    const email = clean(body.email, 150).toLowerCase();
    const phone = clean(body.phone, 25);
    const company = clean(body.company, 150);
    const product = clean(body.product, 200);
    const message = clean(body.message, 1500);

    if (name.length < 2 || !product || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const missing = missingMailSettings();
    if (missing.length) {
      console.error(`Enquiry email not sent: missing environment variable(s): ${missing.join(", ")}`);
      return NextResponse.json({ error: "Failed to send enquiry." }, { status: 500 });
    }

    const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
    const firstName = esc(name.split(" ")[0]);
    const telHref = esc(phone.replace(/[^\d+]/g, ""));

    const teamHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:24px 32px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;margin-bottom:6px;">Lyra Enterprises · Internal notification</div>
    <div style="font-size:22px;font-weight:800;color:#fff;">New rate enquiry</div>
    <div style="margin-top:8px;font-size:14px;color:#93c5fd;font-weight:600;">${esc(product)}</div>
  </td></tr>
  <tr><td style="background:#fff;padding:32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
      <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;">${esc(name)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${esc(email)}" style="color:#1d4ed8;">${esc(email)}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Phone</td><td style="padding:8px 0;"><a href="tel:${telHref}" style="color:#1d4ed8;">${esc(phone)}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Company</td><td style="padding:8px 0;">${esc(company) || "—"}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Product</td><td style="padding:8px 0;font-weight:700;color:#111827;">${esc(product)}</td></tr>
      ${message ? `<tr><td style="padding:8px 0;font-weight:600;color:#6b7280;vertical-align:top;">Message</td><td style="padding:8px 0;">${esc(message).replace(/\n/g, "<br>")}</td></tr>` : ""}
    </table>
    <div style="margin-top:24px;text-align:center;">
      <a href="tel:${telHref}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:50px;margin:4px;">Call ${firstName}</a>
      <a href="mailto:${esc(email)}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:50px;margin:4px;">Reply to customer</a>
    </div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
    <div style="font-size:11px;color:#9ca3af;">Lyra Enterprises · ${when}</div>
  </td></tr>
</table></td></tr></table></body></html>`;

    const customerHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
    <div style="font-size:24px;font-weight:800;color:#fff;">Lyra Enterprises</div>
    <div style="font-size:12px;color:rgba(255,255,255,.8);margin-top:4px;text-transform:uppercase;letter-spacing:2px;">Direct manufacturer · Chennai</div>
    <div style="font-size:22px;font-weight:700;color:#fff;margin-top:20px;">Enquiry received</div>
    <div style="font-size:14px;color:rgba(255,255,255,.9);margin-top:6px;">Thank you, ${firstName}. We'll get back to you shortly.</div>
  </td></tr>
  <tr><td style="background:#fff;padding:32px 40px;">
    <p style="font-size:15px;color:#374151;line-height:1.7;">We have received your rate enquiry for <strong>${esc(product)}</strong>. Our team will contact you within <strong>24 hours</strong> with pricing and delivery details.</p>
    <div style="margin:24px 0;padding:20px;background:#eff6ff;border-radius:12px;border-left:4px solid #1d4ed8;">
      <div style="font-size:14px;font-weight:700;color:#1e3a8a;margin-bottom:8px;">Your enquiry details</div>
      <div style="font-size:14px;color:#374151;line-height:2;">
        <strong>Product:</strong> ${esc(product)}<br>
        <strong>Name:</strong> ${esc(name)}<br>
        <strong>Phone:</strong> ${esc(phone)}<br>
        ${company ? `<strong>Company:</strong> ${esc(company)}<br>` : ""}
      </div>
    </div>
    <p style="font-size:14px;color:#6b7280;line-height:1.7;">You can also reach us at <a href="tel:+918122378860" style="color:#1d4ed8;font-weight:600;">+91-81223 78860</a> or reply to this email.</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
    <div style="font-size:14px;font-weight:700;color:#111827;">Lyra Enterprises</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">${esc(SITE.address)}</div>
    <div style="margin-top:12px;font-size:13px;">
      <a href="tel:${SITE.phone}" style="color:#1d4ed8;text-decoration:none;font-weight:600;">${esc(SITE.phoneDisplay)}</a>
    </div>
  </td></tr>
</table></td></tr></table></body></html>`;

    // The team notification must succeed; a failed confirmation must not turn a recorded enquiry into an error.
    await sendToTeam({ replyTo: email, subject: `Rate enquiry: ${product} – ${name} (${phone})`, html: teamHtml });
    sendToCustomer({ to: email, subject: `Enquiry received – ${product} | Lyra Enterprises`, html: customerHtml }).catch((e) =>
      console.error("Enquiry confirmation email error:", describeMailError(e)),
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry email error:", describeMailError(err));
    return NextResponse.json({ error: "Failed to send enquiry." }, { status: 500 });
  }
}
