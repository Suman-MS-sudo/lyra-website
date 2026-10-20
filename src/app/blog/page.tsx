import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Blocks";
import { IconArrowRight } from "@/components/store/icons";
import { blogPosts, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Blog — Menstrual Hygiene & Vending Machines | Lyra Enterprises" },
  description:
    "Expert articles on menstrual hygiene management, vending machine buying guides and incinerator comparisons. By Lyra Enterprises — India's #1 manufacturer.",
  keywords: [
    "menstrual hygiene india blog",
    "vending machine buying guide india",
    "napkin incinerator guide india",
    "sanitary napkin machine schools",
  ],
  alternates: {
    canonical: `${SITE.url}/blog`,
    types: { "application/rss+xml": `${SITE.url}/blog/rss.xml` },
  },
  openGraph: {
    title: "Blog — Menstrual Hygiene, Vending Machines & Incinerators India | Lyra Enterprises",
    description:
      "Expert articles on menstrual hygiene management, vending machine buying guides and incinerator comparisons. By Lyra Enterprises — India's #1 manufacturer.",
    url: `${SITE.url}/blog`,
    images: [{ url: `${SITE.url}/images/og-image.jpg`, width: 1200, height: 630, alt: "Lyra Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Menstrual Hygiene, Vending Machines & Incinerators India | Lyra Enterprises",
    description:
      "Expert articles on menstrual hygiene management, vending machine buying guides and incinerator comparisons. By Lyra Enterprises — India's #1 manufacturer.",
    images: [`${SITE.url}/images/og-image.jpg`],
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE.url}/blog#blog`,
  name: "Lyra Enterprises Blog",
  description:
    "Guides on menstrual hygiene management, sanitary napkin vending machines and incinerators for institutions in India.",
  url: `${SITE.url}/blog`,
  publisher: { "@id": `${SITE.url}/#organization` },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE.url}/blog/${post.slug}`,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
  ],
};

/** A product photo to illustrate each article category (the posts have no imagery of their own). */
const CATEGORY_IMAGE: Record<string, string> = {
  Education: "/images/products/push-button-vm.png",
  "Buying Guide": "/images/products/solo-wifi.png",
  "Hygiene Guide": "/images/products/lyra-mini.png",
  Compliance: "/images/products/lyra-maxi.png",
  "Case Study": "/images/products/solo-ethernet.png",
  Technology: "/images/products/solo-rfid.png",
};
const imageFor = (c: string) => CATEGORY_IMAGE[c] ?? "/images/products/solo-qr.png";
const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          eyebrow="Journal"
          title={<>Hygiene &amp; Product <span className="text-gradient">Guide</span></>}
          lead={<p>Expert insights on menstrual hygiene management, vending machine comparisons and incinerator selection for schools, hospitals and offices across India.</p>}
        >
          <ul className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink">{c}</li>
            ))}
          </ul>
        </PageHero>

        <section className="bg-canvas py-14 sm:py-20">
          <div className="lyra-container">
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] border border-line bg-surface transition-shadow duration-300 hover:shadow-lift lg:grid-cols-[1.1fr_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden bg-subtle lg:aspect-auto">
                  <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
                  <div aria-hidden className="absolute inset-[15%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.22),transparent)]" />
                  <Image src={imageFor(featured.category)} alt="" fill priority sizes="(max-width: 1024px) 100vw, 600px" className="product-shot object-contain p-12 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted">
                    <span className="rounded-full bg-primary-600 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-white">Latest</span>
                    <span className="font-semibold uppercase tracking-[0.14em] text-brand">{featured.category}</span>
                    <span>{fmtDate(featured.date)}</span>
                    <span>· {featured.readTime}</span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-ink group-hover:text-brand sm:text-[2.1rem]">{featured.title}</h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-body">{featured.excerpt}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Read article <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift">
                    <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
                      <div aria-hidden className="absolute inset-[20%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.16),transparent)]" />
                      <Image src={imageFor(post.category)} alt="" fill sizes="(max-width: 640px) 100vw, 380px" className="product-shot object-contain p-8 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:scale-[1.05]" />
                      <span className="absolute left-4 top-4 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink backdrop-blur">{post.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[12.5px] text-muted">{fmtDate(post.date)} · {post.readTime}</p>
                      <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-brand">{post.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{post.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        Read article <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand title="Ready to upgrade your facility?" body="Browse our full range of vending machines and incinerators." primary={{ href: "/products", label: "View All Products" }} />
      </main>
      <PageFooter />
    </>
  );
}
