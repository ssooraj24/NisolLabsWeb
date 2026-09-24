"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck,
  Zap,
  Lock,
  Award,
  Layers,
  Sparkles,
  Server,
  Database,
  Cpu,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const CORE_PRINCIPLES = [
  {
    n: "01",
    t: "Audit Maturity First. Then Architect Transformation.",
    d: "We audit enterprise AI maturity across 62 dimensions of data hygiene, security, and unit economics before anyone writes code. That's why 73% of enterprise AI projects fail before production, and ours don't.",
  },
  {
    n: "02",
    t: "Own Your Intelligence.",
    d: "Your intelligence belongs inside your perimeter. We deliver architecture, not dependency. Client infra pass-through. You pay AWS directly. You own the Blueprint. Build with us, or anyone.",
  },
  {
    n: "03",
    t: "Board-Ready or It Doesn't Ship.",
    d: "Every dossier must pass CFO review Monday morning: DCF, NPV, IRR, 4 Go-Live Gates, Stop-the-Clock. If it can't be presented to the board with mathematical certainty, we don't ship it.",
  },
];

const FOUNDERS = [
  {
    initials: "SR",
    name: "Ssooraj Rauth",
    role: "Co-Founder & Chief AI Architect",
    experience: "24+ Years Enterprise Systems",
    bio: "Cloud-native platforms to LLMOps & multi-agent orchestration. Former enterprise engineering director leading mission-critical architectures across BFSI, retail, and global cloud systems.",
    focus: ["Distributed Architecture", "LLMOps & Agent Mesh", "Zero-Trust Security", "Latency & Cost SLAs"],
  },
  {
    initials: "A",
    name: "Amol",
    role: "Co-Founder & Head of Data Engineering",
    experience: "18+ Years Data Platforms",
    bio: "Real-time pipelines, lakehouses, vector DBs & knowledge graphs. Every enterprise AI system stands on data he architects. Built high-scale telemetry for national-scale infrastructure.",
    focus: ["Enterprise Lakehouse", "Vector Search & RAG", "Data Lineage & Governance", "Real-Time Streaming"],
  },
];

