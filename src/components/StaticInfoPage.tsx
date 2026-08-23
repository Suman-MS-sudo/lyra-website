import type { ReactNode } from "react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

type StaticInfoPageProps = {
  title: string;
  description: string;
  crumbs: Array<{ label: string; href?: string }>;
  children: ReactNode;
};

export default function StaticInfoPage({
  title,
  description,
  crumbs,
  children,
}: StaticInfoPageProps) {
  return (
    <>
      <PageNavbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-8 pb-6">
          <Breadcrumb crumbs={crumbs} />
          <div className="mt-6 rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-500">Business Information</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">{description}</p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
              {children}
            </div>

            <div className="mt-10 rounded-2xl bg-gray-50 p-5 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Need help with an order?</p>
              <p className="mt-2">
                Contact Lyra Enterprises at <Link href="tel:+918122378860" className="font-semibold text-primary-600 hover:underline">+91-81223 78860</Link> or <ObfuscatedEmail className="font-semibold text-primary-600 hover:underline" />.
              </p>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}