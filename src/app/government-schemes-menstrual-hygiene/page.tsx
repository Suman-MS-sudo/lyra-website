import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/lib/data";

const PAGE_URL = `${SITE.url}/government-schemes-menstrual-hygiene`;

export const metadata: Metadata = {
  title: { absolute: "Government Schemes & Subsidies for Menstrual Hygiene Infrastructure" },
  description:
    "How schools, health departments, urban local bodies and CSR teams in India fund sanitary napkin vending machines and incinerators — Samagra Shiksha, National Health Mission, Swachh Bharat Mission, state schemes, CSR, MPLADS and Finance Commission grants.",
  keywords: [
    "government scheme sanitary napkin vending machine",
    "subsidy for napkin incinerator india",
    "samagra shiksha sanitary pad vending machine",
    "swachh bharat menstrual hygiene fund",
    "menstrual hygiene scheme india",
    "she pad kerala scheme",
    "shuchi scheme karnataka",
    "asmita yojana maharashtra",
    "CSR menstrual hygiene project india",
    "MPLADS sanitary napkin machine",
    "funding for napkin vending machine schools india",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Government Schemes & Subsidies for Menstrual-Hygiene Infrastructure | Lyra Enterprises",
    description:
      "A procurement guide to the central and state schemes, CSR routes and local-area funds that pay for sanitary napkin vending machines and incinerators in India.",
    url: PAGE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Schemes & Subsidies for Menstrual-Hygiene Infrastructure | Lyra Enterprises",
    description:
      "Central and state schemes, CSR routes and local-area funds that pay for sanitary napkin vending machines and incinerators in India.",
  },
};

/* ─────────────────────────── content ─────────────────────────── */

const centralSchemes = [
  {
    name: "Samagra Shiksha",
    dept: "Ministry of Education (Dept. of School Education & Literacy)",
    covers:
      "The integrated school-education programme. Under the annual project approvals and the Composite School Grant, many states are permitted to install sanitary pad vending machines and incinerators in government and government-aided school washrooms as part of girls' hygiene and self-defence components.",
    forWhom: "Government & government-aided schools",
    route:
      "State Project Office / SPD → District Education Office. Request inclusion in the year's Annual Work Plan & Budget (AWP&B).",
  },
  {
    name: "National Health Mission — Menstrual Hygiene Scheme (MHS) & RKSK",
    dept: "Ministry of Health & Family Welfare",
    covers:
      "The Menstrual Hygiene Scheme and the Rashtriya Kishor Swasthya Karyakram (RKSK) promote menstrual hygiene among adolescent girls (10–19), largely in rural areas. State NHM Programme Implementation Plans (PIPs) can budget for hygiene infrastructure alongside napkin supply.",
    forWhom: "Adolescent girls via schools, anganwadis, health sub-centres",
    route:
      "State NHM / RKSK nodal officer → District Programme Manager. Get the item into the state PIP.",
  },
  {
    name: "Swachh Bharat Mission (Gramin Phase II & Urban 2.0)",
    dept: "Dept. of Drinking Water & Sanitation / Ministry of Housing & Urban Affairs",
    covers:
      "Menstrual Hygiene Management is a named component of SBM. Solid & Liquid Waste Management (SLWM) funds and 15th Finance Commission tied grants routed through Panchayats and Urban Local Bodies can pay for incinerators and dispensers in schools, anganwadis, community and public toilets.",
    forWhom: "Panchayats, urban local bodies, community & public toilet complexes, schools",
    route:
      "Gram Panchayat / Municipal Commissioner → District SBM cell. Include in the village or ward SLWM plan.",
  },
  {
    name: "Scheme for Adolescent Girls (erstwhile SABLA)",
    dept: "Ministry of Women & Child Development",
    covers:
      "Nutrition and life-skills programme for out-of-school adolescent girls (11–14), delivered through anganwadi centres. Menstrual hygiene awareness and, in some states, supporting infrastructure are covered.",
    forWhom: "Anganwadi centres, adolescent-girl groups",
    route: "District Programme Officer, ICDS → CDPO.",
  },
];

