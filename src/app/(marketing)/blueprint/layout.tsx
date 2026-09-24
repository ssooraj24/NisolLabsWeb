import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nisol 360™: The 30-360 Architecture | Product Spec | nisolai",
  description:
    "Your enterprise, architected in 7 days. 62 dimensions across 15 capabilities. No code in discovery. No vendor lock-in. You own the blueprint — build it with anyone.",
  openGraph: {
    title: "Nisol 360™ — The 7-Day 30-360 Architecture | nisolai",
    description:
      "Enterprise AI architecture with zero vendor lock-in. Fixed 7–11 days. CFO investment model, data lakehouse spec, and 4 Go-Live decision gates.",
    url: "https://www.nisolai.com/blueprint",
    siteName: "nisolai",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Nisol 360™ - The 30-360 Architecture",
  brand: {
    "@type": "Brand",
    name: "nisolai",
  },
  description:
    "Your enterprise, architected in 7 days. 62 dimensions across 15 capabilities. Board-ready architecture + audit plan with zero vendor lock-in.",
  offers: [
    {
      "@type": "Offer",
      name: "India Tier",
      price: "450000",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Global Tier",
      price: "5500",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function BlueprintLayout({
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
