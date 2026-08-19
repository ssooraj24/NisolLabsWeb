"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export interface TOCItem {
  id: string;
  title: string;
}

interface LegalSidebarProps {
  items: TOCItem[];
  contactEmail?: string;
}

export function LegalSidebar({ items, contactEmail = "contact@nisolai.com" }: LegalSidebarProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <aside className="space-y-6 print:hidden">
      {/* Table of Contents Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-28 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-golden-500" />
            Table of Contents
          </h3>
          <span className="text-[10px] font-semibold text-slate-400">
            {items.length} Sections
          </span>
        </div>

        <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-golden-50 text-navy-950 font-bold border-l-4 border-golden-500 shadow-xs"
                    : "text-slate-600 hover:text-navy-950 hover:bg-slate-50"
                }`}
              >
                <span className="truncate pr-2">{item.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "text-golden-600 translate-x-0.5" : "text-slate-300"}`} />
              </button>
            );
          })}
        </nav>

        {/* Enterprise Security & Legal Notice Card */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="p-3.5 rounded-xl bg-navy-950 text-white space-y-2">
            <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Azure & AWS Cloud Safeguards</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-normal">
              Need custom enterprise agreements, BAAs, or SOC 2 reports for vendor onboarding?
            </p>
            <Link
              href="/contact?type=enterprise-legal"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-golden-300 hover:text-golden-200 transition-colors pt-1"
            >
              <span>Contact Legal Team</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
            <Mail className="w-3.5 h-3.5 text-golden-500 shrink-0" />
            <span className="truncate">Direct Contact: <strong className="text-slate-700">{contactEmail}</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
}
