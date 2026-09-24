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
  FileText,
  Compass,
  X as XIcon,
  HelpCircle,
  Database,
  BarChart3
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

// Differentiator Comparison
const SPEED_COMPARISON = [
  {
    dimension: "Speed & Timeline",
    traditional: "8–12 weeks consulting drag",
    nisol: "7–11 business days, fixed"
  },
  {
    dimension: "Architect Caliber",
    traditional: "Junior analysts learning on your budget",
    nisol: "2-Person Master Architect Pod (40+ yrs)"
  },
  {
    dimension: "Deliverable Format",
    traditional: "Generic 120-slide PowerPoint decks",
    nisol: "3-Pack Board Dossier + CFO Model"
  },
  {
    dimension: "Commercial Model",
    traditional: "Open-ended time & materials",
    nisol: "Fixed-price SOW by outcome"
  },
  {
    dimension: "Architecture Ownership",
    traditional: "Proprietary vendor lock-in",
    nisol: "100% Blueprint ownership — no dependency"
  }
];

// The 3-Pack Board Dossier (15 Reports)
const DELIVERABLE_PACKS = [
  {
    id: "pack-01",
    tag: "PACK 01",
    title: "BOARD STRATEGY",
    count: "5 Reports",
    summary: "For the Board of Directors, CEO, and Investment Committee.",
    reports: [
      "CFO & Board Investment Memorandum (DCF, NPV, IRR, 3-scenario stress test + Board Resolution)",
      "15-Capability Transformation Strategy (vs industry median & leader)",
      "2D Opportunity Matrix (Top 20 Enterprise Use Cases)",
      "Single-Pod Roadmap (30 / 60 / 90 / 180 / 360 days)",
      "Minto Pyramid Executive Brief & Core Thesis"
    ]
  },
  {
    id: "pack-02",
    tag: "PACK 02",
    title: "OPPORTUNITY PACK",
    count: "4 Reports",
    summary: "For Department Heads, Product Owners, and BU Leaders.",
    reports: [
      "2D Bubble Matrix: High-Impact vs Technical Feasibility",
      "Top 20 Prioritized Enterprise Use Cases Catalog",
      "High-ROI Quick Wins vs Strategic Moonshot Bets",
      "Production Execution Queue with Dependency Graph"
    ]
  },
  {
    id: "pack-03",
    tag: "PACK 03",
    title: "TRANSFORMATION & GOVERNANCE",
    count: "6 Reports",
    summary: "For CTO, CIO, Chief Data Officer, and SecOps.",
    reports: [
      "30/90/180/360-Day Roadmap with KPIs, Capital Budget, RACI",
      "CFO Operational Financial Model (NPV / IRR / Token OPEX)",
      "Vector Lakehouse Blueprint (pgvector/Qdrant + Hybrid BM25 + BGE-M3 + CDC + RBAC)",
      "Top 5 Solution Architectures (Systems specifications, not code)",
      "Organizational Change Management (OCM) & RACI Matrix",
      "5x5 DPDP & EU AI Act Risk Matrix + Empirical PoC Gate Protocol"
    ]
  }
];

