import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { IconArrowRight, IconLock, IconMail, IconPhone, IconPin } from "@/components/store/icons";

const MAPS = "https://maps.google.com/maps?q=10/21,+Vasuki+Street,+Cholapuram,+Ambattur,+Chennai+600053,+India";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Shop",
    links: [
      ["All products", "/products"],
      ["Vending machines", "/products/sanitary-napkin-vending-machines"],
      ["Rent a machine (from ₹999/mo)", "/sanitary-napkin-vending-machine-on-rent"],
      ["Recharge rental rent", "/rental/recharge"],
      ["Rental agreement", "/rental-agreement"],
      ["Push Button", "/products/push-button-vending-machine"],
      ["Solo Coin", "/products/solo-coin-vending-machine"],
      ["Solo QR (UPI)", "/products/solo-qr-vending-machine"],
      ["Solo WiFi", "/products/solo-wifi-vending-machine"],
      ["Solo Ethernet", "/products/solo-ethernet-vending-machine"],
      ["Incinerators", "/products/sanitary-napkin-incinerators"],
      ["Lyra Micro / Mini / Maxi", "/products/lyra-mini-incinerator"],
      ["Vending + incinerator bundle", "/products/vending-incinerator-bundle"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["All sectors", "/solutions"],
      ["Schools & colleges", "/solutions/schools-colleges"],
      ["Hospitals", "/solutions/hospitals"],
      ["Offices & factories", "/solutions/offices"],
      ["Women's hostels", "/solutions/womens-hostels-colleges"],
      ["Government schemes & funding", "/government-schemes-menstrual-hygiene"],
      ["GeM & tender guide", "/blog/gem-tender-sanitary-napkin-vending-machine-guide"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Price list 2026", "/sanitary-napkin-vending-machine-price-india"],
      ["Compare models", "/compare-sanitary-napkin-vending-machines"],
      ["Blog & guides", "/blog"],
      ["L&T case study", "/blog/lnt-manapakkam-case-study"],
      ["Service areas", "/service-areas"],
      ["Tamil Nadu", "/vending-machine-tamil-nadu"],
      ["Karnataka", "/vending-machine-karnataka"],
      ["Kerala", "/vending-machine-kerala"],
      ["Maharashtra", "/vending-machine-maharashtra"],
      ["Delhi NCR", "/vending-machine-delhi"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Contact", "/contact"],
      ["Your cart", "/cart"],
      ["Privacy policy", "/privacy-policy"],
      ["Terms & conditions", "/terms-and-conditions"],
      ["Cancellation & refund", "/cancellation-refund-policy"],
      ["Shipping & delivery", "/shipping-delivery-policy"],
    ],
  },
];

const social = [
  { label: "LinkedIn", href: SITE.social.linkedin, path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" },
  { label: "Instagram", href: SITE.social.instagram, path: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2.2c-2.7 0-3 0-4 .1-3.6.2-5.5 2-5.7 5.7-.1 1-.1 1.4-.1 4s0 3 .1 4c.2 3.6 2 5.5 5.7 5.7 1 .1 1.4.1 4 .1s3 0 4-.1c3.6-.2 5.5-2 5.7-5.7.1-1 .1-1.4.1-4s0-3-.1-4c-.2-3.6-2-5.5-5.7-5.7-1-.1-1.3-.1-4-.1Zm0 1.8c2.6 0 2.9 0 3.9.1 2.6.1 3.9 1.4 4 4 .1 1 .1 1.3.1 3.9s0 2.9-.1 3.9c-.1 2.6-1.4 3.9-4 4-1 .1-1.3.1-3.9.1s-2.9 0-3.9-.1c-2.6-.1-3.9-1.4-4-4C4 14.9 4 14.6 4 12s0-2.9.1-3.9c.1-2.6 1.4-3.9 4-4C9.1 4 9.4 4 12 4Z" },
  { label: "Facebook", href: SITE.social.facebook, path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.5 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" },
];

const payments = ["UPI", "Visa", "Mastercard", "RuPay", "Net banking", "Wallets"];

/** Site-wide footer (dark in both themes). Rendered by both <Footer/> and <PageFooter/>. */
export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-night pb-24 text-white/60 md:pb-0 [&_a:focus-visible]:outline-primary-400">
      {/* CTA band */}
      <div className="lyra-container">
        <div className="relative grid gap-8 border-b border-white/10 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-400">200+ institutions equipped</p>
            <h2 className="mt-4 max-w-2xl font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Dignified sanitary care, installed in a week.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/products" className="btn btn-primary h-12 px-6">
              Shop the range <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn h-12 border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">
              Talk to sales
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative h-11 w-11">
                <Image src="/images/logo.png" alt="Lyra Enterprises logo" fill sizes="44px" quality={60} className="object-contain" />
              </span>
              <span className="font-display text-lg font-semibold text-white">Lyra Enterprises</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              ISO 9001:2015 certified manufacturer of sanitary napkin vending machines and incinerators, installed in
              200+ institutions pan-India, with offices serving South India (Chennai) and North India (West Bengal).
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                  <IconPin className="mt-0.5 h-4 w-4 flex-none text-primary-400" />
                  {SITE.address}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="flex items-center gap-3 hover:text-white">
                  <IconPhone className="h-4 w-4 flex-none text-primary-400" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="h-4 w-4 flex-none text-primary-400" />
                <ObfuscatedEmail
                  subject="Product Inquiry - Lyra Enterprises"
                  body="Hi! I'm interested in Lyra Enterprises' sanitary napkin vending machines and incinerators. Please share details."
                  className="hover:text-white"
                />
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/75 transition-colors hover:border-white/30 hover:text-white"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a href={SITE.social.indiamart} target="_blank" rel="noopener noreferrer" aria-label="IndiaMART" className="flex h-10 items-center rounded-full border border-white/10 px-3.5 text-[11px] font-semibold text-white/75 hover:border-white/30 hover:text-white">
                IndiaMART
              </a>
              <a href={SITE.social.justdial} target="_blank" rel="noopener noreferrer" aria-label="Justdial" className="flex h-10 items-center rounded-full border border-white/10 px-3.5 text-[11px] font-semibold text-white/75 hover:border-white/30 hover:text-white">
                Justdial
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">{col.title}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={href + label}>
                    <Link href={href} className="transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lyra Enterprises. All rights reserved. GST invoice on every order.</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-white/75">
              <IconLock className="h-3.5 w-3.5" /> Payments secured by Razorpay
            </span>
            {payments.map((p) => (
              <span key={p} className="rounded-md border border-white/10 px-2 py-1 text-[10.5px] font-semibold tracking-wide text-white/75">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="lyra-container -mb-[0.22em] font-display text-[22vw] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] lg:text-[17rem]">
          Lyra
        </p>
      </div>
    </footer>
  );
}
