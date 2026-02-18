import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { products, getProductBySlug, SITE } from "@/lib/data";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: { canonical: `${SITE.url}/products/${product.slug}` },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `${SITE.url}/products/${product.slug}`,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const categoryLabel =
    product.category === "vending-machine"
      ? "Sanitary Napkin Vending Machines"
      : "Sanitary Napkin Incinerators";
  const categoryHref =
    product.category === "vending-machine"
      ? "/products/sanitary-napkin-vending-machines"
      : "/products/sanitary-napkin-incinerators";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    sku: product.code,
    description: product.longDescription,
    brand: { "@type": "Brand", name: "Lyra Enterprise" },
    manufacturer: { "@type": "Organization", name: "Lyra Enterprise", url: SITE.url },
    category: categoryLabel,
    url: `${SITE.url}/products/${product.slug}`,
    keywords: product.keywords.join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.discountedPrice,
      priceValidUntil: "2027-03-31",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/products/${product.slug}`,
      seller: { "@type": "Organization", name: "Lyra Enterprise", url: SITE.url },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
        { "@type": "ListItem", position: 3, name: categoryLabel, item: `${SITE.url}${categoryHref}` },
        { "@type": "ListItem", position: 4, name: product.fullName, item: `${SITE.url}/products/${product.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Breadcrumb + Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: categoryLabel, href: categoryHref },
            { label: product.name },
          ]} />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-gradient-to-r ${product.accent} text-white`}>
                  {product.badge}
                </span>
                {product.popular && (
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-yellow-100 text-yellow-700">
                    ⭐ Most Popular
                  </span>
                )}
              </div>

              <h1 className="font-bold text-3xl sm:text-4xl text-gray-900 leading-tight mb-2">
                {product.fullName}
              </h1>
              <p className="text-sm text-gray-400 mb-4">Model: {product.code}</p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.tagline}</p>

              {/* Price */}
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-primary-600">₹{product.discountedPrice.toLocaleString("en-IN")}</span>
                <div>
                  <p className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-gray-500 font-medium">+ 18% GST</p>
                </div>
              </div>
              {/* Women's Day callout */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6B1FA8]/10 to-[#E8477A]/10 border border-[#A0268A]/25 mb-6 w-fit">
                <span className="text-base">🌸</span>
                <div>
                  <p className="text-xs font-bold text-[#6B1FA8]">Women&apos;s Day Offer — Save ₹{(product.price - product.discountedPrice).toLocaleString("en-IN")}</p>
                  <p className="text-[10px] text-gray-500">Limited time · Expires March 8, 2026</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href={`https://wa.me/918122378860?text=${encodeURIComponent(`Hi! I'm interested in the ${product.fullName} (${product.code}). Please share details and pricing.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow transition-all hover:-translate-y-0.5"
                >
                  WhatsApp Enquiry
                </Link>
                <Link
                  href="tel:+918122378860"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-500 text-white font-bold rounded-full shadow transition-all hover:-translate-y-0.5"
                >
                  Call to Order
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 text-xs">
                {["✓ 1-Year Warranty", "✓ Pan-India Delivery", "✓ Free Installation Guide", "✓ After-Sales Service"].map((b) => (
                  <span key={b} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 font-medium shadow-sm">{b}</span>
                ))}
              </div>
            </div>

            {/* Right — Features & Specs */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Technical Specifications</h2>
                <div className="space-y-2">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500 font-medium">{s.label}</span>
                      <span className="text-gray-800 font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-12">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="font-bold text-xl text-gray-900 mb-4">About the {product.name}</h2>
            <p className="text-gray-600 leading-relaxed text-base">{product.longDescription}</p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-12">
          <h2 className="font-bold text-xl text-gray-900 mb-5">Best suited for</h2>
          <div className="flex flex-wrap gap-3">
            {product.useCases.map((uc) => (
              <span key={uc} className="px-4 py-2 bg-white border border-primary-100 rounded-full text-sm text-gray-700 font-medium shadow-sm">
                🏛 {uc}
              </span>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
            <h2 className="font-bold text-xl text-gray-900 mb-5">Related Products</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 mb-3 leading-snug">{p.tagline}</p>
                    <p className="text-lg font-bold text-primary-600">₹{p.discountedPrice.toLocaleString("en-IN")}</p>
                    <span className="mt-2 block text-xs text-primary-600 group-hover:underline">View →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cross-sell */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="bg-gradient-to-r from-primary-50 to-pink-50 rounded-2xl border border-primary-100 p-6 sm:p-8">
            <h2 className="font-bold text-gray-900 mb-2">
              {product.category === "vending-machine" ? "Complete the solution with an Incinerator" : "Complete the solution with a Vending Machine"}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {product.category === "vending-machine"
                ? "Pair your vending machine with a Lyra incinerator for end-to-end menstrual hygiene — one machine dispenses, the other safely disposes."
                : "Pair your incinerator with a Lyra vending machine for complete menstrual hygiene management in your facility."}
            </p>
            <Link
              href={product.category === "vending-machine" ? "/products/sanitary-napkin-incinerators" : "/products/sanitary-napkin-vending-machines"}
              className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:underline"
            >
              {product.category === "vending-machine" ? "Browse Incinerators →" : "Browse Vending Machines →"}
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#6B1FA8] via-[#A0268A] to-[#E8477A] py-14 text-white text-center px-5">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 mb-4">
              <span className="text-sm">🌸</span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">Women&apos;s Day 2026 · Save ₹1,000</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to order the {product.name}?</h2>
            <p className="text-white/80 mb-6">Claim your Women&apos;s Day discount — offer ends March 8, 2026.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`https://wa.me/918122378860?text=${encodeURIComponent(`Hi! I want to order the ${product.fullName} (${product.code}) with the Women's Day offer. Please share pricing and delivery details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-[#A0268A] font-bold rounded-full shadow"
              >
                WhatsApp — Claim Offer
              </Link>
              <Link href="tel:+918122378860" className="px-8 py-3 bg-white/20 border border-white/30 text-white font-bold rounded-full">
                Call +91-81223 78860
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
