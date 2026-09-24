import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | AI Maturity Audit & Transformation in 7 Days | Nisolai",
  description:
    "Day 0: AI Maturity Audit (Nisol Score™). Days 1–7: AI Transformation Architecture (Nisol 360™). Master enterprise architects. Zero vendor lock-in. You own it.",
  keywords: [
    "enterprise AI process",
    "how enterprise AI works",
    "AI maturity audit",
    "AI transformation architecture",
    "7-day AI architecture",
    "Nisol 360 process",
    "AI discovery process",
    "AI architecture sprint"
  ],
  openGraph: {
    title: "How Nisol 360™ Works | AI Maturity Audit & Transformation Architecture",
    description: "From diagnostic audit to board memo in 7-11 days. Fixed sprint. Deterministic output.",
    url: "https://www.nisolai.com/how-it-works",
    siteName: "nisolai",
    images: [{ url: "/images/nisol-core-logo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Nisol 360™ Architecture Sprint",
    description: "Day 0: AI Maturity Audit. Days 1–7: AI Transformation Architecture. Master enterprise architects. Zero lock-in.",
    images: ["/images/nisol-core-logo.png"],
  },
};

const HOW_TO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Nisol 360™ Architecture Works",
  totalTime: "P7D",
  description: "Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Day 0: AI Maturity Audit",
      text: "Nisol Score™ baseline diagnostic across 15 capabilities and 62 dimensions to establish enterprise baseline vs 8-industry benchmark."
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Day 1: Immersion",
      text: "Leadership & CTO workshops, diagnostic launch, data room audit. Master enterprise architects on-site or remote."
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Day 2-3: Audit",
      text: "15 capability scoring (2.1/5 baseline), 8-industry benchmark, data hygiene, security stance, and token economics teardown."
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Day 4-5: Architecture",
      text: "30/60/90/180/360 roadmap, vector lakehouse blueprint (pgvector/Qdrant + BM25 + BGE-M3 + CDC + RBAC), and CFO 3-scenario financial model."
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Day 6: Stress Test",
      text: "4 Go-Live decision gates review, RACI, organizational change management, and Stop-the-Clock protocol."
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Day 7: Board Dossier",
      text: "Museum-grade dossier delivery, Minto Executive Brief, and 48-hour board readout call."
    }
  ]
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOW_TO_SCHEMA) }}
      />
      {children}
    </>
  );
}
