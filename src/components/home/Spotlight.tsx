"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import AddToCartButton from "@/components/AddToCartButton";
import { inr } from "@/lib/pricing";
import { IconArrowRight, IconBolt, IconQr, IconShield, IconWifi } from "@/components/store/icons";

type Props = { slug: string; name: string; fullName: string; image: string; price: number };

const chapters = [
  {
    icon: IconQr,
    title: "Pay any way",
    body: "UPI QR works with GPay, PhonePe, Paytm, BHIM or any NPCI-standard app, with a ₹5 coin acceptor as backup.",
  },
  {
    icon: IconShield,
    title: "Verified before it vends",
    body: "Every payment is checked server-side before the napkin drops, which blocks spoofed or fake payment screenshots.",
  },
  {
    icon: IconWifi,
    title: "Keeps working offline",
    body: "Runs on 2.4 GHz WiFi with no SIM card. If WiFi drops, transactions queue on the machine and sync on reconnect.",
  },
  {
    icon: IconBolt,
    title: "Run a fleet from a browser",
    body: "A live cloud dashboard shows stock, sales and machine status, sends low-stock alerts and pushes firmware updates remotely.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const CYCLE_MS = 3200;

/** Feature story for the best-selling smart machine: compact, with a scroll-linked machine and a cycling highlight. */
export default function Spotlight({ slug, name, fullName, image, price }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Gentle parallax on the machine while the section passes through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 });
  const rotate = useTransform(p, [0, 1], reduce ? [0, 0] : [-7, 7]);
  const y = useTransform(p, [0, 1], reduce ? [0, 0] : [40, -40]);
  const glow = useTransform(p, [0, 0.5, 1], [0.35, 0.85, 0.35]);

  // Step the highlight through the four features while the section is visible.
  useEffect(() => {
    if (reduce || paused || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % chapters.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [reduce, paused, inView]);

  return (
    <section ref={ref} aria-labelledby="spotlight-heading" className="relative overflow-hidden bg-night py-20 text-white/75 sm:py-24 lg:py-28">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_70%_70%_at_25%_50%,#000,transparent_75%)]" />

      <div className="lyra-container relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Machine stage */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.55),transparent)]"
          />
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[3%] rounded-full border border-dashed border-white/10"
          />
          <div aria-hidden className="absolute inset-[16%] rounded-full border border-white/10" />
          <motion.div style={{ rotate, y }} className="absolute inset-0">
            <Image
              src={image}
              alt={fullName}
              fill
              sizes="(max-width: 1024px) 80vw, 460px"
              className="object-contain p-[12%] drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
          <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {name} · {inr(price)} + GST
          </div>
        </div>

        {/* Story */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-400">Most popular · {name}</p>
            <h2 id="spotlight-heading" className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              A vending machine that runs itself.
            </h2>
          </motion.div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {chapters.map((c, k) => {
              const on = !reduce && active === k;
              return (
                <motion.li
                  key={c.title}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 + k * 0.08, ease }}
                  onMouseEnter={() => setActive(k)}
                  className={`relative overflow-hidden rounded-[20px] border p-5 transition-colors duration-500 ${
                    on ? "border-primary-400/40 bg-primary-500/[0.08]" : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-500 ${
                        on ? "border-primary-400/60 bg-primary-500/20 text-primary-400" : "border-white/10 text-white/50"
                      }`}
                    >
                      <c.icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-white">{c.title}</h3>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{c.body}</p>
                  {on && (
                    <motion.span
                      key={`bar-${k}-${paused}`}
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] bg-primary-400"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "0%" : "100%" }}
                      transition={{ duration: paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="dark w-48">
              <AddToCartButton slug={slug} name={fullName} price={price} variant="block" />
            </div>
            <Link href={`/products/${slug}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-400">
              See full specs <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
