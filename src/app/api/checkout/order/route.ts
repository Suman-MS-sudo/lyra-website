import { NextResponse } from "next/server";
import {
  buildReceipt,
  calculateOrderAmounts,
  getRazorpayCredentials,
  getRazorpayInstance,
  parseCheckoutPayload,
} from "@/lib/razorpay";
import { getProductBySlug } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const body = payload as Record<string, unknown>;
    const { product, quantity, customer } = parseCheckoutPayload(payload);
    const razorpay = getRazorpayInstance();
    const { keyId } = getRazorpayCredentials();

    // ── Multi-item cart: calculate totals across all items ──────────────────
    let subtotal: number;
    let gst: number;
    let total: number;
    let amountPaise: number;

    const rawCartItems = Array.isArray(body.cartItems)
      ? (body.cartItems as Array<{ slug?: string; quantity?: number; unitPrice?: number }>)
      : null;

    if (rawCartItems && rawCartItems.length > 0) {
      subtotal = 0;
      let taxableSubtotal = 0;

      for (const item of rawCartItems) {
        const itemProduct = typeof item.slug === "string" ? getProductBySlug(item.slug) : null;
        const unitPrice = itemProduct?.discountedPrice ?? Number(item.unitPrice ?? 0);
        const qty = Math.max(1, Number(item.quantity ?? 1));
        const lineTotal = unitPrice * qty;
        subtotal += lineTotal;
        if (itemProduct?.category !== "napkin") {
          taxableSubtotal += lineTotal;
        }
      }

      gst = Math.round(taxableSubtotal * 0.18);
      total = subtotal + gst;
      amountPaise = total * 100;
    } else {
      // Single-product purchase (ProductPurchasePanel)
      const gstRate = product.category === "napkin" ? 0 : undefined;
      ({ subtotal, gst, total, amountPaise } = calculateOrderAmounts(
        product.discountedPrice,
        quantity,
        gstRate
      ));
    }

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