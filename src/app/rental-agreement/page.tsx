import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import AgreementDocument from "@/components/rental/AgreementDocument";
import { SITE } from "@/lib/data";
import { AGREEMENT_DATE, AGREEMENT_PATH, AGREEMENT_TITLE, AGREEMENT_VERSION, agreementSections } from "@/lib/rental-agreement";
import { RENTAL_PATH } from "@/lib/rental";
import { IconDownload } from "@/components/store/icons";

const URL = `${SITE.url}${AGREEMENT_PATH}`;
const TITLE = `Sanitary Napkin Vending Machine ${AGREEMENT_TITLE}`;

export const metadata: Metadata = {
  title: `${AGREEMENT_TITLE} (${AGREEMENT_VERSION})`,
  description:
    "Lyra Enterprises' Equipment Rental Agreement for sanitary napkin vending machines: term, rent, deposit, service, damage, termination and dispute resolution.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function RentalAgreementPage() {
  const sections = agreementSections();
  return (
    <>
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Rental plans", href: RENTAL_PATH }, { label: "Rental agreement" }]}
          eyebrow={`${AGREEMENT_VERSION} · ${AGREEMENT_DATE}`}
          title={TITLE}
          lead={
            <p>
              These are the terms every rental customer accepts at checkout. After payment, your executed copy, completed with your booking details in Schedule A, is
              emailed to you as a PDF.
            </p>
          }
          actions={
            <>
              <a href="/api/rental/agreement" target="_blank" rel="noopener" className="btn btn-primary h-12 px-6">
                <IconDownload className="h-4 w-4" /> Download specimen PDF
              </a>
              <Link href={`${RENTAL_PATH}#enquire`} className="btn h-12 border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">
                Book a rental
              </Link>
            </>
          }
        />

        <section className="py-14 sm:py-20">
          <div className="lyra-container grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
            <nav aria-label="Clauses" className="hidden lg:block">
              <ol className="sticky top-28 space-y-1 text-[13px]">
                {sections.map((s) => (
                  <li key={s.n}>
                    <a href={`#clause-${s.n}`} className="block rounded-lg px-2 py-1 text-muted hover:bg-subtle hover:text-ink">
                      {s.n}. {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#schedule-a" className="block rounded-lg px-2 py-1 text-muted hover:bg-subtle hover:text-ink">
                    Schedule A
                  </a>
                </li>
                <li>
                  <a href="#schedule-b" className="block rounded-lg px-2 py-1 text-muted hover:bg-subtle hover:text-ink">
                    Schedule B
                  </a>
                </li>
              </ol>
            </nav>
            <article className="max-w-3xl rounded-[24px] border border-line bg-surface p-6 sm:p-10">
              <AgreementDocument />
            </article>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
