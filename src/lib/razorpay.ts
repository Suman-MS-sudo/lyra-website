import { createHmac } from "node:crypto";
import Razorpay from "razorpay";
import { getProductBySlug, type Product } from "@/lib/data";

const GST_RATE = 0.18;
const MAX_QUANTITY = 10;

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  state?: string;
};

export type ParsedCheckoutPayload = {
  product: Product;
  quantity: number;
  customer: CheckoutCustomer;
};

let razorpayInstance: Razorpay | null = null;

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function sanitizePhone(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[^\d+]/g, "").slice(0, 15);
}

function getRequiredEnvironmentValue(name: string, value?: string) {
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  return {
    keyId: getRequiredEnvironmentValue("RAZORPAY_KEY_ID", keyId),
    keySecret: getRequiredEnvironmentValue("RAZORPAY_KEY_SECRET", keySecret),
  };
}

export function getRazorpayInstance() {
  if (!razorpayInstance) {
    const { keyId, keySecret } = getRazorpayCredentials();
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayInstance;
}

export function calculateOrderAmounts(unitPrice: number, quantity: number, gstRate = GST_RATE) {
  const subtotal = unitPrice * quantity;
  const gst = Math.round(subtotal * gstRate);
  const total = subtotal + gst;

  return {
    subtotal,
    gst,
    total,
    amountPaise: total * 100,
  };
}

export function parseCheckoutPayload(payload: unknown): ParsedCheckoutPayload {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid checkout payload.");
  }

  const body = payload as Record<string, unknown>;
  const slug = sanitizeText(body.slug, 120);
  const product = getProductBySlug(slug);

  if (!product) {
    throw new Error("Selected product was not found.");
  }

  const quantity = Number(body.quantity);
  const maxQty = product.category === "napkin" ? 10000 : MAX_QUANTITY;

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxQty) {
    throw new Error(`Quantity must be between 1 and ${maxQty}.`);
  }

  const rawCustomer =
    body.customer && typeof body.customer === "object"
      ? (body.customer as Record<string, unknown>)
      : {};

  const customer: CheckoutCustomer = {
    name: sanitizeText(rawCustomer.name, 80),
    email: sanitizeText(rawCustomer.email, 120).toLowerCase(),
    phone: sanitizePhone(rawCustomer.phone),
    company: sanitizeText(rawCustomer.company, 80),
    city: sanitizeText(rawCustomer.city, 60),
    state: sanitizeText(rawCustomer.state, 60),
  };

  if (!customer.name) {
    throw new Error("Customer name is required.");
  }

  if (!customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    throw new Error("A valid email address is required.");
  }

  if (!customer.phone || customer.phone.replace(/\D/g, "").length < 10) {
    throw new Error("A valid phone number is required.");
  }

  return {
    product,
    quantity,
    customer,
  };
}

export function buildReceipt(slug: string) {
  const safeSlug = slug.replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 12) || "product";
  return `lyra-${safeSlug}-${Date.now().toString().slice(-10)}`.slice(0, 40);
}

export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const { keySecret } = getRazorpayCredentials();
  const expectedSignature = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expectedSignature === signature;
}