"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  Lock,
  Compass,
  Check,
  Download,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// 15 Capabilities Data for the Radar Chart
const CAPABILITIES = [
  { name: "Leadership", score: 2.3, full: "Leadership & Vision" },
  { name: "Strategy", score: 1.8, full: "Business & AI Strategy" },
  { name: "Data Hygiene", score: 1.9, full: "Data Hygiene & Lakehouse" },
  { name: "Quality", score: 2.5, full: "Data Quality & Lineage" },
  { name: "Security", score: 2.0, full: "Zero-Trust & PII Security" },
  { name: "Governance", score: 1.7, full: "Agent Governance & Control" },
  { name: "Lakehouse", score: 2.2, full: "Real-time Vector Lakehouse" },
  { name: "Vector DB", score: 2.0, full: "Vector Database Architecture" },
  { name: "RAG Mesh", score: 2.4, full: "Hybrid RAG (BM25 + BGE-M3)" },
  { name: "Eval SLAs", score: 1.6, full: "Continuous Hallucination Eval" },
  { name: "User Exp", score: 2.1, full: "Executive & Employee UX" },
  { name: "Change Mgmt", score: 1.9, full: "OCM & Staff Upskilling" },
  { name: "FinOps", score: 2.3, full: "Unit Economics (Cost/Token)" },
  { name: "Risk Guard", score: 2.0, full: "Compliance & Fallback Protocol" },
  { name: "Scale Mesh", score: 2.2, full: "Multi-Agent Scale & Mesh" },
];

const PACKS = [
  {
    pack: "PACK 01",
    title: "Board Strategy",
    count: "5 Reports",
    items: [
      "CFO Investment Memo (DCF / NPV / IRR)",
      "15-Capability Engineering Strategy",
      "2D Executive Opportunity Matrix",
      "Single-Pod Execution Roadmap",
      "Minto Pyramid Executive Brief",
    ],
  },
  {
    pack: "PACK 02",
    title: "Opportunity Pack",
    count: "4 Reports",
    items: [
      "Bubble Opportunity Matrix",
      "Top 20 Enterprise Use Cases",
      "Quick Wins vs Strategic Bets",
      "Priority Execution Queue",
    ],
  },
  {
    pack: "PACK 03",
    title: "Transformation Pack",
    count: "6 Reports",
    items: [
      "30/60/90/180/360-Day Roadmap",
      "Deterministic CFO Model",
      "Vector Lakehouse Architecture Blueprint",
      "Top 5 System Architectures",
      "OCM & RACI Governance Matrix",
      "Risk & Go-Live Gate Protocol",
    ],
  },
];

const TIMELINE_GATES = [
  {
    day: "30 Days",
    tag: "30D",
    progress: "38%",
    title: "Audit & Foundation",
    desc: "Data hygiene, security perimeter, vector DB selection (pgvector / Qdrant)",
    gate: "Gate 0 • Foundation Sign-off",
  },
  {
    day: "60 Days",
    tag: "60D",
    progress: "52%",
    title: "Lakehouse & RAG",
    desc: "CDC real-time pipeline, hybrid search (BM25 + BGE-M3), enterprise RBAC",
    gate: "Pipeline Ready",
  },
  {
    day: "90 Days",
    tag: "90D",
    progress: "71%",
    title: "Pilot 1 Live",
    desc: "First use case into production with >95% citation accuracy & latency SLAs",
    gate: "Gate 1-2 • Production Gate",
  },
  {
    day: "180 Days",
    tag: "180D",
    progress: "84%",
    title: "Scale 3 Use Cases",
    desc: "Token economics constrained at ₹1.80/chunk, employee adoption >40%",
    gate: "Adoption & Scale Metrics",
  },
  {
    day: "360 Days",
    tag: "360D",
    progress: "100%",
    title: "Center of Excellence (CoE)",
    desc: "Autonomous multi-entity governance, enterprise agent mesh, valuation expansion",
    gate: "Gate 3 • CoE Charter",
  },
];

