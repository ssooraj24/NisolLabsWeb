import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Nisol Labs | The Core of Intelligence — Enterprise AI Consulting & Multi-Agent Engineering",
    template: "%s | Nisol Labs"
  },
  description: "Nisol Labs helps businesses become AI-First organizations through practical, scalable, outcome-driven AI solutions. Autonomous Agents, AI Engineering, LLMOps, Strategy, and RAG.",
  keywords: [
    "Enterprise AI Consulting",
    "Autonomous AI Agents",
    "LLMOps",
    "AI Strategy",
    "Multi-Agent Systems",
    "AI Engineering",
    "Intelligent Document Processing",
    "Nisol Labs"
  ],
  authors: [{ name: "Nisol Labs Engineering Team" }],
  openGraph: {
    title: "Nisol Labs — The Core of Intelligence",
    description: "Enterprise-grade AI Strategy, Autonomous Multi-Agent Orchestration, LLMOps, and Intelligent Document Automation.",
    siteName: "Nisol Labs",
    locale: "en_US",
    type: "website"
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
