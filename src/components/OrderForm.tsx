"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { sendEvent } from "@/lib/analytics";
import { addToCart, clearCart, setCartQty, useCart } from "@/lib/cart";

export type OrderProduct = {
  slug: string;
  name: string;
  fullName: string;
  code: string;
  category: "vending-machine" | "incinerator" | "napkin";
  price: number;
  image: string;
};

type Props = {
  products: OrderProduct[];
  states: string[];
  gstRate: number;
  initialSlug?: string;
};

type Fields = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  website: string; // honeypot
};

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

const GROUPS: { key: OrderProduct["category"]; label: string }[] = [
  { key: "vending-machine", label: "Sanitary napkin vending machines" },
  { key: "incinerator", label: "Sanitary napkin incinerators" },
  { key: "napkin", label: "Refill napkins (for Lyra machines)" },
];

const input =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500/40";
const label = "mb-1 block text-xs font-semibold text-gray-700";
const err = "mt-1 text-xs text-red-600";

export default function OrderForm({ products, states, gstRate, initialSlug }: Props) {
  // The cart is the single source of truth for quantities (shared with the header and Add to Cart buttons).
  const { items: qty } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [itemsError, setItemsError] = useState(false);
  const [done, setDone] = useState<{ ref: string; summary: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  // "Place an Order" / "Buy now" links arrive with ?add=<slug>: make sure that product is in the cart.
  useEffect(() => {
    if (initialSlug && products.some((p) => p.slug === initialSlug) && !(qty[initialSlug] > 0)) {
      addToCart(initialSlug, products.find((p) => p.slug === initialSlug)?.category === "napkin" ? 100 : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setQ = (slug: string, q: number) => {
    setItemsError(false);
    setCartQty(slug, q);
  };

  const lines = products.filter((p) => qty[p.slug] > 0).map((p) => ({ p, q: qty[p.slug] }));
  const subtotal = lines.reduce((s, { p, q }) => s + p.price * q, 0);
  const gstBase = lines.filter(({ p }) => p.category !== "napkin").reduce((s, { p, q }) => s + p.price * q, 0);
  const gst = Math.round(gstBase * gstRate);

  // GA4 begin_checkout: once per visit, when the cart first has something in it.
  const checkoutSent = useRef(false);
  useEffect(() => {
    if (checkoutSent.current || lines.length === 0) return;
    checkoutSent.current = true;
    sendEvent("begin_checkout", {
      currency: "INR",
      value: subtotal + gst,
      items: lines.map(({ p, q }) => ({ item_id: p.slug, item_name: p.fullName, price: p.price, quantity: q })),
    });
  }, [lines, subtotal, gst]);
  const hasNapkins = lines.some(({ p }) => p.category === "napkin");

  /**
   * Backup path used only when /api/order fails on the server (for example the mail settings are broken).
   * It emails the same details to sales through the form service the contact form already uses.
   */
  const sendBackup = async (data: Fields): Promise<string> => {
    const ref = `LYR-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("phone", data.phone);
    form.append("organisation", data.organisation);
    form.append("gstin", data.gstin);
    form.append("delivery_address", `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`);
    form.append("notes", data.notes);
    form.append("items", lines.map(({ p, q }) => `${q} x ${p.fullName} (${p.code}) @ ${inr(p.price)}`).join("\n"));
    form.append("estimated_total_incl_gst", inr(subtotal + gst));
    form.append("reference", ref);
    form.append("_subject", `New order request ${ref}: ${data.name} (${data.phone})`);
    form.append("_captcha", "false");
    const r = await fetch("https://formsubmit.co/sales@lyraenterprise.co.in", {
      method: "POST",
      body: form,
      headers: { Accept: "application/json" },
    });
    if (!r.ok) throw new Error("backup failed");
    return ref;
  };

  const onSubmit = async (data: Fields) => {
    if (lines.length === 0) {
      setItemsError(true);
      document.getElementById("order-items")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    setServerError("");
    try {
      let res: Response | null = null;
      let payload: { success?: boolean; reference?: string; error?: string } = {};
      try {
        res = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, items: lines.map(({ p, q }) => ({ slug: p.slug, qty: q })) }),
        });
        payload = (await res.json().catch(() => ({}))) as typeof payload;
      } catch {
        res = null; // network failure
      }
      let reference = "";
      if (res?.ok && payload.success) {
        reference = payload.reference ?? "";
      } else if (res && res.status < 500) {
        // validation problem or rate limit: show the server's message, do not retry elsewhere
        throw new Error(payload.error || "Could not place the order.");
      } else {
        // server/mail failure or no connection: use the backup route so the order is not lost
        reference = await sendBackup(data);
      }
      const summary = lines.map(({ p, q }) => `${q} x ${p.fullName}`).join(", ");
      // value lets Google Ads optimise for order size, not just the number of leads
      sendEvent("generate_lead", {
        form_name: "order",
        product_interest: lines.map(({ p }) => p.fullName).join(", ").slice(0, 100),
        currency: "INR",
        value: subtotal + gst,
        items: lines.map(({ p, q }) => ({ item_id: p.slug, item_name: p.fullName, price: p.price, quantity: q })),
      });
      clearCart();
      setDone({ ref: reference, summary });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Could not place the order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    const wa = `https://wa.me/918122378860?text=${encodeURIComponent(`Hi! I just placed order request ${done.ref} on your website: ${done.summary}.`)}`;
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Order request received</h2>
        <p className="mt-2 text-sm text-gray-600">
          Reference <strong className="font-mono text-gray-900">{done.ref}</strong>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          No payment has been taken. Our team will contact you within 24 hours to confirm availability, freight to your
          location and payment details. A confirmation has also been emailed to you.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow">
            Message us on WhatsApp
          </a>
          <a href="/products" className="rounded-full border-2 border-gray-300 px-6 py-3 text-sm font-bold text-gray-800">
            Continue browsing
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-8">
        {/* 1. Products */}
        <section id="order-items" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">1. Select products</h2>
          <p className="mt-1 text-sm text-gray-500">Set a quantity for each product you need. Prices are ex-GST, ex-works Chennai.</p>
          {itemsError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Please add at least one product.</p>}

          {GROUPS.map((g) => {
            const list = products.filter((p) => p.category === g.key);
            if (!list.length) return null;
            return (
              <div key={g.key} className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-600">{g.label}</h3>
                <ul className="mt-2 divide-y divide-gray-100">
                  {list.map((p) => {
                    const q = qty[p.slug] ?? 0;
                    const isNapkin = p.category === "napkin";
                    const step = isNapkin ? 100 : 1;
                    return (
                      <li key={p.slug} className={`flex flex-wrap items-center gap-3 py-3 ${q > 0 ? "bg-primary-50/40" : ""}`}>
                        <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg border border-gray-200 bg-white">
                          <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-gray-900">{p.fullName}</p>
                          <p className="text-xs text-gray-500">
                            {inr(p.price)}
                            {isNapkin ? " per napkin · sold in 100s" : " + GST"}
                          </p>
                        </div>
                        <div className="flex flex-none items-center rounded-full border border-gray-300">
                          <button
                            type="button"
                            onClick={() => setQ(p.slug, q - step)}
                            aria-label={`Decrease ${p.name} quantity by ${step}`}
                            className="h-9 w-9 text-lg text-gray-600 hover:text-primary-700"
                          >
                            −
                          </button>
                          <input
                            inputMode="numeric"
                            aria-label={`${p.name} quantity`}
                            value={q || ""}
                            placeholder="0"
                            onChange={(e) => setQ(p.slug, parseInt(e.target.value.replace(/D/g, ""), 10) || 0)}
                            className={`${isNapkin ? "w-16" : "w-12"} bg-transparent text-center text-sm font-semibold focus:outline-none`}
                          />
                          <button
                            type="button"
                            onClick={() => setQ(p.slug, q + step)}
                            aria-label={`Increase ${p.name} quantity by ${step}`}
                            className="h-9 w-9 text-lg text-gray-600 hover:text-primary-700"
                          >
                            +
                          </button>
                        </div>
                        {isNapkin && (
                          <div className="flex w-full flex-wrap items-center gap-2 sm:pl-[4.25rem]">
                            <span className="text-xs text-gray-500">Quick add:</span>
                            {[100, 500, 1000, 5000].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setQ(p.slug, q + n)}
                                className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 transition hover:bg-primary-100"
                              >
                                +{n.toLocaleString("en-IN")}
                              </button>
                            ))}
                            {q > 0 && (
                              <span className="ml-auto text-xs font-semibold text-gray-700">
                                {q.toLocaleString("en-IN")} napkins = {inr(p.price * q)}
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>

        {/* 2. Details */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">2. Your details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="o-name">Full name *</label>
              <input id="o-name" autoComplete="name" className={input} {...register("name", { required: "Name is required", minLength: { value: 2, message: "Enter your full name" } })} />
              {errors.name && <p className={err}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="o-org">Organisation / institution</label>
              <input id="o-org" autoComplete="organization" className={input} {...register("organisation")} />
            </div>
            <div>
              <label className={label} htmlFor="o-email">Email *</label>
              <input id="o-email" type="email" autoComplete="email" className={input} {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Enter a valid email" } })} />
              {errors.email && <p className={err}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="o-phone">Mobile number *</label>
              <input id="o-phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" className={input} {...register("phone", { required: "Mobile number is required", validate: (v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")) || "Enter a valid 10-digit mobile number" })} />
              {errors.phone && <p className={err}>{errors.phone.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="o-gstin">GSTIN (optional, for a GST invoice)</label>
              <input id="o-gstin" autoCapitalize="characters" maxLength={15} className={`${input} uppercase`} {...register("gstin", { pattern: { value: /^\d{2}[A-Za-z]{5}\d{4}[A-Za-z][1-9A-Za-z]Z[0-9A-Za-z]$/, message: "Enter a valid 15-character GSTIN or leave blank" } })} />
              {errors.gstin && <p className={err}>{errors.gstin.message}</p>}
            </div>
          </div>
        </section>

        {/* 3. Delivery */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">3. Delivery address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label} htmlFor="o-address">Address *</label>
              <textarea id="o-address" rows={2} autoComplete="street-address" className={input} {...register("address", { required: "Address is required", minLength: { value: 5, message: "Enter the full address" } })} />
              {errors.address && <p className={err}>{errors.address.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="o-city">City / town *</label>
              <input id="o-city" autoComplete="address-level2" className={input} {...register("city", { required: "City is required" })} />
              {errors.city && <p className={err}>{errors.city.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="o-state">State *</label>
              <select id="o-state" autoComplete="address-level1" defaultValue="" className={input} {...register("state", { required: "Select your state" })}>
                <option value="" disabled>Select state</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <p className={err}>{errors.state.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="o-pin">Pincode *</label>
              <input id="o-pin" inputMode="numeric" maxLength={6} autoComplete="postal-code" className={input} {...register("pincode", { required: "Pincode is required", pattern: { value: /^\d{6}$/, message: "Enter a 6-digit pincode" } })} />
              {errors.pincode && <p className={err}>{errors.pincode.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="o-notes">Notes (optional)</label>
              <textarea id="o-notes" rows={3} placeholder="Installation needs, delivery timeline, bulk or multi-site requirements…" className={input} {...register("notes")} />
            </div>
          </div>
          {/* honeypot: real users never see or fill this */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>
        </section>

        {/* Submit, repeated here so it sits right after the last section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          {serverError && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>}
          {lines.length > 0 && (
            <p className="mb-3 text-sm text-gray-600">
              {lines.length} product{lines.length === 1 ? "" : "s"} in your order · estimated total{" "}
              <strong className="text-gray-900">{inr(subtotal + gst)}</strong> <span className="text-gray-400">(freight extra)</span>
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary-600 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Placing order…" : "Place order request"}
          </button>
          <p className="mt-3 text-center text-xs font-medium text-emerald-700">No payment now. We&apos;ll contact you to confirm.</p>
        </div>
      </div>

      {/* Summary */}
      <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-lg font-bold text-gray-900">Your cart</h2>
        {lines.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Your cart is empty. Add products from the list, or <a href="/products" className="font-semibold text-primary-700 hover:underline">browse all products</a>.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {lines.map(({ p, q }) => (
              <li key={p.slug} className="flex justify-between gap-3">
                <span className="text-gray-700">{q} × {p.name}</span>
                <span className="flex-none font-semibold text-gray-900">{inr(p.price * q)}</span>
              </li>
            ))}
          </ul>
        )}
        <dl className="mt-4 space-y-1.5 border-t border-gray-200 pt-3 text-sm">
          <div className="flex justify-between text-gray-600"><dt>Subtotal (ex-GST)</dt><dd>{inr(subtotal)}</dd></div>
          <div className="flex justify-between text-gray-600"><dt>GST {Math.round(gstRate * 100)}% (machines &amp; incinerators)</dt><dd>{inr(gst)}</dd></div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900"><dt>Estimated total</dt><dd>{inr(subtotal + gst)}</dd></div>
        </dl>
        <p className="mt-2 text-xs text-gray-400">
          Freight is extra and quoted by delivery pincode{hasNapkins ? "; GST on napkins as applicable" : ""}.
        </p>

        {serverError && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full rounded-full bg-primary-600 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Placing order…" : "Place order request"}
        </button>
        <p className="mt-3 text-center text-xs font-medium text-emerald-700">No payment now. We&apos;ll contact you to confirm.</p>
        <p className="mt-3 text-center text-xs text-gray-500">
          Prefer to talk? Call <a href="tel:+918122378860" className="font-semibold text-primary-700">+91-81223 78860</a>
        </p>
      </aside>
    </form>
  );
}
