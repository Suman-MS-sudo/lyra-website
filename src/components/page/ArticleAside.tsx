import Image from "next/image";
import Link from "next/link";
import { SITE, getProductBySlug, formatINR } from "@/lib/data";
import ScrollProgress from "@/components/ScrollProgress";
import { IconArrowRight, IconPhone, IconWhatsApp } from "@/components/store/icons";

const PICKS = ["push-button-vending-machine", "solo-wifi-vending-machine", "lyra-mini-incinerator"];

/** Sticky side panel for blog articles: shortcuts to shop / compare / talk to sales. */
export default function ArticleAside({ picks = PICKS }: { picks?: string[] }) {
  return (
    <aside className="hidden pb-20 pt-8 lg:block" aria-label="Shop and help">
      <ScrollProgress />
      <div className="sticky top-36 space-y-4">
        <div className="rounded-[22px] border border-line bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Popular models</p>
          <ul className="mt-3 space-y-1">
            {picks.map((slug) => {
              const p = getProductBySlug(slug);
              if (!p) return null;
              return (
                <li key={slug}>
                  <Link href={`/products/${p.slug}`} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-subtle">
                    <span className="relative h-12 w-12 flex-none overflow-hidden rounded-lg bg-subtle">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">{p.name}</span>
                      <span className="block text-xs text-muted tabular">{formatINR(p.price)} + GST</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/products" className="mt-3 flex items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-canvas transition hover:bg-ink/85">
            Shop all products <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[22px] border border-line bg-subtle p-5">
          <p className="font-display text-[15px] font-semibold text-ink">Not sure which machine fits?</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">Describe your site and we&apos;ll recommend a model in one call.</p>
          <div className="mt-4 grid gap-2">
            <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="btn btn-secondary h-10 text-sm">
              <IconPhone className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn h-10 bg-[#25D366] text-sm text-white hover:bg-[#1fb457]">
              <IconWhatsApp className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
          <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-[13px]">
            <Link href="/compare-sanitary-napkin-vending-machines" className="block font-medium text-brand hover:underline">
              Compare all models →
            </Link>
            <Link href="/sanitary-napkin-vending-machine-price-india" className="block font-medium text-brand hover:underline">
              2026 price list →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
