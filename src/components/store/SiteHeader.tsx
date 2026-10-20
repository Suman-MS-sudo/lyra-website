"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { openCart, useCart } from "@/lib/cart";
import { computeTotals, inr } from "@/lib/pricing";
import { useCatalog } from "@/components/store/StoreProvider";
import ThemeToggle from "@/components/store/ThemeToggle";
import HeaderSearch from "@/components/store/HeaderSearch";
import {
  IconArrowRight,
  IconBag,
  IconChevronDown,
  IconMenu,
  IconPhone,
  IconWhatsApp,
  IconX,
} from "@/components/store/icons";

const PHONE = "+918122378860";
const PHONE_DISPLAY = "+91-81223 78860";
const WHATSAPP = `https://wa.me/918122378860?text=${encodeURIComponent("Hi! I'm interested in Lyra vending machines / incinerators.")}`;

const solutions = [
  { label: "Schools & colleges", href: "/solutions/schools-colleges", note: "Girls' toilets, hostels and staff rooms" },
  { label: "Hospitals", href: "/solutions/hospitals", note: "Wards, OPD and staff washrooms" },
  { label: "Offices & factories", href: "/solutions/offices", note: "Corporate campuses and shop floors" },
  { label: "Women's hostels", href: "/solutions/womens-hostels-colleges", note: "Round-the-clock, unattended access" },
];

const resources = [
  { label: "Price list 2026", href: "/sanitary-napkin-vending-machine-price-india" },
  { label: "Compare all models", href: "/compare-sanitary-napkin-vending-machines" },
  { label: "Government schemes & funding", href: "/government-schemes-menstrual-hygiene" },
  { label: "Service areas", href: "/service-areas" },
  { label: "Blog & guides", href: "/blog" },
];

