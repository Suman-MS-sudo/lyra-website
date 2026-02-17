import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lyra Enterprise | Premium Vending Machine & Incinerator Manufacturers",
  description:
    "India's leading manufacturer of sanitary napkin vending machines and incinerators. Trusted by 200+ schools, hospitals, and offices across India. Chennai, Tamil Nadu.",
  keywords:
    "vending machine manufacturers Chennai, napkin vending machine, sanitary napkin incinerator, Lyra Enterprise, Tamil Nadu",
  authors: [{ name: "Lyra Enterprise" }],
  openGraph: {
    title: "Lyra Enterprise | Premium Vending Machine Manufacturers India",
    description:
      "India's most trusted manufacturer of sanitary napkin vending machines and incinerators.",
    url: "https://www.lyraenterprise.co.in",
    siteName: "Lyra Enterprise",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