// 4 Blueprints Pricing Data
const BLUEPRINTS = [
  {
    id: "spark",
    name: "Nisol Spark",
    subtitle: "The First Look Memo",
    duration: "3 Business Days",
    inr: "₹1,50,000",
    usd: "$1,800 USD",
    summary: "1 Focus Track: AI Opportunity, Cost Audit, or Data Compliance check.",
    details: [
      "1 Senior Enterprise Architect",
      "8–10 Page Executive Brief",
      "Go / No-Go Memo with unit economics preview",
      "100% credited toward One if upgraded within 30 days"
    ],
    ctaText: "Apply for Spark",
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
    summary: "Full 62-Q Diagnostic across 15 Capabilities + 8-industry benchmark.",
    details: [
      "2 Master Enterprise Architects (Pod)",
      "Radar + 2D Opportunity Matrix + Top 5 Quick Wins",
      "30/60/90/180/360-Day Roadmap + Basic Capital Budget",
      "Executive Readout & Findings Session"
    ],
    ctaText: "Apply for One — 2 slots left",
    popular: true,
    slotsLeft: "MOST POPULAR",
  },
  {
    id: "pro",
    name: "Nisol Pro",
    subtitle: "The Blueprint + Model",
    duration: "10–15 Business Days",
    inr: "₹8,50,000",
    usd: "$10,500 USD",
    summary: "Everything in One + Full financial model (NPV/IRR) + Lakehouse plan.",
    details: [
      "CFO Investment Memo (DCF, NPV, IRR) + 3-scenario stress test",
      "Vector Lakehouse Blueprint + 5-Dimension Scorecard",
      "15 Department Action Briefs + 5x5 Risk Register",
      "OCM & RACI Governance + 2 Training Tracks Included"
    ],
    ctaText: "Apply for Pro",
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
    summary: "Multi-entity architecture, custom AI CoE charter, empirical PoC gates.",
    details: [
      "Shadow AI Exposure + Zero-Trust PII Gateway Spec",
      "Multi-LLM Switch-Cost Teardown & Vendor Dependency Audit",
      "36-Month 3-Horizon Roadmap + Valuation Multiple Model",
      "AI Center of Excellence (CoE) Charter & Multi-Entity Governance"
    ],
    ctaText: "Apply for Enterprise",
    popular: false,
    slotsLeft: null,
  },
];

