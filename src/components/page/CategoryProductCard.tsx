import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { formatINR, type Product } from "@/lib/data";
import { IconCheck } from "@/components/store/icons";

/** Large catalogue card for category pages: keeps each product's H2, description and top features. */
export default function CategoryProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift">
      <Link href={`/products/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-subtle" tabIndex={-1} aria-hidden>
        <span aria-hidden className="absolute inset-x-10 bottom-6 top-1/4 rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.15),transparent)] transition-opacity duration-500 group-hover:opacity-100" />
        <Image
          src={p.image}
          alt={p.fullName}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
          className="product-shot object-contain p-8 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider ${p.popular ? "bg-primary-600 text-white" : "border border-line bg-surface/90 text-ink backdrop-blur"}`}>
            {p.popular ? "Most popular" : p.badge}
          </span>
        </span>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In stock
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            <Link href={`/products/${p.slug}`} className="hover:text-brand">
              {p.name}
            </Link>
          </h2>
          <span className="font-mono text-[11px] text-muted">{p.code}</span>
        </div>
        <p className="mt-3 text-[14.5px] leading-relaxed text-body">{p.description}</p>
        <ul className="mt-5 space-y-2 border-t border-line pt-5">
          {p.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-body">
              <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3">
            <p>
              <span className="font-display text-2xl font-semibold tracking-tight text-ink tabular">{formatINR(p.price)}</span>
              <span className="block text-[11.5px] text-muted">+ 18% GST · freight extra</span>
            </p>
            <div className="flex gap-3 text-[13px] font-semibold">
              <Link href={`/products/${p.slug}`} className="text-brand hover:underline">
                Details<span className="sr-only"> for {p.name}</span> →
              </Link>
              <Link href={`/products/${p.slug}#enquiry`} className="text-ink hover:underline">
                Enquire<span className="sr-only"> about {p.name}</span>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <AddToCartButton slug={p.slug} name={p.fullName} price={p.price} variant="block" />
          </div>
        </div>
      </div>
    </article>
  );
}
