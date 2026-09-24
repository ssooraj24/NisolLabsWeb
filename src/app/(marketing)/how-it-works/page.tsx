"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  X as XIcon, 
  ShieldCheck, 
  Lock, 
  Clock, 
  FileCheck, 
  Layers, 
  ChevronRight,
  Database,
  Sparkles,
  ExternalLink
} from "lucide-react";

// 6 Chronological Stages: Day 0 Audit + Days 1-7 Architecture
const SPRINT_STAGES = [
  {
    day: "Day 0",
    stageNumber: "AUDIT",
    title: "AI Maturity Audit (Nisol Score™ Baseline)",
    desc: "Before architecting the system, we audit where your enterprise stands. We run the Nisol Score™ diagnostic across 15 capabilities and 62 dimensions to quantify the gap between current baseline (typically 2.1/5) and board targets (4.2/5).",
    outputs: [
      "15-capability baseline radar benchmarked vs 8 industries",
      "Data hygiene, PII vulnerability, and shadow AI forensic audit",
      "Architect-validated diagnostic establishing baseline for Nisol 360™"
    ]
  },
  {
    day: "Day 1",
    stageNumber: "01 / 05",
    title: "Immersion & Data Room Launch",
    desc: "Leadership & CTO alignment workshops, diagnostic dispatch, and secure data room audit. Master enterprise architects on-site or remote.",
    outputs: [
      "Enterprise Data Room clearance under mutual NDA",
      "62-question readiness diagnostic dispatch",
      "Executive alignment & priority charter"
    ]
  },
  {
    day: "Day 2–3",
    stageNumber: "02 / 05",
    title: "62-Dimension Audit & Cohort Benchmark",
    desc: "15 capability scoring (2.1/5 Reactive baseline), 8-industry benchmark, data hygiene teardown, security posture assessment, and token economics profiling (₹1.80/chunk analysis).",
    outputs: [
      "15-capability empirical baseline radar (vs industry median & leader)",
      "Infrastructure & latency bottleneck profiling",
      "Token economics & chunk retrieval cost teardown"
    ]
  },
  {
    day: "Day 4–5",
    stageNumber: "03 / 05",
    title: "360 Architecture & CFO Financial Modeling",
    desc: "30/60/90/180/360-day single-pod execution roadmap, vector lakehouse blueprint (pgvector/Qdrant + Hybrid BM25 + BGE-M3 + CDC + RBAC), and CFO 3-scenario financial model (NPV, IRR, Payback).",
    outputs: [
      "Vector Lakehouse architecture specification (no vendor lock-in)",
      "Top 5 prioritized solution architectures (production specs, not code)",
      "CFO Board Investment Memo (DCF, NPV, IRR, 3-scenario stress test)"
    ]
  },
  {
    day: "Day 6",
    stageNumber: "04 / 05",
    title: "Stress Test & 4 Go-Live Decision Gates",
    desc: "Verification against 4 Go-Live Decision Gates (Accuracy >95% citation, Zero-Trust PII, Usability >40%, Production Economics <2s), RACI matrix, Organizational Change Management (OCM), and Stop-the-Clock review.",
    outputs: [
      "4 Go-Live Audit Gates verification protocol",
      "5x5 DPDP & EU AI Act Risk Register",
      "Organizational Change Management (OCM) & RACI matrix"
    ]
  },
  {
    day: "Day 7",
    stageNumber: "05 / 05",
    title: "Museum-Grade Board Dossier Delivery",
    desc: "Complete 15-report 3-pack bound dossier delivered alongside Minto Pyramid Executive Brief. 48-hour board review readout call with master enterprise architects. Your CFO presents Monday.",
    outputs: [
      "15-report 3-Pack Executive Board Dossier",
      "1-page Minto Pyramid Board Brief & Core Thesis",
      "48-hour executive readout call directly with master architects"
    ]
  }
];

// Anti-Consulting Contrast Data
const TRADITIONAL_CONSULTING = [
  "8–12 weeks of consulting drag & interview loops",
  "Junior analysts learning machine learning on your budget",
  "Generic 120-slide PowerPoint decks that gather dust",
  "Open-ended time & materials with endless scope creep",
  "Proprietary vendor lock-in — cannot build without them",
  "Slow stakeholder alignment with zero mathematical proof"
];

