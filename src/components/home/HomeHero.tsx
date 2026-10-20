"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useCatalog } from "@/components/store/StoreProvider";
import AddToCartButton from "@/components/AddToCartButton";
import { inr } from "@/lib/pricing";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/store/icons";

const stats = [
  { value: "200+", label: "Machines Installed" },
  { value: "4", label: "States Served" },
  { value: "99%", label: "Machine Uptime" },
];

/** Featured machines on the hero stage, with the two facts that sell each one. */
const FEATURED: { slug: string; chips: [string, string] }[] = [
  { slug: "solo-wifi-vending-machine", chips: ["UPI + coin payments", "Cloud usage reports"] },
  { slug: "lyra-mini-incinerator", chips: ["5–15 napkins per cycle", "Digital temperature control"] },
  { slug: "solo-qr-vending-machine", chips: ["Scan, pay, dispense", "Fully cashless"] },
  { slug: "push-button-vending-machine", chips: ["Free-issue dispensing", "Offline usage reports"] },
];

const ease = [0.16, 1, 0.3, 1] as const;
const ROTATE_MS = 5200;

export default function HomeHero() {
  const reduce = useReducedMotion();
  const { bySlug } = useCatalog();
  const slides = FEATURED.flatMap((f) => {
    const p = bySlug.get(f.slug);
    return p ? [{ ...f, p }] : [];
  });

  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const go = useCallback(
    (next: number, d = 1) => {
      setDir(d);
      setI((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || reduce || slides.length < 2) return;
    const t = setTimeout(() => go(i + 1, 1), ROTATE_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduce, go, slides.length]);

  // Pointer tilt on the stage (desktop only, disabled for reduced motion).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const slide = slides[i];

  return (
    <section id="home" className="relative overflow-hidden border-b border-line bg-canvas">
      {/* fine engineering grid, faded toward the edges */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_10%,transparent_75%)]"
      />

      <div className="lyra-container relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:py-20 xl:gap-20">
        {/* Copy. Rendered visible on the server: the headline is the LCP element. */}
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="lyra-eyebrow mb-6"
          >
            <span className="lyra-eyebrow-dot" />
            #1 Vending Machine Manufacturer India
          </motion.div>

          <h1 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl xl:text-[3.3rem]">
            Lyra Enterprises Equips <span className="text-gradient">200+ Institutions</span> with Dignified Sanitary Care
          </h1>
          <p className="mt-4 text-lg font-medium text-muted sm:text-xl">Sanitary Napkin Vending Machines &amp; Incinerators</p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-[17px]">
            <strong className="font-semibold text-ink">Lyra Enterprises</strong> manufactures{" "}
            <strong className="font-semibold text-ink">sanitary napkin vending machines</strong> and{" "}
            <strong className="font-semibold text-ink">incinerators</strong> installed in 200+ schools, hospitals and
            offices pan-India, with offices in South India (Chennai) and North India (West Bengal). Unlike a single
            household dispenser, Lyra machines are built for institutional scale — not just consumer countertops.
          </p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/products" className="btn btn-primary h-12 px-6 text-[15px]">
              Shop the range
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#contact" className="btn btn-secondary h-12 px-6 text-[15px]">
              Get a Free Quote
            </Link>
          </motion.div>

          <dl className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
            {stats.map((stat, k) => (
              <motion.div
                key={stat.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + k * 0.08, ease }}
                className="flex flex-col-reverse"
              >
                <dt className="mt-1 text-xs leading-tight text-muted sm:text-sm">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Product stage */}
        {slide && (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              onLeave();
            }}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div
              onPointerMove={onMove}
              className="relative overflow-hidden rounded-[28px] border border-line bg-subtle [perspective:1200px]"
              aria-roledescription="carousel"
              aria-label="Featured products"
            >
              {/* spotlight */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[18%] h-[70%] w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.22),transparent)]"
              />
              {/* plinth */}
              <div aria-hidden className="absolute bottom-[13%] left-1/2 h-8 w-[52%] -translate-x-1/2 rounded-[100%] bg-ink/10 blur-xl dark:bg-black/60" />

              <div className="relative aspect-[5/6] sm:aspect-[4/4] lg:aspect-[5/6]">
                <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                  <motion.div
                    key={slide.p.slug}
                    custom={dir}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60, scale: 0.96, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 160, damping: 22 }}
                    style={{ rotateX: rx, rotateY: ry }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.p.image}
                      alt={`${slide.p.fullName} by Lyra Enterprises`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="product-shot object-contain px-[18%] pb-[16%] pt-[9%]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* floating spec chips */}
                <AnimatePresence mode="wait">
                  <motion.ul key={slide.p.slug} className="pointer-events-none absolute inset-0" aria-hidden>
                    {slide.chips.map((c, k) => (
                      <motion.li
                        key={c}
                        initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.5, delay: 0.25 + k * 0.12, ease }}
                        className={`absolute rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-md backdrop-blur ${
                          k === 0 ? "left-[6%] top-[22%]" : "right-[6%] top-[52%]"
                        }`}
                      >
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary-600 align-middle" />
                        {c}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {/* caption bar */}
              <div className="relative flex items-center gap-4 border-t border-line bg-surface/80 p-4 backdrop-blur sm:p-5">
                <div className="min-w-0 flex-1" aria-live="polite">
                  <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {slide.p.badge}
                  </p>
                  <Link href={`/products/${slide.p.slug}`} className="mt-1 block truncate font-display text-lg font-semibold text-ink hover:text-brand">
                    {slide.p.name}
                  </Link>
                  <p className="text-sm text-muted tabular">
                    <span className="font-semibold text-ink">{inr(slide.p.price)}</span> + GST
                  </p>
                </div>
                <div className="hidden w-40 sm:block">
                  <AddToCartButton slug={slide.p.slug} name={slide.p.fullName} price={slide.p.price} variant="block" />
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => go(i - 1, -1)}
                    aria-label="Previous product"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-subtle"
                  >
                    <IconChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(i + 1, 1)}
                    aria-label="Next product"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-subtle"
                  >
                    <IconChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* progress */}
              <div className="absolute inset-x-0 bottom-0 flex h-[3px] gap-px">
                {slides.map((s, k) => (
                  <span key={s.p.slug} className="relative flex-1 overflow-hidden bg-line">
                    {k === i && !reduce && (
                      <motion.span
                        key={`${s.p.slug}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-primary-600"
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{ duration: paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                      />
                    )}
                    {k < i && <span className="absolute inset-0 bg-primary-600/40" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
