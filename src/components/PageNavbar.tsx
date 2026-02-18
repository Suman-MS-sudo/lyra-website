import Link from "next/link";
import Image from "next/image";
import WomensDayBanner from "@/components/WomensDayBanner";

export default function PageNavbar() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <WomensDayBanner />
        <header className="bg-white/80 backdrop-blur-md border-b border-primary-100/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image src="/images/logo.png" alt="Lyra Enterprise" fill className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base leading-none">Lyra Enterprise</p>
                <p className="text-[9px] text-primary-500 font-semibold tracking-widest uppercase mt-0.5">#1 in India</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              <Link href="/products/sanitary-napkin-vending-machines" className="hover:text-primary-600 transition-colors">Vending Machines</Link>
              <Link href="/products/sanitary-napkin-incinerators" className="hover:text-primary-600 transition-colors">Incinerators</Link>
              <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
              <Link href="/#contact" className="px-5 py-2 bg-gradient-to-r from-primary-600 to-pink-500 text-white rounded-full shadow hover:-translate-y-0.5 transition-all duration-200">
                Get Quote
              </Link>
            </nav>

            <Link href="/#contact" className="md:hidden px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-500 text-white text-sm font-semibold rounded-full">
              Get Quote
            </Link>
          </div>
        </header>
      </div>
      {/* Spacer — banner (~40px) + navbar (64px) */}
      <div className="h-[104px]" />
    </>
  );
}
