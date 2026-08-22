import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-5 py-20">
      <div className="max-w-xl w-full text-center">
        <p className="text-primary-500 font-bold text-sm tracking-widest uppercase mb-3">
          404 Error
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          This page has gone missing
        </h1>
        <p className="text-gray-600 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Here are some helpful links to get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-semibold rounded-full shadow hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Homepage
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-primary-300 transition-all duration-200"
          >
            View Products
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-primary-300 transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-left max-w-sm mx-auto">
          <Link href="/products/sanitary-napkin-vending-machines" className="text-gray-500 hover:text-primary-600 transition-colors">Vending Machines</Link>
          <Link href="/products/sanitary-napkin-incinerators" className="text-gray-500 hover:text-primary-600 transition-colors">Incinerators</Link>
          <Link href="/solutions/schools-colleges" className="text-gray-500 hover:text-primary-600 transition-colors">For Schools & Colleges</Link>
          <Link href="/solutions/hospitals" className="text-gray-500 hover:text-primary-600 transition-colors">For Hospitals</Link>
          <Link href="/solutions/offices" className="text-gray-500 hover:text-primary-600 transition-colors">For Offices</Link>
          <Link href="/blog" className="text-gray-500 hover:text-primary-600 transition-colors">Blog</Link>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          Need help? Call{" "}
          <a href={`tel:${SITE.phone}`} className="text-primary-600 hover:underline">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </main>
  );
}
