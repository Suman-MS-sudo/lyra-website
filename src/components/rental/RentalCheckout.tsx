"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  RENTAL_ADVANCE_MONTHS,
  RENTAL_DEPOSIT,
  RENTAL_MIN_YEARS,
  RENTAL_MODELS,
  RENTAL_PLANS,
  rentWithGst,
  rupees,
  signingCharge,
  type RentalPlan,
  type Upfront,
} from "@/lib/rental";
import { sendEvent, trackLead } from "@/lib/analytics";
import { loadRazorpay, type RazorpayResponse } from "@/lib/razorpay-client";
import { IconArrowRight, IconCheck, IconDownload, IconLock, IconPhone, IconWhatsApp, IconX } from "@/components/store/icons";
import AgreementDocument from "@/components/rental/AgreementDocument";
import { AGREEMENT_PATH, AGREEMENT_TITLE, AGREEMENT_VERSION, CONSENT_TEXT, EARLY_TERMINATION_MONTHS } from "@/lib/rental-agreement";

type FieldKey = "name" | "phone" | "email" | "address" | "city" | "state" | "pincode" | "gstin" | "agree";
type Done = { ref: string; email: string; summary: string; amount: number; paymentId: string; status: "verifying" | "verified" | "unverified"; codes?: string[] };

const isPlanId = (v: string | null): v is RentalPlan["id"] => RENTAL_PLANS.some((p) => p.id === v);
const MAX_QTY = 50;

/**
 * Rental checkout: plan, machine, quantity and upfront option, then installation-site details and
 * online payment of the refundable deposit or advance rent via Razorpay (/api/rental/*).
 * "Request a callback" stays available for people who want to talk first.
 */
