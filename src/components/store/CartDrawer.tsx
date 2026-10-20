"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { closeCart, setCartQty, useCart, useCartOpen } from "@/lib/cart";
import { computeTotals, inr, stepFor } from "@/lib/pricing";
import { useCatalog } from "@/components/store/StoreProvider";
import QtyStepper from "@/components/store/QtyStepper";
import { IconArrowRight, IconBag, IconLock, IconTrash, IconX } from "@/components/store/icons";

export function useCartLines() {
  const { items } = useCart();
  const { bySlug } = useCatalog();
  const lines = Object.entries(items).flatMap(([slug, qty]) => {
    const p = bySlug.get(slug);
    return p ? [{ p, qty }] : [];
  });
  const totals = computeTotals(lines.map(({ p, qty }) => ({ price: p.price, category: p.category, qty })));
  return { lines, totals };
}

/** Slide-out cart (opens from the header or after Add to Cart). */
export default function CartDrawer() {
  const open = useCartOpen();
  const pathname = usePathname();
  const { lines, totals } = useCartLines();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => closeCart(), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-night/55 backdrop-blur-[3px]"
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-canvas shadow-2xl outline-none"
          >
            <div className="flex h-16 flex-none items-center justify-between border-b border-line px-5">
              <p className="font-display text-lg font-semibold text-ink">
                Your cart <span className="text-muted">({lines.length})</span>
              </p>
              <button type="button" onClick={closeCart} aria-label="Close cart" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-subtle">
                <IconX />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-subtle text-muted">
                  <IconBag className="h-7 w-7" />
                </span>
                <p className="mt-5 font-display text-lg font-semibold text-ink">Your cart is empty</p>
                <p className="mt-1.5 text-sm text-muted">Browse the range and add a machine, incinerator or refill napkins.</p>
                <Link href="/products" onClick={closeCart} className="btn btn-primary mt-6">
                  Shop products
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {lines.map(({ p, qty }) => (
                      <motion.li
                        key={p.slug}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
                        className="flex gap-4 py-4"
                      >
                        <Link href={`/products/${p.slug}`} onClick={closeCart} className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border border-line bg-subtle">
                          <Image src={p.image} alt={p.fullName} fill sizes="80px" className="object-contain p-2" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link href={`/products/${p.slug}`} onClick={closeCart} className="text-sm font-semibold leading-snug text-ink hover:text-brand">
                              {p.fullName}
                            </Link>
                            <button
                              type="button"
                              onClick={() => setCartQty(p.slug, 0)}
                              aria-label={`Remove ${p.name} from cart`}
                              className="-mr-1.5 -mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-muted hover:bg-subtle hover:text-red-600"
                            >
                              <IconTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-muted tabular">
                            {inr(p.price)}
                            {p.category === "napkin" ? " per napkin" : " + GST"}
                          </p>
                          <div className="mt-auto flex items-end justify-between pt-3">
                            <QtyStepper
                              value={qty}
                              step={stepFor(p.category)}
                              label={p.name}
                              onChange={(n) => setCartQty(p.slug, n)}
                              size="sm"
                            />
                            <p className="text-sm font-semibold text-ink tabular">{inr(p.price * qty)}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="flex-none border-t border-line bg-subtle px-5 pb-5 pt-4">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-body">
                      <dt>Subtotal (ex-GST)</dt>
                      <dd className="tabular">{inr(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-body">
                      <dt>GST 18% (machines)</dt>
                      <dd className="tabular">{inr(totals.gst)}</dd>
                    </div>
                    <div className="flex justify-between pt-1.5 text-base font-semibold text-ink">
                      <dt>Total</dt>
                      <dd className="tabular">{inr(totals.total)}</dd>
                    </div>
                  </dl>
                  <p className="mt-1.5 text-xs text-muted">Freight is billed separately by delivery pincode.</p>
                  <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
                    <Link href="/cart" onClick={closeCart} className="btn btn-secondary">
                      View cart
                    </Link>
                    <Link href="/checkout" onClick={closeCart} className="btn btn-primary">
                      Checkout <IconArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
                    <IconLock className="h-3.5 w-3.5" /> Secure payment via Razorpay: UPI, cards, net banking
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
