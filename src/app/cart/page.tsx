import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import CartView from "@/components/store/CartView";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Your Cart | Lyra Enterprises" },
  description: "Review the vending machines, incinerators and refill napkins in your cart before checkout.",
  alternates: { canonical: `${SITE.url}/cart` },
  // Transactional page: keep it out of search results.
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageNavbar />
      <main className="min-h-[70vh] bg-subtle">
        <div className="lyra-container pb-20 pt-8 sm:pt-10">
          <CartView />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
