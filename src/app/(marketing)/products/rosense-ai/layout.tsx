import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RoSense AI — Enterprise Conversation & Memory Intelligence | Nisol AI",
  description: "Your company remembers everything. Privately. Turn multi-hour boardroom sessions & workshops into living memory, extracted decisions, and immediate execution.",
  keywords: [
    "RoSense AI",
    "RoSense Box",
    "Conversation Intelligence",
    "Air-Gapped AI",
    "Boardroom Intelligence",
    "Data Sovereignty",
    "Private Local Inference",
    "Nisol AI"
  ]
};

export default function RoSenseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
