"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { openCart, useCart } from "@/lib/cart";
import { inr } from "@/lib/pricing";
import { useCatalog } from "@/components/store/StoreProvider";
import ThemeToggle from "@/components/store/ThemeToggle";
import SearchDialog from "@/components/store/SearchDialog";
import {
  IconArrowRight,
  IconBag,
  IconBuilding,
  IconChevronDown,
  IconHospital,
  IconMenu,
  IconPhone,
  IconSchool,
  IconSearch,
  IconUsers,
  IconWhatsApp,
  IconX,
} from "@/components/store/icons";

const PHONE = "+918122378860";
const PHONE_DISPLAY = "+91-81223 78860";
const WHATSAPP = `https://wa.me/918122378860?text=${encodeURIComponent("Hi! I'm interested in Lyra vending machines / incinerators.")}`;

const solutions = [
  { label: "Schools & colleges", href: "/solutions/schools-colleges", note: "Girls' toilets, hostels and staff rooms", icon: IconSchool },
  { label: "Hospitals", href: "/solutions/hospitals", note: "Wards, OPD and staff washrooms", icon: IconHospital },
  { label: "Offices & factories", href: "/solutions/offices", note: "Corporate campuses and shop floors", icon: IconBuilding },
  { label: "Women's hostels", href: "/solutions/womens-hostels-colleges", note: "Round-the-clock, unattended access", icon: IconUsers },
];

const resources = [
  { label: "Price list 2026", href: "/sanitary-napkin-vending-machine-price-india", note: "Every model, ex-GST" },
  { label: "Compare all models", href: "/compare-sanitary-napkin-vending-machines", note: "Side-by-side specs" },
  { label: "Government schemes", href: "/government-schemes-menstrual-hygiene", note: "Funding and subsidies" },
  { label: "Service areas", href: "/service-areas", note: "All states & UTs" },
  { label: "Blog & guides", href: "/blog", note: "Buying guides, case studies" },
];

type MenuKey = "shop" | "solutions" | "resources" | null;

export default function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
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
      closeTimer.current = setTimeout(() => setMenu(null), 160);
    },
  });

  const isActive = (prefixes: string[]) => prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <>
      {/* One-line announcement (scrolls away) */}
      <div className="bg-night">
        <Link
          href="/offers/push-button-micro-combo"
          className="lyra-container group flex h-9 items-center justify-center gap-2 text-[12.5px] text-white/70 transition-colors hover:text-white"
        >
          <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">New</span>
          <span className="truncate">
            Push Button + Micro Incinerator combo at <strong className="font-semibold text-white">₹19,999</strong>
            <span className="hidden sm:inline"> · GST invoice · pan-India dispatch</span>
          </span>
          <IconArrowRight className="h-3.5 w-3.5 flex-none transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
        <div
          className={`relative mx-auto flex h-16 max-w-[82rem] items-center gap-2 rounded-full border pl-3 pr-2 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5 ${
            scrolled
              ? "glass border-line shadow-[0_12px_40px_-16px_rgba(15,23,42,0.35)] dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)]"
              : "border-line bg-surface/90 backdrop-blur"
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-subtle lg:hidden"
          >
            <IconMenu />
          </button>

          <Link href="/" className="flex flex-none items-center gap-2.5" aria-label="Lyra Enterprises home">
            <span className="relative h-9 w-9 flex-none">
              <Image src="/images/logo.png" alt="" fill sizes="36px" quality={60} className="object-contain" priority />
            </span>
            <span className="hidden font-display text-[17px] font-semibold tracking-tight text-ink sm:block">
              Lyra<span className="text-muted"> Enterprises</span>
            </span>
          </Link>

          {/* Centre navigation */}
          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-0.5 text-[14px] font-medium">
              <li {...hover("shop")}>
                <MenuTrigger open={menu === "shop"} active={isActive(["/products"])} onClick={() => setMenu(menu === "shop" ? null : "shop")}>
                  Shop
                </MenuTrigger>
              </li>
              <li {...hover("solutions")}>
                <MenuTrigger open={menu === "solutions"} active={isActive(["/solutions"])} onClick={() => setMenu(menu === "solutions" ? null : "solutions")}>
                  Solutions
                </MenuTrigger>
              </li>
              <li {...hover("resources")}>
                <MenuTrigger
                  open={menu === "resources"}
                  active={isActive(["/blog", "/sanitary-napkin-vending-machine-price-india", "/compare-sanitary-napkin-vending-machines", "/government-schemes-menstrual-hygiene", "/service-areas"])}
                  onClick={() => setMenu(menu === "resources" ? null : "resources")}
                >
                  Resources
                </MenuTrigger>
              </li>
              <NavLink href="/about" active={pathname === "/about"}>
                About
              </NavLink>
              <NavLink href="/contact" active={pathname === "/contact"}>
                Contact
              </NavLink>
            </ul>
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="group inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-sm text-muted transition-colors hover:bg-subtle hover:text-ink xl:border xl:border-line xl:pl-3.5 xl:pr-2"
            >
              <IconSearch className="h-[18px] w-[18px]" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-semibold text-muted xl:inline">Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <CartButton />
          </div>

          {/* Mega menus */}
          <AnimatePresence>
            {menu && (
              <motion.div
                key={menu}
                {...hover(menu)}
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.12 } }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-[calc(100%+10px)] z-50 mx-auto hidden w-[min(64rem,calc(100vw-2rem))] lg:block"
              >
                <div className="overflow-hidden rounded-[24px] border border-line bg-elevated shadow-[0_30px_80px_-24px_rgba(15,23,42,0.35)] dark:shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)]">
                  {menu === "shop" && <ShopMenu />}
                  {menu === "solutions" && <SolutionsMenu />}
                  {menu === "resources" && <ResourcesMenu />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onSearch={() => setSearchOpen(true)} />
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative inline-flex h-10 items-center rounded-full px-4 transition-colors hover:bg-subtle hover:text-ink ${active ? "text-ink" : "text-body"}`}
      >
        {children}
        {active && <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-600" />}
      </Link>
    </li>
  );
}

