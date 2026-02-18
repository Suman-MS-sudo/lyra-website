import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { blogPosts, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Menstrual Hygiene, Vending Machines & Incinerators India | Lyra Enterprise",
  description:
    "Expert articles on menstrual hygiene management, vending machine buying guides and incinerator comparisons. By Lyra Enterprise — India's #1 manufacturer.",
  keywords: [
    "menstrual hygiene india blog",
    "vending machine buying guide india",
    "napkin incinerator guide india",
    "sanitary napkin machine schools",
  ],
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <PageNavbar />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-12 pb-10">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <h1 className="mt-6 font-bold text-3xl sm:text-4xl text-gray-900">
            Hygiene & Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">Guide</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Expert insights on menstrual hygiene management, vending machine comparisons and incinerator selection for schools, hospitals and offices across India.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest">{post.category}</span>
                  <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{post.excerpt}</p>
                <span className="text-sm font-semibold text-primary-600 group-hover:underline">Read article →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary-600 to-pink-500 py-14 text-white text-center px-5">
          <h2 className="text-2xl font-bold mb-3">Ready to upgrade your facility?</h2>
          <p className="text-white/80 mb-6">Browse our full range of vending machines and incinerators.</p>
          <Link href="/products" className="px-8 py-3 bg-white text-primary-700 font-bold rounded-full">View All Products</Link>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
