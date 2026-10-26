import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { parseCustomer } from "@/lib/order-core";
import { fetchOrder, fetchOrderPayments, razorpayConfigured } from "@/lib/razorpay";
import { confirmPaidRental, parseRental } from "@/lib/rental-order";

export const runtime = "nodejs";

/**
 * Called when the customer closes the Razorpay window: asks Razorpay whether the rental's
 * order was paid anyway (common with UPI apps). Razorpay's answer is the source of truth.
 */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured()) return NextResponse.json({ paid: false }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited("rental-status", ip, 20)) return NextResponse.json({ paid: false }, { status: 429 });

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
    const codes = await confirmPaidRental({ ref, order, paymentId, customer, rental: parseRental(body) });

    return NextResponse.json({ paid: true, reference: ref, paymentId, amount: order.amount / 100, codes });
  } catch (err) {
    console.error("Rental status error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