const NISOL_360_STANDARD = [
  "7–11 business days fixed sprint duration",
  "2-Person Master Pod with 40+ years enterprise experience",
  "3-Pack Board Dossier + CFO model (NPV, IRR, Token OPEX)",
  "Fixed-price SOW tied strictly to concrete board deliverables",
  "100% Blueprint ownership — build with anyone, zero dependency",
  "Board-ready Monday morning for executive approval"
];

// 3 Contractual SOW Guarantees
const SOW_GUARANTEES = [
  {
    number: "01",
    title: "Stop-the-Clock Clause",
    description: "If we are waiting on your data, security clearance, or internal team, the sprint clock stops immediately. You never pay for our waiting time. Timeboxed sprints only."
  },
  {
    number: "02",
    title: "No-Blame Exit",
    description: "If Gate 0 fails (data hygiene or security readiness is not ready for production AI), you exit cleanly with a full audit and pay only for work completed. No blame. No lock-in."
  },
  {
    number: "03",
    title: "Client Infra Pass-Through",
    description: "You pay AWS, GCP, or Azure directly. We never touch, markup, or own your data. Tenant-isolated infrastructure, strict RBAC, and zero public model training."
  }
];

// Delivery Options Post-360
const DELIVERY_OPTIONS = [
  {
    tag: "OPTION A",
    glyph: "◐",
    title: "Build with Nisol",
    description: "Our elite engineering team builds what we architected. Milestone-based delivery with full zero-lock handover. You own every line of code."
  },
  {
    tag: "OPTION B",
    glyph: "◎",
    title: "Nisol Manages & Audits",
    description: "Your internal engineering team builds the solution. Our senior enterprise architects audit every sprint against the 4 Go-Live Decision Gates. Deterministic."
  },
  {
    tag: "OPTION C",
    glyph: "◑",
    title: "Build with Anyone",
    description: "Hand the Nisol 360™ blueprint to any systems integrator, internal team, or third-party vendor. The architecture is 100% yours. No strings. No dependency."
  }
];

