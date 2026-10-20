import Link from "next/link";
import { SITE } from "@/lib/data";
import { IconArrowRight, IconCheck, IconPhone, IconWhatsApp } from "@/components/store/icons";

/** Dark closing call-to-action band used at the end of inner pages. */
export function CtaBand({
  title,
  body,
  primary = { href: "/products", label: "Shop the range" },
  secondary,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-canvas py-14 sm:py-20">
      <div className="lyra-container">
        <div className="theme-light relative overflow-hidden rounded-[28px] bg-night px-6 py-12 text-white sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-600/35 blur-3xl" />
          <div aria-hidden className="grid-lines absolute inset-0 opacity-[0.06] [mask-image:linear-gradient(to_left,#000,transparent_70%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.6rem]">{title}</h2>
              {body && <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">{body}</p>}
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={primary.href} className="btn btn-primary h-12 px-6">
                {primary.label} <IconArrowRight className="h-4 w-4" />
              </Link>
              {secondary ? (
                <Link href={secondary.href} className="btn h-12 border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">
                  {secondary.label}
                </Link>
              ) : (
                <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="btn h-12 border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">
                  <IconPhone className="h-4 w-4" /> {SITE.phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Highlighted note with an action, e.g. the funding / schemes pointer. */
export function Callout({ title, body, href, label }: { title: React.ReactNode; body: React.ReactNode; href: string; label: string }) {
  return (
    <div className="flex flex-col gap-5 rounded-[22px] border border-primary-200 bg-primary-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-body">{body}</p>
      </div>
      <Link href={href} className="btn btn-primary flex-none">
        {label}
      </Link>
    </div>
  );
}

/** Hero action buttons: call + quote/WhatsApp, consistent everywhere. */
export function HeroActions({ callLabel = "Call sales", quoteHref = "/contact", quoteLabel = "Get a free quote", shopHref }: { callLabel?: string; quoteHref?: string; quoteLabel?: string; shopHref?: string }) {
  return (
    <>
      {shopHref && (
        <Link href={shopHref} className="btn btn-primary h-12 px-6">
          Shop models <IconArrowRight className="h-4 w-4" />
        </Link>
      )}
      <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className={`btn h-12 px-6 ${shopHref ? "btn-secondary" : "btn-primary"}`}>
        <IconPhone className="h-4 w-4" /> {callLabel}
      </a>
      <Link href={quoteHref} className="btn btn-secondary h-12 px-6">
        {quoteLabel}
      </Link>
      <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-12 px-4 text-[#128C7E] dark:text-[#25D366]">
        <IconWhatsApp className="h-4 w-4" /> WhatsApp
      </a>
    </>
  );
}

/** Check-marked list. */
export function CheckList({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it, k) => (
        <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-body">
          <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-soft text-brand">
            <IconCheck className="h-3 w-3" strokeWidth={2.4} />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Small stat tiles row. */
export function StatRow({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-4" style={{ gap: 1 }}>
      {items.map((s) => (
        <div key={s.label} className="flex min-w-0 flex-col-reverse bg-surface px-4 py-4 sm:px-5">
          <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</dt>
          <dd className="break-words font-display text-[15px] font-semibold leading-snug text-ink [overflow-wrap:anywhere] sm:text-lg">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
