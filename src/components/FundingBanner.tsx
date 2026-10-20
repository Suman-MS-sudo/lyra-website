import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/store/icons";

const schemes = ["Samagra Shiksha", "Swachh Bharat Mission", "National Health Mission", "State schemes", "Corporate CSR", "MPLADS"];

/**
 * Promo row (Nextmerce-style banners): the combo offer, the bundle and the funding guide.
 * The funding copy is the original procurement-guide banner, unchanged.
 */
export default function FundingBanner() {
  return (
    <section aria-label="Offers and funding" className="bg-canvas py-16 sm:py-20">
      <div className="lyra-container grid gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Combo offer */}
        <Link
          href="/offers/push-button-micro-combo"
          className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] bg-night p-7 text-white"
        >
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-600/40 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
          <div className="relative max-w-[62%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-400">Combo offer</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">Push Button + Micro Incinerator</h2>
            <p className="mt-2 text-sm text-white/65">Full SWM Rules 2016 compliance in one order.</p>
          </div>
          <p className="relative z-10 flex max-w-[64%] flex-wrap items-center gap-3">
            <span className="font-display text-3xl font-semibold tracking-tight">₹19,999</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-night transition-transform group-hover:translate-x-1">
              View offer <IconArrowRight className="h-4 w-4" />
            </span>
          </p>
          <Image
            src="/images/products/push-button-vm.png"
            alt=""
            width={150}
            height={260}
            className="pointer-events-none absolute -bottom-6 right-5 h-[72%] w-auto object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
          />
        </Link>

        {/* Bundle */}
        <Link
          href="/products/vending-incinerator-bundle"
          className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] border border-line bg-subtle p-7"
        >
          <div className="relative max-w-[60%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Complete washroom kit</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">Vending machine + incinerator bundle</h2>
            <p className="mt-2 text-sm text-muted">Dispense and dispose: one invoice, one install visit.</p>
          </div>
          <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-canvas transition-transform group-hover:translate-x-1">
            Build a bundle <IconArrowRight className="h-4 w-4" />
          </span>
          <Image
            src="/images/products/lyra-micro.png"
            alt=""
            width={170}
            height={220}
            className="product-shot pointer-events-none absolute -bottom-2 right-3 h-[70%] w-auto object-contain transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
          />
        </Link>

        {/* Funding guide (original procurement banner copy) */}
        <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] border border-primary-200 bg-primary-50 p-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-700">Procurement Guide</p>
            <h2 className="mt-3 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
              You probably don&apos;t need to pay for this out of your own budget
            </h2>
            <p className="mt-2 text-sm text-body">
              Most machines in India are funded by a government scheme, a Finance Commission grant or corporate CSR — not
              the institution&apos;s own budget. We&apos;ve mapped every route.
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {schemes.map((s) => (
                <li key={s} className="rounded-full border border-primary-200 bg-surface px-2.5 py-1 text-[11px] font-medium text-primary-700">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/government-schemes-menstrual-hygiene" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
            See Government Schemes &amp; Subsidies <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
