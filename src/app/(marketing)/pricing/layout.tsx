import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixed-Price Blueprints & Pricing | Nisol 360™ | Nisolai",
  description:
    "Fixed-price SOW architecture for enterprise AI transformation. Spark (₹1.5L / $1,800), One (₹4.5L / $5,500), Pro (₹8.5L / $10,500), Enterprise (₹18.5L+). Zero vendor lock-in. You own the blueprint.",
  keywords: [
    "enterprise AI pricing",
    "fixed-price AI discovery",
    "Nisol 360 pricing",
    "AI architecture cost",
    "AI transformation SOW",
    "AI consulting fixed price"
  ],
  openGraph: {
    title: "Fixed-Price Blueprints | Zero Ambiguity | Nisolai",
    description: "Fixed-price SOW architecture. No discovery drag. 100% client architecture ownership.",
    url: "https://www.nisolai.com/pricing",
    siteName: "Nisol AI",
    images: [{ url: "/images/nisol-core-logo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Blueprints | Nisolai",
    description: "Four Blueprints. Zero Ambiguity. 100% Architecture Ownership.",
    images: ["/images/nisol-core-logo.png"],
  },
};

const PRICING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nisolai Enterprise AI Blueprints",
  description: "Fixed-price SOW AI architecture engagements with zero vendor lock-in.",
  itemListElement: [
    {
      "@type": "Product",
      position: 1,
      name: "Nisol Spark",
      description: "Fixed-Price 3-Day Focus Sprint for rapid AI opportunity, token cost, or data check.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "150000",
        price: "150000"
      }
    },
    {
      "@type": "Product",
      position: 2,
      name: "Nisol One (Nisol 360™)",
      description: "The 30-360 Flagship Architecture. Full 62-question diagnostic across 15 capabilities, 8-industry benchmark, and 3-Pack Board Dossier.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "450000",
        price: "450000"
      }
    },
    {
      "@type": "Product",
      position: 3,
      name: "Nisol Pro",
      description: "Nisol 360™ + CFO Board Investment Memo (DCF, NPV, IRR) + Vector Lakehouse Blueprint + RACI & OCM.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "850000",
        price: "850000"
      }
    },
    {
      "@type": "Product",
      position: 4,
      name: "Nisol Enterprise",
      description: "Multi-entity architecture, custom AI CoE charter, empirical PoC decision gates, shadow AI audit.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "1850000",
        price: "1850000"
      }
    }
  ]
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_SCHEMA) }}
      />
      {children}
    </>
  );
}
