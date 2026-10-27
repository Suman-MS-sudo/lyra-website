import type { ReactNode } from "react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/page/PageHero";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { SITE } from "@/lib/data";
import { IconArrowRight, IconMail, IconPhone, IconWhatsApp } from "@/components/store/icons";

type StaticInfoPageProps = {
  title: string;
  description: string;
  crumbs: Array<{ label: string; href?: string }>;
  children: ReactNode;
  /** Optional full-width content shown between the header and the text (e.g. the contact form). */
  before?: ReactNode;
};

const INFO_LINKS: [string, string][] = [
  ["About us", "/about"],
  ["Contact", "/contact"],
  ["Shipping & delivery", "/shipping-delivery-policy"],
  ["Return policy", "/return-policy"],
  ["Cancellation & refund", "/cancellation-refund-policy"],
  ["Terms & conditions", "/terms-and-conditions"],
  ["Privacy policy", "/privacy-policy"],
];

/** Layout for company / policy pages: hero header, readable prose column, sticky help panel. */
export default function StaticInfoPage({ title, description, crumbs, children, before }: StaticInfoPageProps) {
  const current = crumbs[crumbs.length - 1]?.label;
  return (
    <>
      <PageNavbar />
      <main className="bg-canvas">
        <PageHero crumbs={crumbs} eyebrow="Lyra Enterprises" title={title} lead={<p>{description}</p>} />
        {before}

        <div className="lyra-container grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-20">
          <div className="lyra-prose max-w-3xl">{children}</div>

          <aside className="lg:block" aria-label="Help and related pages">
            <div className="space-y-4 lg:sticky lg:top-36">
              <div className="rounded-[22px] border border-line bg-subtle p-6">
                <p className="font-display text-base font-semibold text-ink">Need help with an order?</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">Talk to our team, Monday to Saturday, 9:30 AM to 6:30 PM IST.</p>
                <div className="mt-5 grid gap-2">
                  <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="btn btn-primary h-11 text-sm">
                    <IconPhone className="h-4 w-4" /> {SITE.phoneDisplay}
                  </a>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary h-11 text-sm">
                    <IconWhatsApp className="h-4 w-4" /> WhatsApp
                  </a>
                  <span className="btn btn-ghost h-11 text-sm">
                    <IconMail className="h-4 w-4" />
                    <ObfuscatedEmail className="hover:underline" />
                  </span>
                </div>
              </div>
              <nav aria-label="Company information" className="rounded-[22px] border border-line bg-surface p-3">
                {INFO_LINKS.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    aria-current={label.toLowerCase() === current?.toLowerCase() ? "page" : undefined}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-body transition-colors hover:bg-subtle hover:text-ink aria-[current=page]:bg-subtle aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                  >
                    {label}
                    <IconArrowRight className="h-3.5 w-3.5 text-muted" />
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </main>
      <PageFooter />
    </>
  );
}
