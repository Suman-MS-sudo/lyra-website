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

const SITE_URL = "https://www.lyraenterprise.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Lyra Enterprise | #1 Vending Machine & Incinerator Manufacturer India",
    template: "%s | Lyra Enterprise",
  },
  description:
    "Buy sanitary napkin vending machines & incinerators from Lyra Enterprise — India's #1 manufacturer based in Chennai. Coin, UPI, WiFi & IoT models. Trusted by 200+ schools, hospitals & offices across India. Best price guaranteed.",

  keywords: [
    // Primary product keywords
    "sanitary napkin vending machine",
    "pad vending machine",
    "napkin vending machine",
    "sanitary pad vending machine",
    "menstrual hygiene vending machine",
    "sanitary napkin dispenser machine",
    // Incinerator keywords
    "sanitary napkin incinerator",
    "napkin incinerator",
    "sanitary pad incinerator",
    "pad incinerator machine",
    "menstrual waste incinerator",
    "napkin destroyer machine",
    // Manufacturer + location
    "vending machine manufacturer India",
    "vending machine manufacturer Chennai",
    "incinerator manufacturer India",
    "incinerator manufacturer Chennai",
    "napkin vending machine manufacturer",
    "sanitary vending machine manufacturer Tamil Nadu",
    // Buy intent
    "buy vending machine India",
    "vending machine price India",
    "napkin vending machine price",
    "sanitary machine for schools",
    "vending machine for hospitals",
    "vending machine for offices",
    "vending machine for colleges",
    // Technology
    "coin operated vending machine India",
    "UPI vending machine",
    "QR code vending machine",
    "IoT vending machine",
    "WiFi vending machine",
    "smart vending machine India",
    // Brand + broad
    "Lyra Enterprise",
    "Lyra vending machine",
    "Lyra incinerator",
    "women hygiene machine India",
    "girls toilet vending machine",
    "school toilet napkin machine",
  ],

  authors: [{ name: "Lyra Enterprise", url: SITE_URL }],
  creator: "Lyra Enterprise",
  publisher: "Lyra Enterprise",

  category: "Manufacturing",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title:
      "Lyra Enterprise | #1 Vending Machine & Incinerator Manufacturer India",
    description:
      "India's most trusted manufacturer of sanitary napkin vending machines & incinerators. Coin, UPI, WiFi & IoT models. 200+ installations across India. Get best price from Chennai.",
    url: SITE_URL,
    siteName: "Lyra Enterprise",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Lyra Enterprise — Sanitary Napkin Vending Machine & Incinerator Manufacturer India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Lyra Enterprise | #1 Vending Machine & Incinerator Manufacturer India",
    description:
      "Buy sanitary napkin vending machines & incinerators from India's #1 manufacturer. Coin, UPI, WiFi & IoT models. Best price, 200+ installations.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    // Add your Google Search Console verification token here once you have it
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },

  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai, Tamil Nadu, India",
    "geo.position": "13.0827;80.2707",
    ICBM: "13.0827, 80.2707",
    "DC.language": "en",
    "DC.publisher": "Lyra Enterprise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
