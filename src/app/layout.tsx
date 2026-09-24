import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nisolai.com"),
  title: {
    default: "nisolai — Enterprise AI Maturity Audit & AI Transformation Architecture | Nisol Score™ + Nisol 360™",
    template: "%s | nisolai"
  },
  description: "Master enterprise architects. Nisol Score™ audits your enterprise AI maturity across 15 capabilities vs 8 industries. Nisol 360™ delivers your board-ready AI transformation architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
  keywords: [
    "Enterprise AI Maturity Audit",
    "AI Maturity Assessment",
    "Enterprise AI Transformation",
    "AI Transformation Architecture",
    "AI Readiness Audit",
    "AI Transformation Partner",
    "Nisol Score",
    "NISOL 360",
    "Zero Vendor Lock-in",
    "Board-Ready AI Roadmap",
    "Vector Lakehouse Architecture",
    "nisolai"
  ],
  authors: [{ name: "nisolai Enterprise Architecture Practice" }],
  icons: {
    icon: "/images/nisol-core-logo.png",
    shortcut: "/images/nisol-core-logo.png",
    apple: "/images/nisol-core-logo.png"
  },
  openGraph: {
    title: "nisolai — Enterprise AI Maturity Audit & AI Transformation Architecture",
    description: "Master enterprise architects. Nisol Score™ audits your enterprise AI maturity across 15 capabilities vs 8 industries. Nisol 360™ delivers your board-ready AI transformation architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
    url: "https://www.nisolai.com",
    siteName: "nisolai",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/nisol-core-logo.png",
        width: 1200,
        height: 630,
        alt: "nisolai — Enterprise AI Maturity Audit & AI Transformation Architecture"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "nisolai — Enterprise AI Maturity Audit & AI Transformation Architecture",
    description: "Master enterprise architects. Nisol Score™ audits your enterprise AI maturity across 15 capabilities vs 8 industries. Nisol 360™ delivers your board-ready AI transformation architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
    images: ["/images/nisol-core-logo.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8FAFC] text-[#050F1E] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
