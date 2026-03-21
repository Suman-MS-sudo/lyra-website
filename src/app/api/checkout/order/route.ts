import { NextResponse } from "next/server";
import {
  buildReceipt,
  calculateOrderAmounts,
  getRazorpayCredentials,
  getRazorpayInstance,
  parseCheckoutPayload,
} from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { product, quantity, customer } = parseCheckoutPayload(payload);
    const gstRate = product.category === "napkin" ? 0 : undefined;
    const { subtotal, gst, total, amountPaise } = calculateOrderAmounts(
      product.discountedPrice,
      quantity,
      gstRate
    );
    const razorpay = getRazorpayInstance();
    const { keyId } = getRazorpayCredentials();

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: buildReceipt(product.slug),
      notes: {
        productSlug: product.slug,
        productName: product.fullName.slice(0, 255),
        quantity: String(quantity),
        customerName: customer.name.slice(0, 255),
        customerEmail: customer.email.slice(0, 255),
        customerPhone: customer.phone.slice(0, 255),
        company: (customer.company ?? "").slice(0, 255),
        city: (customer.city ?? "").slice(0, 255),
        state: (customer.state ?? "").slice(0, 255),
      },
    });

    return NextResponse.json({
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      breakdown: {
        subtotal,
        gst,
        total,
      },
      product: {
        slug: product.slug,
        name: product.fullName,
        unitPrice: product.discountedPrice,
        quantity,
      },
      customer,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Razorpay order.";
    const status =
      message.includes("configured") || message.includes("required") || message.includes("Quantity")
        ? 400
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}