const stateSchemes = [
  {
    state: "Kerala",
    scheme: "She-Pad",
    note: "Free sanitary napkins plus incinerators / disposal units installed in government and aided schools for girls in classes 6–12. Implemented with Kudumbashree and local self-governments.",
  },
  {
    state: "Karnataka",
    scheme: "Shuchi",
    note: "Free sanitary napkins for adolescent girls in government and aided schools; incinerators and dispensers installed in many schools and PU colleges.",
  },
  {
    state: "Tamil Nadu",
    scheme: "Free Supply of Sanitary Napkins Scheme",
    note: "Long-running free napkin scheme for girls in government schools and colleges; the state has also equipped many government colleges and hostels with vending machines and incinerators.",
  },
  {
    state: "Maharashtra",
    scheme: "Asmita Yojana",
    note: "Subsidised sanitary napkins to Zilla Parishad school girls and rural women through self-help groups; district and ZP funds used for washroom hygiene infrastructure.",
  },
  {
    state: "Rajasthan",
    scheme: "Udaan",
    note: "Free sanitary napkin distribution across the state; associated disposal infrastructure funded through health and education budgets.",
  },
  {
    state: "Odisha",
    scheme: "Khushi",
    note: "Free sanitary napkins to girls in government and aided schools (classes 6–12); incinerators provided in many schools.",
  },
  {
    state: "Punjab",
    scheme: "Free Sanitary Napkin Scheme",
    note: "Free napkins for girls and women below the poverty line; school and health-department funds used for dispensers and disposal.",
  },
  {
    state: "Chhattisgarh",
    scheme: "Suchita",
    note: "Subsidised sanitary napkins via SHGs; incinerators and vending machines in schools and anganwadis under SBM and education funds.",
  },
];

const otherRoutes = [
  {
    name: "Corporate CSR",
    body: "Under Section 135 and Schedule VII of the Companies Act 2013, menstrual-hygiene projects qualify under promoting healthcare & sanitation, education, and gender equality & women empowerment. Companies routinely fund machine installations in government schools, ITIs and community facilities near their operations.",
    tag: "Private companies & PSUs",
  },
  {
    name: "MPLADS / MLA-LAD funds",
    body: "Members of Parliament and MLAs can sanction local-area development funds for community assets, including sanitary napkin vending machines and incinerators in schools, colleges and public buildings in their constituency.",
    tag: "Constituency development",
  },
  {
    name: "15th Finance Commission grants",
    body: "Tied grants to rural local bodies (drinking water & sanitation) and urban local bodies (solid waste management) can be used for menstrual-waste management infrastructure in panchayat and municipal buildings, schools and public toilets.",
    tag: "Panchayats & municipalities",
  },
  {
    name: "District Mineral Foundation (DMF / PMKKKY)",
    body: "In mining-affected districts, DMF funds prioritise health, sanitation and women & child welfare — a common route for equipping schools and health centres in those districts.",
    tag: "Mining districts",
  },
  {
    name: "NABARD & rural livelihood funds",
    body: "Rural infrastructure and livelihood programmes can support SHG-run napkin units and the disposal infrastructure that goes with them.",
    tag: "Rural / SHG",
  },
];

const faqs = [
  {
    q: "Can a government school buy a napkin vending machine without floating a tender?",
    a: "Yes. Lyra Enterprises is a registered vendor on the Government e-Marketplace (GeM). Government schools, colleges, hospitals and departments can place a direct purchase order on GeM within the prescribed limits, or use GeM bid / reverse auction for larger quantities — no separate tender process is needed.",
  },
  {
    q: "Which scheme is easiest for a single school to use?",
    a: "For a government or aided school, the fastest routes are the Composite School Grant under Samagra Shiksha and CSR sponsorship. Both avoid a long approval chain. For a cluster of schools in one block, the SBM / SLWM plan through the Panchayat or ULB is usually the right vehicle.",
  },
  {
    q: "Do these schemes pay for incinerators as well as vending machines?",
    a: "Yes. Menstrual-waste disposal is treated as part of the same infrastructure. Swachh Bharat SLWM funds, Samagra Shiksha and most state schemes explicitly cover incinerators alongside dispensers, because Solid Waste Management Rules 2016 require safe disposal of sanitary waste.",
  },
  {
    q: "What documents does a CSR-funded installation need?",
    a: "Typically a GST tax invoice, the manufacturer's specification sheet, warranty terms, an installation completion report and photographs. Lyra provides all of these, plus our Udyam / MSME registration and HSN codes for the company's CSR audit and impact report.",
  },
  {
    q: "Are scheme details the same every year?",
    a: "No. Scheme names, coverage, per-unit ceilings and eligibility change with each year's guidelines and vary by state. Always confirm the current-year provisions with the relevant department before finalising a proposal.",
  },
  {
    q: "Can Lyra help prepare the procurement proposal?",
    a: "Yes. We provide formal quotations, technical specifications, compliance certificates (CPCB, ISO, SWM Rules 2016) and GeM catalogue links that can be attached directly to a DPR, AWP&B request or CSR proposal. Call +91-81223 78860 or email sales@lyraenterprise.co.in.",
  },
];

/* ─────────────────────────── schema ─────────────────────────── */

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Government Schemes & Subsidies for Menstrual-Hygiene Infrastructure in India",
  url: PAGE_URL,
  description:
    "A procurement guide to the central schemes, state schemes, CSR routes and local-area funds that finance sanitary napkin vending machines and incinerators for schools, health facilities and public institutions in India.",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Government Schemes & Subsidies", item: PAGE_URL },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ─────────────────────────── page ─────────────────────────── */

