import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Login – Nisol Discovery",
  description: "Sign in to access the Nisol AI Discovery Portal",
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans">
      {children}
    </div>
  );
}
