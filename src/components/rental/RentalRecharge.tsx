"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendEvent } from "@/lib/analytics";
import { loadRazorpay, type RazorpayResponse } from "@/lib/razorpay-client";
import { RENTAL_GRACE_DAYS, rupees, type RechargePeriod } from "@/lib/rental";
import type { RechargeQuote } from "@/lib/rental-db";
import { IconArrowRight, IconCheck, IconLock } from "@/components/store/icons";

type Done = { code: string; amount: number; paidUntil: string | null; prepaidMonths: number; status: "verifying" | "verified" | "unverified" };

const fmt = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—";

const STATE_UI: Record<RechargeQuote["state"], { label: string; className: string }> = {
  pending_install: { label: "Awaiting installation", className: "bg-subtle text-ink" },
  active: { label: "Active", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  grace: { label: "Overdue · grace period", className: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  locked: { label: "Paused · rent overdue", className: "bg-red-500/15 text-red-700 dark:text-red-300" },
  ended: { label: "Ended", className: "bg-subtle text-muted" },
  cancelled: { label: "Cancelled", className: "bg-subtle text-muted" },
};

/** Rent recharge: look up a rental by code + registered mobile, pick Monthly / Quarterly / Yearly, pay via Razorpay. */
export default function RentalRecharge() {
  const params = useSearchParams();
  const source = params.get("src") === "dashboard" ? "dashboard" : "website";
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [quote, setQuote] = useState<RechargeQuote | null>(null);
  const [period, setPeriod] = useState<RechargePeriod>("quarterly");
  const [busy, setBusy] = useState<"" | "lookup" | "pay" | "confirming">("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);

  useEffect(() => {
    const c = params.get("code");
    if (c) setCode(c.toUpperCase());
  }, [params]);

  const normPhone = phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy("lookup");
    try {
      const res = await fetch("/api/rental/recharge/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, phone: normPhone }) });
      const out = (await res.json().catch(() => ({}))) as { quote?: RechargeQuote; error?: string };
      if (!res.ok || !out.quote) throw new Error(out.error || "Couldn't find that rental.");
      setQuote(out.quote);
      // Suggest the smallest period that brings a paused machine back.
      if (out.quote.state === "locked") setPeriod(out.quote.options.find((o) => o.unlocks)?.id ?? "yearly");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy("");
    }
  }

  async function pay() {
    if (!quote) return;
    setError("");
    setBusy("pay");
    try {
      const res = await fetch("/api/rental/recharge/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: quote.code, phone: normPhone, period, source }),
      });
      const order = (await res.json().catch(() => ({}))) as {
        keyId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        prefill?: Record<string, string>;
        error?: string;
      };
      if (!res.ok || !order.orderId) throw new Error(order.error || "Could not start the payment.");
      if (!(await loadRazorpay()) || !window.Razorpay) throw new Error("Couldn't load the payment window. Check your connection and try again.");

      const opt = quote.options.find((o) => o.id === period)!;
      let settled = false;
      await new Promise<void>((resolve, reject) => {
        const succeed = (d: Omit<Done, "code">) => {
          if (settled) return;
          settled = true;
          sendEvent("rental_recharge", { transaction_id: order.orderId, currency: "INR", value: d.amount, period });
          setDone({ code: quote.code, ...d });
          resolve();
        };
        const rzp = new window.Razorpay!({
          key: order.keyId,
          order_id: order.orderId,
          amount: order.amount,
          currency: order.currency ?? "INR",
          name: "Lyra Enterprises",
          description: `${opt.label} rent recharge · ${quote.code}`,
          image: "https://lyraenterprise.co.in/images/logo.png",
          prefill: order.prefill,
          theme: { color: "#2563eb" },
          modal: {
            confirm_close: true,
            ondismiss: async () => {
              if (settled) return;
              setBusy("confirming");
              try {
                const st = await fetch("/api/rental/recharge/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_id: order.orderId }) });
                const out = (await st.json().catch(() => ({}))) as { paid?: boolean; paidUntil?: string; prepaidMonths?: number; amount?: number };
                if (out.paid) {
                  succeed({ amount: out.amount ?? opt.total, paidUntil: out.paidUntil ?? null, prepaidMonths: out.prepaidMonths ?? 0, status: "verified" });
                  return;
                }
              } catch {
                /* treat as closed */
              }
              settled = true;
              reject(new Error("Payment window closed. No money was taken; you can try again."));
            },
          },
          handler: (r: RazorpayResponse) => {
            succeed({ amount: opt.total, paidUntil: opt.newPaidUntil, prepaidMonths: quote.prepaidMonths + opt.months, status: "verifying" });
            fetch("/api/rental/recharge/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) })
              .then(async (v) => {
                const out = (await v.json().catch(() => ({}))) as { success?: boolean; paidUntil?: string; prepaidMonths?: number };
                setDone((d) =>
                  d ? { ...d, status: v.ok && out.success ? "verified" : "unverified", paidUntil: out.paidUntil ?? d.paidUntil, prepaidMonths: out.prepaidMonths ?? d.prepaidMonths } : d,
                );
              })
              .catch(() => setDone((d) => (d ? { ...d, status: "unverified" } : d)));
          },
        });
        rzp.on("payment.failed", (r) => setError(r.error?.description ? `Payment failed: ${r.error.description}` : "Payment failed. Please try another method."));
        rzp.open();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy("");
    }
  }

  if (done) {
    return (
      <div className="rounded-[24px] border border-line bg-surface p-8 text-center sm:p-12" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <IconCheck className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-ink">Recharge successful</h2>
        <p className="mt-2 text-sm text-muted">
          {done.code} · {rupees(done.amount)} paid
        </p>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-body">
          {quote?.startDate ? (
            <>
              Rent is now paid until <strong className="text-ink">{fmt(done.paidUntil)}</strong>.
            </>
          ) : (
            <>Your machine isn&apos;t installed yet, so these months are banked and start from installation.</>
          )}{" "}
          A receipt has been emailed to you.
        </p>
        {done.status === "verifying" && <p className="mt-3 text-xs text-muted">Confirming with Razorpay…</p>}
        {done.status === "unverified" && <p className="mt-3 text-xs text-amber-700">Your payment went through. If the receipt doesn&apos;t arrive, call us with code {done.code}.</p>}
      </div>
    );
  }

  if (!quote) {
    return (
      <form onSubmit={lookup} className="mx-auto grid max-w-xl gap-4 rounded-[24px] border border-line bg-surface p-6 sm:p-8">
        <div>
          <label htmlFor="rc-code" className="field-label">Rental code</label>
          <input
            id="rc-code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="LYR-R261026-AB12-1 or booking reference"
            autoComplete="off"
            className="field font-mono uppercase placeholder:normal-case"
            required
          />
          <p className="mt-1.5 text-xs text-muted">It&apos;s in your confirmation email (ends in -1, -2… per machine). Your booking reference also works for a single machine.</p>
        </div>
        <div>
          <label htmlFor="rc-phone" className="field-label">Registered mobile number</label>
          <input id="rc-phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" className="field" required />
        </div>
        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy === "lookup"} className="btn btn-primary h-12 w-full">
          {busy === "lookup" ? "Finding your rental…" : "Continue"} <IconArrowRight className="h-4 w-4" />
        </button>
      </form>
    );
  }

  const ui = STATE_UI[quote.state];
  const chosen = quote.options.find((o) => o.id === period)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
      {/* Rental status */}
      <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-sm font-semibold text-ink">{quote.code}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ui.className}`}>{ui.label}</span>
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-ink">
          Lyra {quote.model} · {quote.capacity}-napkin plan
        </p>
        {quote.organisation && <p className="text-sm text-muted">{quote.organisation}</p>}
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Monthly rent</dt>
            <dd className="font-medium text-ink">{rupees(quote.monthlyRent)} + GST</dd>
          </div>
          {quote.startDate ? (
            <>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Installed on</dt>
                <dd className="font-medium text-ink">{fmt(quote.startDate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Paid until</dt>
                <dd className="font-medium text-ink">{fmt(quote.paidUntil)}</dd>
              </div>
            </>
          ) : (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Prepaid</dt>
              <dd className="font-medium text-ink">
                {quote.prepaidMonths} month{quote.prepaidMonths === 1 ? "" : "s"} (starts at installation)
              </dd>
            </div>
          )}
        </dl>
        {quote.state === "grace" && (
          <p className="mt-6 rounded-2xl bg-amber-500/10 p-4 text-sm leading-relaxed text-body">
            Rent is {quote.daysOverdue} day{quote.daysOverdue === 1 ? "" : "s"} overdue. The machine keeps working for {RENTAL_GRACE_DAYS} days after the due date; recharge now to avoid a pause.
          </p>
        )}
        {quote.state === "locked" && (
          <p className="mt-6 rounded-2xl bg-red-500/10 p-4 text-sm leading-relaxed text-body">
            Rent is {quote.daysOverdue} days overdue, so UPI and RFID vending is paused. Recharges always start from the unpaid date; pick a period that covers today to restore the machine.
          </p>
        )}
        <button type="button" onClick={() => setQuote(null)} className="mt-6 text-sm font-medium text-brand hover:underline">
          Use a different rental code
        </button>
      </div>

      {/* Plans */}
      <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-7">
        <h2 className="font-display text-lg font-semibold text-ink">Choose a recharge plan</h2>
        <div className="mt-4 grid gap-2.5" role="radiogroup" aria-label="Recharge plan">
          {quote.options.map((o) => (
            <label
              key={o.id}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${
                period === o.id ? "border-primary-500 bg-brand-soft" : "border-line hover:border-line-strong"
              }`}
            >
              <span className="flex items-center gap-3">
                <input type="radio" name="period" value={o.id} checked={period === o.id} onChange={() => setPeriod(o.id)} className="h-4 w-4 accent-primary-600" />
                <span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                    {o.label}
                    {o.discountPct > 0 && <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300">SAVE {o.discountPct}%</span>}
                  </span>
                  <span className="block text-xs text-muted">
                    {o.newPaidUntil ? `Paid until ${fmt(o.newPaidUntil)}` : `+${o.months} month${o.months > 1 ? "s" : ""} prepaid`}
                    {quote.state === "locked" && !o.unlocks ? " · not enough to restore" : ""}
                  </span>
                </span>
              </span>
              <span className="text-right">
                <span className="block font-display text-lg font-semibold text-ink tabular">{rupees(o.total)}</span>
                <span className="block text-[11px] text-muted">incl. GST</span>
              </span>
            </label>
          ))}
        </div>

        <dl className="mt-5 space-y-2 rounded-2xl border border-line p-4 text-sm">
          <div className="flex justify-between text-body">
            <dt>
              Rent ({rupees(quote.monthlyRent)} × {chosen.months})
            </dt>
            <dd className="tabular">{rupees(chosen.rent)}</dd>
          </div>
          {chosen.discount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
              <dt>Discount {chosen.discountPct}%</dt>
              <dd className="tabular">−{rupees(chosen.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between text-body">
            <dt>GST 18%</dt>
            <dd className="tabular">{rupees(chosen.gst)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-line pt-3">
            <dt className="font-semibold text-ink">Pay now</dt>
            <dd className="font-display text-2xl font-semibold text-ink tabular">{rupees(chosen.total)}</dd>
          </div>
        </dl>

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <button type="button" onClick={pay} disabled={Boolean(busy)} className="btn btn-primary mt-5 h-[52px] w-full text-[15px]">
          <IconLock className="h-4 w-4" />
          {busy === "pay" ? "Opening secure payment…" : busy === "confirming" ? "Checking payment…" : `Pay ${rupees(chosen.total)}`}
        </button>
        <p className="mt-3 text-center text-xs text-muted">UPI, cards and net banking via Razorpay. Receipt by email.</p>
      </div>
    </div>
  );
}