export default function HowItWorksPage() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div className="bg-[#FBF8F3] text-[#0C1731] antialiased">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION: Apple/Tesla Style Process Reveal            */}
      {/* ============================================================ */}
      <section className="relative min-h-[85vh] bg-[#0C1731] text-white flex flex-col justify-center pt-28 pb-24 overflow-hidden border-b border-[#1B2D5B]">
        {/* Glow & Radial Architecture Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1B2D5B_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4A24E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101D3D] border border-[#D4A24E]/40 text-[#D4A24E] text-xs font-semibold tracking-widest uppercase font-mono shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E] animate-pulse" />
            <span>PROCESS • 7 DAYS • 2 ARCHITECTS</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
              How It Works
            </h1>

            <h2 className="text-xl sm:text-3xl md:text-4xl text-slate-100 font-light tracking-tight pt-2">
              Master enterprise architects. <span className="font-semibold text-[#D4A24E]">Zero vendor lock-in.</span>
            </h2>

            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal pt-2">
              Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.
            </p>
          </div>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#0C1731] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
            >
              <span>Apply for Nisol 360™ — 2/5 Left</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blueprint"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#101D3D] hover:bg-[#162752] text-slate-200 hover:text-white border border-[#D4A24E]/30 font-semibold text-base transition-all duration-200"
            >
              See Blueprint Product Spec
            </Link>
          </div>

          {/* Micro-Trust Strip */}
          <div className="pt-2 text-xs sm:text-sm text-slate-400 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono">
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
              <Check className="w-4 h-4 text-[#D4A24E]" /> 48h Direct Architect Review
            </span>
          </div>

          {/* Hero Rhythm Visual: Day 01 to Day 07 Vertical Alternating Axis */}
          <div className="pt-12 pb-4 max-w-sm mx-auto">
            <div className="bg-[#101D3D]/90 p-6 sm:p-8 rounded-3xl border border-[#1B2D5B] shadow-2xl relative">
              <div className="text-center space-y-1 mb-8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4A24E]">
                  Deterministic Cadence
                </span>
                <div className="text-sm font-bold text-white">7-Day Execution Timeline</div>
              </div>

              {/* Vertical timeline line */}
              <div className="relative py-2 max-w-[280px] mx-auto">
                <div 
                  className="absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2"
                  style={{ background: "linear-gradient(to bottom, #D4A24E 0%, rgba(212,162,78,0.2) 100%)" }}
                />

                <div className="space-y-4 relative z-10">
                  {[
                    { day: "DAY 01", label: "Immersion & Data Room", side: "left" },
                    { day: "DAY 02", label: "Diagnostic Audit", side: "right" },
                    { day: "DAY 03", label: "Benchmarking", side: "left" },
                    { day: "DAY 04", label: "Vector Lakehouse", side: "right" },
                    { day: "DAY 05", label: "CFO Model & 360", side: "left" },
                    { day: "DAY 06", label: "4 Gate Stress Test", side: "right" },
                    { day: "DAY 07", label: "Board Dossier", side: "left", highlight: true }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      {item.side === "left" ? (
                        <>
                          <div className="w-[42%] text-right font-mono font-bold text-[#D4A24E]">
                            {item.day}
                            <span className="block text-[10px] font-normal text-slate-300 truncate">{item.label}</span>
                          </div>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D4A24E] bg-[#0C1731] shadow-[0_0_8px_rgba(212,162,78,0.8)] shrink-0 z-20" />
                          <div className="w-[42%]" />
                        </>
                      ) : (
                        <>
                          <div className="w-[42%]" />
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D4A24E] bg-[#0C1731] shadow-[0_0_8px_rgba(212,162,78,0.8)] shrink-0 z-20" />
                          <div className="w-[42%] text-left font-mono font-bold text-[#D4A24E]">
                            {item.day}
                            <span className="block text-[10px] font-normal text-slate-300 truncate">{item.label}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] font-mono text-slate-400">
                Museum-grade dossier delivered on Day 7. CFO presents Monday.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CHRONOLOGICAL STAGES: From Kickoff to Board Memo in 7 Days */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/10 border border-[#D4A24E]/30 text-[#D4A24E] text-xs font-mono font-bold uppercase tracking-wider">
            7-Day Architecture Protocol
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
            From Kickoff to Board Memo in 7–11 Days
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            No discovery drag. Fixed sprint. Deterministic architectural output.
          </p>
        </div>

        {/* Timeline Sequence with Gold Axis */}
        <div className="relative pl-6 sm:pl-10 space-y-8 border-l-2 border-[#D4A24E]/40 ml-2 sm:ml-6">
          {SPRINT_STAGES.map((stage, idx) => (
            <div 
              key={idx} 
              className="relative group transition-all"
              onMouseEnter={() => setActiveStage(idx)}
              onMouseLeave={() => setActiveStage(null)}
            >
              {/* Circular Node on Timeline */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full border-2 border-[#D4A24E] bg-white group-hover:bg-[#D4A24E] shadow-[0_0_8px_rgba(212,162,78,0.5)] transition-colors" />

              {/* Stage Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#FEF6E8] text-[#D4A24E] border border-[#D4A24E]/30 text-xs font-mono font-bold tracking-wider uppercase">
                      {stage.day}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0C1731]">{stage.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{stage.stageNumber}</span>
                </div>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed font-normal">
                  {stage.desc}
                </p>

                {/* Outputs List */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Deliverables &amp; Artifacts Generated:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {stage.outputs.map((out, oIdx) => (
                      <div key={oIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A24E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THE ANTI-CONSULTING STANDARD (6-Month Drag vs 7-Day Truth) */}
      {/* ============================================================ */}
      <section className="bg-slate-100/70 py-24 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1731]/10 text-[#0C1731] text-xs font-mono font-bold uppercase tracking-wider">
              Disruption Contrast
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
              The Anti-Consulting Standard
            </h2>
            <p className="text-base text-slate-600">
              Why traditional enterprise discovery takes 6 months and delivers 120-slide decks that never ship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Column 1: The 6-Month Drag */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    Traditional Consulting
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">The 6-Month Drag</h3>
                
                <ul className="space-y-4 text-sm text-slate-600">
                  {TRADITIONAL_CONSULTING.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <span className="w-4 h-px bg-slate-400 shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 text-xs font-mono text-slate-400">
                Outcome: Vendor lock-in, zero code-ready specs, budget depletion.
              </div>
            </div>

            {/* Column 2: The 7-Day Mathematical Truth */}
            <div className="rounded-3xl border border-[#D4A24E]/40 bg-[#0C1731] text-white p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D4A24E]" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4A24E]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A24E]">
                    The Nisol 360™ Standard
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">The 7-Day Mathematical Truth</h3>

                <ul className="space-y-4 text-sm text-slate-200">
                  {NISOL_360_STANDARD.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-medium text-white">
                      <span className="w-4 h-px bg-[#D4A24E] shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-[#D4A24E]">
                Outcome: 100% Architecture Ownership • 4 Go-Live Gates • CFO Payback Model.
              </div>
            </div>

          </div>

          {/* Macro Failure Metrics Bar */}
          <div className="pt-8 border-t border-slate-300/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-black text-[#0C1731]">73%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Projects Fail Before Production</div>
            </div>
            <div className="space-y-1 md:border-l md:border-r border-slate-300">
              <div className="text-3xl font-black text-[#0C1731]">₹1.2 Cr</div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Average Wasted Enterprise Spend</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-[#D4A24E]">4 Gates</div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Deterministic Mathematical Rigor</div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THREE GUARANTEES WE PUT IN THE SOW                        */}
      {/* ============================================================ */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C1731]/10 text-[#0C1731] text-xs font-mono font-bold uppercase tracking-wider">
              Contractual Protection
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
              Three Guarantees We Put in the SOW
            </h2>
            <p className="text-base text-slate-600">
              Not marketing. Written directly into the legally binding Statement of Work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOW_GUARANTEES.map((item, idx) => (
              <div 
                key={idx} 
                className="rounded-3xl p-8 sm:p-9 bg-[#0C1731] text-white flex flex-col justify-between border border-[#1B2D5B] shadow-lg"
              >
                <div className="space-y-4">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#D4A24E] block">
                    {item.number}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-slate-400">
                  Enforceable SOW Clause
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WE ARCHITECT. YOU DECIDE. (Options A, B, C)               */}
      {/* ============================================================ */}
      <section className="bg-[#0C1731] text-white py-24 border-b border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101D3D] text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
              Zero Lock-In Philosophy
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              We Architect. You Decide.
            </h2>
            <p className="text-base text-slate-300">
              Discovery is code-free. What happens after is completely your choice. Zero dependency on us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERY_OPTIONS.map((opt, idx) => (
              <div 
                key={idx} 
                className="rounded-3xl p-8 bg-[#101D3D] border border-[#1B2D5B] hover:border-[#D4A24E]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-400">
                      {opt.tag}
                    </span>
                    <span className="text-2xl text-[#D4A24E] font-mono">{opt.glyph}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{opt.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {opt.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 text-xs font-mono text-[#D4A24E]">
                  You own 100% of the IP &amp; Architecture.
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#101D3D] border border-[#D4A24E]/30 text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#D4A24E] uppercase">
              All Options: Client Infra Pass-Through • You Pay Cloud Directly (AWS / Azure / GCP)
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SECURITY STRIP & FINAL VELVET ROPE SCARCITY CLOSE        */}
      {/* ============================================================ */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          
          {/* Security Pill Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-slate-600">
            {["Zero Public Model Training", "Tenant-Isolated", "Strict RBAC", "Read-Only Portal", "Enterprise NDA Protected"].map((sec, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E]" />
                <span>{sec}</span>
              </span>
            ))}
          </div>

          {/* Scarcity Card */}
          <div className="space-y-6 pt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
              Controlled Intake
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
              We Architect Only 5 Blueprints Per Month.
            </h2>

            <div className="space-y-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <p>
                Master enterprise architects per engagement. Applications reviewed directly by architects within 48 hours. Mutual NDA provided prior to technical review.
              </p>
              <div className="text-xl font-mono font-black text-[#D4A24E] pt-1">
                Current Cohort: 2/5 engagements remaining.
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#D4A24E] hover:bg-[#E5B25B] text-[#0C1731] font-black text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group gap-2.5"
              >
                <span>Apply for Nisol 360™ — 48h Response</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/blueprint"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0C1731] border border-slate-300 font-semibold text-base transition-all duration-200"
              >
                See What You Get on Day 7 →
              </Link>
            </div>

            <p className="text-xs text-slate-400 font-mono pt-2">
              Strict Non-Disclosure • Client Infra Pass-Through • Direct Architect Review.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
