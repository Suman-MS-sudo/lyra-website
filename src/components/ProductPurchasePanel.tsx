"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

type ProductPurchasePanelProps = {
  product: Product;
};

type CheckoutFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
  quantity: number;
};

type VerifyResponse = {
  success: boolean;
  orderId: string;
  paymentId: string;
};

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
};

type RazorpayInstance = {
  open: () => void;
  on: (eventName: string, callback: (response: RazorpayFailureResponse) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay checkout is only available in the browser."));
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay checkout."));
      document.body.appendChild(script);
    });
  }

  return razorpayScriptPromise;
}

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addToCart } = useCart();
  const [form, setForm] = useState<CheckoutFormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successDetails, setSuccessDetails] = useState<VerifyResponse | null>(null);

  const subtotal = product.discountedPrice * form.quantity;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  async function handleCheckout() {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessDetails(null);

      await loadRazorpayScript();

      const orderResponse = await fetch("/api/checkout/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: product.slug,
          quantity: form.quantity,
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            city: form.city,
            state: form.state,
          },
        }),
      });

      const orderPayload = (await orderResponse.json()) as
        | {
            error?: string;
            keyId: string;
            orderId: string;
            amount: number;
            currency: string;
          }
        | { error: string };

      if (!orderResponse.ok || !("orderId" in orderPayload)) {
        throw new Error(orderPayload.error || "Unable to create payment order.");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout did not load.");
      }

      const razorpay = new window.Razorpay({
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "Lyra Enterprises",
        description: `${product.fullName} x ${form.quantity}`,
        order_id: orderPayload.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          productSlug: product.slug,
          quantity: String(form.quantity),
          company: form.company,
          city: form.city,
          state: form.state,
        },
        theme: {
          color: "#db2777",
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
        handler: async (paymentResponse) => {
          try {
            setIsSubmitting(true);

            const verifyResponse = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                slug: product.slug,
                quantity: form.quantity,
                customer: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  company: form.company,
                  city: form.city,
                  state: form.state,
                },
                ...paymentResponse,
              }),
            });

            const verifyPayload = (await verifyResponse.json()) as VerifyResponse | { error: string };

            if (!verifyResponse.ok || !("success" in verifyPayload && verifyPayload.success)) {
              throw new Error(
                "error" in verifyPayload ? verifyPayload.error : "Unable to verify payment."
              );
            }

            setSuccessDetails(verifyPayload);
            setErrorMessage("");
          } catch (error) {
            setErrorMessage(
              error instanceof Error ? error.message : "Payment verification failed."
            );
          } finally {
            setIsSubmitting(false);
          }
        },
      });

      razorpay.on("payment.failed", (response) => {
        setErrorMessage(response.error?.description || "Payment failed. Please try again.");
        setIsSubmitting(false);
      });

      razorpay.open();
      setIsSubmitting(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to start payment.");
      setIsSubmitting(false);
    }
  }

  return (
    <section id="buy-now" className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-500">Online Purchase</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Pay securely with Razorpay</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
                Complete your order online using UPI, cards, net banking or wallets. Share your contact details below, choose quantity and launch the secure Razorpay checkout.
              </p>
            </div>
            <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              Pan-India dispatch in 3-7 business days
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                placeholder="Your name"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                placeholder="you@company.com"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-gray-700">
              Phone Number
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                placeholder="+91 98765 43210"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-gray-700">
              Quantity
              <input
                type="number"
                min={1}
                max={10}
                value={form.quantity}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    quantity: Math.min(10, Math.max(1, Number(event.target.value) || 1)),
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              />
            </label>
            <label className="block text-sm font-semibold text-gray-700">
              Company or Institution
              <input
                type="text"
                value={form.company}
                onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                placeholder="Optional"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2 sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                City
                <input
                  type="text"
                  value={form.city}
                  onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="Optional"
                />
              </label>
              <label className="block text-sm font-semibold text-gray-700">
                State
                <input
                  type="text"
                  value={form.state}
                  onChange={(event) => setForm((current) => ({ ...current, state: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="Optional"
                />
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {successDetails && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800">
              <p className="font-bold text-green-900">Payment received successfully.</p>
              <p className="mt-1">Payment ID: {successDetails.paymentId}</p>
              <p className="mt-1">Order ID: {successDetails.orderId}</p>
              <p className="mt-1">Our team will use your submitted details to confirm dispatch and invoice.</p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => addToCart(product, form.quantity)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-700 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Preparing secure checkout..." : `Pay ${formatCurrency(total)} with Razorpay`}
            </button>
          </div>
        </div>

        <aside className="rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-300">Order Summary</p>
          <h3 className="mt-3 text-2xl font-bold">{product.name}</h3>
          <p className="mt-2 text-sm text-white/75">{product.fullName}</p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <dt className="text-white/70">Unit Price</dt>
              <dd className="font-semibold">{formatCurrency(product.discountedPrice)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <dt className="text-white/70">Quantity</dt>
              <dd className="font-semibold">{form.quantity}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <dt className="text-white/70">Subtotal</dt>
              <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <dt className="text-white/70">GST (18%)</dt>
              <dd className="font-semibold">{formatCurrency(gst)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 text-base">
              <dt className="font-semibold text-white">Total Payable</dt>
              <dd className="text-2xl font-extrabold">{formatCurrency(total)}</dd>
            </div>
          </dl>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            <p className="font-semibold text-white">Accepted via Razorpay</p>
            <p className="mt-2">UPI, credit cards, debit cards, net banking and supported wallets.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}