import nodemailer from "nodemailer";
import { SITE } from "@/lib/data";

export type OrderEmailItem = {
  name: string;
  fullName: string;
  code: string;
  quantity: number;
  unitPrice: number;
};

export type OrderEmailData = {
  orderId: string;
  paymentId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  items: OrderEmailItem[];
  breakdown: {
    subtotal: number;
    gst: number;
    total: number;
  };
};

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

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function itemsTableRows(items: OrderEmailItem[]) {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;">
          <div style="font-weight:700;color:#111827;font-size:14px;">${item.fullName}</div>
          <div style="color:#9ca3af;font-size:12px;margin-top:2px;">${item.code}</div>
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;text-align:center;color:#374151;font-size:14px;">${item.quantity}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;text-align:right;color:#374151;font-size:14px;">${formatCurrency(item.unitPrice)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;text-align:right;font-weight:700;color:#111827;font-size:14px;">${formatCurrency(item.unitPrice * item.quantity)}</td>
      </tr>`
    )
    .join("");
}

// ─── Customer confirmation email ──────────────────────────────────────────────

export function buildCustomerEmailHtml(data: OrderEmailData): string {
  const { orderId, paymentId, customer, items, breakdown } = data;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Order Confirmed – Lyra Enterprises</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#db2777,#ec4899);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <div style="font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Lyra Enterprises</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:4px;text-transform:uppercase;letter-spacing:2px;">#1 in India</div>
          <div style="margin-top:20px;background:rgba(255,255,255,0.15);border-radius:50%;width:64px;height:64px;display:inline-flex;align-items:center;justify-content:center;">
            <span style="font-size:32px;">✅</span>
          </div>
          <div style="font-size:22px;font-weight:700;color:#fff;margin-top:12px;">Payment Confirmed!</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.85);margin-top:6px;">Thank you for your order, ${customer.name.split(" ")[0]}.</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:32px 40px;">

          <!-- Order IDs -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
            <tr>
              <td style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Payment ID</td>
              <td style="text-align:right;font-family:monospace;font-size:13px;color:#111827;font-weight:700;">${paymentId}</td>
            </tr>
            <tr><td colspan="2" style="padding:6px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"></td></tr>
            <tr>
              <td style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Order ID</td>
              <td style="text-align:right;font-family:monospace;font-size:13px;color:#111827;font-weight:700;">${orderId}</td>
            </tr>
          </table>

          <!-- Items table -->
          <div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:12px;">Order Summary</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Product</th>
                <th style="padding:10px 16px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Qty</th>
                <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Unit Price</th>
                <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsTableRows(items)}
            </tbody>
          </table>

          <!-- Totals -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              <td style="padding:6px 0;font-size:14px;color:#6b7280;">Subtotal</td>
              <td style="padding:6px 0;text-align:right;font-size:14px;color:#374151;font-weight:600;">${formatCurrency(breakdown.subtotal)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:14px;color:#6b7280;">${breakdown.gst > 0 ? "GST (18%)" : "GST"}</td>
              <td style="padding:6px 0;text-align:right;font-size:14px;color:#374151;font-weight:600;">${breakdown.gst > 0 ? formatCurrency(breakdown.gst) : "Exempt"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0 6px;font-size:16px;font-weight:800;color:#111827;border-top:2px solid #f3f4f6;">Total Paid</td>
              <td style="padding:10px 0 6px;text-align:right;font-size:20px;font-weight:800;color:#db2777;border-top:2px solid #f3f4f6;">${formatCurrency(breakdown.total)}</td>
            </tr>
          </table>

          <!-- Delivery info -->
          <div style="margin-top:28px;padding:20px;background:#fdf2f8;border-radius:12px;border-left:4px solid #db2777;">
            <div style="font-size:14px;font-weight:700;color:#831843;margin-bottom:8px;">📦 Delivery Details</div>
            <div style="font-size:14px;color:#374151;line-height:1.8;">
              <strong>${customer.name}</strong><br>
              ${customer.company ? `${customer.company}<br>` : ""}
              ${customer.addressLine1 ? `${customer.addressLine1}<br>` : ""}
              ${customer.addressLine2 ? `${customer.addressLine2}<br>` : ""}
              ${[customer.city, customer.state, customer.pincode ? `- ${customer.pincode}` : ""].filter(Boolean).join(", ")}<br>
              📞 ${customer.phone}<br>
              ✉️ ${customer.email}
            </div>
          </div>

          <!-- What's next -->
          <div style="margin-top:28px;">
            <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:12px;">What happens next?</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["🔔", "Our team will call you within 24 hours to confirm delivery details."],
                ["📄", "A GST invoice will be emailed to you before dispatch."],
                ["🚚", "Your order will be dispatched within 3–5 working days."],
                ["📞", "Questions? Call us at +91-81223 78860 or WhatsApp us."],
              ]
                .map(
                  ([icon, text]) => `
              <tr><td style="padding:8px 0;font-size:14px;color:#374151;vertical-align:top;">
                <span style="margin-right:10px;">${icon}</span>${text}
              </td></tr>`
                )
                .join("")}
            </table>
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <div style="font-size:14px;font-weight:700;color:#111827;">Lyra Enterprises</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">${SITE.address}</div>
          <div style="margin-top:12px;">
            <a href="tel:${SITE.phone}" style="color:#db2777;text-decoration:none;font-size:13px;font-weight:600;">${SITE.phoneDisplay}</a>
            &nbsp;·&nbsp;
            <a href="mailto:${SITE.email}" style="color:#db2777;text-decoration:none;font-size:13px;font-weight:600;">${SITE.email}</a>
            &nbsp;·&nbsp;
            <a href="${SITE.url}" style="color:#db2777;text-decoration:none;font-size:13px;font-weight:600;">lyraenterprise.co.in</a>
          </div>
          <div style="font-size:11px;color:#9ca3af;margin-top:16px;">This is an automated order confirmation. Please do not reply to this email.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Owner notification email ──────────────────────────────────────────────────

export function buildOwnerEmailHtml(data: OrderEmailData): string {
  const { orderId, paymentId, customer, items, breakdown } = data;
  const itemsSummary = items.map((i) => `${i.name} × ${i.quantity}`).join(", ");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Order – Lyra Enterprises</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#111827;border-radius:16px 16px 0 0;padding:24px 32px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9ca3af;margin-bottom:6px;">Lyra Enterprises — Internal Notification</div>
          <div style="font-size:22px;font-weight:800;color:#fff;">🛒 New Order Received</div>
          <div style="margin-top:8px;font-size:14px;color:#d1fae5;font-weight:600;">${formatCurrency(breakdown.total)} &nbsp;·&nbsp; ${itemsSummary}</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:32px;">

          <!-- Customer details -->
          <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:12px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">👤 Customer Details</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
            ${[
              ["Name", customer.name],
              ["Email", `<a href="mailto:${customer.email}" style="color:#db2777;">${customer.email}</a>`],
              ["Phone", `<a href="tel:${customer.phone}" style="color:#db2777;">${customer.phone}</a>`],
              ["Company", customer.company || "—"],
              ["Address", [customer.addressLine1, customer.addressLine2].filter(Boolean).join(", ") || "—"],
              ["City", customer.city || "—"],
              ["State", customer.state || "—"],
              ["Pincode", customer.pincode || "—"],
            ]
              .map(
                ([label, value]) => `
            <tr>
              <td style="padding:6px 0;font-weight:600;color:#6b7280;width:120px;">${label}</td>
              <td style="padding:6px 0;">${value}</td>
            </tr>`
              )
              .join("")}
          </table>

          <!-- Items -->
          <div style="font-size:15px;font-weight:700;color:#111827;margin:24px 0 12px;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">📦 Items Ordered</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;">Product</th>
                <th style="padding:10px 14px;text-align:center;font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;">Qty</th>
                <th style="padding:10px 14px;text-align:right;font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;">Unit</th>
                <th style="padding:10px 14px;text-align:right;font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;">Total</th>
              </tr>
            </thead>
            <tbody>${itemsTableRows(items)}</tbody>
          </table>

          <!-- Totals -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              <td style="padding:5px 0;font-size:14px;color:#6b7280;">Subtotal</td>
              <td style="text-align:right;font-size:14px;color:#374151;font-weight:600;">${formatCurrency(breakdown.subtotal)}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;font-size:14px;color:#6b7280;">${breakdown.gst > 0 ? "GST (18%)" : "GST"}</td>
              <td style="text-align:right;font-size:14px;color:#374151;font-weight:600;">${breakdown.gst > 0 ? formatCurrency(breakdown.gst) : "Exempt"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0 4px;font-size:16px;font-weight:800;color:#111827;border-top:2px solid #f3f4f6;">Total Received</td>
              <td style="padding:10px 0 4px;text-align:right;font-size:20px;font-weight:800;color:#059669;border-top:2px solid #f3f4f6;">${formatCurrency(breakdown.total)}</td>
            </tr>
          </table>

          <!-- Payment IDs -->
          <div style="margin-top:24px;background:#f9fafb;border-radius:10px;padding:14px 18px;font-size:12px;color:#6b7280;">
            <div><span style="font-weight:600;">Payment ID:</span> <span style="font-family:monospace;color:#111827;">${paymentId}</span></div>
            <div style="margin-top:6px;"><span style="font-weight:600;">Order ID:</span> <span style="font-family:monospace;color:#111827;">${orderId}</span></div>
          </div>

          <!-- Quick actions -->
          <div style="margin-top:24px;text-align:center;">
            <a href="tel:${customer.phone}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:50px;margin:4px;">
              📞 Call ${customer.name.split(" ")[0]}
            </a>
            <a href="mailto:${customer.email}?subject=Your Order Confirmation – Lyra Enterprises&body=Dear ${encodeURIComponent(customer.name)}," style="display:inline-block;background:#db2777;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:50px;margin:4px;">
              ✉️ Reply to Customer
            </a>
          </div>

        </td></tr>

        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <div style="font-size:11px;color:#9ca3af;">Lyra Enterprises Internal Notification · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Send both emails ──────────────────────────────────────────────────────────

export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  const transporter = getTransporter();
  const from = `"Lyra Enterprises" <${process.env.SMTP_USER}>`;
  const ownerEmail = process.env.SMTP_USER ?? SITE.email;

  const itemsSummary = data.items.map((i) => `${i.name} ×${i.quantity}`).join(", ");

  await Promise.all([
    // Customer confirmation
    transporter.sendMail({
      from,
      to: data.customer.email,
      subject: `✅ Order Confirmed – ${itemsSummary} | Lyra Enterprises`,
      html: buildCustomerEmailHtml(data),
    }),
    // Owner notification
    transporter.sendMail({
      from,
      to: ownerEmail,
      subject: `🛒 New Order: ${itemsSummary} – ₹${data.breakdown.total.toLocaleString("en-IN")} – ${data.customer.name}`,
      html: buildOwnerEmailHtml(data),
    }),
  ]);
}
