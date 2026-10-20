"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import AddToCartButton from "@/components/AddToCartButton";
import DustCanvas from "@/components/home/DustCanvas";
import { inr } from "@/lib/pricing";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/store/icons";

const stats = [
  { value: "200+", label: "Machines Installed" },
  { value: "4", label: "States Served" },
  { value: "99%", label: "Machine Uptime" },
];

/** Products featured on the cinematic stage, with the two facts that sell each one. */
const FEATURED: { slug: string; chips: [string, string] }[] = [
  { slug: "solo-wifi-vending-machine", chips: ["UPI + coin payments", "Cloud usage reports"] },
  { slug: "lyra-mini-incinerator", chips: ["5–15 napkins per cycle", "Digital temperature control"] },
  { slug: "solo-qr-vending-machine", chips: ["Scan, pay, dispense", "Fully cashless"] },
  { slug: "push-button-vending-machine", chips: ["Free-issue dispensing", "Offline usage reports"] },
];

const ease = [0.16, 1, 0.3, 1] as const;
const SCENE_MS = 6500;

/**
 * Cinematic homepage hero: an always-dark stage (light beams, drifting dust, film grain,
 * vignette) where real product photography is revealed shot by shot with a slow push-in,
 * a light sweep and a floor reflection. If /videos/hero.mp4 exists it plays behind the same grade.
 */
