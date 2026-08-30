import { MetadataRoute } from "next";

const SITE_URL = "https://lyraenterprise.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only the API is off-limits. /_next/ must stay crawlable so Google and
        // Merchant Center can fetch next/image-optimised product images.
        disallow: ["/api/"],
      },
      // Google Merchant Center quality & policy checks
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Storebot-Google",
        allow: "/",
      },
      // Google Shopping ads
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google-Mobile",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