function MenuTrigger({ open, active, onClick, children }: { open: boolean; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={`relative inline-flex h-10 items-center gap-1 rounded-full px-4 transition-colors hover:bg-subtle hover:text-ink ${
        open ? "bg-subtle text-ink" : active ? "text-ink" : "text-body"
      }`}
    >
      {children}
      <IconChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      {active && !open && <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-600" />}
    </button>
  );
}

function CartButton() {
  const { items } = useCart();
  const { bySlug } = useCatalog();
  // Napkin packs count as one line, not 100 items.
  const units = Object.entries(items).reduce((n, [slug, q]) => n + (bySlug.get(slug)?.category === "napkin" ? 1 : q), 0);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={units > 0 ? `Open cart, ${units} item${units === 1 ? "" : "s"}` : "Open cart"}
      className="relative ml-1 inline-flex h-11 items-center gap-2 rounded-full bg-ink pl-3.5 pr-4 text-sm font-semibold text-canvas transition-transform hover:scale-[1.03] active:scale-[0.98]"
    >
      <IconBag className="h-[18px] w-[18px]" />
      <span className="hidden sm:inline">Cart</span>
      <AnimatePresence mode="popLayout">
        {units > 0 && (
          <motion.span
            key={units}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 22 }}
            className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1.5 text-[11px] font-bold text-white"
          >
            {units > 99 ? "99+" : units}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function ShopMenu() {
  const { catalog } = useCatalog();
  const machines = catalog.filter((p) => p.category === "vending-machine");
  const incinerators = catalog.filter((p) => p.category === "incinerator");
  const napkins = catalog.filter((p) => p.category === "napkin");
  return (
    <div className="grid grid-cols-[1.35fr_1fr_17rem]">
      <div className="p-6">
        <MenuHeading href="/products/sanitary-napkin-vending-machines">Vending machines</MenuHeading>
        <ul className="mt-3 grid grid-cols-2 gap-1">
          {machines.map((p) => (
            <MenuProduct key={p.slug} slug={p.slug} name={p.name} image={p.image} meta={inr(p.price)} />
          ))}
        </ul>
      </div>
      <div className="border-l border-line p-6">
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
        <Link href="/products" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
          Shop all products <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <Link href="/products/vending-incinerator-bundle" className="theme-light group relative m-3 flex flex-col justify-between overflow-hidden rounded-[18px] bg-night p-6 text-white">
        <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary-600/40 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-400">Complete washroom kit</p>
          <p className="mt-3 font-display text-xl font-semibold leading-snug text-white">Vending machine + incinerator bundle</p>
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
        <span className="relative h-11 w-11 flex-none overflow-hidden rounded-lg bg-subtle transition-colors group-hover:bg-surface">
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
    <div className="grid grid-cols-[1fr_18rem]">
      <ul className="grid grid-cols-2 gap-1 p-4">
        {solutions.map(({ label, href, note, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-subtle">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-canvas text-brand transition-colors group-hover:border-primary-200">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-[15px] font-semibold text-ink">{label}</span>
                <span className="mt-0.5 block text-sm text-muted">{note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-l border-line bg-subtle p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Not sure where to start?</p>
        <p className="mt-2 font-display text-lg font-semibold text-ink">See every sector side by side</p>
        <p className="mt-1.5 text-sm text-muted">Recommended machines, capacity and disposal for each kind of institution.</p>
        <Link href="/solutions" className="btn btn-secondary mt-4 w-full">
          All solutions
        </Link>
      </div>
    </div>
  );
}

function ResourcesMenu() {
  return (
    <div className="grid grid-cols-[1fr_18rem]">
      <ul className="grid grid-cols-2 gap-1 p-4">
        {resources.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="group flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 transition-colors hover:bg-subtle">
              <span>
                <span className="block text-[15px] font-semibold text-ink">{r.label}</span>
                <span className="block text-sm text-muted">{r.note}</span>
              </span>
              <IconArrowRight className="h-4 w-4 flex-none text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
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

function MobileMenu({ open, onClose, onSearch }: { open: boolean; onClose: () => void; onSearch: () => void }) {
  const { catalog } = useCatalog();
  const [section, setSection] = useState<string | null>("machines");
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
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSearch();
                }}
                className="mb-4 flex h-12 w-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 text-left text-[15px] text-muted"
              >
                <IconSearch className="h-[18px] w-[18px]" /> Search products…
              </button>

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
              <a href={`tel:${PHONE}`} className="btn btn-secondary" aria-label={`Call ${PHONE_DISPLAY}`}>
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
