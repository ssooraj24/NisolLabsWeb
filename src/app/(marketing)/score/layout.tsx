import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NISOL SCORE™ | Enterprise AI Maturity Audit & Benchmark | nisolai",
  description:
    "Nisol Score™ is our Enterprise AI Maturity Audit. Architect-validated across 15 capabilities and 62 proprietary dimensions. Benchmarked against 8 industries. Delivered within Nisol 360™.",
  openGraph: {
    title: "NISOL SCORE™ — Enterprise AI Maturity Audit | nisolai",
    description:
      "Not a quiz. An enterprise benchmark. 15 capabilities, 5 maturity levels, 8-industry benchmark with architect validation.",
    url: "https://www.nisolai.com/score",
    siteName: "nisolai",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NISOL SCORE™ Enterprise AI Readiness Benchmark",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  brand: {
    "@type": "Brand",
    name: "nisolai",
  },
  description:
    "15 capabilities. 62 diagnostic dimensions. 8-industry benchmark. Architect-validated enterprise AI readiness assessment.",
  offers: {
    "@type": "Offer",
    price: "450000",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    description: "Architect-validated enterprise AI readiness benchmark included in Nisol 360™ under mutual NDA.",
  },
};

export default function ScoreLayout({
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