const FOUR_GATES = [
  { gate: "Gate 0", title: "Architecture & Data Audit", desc: "Verifies data hygiene, lakehouse readiness, and token cost models." },
  { gate: "Gate 1", title: "Citation Accuracy >95%", desc: "Evaluates zero-hallucination thresholds on domain-specific gold sets." },
  { gate: "Gate 2", title: "Zero-Trust Security & PII", desc: "Validates tenant isolation, encrypted boundaries, and air-gap proxies." },
  { gate: "Gate 3", title: "Production Economics", desc: "Confirms OPEX per query, latency SLAs, and CFO ROI breakeven." }
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

export default function DiscoveryPage() {
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
      {/* 1. HERO SECTION (Apple / Tesla Style Product Reveal)          */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] bg-[#101D3D] text-white flex flex-col justify-center pt-24 pb-20 overflow-hidden border-b border-[#1B2D5B]">
        {/* Glow & Architectural Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1B2D5B_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D4A24E]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
          
          {/* Micro Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2D5B]/90 border border-[#D4A24E]/40 text-[#D4A24E] text-xs font-semibold tracking-wider uppercase font-mono shadow-lg">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4A24E] animate-pulse" />
            <span>ENTERPRISE AI TRANSFORMATION ARCHITECTURE • NISOL 360™</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] text-white select-none">
              Your Enterprise, <br />
              <span className="text-[#D4A24E]">
                Architected in 7 Days.
              </span>
            </h1>

            <div className="text-lg sm:text-2xl text-slate-200 font-semibold tracking-tight max-w-3xl mx-auto pt-2">
              <span className="text-[#D4A24E]">Nisol 360™</span> is our Enterprise AI Transformation Architecture.
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
              Diagnosis (Score™) → Architecture Spec → 30/60/90/180/360 Roadmap → 4 Go-Live Decision Gates → Board Dossier. Master enterprise architects. Zero code in discovery. Zero vendor lock-in. You own it.
            </p>
          </div>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#101D3D] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
            >
              <span>Apply for Nisol 360™ Architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blueprint"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#1B2D5B]/80 hover:bg-[#1B2D5B] text-slate-200 hover:text-white border border-[#D4A24E]/30 font-semibold text-base transition-all duration-200"
            >
              See Blueprint Product Spec
            </Link>
          </div>

          {/* Micro-trust under CTA */}
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
              <Check className="w-4 h-4 text-[#D4A24E]" /> 48h Architect Review
            </span>
          </div>

          {/* Hero Visual: 15-Capability Radar & 30-360 Rhythm */}
          <div className="pt-12 max-w-3xl mx-auto">
            <div className="bg-[#0C1731] p-6 sm:p-8 rounded-3xl border border-[#1B2D5B] shadow-2xl relative">
              <div className="text-center space-y-1 mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#D4A24E]">
                  Artifact Preview • Redacted Novatech Case
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  15 Capabilities Benchmark vs. Target 360 Architecture
                </h3>
              </div>

              {/* Radar SVG */}
              <div className="relative max-w-[420px] mx-auto">
                <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto drop-shadow-xl select-none">
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((lvl, i) => (
                    <circle key={i} cx={cx} cy={cy} r={radius * lvl} fill="none" stroke="#1B2D5B" strokeWidth="1.2" strokeDasharray={i === 4 ? "none" : "3 3"} />
                  ))}
                  {CAPABILITIES_15.map((_, i) => {
                    const angle = (Math.PI * 2 / 15) * i - Math.PI / 2;
                    return <line key={i} x1={cx} y1={cy} x2={cx + radius * Math.cos(angle)} y2={cy + radius * Math.sin(angle)} stroke="#1B2D5B" strokeWidth="1" />;
                  })}
                  <polygon points={targetPoints} fill="rgba(212, 162, 78, 0.22)" stroke="#D4A24E" strokeWidth="2.5" />
                  <polygon points={baselinePoints} fill="rgba(217, 79, 79, 0.18)" stroke="#D94F4F" strokeWidth="1.8" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* 30/60/90/180/360 Horizon Ribbon */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-5 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-[#1B2D5B]/50">
                  <div className="text-[#D4A24E] font-bold">30D</div>
                  <div className="text-[10px] text-slate-400">Foundation</div>
                </div>
                <div className="p-2 rounded-lg bg-[#1B2D5B]/50">
                  <div className="text-[#D4A24E] font-bold">60D</div>
                  <div className="text-[10px] text-slate-400">Lakehouse</div>
                </div>
                <div className="p-2 rounded-lg bg-[#1B2D5B]/50">
                  <div className="text-[#D4A24E] font-bold">90D</div>
                  <div className="text-[10px] text-slate-400">First Pilot</div>
                </div>
                <div className="p-2 rounded-lg bg-[#1B2D5B]/50">
                  <div className="text-[#D4A24E] font-bold">180D</div>
                  <div className="text-[10px] text-slate-400">Multi-Agent</div>
                </div>
                <div className="p-2 rounded-lg bg-[#1B2D5B]/80 border border-[#D4A24E]/40">
                  <div className="text-[#D4A24E] font-bold">360D</div>
                  <div className="text-[10px] text-white">Full CoE</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SPEED COMPARISON — THE ANTI-CONSULTING STANDARD            */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto font-mono">The Comparison</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            The Anti-Consulting Standard
          </h2>
          <p className="text-base text-slate-600">
            Why traditional enterprise AI discovery takes 3-6 months and delivers slide decks that never ship.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            {/* Column 1: Traditional Consulting */}
            <div className="p-8 space-y-6 bg-slate-50/50">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
                  TRADITIONAL CONSULTING
                </span>
                <h3 className="text-xl font-bold text-slate-800">The 6-Month Consulting Drag</h3>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3 text-rose-700">
                  <XIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>8–12 weeks</strong> of endless workshops and interview drag</span>
                </li>
                <li className="flex items-start gap-3 text-rose-700">
                  <XIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Junior analysts learning machine learning on your budget</span>
                </li>
                <li className="flex items-start gap-3 text-rose-700">
                  <XIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Generic 120-slide PowerPoint deck that never ships to users</span>
                </li>
                <li className="flex items-start gap-3 text-rose-700">
                  <XIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Open-ended time &amp; materials billing with constant scope creep</span>
                </li>
                <li className="flex items-start gap-3 text-rose-700">
                  <XIcon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Proprietary vendor lock-in — you can&apos;t build without them</span>
                </li>
              </ul>
            </div>

            {/* Column 2: The Nisol One Standard */}
            <div className="p-8 space-y-6 bg-[#101D3D] text-white">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A24E]">
                  THE NISOL ONE STANDARD
                </span>
                <h3 className="text-xl font-bold text-white">The 7-Day Mathematical Truth</h3>
              </div>

              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3 text-[#D4A24E]">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>7–11 business days</strong> fixed from kickoff to CFO readout</span>
                </li>
                <li className="flex items-start gap-3 text-[#D4A24E]">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>2-Person Master Architect Pod</strong> with 40+ years enterprise systems experience</span>
                </li>
                <li className="flex items-start gap-3 text-[#D4A24E]">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>3-Pack Board Dossier</strong> + CFO financial model (NPV, IRR, Token OPEX)</span>
                </li>
                <li className="flex items-start gap-3 text-[#D4A24E]">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>Fixed-price SOW</strong> tied strictly to concrete board deliverables</span>
                </li>
                <li className="flex items-start gap-3 text-[#D4A24E]">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>100% Blueprint ownership</strong> — build with anyone, zero dependency</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT YOU GET ON DAY 7 (The 3-Pack Board Dossier)           */}
      {/* ============================================================ */}
      <section id="packs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">15 Board Deliverables</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            What You Get on Day 7.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Not a slide deck. A board-ready architecture + audit plan for 30 / 60 / 90 / 180 / 360 days.
          </p>
        </div>

        {/* 3 Visual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DELIVERABLE_PACKS.map((pack) => (
            <div
              key={pack.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#D4A24E] uppercase">
                    {pack.tag}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1B2D5B]/10 text-[#1B2D5B]">
                    {pack.count}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#1B2D5B]">{pack.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{pack.summary}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Reports &amp; Specifications:
                  </span>
                  <ul className="space-y-2.5">
                    {pack.reports.map((report, rIdx) => (
                      <li key={rIdx} className="text-xs font-medium text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4A24E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{report}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                Included inside Nisol One bound dossier.
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs sm:text-sm text-slate-500 font-mono max-w-2xl mx-auto pt-2">
          Full 15-report list delivered as a museum-grade bound dossier. Custom leather binding with gold-foil seal available upon board request.
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THE CORE DIFFERENCE (We Architect. You Own.)              */}
      {/* ============================================================ */}
      <section className="bg-[#101D3D] text-white py-20 border-t border-b border-[#1B2D5B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <Badge variant="golden" className="mx-auto font-mono">Independence Guarantee</Badge>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            We Architect. You Own. Anyone Can Build.
          </h2>

          <div className="space-y-6 text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            <p>
              Discovery is code-free. We write zero lines of code in this phase.
            </p>
            <p className="text-sm sm:text-base text-slate-300">
              That&apos;s intentional. You get the complete 30/60/90/180/360 architecture, data lakehouse blueprint, financial model, staff upskilling plan, and 4 Go-Live Audit Gates.
            </p>
          </div>

          {/* The 3 Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-2">
            <div className="bg-[#0C1731] p-6 rounded-2xl border border-[#1B2D5B] space-y-2">
              <div className="text-xs font-mono font-bold text-[#D4A24E]">OPTION A</div>
              <h3 className="text-lg font-bold text-white">Build with Nisol</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hire Nisol AI engineering to build what we architected. Milestone delivery with zero-lock-in handover.
              </p>
            </div>

            <div className="bg-[#0C1731] p-6 rounded-2xl border border-[#1B2D5B] space-y-2">
              <div className="text-xs font-mono font-bold text-[#D4A24E]">OPTION B</div>
              <h3 className="text-lg font-bold text-white">Nisol Manages &amp; Audits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your internal team builds. Our master architects audit every sprint against the 4 Go-Live decision gates.
              </p>
            </div>

            <div className="bg-[#0C1731] p-6 rounded-2xl border border-[#1B2D5B] space-y-2">
              <div className="text-xs font-mono font-bold text-[#D4A24E]">OPTION C</div>
              <h3 className="text-lg font-bold text-white">Build with Anyone</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hand the Blueprint to any systems integrator or internal team. The Blueprint is yours. No strings attached.
              </p>
            </div>
          </div>

          {/* 4 Go-Live Audit Decision Gates */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <div className="text-xs uppercase tracking-widest font-mono font-bold text-[#D4A24E]">
              THE 4 GO-LIVE AUDIT DECISION GATES INCLUDED
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {FOUR_GATES.map((g, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#1B2D5B]/50 border border-white/10 space-y-1">
                  <div className="text-xs font-mono font-bold text-[#D4A24E]">{g.gate}</div>
                  <div className="text-sm font-bold text-white">{g.title}</div>
                  <div className="text-xs text-slate-400">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            Client Infrastructure Pass-Through: You pay AWS, GCP, or Azure directly. We never touch or markup your data.
          </p>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. THE 4 BLUEPRINTS — FIXED-PRICE. ZERO AMBIGUITY.           */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">Pricing Architecture</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            Four Blueprints. Zero Ambiguity.
          </h2>
          <p className="text-base text-slate-600">
            Fixed-price SOW. Code-free discovery. You own the architecture.
          </p>

          {/* Currency Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-300 shadow-xs">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === "INR" ? "bg-[#1B2D5B] text-white shadow-xs" : "text-slate-600 hover:text-[#1B2D5B]"
              }`}
            >
              India (INR ₹)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === "USD" ? "bg-[#1B2D5B] text-white shadow-xs" : "text-slate-600 hover:text-[#1B2D5B]"
              }`}
            >
              Global (USD $)
            </button>
          </div>
        </div>

        {/* 4 Blueprint Cards */}
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
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    bp.popular ? "bg-[#D4A24E] text-[#101D3D] font-black" : "bg-slate-100 text-slate-700"
                  }`}>
                    {bp.popular ? "MOST POPULAR" : "FIXED SOW"}
                  </span>
                  <span className={`text-xs font-medium ${bp.popular ? "text-slate-300" : "text-slate-500"}`}>
                    {bp.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-1">{bp.name}</h3>
                <div className="text-xs font-bold text-[#D4A24E] mb-4">{bp.subtitle}</div>

                <div className="mb-4">
                  <div className="text-3xl font-black">
                    {currency === "INR" ? bp.inr : bp.usd}
                  </div>
                  <div className={`text-xs ${bp.popular ? "text-slate-400" : "text-slate-500"}`}>
                    Fixed SOW • Outcome-based
                  </div>
                </div>

                <p className={`text-xs leading-relaxed mb-6 ${bp.popular ? "text-slate-200" : "text-slate-600"}`}>
                  {bp.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200/20 mb-6">
                  <span className={`text-[10px] uppercase font-bold tracking-wider block ${bp.popular ? "text-[#D4A24E]" : "text-slate-400"}`}>
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2 text-xs">
                    {bp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${bp.popular ? "text-[#D4A24E]" : "text-emerald-600"}`} />
                        <span className={bp.popular ? "text-slate-300" : "text-slate-700"}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/20">
                <Link
                  href="/contact"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    bp.popular
                      ? "bg-[#D4A24E] text-[#101D3D] hover:bg-[#E5B25B] shadow-md"
                      : "bg-[#1B2D5B] text-white hover:bg-[#2A4275]"
                  }`}
                >
                  <span>{bp.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 font-mono">
          All Blueprints: You own the architecture. No code in discovery. No dependency on us.
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SECURITY & DATA SOVEREIGNTY                                */}
      {/* ============================================================ */}
      <section className="bg-[#101D3D] text-white py-20 border-t border-b border-[#1B2D5B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D4A24E] font-mono font-bold">
              Data Sovereignty
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Enterprise Security &amp; Zero Public Training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-[#0C1731] p-8 rounded-3xl border border-[#1B2D5B] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B2D5B] flex items-center justify-center text-[#D4A24E]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Zero Public Model Training</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your workshop responses, internal metrics, and raw architecture data are never used to train external LLMs. Every audit is tenant-isolated, encrypted at rest and in transit.
              </p>
            </div>

            <div className="bg-[#0C1731] p-8 rounded-3xl border border-[#1B2D5B] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B2D5B] flex items-center justify-center text-[#D4A24E]">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Enterprise Tenant &amp; Portal</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Isolated cloud databases with strict Role-Based Access Control (RBAC). Leadership receives a secure, read-only client portal to inspect progress and download signed blueprints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FINAL CONTROLLED SCARCITY CLOSE                            */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <Badge variant="golden" className="mx-auto font-mono">Controlled Scarcity</Badge>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
          We Architect Only 5 Blueprints Per Month.
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <p>
            Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.
          </p>
          <p className="text-sm text-slate-500">
            Applications are reviewed directly by master enterprise architects within 48 hours. Mutual NDA provided prior to any technical review.
          </p>
          <div className="text-xl font-black text-[#D4A24E] pt-2">
            Current Cohort: 2/5 left.
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
        </div>

        <p className="text-xs text-slate-400 pt-2 font-mono">
          Strict Non-Disclosure Guarantee • No spam • Only architects.
        </p>
      </section>
    </div>
  );
}
