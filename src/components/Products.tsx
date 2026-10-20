"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import ProductCard from "@/components/store/ProductCard";
import type { ProductCategory } from "@/lib/pricing";
import { IconArrowRight } from "@/components/store/icons";

type Tab = "all" | ProductCategory;

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All products" },
  { key: "vending-machine", label: "Vending machines" },
  { key: "incinerator", label: "Incinerators" },
  { key: "napkin", label: "Refill napkins" },
];

/** Homepage product range: tabbed grid fed by the catalogue in data.ts. */
export default function Products() {
  const { catalog } = useCatalog();
  const [tab, setTab] = useState<Tab>("vending-machine");
  const shown = tab === "all" ? catalog : catalog.filter((p) => p.category === tab);
  const count = (c: ProductCategory) => catalog.filter((p) => p.category === c).length;

  return (
    <section id="products" className="scroll-mt-28 bg-subtle py-20 sm:py-24 lg:py-28">
      <div className="lyra-container">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="kicker">Product range</p>
            <h2 className="mt-4 text-display-lg font-semibold text-ink">
              Choose Anything From <span className="text-gradient">Basic</span> to <span className="text-gradient">Smart</span> — Not a
              One-Size-Fits-All Machine
            </h2>
          </div>
          <p className="max-w-lg text-[17px] leading-relaxed text-body lg:justify-self-end">
            Lyra Enterprises engineers all 13 models in Chennai — {count("vending-machine")} vending machines, {count("incinerator")}{" "}
            incinerators, {count("napkin")} napkin variants — and ships them across India with dedicated support.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <LayoutGroup id="range-tabs">
            <div role="tablist" aria-label="Filter products" className="-mx-1 flex gap-1 overflow-x-auto px-1">
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    aria-controls="range-grid"
                    onClick={() => setTab(t.key)}
                    className={`relative h-10 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors ${
                      active ? "text-canvas" : "text-body hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="range-tab-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            Open the full shop <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.ul id="range-grid" role="tabpanel" layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, k) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} index={k} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
