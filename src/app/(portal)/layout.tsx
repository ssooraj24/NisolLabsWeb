import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Navbar } from "@/components/discovery/Navbar"
import { Sidebar } from "@/components/discovery/Sidebar"
import { SupabaseProvider } from "@/components/discovery/SupabaseProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nisol AI Discovery Portal",
  description: "Enterprise AI Discovery & Maturity Assessment Portal",
}

export default function DiscoveryRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SupabaseProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <Navbar />
          <main id="portal-main-content" className="flex-1 overflow-y-auto bg-[#F8FAFC]">
            {children}
          </main>
        </div>
      </div>
    </SupabaseProvider>
  )
}
