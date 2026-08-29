import { products, SITE, priceInclGst, type Product } from "@/lib/data";

/**
 * Google Merchant Center product feed (RSS 2.0 + g: namespace).
 * Served at /feed.xml — submit this URL as a scheduled feed in Merchant Center.
 *
 * Prices are the ex-GST pricelist MRP. GST (18%) is declared separately via
 * g:tax so Merchant Center shows a GST-inclusive price to shoppers.
 */

export const dynamic = "force-static";
export const revalidate = 86400;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function googleCategory(p: Product): string {
  if (p.category === "napkin") return "Health & Beauty > Personal Care > Feminine Sanitary Supplies";
  if (p.category === "incinerator") return "Business & Industrial > Work Safety Protective Gear";
  return "Business & Industrial > Retail > Vending Machines";
}

function productType(p: Product): string {
  if (p.category === "napkin") return "Sanitary Napkins";
  if (p.category === "incinerator") return "Sanitary Napkin Incinerators";
  return "Sanitary Napkin Vending Machines";
}

function item(p: Product): string {
  const link = `${SITE.url}/products/${p.slug}`;
  const image = `${SITE.url}${p.image}`;
  const priceExGst = p.price;
  const gst = priceInclGst(priceExGst) - priceExGst;
  const title = p.category === "napkin"
    ? `${p.fullName}`
    : `${p.fullName} — ₹${priceExGst.toLocaleString("en-IN")}`;

  return `    <item>
      <g:id>${esc(p.code)}</g:id>
      <g:title>${esc(title)}</g:title>
      <g:description>${esc(p.description)}</g:description>
      <g:link>${esc(link)}</g:link>
      <g:image_link>${esc(image)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${priceExGst}.00 INR</g:price>
      <g:tax>
        <g:country>IN</g:country>
        <g:rate>18</g:rate>
        <g:tax_ship>no</g:tax_ship>
      </g:tax>
      <g:brand>Lyra Enterprises</g:brand>
      <g:mpn>${esc(p.code)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${esc(googleCategory(p))}</g:google_product_category>
      <g:product_type>${esc(productType(p))}</g:product_type>${
        p.weightKg ? `\n      <g:shipping_weight>${p.weightKg} kg</g:shipping_weight>` : ""
      }
    </item>`;
}

export function GET(): Response {
  const now = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Lyra Enterprises — Sanitary Napkin Vending Machines &amp; Incinerators</title>
    <link>${SITE.url}</link>
    <description>Manufacturer product feed for Google Merchant Center. Prices are ex-works Chennai and exclude 18% GST; freight is billed separately.</description>
    <lastBuildDate>${now}</lastBuildDate>
${products.map(item).join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
