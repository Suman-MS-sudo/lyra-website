import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lyra Enterprises — Vending Machines & Incinerators",
    short_name: "Lyra Enterprises",
    description:
      "India's #1 manufacturer of sanitary napkin vending machines and incinerators. Coin, UPI, WiFi and IoT models for schools, hospitals and offices.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    lang: "en-IN",
    categories: ["business", "shopping"],
    icons: [
      { src: "/images/logo.png", sizes: "442x454", type: "image/png", purpose: "any" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
