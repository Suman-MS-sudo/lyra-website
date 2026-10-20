"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import ProductCard from "@/components/store/ProductCard";
import type { CatalogItem } from "@/lib/catalog-types";
import { CATEGORY_LABEL } from "@/lib/catalog-types";
import { inr, type ProductCategory } from "@/lib/pricing";
import { IconX } from "@/components/store/icons";

type Pay = "push" | "coin" | "upi" | "rfid" | "touchless" | "iot";
type Band = "u15" | "15to25" | "25plus";
type Sort = "featured" | "price-asc" | "price-desc";

const PAY: { key: Pay; label: string; test: (p: CatalogItem) => boolean }[] = [
  { key: "push", label: "Push button", test: (p) => /push/i.test(p.payment ?? "") },
  { key: "coin", label: "Coin", test: (p) => /coin/i.test(p.payment ?? "") },
  { key: "upi", label: "UPI / QR", test: (p) => /upi|qr/i.test(p.payment ?? "") },
  { key: "rfid", label: "RFID card", test: (p) => /rfid/i.test(p.payment ?? "") },
  { key: "touchless", label: "Touchless", test: (p) => /wave/i.test(p.payment ?? "") },
  { key: "iot", label: "IoT / cloud reports", test: (p) => p.iot },
];

const BANDS: { key: Band; label: string; test: (n: number) => boolean }[] = [
  { key: "u15", label: "Under ₹15,000", test: (n) => n < 15000 },
  { key: "15to25", label: "₹15,000 – ₹25,000", test: (n) => n >= 15000 && n <= 25000 },
  { key: "25plus", label: "Above ₹25,000", test: (n) => n > 25000 },
];

