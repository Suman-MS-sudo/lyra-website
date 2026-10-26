"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import { CATEGORY_LABEL } from "@/lib/catalog-types";
import { inr, type ProductCategory } from "@/lib/pricing";
import { IconArrowRight, IconSearch, IconX } from "@/components/store/icons";

type Scope = "all" | ProductCategory;

const QUICK_LINKS: [string, string][] = [
  ["Rental plans · from ₹999/month", "/sanitary-napkin-vending-machine-on-rent"],
  ["Price list 2026", "/sanitary-napkin-vending-machine-price-india"],
  ["Compare all models", "/compare-sanitary-napkin-vending-machines"],
  ["Government schemes & funding", "/government-schemes-menstrual-hygiene"],
  ["Vending + incinerator bundle", "/products/vending-incinerator-bundle"],
];
const SUGGESTIONS = ["Rent", "UPI", "Coin", "IoT", "RFID", "Incinerator"];

/** Full-screen product search (opened from the header or with Ctrl/⌘ + K). */
export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { catalog } = useCatalog();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return catalog
      .filter((p) => scope === "all" || p.category === scope)
      .filter((p) => {
        if (!terms.length) return true;
        const hay = `${p.fullName} ${p.badge} ${p.tagline} ${p.payment ?? ""} ${p.connectivity ?? ""} ${p.code}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, q ? 8 : 4);
  }, [catalog, q, scope]);

  useEffect(() => setActive(0), [q, scope]);
  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(`/products/${results[active].slug}`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Search products" onKeyDown={onKeyDown}>
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-night/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.12 } }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-[24px] border border-line bg-elevated shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <IconSearch className="h-5 w-5 flex-none text-muted" />
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search machines, incinerators, UPI, IoT…"
                aria-label="Search products"
                className="h-16 min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted/80 [&::-webkit-search-cancel-button]:hidden"
              />
              <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[11px] font-semibold text-muted sm:block">Esc</kbd>
              <button type="button" onClick={onClose} aria-label="Close search" className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-subtle sm:hidden">
                <IconX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-line px-5 py-3">
              {(["all", ...(Object.keys(CATEGORY_LABEL) as ProductCategory[])] as Scope[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setScope(c)}
                  aria-pressed={scope === c}
                  className={`h-8 rounded-full px-3 text-[13px] font-medium transition-colors ${
                    scope === c ? "bg-ink text-canvas" : "border border-line text-body hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {c === "all" ? "Everything" : CATEGORY_LABEL[c]}
                </button>
              ))}
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!q && (
                <div className="flex flex-wrap items-center gap-1.5 px-3 pb-2 pt-2">
                  <span className="mr-1 text-xs font-medium text-muted">Try:</span>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full bg-subtle px-2.5 py-1 text-xs font-medium text-ink hover:text-brand">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/^(r(e(n(t)?)?)?|lea|leas|lease|hire|month|monthly|rental)/i.test(q.trim()) && q.trim().length >= 2 && (
                <Link
                  href="/sanitary-napkin-vending-machine-on-rent"
                  onClick={onClose}
                  className="mx-1 mt-2 flex items-center justify-between gap-3 rounded-xl border border-primary-200 bg-brand-soft px-3 py-3 text-sm"
                >
                  <span>
                    <span className="block font-semibold text-ink">Rent a vending machine</span>
                    <span className="block text-xs text-muted">IoT WiFi, Ethernet or RFID · from ₹999/month + GST</span>
                  </span>
                  <IconArrowRight className="h-4 w-4 flex-none text-brand" />
                </Link>
              )}
              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{q ? "Products" : "Popular"}</p>
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted">No products match “{q}”. Try “coin”, “UPI” or “incinerator”.</p>
              ) : (
                <ul role="listbox" aria-label="Products">
                  {results.map((p, i) => (
                    <li key={p.slug} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(`/products/${p.slug}`)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${i === active ? "bg-subtle" : ""}`}
                      >
                        <span className="relative h-12 w-12 flex-none rounded-xl bg-subtle">
                          <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">{p.fullName}</span>
                          <span className="block truncate text-xs text-muted">{p.payment ?? CATEGORY_LABEL[p.category]}</span>
                        </span>
                        <span className="flex-none text-sm font-semibold text-ink tabular">
                          {inr(p.price)}
                          {p.category === "napkin" && <span className="text-xs font-normal text-muted"> /pc</span>}
                        </span>
                        <IconArrowRight className={`h-4 w-4 flex-none text-muted transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {!q && (
                <>
                  <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Helpful pages</p>
                  <ul className="grid gap-1 pb-2 sm:grid-cols-2">
                    {QUICK_LINKS.map(([label, href]) => (
                      <li key={href}>
                        <Link href={href} onClick={onClose} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-subtle">
                          {label}
                          <IconArrowRight className="h-3.5 w-3.5 text-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="hidden items-center justify-between border-t border-line bg-subtle px-5 py-2.5 text-[11px] text-muted sm:flex">
              <span>
                <kbd className="rounded border border-line bg-surface px-1">↑</kbd> <kbd className="rounded border border-line bg-surface px-1">↓</kbd> to move ·{" "}
                <kbd className="rounded border border-line bg-surface px-1">↵</kbd> to open
              </span>
              <Link href="/products" onClick={onClose} className="font-semibold text-brand hover:underline">
                Browse all products →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
