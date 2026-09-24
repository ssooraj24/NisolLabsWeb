import React from "react";
import Link from "next/link";
import { Bot, ArrowRight, ShieldCheck, Mail, MapPin, Globe } from "lucide-react";
import { COMPANY } from "@/data/company";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

export function Footer() {
  return (
    <footer className="bg-[#101D3D] text-slate-300 border-t border-[#1B2D5B] pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4A24E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <img
                src="/images/nisol-core-logo.png"
                alt="nisolai - The Core of Intelligence"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>
            <div className="space-y-1 text-xs text-slate-300 font-mono">
              <div className="text-white font-bold text-sm">Enterprise Intelligence System Architect</div>
              <div className="text-slate-400">Pune • Mumbai • Remote — India &amp; Global</div>
              <div className="text-[#D4A24E] font-medium pt-1">
                Zero Vendor Lock-in • You Own Every Line of Architecture
              </div>
            </div>
          </div>

          {/* Quick Connect & Apply */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono">
            <a
              href="mailto:contact@nisolai.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B2D5B]/70 border border-white/10 text-slate-200 hover:text-white hover:border-[#D4A24E]/50 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4A24E]" />
              <span>contact@nisolai.com</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#D4A24E] text-[#101D3D] font-bold hover:bg-[#E5B25B] transition-all shadow-md"
            >
              <span>Apply for Nisol 360™</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* 8 Essential Curated Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm font-semibold text-slate-300">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Link href="/how-it-works" className="hover:text-[#D4A24E] transition-colors">
              How It Works
            </Link>
            <Link href="/blueprint" className="hover:text-[#D4A24E] transition-colors">
              NISOL 360™
            </Link>
            <Link href="/score" className="hover:text-[#D4A24E] transition-colors">
              NISOL SCORE™
            </Link>
            <Link href="/about" className="hover:text-[#D4A24E] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#D4A24E] transition-colors text-[#D4A24E]">
              Apply
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-normal">
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Client Portal
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#D4A24E] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#D4A24E]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} Nisolai • Own Your Intelligence • Intelligence. Delivered.
          </div>
          <div className="text-slate-400 text-[11px]">
            Discovery is 100% code-free. No vendor dependency.
          </div>
        </div>

      </div>
    </footer>
  );
}
