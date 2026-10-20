"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IconBadgeCheck, IconBuilding, IconHospital, IconLeaf, IconSchool, IconShield, IconUsers } from "@/components/store/icons";

const facts = [
  { k: "13", v: "models engineered in Chennai" },
  { k: "200+", v: "institutions equipped" },
  { k: "ISO", v: "9001:2015 certified manufacturing" },
];

const sectors = [
  { label: "Schools", icon: IconSchool },
  { label: "Offices", icon: IconBuilding },
  { label: "Hospitals", icon: IconHospital },
  { label: "Public spaces", icon: IconUsers },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Counts up to `to` once visible (renders the final value on the server). */
function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(to);
  const started = useRef(false);
  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [run, to]);
  return <>{n}</>;
}

/** Mission: 200 installations made literal — a dot field lights up behind a real Lyra machine. */
function MissionVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const lit = Boolean(inView || reduce);

  return (
    <div ref={ref} className="theme-light relative aspect-[5/4] overflow-hidden bg-night sm:aspect-[16/10]">
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-600/40 blur-3xl" />
      {/* 200 dots = 200 installations */}
      <div aria-hidden className="absolute bottom-6 left-5 right-[34%] top-[92px] grid sm:bottom-14 sm:left-6 sm:top-20 grid-cols-[repeat(20,minmax(0,1fr))] content-center gap-[5px] sm:gap-[7px]">
        {Array.from({ length: 200 }).map((_, i) => (
          <span
            key={i}
            className="aspect-square rounded-full transition-[background-color,transform] duration-500"
            style={{
              backgroundColor: lit ? (i % 23 === 0 ? "#93c5fd" : "rgba(96,165,250,0.55)") : "rgba(255,255,255,0.08)",
              transform: lit ? "scale(1)" : "scale(0.6)",
              transitionDelay: reduce ? "0ms" : `${(i % 20) * 22 + Math.floor(i / 20) * 40}ms`,
            }}
          />
        ))}
      </div>
      <div className="absolute left-5 top-5">
        <p className="font-display text-4xl font-semibold leading-none tracking-tight text-white">
          <CountUp to={200} run={lit} />+
        </p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Installations and counting</p>
      </div>
      <motion.div
        initial={reduce ? false : { y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className="absolute bottom-0 right-[7%] h-[88%] w-[24%]"
      >
        <Image
          src="/images/products/solo-wifi.png"
          alt="Lyra Solo WiFi sanitary napkin vending machine"
          fill
          sizes="160px"
          className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
      <ul className="absolute bottom-4 left-6 right-[30%] hidden flex-wrap gap-1.5 sm:flex">
        {sectors.map(({ label, icon: Icon }) => (
          <li key={label} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[10.5px] font-medium text-white/80 backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-primary-400" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Vision: the Lyra mark at the centre of the standards it is built to. */
function VisionVisual() {
  const reduce = useReducedMotion();
  const badges = [
    { label: "ISO 9001:2015", icon: IconBadgeCheck, pos: "left-[8%] top-[14%]" },
    { label: "CPCB compliant", icon: IconLeaf, pos: "right-[7%] top-[42%]" },
    { label: "Privacy by design", icon: IconShield, pos: "bottom-[12%] left-[12%]" },
  ];
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-subtle">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_50%,#000,transparent_70%)]" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[78%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.18),transparent)]" />
      {/* rings */}
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square h-[78%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="h-full w-full rounded-full border border-dashed border-primary-300/60"
        />
      </div>
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square h-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong" />
      <div className="absolute left-1/2 top-1/2 aspect-square h-[40%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={reduce ? false : { scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="h-full w-full rounded-full bg-surface p-4 shadow-lift"
        >
          <span className="relative block h-full w-full">
            <Image src="/images/logo.png" alt="Lyra Enterprises" fill sizes="140px" className="object-contain" />
          </span>
        </motion.div>
      </div>
      {badges.map(({ label, icon: Icon, pos }, k) => (
        <motion.span
          key={label}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + k * 0.12, ease }}
          className={`absolute ${pos} inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-[11.5px] font-semibold text-ink shadow-md backdrop-blur`}
        >
          <Icon className="h-3.5 w-3.5 text-brand" />
          {label}
        </motion.span>
      ))}
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, -20]);

  const values = [
    {
      title: "Our Mission",
      description:
        "To grow beyond our current 200+ installations and make sanitary hygiene infrastructure accessible in every school, office, hospital and public space in India.",
      visual: <MissionVisual />,
    },
    {
      title: "Our Vision",
      description:
        "To champion feminine hygiene infrastructure with ISO 9001:2015-certified quality and give every woman dignity and privacy.",
      visual: <VisionVisual />,
    },
  ];

  return (
    <section ref={ref} id="about" className="overflow-hidden bg-canvas py-20 sm:py-24 lg:py-32">
      <div className="lyra-container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20"
        >
          <div>
            <p className="kicker">India&apos;s #1 Vending Machine Manufacturer</p>
            <h2 className="mt-5 text-display-lg font-semibold text-ink">
              We Build for <span className="text-gradient">Women&apos;s Dignity</span>.
              <br />
              200+ Institutions Trust Us.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-body">
              Lyra Enterprises designs and manufactures feminine hygiene infrastructure in India — vending machines and
              incinerators built for institutional scale, not one-off consumer purchases. Our manufacturing is ISO
              9001:2015 certified for privacy, reliability and sustainability.
            </p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              Read our story →
            </Link>
          </div>
        </motion.div>

        <dl className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
          {facts.map((f) => (
            <div key={f.v} className="px-4 py-6 first:pl-0 sm:px-8">
              <dt className="sr-only">{f.v}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{f.k}</span>
                <span className="mt-1 block text-xs leading-snug text-muted sm:text-sm">{f.v}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Mission / vision */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {values.map((val, k) => (
            <motion.article
              key={val.title}
              style={{ y: y1 }}
              className="group overflow-hidden rounded-[26px] border border-line bg-surface transition-shadow duration-500 hover:shadow-lift"
            >
              {val.visual}
              <div className="border-t border-line p-6 sm:p-7">
                <h3 className="font-display text-2xl font-semibold text-ink">{val.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{val.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
