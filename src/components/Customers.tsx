"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/lib/data";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import { IconArrowRight, IconStar } from "@/components/store/icons";

type Customer = { name: string; logo: string };

const sectors: { label: string; items: Customer[] }[] = [
  {
    label: "Industrial & Manufacturing",
    items: [
      { name: "Larsen & Toubro", logo: "/images/customers/lnt.png" },
      { name: "TVS Motor", logo: "/images/customers/tvs-motors-logo-png-0.png" },
      { name: "Saint-Gobain", logo: "/images/customers/saint-gobain.png" },
      { name: "Parker Hannifin", logo: "/images/customers/parker-hannifin-logo-png-transparent.png" },
      { name: "Ashok Leyland", logo: "/images/customers/ashok-leyland.png" },
    ],
  },
  {
    label: "Government, Research & Corporate",
    items: [
      { name: "ISRO", logo: "/images/customers/isro-logo.png" },
      { name: "Integra", logo: "/images/customers/integra.png" },
      { name: "Maxenra", logo: "/images/customers/maxenra.png" },
    ],
  },
  {
    label: "Colleges & Schools",
    items: [
      { name: "Vels University", logo: "/images/customers/vels-university.png" },
      { name: "Stella Maris College", logo: "/images/customers/stella-maris.png" },
      { name: "DG Vaishnav College", logo: "/images/customers/dg-vaishnav.png" },
      { name: "Mar Baselios College", logo: "/images/customers/mar-baselios.png" },
      { name: "Vivekanandha Institutions", logo: "/images/customers/Vivekanandha Educational Institutions.png" },
      { name: "Srikrish School", logo: "/images/customers/Srikrish school.png" },
    ],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Customers() {
  const reduce = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section id="customers" className="bg-canvas py-20 sm:py-24 lg:py-32">
      <div className="lyra-container">
        <motion.div {...fade()} className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center">Our Customers</p>
          <h2 className="mt-4 text-display-lg font-semibold text-ink">
            India&apos;s <span className="text-gradient">Leading Organizations</span> Trust Lyra
          </h2>
          <p className="mt-5 text-lg text-body">
            ISRO, L&amp;T, TVS Motor and 200+ other institutions run Lyra vending machines in their facilities — not a
            pilot, a standard.
          </p>
        </motion.div>

        <div className="mt-14 space-y-10">
          {sectors.map((sector, s) => (
            <motion.div key={sector.label} {...fade(s * 0.05)}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{sector.label}</h3>
                <span className="h-px flex-1 bg-line" />
                <span className="text-xs font-medium text-muted tabular">{sector.items.length}</span>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {sector.items.map((c) => (
                  <li key={c.name} className="group flex flex-col items-center justify-center gap-3 rounded-[16px] border border-line bg-surface px-4 py-5 text-center transition-colors hover:border-line-strong">
                    <span className="keep-light relative flex h-14 w-full max-w-[8rem] items-center justify-center rounded-lg bg-white p-2 dark:bg-white">
                      <span className="relative h-full w-full">
                        <Image
                          src={c.logo}
                          alt={`${c.name} logo`}
                          fill
                          sizes="128px"
                          className="object-contain opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      </span>
                    </span>
                    <p className="text-[13px] font-medium leading-tight text-ink">{c.name}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-xs leading-relaxed text-muted">
              Company names and logos are trademarks of their respective owners and are shown only to identify
              organisations where Lyra Enterprises products have been supplied or installed. Their use does not imply any
              partnership, sponsorship or endorsement.
            </p>
            <Link
              href="/blog/lnt-manapakkam-case-study"
              className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Read the L&amp;T Manapakkam case study — 25 IoT machines, ongoing support <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <motion.div {...fade()}>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">What Our Customers Say</h3>
            <div className="mt-5">
              <GoogleReviewBadge />
            </div>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.author}
                {...fade(i * 0.08)}
                className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 transition-shadow duration-300 hover:shadow-lift sm:p-7"
              >
                <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <IconStar key={k} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-body">“{t.content}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-canvas">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{t.author}</span>
                    <span className="block text-xs text-muted">{t.company}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
