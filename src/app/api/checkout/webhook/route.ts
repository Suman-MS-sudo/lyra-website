import { NextRequest, NextResponse } from "next/server";
import { formatINR } from "@/lib/data";
import { describeMailError, esc, missingMailSettings, sendToTeam } from "@/lib/mail";
import { verifyWebhookSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

type PaymentEntity = { id: string; order_id: string; amount: number; method?: string; email?: string; contact?: string; notes?: Record<string, string> };

/**
 * Razorpay webhook (payment.captured). A safety net for buyers who pay and then close the tab
 * before the browser reaches /api/checkout/verify: the team still gets the order from the notes.
 * Configure in Razorpay Dashboard → Webhooks: URL /api/checkout/webhook, event payment.captured,
 * and the same secret as RAZORPAY_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, signature)) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    const event = JSON.parse(raw) as { event: string; payload?: { payment?: { entity?: PaymentEntity } } };
    const p = event.payload?.payment?.entity;
    if (event.event !== "payment.captured" || !p) return NextResponse.json({ ok: true });

    const n = p.notes ?? {};
    if (!missingMailSettings().length) {
      const rows = [
        ["Reference", n.ref],
        ["Amount", formatINR(p.amount / 100)],
        ["Method", p.method],
        ["Payment ID", p.id],
        ["Razorpay order", p.order_id],
        ["Name", n.name],
        ["Phone", n.phone || p.contact],
        ["Email", n.email || p.email],
        ["Organisation", n.organisation],
        ["GSTIN", n.gstin],
        ["Address", n.address],
        ["Items", n.items],
      ]
        .map(([k, v]) => `<tr><td style="padding:5px 12px 5px 0;color:#6b7280;font-weight:600;">${k}</td><td style="padding:5px 0;">${esc(String(v ?? "—"))}</td></tr>`)
        .join("");
      await sendToTeam({
        subject: `[Razorpay] Payment captured ${n.ref ?? p.order_id} – ${formatINR(p.amount / 100)}`,
        html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;color:#111827;"><p style="font-weight:700;">Payment captured (webhook backup record)</p><p style="color:#6b7280;">If a “PAID order” email with the same reference also arrived, this one is just the audit copy.</p><table>${rows}</table></div>`,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Razorpay webhook error:", describeMailError(err));
    // 200 so Razorpay does not retry forever on a mail problem; the payment itself is safe.
    return NextResponse.json({ ok: true });
  }
}