const GROUPS: { key: ProductCategory; id: string; title: string; href?: string }[] = [
  { key: "vending-machine", id: "vending-machines", title: "Sanitary Napkin Vending Machines", href: "/products/sanitary-napkin-vending-machines" },
  { key: "incinerator", id: "incinerators", title: "Sanitary Napkin Incinerators", href: "/products/sanitary-napkin-incinerators" },
  { key: "napkin", id: "napkins", title: "Refill Sanitary Napkins" },
];

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export default function ShopGrid() {
  const { catalog } = useCatalog();
  const [cats, setCats] = useState<ProductCategory[]>([]);
  const [pays, setPays] = useState<Pay[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [sheet, setSheet] = useState(false);

  // Deep links from the homepage ("Shop by payment") and category chips: /products?pay=upi&cat=incinerator
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pay = q.get("pay") as Pay | null;
    const cat = q.get("cat") as ProductCategory | null;
    if (pay && PAY.some((p) => p.key === pay)) setPays([pay]);
    if (cat && cat in CATEGORY_LABEL) setCats([cat]);
  }, []);

  const filtered = useMemo(() => {
    let list = catalog.filter(
      (p) =>
        (!cats.length || cats.includes(p.category)) &&
        (!pays.length || pays.some((k) => PAY.find((x) => x.key === k)!.test(p))) &&
        (!bands.length || (p.category !== "napkin" && bands.some((k) => BANDS.find((x) => x.key === k)!.test(p.price)))),
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [catalog, cats, pays, bands, sort]);

  const active = cats.length + pays.length + bands.length;
  const grouped = active === 0 && sort === "featured";
  const clear = () => {
    setCats([]);
    setPays([]);
    setBands([]);
  };

  const count = (pred: (p: CatalogItem) => boolean) => catalog.filter(pred).length;

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {(Object.keys(CATEGORY_LABEL) as ProductCategory[]).map((c) => (
          <Check key={c} checked={cats.includes(c)} onChange={() => setCats(toggle(cats, c))} label={CATEGORY_LABEL[c]} count={count((p) => p.category === c)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Payment & access">
        {PAY.map((p) => (
          <Check key={p.key} checked={pays.includes(p.key)} onChange={() => setPays(toggle(pays, p.key))} label={p.label} count={count(p.test)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price (ex-GST)">
        {BANDS.map((b) => (
          <Check
            key={b.key}
            checked={bands.includes(b.key)}
            onChange={() => setBands(toggle(bands, b.key))}
            label={b.label}
            count={count((p) => p.category !== "napkin" && b.test(p.price))}
          />
        ))}
      </FilterGroup>
      <div className="rounded-2xl border border-line bg-subtle p-5">
        <p className="font-display text-sm font-semibold text-ink">Not sure which model?</p>
        <p className="mt-1 text-[13px] text-muted">See every spec side by side.</p>
        <Link href="/compare-sanitary-napkin-vending-machines" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
          Compare models →
        </Link>
      </div>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-14">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-36">{filters}</div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-muted" aria-live="polite">
            Showing <strong className="font-semibold text-ink">{filtered.length}</strong> of {catalog.length} products
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink lg:hidden"
            >
              Filters
              {active > 0 && <span className="rounded-full bg-primary-600 px-1.5 text-[11px] font-bold text-white">{active}</span>}
            </button>
            <label htmlFor="sort" className="sr-only">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 cursor-pointer rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink outline-none focus:border-brand"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {active > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {cats.map((c) => (
              <Chip key={c} label={CATEGORY_LABEL[c]} onRemove={() => setCats(toggle(cats, c))} />
            ))}
            {pays.map((k) => (
              <Chip key={k} label={PAY.find((p) => p.key === k)!.label} onRemove={() => setPays(toggle(pays, k))} />
            ))}
            {bands.map((k) => (
              <Chip key={k} label={BANDS.find((b) => b.key === k)!.label} onRemove={() => setBands(toggle(bands, k))} />
            ))}
            <button type="button" onClick={clear} className="ml-1 text-sm font-semibold text-brand hover:underline">
              Clear all
            </button>
          </div>
        )}

        {grouped ? (
          <div className="mt-8 space-y-16">
            {GROUPS.map((g) => {
              const list = catalog.filter((p) => p.category === g.key);
              return (
                <section key={g.key} id={g.id} className="scroll-mt-40" aria-labelledby={`${g.id}-h`}>
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        {list.length} {list.length === 1 ? "model" : g.key === "napkin" ? "variants" : "models"} · from {inr(Math.min(...list.map((p) => p.price)))}
                      </p>
                      <h2 id={`${g.id}-h`} className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                        {g.title}
                      </h2>
                    </div>
                    {g.href && (
                      <Link href={g.href} className="whitespace-nowrap text-sm font-semibold text-brand hover:underline">
                        View all<span className="sr-only"> {g.title}</span> →
                      </Link>
                    )}
                  </div>
                  <ul className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                    {list.map((p, k) => (
                      <li key={p.slug}>
                        <ProductCard product={p} index={k} priority={g.key === "vending-machine" && k < 3} />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-[24px] border border-dashed border-line-strong px-6 py-14 text-center">
            <p className="font-display text-lg font-semibold text-ink">No products match these filters</p>
            <p className="mt-1 text-sm text-muted">Try removing a filter, or ask us for a recommendation.</p>
            <button type="button" onClick={clear} className="btn btn-secondary mt-5">
              Clear filters
            </button>
          </div>
        ) : (
          <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, k) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={p} index={k} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheet && (
          <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.button
              type="button"
              aria-label="Close filters"
              onClick={() => setSheet(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-night/55"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[28px] bg-canvas px-5 pb-6 pt-3"
            >
              <span aria-hidden className="mx-auto mb-4 block h-1 w-10 rounded-full bg-line-strong" />
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-ink">Filters</p>
                <button type="button" onClick={() => setSheet(false)} aria-label="Close filters" className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-subtle">
                  <IconX />
                </button>
              </div>
              {filters}
              <div className="sticky bottom-0 mt-6 grid grid-cols-2 gap-2 bg-canvas pt-3">
                <button type="button" onClick={clear} className="btn btn-secondary">
                  Clear
                </button>
                <button type="button" onClick={() => setSheet(false)} className="btn btn-primary">
                  Show {filtered.length}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function Check({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count: number }) {
  return (
    <label className="flex min-h-[40px] cursor-pointer items-center gap-3 rounded-lg px-2 text-sm text-ink transition-colors hover:bg-subtle">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand ${
          checked ? "border-primary-600 bg-primary-600 text-white" : "border-line-strong"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="m2.5 6.2 2.3 2.3L9.5 3.8" />
          </svg>
        )}
      </span>
      <span className="flex-1">{label}</span>
      <span className="text-xs text-muted tabular">{count}</span>
    </label>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface pl-3 pr-2 text-xs font-medium text-ink hover:border-line-strong"
      aria-label={`Remove filter ${label}`}
    >
      {label}
      <IconX className="h-3.5 w-3.5" />
    </button>
  );
}
