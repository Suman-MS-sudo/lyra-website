"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { setCartQty } from "@/lib/cart";
import { inr, stepFor } from "@/lib/pricing";
import { useCatalog } from "@/components/store/StoreProvider";
import { useCartLines } from "@/components/store/CartDrawer";
import QtyStepper from "@/components/store/QtyStepper";
import ProductCard from "@/components/store/ProductCard";
import CheckoutSteps from "@/components/store/CheckoutSteps";
import { IconArrowRight, IconBag, IconLock, IconTrash, IconTruck, IconReceipt } from "@/components/store/icons";

export default function CartView() {
  const { lines, totals } = useCartLines();
  const { catalog } = useCatalog();

  const inCart = new Set(lines.map((l) => l.p.slug));
  const hasMachine = lines.some((l) => l.p.category === "vending-machine");
  const hasIncinerator = lines.some((l) => l.p.category === "incinerator");
  const hasNapkin = lines.some((l) => l.p.category === "napkin");
  // "Complete the washroom": suggest what's missing from a machine-only or incinerator-only cart.
  const suggestions = catalog
    .filter((p) => !inCart.has(p.slug))
    .filter((p) =>
      lines.length === 0
        ? p.popular || p.slug === "lyra-mini-incinerator" || p.slug === "push-button-vending-machine"
        : (hasMachine && !hasIncinerator && p.category === "incinerator") ||
          (hasMachine && !hasNapkin && p.category === "napkin") ||
          (hasIncinerator && !hasMachine && (p.popular || p.slug === "push-button-vending-machine")),
    )
    .slice(0, 4);

  return (
    <div>
      <CheckoutSteps current={0} />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Your cart</h1>
        <Link href="/products" className="text-sm font-semibold text-brand hover:underline">
          ← Continue shopping
        </Link>
      </div>

      {lines.length === 0 ? (
        <div className="mt-8 rounded-[24px] border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-subtle text-muted">
            <IconBag className="h-7 w-7" />
          </span>
          <p className="mt-5 font-display text-xl font-semibold text-ink">Your cart is empty</p>
          <p className="mt-1.5 text-sm text-muted">Add a vending machine, incinerator or refill napkins to get started.</p>
          <Link href="/products" className="btn btn-primary mt-6">
            Shop products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="overflow-hidden rounded-[24px] border border-line bg-surface">
            <div className="hidden grid-cols-[5rem_minmax(0,1fr)_9rem_7rem_2.5rem] gap-x-4 border-b border-line bg-subtle px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:grid">
              <span className="col-span-2">Product</span>
              <span>Quantity</span>
              <span className="text-right">Amount</span>
              <span />
            </div>
            <ul className="divide-y divide-line">
              <AnimatePresence initial={false}>
                {lines.map(({ p, qty }) => (
                  <motion.li
                    key={p.slug}
                    layout
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                    className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 py-5 sm:grid-cols-[5rem_minmax(0,1fr)_9rem_7rem_2.5rem] sm:items-center sm:px-6"
                  >
                      <Link href={`/products/${p.slug}`} className="relative row-span-2 h-20 w-20 flex-none overflow-hidden rounded-xl border border-line bg-subtle sm:row-span-1">
                        <Image src={p.image} alt={p.fullName} fill sizes="80px" className="object-contain p-2" />
                      </Link>
                      <div className="min-w-0">
                        <Link href={`/products/${p.slug}`} className="font-semibold leading-snug text-ink hover:text-brand">
                          {p.fullName}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted">
                          {p.code} · <span className="tabular">{inr(p.price)}</span>
                          {p.category === "napkin" ? " per napkin, GST-exempt" : " + 18% GST"}
                        </p>
                      </div>
                    <div className="col-start-2 flex items-center justify-between gap-3 sm:col-start-auto sm:contents">
                      <QtyStepper value={qty} step={stepFor(p.category)} label={p.name} onChange={(n) => setCartQty(p.slug, n)} size="sm" />
                      <p className="text-right font-semibold text-ink tabular">{inr(p.price * qty)}</p>
                      <button
                        type="button"
                        onClick={() => setCartQty(p.slug, 0)}
                        aria-label={`Remove ${p.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-red-600"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <OrderSummary totals={totals} itemCount={lines.length}>
            <Link href="/checkout" className="btn btn-primary mt-5 h-12 w-full text-[15px]">
              Proceed to checkout <IconArrowRight className="h-4 w-4" />
            </Link>
          </OrderSummary>
        </div>
      )}

      {suggestions.length > 0 && (
        <section className="mt-16" aria-labelledby="suggest-heading">
          <h2 id="suggest-heading" className="text-2xl font-semibold tracking-tight text-ink">
            {lines.length === 0 ? "Popular with institutions" : "Complete the washroom"}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {suggestions.map((p, k) => (
              <li key={p.slug}>
                <ProductCard product={p} index={k} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export function OrderSummary({
  totals,
  itemCount,
  children,
  title = "Order summary",
}: {
  totals: { subtotal: number; gst: number; total: number };
  itemCount: number;
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <aside className="rounded-[24px] border border-line bg-surface p-6 lg:sticky lg:top-36">
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between text-body">
          <dt>
            Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"}, ex-GST)
          </dt>
          <dd className="tabular">{inr(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between text-body">
          <dt>GST 18% (machines &amp; incinerators)</dt>
          <dd className="tabular">{inr(totals.gst)}</dd>
        </div>
        <div className="flex justify-between text-body">
          <dt>Freight</dt>
          <dd className="text-right text-muted">By pincode, billed separately</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3.5">
          <dt className="font-semibold text-ink">Total payable now</dt>
          <dd className="font-display text-2xl font-semibold tracking-tight text-ink tabular">{inr(totals.total)}</dd>
        </div>
      </dl>
      {children}
      <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[13px] text-muted">
        <li className="flex items-center gap-2.5">
          <IconLock className="h-4 w-4 flex-none text-brand" /> Secure payment via Razorpay
        </li>
        <li className="flex items-center gap-2.5">
          <IconReceipt className="h-4 w-4 flex-none text-brand" /> GST invoice for input tax credit
        </li>
        <li className="flex items-center gap-2.5">
          <IconTruck className="h-4 w-4 flex-none text-brand" /> Dispatched from Chennai in 1–3 working days
        </li>
      </ul>
    </aside>
  );
}