export default function GovernmentSchemesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageNavbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-[#f6f8fc] py-14 sm:py-20">
          <div className="lyra-container max-w-5xl">
            <Breadcrumb
              crumbs={[
                { label: "Home", href: "/" },
                { label: "Government Schemes & Subsidies" },
              ]}
            />
            <div className="lyra-eyebrow mt-6 mb-5">Procurement Guide</div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Government Schemes &amp; Subsidies that Fund{" "}
              <span className="text-gradient">Menstrual-Hygiene Infrastructure</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Most sanitary napkin vending machines and incinerators in India are
              paid for through a government scheme, a Finance Commission grant or
              corporate CSR — not a school&apos;s own budget. This guide maps the
              central schemes, state schemes and local-area funds that cover this
              equipment, and how to route a request through each.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/#contact" className="btn btn-primary">
                Get a Quotation for Your Proposal
              </Link>
              <Link href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Ask on WhatsApp
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              {["GeM Registered Vendor", "GST Tax Invoice", "CPCB & SWM Rules 2016", "ISO 9001:2015", "Udyam / MSME"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Central schemes */}
        <section className="section-padding">
          <div className="lyra-container max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Central Government schemes
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Nationwide programmes that either fund the equipment directly or
              allow states to budget for it in their annual plans.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {centralSchemes.map((s) => (
                <div key={s.name} className="lyra-card p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-600">
                    {s.dept}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.covers}</p>
                  <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                    <div className="flex gap-2">
                      <dt className="w-24 flex-shrink-0 font-semibold text-slate-500">For</dt>
                      <dd className="text-slate-700">{s.forWhom}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 flex-shrink-0 font-semibold text-slate-500">How to apply</dt>
                      <dd className="text-slate-700">{s.route}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State schemes */}
        <section className="section-padding bg-[#f6f8fc]">
          <div className="lyra-container max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              State schemes
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Most states run their own menstrual-hygiene scheme. These usually
              supply napkins and fund the dispensers and incinerators that go with
              them in government schools and health facilities.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                    <th className="py-3 pr-4 font-semibold">State</th>
                    <th className="py-3 pr-4 font-semibold">Scheme</th>
                    <th className="py-3 font-semibold">What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {stateSchemes.map((s) => (
                    <tr key={s.state} className="border-b border-slate-200 align-top">
                      <td className="py-4 pr-4 font-semibold text-slate-900">{s.state}</td>
                      <td className="py-4 pr-4 text-slate-700">{s.scheme}</td>
                      <td className="py-4 text-slate-600">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Other states — Andhra Pradesh, Telangana, Gujarat, Madhya Pradesh,
              Himachal Pradesh, Bihar, West Bengal and the UTs — run comparable
              schemes under their health or education departments. Ask us for the
              current scheme name in your state.
            </p>
          </div>
        </section>

        {/* Other routes */}
        <section className="section-padding">
          <div className="lyra-container max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Other funding routes
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              When a scheme budget is not available, these are the routes
              institutions most often use.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {otherRoutes.map((r) => (
                <div key={r.name} className="lyra-card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{r.name}</h3>
                    <span className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                      {r.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Lyra helps */}
        <section className="section-padding bg-slate-900 text-white">
          <div className="lyra-container max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How Lyra supports your procurement
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                ["Registered on GeM", "Direct purchase orders and GeM bids — no separate tender needed for eligible quantities."],
                ["Documents for your proposal", "Formal quotation, technical specifications, CPCB / ISO / SWM Rules 2016 certificates and HSN codes to attach to a DPR, AWP&B request or CSR proposal."],
                ["GST tax invoice & MSME", "Compliant invoicing with our Udyam / MSME registration for scheme reimbursement and CSR audits."],
                ["Multi-site & phased supply", "Consolidated pricing and phased delivery for state education departments, hospital groups and municipal rollouts."],
              ].map(([t, d]) => (
                <div key={t}>
                  <h3 className="text-base font-semibold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/#contact" className="btn btn-primary">
                Request Documents &amp; Quotation
              </Link>
              <Link href="/service-areas" className="btn px-7 py-3.5 border border-white/20 bg-white/10 text-white hover:bg-white/15">
                See Coverage in Your State
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="lyra-container max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    {f.q}
                    <span className="text-primary-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>

            <p className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs leading-relaxed text-slate-500">
              This guide is provided for general information for institutional
              buyers. Scheme names, eligibility, per-unit ceilings and coverage
              change with each year&apos;s guidelines and vary by state. Confirm
              the current-year provisions with the relevant government department
              before finalising a proposal. Lyra Enterprises is a manufacturer and
              supplier, not a government agency, and does not administer these
              schemes.
            </p>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}