export default function RentalCheckout({ states }: { states: string[] }) {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [plan, setPlan] = useState<RentalPlan["id"]>("r50");
  const [model, setModel] = useState<string>(RENTAL_MODELS[0].slug);
  const [qty, setQty] = useState(1);
  const [upfront, setUpfront] = useState<Upfront>("deposit");
  const [phase, setPhase] = useState<"idle" | "opening" | "confirming" | "calling">("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [callbackSent, setCallbackSent] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const busy = phase !== "idle";

  // Plan buttons elsewhere link here with ?plan=r25 / r50 / r100.
  useEffect(() => {
    const p = params.get("plan");
    if (isPlanId(p)) setPlan(p);
  }, [params]);

  const chosen = RENTAL_PLANS.find((p) => p.id === plan)!;
  const machine = RENTAL_MODELS.find((m) => m.slug === model)!;
  const monthly = chosen.price * qty;
  const options = { deposit: signingCharge(chosen, qty, "deposit"), advance: signingCharge(chosen, qty, "advance") };
  const charge = options[upfront];
  const payNow = charge.total;
  const summary = `${qty} × Lyra ${machine.name}, ${chosen.capacity}-napkin plan (${rupees(chosen.price)}/month + GST)`;
  const selection = { plan, model, qty, upfront };

  const whatsapp = `https://wa.me/918122378860?text=${encodeURIComponent(
    `Hi! I'd like to rent ${qty} Lyra ${machine.name} vending machine${qty > 1 ? "s" : ""} on the ${chosen.capacity}-napkin plan (${rupees(chosen.price)}/month + GST).`
  )}`;

  function readForm() {
    const f = new FormData(formRef.current!);
    const s = (k: string) => String(f.get(k) ?? "").trim();
    return {
      name: s("name"),
      phone: s("phone").replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""),
      email: s("email").toLowerCase(),
      organisation: s("organisation"),
      gstin: s("gstin").toUpperCase(),
      address: s("address"),
      city: s("city"),
      state: s("state"),
      pincode: s("pincode"),
      notes: s("notes"),
      website: s("website"),
      agree: f.get("agree") === "on",
    };
  }

  function validate(d: ReturnType<typeof readForm>, full: boolean) {
    const e: Partial<Record<FieldKey, string>> = {};
    if (d.name.length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(d.phone)) e.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) e.email = "Enter a valid email address.";
    if (full) {
      if (d.address.length < 5) e.address = "Enter the installation address.";
      if (d.city.length < 2) e.city = "Enter the city.";
      if (!d.state) e.state = "Choose the state.";
      if (!/^\d{6}$/.test(d.pincode)) e.pincode = "Enter a 6-digit pincode.";
      if (d.gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(d.gstin)) e.gstin = "This GSTIN doesn't look right.";
      if (!d.agree) e.agree = "Please accept the rental terms to continue.";
    }
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
    return Object.keys(e).length === 0;
  }

  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = readForm();
    setServerError("");
    if (!validate(d, true)) return;
    setPhase("opening");
    try {
      const payload = { ...d, ...selection, agreementVersion: AGREEMENT_VERSION };
      const res = await fetch("/api/rental/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const order = (await res.json().catch(() => ({}))) as { keyId?: string; orderId?: string; amount?: number; currency?: string; reference?: string; error?: string };
      if (!res.ok || !order.orderId) throw new Error(order.error || "Could not start the payment. Please try again or call us.");
      if (!(await loadRazorpay()) || !window.Razorpay) throw new Error("Couldn't load the payment window. Check your connection and try again.");

      let settled = false;
      await new Promise<void>((resolve, reject) => {
        const succeed = (paymentId: string, status: Done["status"], ref?: string, amount?: number) => {
          if (settled) return;
          settled = true;
          sendEvent("rental_payment", { transaction_id: ref ?? order.reference, currency: "INR", value: amount ?? payNow, plan: chosen.capacity, model: machine.name, upfront });
          setDone({ ref: ref ?? order.reference ?? "", email: d.email, summary, amount: amount ?? payNow, paymentId, status });
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          resolve();
        };

        const rzp = new window.Razorpay!({
          key: order.keyId,
          order_id: order.orderId,
          amount: order.amount,
          currency: order.currency ?? "INR",
          name: "Lyra Enterprises",
          description: `Rental ${order.reference} · ${upfront === "deposit" ? "deposit + first month's rent" : `${RENTAL_ADVANCE_MONTHS} months' advance rent`}`,
          image: "https://lyraenterprise.co.in/images/logo.png",
          prefill: { name: d.name, email: d.email, contact: d.phone },
          notes: { reference: order.reference },
          theme: { color: "#2563eb" },
          modal: {
            confirm_close: true,
            // UPI payers often pay in their app and then close this window. Ask Razorpay before calling it cancelled.
            ondismiss: async () => {
              if (settled) return;
              setPhase("confirming");
              try {
                const st = await fetch("/api/rental/status", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ order_id: order.orderId, ...payload }),
                });
                const out = (await st.json().catch(() => ({}))) as { paid?: boolean; reference?: string; paymentId?: string; amount?: number; codes?: string[] };
                if (out.paid) {
                  succeed(out.paymentId ?? "", "verified", out.reference, out.amount);
                  setDone((x) => (x ? { ...x, codes: out.codes } : x));
                  return;
                }
              } catch {
                /* fall through to "closed" */
              }
              settled = true;
              reject(new Error("Payment window closed. Your selection is saved here; you can try again."));
            },
          },
          handler: (r: RazorpayResponse) => {
            succeed(r.razorpay_payment_id, "verifying");
            fetch("/api/rental/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...r, ...payload }) })
              .then(async (v) => {
                const out = (await v.json().catch(() => ({}))) as { success?: boolean; reference?: string; amount?: number; codes?: string[] };
                setDone((x) =>
                  x ? { ...x, status: v.ok && out.success ? "verified" : "unverified", ref: out.reference ?? x.ref, amount: out.amount ?? x.amount, codes: out.codes } : x,
                );
              })
              .catch(() => setDone((x) => (x ? { ...x, status: "unverified" } : x)));
          },
        });
        rzp.on("payment.failed", (r) => {
          setServerError(r.error?.description ? `Payment failed: ${r.error.description}` : "Payment failed. Please try another method.");
        });
        rzp.open();
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPhase("idle");
    }
  }

  async function requestCallback() {
    const d = readForm();
    setServerError("");
    if (!validate(d, false)) return;
    setPhase("calling");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          source: "rental-page",
          name: d.name,
          phone: d.phone,
          email: d.email,
          organization: d.organisation,
          website: d.website,
          product: `Rental: ${summary}`,
          message: [
            `Monthly rent: ${rupees(monthly)} + GST (${rupees(rentWithGst(monthly))} incl. GST)`,
            `Preferred upfront option: ${upfront === "deposit" ? "refundable deposit + first month's rent" : `${RENTAL_ADVANCE_MONTHS} months' rent in advance`} = ${rupees(payNow)} incl. GST`,
            [d.city, d.state].filter(Boolean).length ? `Site: ${[d.city, d.state].filter(Boolean).join(", ")}` : "",
            d.notes,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!res.ok) throw new Error(((await res.json().catch(() => ({}))) as { error?: string }).error || "send failed");
      setCallbackSent(true);
      trackLead("form", `Rental: ${summary}`, "rental");
    } catch (err) {
      setServerError(err instanceof Error && err.message !== "send failed" ? err.message : "Something went wrong. Please call or WhatsApp us instead.");
    } finally {
      setPhase("idle");
    }
  }

  if (done) {
    const statusNote =
      done.status === "verifying"
        ? "Confirming with Razorpay…"
        : done.status === "verified"
          ? `A receipt has been emailed to ${done.email}.`
          : "Your payment went through. If the receipt email doesn't arrive, call us with the reference below.";
    return (
      <div className="rounded-[24px] border border-line bg-surface p-8 text-center sm:p-12" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <IconCheck className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Payment received. Rental booked.</h3>
        <p className="mt-2 text-sm text-muted">
          Reference <strong className="font-semibold text-ink">{done.ref}</strong> · {rupees(done.amount)} paid
        </p>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-body">
          {done.summary}. Your executed {RENTAL_MIN_YEARS}-year rental agreement is attached to your confirmation email. Our team will call you within one working day to fix the installation date and set up your
          monitoring login.
        </p>
        {done.codes && done.codes.length > 0 && (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-left">
            <p className="text-sm font-semibold text-ink">Your rental code{done.codes.length > 1 ? "s (one per machine)" : ""}</p>
            <ul className="mt-2 space-y-1 font-mono text-[15px] font-semibold text-ink">
              {done.codes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted">Use {done.codes.length > 1 ? "a code" : "this code"} with your registered mobile number to recharge rent.</p>
          </div>
        )}
        <p className="mt-3 text-xs text-muted">{statusNote}</p>
      </div>
    );
  }

  if (callbackSent) {
    return (
      <div className="rounded-[24px] border border-line bg-surface p-8 text-center sm:p-12" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <IconPhone className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">We&apos;ll call you shortly</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-body">
          {summary}. Our team will call to answer your questions and help you book. A copy has been sent to your email.
        </p>
      </div>
    );
  }

  const Err = ({ k }: { k: FieldKey }) =>
    errors[k] ? (
      <p id={`rent-${k}-err`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {errors[k]}
      </p>
    ) : null;
  const inv = (k: FieldKey) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `rent-${k}-err` } : {});

  return (
    <>
    <form
      ref={formRef}
      onSubmit={pay}
      // Clear a field's error as soon as it is edited.
      onChange={(e) => {
        const n = (e.target as HTMLInputElement).name as FieldKey;
        if (errors[n]) setErrors(({ [n]: _gone, ...rest }) => (void _gone, rest));
      }}
      noValidate
      className="grid scroll-mt-32 gap-6 rounded-[24px] border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
      {/* ── Selection + amount ── */}
      <div>
        <fieldset>
          <legend className="field-label">1. Choose a plan</legend>
          <div className="grid gap-2">
            {RENTAL_PLANS.map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 transition-colors ${
                  plan === p.id ? "border-primary-500 bg-brand-soft" : "border-line hover:border-line-strong"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} className="h-4 w-4 accent-primary-600" />
                  <span>
                    <span className="block text-sm font-semibold text-ink">{p.capacity}-napkin capacity</span>
                    <span className="block text-xs text-muted">{p.name} plan</span>
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-display text-base font-semibold text-ink tabular">{rupees(p.price)}</span>
                  <span className="block text-[11px] text-muted">/month + GST</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="field-label">2. Choose a machine</legend>
          <div className="grid grid-cols-3 gap-2">
            {RENTAL_MODELS.map((m) => (
              <label
                key={m.slug}
                className={`cursor-pointer rounded-2xl border px-3 py-3 text-center transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${
                  model === m.slug ? "border-primary-500 bg-brand-soft" : "border-line hover:border-line-strong"
                }`}
              >
                <input type="radio" name="model" value={m.slug} checked={model === m.slug} onChange={() => setModel(m.slug)} className="sr-only" />
                <span className="block text-sm font-semibold text-ink">{m.name}</span>
                <span className="block text-[11px] text-muted">{m.tech}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-subtle px-4 py-4">
          <label htmlFor="rent-qty" className="text-sm font-medium text-ink">
            Number of machines
          </label>
          <input
            id="rent-qty"
            type="number"
            min={1}
            max={MAX_QTY}
            value={qty}
            onChange={(e) => setQty(Math.min(MAX_QTY, Math.max(1, Number(e.target.value) || 1)))}
            className="field w-24 text-center"
          />
        </div>

        <fieldset className="mt-6">
          <legend className="field-label">3. Pay at signing (choose one)</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                ["deposit", "Deposit + 1st month", `${rupees(options.deposit.base)} + GST`, `${rupees(RENTAL_DEPOSIT)} refundable deposit + month 1 rent, per machine`],
                ["advance", `${RENTAL_ADVANCE_MONTHS} months in advance`, `${rupees(options.advance.base)} + GST`, `First ${RENTAL_ADVANCE_MONTHS} months of rent, no deposit`],
              ] as const
            ).map(([id, label, amount, note]) => (
              <label
                key={id}
                className={`cursor-pointer rounded-2xl border px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${
                  upfront === id ? "border-primary-500 bg-brand-soft" : "border-line hover:border-line-strong"
                }`}
              >
                <input type="radio" name="upfront" value={id} checked={upfront === id} onChange={() => setUpfront(id)} className="sr-only" />
                <span className="block text-sm font-semibold text-ink">{label}</span>
                <span className="block font-display text-lg font-semibold text-ink tabular">{amount}</span>
                <span className="block text-[11.5px] leading-snug text-muted">{note}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <dl className="mt-6 space-y-2 rounded-2xl border border-line p-4 text-sm">
          <div className="flex justify-between text-body">
            <dt>Monthly rent</dt>
            <dd className="tabular">
              {rupees(monthly)} + GST <span className="text-muted">({rupees(rentWithGst(monthly))})</span>
            </dd>
          </div>
          {charge.lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-4 text-body">
              <dt>{l.label}</dt>
              <dd className="flex-none tabular">{rupees(l.amount)}</dd>
            </div>
          ))}
          <div className="flex justify-between text-body">
            <dt>GST 18%</dt>
            <dd className="tabular">{rupees(charge.gst)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-line pt-3">
            <dt className="font-semibold text-ink">Pay now</dt>
            <dd className="font-display text-2xl font-semibold text-ink tabular">{rupees(payNow)}</dd>
          </div>
          <p className="text-xs text-muted">
            {upfront === "deposit"
              ? `Rent starts from month 1. Month 2 onwards is billed monthly; the deposit is refunded at the end of the agreement.`
              : `Covers months 1 to ${RENTAL_ADVANCE_MONTHS}. Month ${RENTAL_ADVANCE_MONTHS + 1} onwards is billed monthly.`}
          </p>
        </dl>
      </div>

      {/* ── Installation site + payment ── */}
      <div className="grid content-start gap-4 sm:grid-cols-2">
        <p className="font-display text-lg font-semibold text-ink sm:col-span-2">4. Installation site and contact</p>
        <div>
          <label htmlFor="rent-name" className="field-label">Full name *</label>
          <input id="rent-name" name="name" autoComplete="name" className="field" {...inv("name")} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="rent-phone" className="field-label">Mobile number *</label>
          <input id="rent-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" className="field" {...inv("phone")} />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="rent-email" className="field-label">Email *</label>
          <input id="rent-email" name="email" type="email" autoComplete="email" className="field" {...inv("email")} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="rent-org" className="field-label">Institution / company</label>
          <input id="rent-org" name="organisation" autoComplete="organization" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="rent-address" className="field-label">Installation address *</label>
          <input id="rent-address" name="address" autoComplete="street-address" placeholder="Building, street, area" className="field" {...inv("address")} />
          <Err k="address" />
        </div>
        <div>
          <label htmlFor="rent-city" className="field-label">City *</label>
          <input id="rent-city" name="city" autoComplete="address-level2" className="field" {...inv("city")} />
          <Err k="city" />
        </div>
        <div>
          <label htmlFor="rent-state" className="field-label">State *</label>
          <select id="rent-state" name="state" defaultValue="" autoComplete="address-level1" className="field" {...inv("state")}>
            <option value="" disabled>
              Select state
            </option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Err k="state" />
        </div>
        <div>
          <label htmlFor="rent-pincode" className="field-label">Pincode *</label>
          <input id="rent-pincode" name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" className="field" {...inv("pincode")} />
          <Err k="pincode" />
        </div>
        <div>
          <label htmlFor="rent-gstin" className="field-label">GSTIN (optional)</label>
          <input id="rent-gstin" name="gstin" maxLength={15} placeholder="For GST invoice" className="field uppercase placeholder:normal-case" {...inv("gstin")} />
          <Err k="gstin" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="rent-notes" className="field-label">Notes</label>
          <textarea id="rent-notes" name="notes" rows={2} placeholder="Number of washrooms, preferred installation date…" className="field py-3" />
        </div>
        {/* Spam trap */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        <div className="sm:col-span-2">
          <div className="rounded-2xl border border-line bg-subtle px-4 py-3.5 text-[13px] leading-relaxed text-body">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-none accent-primary-600"
                {...inv("agree")}
              />
              <span>{CONSENT_TEXT}</span>
            </label>
            <p className="mt-2 pl-7 text-xs text-muted">
              Key terms: {RENTAL_MIN_YEARS}-year minimum term; rent from month 1, plus 18% GST; napkins bought from Lyra; {EARLY_TERMINATION_MONTHS} months&apos; rent to
              exit early; damage beyond normal wear payable up to the machine&apos;s list price.{" "}
              <button type="button" onClick={() => setShowAgreement(true)} className="font-semibold text-brand hover:underline">
                Read the full agreement
              </button>
            </p>
          </div>
          <Err k="agree" />
        </div>

        {serverError && (
          <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2">
            {serverError}
          </p>
        )}

        <div className="grid gap-3 sm:col-span-2">
          <button type="submit" disabled={busy} className="btn btn-primary h-[52px] w-full text-[15px]">
            <IconLock className="h-4 w-4" />
            {phase === "opening"
              ? "Opening secure payment…"
              : phase === "confirming"
                ? "Checking payment…"
                : `Pay ${rupees(payNow)} and book rental`}
            {phase === "idle" && <IconArrowRight className="h-4 w-4" />}
          </button>
          <p className="text-center text-xs text-muted">UPI, cards and net banking via Razorpay. Your receipt and executed rental agreement (PDF) are emailed at once.</p>
          <div className="mt-1 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row">
            <button type="button" onClick={requestCallback} disabled={busy} className="btn btn-secondary h-11 flex-1 text-sm">
              <IconPhone className="h-4 w-4" /> {phase === "calling" ? "Sending…" : "Talk first: request a callback"}
            </button>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn h-11 bg-[#25D366] px-5 text-sm text-white hover:bg-[#1fb457]">
              <IconWhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </form>
    {showAgreement && (
      <AgreementDialog
        onClose={() => setShowAgreement(false)}
        onAgree={() => {
          setAgreed(true);
          setErrors(({ agree: _a, ...rest }) => (void _a, rest));
          setShowAgreement(false);
        }}
      />
    )}
    </>
  );
}

/** The full agreement in a modal; "I agree" ticks the consent box. */
function AgreementDialog({ onClose, onAgree }: { onClose: () => void; onAgree: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="agreement-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-night/60 backdrop-blur-sm" />
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-line bg-surface shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <h2 id="agreement-title" className="font-display text-lg font-semibold text-ink">
            {AGREEMENT_TITLE}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-subtle">
            <IconX className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <AgreementDocument compact />
        </div>
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <a href={AGREEMENT_PATH} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
            <IconDownload className="h-4 w-4" /> Open full page / PDF
          </a>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn btn-secondary h-11 px-5 text-sm">
              Close
            </button>
            <button type="button" onClick={onAgree} className="btn btn-primary h-11 px-5 text-sm">
              <IconCheck className="h-4 w-4" /> I agree to all terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
