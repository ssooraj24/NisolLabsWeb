import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Nisol 360™ | Controlled Enterprise AI Architecture | nisolai",
  description:
    "We architect 5 blueprints per month. Applications reviewed directly by master enterprise architects within 48 hours. Mutual NDA provided. Apply is a filter, not a contact form.",
  openGraph: {
    title: "Apply for Nisol 360™ | nisolai",
    description:
      "Enterprise AI architecture with zero vendor lock-in. 5 blueprints per month. Direct master architect review.",
    url: "https://www.nisolai.com/contact",
    siteName: "nisolai",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Apply for Nisol 360™",
  url: "https://www.nisolai.com/contact",
  description: "Velvet rope application for Nisol 360™ architecture. 5 engagements per month.",
};

export default function ContactLayout({
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
