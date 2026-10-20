import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import FeatureGrid from "@/components/page/FeatureGrid";
import ProductPicks from "@/components/page/ProductPicks";
import FaqList from "@/components/page/FaqList";
import { Callout, CtaBand, HeroActions } from "@/components/page/Blocks";
import { getProductBySlug } from "@/lib/data";

type Props = {
  crumb: string;
  tags: string[];
  title: React.ReactNode;
  lead: React.ReactNode;
  callLabel: string;
  points: string[];
  callout?: { title: string; body: string; href: string; label: string };
  featuresTitle: string;
  featuresLead: string;
  features: { icon?: string; heading: string; body: string }[];
  productsTitle: React.ReactNode;
  productsLead: string;
  products: { slug: string; tag?: string; desc?: string }[];
  faqs: { name: string; acceptedAnswer: { text: string } }[];
  ctaTitle: string;
  ctaBody: string;
  extra?: React.ReactNode;
};

/** Shared layout for sector pages (schools, hospitals, offices…). All copy comes from the page file. */
export default function SolutionPage(p: Props) {
  const heroImages = p.products
    .slice(0, 2)
    .map((x) => getProductBySlug(x.slug))
    .filter(Boolean)
    .map((x) => ({ src: x!.image, alt: x!.fullName }));

  return (
    <>
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: p.crumb }]}
          eyebrow="Solutions"
          tags={p.tags}
          title={p.title}
          lead={p.lead}
          actions={<HeroActions callLabel={p.callLabel} />}
          points={p.points}
          images={heroImages}
        />

        {p.callout && (
          <div className="lyra-container pt-12">
            <Callout {...p.callout} />
          </div>
        )}

        <Section kicker="Why Lyra" title={p.featuresTitle} lead={p.featuresLead}>
          <FeatureGrid items={p.features.map((f) => ({ icon: f.icon, title: f.heading, body: f.body }))} />
        </Section>

        <Section tone="subtle" kicker="Recommended" title={p.productsTitle} lead={p.productsLead} action={{ href: "/products", label: "All products" }}>
          <ProductPicks items={p.products} columns={p.products.length === 3 ? 3 : 4} />
        </Section>

        {p.extra}

        <Section kicker="FAQ" title="Frequently Asked Questions" narrow>
          <FaqList items={p.faqs.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))} />
        </Section>

        <CtaBand title={p.ctaTitle} body={p.ctaBody} primary={{ href: "/contact", label: "Get a free quote" }} />
      </main>
      <PageFooter />
    </>
  );
}
