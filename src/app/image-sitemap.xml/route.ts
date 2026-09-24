import { products, SITE } from "@/lib/data";

/**
 * Image sitemap — lists each product image against the page it appears on so
 * Google Images can discover and associate them. Referenced from robots.txt.
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

export async function GET() {
  const entries = [
    // Homepage hero
    `  <url>
    <loc>${SITE.url}</loc>
    <image:image>
      <image:loc>${SITE.url}/images/products/hero-vending-machine-incinerator.png</image:loc>
    </image:image>
  </url>`,
    ...products.map(
      (p) => `  <url>
    <loc>${esc(`${SITE.url}/products/${p.slug}`)}</loc>
    <image:image>
      <image:loc>${esc(`${SITE.url}${p.image}`)}</image:loc>
    </image:image>
  </url>`
    ),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
