import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import CheckoutForm from "@/components/store/CheckoutForm";
import { SITE, cities } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Checkout | Lyra Enterprises" },
  description: "Secure checkout for Lyra vending machines, incinerators and napkins. Pay online with UPI, cards, net banking or wallets via Razorpay.",
  alternates: { canonical: `${SITE.url}/checkout` },
  robots: { index: false, follow: true },
};

export default function CheckoutPage({ searchParams }: { searchParams: { add?: string } }) {
  const states = Array.from(new Set(cities.map((c) => c.state))).sort();
  const add = typeof searchParams.add === "string" ? searchParams.add : undefined;
  return (
    <>
      <PageNavbar />
      <main className="min-h-[70vh] bg-subtle">
        <div className="lyra-container pb-20 pt-8 sm:pt-10">
          <CheckoutForm states={states} initialSlug={add} />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
