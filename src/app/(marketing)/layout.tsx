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
    default: "Nisol AI | The Core of Intelligence — Enterprise AI Consulting & Multi-Agent Engineering",
    template: "%s | Nisol AI",
  },
  description:
    "Nisol AI helps businesses become AI-First organizations through practical, scalable, outcome-driven AI solutions. Autonomous Agents, AI Engineering, LLMOps, Strategy, and RAG.",
  keywords: [
    "Enterprise AI Consulting",
    "Autonomous AI Agents",
    "LLMOps",
    "AI Strategy",
    "Multi-Agent Systems",
    "AI Engineering",
    "Intelligent Document Processing",
    "Nisol AI",
  ],
  authors: [{ name: "Nisol AI Engineering Team" }],
  openGraph: {
    title: "Nisol AI — The Core of Intelligence",
    description:
      "Enterprise-grade AI Strategy, Autonomous Multi-Agent Orchestration, LLMOps, and Intelligent Document Automation.",
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
