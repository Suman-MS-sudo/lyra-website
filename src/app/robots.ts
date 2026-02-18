import { MetadataRoute } from "next";

const SITE_URL = "https://www.lyraenterprise.co.in";

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
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
