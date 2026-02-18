"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const vendingDropdown = [
  { label: "Push Button", href: "/products/push-button-vending-machine" },
  { label: "Solo Coin", href: "/products/solo-coin-vending-machine" },
  { label: "Solo WiFi (UPI)", href: "/products/solo-wifi-vending-machine" },
  { label: "Solo Ethernet", href: "/products/solo-ethernet-vending-machine" },
];
const incineratorDropdown = [
  { label: "Lyra Micro", href: "/products/lyra-micro-incinerator" },
  { label: "Lyra Mini", href: "/products/lyra-mini-incinerator" },
  { label: "Lyra Maxi", href: "/products/lyra-maxi-incinerator" },
];
const stateDropdown = [
  { label: "Tamil Nadu", href: "/vending-machine-tamil-nadu" },
  { label: "Kerala", href: "/vending-machine-kerala" },
  { label: "Andhra Pradesh", href: "/vending-machine-andhra-pradesh" },
  { label: "Karnataka", href: "/vending-machine-karnataka" },
  { label: "Telangana", href: "/vending-machine-telangana" },
];

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200 group"
      >
        {label}
        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-primary-500 to-pink-soft rounded-full transition-transform duration-300 group-hover:scale-x-100" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700"
      >
        {title}
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pb-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass border-b border-primary-100/50 shadow-glass"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Lyra Enterprise Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-display font-bold text-gray-900 text-lg leading-none">
                Lyra Enterprise
              </p>
              <p className="text-[10px] text-primary-500 font-medium tracking-widest uppercase mt-0.5">
                #1 in India
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/#home" className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200 group">
              Home
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-primary-500 to-pink-soft rounded-full transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Dropdown label="Vending Machines" items={[...vendingDropdown, { label: "→ All Vending Machines", href: "/products/sanitary-napkin-vending-machines" }]} />
            <Dropdown label="Incinerators" items={[...incineratorDropdown, { label: "→ All Incinerators", href: "/products/sanitary-napkin-incinerators" }]} />
            <Dropdown label="States" items={stateDropdown} />
            <Link href="/blog" className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200 group">
              Blog
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-primary-500 to-pink-soft rounded-full transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link href="/#contact" className="relative text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200 group">
              Contact
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-primary-500 to-pink-soft rounded-full transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="tel:+918122378860"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              +91-81223 78860
            </Link>
            <Link
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-purple-gradient rounded-full shadow-purple hover:shadow-purple-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-800 rounded-full block transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-gray-800 rounded-full block"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="w-6 h-0.5 bg-gray-800 rounded-full block transition-all"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-primary-100/30 overflow-hidden"
          >
            <div className="px-5 py-3 flex flex-col">
              <Link href="/#home" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-primary-600 border-b border-gray-100">Home</Link>

              {/* Vending Machines accordion */}
              <MobileSection title="Vending Machines">
                {vendingDropdown.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm text-gray-600 hover:text-primary-600">{item.label}</Link>
                ))}
                <Link href="/products/sanitary-napkin-vending-machines" onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm font-semibold text-primary-600">→ All Vending Machines</Link>
              </MobileSection>

              {/* Incinerators accordion */}
              <MobileSection title="Incinerators">
                {incineratorDropdown.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm text-gray-600 hover:text-primary-600">{item.label}</Link>
                ))}
                <Link href="/products/sanitary-napkin-incinerators" onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm font-semibold text-primary-600">→ All Incinerators</Link>
              </MobileSection>

              {/* States accordion */}
              <MobileSection title="States">
                <div className="grid grid-cols-2 gap-x-2">
                  {stateDropdown.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm text-gray-600 hover:text-primary-600">{item.label}</Link>
                  ))}
                </div>
              </MobileSection>

              <Link href="/blog" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-primary-600 border-b border-gray-100">Blog</Link>
              <Link href="/#contact" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-primary-600 border-b border-gray-100">Contact</Link>

              {/* Quick contact */}
              <div className="pt-3 pb-1 grid grid-cols-3 gap-2">
                <a href="tel:+918122378860" className="flex flex-col items-center gap-1 py-3 rounded-xl bg-primary-50 border border-primary-100 active:bg-primary-100">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wide">Call</span>
                </a>
                <a href={`https://wa.me/918122378860?text=${encodeURIComponent("Hi! I'm interested in Lyra Enterprise's vending machines / incinerators. Please share details.")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 rounded-xl bg-green-50 border border-green-100 active:bg-green-100">
                  <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">WhatsApp</span>
                </a>
                <a href="mailto:sales@lyraenterprise.co.in" className="flex flex-col items-center gap-1 py-3 rounded-xl bg-indigo-50 border border-indigo-100 active:bg-indigo-100">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">Email</span>
                </a>
              </div>
              <Link href="#contact" onClick={() => setMobileOpen(false)} className="mt-2 mb-1 px-5 py-3 text-sm font-semibold text-white bg-purple-gradient rounded-full text-center shadow-purple">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
