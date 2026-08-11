import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nisol AI | End-to-End Enterprise AI Transformation & Implementation Partner",
    template: "%s | Nisol AI",
  },
  description:
    "Nisol AI is an end-to-end AI Transformation company that helps organizations discover, implement, govern, and scale AI across the enterprise. Autonomous Agents, AI Engineering, LLMOps, and Workflow Automation.",
  keywords: [
    "Enterprise AI Transformation",
    "AI Implementation Partner",
    "Autonomous AI Agents",
    "LLMOps",
    "AI Governance & Scaling",
    "Multi-Agent Systems",
    "AI Engineering",
    "Workflow Automation",
    "Nisol AI",
  ],
  authors: [{ name: "Nisol AI Engineering Team" }],
  openGraph: {
    title: "Nisol AI — End-to-End Enterprise AI Transformation Partner",
    description:
      "Partnering with organizations across their entire AI transformation journey—from opportunity discovery and implementation to adoption, governance, and continuous optimization.",
    siteName: "Nisol AI",
    locale: "en_US",
    type: "website",
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#050F1E] antialiased selection:bg-golden-500 selection:text-navy-950 font-sans">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