const BLUEPRINTS = [
  {
    id: "spark",
    code: "SPARK",
    name: "First Look Memo",
    duration: "3 Days",
    inr: "₹1,50,000",
    usd: "$1,800",
    popular: false,
    deliverables: [
      "1 Track Focus (Opportunity, Cost, or Data)",
      "8–10 Page Executive Briefing",
      "100% Fee Credit towards Nisol One",
      "Initial Risk & Hygiene Scan",
    ],
    cta: "Apply for Spark",
  },
  {
    id: "one",
    code: "ONE",
    name: "Nisol 360™: The 30-360 Architecture",
    duration: "7–11 Days",
    inr: "₹4,50,000",
    usd: "$5,500",
    popular: true,
    badge: "MOST POPULAR • 2 SLOTS LEFT",
    deliverables: [
      "Full 62-Question Audit across 15 Capabilities",
      "Radar Diagnostic + Opportunity Bubble Matrix",
      "30/60/90/180/360-Day Multi-Phase Roadmap",
      "15 Dossier Reports + Board Memorandum",
      "4 Go-Live Decision Gates & Risk Protocol",
    ],
    cta: "Apply for One — Recommended",
  },
  {
    id: "pro",
    code: "PRO",
    name: "Blueprint + Model",
    duration: "10–15 Days",
    inr: "₹8,50,000",
    usd: "$10,500",
    popular: false,
    deliverables: [
      "Everything in Nisol One",
      "CFO Financial Memo (NPV/IRR + Scenario Stress)",
      "Vector Lakehouse Architectural Blueprint",
      "OCM + RACI Matrix & 2 Staff Training Tracks",
    ],
    cta: "Apply for Pro",
  },
  {
    id: "enterprise",
    code: "ENTERPRISE",
    name: "The Full Vision",
    duration: "4–8 Weeks",
    inr: "₹18,50,000+",
    usd: "$22,500+",
    popular: false,
    deliverables: [
      "Multi-Entity & Global Subsidiary Audit",
      "Enterprise CoE Charter & Multi-Agent Mesh",
      "Shadow AI & Zero-Trust Governance Spec",
      "Board, Executive & Technical Upskilling Tracks",
    ],
    cta: "Apply for Enterprise",
  },
];

