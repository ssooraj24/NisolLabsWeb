import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Compass, ShieldCheck, Terminal, Layers } from "lucide-react";

export const metadata = {
  title: "404 — Architecture Undefined | nisolai",
  description: "The requested route is outside the enterprise system specification. Every route in the nisolai topology is mapped with mathematical rigor."
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C1731] text-[#FBF8F3] flex flex-col justify-between selection:bg-[#D4A24E]/30 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative overflow-hidden">
        {/* Architectural grid background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Subtle golden ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4A24E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl w-full mx-auto relative z-10 text-center">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A24E]/40 bg-[#D4A24E]/10 text-[#D4A24E] text-xs font-mono font-semibold tracking-widest uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E] animate-pulse" />
            404 • SYSTEM SPEC NOT FOUND
          </div>

          {/* Luxury Monolithic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-serif">
            Architecture Undefined.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
            The requested endpoint does not exist within the current system specification. In enterprise engineering, unmapped endpoints represent vulnerability — every route in the <span className="text-[#D4A24E] font-medium">nisolai</span> topology is defined with mathematical certainty.
          </p>

          {/* Diagnostic Console Box */}
          <div className="bg-[#101D3D]/90 border border-white/10 rounded-xl p-5 mb-10 text-left font-mono text-xs sm:text-sm text-slate-400 shadow-2xl max-w-xl mx-auto backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-slate-500">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#D4A24E]" />
                TOPOLOGY DIAGNOSTIC
              </span>
              <span className="text-emerald-400 font-semibold">GATE 01: AUDITED</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p><span className="text-slate-500">ROUTER_STATUS :</span> <span className="text-rose-400">404_ROUTE_UNRESOLVED</span></p>
              <p><span className="text-slate-500">CORE_SYSTEM   :</span> <span className="text-golden-400">NISOL 360™ ARCHITECTURE</span></p>
              <p><span className="text-slate-500">RESOLUTION    :</span> RETURN TO RECOGNIZED TOPOLOGY OR REQUEST SOW</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blueprint"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#D4A24E] text-[#0C1731] font-bold text-sm tracking-wide hover:bg-[#c4923e] transition-all shadow-lg hover:shadow-[#D4A24E]/20 hover:-translate-y-0.5"
            >
              Return to NISOL 360™
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            >
              <Layers className="w-4 h-4 text-[#D4A24E]" />
              How It Works (7 Days)
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-all"
            >
              <Compass className="w-4 h-4" />
              Homepage
            </Link>
          </div>

          {/* Reassurance footer indicator */}
          <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4A24E]" />
              Zero Vendor Lock-In
            </span>
            <span className="text-slate-600">•</span>
            <span>Master Enterprise Architects</span>
            <span className="text-slate-600">•</span>
            <span>7-Day SOW Delivery</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
