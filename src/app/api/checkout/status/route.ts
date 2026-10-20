import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { buildLines, parseCustomer } from "@/lib/order-core";
import { fetchOrder, fetchOrderPayments, razorpayConfigured } from "@/lib/razorpay";
import { notifyPaidOrder } from "@/lib/checkout-notify";

export const runtime = "nodejs";

/**
 * Called when the buyer closes the Razorpay window. With UPI apps people often pay in the app
 * and then close the window, so before calling it "cancelled" we ask Razorpay directly whether
 * the order was paid. Razorpay's own answer is the source of truth (no browser data is trusted
 * for the paid/unpaid decision); if paid, the order is confirmed and emailed like /verify.
 */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured()) return NextResponse.json({ paid: false }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited("checkout-status", ip, 20)) return NextResponse.json({ paid: false }, { status: 429 });

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const orderId = clean(body.order_id, 64);
    if (!/^order_[A-Za-z0-9]+$/.test(orderId)) return NextResponse.json({ paid: false }, { status: 400 });

    const order = await fetchOrder(orderId);
    if (order.status !== "paid") return NextResponse.json({ paid: false, status: order.status });

    const payments = await fetchOrderPayments(orderId);
    const captured = payments.find((p) => p.status === "captured") ?? payments.find((p) => p.status === "authorized");
    const paymentId = captured?.id ?? "";
    const ref = order.receipt || order.notes?.ref || orderId;

    const { customer } = parseCustomer(body);
    await notifyPaidOrder({ ref, order, paymentId, customer, lines: buildLines(body.items) });

    return NextResponse.json({ paid: true, reference: ref, paymentId, amount: order.amount / 100 });
  } catch (err) {
    console.error("Checkout status error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
