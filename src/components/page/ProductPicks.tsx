import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug, formatINR } from "@/lib/data";
import { stepFor } from "@/lib/pricing";

type Pick = { slug: string; tag?: string; desc?: string };

/** Recommended products for a sector/guide page: real photo, price, why-it-fits note, add to cart. */
export default function ProductPicks({ items, columns = 4 }: { items: Pick[]; columns?: 3 | 4 }) {
  const cols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 ${cols}`}>
      {items.map(({ slug, tag, desc }) => {
        const p = getProductBySlug(slug);
        if (!p) return null;
        return (
          <li key={slug} className="spotlight group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-shadow duration-300 hover:shadow-lift">
            <Link href={`/products/${p.slug}`} className="relative block aspect-[5/4] overflow-hidden bg-subtle" tabIndex={-1} aria-hidden>
              <span aria-hidden className="absolute inset-x-8 bottom-4 top-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.14),transparent)]" />
              <Image
                src={p.image}
                alt={p.fullName}
                fill
                sizes="(max-width: 640px) 90vw, 280px"
                className="product-shot object-contain p-6 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:scale-[1.04]"
              />
              {tag && (
                <span className="absolute left-3 top-3 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink backdrop-blur">
                  {tag}
                </span>
              )}
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-base font-semibold leading-snug text-ink">
                <Link href={`/products/${p.slug}`} className="hover:text-brand">
                  {p.fullName}
                </Link>
              </h3>
              <p className="mt-1 text-sm tabular text-ink">
                <span className="font-semibold">{formatINR(p.price)}</span>
                <span className="text-muted">{p.category === "napkin" ? " per napkin" : " + 18% GST"}</span>
              </p>
              {desc && <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-body">{desc}</p>}
              <div className="mt-5 grid gap-2">
                <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} qty={stepFor(p.category)} variant="block" />
                <Link href={`/products/${p.slug}#enquiry`} className="py-1.5 text-center text-[13px] font-semibold text-brand hover:underline">
                  Details &amp; formal quote →
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
