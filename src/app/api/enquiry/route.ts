import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/data";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, product, message } = await req.json() as {
      name: string;
      email: string;
      phone: string;
      company?: string;
      product: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !product?.trim()) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const transporter = getTransporter();
    const from = `"Lyra Enterprises" <${process.env.SMTP_USER}>`;
    const ownerEmail = process.env.SMTP_USER ?? SITE.email;

    const ownerHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:24px 32px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;margin-bottom:6px;">Lyra Enterprises — Internal Notification</div>
          <div style="font-size:22px;font-weight:800;color:#fff;">📩 New Rate Enquiry</div>
          <div style="margin-top:8px;font-size:14px;color:#d1fae5;font-weight:600;">${product}</div>
        </td></tr>
        <tr><td style="background:#fff;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
            <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#db2777;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#db2777;">${phone}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Company</td><td style="padding:8px 0;">${company || "—"}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#6b7280;">Product</td><td style="padding:8px 0;font-weight:700;color:#111827;">${product}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;font-weight:600;color:#6b7280;vertical-align:top;">Message</td><td style="padding:8px 0;">${message}</td></tr>` : ""}
          </table>
          <div style="margin-top:24px;text-align:center;">
            <a href="tel:${phone}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:50px;margin:4px;">📞 Call ${name.split(" ")[0]}</a>
            <a href="mailto:${email}" style="display:inline-block;background:#db2777;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:50px;margin:4px;">✉️ Reply to Customer</a>
          </div>
        </td></tr>
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <div style="font-size:11px;color:#9ca3af;">Lyra Enterprises · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    const customerHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#db2777,#ec4899);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <div style="font-size:24px;font-weight:800;color:#fff;">Lyra Enterprises</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:4px;text-transform:uppercase;letter-spacing:2px;">Direct Manufacturer · Chennai</div>
          <div style="font-size:22px;font-weight:700;color:#fff;margin-top:20px;">✅ Enquiry Received!</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.85);margin-top:6px;">Thank you, ${name.split(" ")[0]}. We'll get back to you shortly.</div>
        </td></tr>
        <tr><td style="background:#fff;padding:32px 40px;">
          <p style="font-size:15px;color:#374151;line-height:1.7;">We have received your rate enquiry for <strong>${product}</strong>. Our team will contact you within <strong>24 hours</strong> with pricing and delivery details.</p>
          <div style="margin:24px 0;padding:20px;background:#fdf2f8;border-radius:12px;border-left:4px solid #db2777;">
            <div style="font-size:14px;font-weight:700;color:#831843;margin-bottom:8px;">Your Enquiry Details</div>
            <div style="font-size:14px;color:#374151;line-height:2;">
              <strong>Product:</strong> ${product}<br>
              <strong>Name:</strong> ${name}<br>
              <strong>Phone:</strong> ${phone}<br>
              ${company ? `<strong>Company:</strong> ${company}<br>` : ""}
            </div>
          </div>
          <p style="font-size:14px;color:#6b7280;line-height:1.7;">You can also reach us directly at <a href="tel:+918122378860" style="color:#db2777;font-weight:600;">+91-81223 78860</a> or reply to this email.</p>
        </td></tr>
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <div style="font-size:14px;font-weight:700;color:#111827;">Lyra Enterprises</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">${SITE.address}</div>
          <div style="margin-top:12px;font-size:13px;">
            <a href="tel:${SITE.phone}" style="color:#db2777;text-decoration:none;font-weight:600;">${SITE.phoneDisplay}</a> &nbsp;·&nbsp;
            <a href="mailto:${SITE.email}" style="color:#db2777;text-decoration:none;font-weight:600;">${SITE.email}</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    await Promise.all([
      transporter.sendMail({
        from,
        to: email,
        subject: `Enquiry Received – ${product} | Lyra Enterprises`,
        html: customerHtml,
      }),
      transporter.sendMail({
        from,
        to: ownerEmail,
        subject: `📩 Rate Enquiry: ${product} – ${name} (${phone})`,
        html: ownerHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry email error:", err);
    return NextResponse.json({ error: "Failed to send enquiry." }, { status: 500 });
  }
}
