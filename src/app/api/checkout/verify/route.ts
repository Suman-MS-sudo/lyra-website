import { NextResponse } from "next/server";
import { verifyPaymentSignature, parseCheckoutPayload } from "@/lib/razorpay";
import { sendOrderEmails, type OrderEmailItem } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const body = payload as Record<string, unknown>;

    // Accept both camelCase (cart page) and snake_case (Razorpay spread from ProductPurchasePanel)
    const orderId =
      (typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "") ||
      (typeof body.orderId === "string" ? body.orderId : "");
    const paymentId =
      (typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "") ||
      (typeof body.paymentId === "string" ? body.paymentId : "");
    const signature =
      (typeof body.razorpay_signature === "string" ? body.razorpay_signature : "") ||
      (typeof body.signature === "string" ? body.signature : "");

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: "Missing Razorpay payment details." }, { status: 400 });
    }

    const isValid = verifyPaymentSignature(orderId, paymentId, signature);

    if (!isValid) {
      return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
    }

    // ── Send order emails (fire-and-forget – never block the payment confirmation) ──
    try {
      const customer = body.customer as {
        name?: string; email?: string; phone?: string;
        company?: string; addressLine1?: string; addressLine2?: string;
        city?: string; state?: string; pincode?: string;
      } | undefined;

      if (customer?.email) {
        let items: OrderEmailItem[] = [];
        let subtotal = 0;

        // Cart page path – sends cartItems array directly
        if (Array.isArray(body.cartItems) && body.cartItems.length > 0) {
          items = (body.cartItems as Array<{
            name: string; fullName: string; code: string; quantity: number; unitPrice: number;
          }>).map((i) => ({
            name: i.name,
            fullName: i.fullName,
            code: i.code,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          }));
          subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
        }
        // ProductPurchasePanel path – sends slug + quantity; resolve via parseCheckoutPayload
        else if (typeof body.slug === "string") {
          const { product, quantity } = parseCheckoutPayload(body);
          items = [
            {
              name: product.name,
              fullName: product.fullName,
              code: product.code,
              quantity,
              unitPrice: product.discountedPrice,
            },
          ];
          subtotal = product.discountedPrice * quantity;
        }

        if (items.length > 0) {
          // For cart-level fallback: check if ALL items are napkins → 0% GST
          const allNapkins = body.cartItems
            ? (body.cartItems as Array<{ category?: string }>).every((i) => i.category === "napkin")
            : items.every(() => typeof body.slug === "string" && (body as Record<string, unknown>).category === "napkin");
          const gstRate = allNapkins ? 0 : 0.18;
          const gst = Math.round(subtotal * gstRate);
          const total = subtotal + gst;

          // Use amounts from payload if provided (more accurate for cart multi-item totals)
          const breakdown = {
            subtotal: typeof body.subtotal === "number" ? body.subtotal : subtotal,
            gst: typeof body.gst === "number" ? body.gst : gst,
            total: typeof body.total === "number" ? body.total : total,
          };

          void sendOrderEmails({
            orderId,
            paymentId,
            customer: {
              name: customer.name ?? "",
              email: customer.email,
              phone: customer.phone ?? "",
              company: customer.company,
              addressLine1: customer.addressLine1,
              addressLine2: customer.addressLine2,
              city: customer.city,
              state: customer.state,
              pincode: customer.pincode,
            },
            items,
            breakdown,
          });
        }
      }
    } catch {
      // Email errors must never fail the payment confirmation
    }

    return NextResponse.json({
      success: true,
      orderId,
      paymentId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify payment.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}