import { products, SITE, type Product } from "@/lib/data";

/**
 * Google Merchant Center product feed (RSS 2.0 + g: namespace).
 * Served at /feed.xml — submit this URL as a scheduled feed in Merchant Center.
 *
 * Prices are the ex-GST pricelist MRP, matching the landing pages. Merchant Center
 * does not support the g:tax attribute in India (it flags it as unrecognised), so GST
 * is stated in the feed description and product pages instead.
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

/**
 * Values come from Google's official product taxonomy (taxonomy-with-ids.en-US.txt).
 * There is no incinerator category, so incinerators use the nearest valid waste category.
 */
function googleCategory(p: Product): string {
  if (p.category === "napkin") return "Health & Beauty > Personal Care > Feminine Sanitary Supplies > Feminine Pads & Protectors";
  if (p.category === "incinerator") return "Home & Garden > Household Supplies > Waste Containment";
  return "Business & Industrial > Food Service > Vending Machines";
}

/** Custom labels let Google Ads campaigns and reports be split by type, price band and payment method. */
function priceBand(price: number): string {
  if (price < 15000) return "under_15k";
  if (price < 20000) return "15k_to_20k";
  return "above_20k";
}

function extraAttributes(p: Product): string {
  const lines: string[] = [];
  for (const h of p.features.slice(0, 10)) {
    lines.push(`      <g:product_highlight>${esc(h.slice(0, 150))}</g:product_highlight>`);
  }
  for (const sp of p.specs.slice(0, 20)) {
    lines.push(
      `      <g:product_detail><g:section_name>Specifications</g:section_name><g:attribute_name>${esc(sp.label.slice(0, 140))}</g:attribute_name><g:attribute_value>${esc(sp.value.slice(0, 1000))}</g:attribute_value></g:product_detail>`,
    );
  }
  lines.push(`      <g:custom_label_0>${p.category === "vending-machine" ? "vending_machine" : p.category}</g:custom_label_0>`);
  lines.push(`      <g:custom_label_1>${priceBand(p.price)}</g:custom_label_1>`);
  if (p.compare?.payment) {
    lines.push(`      <g:custom_label_2>${esc(p.compare.payment.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""))}</g:custom_label_2>`);
  }
  lines.push(`      <g:custom_label_3>${p.popular ? "bestseller" : "standard"}</g:custom_label_3>`);
  // Dispatch time promised on the product pages ("ships in 1-3 days").
  lines.push("      <g:min_handling_time>1</g:min_handling_time>", "      <g:max_handling_time>3</g:max_handling_time>");
  return lines.join("\n");
}

function productType(p: Product): string {
  if (p.category === "napkin") return "Sanitary Napkins";
  if (p.category === "incinerator") return "Sanitary Napkin Incinerators";
  return "Sanitary Napkin Vending Machines";
}

function item(p: Product): string {
  const link = `${SITE.url}/products/${p.slug}`;
  // Feed images are white-background 1000x1000 JPEG copies of the product PNGs
  // (public/images/feed/), since the originals are transparent and some are under 800 px.
  const image = `${SITE.url}/images/feed/${p.image.split("/").pop()!.replace(/\.png$/, ".jpg")}`;
  const priceExGst = p.price;
  // Merchant Center treats a price in the title as promotional text, so the title is
  // just the brand + product name (never repeat "Lyra" when the name already has it).
  const title = /^lyra\b/i.test(p.fullName) ? p.fullName : `Lyra ${p.fullName}`;

  return `    <item>
      <g:id>${esc(p.code)}</g:id>
      <g:title>${esc(title)}</g:title>
      <g:description>${esc(p.merchantDescription ?? p.description)}</g:description>
      <g:link>${esc(link)}</g:link>
      <g:image_link>${esc(image)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${priceExGst}.00 INR</g:price>
      <g:brand>Lyra Enterprises</g:brand>
      <g:mpn>${esc(p.code)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${esc(googleCategory(p))}</g:google_product_category>
      <g:product_type>${esc(productType(p))}</g:product_type>
${extraAttributes(p)}${
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
