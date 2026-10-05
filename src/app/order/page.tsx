import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import OrderForm, { type OrderProduct } from "@/components/OrderForm";
import { SITE, GST_RATE, products, cities } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Place an Order | Lyra Enterprises" },
  description:
    "Select sanitary napkin vending machines and incinerators, enter your delivery details and place an order request. No payment now: our team confirms availability, freight and payment.",
  alternates: { canonical: `${SITE.url}/order` },
  // A transactional form, not a landing page: keep it out of search results.
  robots: { index: false, follow: true },
};

export default function OrderPage({ searchParams }: { searchParams: { add?: string } }) {
  // Slim catalogue for the client form (the full product data is large).
  const catalogue: OrderProduct[] = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    fullName: p.fullName,
    code: p.code,
    category: p.category,
    price: p.price,
    image: p.image,
  }));
  const states = Array.from(new Set(cities.map((c) => c.state))).sort();
  const add = typeof searchParams.add === "string" ? searchParams.add : undefined;

  return (
    <>
      <PageNavbar />
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
          <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">Your cart and order request</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Review the products in your cart, add any others, tell us where to deliver, and send it across. <strong className="text-gray-900">No payment is taken here.</strong>{" "}
            We&apos;ll call you to confirm availability, freight and payment.
          </p>
          <div className="mt-8">
            <OrderForm products={catalogue} states={states} gstRate={GST_RATE} initialSlug={add} />
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}