export default function BlueprintPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [activeCapability, setActiveCapability] = useState<number | null>(null);

  // SVG Radar Calculation
  const size = 380;
  const center = size / 2;
  const radius = size * 0.38;
  const totalPoints = CAPABILITIES.length;
  const angleSlice = (Math.PI * 2) / totalPoints;
  const startAngle = -Math.PI / 2;

  const getCoordinates = (angle: number, distance: number) => ({
    x: center + Math.cos(angle) * distance,
    y: center + Math.sin(angle) * distance,
  });

  // Target baseline polygon points
  const baselinePolygon = CAPABILITIES.map((cap, i) => {
    const dist = (cap.score / 5) * radius;
    const { x, y } = getCoordinates(startAngle + i * angleSlice, dist);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ") + " Z";

  // Target target polygon points (4.5 benchmark)
  const targetPolygon = CAPABILITIES.map((_, i) => {
    const dist = (4.4 / 5) * radius;
    const { x, y } = getCoordinates(startAngle + i * angleSlice, dist);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ") + " Z";

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-slate-900 selection:bg-[#D4A24E]/20">

      {/* 1. HERO: PRODUCT SPECIFICATION */}
      <section className="bg-[#0C1731] text-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#1B2D5B] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4A24E]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#1B2D5B]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101D3D] border border-[#D4A24E]/40 text-[#D4A24E] text-xs font-mono font-bold tracking-widest uppercase shadow-inner">
            <span>ENTERPRISE AI TRANSFORMATION ARCHITECTURE • NISOL 360™</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-[96px] font-black tracking-[-0.04em] leading-[0.92] text-white max-w-4xl mx-auto">
            NISOL 360™ <br />
            <span className="text-[#D4A24E]">THE 30-360 ARCHITECTURE</span>
          </h1>

          {/* Subtitle */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl text-slate-200 font-semibold leading-relaxed">
              <span className="text-[#D4A24E]">Nisol 360™</span> is our Enterprise AI Transformation Architecture.
            </p>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Diagnosis (Score™) → Architecture Spec → 30/60/90/180/360 Roadmap → 4 Go-Live Decision Gates → Bound Board Folio.
            </p>
            <p className="text-xs sm:text-sm font-mono text-slate-400">
              We architect, you own, anyone can build. 100% code-free discovery under a fixed-scope SOW.
            </p>
          </div>

          {/* Spec Bar (Tesla Style) */}
          <div className="pt-2 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300">
            <span className="text-white font-bold">7–11 Days Fixed</span>
            <span className="text-[#D4A24E]">•</span>
            <span className="text-white font-bold">62 Dimensions Audited</span>
            <span className="text-[#D4A24E]">•</span>
            <span className="text-white font-bold">15 Capabilities</span>
            <span className="text-[#D4A24E]">•</span>
            <span className="text-white font-bold">30/60/90/180/360 Roadmap</span>
          </div>

          {/* Primary CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#101D3D] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
            >
              <span>Apply for Nisol 360™ — 2/5 Left</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#sample"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#101D3D] hover:bg-[#1B2D5B] text-white font-bold text-base border border-[#1B2D5B] shadow-sm transition-all duration-200"
            >
              See Redacted Dossier Preview
            </a>
          </div>

          {/* Micro-trust */}
          <div className="text-xs font-mono text-slate-400 pt-2 flex flex-wrap items-center justify-center gap-4">
            <span>✓ Stop-the-Clock Clause</span>
            <span>✓ No-Blame Exit</span>
            <span>✓ Client Infra Pass-Through</span>
            <span>✓ 100% IP Handover</span>
          </div>

        </div>
      </section>

      {/* 2. THE INTERACTIVE TELEMETRY PREVIEW (RADAR + EXECUTION GATES) */}
      <section className="py-16 sm:py-24 bg-[#101D3D] text-white border-b border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#0C1731] border border-[#1B2D5B] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Radar Column */}
              <div className="lg:col-span-6 bg-[#081023] rounded-2xl border border-[#1B2D5B] p-6 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                    CAPABILITY MATRIX • 15 POINTS
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D4A24E] px-2 py-0.5 rounded bg-[#D4A24E]/10 border border-[#D4A24E]/30">
                    DIAGNOSTIC AUDIT
                  </span>
                </div>

                <div className="relative flex items-center justify-center">
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                    {/* Concentric rings */}
                    {[1, 2, 3, 4, 5].map((level) => {
                      const r = (level / 5) * radius;
                      return (
                        <circle
                          key={level}
                          cx={center}
                          cy={center}
                          r={r}
                          fill="none"
                          stroke={level === 5 ? "#D4A24E" : "#1B2D5B"}
                          strokeWidth={level === 5 ? 1.5 : 0.8}
                          strokeDasharray={level !== 5 ? "3 3" : ""}
                          opacity={level === 5 ? 0.6 : 0.4}
                        />
                      );
                    })}

                    {/* 15 Axes */}
                    {CAPABILITIES.map((cap, i) => {
                      const { x, y } = getCoordinates(startAngle + i * angleSlice, radius);
                      return (
                        <line
                          key={i}
                          x1={center}
                          y1={center}
                          x2={x}
                          y2={y}
                          stroke="#1B2D5B"
                          strokeWidth="0.8"
                        />
                      );
                    })}

                    {/* Target Polygon (Benchmark) */}
                    <path
                      d={targetPolygon}
                      fill="#D4A24E"
                      fillOpacity="0.06"
                      stroke="#D4A24E"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

                    {/* Baseline Polygon */}
                    <path
                      d={baselinePolygon}
                      fill="#D4A24E"
                      fillOpacity="0.22"
                      stroke="#D4A24E"
                      strokeWidth="2"
                    />

                    {/* Data Points */}
                    {CAPABILITIES.map((cap, i) => {
                      const dist = (cap.score / 5) * radius;
                      const { x, y } = getCoordinates(startAngle + i * angleSlice, dist);
                      const isHovered = activeCapability === i;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={isHovered ? 6 : 3.5}
                          fill={isHovered ? "#FFFFFF" : "#101D3D"}
                          stroke="#D4A24E"
                          strokeWidth="2"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setActiveCapability(i)}
                          onMouseLeave={() => setActiveCapability(null)}
                        />
                      );
                    })}

                    {/* Center Core */}
                    <circle cx={center} cy={center} r="3" fill="#D4A24E" />
                  </svg>

                  {/* Center Score Overlay */}
                  <div className="absolute text-center pointer-events-none">
                    <div className="text-3xl font-black text-white font-mono">2.1</div>
                    <div className="text-[10px] font-mono tracking-widest text-[#D4A24E] uppercase">
                      REACTIVE
                    </div>
                  </div>
                </div>

                {/* Score Details Bar */}
                <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#101D3D] p-2 rounded-lg border border-[#1B2D5B]">
                    <div className="text-slate-400">Leadership</div>
                    <div className="text-[#D4A24E] font-bold">2.3 / 5</div>
                  </div>
                  <div className="bg-[#101D3D] p-2 rounded-lg border border-[#1B2D5B]">
                    <div className="text-slate-400">Data Hygiene</div>
                    <div className="text-[#D4A24E] font-bold">1.9 / 5</div>
                  </div>
                  <div className="bg-[#101D3D] p-2 rounded-lg border border-[#1B2D5B]">
                    <div className="text-slate-400">Security</div>
                    <div className="text-[#D4A24E] font-bold">2.0 / 5</div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 pt-3 text-center">
                  {activeCapability !== null ? (
                    <span className="text-white font-semibold">
                      {CAPABILITIES[activeCapability].full}: {CAPABILITIES[activeCapability].score}/5.0
                    </span>
                  ) : (
                    <span>Hover over any axis point to inspect capability diagnostic score</span>
                  )}
                </div>
              </div>

              {/* Execution Gates Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                    30/60/90/180/360 EXECUTION GATES
                  </span>
                  <span className="text-xs font-mono text-[#D4A24E]">4 Go-Live Audits</span>
                </div>

                <div className="space-y-3">
                  {TIMELINE_GATES.map((gate) => (
                    <div
                      key={gate.tag}
                      className="bg-[#081023] border border-[#1B2D5B] rounded-xl p-4 flex items-center gap-4 hover:border-[#D4A24E]/50 transition-all"
                    >
                      <div className="w-12 text-sm font-mono font-black text-[#D4A24E]">
                        {gate.tag}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-white">{gate.title}</span>
                          <span className="font-mono text-slate-400">{gate.gate}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#101D3D] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D4A24E] rounded-full transition-all duration-500"
                            style={{ width: gate.progress }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">{gate.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4A24E]" />
                    <span>Deterministic Gates • Owner • Budget • SLA</span>
                  </div>
                  <span className="text-[#D4A24E]">Zero Drift Handover</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. INSIDE THE BOX ON DAY 7 (THE 15 DELIVERABLES ACROSS 3 PACKS) */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">DAY 7 PHYSICAL DELIVERABLE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            Inside the Box on Day 7.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Not a slide deck. A board-ready architecture, CFO financial model, and 4 Go-Live audit gates.
          </p>
          <div className="w-12 h-1 bg-[#D4A24E] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKS.map((pack) => (
            <div
              key={pack.pack}
              className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-black text-[#D4A24E] tracking-widest uppercase">
                    {pack.pack}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#FBF8F3] border border-slate-200 text-slate-600">
                    {pack.count}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#1B2D5B] tracking-tight group-hover:text-[#D4A24E] transition-colors">
                  {pack.title}
                </h3>

                <ul className="space-y-3 text-sm text-slate-600">
                  {pack.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E] mt-2 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Museum-Grade Dossier</span>
                <span className="text-[#D4A24E]">Day 7 Handover</span>
              </div>
            </div>
          ))}
        </div>

        {/* EXECUTIVE METHODOLOGY GUIDE DOWNLOAD BANNER */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#0C1731] via-[#101D3D] to-[#1B2D5B] border border-[#D4A24E]/40 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/20 text-[#D4A24E] border border-[#D4A24E]/30 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                Executive Methodology Guide
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FBF8F3]">
                AI Opportunity Mapping & Transformation Strategy
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The executive guide detailing how master enterprise architects evaluate enterprise maturity, map high-ROI opportunities, calculate unit economics, and de-risk agentic mesh deployments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
              <a
                href="/reports/AI-Opportunity-Mapping-&-Transformation-Strategy-Executive-Guide.pdf"
                download="AI-Opportunity-Mapping-and-Transformation-Strategy-Executive-Guide.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4A24E] hover:bg-[#b88937] text-[#0C1731] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg active:scale-95 flex-1 sm:flex-initial"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive Guide</span>
              </a>
              <a
                href="/reports/AI-Opportunity-Mapping-&-Transformation-Strategy-Executive-Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors flex-1 sm:flex-initial"
              >
                <span>Preview PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* PACKAGING THEATER: PHYSICAL LEATHER-BOUND FOLIO */}
        <div className="mt-16 rounded-3xl bg-[#0C1731] text-white p-8 sm:p-12 border border-[#1B2D5B] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#D4A24E_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101D3D] text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E] animate-pulse" />
                Physical Packaging Theater
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                The Board Folio: <br />
                <span className="text-[#D4A24E]">Archival Leather-Bound Artifact.</span>
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Code sits in Git repositories. Board decisions demand tangible weight. While every technical spec is pushed directly to your secure cloud, the architecture is physically delivered in an archival, museum-grade leather-bound folio with gold-foil seal and master architect stamp — engineered specifically for presentation to your Board of Directors and CFO.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#101D3D]/90 border border-white/10 rounded-xl p-4 space-y-1">
                  <div className="text-[#D4A24E] text-[11px] font-mono font-bold uppercase tracking-wider">GOLD-FOIL SEAL</div>
                  <div className="text-sm font-semibold text-white">Board Dossier</div>
                  <p className="text-xs text-slate-400">15-report physical dossier bound in full-grain archival leather.</p>
                </div>

                <div className="bg-[#101D3D]/90 border border-white/10 rounded-xl p-4 space-y-1">
                  <div className="text-[#D4A24E] text-[11px] font-mono font-bold uppercase tracking-wider">ARCHITECT STAMP</div>
                  <div className="text-sm font-semibold text-white">Verified Attestation</div>
                  <p className="text-xs text-slate-400">Embossed master architect sign-off on 4 Go-Live decision gates.</p>
                </div>

                <div className="bg-[#101D3D]/90 border border-white/10 rounded-xl p-4 space-y-1">
                  <div className="text-[#D4A24E] text-[11px] font-mono font-bold uppercase tracking-wider">CFO DEED</div>
                  <div className="text-sm font-semibold text-white">100% IP Assignment</div>
                  <p className="text-xs text-slate-400">Legal transfer deed granting zero vendor lock-in ownership.</p>
                </div>
              </div>
            </div>

            {/* Folio Visual Box Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-2xl bg-gradient-to-br from-[#1b1917] via-[#0C1731] to-[#101D3D] p-8 border-2 border-[#D4A24E]/50 shadow-[0_0_50px_rgba(212,162,78,0.15)] text-center space-y-6">
                
                {/* Gold Seal Medallion */}
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-b from-[#E5B25B] to-[#996515] p-[2px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-[#0C1731] flex flex-col items-center justify-center text-[#D4A24E] border border-[#D4A24E]/40">
                    <span className="text-[10px] font-mono uppercase tracking-tighter">NISOL</span>
                    <span className="text-lg font-black leading-none">360™</span>
                    <span className="text-[9px] font-mono tracking-widest text-slate-400">SEAL</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono tracking-widest text-[#D4A24E] uppercase font-bold">
                    OFFICIAL BOARD OF DIRECTORS ARTIFACT
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#FBF8F3]">
                    Enterprise Intelligence System Architecture
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Folio Serial: NISOL-360-FOLIO-ARCH
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D4A24E]/30 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>MUSEUM-GRADE LEATHER</span>
                  <span className="text-[#D4A24E] font-bold">HAND-DELIVERED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CFO-READY, NOT CONSULTANT-READY */}
      <section className="py-20 sm:py-28 bg-[#0C1731] text-white border-y border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="golden" className="font-mono">FINANCIAL RIGOR</Badge>
              
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                CFO-Ready, <br />
                Not Consultant-Ready.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Every blueprint includes deterministic DCF modeling with source-linked assumptions. Your CFO can defend it Monday morning in front of the board.
              </p>

              <ul className="space-y-4 text-sm sm:text-base text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>DCF / NPV / IRR Analysis:</strong> 5-year cash-flow forecasting with hardware, token, and engineer costs modeled.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>Granular Unit Economics:</strong> Exact cost per chunk, per query, and per agent action before writing code.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D4A24E] shrink-0 mt-0.5" />
                  <span><strong>3-Scenario Stress Testing:</strong> Adoption ramp sensitivity, pricing variation, and infra pass-through.</span>
                </li>
              </ul>
            </div>

            {/* Right Financial Model Card */}
            <div className="lg:col-span-6 bg-[#101D3D] rounded-3xl border border-[#1B2D5B] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-[#D4A24E] font-bold uppercase tracking-wider">CFO MODEL • DETERMINISTIC</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Audit Case: Enterprise Financial Dossier</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D4A24E] text-[#101D3D] font-mono font-black text-xs">
                  BOARD APPROVED
                </span>
              </div>

              <div className="mt-8">
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  NPV ₹2.9Cr <span className="text-[#D4A24E] text-2xl sm:text-3xl font-bold">@ 147% IRR</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-mono text-slate-300">
                  ₹1.80 per chunk / ₹1,250 per enterprise action • Blended token rate
                </div>
              </div>

              {/* 3 Stress Scenarios */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="bg-[#0C1731] border border-[#1B2D5B] rounded-xl p-3 text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-400">75% Adoption</div>
                  <div className="text-sm sm:text-base font-black text-slate-200 mt-1">₹1.6Cr NPV</div>
                </div>
                <div className="bg-[#0C1731] border border-[#D4A24E]/50 rounded-xl p-3 text-center shadow-inner">
                  <div className="text-[10px] font-mono uppercase text-[#D4A24E] font-bold">100% Base</div>
                  <div className="text-sm sm:text-base font-black text-white mt-1">₹2.9Cr NPV</div>
                </div>
                <div className="bg-[#0C1731] border border-[#1B2D5B] rounded-xl p-3 text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-400">125% Upside</div>
                  <div className="text-sm sm:text-base font-black text-slate-200 mt-1">₹4.4Cr NPV</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1B2D5B] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Payback Period: <strong>7.4 months</strong></span>
                <span className="text-[#D4A24E]">Gate-Linked Tranches →</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FOUR BLUEPRINTS: PRICING & TIERS (WITH CURRENCY TOGGLE) */}
      <section id="pricing" className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="golden" className="mx-auto font-mono">ENGAGEMENT TIERS</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2D5B] tracking-tight">
            Four Blueprints. Zero Ambiguity.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Fixed-price. Code-free discovery. You own 100% of the blueprint — build it with anyone.
          </p>

          {/* Currency Switcher */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-white border border-slate-300 rounded-full p-1 inline-flex shadow-sm">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  currency === "INR"
                    ? "bg-[#101D3D] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                India (₹ INR)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                  currency === "USD"
                    ? "bg-[#101D3D] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Global ($ USD)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLUEPRINTS.map((bp) => (
            <div
              key={bp.id}
              className={`rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                bp.popular
                  ? "bg-white border-2 border-[#D4A24E] shadow-2xl"
                  : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {bp.popular && (
                <div className="absolute -top-3.5 left-8 bg-[#D4A24E] text-[#101D3D] text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {bp.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-mono font-black text-[#D4A24E] tracking-widest uppercase">
                      {bp.code}
                    </div>
                    <h3 className="text-2xl font-black text-[#1B2D5B] mt-1">{bp.name}</h3>
                  </div>
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-[#FBF8F3] border border-slate-200 text-slate-700">
                    {bp.duration}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-[#1B2D5B]">
                  {currency === "INR" ? bp.inr : bp.usd}
                  <span className="text-xs font-mono text-slate-500 font-normal ml-2">Fixed Fee</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-600">
                  {bp.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4A24E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100">
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 gap-2 ${
                    bp.popular
                      ? "bg-[#D4A24E] hover:bg-[#E5B25B] text-[#101D3D] shadow-lg hover:shadow-xl font-black"
                      : "bg-[#101D3D] hover:bg-[#1B2D5B] text-white"
                  }`}
                >
                  <span>{bp.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs font-mono text-slate-500">
          All Blueprints include: Stop-the-Clock Clause • No-Blame Exit • Client Infra Pass-Through (you pay AWS directly).
        </div>
      </section>

      {/* 6. REDACTED DOSSIER SAMPLE PREVIEW */}
      <section id="sample" className="py-20 sm:py-28 bg-[#0C1731] text-white border-y border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge variant="golden" className="font-mono mb-3">MUSEUM-GRADE DOSSIER</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Sample Enterprise Dossier.
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
                Redacted samples from a recent enterprise intelligence audit. Complete 36-page unredacted dossier provided under mutual NDA.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#101D3D] font-bold text-sm transition-all shrink-0"
            >
              <span>Request Sample Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                page: "Page 12: Radar Diagnostic",
                title: "Capability Audit • 2.1/5 Reactive",
                bullets: ["Leadership & Strategy benchmark", "Data hygiene & vector DB choice", "Benchmark vs 8 enterprise peers"],
              },
              {
                page: "Page 21: Multi-Phase Roadmap",
                title: "30/60/90/180/360 Execution Plan",
                bullets: ["Gate 0 Foundation sign-off", "Gate 1-2 Pilot 1 production cutover", "Gate 3 Enterprise CoE Charter"],
              },
              {
                page: "Page 28: Audit Gate Protocol",
                title: "Deterministic Risk Checklist",
                bullets: ["Owner, budget & threshold verification", "Token unit economics monitoring", "Zero-trust PII security protocol"],
              },
            ].map((sample) => (
              <div
                key={sample.page}
                className="bg-[#101D3D] border border-[#1B2D5B] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#D4A24E] uppercase tracking-wider">
                    {sample.page}
                  </div>

                  {/* Redacted Simulated Document Preview */}
                  <div className="mt-4 h-40 bg-[#081023] border border-[#1B2D5B] rounded-xl p-4 relative overflow-hidden flex flex-col justify-center">
                    <div className="space-y-2.5 blur-[2.5px] opacity-40">
                      <div className="h-3 w-3/4 bg-white/30 rounded" />
                      <div className="h-2 w-full bg-white/20 rounded" />
                      <div className="h-2 w-5/6 bg-white/20 rounded" />
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="h-10 bg-[#D4A24E]/20 rounded border border-[#D4A24E]/30" />
                        <div className="h-10 bg-white/10 rounded" />
                        <div className="h-10 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-[#0C1731]/90 border border-white/20 text-[11px] font-mono text-slate-300 backdrop-blur-sm">
                        REDACTED PREVIEW
                      </span>
                    </div>
                  </div>

                  <h4 className="mt-5 text-base font-bold text-white">{sample.title}</h4>
                  <ul className="mt-2 space-y-1 text-xs text-slate-400">
                    {sample.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1B2D5B] text-xs font-mono text-slate-400">
                  NDA-Protected Document
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHAT BLUEPRINT IS NOT (THE DISRUPTION CONTRAST) */}
      <section className="py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <Badge variant="golden" className="font-mono">DISRUPTION PRINCIPLES</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1B2D5B] tracking-tight">
              What The Blueprint <br />Is NOT.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We stand apart from both traditional IT consultancies and boutique coding shops. Radical transparency from day one.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                t: "No code delivery in discovery",
                d: "Architecture first. Build second. You can't write production code before knowing latency SLAs.",
              },
              {
                t: "No vendor lock-in",
                d: "You own 100% of the architecture. Build with us, internal teams, or third-party agencies.",
              },
              {
                t: "No 120-slide generic decks",
                d: "Museum-grade board dossier with deterministic DCF models, Go-Live gates, and owner checklists.",
              },
              {
                t: "No 6-month consulting drag",
                d: "Fixed 7–11 business days. Two senior master architects only. No junior developer padding.",
              },
            ].map((item) => (
              <div key={item.t} className="flex gap-3 bg-white p-5 rounded-xl border border-slate-200">
                <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-rose-500 font-bold text-xs">✕</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1B2D5B] leading-tight">{item.t}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CONTROLLED SCARCITY & APPLICATION CLOSER */}
      <section className="py-20 sm:py-28 bg-[#101D3D] text-white border-t border-[#1B2D5B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="golden" className="mx-auto font-mono">CONTROLLED SCARCITY</Badge>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            We Architect Only 5 Nisol 360™ Engagements Per Month.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <p>
              Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.
            </p>
            <div className="text-2xl font-black text-[#D4A24E] pt-2 font-mono">
              Current Cohort: 2/5 Nisol 360™ Left.
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

          <p className="text-xs text-slate-400 pt-3 font-mono">
            Strict Non-Disclosure Guarantee • Direct Founding Partner Access • Zero Vendor Lock-in
          </p>
        </div>
      </section>

    </div>
  );
}
