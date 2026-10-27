"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { sendEvent } from "@/lib/analytics";
import { loadRazorpay, type RazorpayResponse } from "@/lib/razorpay-client";
import { clearCart, ensureInCart } from "@/lib/cart";
import { inr, stepFor } from "@/lib/pricing";
import { useCatalog } from "@/components/store/StoreProvider";
import { useCartLines } from "@/components/store/CartDrawer";
import { OrderSummary } from "@/components/store/CartView";
import CheckoutSteps from "@/components/store/CheckoutSteps";
import GoogleCustomerReviewsOptIn from "@/components/GoogleCustomerReviewsOptIn";
import { IconCheck, IconLock, IconWhatsApp } from "@/components/store/icons";

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

/** verifying: Razorpay reported success, server check in flight; verified: server confirmed; unverified: server check failed (payment still exists in Razorpay). */
type Done = { ref: string; email: string; summary: string; amount: number; paymentId: string; status: "verifying" | "verified" | "unverified" };

const DRAFT_KEY = "lyra_checkout_details_v1";

export default function CheckoutForm({ states, initialSlug }: { states: string[]; initialSlug?: string }) {
  const { lines, totals } = useCartLines();
  const { bySlug } = useCatalog();
  const [phase, setPhase] = useState<"idle" | "opening" | "confirming">("idle");
  const busy = phase !== "idle";
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<Done | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<Fields>({ mode: "onBlur" });

  // "Buy now" links arrive with ?add=<slug>: make sure that product is in the cart.
  useEffect(() => {
    const p = initialSlug ? bySlug.get(initialSlug) : undefined;
    if (p) ensureInCart(p.slug, stepFor(p.category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a draft of the buyer's details on this device so a reload doesn't lose them.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) reset({ ...(JSON.parse(raw) as Partial<Fields>), website: "" });
    } catch {
      /* no draft */
    }
  }, [reset]);
  useEffect(() => {
    const sub = watch((v) => {
      try {
        const { website: _hp, ...rest } = v as Fields;
        void _hp;
        localStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
      } catch {
        /* storage blocked */
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // GA4 begin_checkout, once.
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current || lines.length === 0) return;
    sent.current = true;
    sendEvent("begin_checkout", {
      currency: "INR",
      value: totals.total,
      items: lines.map(({ p, qty }) => ({ item_id: p.slug, item_name: p.fullName, price: p.price, quantity: qty })),
    });
  }, [lines, totals.total]);

  const items = lines.map(({ p, qty }) => ({ slug: p.slug, qty }));
  const summary = lines.map(({ p, qty }) => `${qty} x ${p.fullName}`).join(", ");
  const gaItems = lines.map(({ p, qty }) => ({ item_id: p.slug, item_name: p.fullName, price: p.price, quantity: qty }));

  const finish = (d: Done) => {
    clearCart();
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setDone(d);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const payOnline = async (data: Fields) => {
    const res = await fetch("/api/checkout/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, items }) });
    const order = (await res.json().catch(() => ({}))) as {
      keyId?: string;
      orderId?: string;
      amount?: number;
      currency?: string;
      reference?: string;
      error?: string;
      code?: string;
    };
    if (!res.ok || !order.orderId) throw new Error(order.error || "Could not start the payment. Please try again or call us.");
    if (!(await loadRazorpay()) || !window.Razorpay) throw new Error("Couldn't load the payment window. Check your connection and try again.");

    const payload = { ...data, items };
    let settled = false;

    await new Promise<void>((resolve, reject) => {
      /** Razorpay says the money went through: show the confirmation now, confirm with the server behind it. */
      const succeed = (paymentId: string, status: Done["status"], ref?: string, amount?: number) => {
        if (settled) return;
        settled = true;
        sendEvent("purchase", { transaction_id: ref ?? order.reference, currency: "INR", value: amount ?? totals.total, tax: totals.gst, items: gaItems });
        finish({ ref: ref ?? order.reference ?? "", email: data.email, summary, amount: amount ?? totals.total, paymentId, status });
        resolve();
      };

      const rzp = new window.Razorpay!({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency ?? "INR",
        name: "Lyra Enterprises",
        description: `Order ${order.reference}`,
        image: "https://lyraenterprise.co.in/images/logo.png",
        prefill: { name: data.name, email: data.email, contact: data.phone.replace(/\D/g, "").slice(-10) },
        notes: { reference: order.reference },
        theme: { color: "#2563eb" },
        modal: {
          confirm_close: true,
          // UPI buyers often pay in their app and then close this window. Ask Razorpay before calling it cancelled.
          ondismiss: async () => {
            if (settled) return;
            setPhase("confirming");
            try {
              const st = await fetch("/api/checkout/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: order.orderId, ...payload }),
              });
              const out = (await st.json().catch(() => ({}))) as { paid?: boolean; reference?: string; paymentId?: string; amount?: number };
              if (out.paid) {
                succeed(out.paymentId ?? "", "verified", out.reference, out.amount);
                return;
              }
            } catch {
              /* fall through to "closed" */
            }
            settled = true;
            reject(new Error("Payment window closed. Your cart is saved; you can try again."));
          },
        },
        handler: (r: RazorpayResponse) => {
          succeed(r.razorpay_payment_id, "verifying");
          fetch("/api/checkout/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...r, ...payload }) })
            .then(async (v) => {
              const out = (await v.json().catch(() => ({}))) as { success?: boolean; reference?: string; amount?: number };
              setDone((d) => (d ? { ...d, status: v.ok && out.success ? "verified" : "unverified", ref: out.reference ?? d.ref, amount: out.amount ?? d.amount } : d));
            })
            .catch(() => setDone((d) => (d ? { ...d, status: "unverified" } : d)));
        },
      });
      rzp.on("payment.failed", (r) => {
        // Razorpay keeps its window open for a retry; only surface the reason.
        setServerError(r.error?.description ? `Payment failed: ${r.error.description}` : "Payment failed. Please try another method.");
      });
      rzp.open();
    });
  };

  const onSubmit = async (data: Fields) => {
    if (lines.length === 0) {
      setServerError("Your cart is empty.");
      return;
    }
    setPhase("opening");
    setServerError("");
    try {
      await payOnline(data);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setPhase("idle");
    }
  };

  const onInvalid = (errs: Partial<Record<keyof Fields, unknown>>) => {
    const first = (Object.keys(errs) as (keyof Fields)[])[0];
    if (first) setFocus(first);
  };

  if (done) return <Confirmation done={done} />;

  if (lines.length === 0) {
    return (
      <div>
        <CheckoutSteps current={1} />
        <div className="mt-10 rounded-[24px] border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink">Your cart is empty</p>
          <p className="mt-1.5 text-sm text-muted">Add products before checking out.</p>
          <Link href="/products" className="btn btn-primary mt-6">
            Shop products
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: keyof Fields) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-err` } : {});
  const Msg = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {errors[k]?.message as string}
      </p>
    ) : null;

  return (
    <div>
      <CheckoutSteps current={1} />
      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="space-y-6">
          <fieldset className="rounded-[24px] border border-line bg-surface p-5 sm:p-7">
            <legend className="float-left mb-5 w-full font-display text-lg font-semibold text-ink">Contact</legend>
            <div className="clear-both grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="name">Full name *</label>
                <input id="name" autoComplete="name" className="field" {...err("name")} {...register("name", { required: "Enter your full name", minLength: { value: 2, message: "Enter your full name" } })} />
                <Msg k="name" />
              </div>
              <div>
                <label className="field-label" htmlFor="organisation">Organisation / institution</label>
                <input id="organisation" autoComplete="organization" className="field" {...register("organisation")} />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email *</label>
                <input id="email" type="email" autoComplete="email" className="field" {...err("email")} {...register("email", { required: "Enter your email", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Enter a valid email, like name@school.edu.in" } })} />
                <Msg k="email" />
              </div>
              <div>
                <label className="field-label" htmlFor="phone">Mobile number *</label>
                <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" className="field" {...err("phone")} {...register("phone", { required: "Enter your mobile number", validate: (v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")) || "Enter a 10-digit Indian mobile number" })} />
                <Msg k="phone" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="gstin">
                  GSTIN <span className="font-normal text-muted">(optional, for input tax credit)</span>
                </label>
                <input id="gstin" autoCapitalize="characters" maxLength={15} className="field uppercase" {...err("gstin")} {...register("gstin", { pattern: { value: /^\d{2}[A-Za-z]{5}\d{4}[A-Za-z][1-9A-Za-z]Z[0-9A-Za-z]$/, message: "Enter a valid 15-character GSTIN or leave blank" } })} />
                <Msg k="gstin" />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-[24px] border border-line bg-surface p-5 sm:p-7">
            <legend className="float-left mb-5 w-full font-display text-lg font-semibold text-ink">Delivery address</legend>
            <div className="clear-both grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="field-label" htmlFor="address">Address *</label>
                <textarea id="address" rows={2} autoComplete="street-address" className="field" {...err("address")} {...register("address", { required: "Enter the delivery address", minLength: { value: 5, message: "Enter the full address" } })} />
                <Msg k="address" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="city">City / town *</label>
                <input id="city" autoComplete="address-level2" className="field" {...err("city")} {...register("city", { required: "Enter the city" })} />
                <Msg k="city" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="state">State *</label>
                <select id="state" autoComplete="address-level1" defaultValue="" className="field" {...err("state")} {...register("state", { required: "Select your state" })}>
                  <option value="" disabled>
                    Select state
                  </option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Msg k="state" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="pincode">Pincode *</label>
                <input id="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" className="field tabular" {...err("pincode")} {...register("pincode", { required: "Enter the pincode", pattern: { value: /^\d{6}$/, message: "Enter a 6-digit pincode" } })} />
                <Msg k="pincode" />
              </div>
              <div className="sm:col-span-6">
                <label className="field-label" htmlFor="notes">
                  Notes <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea id="notes" rows={2} placeholder="Installation needs, delivery timeline, multi-site requirements…" className="field" {...register("notes")} />
              </div>
            </div>
            {/* honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" {...register("website")} />
              </label>
            </div>
          </fieldset>

          <section aria-labelledby="pay-heading" className="rounded-[24px] border border-primary-200 bg-primary-50 p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary-600 text-white">
                <IconLock className="h-5 w-5" />
              </span>
              <div>
                <h2 id="pay-heading" className="font-display text-lg font-semibold text-ink">Pay securely online</h2>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  UPI, debit / credit cards, net banking or wallets, processed by Razorpay. Your order is confirmed the moment payment succeeds.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["UPI", "Visa", "Mastercard", "RuPay", "Net banking", "Wallets"].map((m) => (
                    <li key={m} className="rounded-md border border-primary-200 bg-surface px-2 py-1 text-[11px] font-semibold tracking-wide text-ink">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <AnimatePresence>
            {serverError && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {serverError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <OrderSummary totals={totals} itemCount={lines.length} title="Your order">
          <ul className="mt-5 space-y-3 border-t border-line pt-5">
            {lines.map(({ p, qty }) => (
              <li key={p.slug} className="flex items-center gap-3">
                <span className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-line bg-subtle">
                  <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-canvas tabular">
                    {qty > 999 ? `${Math.round(qty / 1000)}k` : qty}
                  </span>
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-ink">{p.name}</span>
                <span className="text-sm font-medium text-ink tabular">{inr(p.price * qty)}</span>
              </li>
            ))}
          </ul>
          <button type="submit" disabled={busy} className="btn btn-primary mt-5 h-12 w-full text-[15px]">
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                {phase === "confirming" ? "Confirming your payment…" : "Opening secure payment…"}
              </>
            ) : (
              <>
                <IconLock className="h-4 w-4" /> Pay {inr(totals.total)}
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            By placing the order you agree to our{" "}
            <Link href="/terms-and-conditions" className="underline hover:text-ink">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/return-policy" className="underline hover:text-ink">
              return policy
            </Link>
            .
          </p>
        </OrderSummary>
      </form>
    </div>
  );
}

function Confirmation({ done }: { done: Done }) {
  const wa = `https://wa.me/918122378860?text=${encodeURIComponent(`Hi! I just placed order ${done.ref} on your website: ${done.summary}.`)}`;
  return (
    <div>
      <CheckoutSteps current={2} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-10 max-w-xl rounded-[28px] border border-line bg-surface p-8 text-center sm:p-10"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white"
        >
          <IconCheck className="h-8 w-8" strokeWidth={2.4} />
        </motion.span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Payment received. Order confirmed.
        </h1>
        <p className="mt-2 text-sm text-muted">
          Reference <strong className="font-mono text-ink">{done.ref}</strong>
          {" "}
          · Payment <span className="font-mono">{done.paymentId}</span>
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-body">
          We received {inr(done.amount)}. Our team will call you within one working day to confirm the dispatch date and freight to your pincode.
        </p>
        <p
          aria-live="polite"
          className={`mx-auto mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium ${
            done.status === "unverified" ? "bg-amber-50 text-amber-800" : "bg-subtle text-muted"
          }`}
        >
          {done.status === "verifying" && (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-line-strong border-t-brand" aria-hidden />
              Confirming with Razorpay and sending your receipt…
            </>
          )}
          {done.status === "verified" && <>Confirmed · receipt emailed to {done.email}</>}
          {done.status === "unverified" && <>Your payment is safe with Razorpay. We couldn&apos;t send the receipt automatically, so our team will contact you with it.</>}
        </p>
        <GoogleCustomerReviewsOptIn orderId={done.ref} email={done.email} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1fb457]">
            <IconWhatsApp className="h-4 w-4" /> Message us on WhatsApp
          </a>
          <Link href="/products" className="btn btn-secondary">
            Continue shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
