import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

export default function PageFooter() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9">
                <Image src="/images/logo.png" alt="Lyra Enterprises" fill sizes="36px" quality={45} className="object-contain" />
              </div>
              <span className="font-bold text-white text-lg">Lyra Enterprises</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              India&apos;s #1 manufacturer of sanitary napkin vending machines and incinerators. Chennai, Tamil Nadu.
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4 tracking-wide">Vending Machines</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["Push Button", "/products/push-button-vending-machine"],
                ["Solo Coin", "/products/solo-coin-vending-machine"],
                ["Solo WiFi", "/products/solo-wifi-vending-machine"],
                ["Solo Ethernet", "/products/solo-ethernet-vending-machine"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-primary-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4 tracking-wide">Incinerators</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["Lyra Micro", "/products/lyra-micro-incinerator"],
                ["Lyra Mini", "/products/lyra-mini-incinerator"],
                ["Lyra Maxi", "/products/lyra-maxi-incinerator"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-primary-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4 tracking-wide">Service Areas</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["All States & UTs", "/service-areas"],
                ["Tamil Nadu", "/vending-machine-tamil-nadu"],
                ["Karnataka", "/vending-machine-karnataka"],
                ["Maharashtra", "/vending-machine-maharashtra"],
                ["Delhi NCR", "/vending-machine-delhi"],
                ["Uttar Pradesh", "/vending-machine-uttar-pradesh"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-primary-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4 tracking-wide">Policies</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["Contact Us", "/contact"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms-and-conditions"],
                ["Refund Policy", "/cancellation-refund-policy"],
                ["Shipping Policy", "/shipping-delivery-policy"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-primary-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>© 2026 Lyra Enterprises. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="tel:+918122378860" className="hover:text-primary-300 transition-colors">+91-81223 78860</Link>
            <ObfuscatedEmail className="hover:text-primary-300 transition-colors" />
            <a href={SITE.social.indiamart} target="_blank" rel="noopener noreferrer" className="hover:text-primary-300 transition-colors">IndiaMART</a>
            <a href={SITE.social.justdial} target="_blank" rel="noopener noreferrer" className="hover:text-primary-300 transition-colors">Justdial</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
