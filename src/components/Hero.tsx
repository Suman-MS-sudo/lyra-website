"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "200+", label: "Machines Installed" },
  { value: "4", label: "States Served" },
  { value: "99%", label: "Machine Uptime" },
];

const trustLogos = [
  { src: "/images/customers/isro-logo.png", name: "ISRO" },
  { src: "/images/customers/tvs-motors-logo-png-0.png", name: "TVS Motor" },
  { src: "/images/customers/parker-hannifin-logo-png-transparent.png", name: "Parker Hannifin" },
  { src: "/images/customers/lnt.png", name: "Larsen & Toubro" },
  { src: "/images/customers/saint-gobain.png", name: "Saint-Gobain" },
  { src: "/images/customers/stella-maris.png", name: "Stella Maris College" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-hero-gradient pt-28 pb-14 sm:pt-32 sm:pb-16"
    >
      {/* ambient brand mesh — static, cheap */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-48 -right-24 h-[560px] w-[560px] rounded-full opacity-70 blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14), rgba(37,99,235,0) 70%)" }}
        />
        <div
          className="absolute top-40 -left-40 h-[440px] w-[440px] rounded-full opacity-60 blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12), rgba(56,189,248,0) 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="lyra-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] xl:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="lyra-eyebrow mb-6">
              <span className="lyra-eyebrow-dot" />
              #1 Vending Machine Manufacturer India
            </div>

            <h1 className="text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl xl:text-[3.75rem]">
              Empowering <span className="text-gradient">Women&apos;s Health</span>{" "}
              <br className="hidden sm:block" />
              Across India
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-500 sm:text-xl">
              Sanitary Napkin Vending Machines &amp; Incinerators
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Premium{" "}
              <strong className="font-semibold text-slate-900">
                sanitary napkin vending machines
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-slate-900">incinerators</strong>{" "}
              designed for schools, hospitals &amp; offices. Trusted by 200+
              institutions for dignified, hygienic solutions.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#products" className="btn btn-primary">
                View Products
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link href="#contact" className="btn btn-secondary">
                Get a Free Quote
              </Link>
            </div>

            <dl className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-200 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs leading-tight text-slate-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right — illustration on a soft brand panel with floating proof chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto max-w-md">
              {/* soft panel */}
              <div className="relative aspect-square w-full">
                <div className="absolute inset-0 rounded-[42%_58%_54%_46%/48%_42%_58%_52%] bg-gradient-to-br from-primary-100/80 via-primary-50 to-sky-50" />
                <div className="absolute inset-4 rounded-[46%_54%_50%_50%/52%_46%_54%_48%] bg-white/50" />
                <Image
                  src="/images/products/hero-vending-machine-incinerator.png"
                  alt="Lyra Enterprises sanitary napkin vending machine and incinerator range"
                  fill
                  sizes="(max-width: 1024px) 0px, 440px"
                  className="relative object-contain p-8"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* trust strip */}
        <div className="mt-14 border-t border-slate-200 pt-8 sm:mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Trusted by 200+ institutions across India
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {trustLogos.map((logo) => (
              <div key={logo.name} className="relative h-8 w-24 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-9 sm:w-28">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
