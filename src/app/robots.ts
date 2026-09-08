import { MetadataRoute } from "next";

const SITE_URL = "https://lyraenterprise.co.in";

// AI search / answer-engine crawlers — explicitly allowed so Lyra content is
// eligible for citation in ChatGPT, Claude, Perplexity, Google AI Overviews, etc.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only the API is off-limits. /_next/ stays crawlable so Google and
        // Merchant Center can fetch next/image-optimised product images.
        disallow: ["/api/"],
      },
      // Google Merchant Center quality & policy checks
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Storebot-Google", allow: "/" },
      // Google Shopping ads
      { userAgent: "AdsBot-Google", allow: "/" },
      { userAgent: "AdsBot-Google-Mobile", allow: "/" },
      // AI answer engines
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
