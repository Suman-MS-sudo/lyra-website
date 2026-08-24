import { MetadataRoute } from "next";

const SITE_URL = "https://lyraenterprise.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Allow Google AdsBot to crawl for Shopping ads
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
      // Explicit groups for Google Merchant Center's quality/policy checks
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
