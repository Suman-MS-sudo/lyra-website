import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { clean, describeMailError, esc, missingMailSettings, rateLimited, sendToCustomer, sendToTeam } from "@/lib/mail";

export const runtime = "nodejs";

/**
 * Homepage contact form ("contact") and the callback pop-up ("callback").
 * Both used to post to a third-party form service; they now go out from the website mailbox.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited("lead", ip, 8)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes or call us." }, { status: 429 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    // Spam trap: a hidden field real users never fill in.
    if (clean(body.website, 200)) return NextResponse.json({ success: true });

    const kind = body.kind === "callback" ? "callback" : "contact";
    const name = clean(body.name, 100);
    const phone = clean(body.phone, 25).replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
    const email = clean(body.email, 150).toLowerCase();
    const organization = clean(body.organization, 150);
    const product = clean(body.product, 200);
    const message = clean(body.message, 1500);
    const source = clean(body.source, 80);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || (kind === "contact" && !emailOk)) {
      return NextResponse.json({ error: "Please check your details." }, { status: 400 });
    }

    const missing = missingMailSettings();
    if (missing.length) {
      console.error(`Lead email not sent: missing environment variable(s): ${missing.join(", ")}`);
      return NextResponse.json({ error: "Could not send your request." }, { status: 500 });
    }

    const when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
    const heading = kind === "callback" ? "Callback request" : "New website enquiry";
    const row = (k: string, v: string) =>
      `<tr><td style="padding:7px 0;font-weight:600;color:#6b7280;width:130px;vertical-align:top;">${k}</td><td style="padding:7px 0;">${v}</td></tr>`;

    const teamHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:28px 14px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:22px 30px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;">Lyra Enterprises · Internal notification</div>
    <div style="font-size:22px;font-weight:800;color:#fff;margin-top:4px;">${heading}</div>
    ${source ? `<div style="margin-top:6px;font-size:13px;color:#93c5fd;font-weight:600;">Source: ${esc(source)}</div>` : ""}
  </td></tr>
  <tr><td style="background:#fff;padding:28px 30px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
      ${row("Name", esc(name))}
      ${row("Phone", `<a href="tel:+91${phone}" style="color:#1d4ed8;">+91 ${phone}</a>`)}
      ${emailOk ? row("Email", `<a href="mailto:${esc(email)}" style="color:#1d4ed8;">${esc(email)}</a>`) : ""}
      ${organization ? row("Organisation", esc(organization)) : ""}
      ${product ? row("Interested in", esc(product)) : ""}
      ${message ? row("Message", esc(message).replace(/\n/g, "<br>")) : ""}
    </table>
    <div style="margin-top:22px;text-align:center;">
      <a href="tel:+91${phone}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">Call ${esc(name.split(" ")[0])}</a>
      <a href="https://wa.me/91${phone}" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:50px;margin:4px;">WhatsApp</a>
    </div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:14px 30px;text-align:center;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">${when}</td></tr>
</table></td></tr></table></body></html>`;

    await sendToTeam({
      replyTo: emailOk ? email : undefined,
      subject: kind === "callback" ? `Callback request${source ? ` (${source})` : ""}: ${name} (${phone})` : `New website enquiry: ${name} (${phone})`,
      html: teamHtml,
    });

    // Only the contact form collects an email address, so only it gets a confirmation.
    if (kind === "contact" && emailOk) {
      const customerHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:28px 14px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:16px 16px 0 0;padding:30px 36px;text-align:center;">
    <div style="font-size:24px;font-weight:800;color:#fff;">Lyra Enterprises</div>
    <div style="font-size:21px;font-weight:700;color:#fff;margin-top:16px;">Thanks, ${esc(name.split(" ")[0])}. We got your message</div>
  </td></tr>
  <tr><td style="background:#fff;padding:28px 36px;">
    <p style="font-size:15px;color:#374151;line-height:1.7;margin:0;">Our team will contact you within <strong>24 hours</strong>. If it's urgent, call <a href="tel:${SITE.phone}" style="color:#1d4ed8;font-weight:600;">${esc(SITE.phoneDisplay)}</a>.</p>
  </td></tr>
  <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">Lyra Enterprises · ${esc(SITE.address)}</td></tr>
</table></td></tr></table></body></html>`;
      sendToCustomer({ to: email, subject: "We received your enquiry | Lyra Enterprises", html: customerHtml }).catch((e) =>
        console.error("Lead confirmation email error:", describeMailError(e)),
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead email error:", describeMailError(err));
    return NextResponse.json({ error: "Could not send your request." }, { status: 500 });
  }
}
