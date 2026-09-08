import Link from "next/link";

const schemes = [
  "Samagra Shiksha",
  "Swachh Bharat Mission",
  "National Health Mission",
  "State schemes",
  "Corporate CSR",
  "MPLADS",
];

export default function FundingBanner() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="lyra-container">
        <div className="relative overflow-hidden rounded-3xl border border-primary-200 bg-primary-50 px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-60 blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="lyra-eyebrow mb-4">Procurement Guide</div>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                You probably don&apos;t need to pay for this out of your own budget
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Most sanitary napkin vending machines and incinerators in India are
                funded by a government scheme, a Finance Commission grant or corporate
                CSR. We&apos;ve mapped every route — and how to route your request
                through each.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {schemes.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-primary-200 bg-white px-3 py-1 text-xs font-medium text-primary-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:text-right">
              <Link
                href="/government-schemes-menstrual-hygiene"
                className="btn btn-primary w-full justify-center sm:w-auto"
              >
                See Government Schemes &amp; Subsidies
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <p className="mt-3 text-xs text-slate-500">
                Free quotation, specs &amp; compliance docs for your proposal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
