"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import { CATEGORY_LABEL } from "@/lib/catalog-types";
import { inr, type ProductCategory } from "@/lib/pricing";
import { IconSearch } from "@/components/store/icons";

type Scope = "all" | ProductCategory;

const SUGGESTIONS = ["UPI", "Coin", "IoT", "Incinerator", "Touchless"];

/** Header product search: type-ahead over the catalogue, filtered by category, fully keyboard operable. */
export default function HeaderSearch({ compact = false }: { compact?: boolean }) {
  const { catalog } = useCatalog();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return catalog
      .filter((p) => scope === "all" || p.category === scope)
      .filter((p) => {
        if (!terms.length) return true;
        const hay = `${p.fullName} ${p.badge} ${p.tagline} ${p.payment ?? ""} ${p.connectivity ?? ""} ${p.code}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, 6);
  }, [catalog, q, scope]);

  useEffect(() => setActive(0), [q, scope]);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (slug: string) => {
    setOpen(false);
    setQ("");
    router.push(`/products/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) go(results[active].slug);
      else router.push("/products");
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className={`relative w-full ${compact ? "" : "max-w-xl"}`}>
      <div className="flex h-11 items-center rounded-full border border-line-strong bg-surface pl-1.5 pr-1 transition-shadow focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgb(var(--brand)/0.12)]">
        {!compact && (
          <>
            <label className="sr-only" htmlFor={`${listId}-scope`}>
              Category
            </label>
            <select
              id={`${listId}-scope`}
              value={scope}
              onChange={(e) => setScope(e.target.value as Scope)}
              className="h-8 cursor-pointer rounded-full bg-subtle pl-3 pr-2 text-[13px] font-medium text-ink outline-none"
            >
              <option value="all">All categories</option>
              {(Object.keys(CATEGORY_LABEL) as ProductCategory[]).map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>
          </>
        )}
        <IconSearch className={`h-[18px] w-[18px] flex-none text-muted ${compact ? "ml-2.5" : "ml-3"}`} />
        <input
          type="search"
          role="combobox"
          aria-label="Search products"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${listId}-${results[active].slug}` : undefined}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search machines, incinerators, UPI, IoT…"
          className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[15px] text-ink outline-none placeholder:text-muted/80 [&::-webkit-search-cancel-button]:hidden"
        />
        {!compact && (
          <kbd className="mr-2 hidden rounded-md border border-line px-1.5 py-0.5 text-[10px] font-semibold text-muted lg:block">↵</kbd>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, transition: { duration: 0.1 } }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-[60] overflow-hidden rounded-2xl border border-line bg-elevated shadow-lg"
          >
            {!q && (
              <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
                <span className="text-xs font-medium text-muted">Popular:</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQ(s)}
                    className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <ul id={listId} role="listbox" aria-label="Products" className="max-h-[60vh] overflow-y-auto p-1.5">
              {results.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-muted">
                  No products match “{q}”. Try “coin”, “UPI” or “incinerator”.
                </li>
              ) : (
                results.map((p, i) => (
                  <li
                    key={p.slug}
                    id={`${listId}-${p.slug}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(p.slug);
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 ${i === active ? "bg-subtle" : ""}`}
                  >
                    <span className="relative h-11 w-11 flex-none rounded-lg bg-subtle">
                      <Image src={p.image} alt="" fill sizes="44px" className="object-contain p-1" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{p.fullName}</span>
                      <span className="block truncate text-xs text-muted">{p.payment ?? CATEGORY_LABEL[p.category]}</span>
                    </span>
                    <span className="flex-none text-sm font-semibold text-ink tabular">
                      {inr(p.price)}
                      {p.category === "napkin" && <span className="text-xs font-normal text-muted"> /pc</span>}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
