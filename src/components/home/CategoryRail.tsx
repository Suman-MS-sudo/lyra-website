"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import { inr } from "@/lib/pricing";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCard,
  IconCoin,
  IconQr,
  IconSparkle,
  IconWifi,
} from "@/components/store/icons";

/** Finger-press glyph for push-button machines. */
const IconPress = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="3" />
    <path d="M12 11v10M8.5 15.5 12 21l3.5-5.5" />
  </svg>
);

const payments = [
  { label: "Push button", href: "/products?pay=push", icon: IconPress },
  { label: "Coin", href: "/products?pay=coin", icon: IconCoin },
  { label: "UPI / QR", href: "/products?pay=upi", icon: IconQr },
  { label: "RFID card", href: "/products?pay=rfid", icon: IconCard },
  { label: "Touchless", href: "/products?pay=touchless", icon: IconSparkle },
  { label: "IoT / cloud", href: "/products?pay=iot", icon: IconWifi },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Shared tile chrome: soft stage, spotlight, title block top-left, action chip bottom-left. */
function Tile({
  href,
  eyebrow,
  title,
  meta,
  cta,
  tags,
  big = false,
  children,
}: {
  href: string;
  eyebrow: string;
  title: string;
  meta: string;
  cta: string;
  tags?: string[];
  big?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-subtle transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-lift dark:bg-surface ${
        big ? "min-h-[540px] p-7 sm:min-h-[520px] sm:p-9" : "min-h-[230px] p-6 sm:p-7"
      }`}
    >
      {/* engineering grid + spotlight behind the product */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_60%_70%_at_75%_70%,#000,transparent_75%)] group-hover:opacity-60"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.22),transparent)] transition-transform duration-700 ease-out-expo group-hover:scale-110 ${
          big ? "-bottom-24 right-[-8%] h-[420px] w-[420px] sm:h-[520px] sm:w-[520px]" : "-bottom-20 right-[-14%] h-64 w-64"
        }`}
      />

      <div className="relative z-10 max-w-[58%]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
        <h3 className={`mt-2 font-semibold leading-[1.05] tracking-tight text-ink ${big ? "text-3xl sm:text-[2.6rem]" : "text-xl sm:text-2xl"}`}>{title}</h3>
        <p className="mt-2 text-[13.5px] text-body">{meta}</p>
        {tags && (
          <ul className="mt-5 hidden flex-wrap gap-1.5 sm:flex">
            {tags.map((t) => (
              <li key={t} className="rounded-full border border-line bg-canvas/70 px-2.5 py-1 text-[11px] font-medium text-body backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-canvas/80 py-1.5 pl-4 pr-1.5 text-[13px] font-semibold text-ink backdrop-blur transition-colors duration-300 group-hover:border-primary-600 group-hover:bg-primary-600 group-hover:text-white">
        {cta}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-canvas transition-colors duration-300 group-hover:bg-white group-hover:text-primary-600">
          <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </span>

      {children}
    </Link>
  );
}

export default function CategoryRail() {
  const reduce = useReducedMotion();
  const { catalog, bySlug } = useCatalog();
  const from = (cat: string) => Math.min(...catalog.filter((p) => p.category === cat).map((p) => p.price));
  const count = (cat: string) => catalog.filter((p) => p.category === cat).length;
  const img = (slug: string) => bySlug.get(slug)?.image ?? "";

  const reveal = (k: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, delay: k * 0.08, ease },
  });

  return (
    <section aria-labelledby="browse-heading" className="bg-canvas py-16 sm:py-24">
      <div className="lyra-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Browse by category</p>
            <h2 id="browse-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-[2.6rem]">
              Everything a washroom needs
            </h2>
          </div>
          <Link href="/products" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            View all products <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {/* Vending machines — the hero tile, a grouped product shot */}
          <motion.div {...reveal(0)} className="lg:col-span-7 lg:row-span-2">
            <Tile
              big
              href="/products/sanitary-napkin-vending-machines"
              eyebrow={`${count("vending-machine")} models`}
              title="Vending machines"
              meta={`Push button to IoT · from ${inr(from("vending-machine"))}`}
              cta="Shop vending machines"
              tags={["Coin", "UPI", "RFID", "Touchless", "Cloud reports"]}
            >
              <div className="pointer-events-none absolute bottom-[76px] right-[4%] top-[36%] w-[92%] sm:bottom-0 sm:right-0 sm:top-[10%] sm:w-[60%]">
                {/* back-left */}
                <div className="absolute bottom-[4%] left-[2%] h-[62%] w-[34%] transition-transform duration-700 ease-out-expo group-hover:-translate-x-3 group-hover:-rotate-3">
                  <Image src={img("push-button-vending-machine")} alt="" fill sizes="200px" className="product-shot object-contain object-bottom opacity-90" />
                </div>
                {/* back-right */}
                <div className="absolute bottom-[4%] right-[2%] h-[66%] w-[34%] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-hover:rotate-3">
                  <Image src={img("solo-qr-vending-machine")} alt="" fill sizes="200px" className="product-shot object-contain object-bottom opacity-90" />
                </div>
                {/* front-centre */}
                <div className="absolute bottom-0 left-1/2 h-[92%] w-[42%] -translate-x-1/2 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]">
                  <Image
                    src={img("solo-wifi-vending-machine")}
                    alt="Lyra sanitary napkin vending machines"
                    fill
                    sizes="(max-width: 1024px) 40vw, 300px"
                    className="product-shot object-contain object-bottom"
                  />
                </div>
                <div aria-hidden className="absolute bottom-0 left-[12%] right-[12%] h-5 rounded-[100%] bg-ink/10 blur-lg dark:bg-black/60" />
              </div>
            </Tile>
          </motion.div>

          {/* Incinerators */}
          <motion.div {...reveal(1)} className="lg:col-span-3">
            <Tile
              href="/products/sanitary-napkin-incinerators"
              eyebrow={`${count("incinerator")} models`}
              title="Incinerators"
              meta={`From ${inr(from("incinerator"))}`}
              cta="Shop"
            >
              <div className="pointer-events-none absolute bottom-3 right-3 top-6 w-[42%] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-[1.04]">
                <Image src={img("lyra-mini-incinerator")} alt="" fill sizes="160px" className="product-shot object-contain object-bottom" />
              </div>
            </Tile>
          </motion.div>

          {/* Refill napkins */}
          <motion.div {...reveal(2)} className="lg:col-span-2">
            <Tile href="/products#napkins" eyebrow="XL & XXL" title="Refills" meta={`From ${inr(from("napkin"))} each`} cta="Shop">
              <div className="pointer-events-none absolute bottom-4 right-2 h-[42%] w-[42%] rotate-[-14deg] transition-transform duration-700 ease-out-expo group-hover:rotate-[-6deg] group-hover:scale-105 lg:h-[34%] lg:w-[44%]">
                <Image src={img("xl-sanitary-napkin")} alt="" fill sizes="160px" className="product-shot object-contain object-bottom" />
              </div>
            </Tile>
          </motion.div>

          {/* Bundles — machine + incinerator together */}
          <motion.div {...reveal(3)} className="lg:col-span-5">
            <Tile
              href="/products/vending-incinerator-bundle"
              eyebrow="Complete kit"
              title="Bundles"
              meta="Machine + incinerator, one invoice"
              cta="Build a bundle"
            >
              <div className="pointer-events-none absolute bottom-0 right-4 top-6 flex w-[46%] items-end justify-center gap-1">
                <div className="relative h-[94%] w-[44%] transition-transform duration-700 ease-out-expo group-hover:-translate-x-1.5 group-hover:-translate-y-1">
                  <Image src={img("push-button-vending-machine")} alt="" fill sizes="120px" className="product-shot object-contain object-bottom" />
                </div>
                <span className="mb-[22%] flex h-7 w-7 flex-none items-center justify-center rounded-full border border-line bg-canvas text-sm font-semibold text-muted transition-colors duration-300 group-hover:border-primary-600 group-hover:text-brand">
                  +
                </span>
                <div className="relative h-[66%] w-[40%] transition-transform duration-700 ease-out-expo group-hover:translate-x-1.5 group-hover:-translate-y-1">
                  <Image src={img("lyra-micro-incinerator")} alt="" fill sizes="120px" className="product-shot object-contain object-bottom" />
                </div>
              </div>
            </Tile>
          </motion.div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-[22px] border border-line bg-surface p-3 sm:flex-row sm:items-center">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted sm:pr-4">Shop by payment</span>
          <ul className="flex flex-1 flex-wrap gap-2">
            {payments.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-line bg-canvas px-4 text-sm font-medium text-ink transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-brand transition-colors group-hover:text-white" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
