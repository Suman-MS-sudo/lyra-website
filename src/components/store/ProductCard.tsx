"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import AddToCartButton from "@/components/AddToCartButton";
import type { CatalogItem } from "@/lib/catalog-types";
import { CATEGORY_LABEL } from "@/lib/catalog-types";
import { inr, stepFor } from "@/lib/pricing";

type Props = {
  product: CatalogItem;
  /** Index in the grid, for the staggered entrance. */
  index?: number;
  priority?: boolean;
  headingLevel?: "h3" | "h2";
};

/** Storefront product tile: photographed cut-out on a soft stage, price, quick add. */
export default function ProductCard({ product: p, index = 0, priority = false, headingLevel = "h3" }: Props) {
  const reduce = useReducedMotion();
  const Heading = headingLevel;
  const isNapkin = p.category === "napkin";

  return (
    <motion.article
      // Above-the-fold (priority) cards render visible straight from the server so they never delay LCP.
      initial={reduce || priority ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift"
    >
      <Link href={`/products/${p.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-subtle" tabIndex={-1} aria-hidden>
        <span
          aria-hidden
          className="absolute inset-x-6 bottom-6 top-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.14),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
        <Image
          src={p.image}
          alt={p.fullName}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          className="product-shot object-contain p-7 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-[1.045] sm:p-9"
        />
        <span className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider ${
              p.popular ? "bg-primary-600 text-white" : "border border-line bg-surface/90 text-ink backdrop-blur"
            }`}
          >
            {p.badge}
          </span>
        </span>
        {p.iot && (
          <span className="absolute right-3 top-3 rounded-full border border-line bg-surface/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand backdrop-blur">
            IoT
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{CATEGORY_LABEL[p.category]}</p>
        <Heading className="mt-1.5 font-display text-[15px] font-semibold leading-snug tracking-tight text-ink sm:text-base">
          <Link href={`/products/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.fullName}
          </Link>
        </Heading>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">{p.tagline}</p>

        <div className="mt-auto pt-4">
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-semibold tracking-tight text-ink tabular">{inr(p.price)}</span>
            <span className="text-xs text-muted">{isNapkin ? "per napkin" : "+ GST"}</span>
          </p>
          {/* Above the full-card link so it stays clickable */}
          <div className="relative z-10 mt-3">
            <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} qty={stepFor(p.category)} variant="block" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
