"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import { useCart } from "@/context/CartContext";

const GST_RATE = 0.18;

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
};

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, string>;
  theme: { color: string };
  modal: { ondismiss: () => void };
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
};

type RazorpayInstance = {
  open: () => void;
  on: (eventName: string, callback: (r: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;
function loadRazorpayScript() {
  if (typeof window === "undefined") return Promise.reject(new Error("Browser only"));
  if (window.Razorpay) return Promise.resolve();
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
}

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

export default function CartPage() {
  const { items, totalItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [form, setForm] = useState<CustomerForm>({
    name: "", email: "", phone: "", company: "", addressLine1: "", addressLine2: "", city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successPaymentId, setSuccessPaymentId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const subtotal = items.reduce((s, i) => s + i.product.discountedPrice * i.quantity, 0);
  const taxableSubtotal = items.reduce((s, i) => i.product.category !== "napkin" ? s + i.product.discountedPrice * i.quantity : s, 0);
  const gst = Math.round(taxableSubtotal * GST_RATE);
  const total = subtotal + gst;

  function validate(): boolean {
    const e: Partial<CustomerForm> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit mobile number is required";
    if (!form.addressLine1.trim()) e.addressLine1 = "Street / building address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!form.pincode.trim() || !/^[1-9][0-9]{5}$/.test(form.pincode.trim())) e.pincode = "Valid 6-digit pincode is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleCheckout() {
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await loadRazorpayScript();

      // Build a combined description
      const description = items
        .map((i) => `${i.product.name} x${i.quantity}`)
        .join(", ");

      // Use the first product slug for the API; pass full breakdown in notes
      const primaryItem = items[0];

      const orderResponse = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: primaryItem.product.slug,
          quantity: primaryItem.quantity,
          cartItems: items.map((i) => ({
            slug: i.product.slug,
            quantity: i.quantity,
            unitPrice: i.product.discountedPrice,
          })),
          overrideTotal: total, // pass total in paise
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
        | { keyId: string; orderId: string; amount: number; currency: string }
        | { error: string };

      if (!orderResponse.ok || !("orderId" in orderPayload)) {
        throw new Error(("error" in orderPayload ? orderPayload.error : null) || "Unable to create payment order.");
      }

      if (!window.Razorpay) throw new Error("Razorpay checkout did not load.");

      const razorpay = new window.Razorpay({
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "Lyra Enterprises",
        description,
        order_id: orderPayload.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: {
          cartSummary: description,
          company: form.company,
          city: form.city,
          state: form.state,
        },
        theme: { color: "#db2777" },
        modal: { ondismiss: () => setIsSubmitting(false) },
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                customer: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  company: form.company,
                  addressLine1: form.addressLine1,
                  addressLine2: form.addressLine2,
                  city: form.city,
                  state: form.state,
                  pincode: form.pincode,
                },
                cartItems: items.map((i) => ({
                  name: i.product.name,
                  fullName: i.product.fullName,
                  code: i.product.code,
                  category: i.product.category,
                  quantity: i.quantity,
                  unitPrice: i.product.discountedPrice,
                })),
                subtotal,
                gst,
                total,
              }),
            });

            const verifyPayload = (await verifyResponse.json()) as { success?: boolean; error?: string };
            if (!verifyResponse.ok || !verifyPayload.success) {
              throw new Error(verifyPayload.error || "Payment verification failed.");
            }

            setSuccessPaymentId(paymentResponse.razorpay_payment_id);
            clearCart();
          } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Verification failed.");
          } finally {
            setIsSubmitting(false);
          }
        },
      });

      razorpay.on("payment.failed", (response) => {
        setErrorMessage(response?.error?.description || "Payment failed. Please try again.");
        setIsSubmitting(false);
      });

      razorpay.open();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      <PageNavbar />
      <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-500 mb-6">
            {totalItems === 0 ? "No items in cart" : `${totalItems} item${totalItems !== 1 ? "s" : ""} · Review before checkout`}
          </p>

          {/* Checkout steps */}
          {items.length > 0 && !successPaymentId && (
            <div className="mb-8 flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-primary-600 text-white shadow-md">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">1</span>
                Cart
              </div>
              <div className="flex-1 h-px bg-gray-200" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-gray-400">
                <span className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold">2</span>
                <span className="hidden sm:inline">Delivery</span>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-gray-400">
                <span className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-bold">3</span>
                <span className="hidden sm:inline">Payment</span>
              </div>
            </div>
          )}

          {successPaymentId ? (
            /* Success state */
            <div className="max-w-lg mx-auto rounded-3xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Payment Successful!</h2>
              <p className="text-green-700 mb-1">Payment ID: <span className="font-mono font-semibold">{successPaymentId}</span></p>
              <p className="text-sm text-green-600 mt-3">Our team will contact you to confirm delivery details and dispatch timeline.</p>
              <Link href="/products" className="mt-6 inline-block rounded-2xl bg-gray-900 px-8 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : items.length === 0 ? (
            /* Empty cart */
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <div className="rounded-full bg-gray-100 p-6">
                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-900">Your cart is empty</p>
              <p className="text-gray-500 max-w-sm">Add some products to your cart and come back here to complete your order.</p>
              <Link href="/products" className="mt-2 rounded-2xl bg-gray-900 px-8 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-colors shadow-lg">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left: Items + Customer Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Cart items */}
                <div className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">Items ({totalItems})</h2>
                    <button onClick={clearCart} className="text-sm text-red-500 font-medium hover:text-red-700 transition-colors">
                      Clear cart
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {items.map((item) => (
                      <div key={item.product.slug} className="flex items-center gap-4 px-6 py-4">
                        <div className={`relative h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.product.accent} overflow-hidden`}>
                          <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-400">{item.product.code}</p>
                          <p className="text-sm font-bold text-gray-900 truncate">{item.product.fullName}</p>
                          <p className="text-sm text-primary-600 font-semibold mt-0.5">{formatCurrency(item.product.discountedPrice)} / unit</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.product.category === "napkin" ? (
                            <div className="flex items-center gap-1.5 rounded-xl border border-primary-300 bg-primary-50 px-3 py-1.5">
                              <span className="text-xs font-semibold text-primary-700">Qty</span>
                              <input
                                type="number"
                                min={100}
                                step={100}
                                value={item.quantity}
                                onChange={(e) => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1) updateQuantity(item.product.slug, v); }}
                                onBlur={(e) => { const v = parseInt(e.target.value) || 100; updateQuantity(item.product.slug, Math.max(100, Math.round(v / 100) * 100)); }}
                                className="w-16 text-center text-sm font-bold text-primary-800 bg-transparent border-none outline-none"
                              />
                              <span className="text-xs text-primary-600">pcs</span>
                            </div>
                          ) : (
                            <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                              <button onClick={() => updateQuantity(item.product.slug, item.quantity - 1)} className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold">−</button>
                              <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1)} className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold">+</button>
                            </div>
                          )}
                          <p className="w-24 text-right text-sm font-bold text-gray-900">{formatCurrency(item.product.discountedPrice * item.quantity)}</p>
                          <button onClick={() => removeFromCart(item.product.slug)} aria-label="Remove" className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer details form */}
                <div className="rounded-3xl bg-white shadow-sm border border-gray-100 px-6 py-6">
                  <h2 className="font-bold text-gray-900 mb-5">Delivery Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                        placeholder="Your full name"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                        placeholder="your@email.com"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Mobile Number *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Company / Institution</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Optional"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors"
                      />
                    </div>

                    {/* Address Line 1 */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Address Line 1 *</label>
                      <input
                        type="text"
                        value={form.addressLine1}
                        onChange={(e) => { setForm({ ...form, addressLine1: e.target.value }); setErrors({ ...errors, addressLine1: "" }); }}
                        placeholder="Building no., street name"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.addressLine1 ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.addressLine1 && <p className="mt-1 text-xs text-red-600">{errors.addressLine1}</p>}
                    </div>

                    {/* Address Line 2 */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Address Line 2 / Landmark</label>
                      <input
                        type="text"
                        value={form.addressLine2}
                        onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                        placeholder="Area, locality, landmark (optional)"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">City *</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => { setForm({ ...form, city: e.target.value }); setErrors({ ...errors, city: "" }); }}
                        placeholder="Your city"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.city ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">State *</label>
                      <select
                        value={form.state}
                        onChange={(e) => { setForm({ ...form, state: e.target.value }); setErrors({ ...errors, state: "" }); }}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Pincode *</label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => { setForm({ ...form, pincode: e.target.value }); setErrors({ ...errors, pincode: "" }); }}
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors ${errors.pincode ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.pincode && <p className="mt-1 text-xs text-red-600">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="sticky top-24 space-y-4">
                <div className="rounded-3xl bg-gray-900 text-white p-6 shadow-xl">
                  <p className="text-xs font-bold tracking-[0.3em] text-pink-300 uppercase mb-4">Order Summary</p>

                  <ul className="space-y-3 mb-6 border-b border-white/10 pb-6 text-sm">
                    {items.map((item) => (
                      <li key={item.product.slug} className="flex justify-between gap-2">
                        <span className="text-white/70 truncate">{item.product.name} × {item.quantity}</span>
                        <span className="font-semibold flex-shrink-0">{formatCurrency(item.product.discountedPrice * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>

                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-white/70">Subtotal</dt>
                      <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/70">{gst > 0 ? "GST (18%)" : "GST"}</dt>
                      <dd className="font-semibold">{gst > 0 ? formatCurrency(gst) : "Exempt"}</dd>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                      <dt className="font-bold">Total Payable</dt>
                      <dd className="text-2xl font-extrabold">{formatCurrency(total)}</dd>
                    </div>
                  </dl>

                  {errorMessage && (
                    <div className="mt-4 rounded-xl bg-red-900/30 border border-red-500/30 px-4 py-3 text-sm text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-2xl bg-gradient-to-r from-primary-600 to-pink-500 hover:from-primary-700 hover:to-pink-600 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-200 shadow-lg hover:shadow-primary-200/50 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                        Preparing secure checkout...
                      </span>
                    ) : (
                      `Pay ${formatCurrency(total)} with Razorpay`
                    )}
                  </button>

                  {/* Trust signals */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      100% Secure
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      Pan-India Delivery
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      GST Invoice
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Expert Support
                    </div>
                  </div>

                  <p className="mt-3 text-center text-xs text-white/30">UPI · Credit / Debit Card · Net Banking · Wallets</p>
                </div>

                <Link
                  href="/products"
                  className="block w-full rounded-2xl border border-gray-200 bg-white py-3 text-center text-sm font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors shadow-sm"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <PageFooter />
    </>
  );
}
