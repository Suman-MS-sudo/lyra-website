import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import RentalRecharge from "@/components/rental/RentalRecharge";
import { SITE } from "@/lib/data";
import { RECHARGE_PATH, RECHARGE_PLANS, RENTAL_GRACE_DAYS, RENTAL_PATH } from "@/lib/rental";

const URL = `${SITE.url}${RECHARGE_PATH}`;

export const metadata: Metadata = {
  title: "Recharge Rental Machine Rent",
  description: "Recharge the monthly rent for your Lyra rental vending machine online: Monthly, Quarterly (save 5%) or Yearly (save 10%).",
  alternates: { canonical: URL },
  // A customer utility page: keep it out of search results.
  robots: { index: false, follow: true },
};

export default function RechargePage() {
  return (
    <>
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Rental plans", href: RENTAL_PATH }, { label: "Recharge" }]}
          eyebrow="Rental customers"
          title={
            <>
              Recharge your <span className="text-gradient">machine rent</span>
            </>
          }
          lead={
            <p>
              Enter your rental code and registered mobile number, choose a plan and pay online.{" "}
              {RECHARGE_PLANS.filter((p) => p.discountPct)
                .map((p) => `${p.label} saves ${p.discountPct}%`)
                .join(", ")}{" "}
              on rent.
            </p>
          }
          points={["Monthly, Quarterly or Yearly", "Instant receipt by email", `${RENTAL_GRACE_DAYS}-day grace after the due date`]}
        />
        <Section>
          <Suspense fallback={<div className="mx-auto h-[360px] max-w-xl rounded-[24px] border border-line bg-surface" />}>
            <RentalRecharge />
          </Suspense>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            Recharges always continue from your current paid-until date. Lost your rental code? It is in your booking email and on your monitoring dashboard,
            or call <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="font-medium text-brand hover:underline">{SITE.phoneDisplay}</a>. New here?{" "}
            <Link href={RENTAL_PATH} className="font-medium text-brand hover:underline">
              See rental plans
            </Link>
            .
          </p>
        </Section>
      </main>
      <PageFooter />
    </>
  );
}
