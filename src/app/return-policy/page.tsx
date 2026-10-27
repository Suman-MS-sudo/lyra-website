import type { Metadata } from "next";
import Link from "next/link";
import StaticInfoPage from "@/components/StaticInfoPage";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { SITE } from "@/lib/data";
import { RETURN_COUNTRIES } from "@/lib/return-countries";

const URL = `${SITE.url}/return-policy`;
const TITLE = "Return Policy";
const DESC =
  "Lyra Enterprises return policy for India: returns accepted for defective or damaged products only, within 10 days of delivery, with free return shipping. No exchanges.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Lyra Enterprises` },
  description: DESC,
  alternates: { canonical: URL },
};

// The same terms as the Product offers (lib/offer-schema.ts) and the Merchant Center return settings.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#webpage`,
      url: URL,
      name: `${TITLE} | Lyra Enterprises`,
      description: DESC,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${SITE.url}/#website` },
      publisher: { "@id": `${SITE.url}/#organization` },
      datePublished: "2026-10-27",
      dateModified: "2026-10-27",
    },
    {
      "@type": "MerchantReturnPolicy",
      "@id": `${URL}#policy`,
      name: "Lyra Enterprises return policy",
      url: URL,
      applicableCountry: RETURN_COUNTRIES.map(([, iso]) => iso),
      returnPolicyCountry: "IN",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 10,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
      itemDefectReturnFees: "https://schema.org/FreeReturn",
      merchantReturnLink: URL,
    },
  ],
};

export default function ReturnPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <StaticInfoPage
        title={TITLE}
        description="How returns work for vending machines, incinerators and napkins bought from Lyra Enterprises."
        crumbs={[{ label: "Home", href: "/" }, { label: TITLE }]}
      >
        <p>
          <strong>Effective date:</strong> October 27, 2026
        </p>

        <h2>Summary</h2>
        <ul>
          <li>
            <strong>Countries:</strong> India and the other countries listed under <a href="#countries">Countries</a> below.
          </li>
          <li>
            <strong>Returns:</strong> accepted for <strong>defective or damaged products only</strong>.
          </li>
          <li>
            <strong>Return window:</strong> 10 days from the date of delivery.
          </li>
          <li>
            <strong>Return shipping:</strong> free. Lyra Enterprises arranges and pays for the pickup.
          </li>
          <li>
            <strong>Exchanges:</strong> not accepted.
          </li>
          <li>
            <strong>Non-defective returns:</strong> not accepted (no change-of-mind or wrong-selection returns).
          </li>
        </ul>

        <h2>Policy Details</h2>
        <table>
          <tbody>
            <tr>
              <th scope="row" className="text-left">Policy URL</th>
              <td>
                <a href={URL}>{URL}</a>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-left">Returns</th>
              <td>Accept returns for defective products only</td>
            </tr>
            <tr>
              <th scope="row" className="text-left">Exchanges</th>
              <td>Not accepted</td>
            </tr>
            <tr>
              <th scope="row" className="text-left">Return window</th>
              <td>10 days from delivery</td>
            </tr>
            <tr>
              <th scope="row" className="text-left">Return shipping</th>
              <td>Free</td>
            </tr>
          </tbody>
        </table>

        <h2 id="countries">Countries</h2>
        <p>This return policy applies to orders delivered to the following {RETURN_COUNTRIES.length} countries:</p>
        <p>{RETURN_COUNTRIES.map(([name]) => name).join(", ")}</p>

        <h2>Returns for Defective or Damaged Products</h2>
        <p>
          If a vending machine, incinerator or napkin pack you bought from us arrives damaged or has a manufacturing defect, you may return it within 10
          days of delivery. Transit damage or missing parts must be reported within 48 hours of delivery, with photos of the packaging and product.
        </p>
        <p>To request a return:</p>
        <ol>
          <li>
            Email <ObfuscatedEmail>us</ObfuscatedEmail> or call {SITE.phoneDisplay} with your order reference, the product model (and serial number for
            machines), a description of the defect and photos.
          </li>
          <li>Our team checks the issue, remotely where possible, and confirms the return.</li>
          <li>We arrange the pickup from your address at no cost to you.</li>
          <li>
            Once the defect is confirmed, we repair or replace the product with the same model. If repair or replacement is not possible, we refund the amount
            paid for that product.
          </li>
        </ol>

        <h2>Refunds</h2>
        <p>
          Approved refunds are made to the original payment method (UPI, card or net banking) within 7 to 10 business days of approval, subject to bank
          timelines.
        </p>

        <h2>Exchanges</h2>
        <p>
          We do not accept exchanges. A product cannot be swapped for a different model, size or variant after delivery. A defective product is repaired or
          replaced with the same model as described above.
        </p>

        <h2>What Cannot Be Returned</h2>
        <ul>
          <li>Products that are not defective or damaged, including change-of-mind or wrong-selection returns</li>
          <li>Products damaged by improper installation, misuse, unauthorised modification, water ingress or an unstable power supply</li>
          <li>Opened or used sanitary napkin packs, unless they arrived damaged or defective (for hygiene reasons)</li>
          <li>Return requests made after the 10-day return window</li>
        </ul>

        <h2>After the Return Window</h2>
        <p>
          After 10 days, manufacturing defects in vending machines and incinerators are covered by our 1-year warranty through repair or replacement. See the{" "}
          <Link href="/cancellation-refund-policy">Cancellation, Refund and Warranty Policy</Link> for warranty terms and order cancellation.
        </p>

        <h2>Rented Machines</h2>
        <p>
          Machines on rent are not bought, so this policy does not apply to them. Rented machines are repaired or replaced by Lyra under the{" "}
          <Link href="/rental-agreement">Equipment Rental Agreement</Link>.
        </p>

        <h2>Contact</h2>
        <p>
          Lyra Enterprises, {SITE.address}. Email <ObfuscatedEmail>us</ObfuscatedEmail> or call {SITE.phoneDisplay}, Monday to Saturday.
        </p>
      </StaticInfoPage>
    </>
  );
}
