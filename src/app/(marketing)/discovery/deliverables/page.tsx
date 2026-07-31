import React from "react";
import { Metadata } from "next";
import DeliverablesClient from "@/components/discovery/DeliverablesClient";

export const metadata: Metadata = {
  title: "Discovery Deliverables — What You Get from Nisol AI",
  description: "Get 15 executive-ready deliverables from a Nisol Discovery engagement. Executive Summary, AI Readiness, Opportunity Matrix, Roadmap, and more.",
  keywords: [
    "AI discovery deliverables",
    "AI transformation reports",
    "AI readiness assessment report",
    "AI consulting deliverables"
  ]
};

export default function DiscoveryDeliverablesPage() {
  return <DeliverablesClient />;
}
