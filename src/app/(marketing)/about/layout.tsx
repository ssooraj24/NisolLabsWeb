import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | We Architect. You Own. | nisolai",
  description:
    "Nisolai was founded on one observation: Enterprise AI failed because nobody stopped to think first. Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
  openGraph: {
    title: "About nisolai — Enterprise Intelligence System Architect",
    description:
      "We Architect. You Own. Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
    url: "https://www.nisolai.com/about",
    siteName: "nisolai",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nisolai AI",
  legalName: "Nisolai Labs Pvt Ltd",
  foundingDate: "2026-08-01",
  foundingLocation: "Pune, India",
  url: "https://www.nisolai.com",
  sameAs: ["https://www.linkedin.com/company/nisolai"],
  description:
    "Enterprise Intelligence Architecture firm founded August 2026 in Pune, India. 7-Day 30-360 Blueprint with zero vendor lock-in.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
