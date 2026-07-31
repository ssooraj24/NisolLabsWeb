import React from "react";
import { Metadata } from "next";
import FaqsClient from "@/components/discovery/FaqsClient";

export const metadata: Metadata = {
  title: "FAQs — Nisol Discovery™ AI Transformation Engagement",
  description: "Get answers to frequently asked questions about Nisol Discovery™. Learn about the engagement process, deliverables, pricing, timeline, and more.",
  keywords: [
    "AI Discovery FAQs",
    "AI transformation consulting FAQs",
    "Nisol Discovery questions",
    "AI readiness assessment FAQs"
  ]
};

export default function DiscoveryFaqsPage() {
  return <FaqsClient />;
}