export default function HomeHero({ videoSrc }: { videoSrc?: string }) {
  const reduce = useReducedMotion();
  const { bySlug } = useCatalog();
  const slides = FEATURED.flatMap((f) => {
    const p = bySlug.get(f.slug);
    return p ? [{ ...f, p }] : [];
  });

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((next: number) => setI((next + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || reduce || slides.length < 2) return;
    const t = setTimeout(() => go(i + 1), SCENE_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduce, go, slides.length]);

  // Pointer parallax: product drifts with the cursor, light beams counter-drift.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const productX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const productY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const beamsX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const slide = slides[i];

  return (
    <section id="home" onPointerMove={onMove} className="dark relative -mt-[76px] overflow-hidden bg-canvas pt-[76px] text-body" aria-label="Lyra Enterprises">
      {/* ── Stage ───────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0">
        {videoSrc ? (
          <video className="absolute inset-0 h-full w-full object-cover opacity-60" src={videoSrc} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <div className="aurora">
            <span />
            <span />
            <span />
          </div>
        )}
        <motion.div style={{ x: beamsX }} className="absolute inset-0">
          <div className="beam left-[48%] top-[-10%] h-[130%] w-[34%]" style={{ animation: reduce ? undefined : "beam-sway 14s ease-in-out infinite" }} />
          <div className="beam left-[66%] top-[-10%] h-[120%] w-[26%] opacity-70" style={{ animation: reduce ? undefined : "beam-sway 18s ease-in-out -6s infinite reverse" }} />
        </motion.div>
        <div className="grid-lines absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_55%,#000,transparent_75%)]" />
        <DustCanvas />
      </div>

      <div className="lyra-container relative z-[2] grid min-h-[calc(100svh-36px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-16">
        {/* ── Copy (server-rendered and visible: it is the LCP) ── */}
        <div className="relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-400" />
            </span>
            #1 Vending Machine Manufacturer India
          </motion.div>

          <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3.4rem] xl:text-[4.1rem]">
            Lyra Enterprises Equips{" "}
            <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#c4b5fd] bg-clip-text text-transparent">200+ Institutions</span> with
            Dignified Sanitary Care
          </h1>
          <p className="mt-5 text-lg font-medium text-white/60 sm:text-xl">Sanitary Napkin Vending Machines &amp; Incinerators</p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-[17px]">
            <strong className="font-semibold text-white">Lyra Enterprises</strong> manufactures{" "}
            <strong className="font-semibold text-white">sanitary napkin vending machines</strong> and{" "}
            <strong className="font-semibold text-white">incinerators</strong> installed in 200+ schools, hospitals and
            offices pan-India, with offices in South India (Chennai) and North India (West Bengal). Unlike a single
            household dispenser, Lyra machines are built for institutional scale — not just consumer countertops.
          </p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/products" className="btn btn-primary h-12 px-7 text-[15px]">
              Shop the range
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#contact" className="btn h-12 border-white/15 bg-white/[0.06] px-7 text-[15px] text-white backdrop-blur hover:bg-white/10">
              Get a Free Quote
            </Link>
          </motion.div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {stats.map((stat, k) => (
              <motion.div
                key={stat.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + k * 0.08, ease }}
                className="flex flex-col-reverse"
              >
                <dt className="mt-1 text-xs leading-tight text-white/50 sm:text-sm">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[2.1rem]">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* ── Product "shots" ─────────────────────────────── */}
        {slide && (
          <div
            className="relative mx-auto w-full max-w-[560px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Featured products"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              {/* spotlight pool on the floor */}
              <div aria-hidden className="absolute bottom-[10%] left-1/2 h-[18%] w-[70%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(96,165,250,0.35),transparent)] blur-md" />
              <div aria-hidden className="absolute bottom-[9%] left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <motion.div style={{ x: productX, y: productY }} className="absolute inset-0">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={slide.p.slug}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: "blur(14px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(10px)", transition: { duration: 0.7 } }}
                    transition={{ duration: 1.4, ease }}
                  >
                    {/* slow push-in for the whole shot */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1 }}
                      animate={reduce ? undefined : { scale: 1.06 }}
                      transition={{ duration: SCENE_MS / 1000 + 1.5, ease: "linear" }}
                    >
                      <div className="absolute inset-x-[18%] bottom-[10%] top-[6%]">
                        <Image
                          src={slide.p.image}
                          alt={`${slide.p.fullName} by Lyra Enterprises`}
                          fill
                          priority={i === 0}
                          sizes="(max-width: 1024px) 70vw, 400px"
                          className="object-contain object-bottom drop-shadow-[0_40px_50px_rgba(0,0,0,0.65)]"
                        />
                        {/* light sweep across the product, masked to its silhouette */}
                        {!reduce && (
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 mix-blend-overlay"
                            style={{
                              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.6) 50%, transparent 65%)",
                              backgroundSize: "250% 100%",
                              WebkitMaskImage: `url(${slide.p.image})`,
                              maskImage: `url(${slide.p.image})`,
                              WebkitMaskSize: "contain",
                              maskSize: "contain",
                              WebkitMaskRepeat: "no-repeat",
                              maskRepeat: "no-repeat",
                              WebkitMaskPosition: "center bottom",
                              maskPosition: "center bottom",
                            }}
                            initial={{ backgroundPosition: "120% 0" }}
                            animate={{ backgroundPosition: "-120% 0" }}
                            transition={{ duration: 2.2, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                          />
                        )}
                      </div>
                      {/* floor reflection */}
                      <div aria-hidden className="absolute inset-x-[18%] bottom-[-26%] top-[90%] scale-y-[-1] opacity-25 [mask-image:linear-gradient(to_top,#000,transparent_70%)]">
                        <Image src={slide.p.image} alt="" fill sizes="400px" className="object-contain object-bottom blur-[2px]" />
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* spec call-outs */}
              <AnimatePresence mode="wait">
                <motion.ul key={slide.p.slug} className="pointer-events-none absolute inset-0" aria-hidden>
                  {slide.chips.map((c, k) => (
                    <motion.li
                      key={c}
                      initial={reduce ? false : { opacity: 0, x: k === 0 ? -14 : 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.7, delay: 0.8 + k * 0.18, ease }}
                      className={`absolute flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md ${
                        k === 0 ? "left-0 top-[22%]" : "right-0 top-[50%]"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
                      {c}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* caption / controls */}
            <div className="relative mt-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 pl-5 backdrop-blur-md">
              <div className="min-w-0 flex-1" aria-live="polite">
                <p className="truncate text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Scene {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {slide.p.badge}
                </p>
                <Link href={`/products/${slide.p.slug}`} className="mt-0.5 block truncate font-display text-lg font-semibold text-white hover:text-primary-300">
                  {slide.p.name} <span className="text-sm font-normal text-white/55">· {inr(slide.p.price)} + GST</span>
                </Link>
              </div>
              <div className="hidden w-36 sm:block">
                <AddToCartButton slug={slide.p.slug} name={slide.p.fullName} price={slide.p.price} variant="block" />
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => go(i - 1)}
                  aria-label="Previous product"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <IconChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(i + 1)}
                  aria-label="Next product"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <IconChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute inset-x-5 bottom-0 flex h-[2px] gap-1">
                {slides.map((s, k) => (
                  <span key={s.p.slug} className="relative flex-1 overflow-hidden rounded-full bg-white/10">
                    {k === i && !reduce && (
                      <motion.span
                        key={`${s.p.slug}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-primary-400"
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{ duration: paused ? 0 : SCENE_MS / 1000, ease: "linear" }}
                      />
                    )}
                    {k < i && <span className="absolute inset-0 bg-primary-400/50" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* grade: vignette, bottom fade, film grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-canvas" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 z-[3] overflow-hidden" />

      {/* scroll cue */}
      <div aria-hidden className="absolute bottom-6 left-1/2 z-[3] hidden -translate-x-1/2 xl:block">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/60"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
