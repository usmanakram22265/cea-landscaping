import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { ConvaiWidget } from "@/components/convai-widget";
import "./globals.css";

// Display — Bricolage Grotesque: a characterful humanist grotesque with real
// personality, deliberately off the reflex-reject (Fraunces/Inter) defaults.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Body — Geist: precise, modern, neutral. Pairs on a contrast axis with the
// quirkier display face.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Resolve social/OG URLs against the deployed domain: the Vercel production
  // URL until the custom domain (cealandscaping.com) goes live.
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://cealandscaping.com"
  ),
  title: {
    default: "CEA Landscaping & Maintenance | Houston Commercial Landscaping",
    template: "%s | CEA Landscaping & Maintenance",
  },
  description:
    "Woman-owned Houston landscaping built for the Texas climate. Custom installations, commercial maintenance, irrigation & drainage, tree care and rockscaping for property managers, HOAs, developers and residential projects.",
  keywords: [
    "Houston landscaping",
    "commercial landscape maintenance",
    "HOA landscaping Houston",
    "irrigation drainage Houston",
    "backflow testing",
    "landscape installation Katy Sugar Land The Woodlands",
  ],
  openGraph: {
    title: "CEA Landscaping & Maintenance",
    description:
      "Custom outdoor spaces built for beauty, function, and long-term durability in the Texas climate.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/videos/hero-poster.jpg",
        width: 1280,
        height: 720,
        alt: "Manicured commercial landscaping at a modern Houston property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEA Landscaping & Maintenance",
    description:
      "Custom outdoor spaces built for beauty, function, and long-term durability in the Texas climate.",
    images: ["/videos/hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions inject attributes on
          <body> before React hydrates (e.g. __processed_*__), which is an
          attribute-only mismatch outside our control. Children still warn. */}
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <ConvaiWidget />
      </body>
    </html>
  );
}