const ANTI_CONSULTING_COMPARISON = [
  {
    dimension: "Team Architecture",
    traditional: "40-person junior team learning on your dollar",
    agency: "Boutique devs rushing unvetted code",
    nisol: "Master enterprise architects with 40+ years combined systems engineering",
  },
  {
    dimension: "Discovery Phase",
    traditional: "6 months of discovery meetings & slide decks",
    agency: "Hasty code repo without architecture",
    nisol: "7–11 days. 100% code-free. Complete 30-360 Blueprint you own",
  },
  {
    dimension: "Incentive Model",
    traditional: "Billed by the hour — financially rewarded for delays",
    agency: "Monthly retainer milestone lock",
    nisol: "Fixed outcome — Stop-the-Clock & No-Blame Exit guarantee",
  },
  {
    dimension: "IP & Infrastructure",
    traditional: "Proprietary vendor lock-in & managed hosting traps",
    agency: "Proprietary wrappers hosted on agency cloud",
    nisol: "100% Sovereign IP — direct client cloud pass-through (you pay AWS directly)",
  },
  {
    dimension: "Deliverable Standard",
    traditional: "120-slide PowerPoint that gathers dust",
    agency: "Fragile demo repo failing security audit",
    nisol: "Museum-grade dossier: Architecture specs, CFO models (NPV/IRR), 4 Go-Live Gates",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-slate-900 selection:bg-[#D4A24E]/20">
      
      {/* 1. HERO SECTION: TESLA / APPLE SCALE */}
      <section className="bg-[#0C1731] text-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#1B2D5B] relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4A24E]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#1B2D5B]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-8">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101D3D] border border-[#D4A24E]/40 text-[#D4A24E] text-xs font-mono font-bold tracking-wider uppercase shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#D4A24E] animate-pulse" />
              <span>Enterprise Intelligence System Architect • Founded August 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[96px] font-black tracking-[-0.04em] leading-[0.92] text-white">
              We Architect. <br />
              <span className="text-[#D4A24E]">You Own.</span>
            </h1>

            {/* Core Narrative / Left-Border Manifesto */}
            <div className="mt-8 border-l-2 border-[#D4A24E] pl-6 sm:pl-8 space-y-5 max-w-3xl">
              <p className="text-xl sm:text-2xl text-slate-200 font-medium leading-relaxed tracking-tight">
                Nisolai was founded on one observation: Enterprise AI didn&apos;t fail because models are weak. It failed because nobody stopped to think first.
              </p>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                In 2024, boards demanded AI. Consultancies sent 40-person teams billing millions for demo wrappers that hallucinated, leaked PII, and died in security review.
              </p>
              <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                We are Intelligence Architects — we audit enterprise AI maturity (Nisol Score™) and architect end-to-end AI transformation (Nisol 360™). We don&apos;t build disposable demo PoCs. We engineer board-ready 30-360 architectures in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.
              </p>
            </div>

            {/* Telemetry Status Strip */}
            <div className="pt-8 border-t border-[#1B2D5B] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white uppercase tracking-wider">System Status: Architecting</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden sm:inline text-slate-400">Master enterprise architects per engagement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#D4A24E] font-bold">Cohort: 2/5 Left</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">48h Direct Review</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE OPERATING CODE (THE 3 PRINCIPLES) */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">OUR OPERATING CODE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            The Code We Live By.
          </h2>
          <div className="w-12 h-1 bg-[#D4A24E] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_PRINCIPLES.map((principle) => (
            <div
              key={principle.n}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono font-black text-[#D4A24E]">
                    {principle.n}
                  </span>
                  <span className="w-8 h-px bg-slate-200" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2D5B] tracking-tight group-hover:text-[#D4A24E] transition-colors">
                  {principle.t}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {principle.d}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#D4A24E]" />
                <span>Institutional Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE ARCHITECTS: DIRECT ENGAGEMENT */}
      <section id="leadership" className="py-20 sm:py-28 bg-[#101D3D] text-white border-y border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-16 space-y-4">
            <Badge variant="golden" className="font-mono">FOUNDING ARCHITECTS</Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Architects, Not <br />Account Managers.
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              When you engage Nisolai, you work directly with the systems architects who design the architecture. No junior developers. No handoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="bg-[#0C1731] p-8 sm:p-10 rounded-2xl border border-[#1B2D5B] flex flex-col justify-between space-y-8 hover:border-[#D4A24E]/60 transition-all shadow-xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    {/* Initials Avatar */}
                    <div className="w-16 h-16 rounded-2xl bg-[#D4A24E] text-[#101D3D] font-black text-2xl flex items-center justify-center shadow-lg">
                      {founder.initials}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#101D3D] border border-[#1B2D5B] text-xs font-mono text-[#D4A24E]">
                      {founder.experience}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">{founder.name}</h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#D4A24E] mt-1 font-bold">
                      {founder.role}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Architectural Focus:</div>
                    <div className="flex flex-wrap gap-2">
                      {founder.focus.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[#101D3D] border border-[#1B2D5B] text-slate-300 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1B2D5B] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4A24E]" />
                    <span className="text-white font-semibold">Direct Engagement Pod</span>
                  </div>
                  <span>Pune • Mumbai • Global</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. THE ANTI-CONSULTING CONTRAST MATRIX */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">DISRUPTION MATRIX</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            Built Different.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Why enterprise leadership chooses a 2-person master architect pod over 40-person consulting armies.
          </p>
          <div className="w-12 h-1 bg-[#D4A24E] mx-auto rounded-full" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#101D3D] text-white p-4 sm:p-5 text-xs font-mono font-bold uppercase tracking-wider border-b border-[#1B2D5B]">
            <div className="col-span-3 text-slate-400">Dimension</div>
            <div className="col-span-4 text-rose-300 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Traditional Consulting Armies</span>
            </div>
            <div className="col-span-5 text-[#D4A24E] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4A24E]" />
              <span>Nisolai Standard</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {ANTI_CONSULTING_COMPARISON.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-5 sm:p-6 items-center gap-3 text-sm hover:bg-slate-50 transition-colors"
              >
                <div className="col-span-12 sm:col-span-3 font-bold text-[#1B2D5B]">
                  {row.dimension}
                </div>
                <div className="col-span-6 sm:col-span-4 text-slate-500 text-xs sm:text-sm flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{row.traditional}</span>
                </div>
                <div className="col-span-6 sm:col-span-5 text-[#101D3D] font-semibold text-xs sm:text-sm flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{row.nisol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DELIVERABLES ENGINEERED FOR THE BOARDROOM */}
      <section className="py-16 sm:py-20 bg-[#0C1731] text-white border-y border-[#1B2D5B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Badge variant="golden" className="mx-auto font-mono">EXECUTIVE RIGOR</Badge>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Deliverables Engineered <br />for the Boardroom.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="px-5 py-3 rounded-xl bg-[#101D3D] border border-[#1B2D5B] text-slate-200 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A24E]" />
              <span>Zero Slide Deck Bloat</span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-[#101D3D] border border-[#1B2D5B] text-slate-200 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A24E]" />
              <span>CFO Cash-Flow Models (NPV / IRR)</span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-[#101D3D] border border-[#1B2D5B] text-slate-200 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A24E]" />
              <span>Deterministic Go-Live Audit Gates</span>
            </div>
          </div>

          <div className="pt-4 text-xs sm:text-sm font-mono text-[#D4A24E] uppercase tracking-wider">
            7–11 Days Average: Kickoff to Board Memorandum • Stop-the-Clock Clause Included
          </div>
        </div>
      </section>

      {/* 6. CONTROLLED SCARCITY & APPLICATION CLOSER */}
      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Badge variant="golden" className="mx-auto font-mono">CONTROLLED SCARCITY</Badge>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
          We Partner With Only 5 New Enterprises Each Month.
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <p>
            We reject the agency model of infinite scaling with junior developers. Master enterprise architects per engagement.
          </p>
          <p className="text-sm text-slate-500">
            Applications are reviewed directly by master enterprise architects within 48 hours. Mutual NDA provided prior to any technical review.
          </p>
          <div className="text-2xl font-black text-[#D4A24E] pt-2 font-mono">
            Cohort: 2/5 Nisol 360™ Left.
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#101D3D] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
          >
            <span>Apply for Nisol 360™ — 48h Response</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/discovery"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-[#1B2D5B] font-bold text-base border border-slate-300 shadow-sm transition-all duration-200"
          >
            See The 30-360 Deliverable Dossier
          </Link>
        </div>

        <p className="text-xs text-slate-400 pt-3 font-mono">
          Strict Non-Disclosure Guarantee • Direct Partner Access • Zero Lock-in Handover
        </p>
      </section>

    </div>
  );
}
