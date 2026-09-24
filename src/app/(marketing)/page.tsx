"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Clock, 
  Lock, 
  FileCheck, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Building,
  Cpu,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// 15 Capabilities for Novatech Dossier Radar Visual
const CAPABILITIES_15 = [
  { name: "Data Hygiene & Prep", baseline: 32, target: 88 },
  { name: "Vector Search & Retrieval", baseline: 40, target: 92 },
  { name: "Agent Governance", baseline: 20, target: 85 },
  { name: "Hallucination Guardrails", baseline: 25, target: 90 },
  { name: "Unit Economics & OPEX", baseline: 30, target: 94 },
  { name: "Latency & SLA Control", baseline: 45, target: 89 },
  { name: "Model Fine-Tuning", baseline: 18, target: 80 },
  { name: "Security & Zero Trust", baseline: 35, target: 95 },
  { name: "Lakehouse Architecture", baseline: 28, target: 86 },
  { name: "Multi-Agent Systems", baseline: 15, target: 84 },
  { name: "Continuous Evaluation", baseline: 22, target: 91 },
  { name: "Fallback & Failovers", baseline: 30, target: 88 },
  { name: "Cost Observability", baseline: 38, target: 96 },
  { name: "Regulatory Compliance", baseline: 26, target: 90 },
  { name: "Enterprise API Mesh", baseline: 42, target: 93 }
];

// 4 Blueprints Product Architecture
const BLUEPRINTS = [
  {
    id: "spark",
    name: "Nisol Spark",
    subtitle: "The First Look Memo",
    duration: "3 Business Days",
    inr: "₹1,50,000",
    usd: "$1,800 USD",
    summary: "One problem. One track. AI Opportunity, Cost Audit, or Data Compliance check.",
    outcome: "Go / No-Go Memo with unit economics preview",
    includes: "No code. You own the memo.",
    href: "/spark",
    popular: false,
    slotsLeft: null,
  },
  {
    id: "one",
    name: "Nisol One",
    subtitle: "Nisol 360™: The 30-360 Architecture",
    duration: "7–11 Business Days",
    inr: "₹4,50,000",
    usd: "$5,500 USD",
    summary: "Full 360° audit across 15 capabilities, 62 questions, and 8-industry benchmark.",
    outcome: "Board-ready Blueprint for 30 / 60 / 90 / 180 / 360 days, NPV/IRR preview, 5 pilot hypotheses, Go-Live Gates.",
    includes: "15-Capability Radar, 62-Q Diagnostic, Roadmap, Audit Plan. Code-free.",
    href: "/contact?tier=one",
    popular: true,
    slotsLeft: "2 SLOTS LEFT",
  },
  {
    id: "pro",
    name: "Nisol Pro",
    subtitle: "The Blueprint + Model",
    duration: "10–15 Business Days",
    inr: "₹8,50,000",
    usd: "$10,500 USD",
    summary: "Everything in One + Full financial model (NPV/IRR/OPEX), Data Lakehouse blueprint, Staff upskilling plan.",
    outcome: "CFO-ready dossier with complete multi-year balance sheet impact.",
    includes: "Everything in One + Financial Model + Lakehouse Blueprint.",
    href: "/contact?tier=pro",
    popular: false,
    slotsLeft: null,
  },
  {
    id: "enterprise",
    name: "Nisol Enterprise",
    subtitle: "The Full Vision",
    duration: "4–8 Weeks",
    inr: "₹18,50,000+",
    usd: "$22,500+ USD",
    summary: "Multi-entity architecture, custom AI CoE charter, empirical PoC gates, full rollout audit framework.",
    outcome: "Enterprise CoE Charter and governance framework across business divisions.",
    includes: "Multi-entity Blueprint + Enterprise CoE Charter.",
    href: "/contact?tier=enterprise",
    popular: false,
    slotsLeft: null,
  },
];

