import { MetadataRoute } from "next";

const SITE_URL = "https://www.lyraenterprise.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const productSlugs = [
    "push-button-vending-machine",
    "solo-coin-vending-machine",
    "solo-wifi-vending-machine",
    "solo-ethernet-vending-machine",
    "lyra-micro-incinerator",
    "lyra-mini-incinerator",
    "lyra-maxi-incinerator",
  ];

  const citySlugs = [
    "vending-machine-tamil-nadu",
    "vending-machine-kerala",
    "vending-machine-andhra-pradesh",
    "vending-machine-karnataka",
    "vending-machine-telangana",
  ];

  const blogSlugs = [
    "why-every-school-needs-napkin-vending-machine",
    "upi-vs-coin-vending-machine",
    "napkin-incinerator-vs-sanitary-bin",
  ];

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/#products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/#customers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Product hub pages
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/products/sanitary-napkin-vending-machines`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/products/sanitary-napkin-incinerators`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Individual product pages
    ...productSlugs.map((slug) => ({
      url: `${SITE_URL}/products/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // City landing pages
    ...citySlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Blog
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