const primaryNav = [
  { label: "Vending machines", href: "/products/sanitary-napkin-vending-machines" },
  { label: "Incinerators", href: "/products/sanitary-napkin-incinerators" },
  { label: "Bundles", href: "/products/vending-incinerator-bundle" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type MenuKey = "shop" | "solutions" | "resources" | null;

export default function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation and on Escape.
  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hover = (key: MenuKey) => ({
    onMouseEnter: () => {
      clearTimeout(closeTimer.current);
      setMenu(key);
    },
    onMouseLeave: () => {
      closeTimer.current = setTimeout(() => setMenu(null), 140);
    },
  });

  return (
    <>
      {/* Utility strip: scrolls away, the main bar stays */}
      <div className="hidden border-b border-white/10 bg-night text-[12.5px] text-white/65 md:block">
        <div className="lyra-container flex h-9 items-center justify-between gap-6">
          <p className="truncate">
            <span className="text-white">Direct from the manufacturer</span>
            <span className="mx-2.5 text-white/25">/</span>
            ISO 9001:2015 certified
            <span className="mx-2.5 text-white/25">/</span>
            GST invoice on every order
            <span className="mx-2.5 text-white/25">/</span>
            Pan-India dispatch from Chennai
          </p>
          <div className="flex flex-none items-center gap-5">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-primary-400">
              <IconPhone className="h-3.5 w-3.5" />
              {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <IconWhatsApp className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <Link href="/contact" className="transition-colors hover:text-white">
              Help
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? "glass shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]" : "border-b border-line bg-canvas"
        }`}
      >
        {/* Main bar */}
        <div className="lyra-container flex h-16 items-center gap-3 sm:gap-5 lg:h-[72px]">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-subtle lg:hidden"
          >
            <IconMenu />
          </button>

          <Link href="/" className="flex flex-none items-center gap-2.5" aria-label="Lyra Enterprises home">
            <span className="relative h-9 w-9 flex-none">
              <Image src="/images/logo.png" alt="" fill sizes="36px" quality={60} className="object-contain" priority />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-[17px] font-semibold tracking-tight text-ink">Lyra Enterprises</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Hygiene infrastructure</span>
            </span>
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <HeaderSearch />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
            <a
              href={`tel:${PHONE}`}
              className="mr-2 hidden items-center gap-3 xl:flex"
              aria-label={`Call sales ${PHONE_DISPLAY}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-brand">
                <IconPhone className="h-[18px] w-[18px]" />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">Sales, Mon–Sat</span>
                <span className="block text-sm font-semibold text-ink tabular">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <ThemeToggle />
            <CartButton />
          </div>
        </div>

        {/* Mobile search */}
        <div className="lyra-container pb-3 md:hidden">
          <HeaderSearch compact />
        </div>

        {/* Desktop nav row */}
        <nav aria-label="Primary" className="hidden border-t border-line lg:block">
          <div className="lyra-container relative flex h-12 items-center justify-between">
            <ul className="flex items-center gap-1 text-[14px] font-medium text-body">
              <li {...hover("shop")}>
                <button
                  type="button"
                  aria-expanded={menu === "shop"}
                  onClick={() => setMenu(menu === "shop" ? null : "shop")}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-3.5 font-semibold text-canvas transition hover:bg-ink/85"
                >
                  <IconMenu className="h-4 w-4" />
                  Shop all
                  <IconChevronDown className={`h-3.5 w-3.5 transition-transform ${menu === "shop" ? "rotate-180" : ""}`} />
                </button>
              </li>
              {primaryNav.slice(0, 3).map((l) => (
                <NavLink key={l.href} href={l.href} active={pathname === l.href}>
                  {l.label}
                </NavLink>
              ))}
              <li {...hover("solutions")}>
                <MenuTrigger open={menu === "solutions"} onClick={() => setMenu(menu === "solutions" ? null : "solutions")}>
                  Solutions
                </MenuTrigger>
              </li>
              <li {...hover("resources")}>
                <MenuTrigger open={menu === "resources"} onClick={() => setMenu(menu === "resources" ? null : "resources")}>
                  Resources
                </MenuTrigger>
              </li>
              {primaryNav.slice(3).map((l) => (
                <NavLink key={l.href} href={l.href} active={pathname === l.href}>
                  {l.label}
                </NavLink>
              ))}
            </ul>
            <Link
              href="/offers/push-button-micro-combo"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-ink"
            >
              <span className="rounded-md bg-primary-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Offer</span>
              Push Button + Micro combo
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <AnimatePresence>
              {menu && (
                <motion.div
                  key={menu}
                  {...hover(menu)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-4 right-4 top-full z-50 mt-px sm:left-6 sm:right-6 lg:left-8 lg:right-8"
                >
                  <div className="overflow-hidden rounded-b-2xl border border-t-0 border-line bg-elevated shadow-lg">
                    {menu === "shop" && <ShopMenu />}
                    {menu === "solutions" && <SolutionsMenu />}
                    {menu === "resources" && <ResourcesMenu />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`inline-flex h-9 items-center rounded-lg px-3 transition-colors hover:bg-subtle hover:text-ink ${active ? "text-ink" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}

function MenuTrigger({ open, onClick, children }: { open: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1 rounded-lg px-3 transition-colors hover:bg-subtle hover:text-ink ${open ? "bg-subtle text-ink" : ""}`}
    >
      {children}
      <IconChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

function CartButton() {
  const { items } = useCart();
  const { bySlug } = useCatalog();
  const lines = Object.entries(items).flatMap(([slug, qty]) => {
    const p = bySlug.get(slug);
    return p ? [{ price: p.price, category: p.category, qty }] : [];
  });
  const { subtotal } = computeTotals(lines);
  const units = Object.entries(items).reduce((n, [slug, q]) => n + (bySlug.get(slug)?.category === "napkin" ? 1 : q), 0);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={units > 0 ? `Open cart, ${units} item${units === 1 ? "" : "s"}` : "Open cart"}
      className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-1 transition-colors hover:bg-subtle sm:pr-3"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-canvas">
        <IconBag className="h-[18px] w-[18px]" />
        <AnimatePresence>
          {units > 0 && (
            <motion.span
              key={units}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 22 }}
              className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10.5px] font-bold text-white ring-2 ring-canvas"
            >
              {units > 99 ? "99+" : units}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="hidden text-left leading-tight sm:block">
        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">Cart</span>
        <span className="block text-sm font-semibold text-ink tabular">{inr(subtotal)}</span>
      </span>
    </button>
  );
}

function ShopMenu() {
  const { catalog } = useCatalog();
  const machines = catalog.filter((p) => p.category === "vending-machine");
  const incinerators = catalog.filter((p) => p.category === "incinerator");
  const napkins = catalog.filter((p) => p.category === "napkin");
  return (
    <div className="grid grid-cols-[1fr_1fr_17rem]">
      <div className="border-r border-line p-6">
        <MenuHeading href="/products/sanitary-napkin-vending-machines">Vending machines</MenuHeading>
        <ul className="mt-3 grid grid-cols-2 gap-1">
          {machines.map((p) => (
            <MenuProduct key={p.slug} slug={p.slug} name={p.name} image={p.image} meta={inr(p.price)} />
          ))}
        </ul>
      </div>
      <div className="border-r border-line p-6">
        <MenuHeading href="/products/sanitary-napkin-incinerators">Incinerators</MenuHeading>
        <ul className="mt-3 grid gap-1">
          {incinerators.map((p) => (
            <MenuProduct key={p.slug} slug={p.slug} name={p.name} image={p.image} meta={inr(p.price)} />
          ))}
        </ul>
        <MenuHeading href="/products#napkins" className="mt-6">
          Refill napkins
        </MenuHeading>
        <ul className="mt-3 grid grid-cols-2 gap-1">
          {napkins.map((p) => (
            <MenuProduct key={p.slug} slug={p.slug} name={p.name} image={p.image} meta={`${inr(p.price)} / pc`} />
          ))}
        </ul>
      </div>
      <Link
        href="/products/vending-incinerator-bundle"
        className="group relative flex flex-col justify-between overflow-hidden bg-night p-6 text-white"
      >
        <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary-600/40 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-400">Complete washroom kit</p>
          <p className="mt-3 font-display text-xl font-semibold leading-snug">Vending machine + incinerator bundle</p>
          <p className="mt-2 text-sm text-white/60">Dispense and dispose in one order, one invoice, one install visit.</p>
        </div>
        <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          Build a bundle <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}

function MenuHeading({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted hover:text-ink ${className}`}>
      {children}
      <span className="text-[11px] normal-case tracking-normal text-brand opacity-0 transition-opacity group-hover:opacity-100">View all →</span>
    </Link>
  );
}

function MenuProduct({ slug, name, image, meta }: { slug: string; name: string; image: string; meta: string }) {
  return (
    <li>
      <Link href={`/products/${slug}`} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-subtle">
        <span className="relative h-11 w-11 flex-none overflow-hidden rounded-lg bg-subtle">
          <Image src={image} alt="" fill sizes="44px" className="object-contain p-1" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-ink">{name}</span>
          <span className="block text-xs text-muted tabular">{meta}</span>
        </span>
      </Link>
    </li>
  );
}

function SolutionsMenu() {
  return (
    <div className="grid grid-cols-4 gap-px bg-line">
      {solutions.map((s) => (
        <Link key={s.href} href={s.href} className="group bg-elevated p-6 transition-colors hover:bg-subtle">
          <p className="font-display text-base font-semibold text-ink">{s.label}</p>
          <p className="mt-1 text-sm text-muted">{s.note}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            Explore <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function ResourcesMenu() {
  return (
    <div className="grid grid-cols-[1fr_20rem]">
      <ul className="grid grid-cols-2 gap-1 p-5">
        {resources.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-subtle">
              {r.label}
              <IconArrowRight className="h-3.5 w-3.5 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-l border-line bg-subtle p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Procurement help</p>
        <p className="mt-2 font-display text-lg font-semibold text-ink">Buying for a tender or CSR project?</p>
        <p className="mt-1.5 text-sm text-muted">We send specs, a formal quote and compliance documents the same day.</p>
        <Link href="/contact" className="btn btn-primary mt-4 w-full">
          Talk to sales
        </Link>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { catalog } = useCatalog();
  const [section, setSection] = useState<string | null>("shop");
  const groups = [
    { key: "machines", label: "Vending machines", items: catalog.filter((p) => p.category === "vending-machine") },
    { key: "incinerators", label: "Incinerators", items: catalog.filter((p) => p.category === "incinerator") },
    { key: "napkins", label: "Refill napkins", items: catalog.filter((p) => p.category === "napkin") },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-night/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-canvas shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <span className="relative h-8 w-8">
                  <Image src="/images/logo.png" alt="" fill sizes="32px" className="object-contain" />
                </span>
                <span className="font-display text-base font-semibold text-ink">Lyra Enterprises</span>
              </Link>
              <button type="button" onClick={onClose} aria-label="Close menu" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-subtle">
                <IconX />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {groups.map((g) => (
                <div key={g.key} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setSection(section === g.key ? null : g.key)}
                    aria-expanded={section === g.key}
                    className="flex w-full items-center justify-between py-3.5 text-left font-display text-[15px] font-semibold text-ink"
                  >
                    {g.label}
                    <IconChevronDown className={`h-4 w-4 text-muted transition-transform ${section === g.key ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {section === g.key && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        {g.items.map((p) => (
                          <li key={p.slug}>
                            <Link href={`/products/${p.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-xl px-1 py-2 hover:bg-subtle">
                              <span className="relative h-10 w-10 flex-none rounded-lg bg-subtle">
                                <Image src={p.image} alt="" fill sizes="40px" className="object-contain p-1" />
                              </span>
                              <span className="flex-1 text-sm font-medium text-ink">{p.name}</span>
                              <span className="text-xs text-muted tabular">{inr(p.price)}</span>
                            </Link>
                          </li>
                        ))}
                        <li className="pb-3 pt-1">
                          <Link href="/products" onClick={onClose} className="text-sm font-semibold text-brand">
                            Shop all products →
                          </Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Solutions</p>
              <ul className="mt-2">
                {solutions.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} onClick={onClose} className="block py-2.5 text-[15px] text-ink">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Resources</p>
              <ul className="mt-2">
                {[...resources, { label: "About Lyra", href: "/about" }, { label: "Contact", href: "/contact" }].map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} onClick={onClose} className="block py-2.5 text-[15px] text-ink">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
              <a href={`tel:${PHONE}`} className="btn btn-secondary">
                <IconPhone className="h-4 w-4" /> Call
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1fb457]">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