function getRadarCoordinates(values: number[], radius: number, cx: number, cy: number) {
  const total = values.length;
  return values.map((val, i) => {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const r = (val / 100) * radius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

export default function HomePage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [activeCapability, setActiveCapability] = useState<number | null>(null);

  // Radar geometry
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 175;
  const baselineValues = CAPABILITIES_15.map(c => c.baseline);
  const targetValues = CAPABILITIES_15.map(c => c.target);
  const baselinePoints = getRadarCoordinates(baselineValues, radius, cx, cy);
  const targetPoints = getRadarCoordinates(targetValues, radius, cx, cy);

  return (
    <div className="bg-[#FBF8F3] text-[#1B2D5B] antialiased">
      
      {/* ============================================================ */}
      {/* SECTION 1: HERO (Tesla / Apple Authority on Deep Navy #101D3D) */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] bg-[#101D3D] text-white flex flex-col justify-center pt-24 pb-16 overflow-hidden border-b border-[#1B2D5B]">
        {/* Subtle Architectural Glow & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1B2D5B_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D4A24E]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
          
          {/* Micro Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2D5B]/90 border border-[#D4A24E]/40 text-[#D4A24E] text-xs font-semibold tracking-wide shadow-lg">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4A24E] animate-pulse" />
            <span className="font-mono uppercase tracking-wider">ENTERPRISE AI MATURITY AUDIT &amp; AI TRANSFORMATION ARCHITECTURE</span>
          </div>

          {/* 120px Impact Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-white select-none">
            OWN YOUR <br />
            <span className="text-[#D4A24E]">
              INTELLIGENCE.
            </span>
          </h1>

          {/* Sub-headline */}
          <div className="max-w-4xl mx-auto space-y-3">
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-100 font-semibold tracking-tight">
              Enterprise AI Maturity Audit &amp; Transformation Architecture in 7 Days.
            </p>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              We audit where you are (<strong className="text-[#D4A24E] font-semibold">Nisol Score™</strong> — 15 capabilities, 62 dimensions, 8-industry benchmark) and architect how to reach autonomous scale (<strong className="text-[#D4A24E] font-semibold">Nisol 360™</strong> — 30/60/90/180/360 roadmap, CFO model, and 4 Go-Live decision gates).
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-mono pt-1">
              Master enterprise architects. Zero code in discovery. Zero vendor lock-in. You own the blueprint.
            </p>
          </div>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#101D3D] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
            >
              <span>Apply for Nisol 360™ — 2/5 left</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#blueprints"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#1B2D5B]/80 hover:bg-[#1B2D5B] text-slate-200 hover:text-white border border-[#D4A24E]/30 font-semibold text-base transition-all duration-200"
            >
              See Four Nisol 360™ Tiers
            </Link>
          </div>

          {/* Micro-trust under CTA (Tesla's spec bar) */}
          <div className="pt-2 text-xs sm:text-sm text-slate-400 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-4 h-4 text-[#D4A24E]" /> Stop-the-Clock Clause
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-4 h-4 text-[#D4A24E]" /> No-Blame Exit
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-4 h-4 text-[#D4A24E]" /> Client Infra Pass-Through
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Check className="w-4 h-4 text-[#D4A24E]" /> You Own Every Line
            </span>
          </div>

        </div>

        {/* ============================================================ */}
        {/* TESLA SPEC BAR (Full-width sticky horizontal band)          */}
        {/* ============================================================ */}
        <div className="mt-16 border-t border-b border-white/10 bg-[#0C1731]/90 py-3.5 px-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] text-xs uppercase tracking-widest font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-[#D4A24E] font-bold">7 DAYS</span>
              <span className="text-slate-500">FIXED</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[#D4A24E] font-bold">ZERO CODE</span>
              <span className="text-slate-500">IN DISCOVERY</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[#D4A24E] font-bold">YOU OWN</span>
              <span className="text-slate-500">THE BLUEPRINT</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[#D4A24E] font-bold">BUILD WITH ANYONE</span>
              <span className="text-slate-500">OR WITH US</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="text-[#D4A24E] font-bold">CLIENT INFRA</span>
              <span className="text-slate-500">PASS-THROUGH</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* THE TWO PILLARS: THE AUDIT & THE TRANSFORMATION ARCHITECTURE */}
      {/* ============================================================ */}
      <section className="bg-[#0C1731] text-white py-20 border-b border-[#1B2D5B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1B2D5B_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101D3D] text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
              The Enterprise Engine
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Two Pillars. One Singular Mandate.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nisolai operates as an independent enterprise architecture practice. We audit where your organization actually stands today, and architect your complete transformation to autonomous scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* PILLAR 1: THE AUDIT */}
            <div className="bg-[#101D3D] rounded-3xl border border-[#1B2D5B] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative group hover:border-[#D4A24E]/50 transition-all">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-[#D4A24E] tracking-widest uppercase bg-[#D4A24E]/10 px-3 py-1 rounded-full border border-[#D4A24E]/30">
                    PILLAR 01 • THE AUDIT
                  </span>
                  <span className="text-xs font-mono text-slate-400">WHERE YOU STAND</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Enterprise AI Maturity Audit <br />
                  <span className="text-[#D4A24E]">(Nisol Score™)</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  A forensic, 62-dimension diagnostic that exposes the truth before committing enterprise capital. We audit data hygiene, tenant isolation, security perimeters, shadow AI usage, and unit token economics.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#0C1731] border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-slate-400">BASELINE AVG</div>
                    <div className="text-xl font-bold text-rose-400 font-mono">2.1 / 5.0</div>
                    <div className="text-[10px] text-slate-500">Unvetted PoC Traps</div>
                  </div>
                  <div className="bg-[#0C1731] border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-slate-400">LEADER BENCHMARK</div>
                    <div className="text-xl font-bold text-[#D4A24E] font-mono">4.2 / 5.0</div>
                    <div className="text-[10px] text-slate-500">Top-Quartile Enterprise</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4A24E]" />
                    <span>15 Core Enterprise Capabilities Scored</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4A24E]" />
                    <span>Benchmark vs 8 Global Industry Cohorts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4A24E]" />
                    <span>Architect-validated baseline included in Nisol 360™</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-white/10">
                <Link
                  href="/score"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#D4A24E] hover:text-white transition-colors"
                >
                  <span>Explore Nisol Score™ Maturity Radar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* PILLAR 2: THE TRANSFORMATION ARCHITECTURE */}
            <div className="bg-[#101D3D] rounded-3xl border border-[#1B2D5B] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative group hover:border-[#D4A24E]/50 transition-all">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-[#D4A24E] tracking-widest uppercase bg-[#D4A24E]/10 px-3 py-1 rounded-full border border-[#D4A24E]/30">
                    PILLAR 02 • THE TRANSFORMATION
                  </span>
                  <span className="text-xs font-mono text-slate-400">HOW YOU SCALE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  AI Transformation Architecture <br />
                  <span className="text-[#D4A24E]">(Nisol 360™)</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  The deterministic 30/60/90/180/360-day engineering blueprint that bridges the maturity gap. Delivers full Vector Lakehouse specifications, CFO financial return models, and 4 empirical Go-Live decision gates.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#0C1731] border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-slate-400">DELIVERY SPEED</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">7 Days</div>
                    <div className="text-[10px] text-slate-500">Fixed-Scope SOW</div>
                  </div>
                  <div className="bg-[#0C1731] border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-mono text-slate-400">IP OWNERSHIP</div>
                    <div className="text-xl font-bold text-[#D4A24E] font-mono">100% Client</div>
                    <div className="text-[10px] text-slate-500">Zero Vendor Lock-in</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4A24E]" />
                    <span>30/60/90/180/360 Execution Roadmap &amp; RACI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4A24E]" />
                    <span>Deterministic CFO Model with 3 Sensitivity Scenarios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4A24E]" />
                    <span>Bound Leather Board Folio &amp; 4 Go-Live Decision Gates</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-white/10">
                <Link
                  href="/blueprint"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#D4A24E] hover:text-white transition-colors"
                >
                  <span>Explore Nisol 360™ Product Spec</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: 15-CAPABILITY RADAR (Novatech Dossier Reveal)      */}
      {/* ============================================================ */}
      <section className="bg-[#101D3D] text-white py-20 border-b border-[#1B2D5B] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#D4A24E] font-mono font-bold">
              The Architectural Artifact
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              15 Capabilities. 62 Dimensions. One Complete Truth.
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Not bullet points or generic advice. An anonymized preview of the empirical capability radar delivered inside every 30-360 Blueprint.
            </p>
          </div>

          {/* SVG Radar Chart Representation */}
          <div className="relative max-w-[560px] mx-auto pt-4 pb-6">
            <svg 
              viewBox={`0 0 ${size} ${size}`} 
              className="w-full h-auto drop-shadow-2xl select-none"
            >
              {/* Concentric Reference Rings */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r={radius * level}
                  fill="none"
                  stroke="#1B2D5B"
                  strokeWidth="1.2"
                  strokeDasharray={idx === 4 ? "none" : "3 3"}
                />
              ))}

              {/* 15 Axes Lines */}
              {CAPABILITIES_15.map((_, i) => {
                const angle = (Math.PI * 2 / 15) * i - Math.PI / 2;
                const x2 = cx + radius * Math.cos(angle);
                const y2 = cy + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x2}
                    y2={y2}
                    stroke="#1B2D5B"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Target 30-360 Blueprint Polygon (Glowing Gold) */}
              <polygon
                points={targetPoints}
                fill="rgba(212, 162, 78, 0.22)"
                stroke="#D4A24E"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* Baseline Current-State Polygon (Navy Slate) */}
              <polygon
                points={baselinePoints}
                fill="rgba(217, 79, 79, 0.18)"
                stroke="#D94F4F"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />

              {/* Capability Axis Dots & Hover Markers */}
              {CAPABILITIES_15.map((cap, i) => {
                const angle = (Math.PI * 2 / 15) * i - Math.PI / 2;
                const tx = cx + (cap.target / 100) * radius * Math.cos(angle);
                const ty = cy + (cap.target / 100) * radius * Math.sin(angle);
                const lx = cx + (radius + 24) * Math.cos(angle);
                const ly = cy + (radius + 24) * Math.sin(angle);

                const isHovered = activeCapability === i;

                return (
                  <g 
                    key={i} 
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveCapability(i)}
                    onMouseLeave={() => setActiveCapability(null)}
                  >
                    <circle
                      cx={tx}
                      cy={ty}
                      r={isHovered ? 6 : 3.5}
                      fill="#D4A24E"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="transition-all"
                    />
                    <text
                      x={lx}
                      y={ly}
                      fill={isHovered ? "#FFFFFF" : "#94A3B8"}
                      fontSize={isHovered ? "10.5" : "9"}
                      fontWeight={isHovered ? "bold" : "500"}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="transition-all select-none"
                    >
                      {cap.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Radar Legend */}
            <div className="flex items-center justify-center gap-8 text-xs font-mono pt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#D94F4F] border-dashed border-t border-[#D94F4F] inline-block" />
                <span className="text-rose-300">As-Is Baseline Diagnostic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#D4A24E] border border-white inline-block" />
                <span className="text-[#D4A24E] font-bold">Nisol 30-360 Target Architecture</span>
              </div>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="pt-8 border-t border-white/10 max-w-4xl mx-auto space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold font-mono">
              TRUSTED BY TEAMS BUILDING IN
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1B2D5B]/70 border border-white/10">BFSI &amp; Fintech</span>
              <span className="text-[#D4A24E]">•</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1B2D5B]/70 border border-white/10">Industrial Manufacturing</span>
              <span className="text-[#D4A24E]">•</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1B2D5B]/70 border border-white/10">Healthcare &amp; Diagnostics</span>
              <span className="text-[#D4A24E]">•</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1B2D5B]/70 border border-white/10">Enterprise Cloud</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: THE INDUSTRY TRAP (Why Enterprise AI Fails)        */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#101D3D] text-white rounded-3xl p-8 sm:p-14 border border-[#1B2D5B] shadow-2xl relative overflow-hidden space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D4A24E] font-mono font-bold">
              The Industry Trap
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Why Most Enterprise AI Fails Before Production.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: 73% */}
            <div className="bg-[#0C1731] rounded-2xl p-7 border border-[#1B2D5B] space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-rose-400">73%</div>
              <h3 className="font-bold text-white text-lg">Fail Before Production</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                PoCs that work in demos break on live data, unmanaged hallucinations, and unpredictable edge cases. No one audited the foundations.
              </p>
            </div>

            {/* Column 2: ₹1.2 Cr */}
            <div className="bg-[#0C1731] rounded-2xl p-7 border border-[#1B2D5B] space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-[#D4A24E]">₹1.2 Cr</div>
              <h3 className="font-bold text-white text-lg">Average Wasted Spend</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Months of billable hours for armies of junior consultants producing generic slide decks that never ship to users or show ROI.
              </p>
            </div>

            {/* Column 3: The Reason */}
            <div className="bg-[#0C1731] rounded-2xl p-7 border border-[#1B2D5B] space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-[#D4A24E]">The Reason</div>
              <h3 className="font-bold text-white text-lg">Lack of Architectural Rigor</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Not because models don&apos;t work. Because nobody audited data hygiene, security boundaries, and unit economics before coding.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: THE NISOL APPROACH (Exact user copy & freedom)     */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
        <Badge variant="golden" className="mx-auto font-mono">The Nisol Approach</Badge>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight leading-tight">
          We Architect. You Own. Anyone Can Build.
        </h2>

        <div className="space-y-6 text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
          <p className="font-semibold text-xl sm:text-2xl text-[#1B2D5B]">
            In 7 days, you get Nisol 360™: The 30-360 Architecture. <br className="hidden sm:inline" />
            Your CFO can present it Monday.
          </p>
          <p className="text-base sm:text-lg text-slate-600">
            Build it with us, or build it without us. <br />
            <strong className="text-[#1B2D5B] font-bold">You own it either way.</strong>
          </p>
        </div>

        {/* 3 Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-sm font-mono font-bold text-[#D4A24E] mb-2">OPTION 1</div>
            <h3 className="text-lg font-bold text-[#1B2D5B] mb-2">Build with Nisol</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We implement the exact systems we architected, inside your infrastructure, with milestone-based delivery gates.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-sm font-mono font-bold text-[#D4A24E] mb-2">OPTION 2</div>
            <h3 className="text-lg font-bold text-[#1B2D5B] mb-2">Nisol Manages &amp; Audits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your internal engineering team builds. Our senior systems architects audit every pull request and evaluate gates.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-sm font-mono font-bold text-[#D4A24E] mb-2">OPTION 3</div>
            <h3 className="text-lg font-bold text-[#1B2D5B] mb-2">Build with Anyone</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hand the Blueprint to any systems integrator or internal team. The Blueprint is yours. No strings, no lock-in.
            </p>
          </div>
        </div>

        {/* Independence Clause */}
        <div className="p-4 rounded-xl bg-white border border-[#D4A24E]/30 max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 font-medium">
          Discovery is code-free. We don&apos;t write a single line in this phase. That&apos;s how you stay independent. That&apos;s how we stay honest.
        </div>

        {/* 5 Maturity Levels Visual */}
        <div className="pt-6 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold mb-3 text-center">
            MAPPED ACROSS 5 MATURITY LEVELS
          </p>
          <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <div className="font-bold text-[#1B2D5B]">L1</div>
              <div className="text-[10px] text-slate-500">Unstructured</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <div className="font-bold text-[#1B2D5B]">L2</div>
              <div className="text-[10px] text-slate-500">Opportunistic</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#D4A24E]/40 bg-[#D4A24E]/5">
              <div className="font-bold text-[#D4A24E]">L3</div>
              <div className="text-[10px] text-slate-700 font-medium">Engineered</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#1B2D5B] text-white">
              <div className="font-bold text-[#D4A24E]">L4</div>
              <div className="text-[10px] text-slate-300">Autonomous</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#101D3D] text-white border border-[#D4A24E]">
              <div className="font-bold text-[#D4A24E]">L5</div>
              <div className="text-[10px] text-[#D4A24E]">Flywheel</div>
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* SECTION 5: FOUR BLUEPRINTS (Fixed-Price, Transparent)         */}
      {/* ============================================================ */}
      <section id="blueprints" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">Product Hierarchy</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            Four Blueprints. Zero Ambiguity.
          </h2>
          <p className="text-base text-slate-600">
            Fixed-price. Code-free discovery. You own the blueprint.
          </p>

          {/* Clean Currency Switcher (INR vs USD) */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-300 shadow-xs">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === "INR"
                  ? "bg-[#1B2D5B] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#1B2D5B]"
              }`}
            >
              India (INR ₹)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === "USD"
                  ? "bg-[#1B2D5B] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#1B2D5B]"
              }`}
            >
              Global (USD $)
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLUEPRINTS.map((bp) => (
            <div
              key={bp.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                bp.popular
                  ? "bg-[#101D3D] text-white shadow-2xl ring-2 ring-[#D4A24E] relative lg:-translate-y-2"
                  : "bg-white text-[#1B2D5B] border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  {bp.popular ? (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4A24E] text-[#101D3D]">
                      MOST POPULAR
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      FIXED SOW
                    </span>
                  )}
                  {bp.slotsLeft && (
                    <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {bp.slotsLeft}
                    </span>
                  )}
                  <span className={`text-xs font-medium ${bp.popular ? "text-slate-300" : "text-slate-500"}`}>
                    {bp.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-1">{bp.name}</h3>
                <div className="text-xs font-bold text-[#D4A24E] mb-4">{bp.subtitle}</div>

                {/* Price Display */}
                <div className="mb-4">
                  <div className="text-3xl font-black">
                    {currency === "INR" ? bp.inr : bp.usd}
                  </div>
                  <div className={`text-xs ${bp.popular ? "text-slate-400" : "text-slate-500"}`}>
                    Fixed SOW • Code-free discovery
                  </div>
                </div>

                <p className={`text-xs leading-relaxed mb-4 ${bp.popular ? "text-slate-200" : "text-slate-600"}`}>
                  {bp.summary}
                </p>

                <div className={`p-3 rounded-xl mb-4 text-xs font-medium ${bp.popular ? "bg-[#1B2D5B]/70 text-slate-200 border border-white/10" : "bg-slate-50 text-slate-700 border border-slate-100"}`}>
                  <strong className="text-[#D4A24E] font-bold block mb-1">Outcome:</strong>
                  {bp.outcome}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-200/20 space-y-3">
                <div className={`text-[11px] leading-tight ${bp.popular ? "text-slate-300" : "text-slate-500"}`}>
                  <strong className="text-slate-400">Includes:</strong> {bp.includes}
                </div>

                <Link
                  href={bp.href}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    bp.popular
                      ? "bg-[#D4A24E] text-[#101D3D] hover:bg-[#E5B25B] shadow-md"
                      : "bg-[#1B2D5B] text-white hover:bg-[#2A4275]"
                  }`}
                >
                  <span>Apply for {bp.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-guarantee across all cards */}
        <div className="text-center max-w-3xl mx-auto text-xs text-slate-500 font-medium space-y-3">
          <p>
            All Blueprints include: Client Infrastructure Pass-Through (you pay AWS directly), Stop-the-Clock, No-Blame Early Exit. You keep everything.
          </p>
          <div>
            <Link
              href="/blueprint"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1B2D5B] hover:text-[#D4A24E] transition-colors"
            >
              <span>Explore Nisol 360™: The 30-360 Architecture Full Product Spec &amp; Radar Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: THREE PROMISES (Your iPhone Tech Specs)           */}
      {/* ============================================================ */}
      <section className="bg-[#101D3D] text-white py-20 border-t border-b border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D4A24E] font-mono font-bold">
              The Constitutional Guarantees
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Three Promises We Never Break.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Promise 1: 7 Days */}
            <div className="bg-[#0C1731] rounded-3xl p-8 border border-[#1B2D5B] space-y-4">
              <div className="text-4xl font-black text-[#D4A24E]">7 DAYS</div>
              <h3 className="text-xl font-bold text-white">Not 6 months.</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Board-ready in days, not quarters. We eliminate costly consulting drag and deliver empirical architecture while traditional firms are still scheduling kick-offs.
              </p>
            </div>

            {/* Promise 2: Zero Dependency */}
            <div className="bg-[#0C1731] rounded-3xl p-8 border border-[#1B2D5B] space-y-4">
              <div className="text-4xl font-black text-[#D4A24E]">ZERO DEPENDENCY</div>
              <h3 className="text-xl font-bold text-white">Your Blueprint. Your Data.</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We write zero code in discovery. You own the architecture forever. Build it with us or build it without us — the choice is permanently yours.
              </p>
            </div>

            {/* Promise 3: Board-Ready */}
            <div className="bg-[#0C1731] rounded-3xl p-8 border border-[#1B2D5B] space-y-4">
              <div className="text-4xl font-black text-[#D4A24E]">BOARD-READY</div>
              <h3 className="text-xl font-bold text-white">Not a slide deck.</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A museum-grade executive dossier featuring CFO financial models (NPV/IRR), unit economics, and 4 Go-Live decision gates your leadership can sign off on Monday.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: BEFORE / AFTER PROOF & TESTIMONIAL                */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-2">
          <Badge variant="golden" className="mx-auto font-mono">Proof Metrics</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1B2D5B] tracking-tight">
            Before vs. After Nisol One
          </h2>
        </div>

        {/* Side-by-Side Metric Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-rose-200/60 shadow-sm space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
              BEFORE NISOL (Standard Consulting)
            </div>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2 text-rose-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                6+ months of discovery drag
              </li>
              <li className="flex items-center gap-2 text-rose-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                ₹1.2 Cr average wasted exploratory spend
              </li>
              <li className="flex items-center gap-2 text-rose-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                0 production deployments shipped
              </li>
              <li className="flex items-center gap-2 text-rose-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Generic slide decks &amp; vendor lock-in
              </li>
            </ul>
          </div>

          <div className="bg-[#101D3D] text-white rounded-3xl p-8 border border-[#D4A24E] shadow-xl space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A24E]">
              AFTER NISOL ONE (7-Day Blueprint)
            </div>
            <ul className="space-y-3 text-sm text-slate-200 font-medium">
              <li className="flex items-center gap-2 text-[#D4A24E]">
                <Check className="w-4 h-4 text-[#D4A24E]" />
                7 business days to complete delivery
              </li>
              <li className="flex items-center gap-2 text-[#D4A24E]">
                <Check className="w-4 h-4 text-[#D4A24E]" />
                ₹4.5L fixed SOW — zero scope creep
              </li>
              <li className="flex items-center gap-2 text-[#D4A24E]">
                <Check className="w-4 h-4 text-[#D4A24E]" />
                CFO-ready NPV ₹2.9 Cr @ 147% IRR projected
              </li>
              <li className="flex items-center gap-2 text-[#D4A24E]">
                <Check className="w-4 h-4 text-[#D4A24E]" />
                Blueprint you own forever — build with anyone
              </li>
            </ul>
          </div>
        </div>

        {/* Client Quote */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="text-[#D4A24E] flex justify-center gap-1">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-lg">★</span>
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl font-extrabold text-[#1B2D5B] leading-snug max-w-2xl mx-auto">
            &ldquo;We went from AI confusion to a clear 12-month roadmap with full board approval — in 11 days.&rdquo;
          </blockquote>
          <div className="space-y-0.5">
            <div className="font-bold text-[#1B2D5B] text-sm">Chief Technology Officer</div>
            <div className="text-xs text-slate-500">Enterprise Logistics &amp; Supply Chain Client</div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: SCARCITY + CTA (Bottom)                            */}
      {/* ============================================================ */}
      <section className="bg-[#101D3D] text-white py-20 border-t border-[#1B2D5B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="golden" className="mx-auto font-mono">Controlled Scarcity</Badge>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            We Architect Only 5 Blueprints Per Month.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <p>
              Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.
            </p>
            <p className="text-sm text-slate-400">
              Applications are reviewed directly by master enterprise architects within 48 hours. Mutual NDA provided before any technical review.
            </p>
            <div className="text-xl font-black text-[#D4A24E] pt-2">
              Current Cohort: 2/5 engagements left.
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#101D3D] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
            >
              <span>Apply for Nisol 360™ — 2 Slots Left</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-xs text-slate-400 pt-2 font-mono">
            Strict Non-Disclosure Guarantee • No spam • No sales team. Only architects.
          </p>
        </div>
      </section>

    </div>
  );
}