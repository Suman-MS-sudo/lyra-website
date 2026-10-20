import crypto from "node:crypto";

/**
 * Minimal Razorpay server client (Orders API + signature checks) over fetch, no SDK needed.
 *
 * Env:
 *   RAZORPAY_KEY_ID         rzp_live_… / rzp_test_…  (public, sent to the browser)
 *                           (NEXT_PUBLIC_RAZORPAY_KEY_ID is accepted as an alias)
 *   RAZORPAY_KEY_SECRET     secret key (server only)
 *   RAZORPAY_WEBHOOK_SECRET secret set on the webhook in the Razorpay dashboard (optional)
 */

const API = "https://api.razorpay.com/v1";

/** Public key id; either env name works. */
export function razorpayKeyId(): string {
  return (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
}

export function razorpayConfigured(): boolean {
  return Boolean(razorpayKeyId() && process.env.RAZORPAY_KEY_SECRET);
}

function authHeader(): string {
  return "Basic " + Buffer.from(`${razorpayKeyId()}:${(process.env.RAZORPAY_KEY_SECRET ?? "").trim()}`).toString("base64");
}

export type RazorpayOrder = {
  id: string;
  amount: number; // paise
  amount_paid: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  notes: Record<string, string>;
};

export async function createOrder(input: { amountPaise: number; receipt: string; notes: Record<string, string> }): Promise<RazorpayOrder> {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { Authorization: authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ amount: input.amountPaise, currency: "INR", receipt: input.receipt, notes: input.notes }),
    cache: "no-store",
  });
  const data = (await res.json()) as RazorpayOrder & { error?: { description?: string } };
  if (!res.ok) throw new Error(`Razorpay order failed: ${res.status} ${data.error?.description ?? ""}`);
  return data;
}

export async function fetchOrder(id: string): Promise<RazorpayOrder> {
  const res = await fetch(`${API}/orders/${encodeURIComponent(id)}`, { headers: { Authorization: authHeader() }, cache: "no-store" });
  const data = (await res.json()) as RazorpayOrder & { error?: { description?: string } };
  if (!res.ok) throw new Error(`Razorpay fetch order failed: ${res.status} ${data.error?.description ?? ""}`);
  return data;
}

export type RazorpayPayment = { id: string; status: "created" | "authorized" | "captured" | "refunded" | "failed"; amount: number; method?: string };

export async function fetchOrderPayments(orderId: string): Promise<RazorpayPayment[]> {
  const res = await fetch(`${API}/orders/${encodeURIComponent(orderId)}/payments`, { headers: { Authorization: authHeader() }, cache: "no-store" });
  const data = (await res.json()) as { items?: RazorpayPayment[]; error?: { description?: string } };
  if (!res.ok) throw new Error(`Razorpay fetch payments failed: ${res.status} ${data.error?.description ?? ""}`);
  return data.items ?? [];
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

/** Checkout handler signature: HMAC-SHA256(order_id|payment_id, key_secret). */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  const expected = crypto
    .createHmac("sha256", (process.env.RAZORPAY_KEY_SECRET ?? "").trim())
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeEqual(expected, signature);
}

/** Webhook signature: HMAC-SHA256(raw body, webhook secret). */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}
