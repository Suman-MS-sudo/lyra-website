import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { parseCustomer, reference } from "@/lib/order-core";
import { createOrder, razorpayConfigured, razorpayKeyId } from "@/lib/razorpay";
import { parseRental, rentalCharge, rentalNote } from "@/lib/rental-order";
import { AGREEMENT_VERSION } from "@/lib/rental-agreement";

export const runtime = "nodejs";

/**
 * Rental step 1: validate the plan + installation site, price the signing amount (deposit + month 1,
 * or 3 months in advance, plus GST) from lib/rental and open a Razorpay order for exactly that amount.
 */
export async function POST(req: NextRequest) {
  if (!razorpayConfigured()) {
    return NextResponse.json(
      { error: "Online payment is temporarily unavailable. Please call +91-81223 78860 to book your rental.", code: "not_configured" },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited("rental-checkout", ip, 12)) {
    return NextResponse.json({ error: "Too many attempts. Please wait a few minutes or call us." }, { status: 429 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (clean(body.website, 200)) return NextResponse.json({ error: "Please check your details." }, { status: 400 });

    const { customer: c, errors } = parseCustomer(body);
    const rental = parseRental(body);
    if (!rental) errors.push("rental");
    // Consent must be to the agreement version currently published (a stale tab must reload).
    if (body.agree !== true || body.agreementVersion !== AGREEMENT_VERSION) errors.push("agree");
    if (errors.length || !rental) return NextResponse.json({ error: "Please check your details.", fields: errors }, { status: 400 });

    const charge = rentalCharge(rental);
    const ref = reference().replace("LYR-", "LYR-R");

    const order = await createOrder({
      amountPaise: charge.paise,
      receipt: ref,
      notes: {
        ref,
        kind: "rental",
        name: c.name.slice(0, 250),
        phone: c.phone,
        email: c.email.slice(0, 250),
        organisation: c.organisation.slice(0, 250),
        gstin: c.gstin,
        address: `${c.address}, ${c.city}, ${c.state} - ${c.pincode}`.slice(0, 250),
        items: rentalNote(rental),
        // Read back by verify / status / webhook to create the rental in the database.
        plan: rental.plan.id,
        model: rental.model.slug,
        qty: String(rental.qty),
        upfront: rental.upfront,
        // Electronic acceptance record (version|time|IP), printed on the customer's agreement PDF.
        consent: `${AGREEMENT_VERSION}|${new Date().toISOString()}|${ip}`.slice(0, 250),
      },
    });

    return NextResponse.json({ keyId: razorpayKeyId(), orderId: order.id, amount: order.amount, currency: order.currency, reference: ref });
  } catch (err) {
    console.error("Rental create error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "We couldn't start the payment. Please try again or call +91-81223 78860." }, { status: 502 });
  }
}
