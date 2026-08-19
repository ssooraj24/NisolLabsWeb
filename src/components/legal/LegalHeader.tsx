"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, FileText, Lock, Copy, Check, Printer, ArrowRight } from "lucide-react";

interface LegalHeaderProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  badgeText: string;
}

export function LegalHeader({ title, subtitle, lastUpdated, badgeText }: LegalHeaderProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const tabs = [
    { name: "Privacy Policy", href: "/privacy", icon: Lock },
    { name: "Terms of Service", href: "/terms", icon: FileText },
    { name: "Security & Compliance", href: "/security", icon: ShieldCheck },
  ];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-navy-800 shadow-2xl">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Top Badge & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {badgeText}
            </span>
            <span className="text-xs text-navy-300 font-medium">
              Effective Date: <strong className="text-slate-200">{lastUpdated}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-navy-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Copy Page Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-navy-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors print:hidden"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Header Text */}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {title.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-golden-400 via-golden-300 to-amber-500 bg-clip-text text-transparent">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="pt-4 flex flex-wrap gap-2 print:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? "bg-golden-500 text-navy-950 shadow-lg shadow-golden-500/25 ring-2 ring-golden-400"
                    : "bg-navy-900/90 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-navy-950" : "text-golden-400"}`} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
