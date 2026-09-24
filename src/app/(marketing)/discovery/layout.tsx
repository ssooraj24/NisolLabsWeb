import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nisol 360™: The 30-360 Architecture | 7-Day Code-Free Architecture | Nisolai",
  description:
    "Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.",
};

export default function DiscoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
