"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Sparkles, 
  FileCheck, 
  TrendingUp, 
  Lock, 
  Clock, 
  HelpCircle, 
  FileText, 
  X, 
  AlertTriangle,
  Building2,
  Database,
  ExternalLink,
  Check
} from "lucide-react";

// 4 Architecture Blueprints
const BLUEPRINTS = [
  {
    id: "spark",
    name: "Nisol Spark",
    badge: "3-DAY FOCUS SPRINT",
    subhead: "The First Look Memo",
    priceINR: "₹1,50,000",
    priceUSD: "$1,800",
    billingType: "Fixed-Price SOW",
    duration: "3 Business Days",
    ideal: "For enterprises seeking rapid evaluation of AI opportunity, token spend teardown, or data readiness before committing capital.",
    popular: false,
    ctaText: "Apply for Spark Sprint",
    ctaLink: "/contact?type=apply&package=Spark",
    highlights: [
      "Choice of 1 Focus Track: Opportunity Sprint OR Token Cost Audit OR Data Stance",
      "Direct 3-day evaluation by 1 Senior Enterprise Architect",
      "Identification of Top 5 High-Impact AI Quick Wins",
      "8–10 Page Executive Intelligence Memo",
      "100% credited toward Nisol One if upgraded within 30 days",
      "Mutual Non-Disclosure Agreement (NDA) protected"
    ]
  },
  {
    id: "one",
    name: "Nisol One",
    badge: "FLAGSHIP • NISOL 360™",
    subhead: "The 30-360 Architecture",
    priceINR: "₹4,50,000",
    priceUSD: "$5,500",
    billingType: "Fixed-Price SOW",
    duration: "7–11 Business Days",
    ideal: "Our flagship code-free architecture sprint across all 15 capabilities, 62 diagnostic questions, and 8 benchmarked industries.",
    popular: true,
    ctaText: "Apply for Nisol 360™ — 2 Left",
    ctaLink: "/contact?type=apply&package=One",
    highlights: [
      "Full 62-Dimension Diagnostic across all 15 enterprise capabilities",
      "Sector Benchmarking against 8 peer industry cohorts",
      "15-Capability Empirical Readiness Radar (vs median & leader)",
      "2D Opportunity Matrix & Top 5 Prioritized Quick Wins",
      "30/60/90/180/360-Day Transformation Roadmap & Lumpsum Capital Budget",
      "4 Go-Live Decision Gates & Basic Regulatory Checklist",
      "3-Pack Board Dossier + Executive Readout Findings Session",
      "100% Architecture Ownership — Build with us or anyone"
    ]
  },
  {
    id: "pro",
    name: "Nisol Pro",
    badge: "BLUEPRINT + CFO MODEL",
    subhead: "Full Financial & Technical Blueprint",
    priceINR: "₹8,50,000",
    priceUSD: "$10,500",
    billingType: "Fixed-Price SOW",
    duration: "10–15 Business Days",
    ideal: "For mid-market enterprises needing board-level financial validation (DCF/NPV/IRR), vector lakehouse engineering specs, and workforce training.",
    popular: false,
    ctaText: "Apply for Nisol Pro",
    ctaLink: "/contact?type=apply&package=Pro",
    highlights: [
      "Everything in Nisol One, plus:",
      "CFO & Board Investment Memorandum (DCF, NPV & IRR)",
      "3-Scenario Sensitivity Stress Test (75% Conservative, 100% Base, 125% Upside)",
      "Vector Lakehouse Blueprint (pgvector/Qdrant + BM25 + BGE-M3 + CDC + RBAC)",
      "15 Departmental Action Briefs (Operational Friction vs Target Outcomes)",
      "5×5 Risk & Regulatory Register (DPDP Act 2023 / EU AI Act)",
      "Organizational Change Management (OCM) Plan & RACI Matrix",
      "2 Workforce Training Tracks (All-Hands Foundations + Champions Labs)"
    ]
  },
  {
    id: "enterprise",
    name: "Nisol Enterprise",
    badge: "MULTI-ENTITY ARCHITECTURE",
    subhead: "Multi-Entity Scale & CoE Charter",
    priceINR: "₹18,50,000+",
    priceUSD: "$22,500+",
    billingType: "Multi-Entity SOW Scope",
    duration: "4–8 Weeks (Phased)",
    ideal: "For large enterprise groups requiring multi-entity governance, shadow AI penetration audit, and AI Center of Excellence (CoE) charter.",
    popular: false,
    ctaText: "Apply for Enterprise",
    ctaLink: "/contact?type=apply&package=Enterprise",
    highlights: [
      "Everything in Nisol Pro, plus:",
      "PoC Decision Gate & Acceptance Protocol (SLA & Gate 0–4 Sign-off)",
      "Shadow AI Exposure, Penetration Audit & Zero-Trust PII Gateway Spec",
      "Vendor Dependency, Multi-LLM Lock-In & Switch-Cost Teardown",
      "36-Month 3-Horizon Strategic Warfare Roadmap",
      "Valuation Multiple Expansion Model (15%–25% multiple premium)",
      "Full 3-Track Enablement Suite (+ Leadership & C-Suite Seminar)",
      "Real-Time Change Data Capture (CDC) Pipeline Specification",
      "AI Center of Excellence (CoE) Charter & Multi-Entity Governance"
    ]
  }
];

// The 3-Pack Board Dossier (15 Reports)
const DELIVERABLE_PACKS = [
  {
    tag: "PACK 01",
    title: "BOARD STRATEGY",
    count: "5 Reports",
    summary: "For Board of Directors, CEO, and Investment Committee.",
    reports: [
      "CFO & Board Investment Memorandum (DCF, NPV, IRR, 3-scenario stress test + Board Resolution)",
      "15-Capability Transformation Strategy (vs industry median & leader)",
      "2D Opportunity Matrix (Top 20 Enterprise Use Cases)",
      "Single-Pod Roadmap (30 / 60 / 90 / 180 / 360 days)",
      "Minto Pyramid Executive Brief & Core Thesis"
    ]
  },
  {
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
    tag: "PACK 03",
    title: "TRANSFORMATION PACK",
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

// Comparison Matrix Rows
const COMPARISON_ROWS = [
  { feature: "Diagnostic Depth", spark: "1 Track (3–5 Depts)", one: "15 Capabilities / 62 Qs", pro: "15 Capabilities / 62 Qs", enterprise: "Extended Multi-Entity" },
  { feature: "Peer Benchmarking", spark: "—", one: "8 Sectors (Median)", pro: "8 Sectors (Median + Top Quartile)", enterprise: "Global Competitor Deep-Dive" },
  { feature: "Opportunity Matrix", spark: "Top 5 List", one: "Top 5 Quick Wins", pro: "2D Bubble Matrix (20 Cases)", enterprise: "Build-vs-Buy & Money-Pit Teardown" },
  { feature: "CFO Financial Model", spark: "Estimated Range", one: "Lumpsum ROI & Payback", pro: "CFO Board Memo + 3 Scenarios", enterprise: "Full DCF Model + Multiple Premium" },
  { feature: "Vector Lakehouse Spec", spark: "Gap Summary", one: "Readiness Score", pro: "5-Dimension Scorecard + CDC", enterprise: "Full Lakehouse & PII Gateway" },
  { feature: "4 Go-Live Decision Gates", spark: "Gate 0 Overview", one: "Included (4 Gates)", pro: "Included (4 Gates + Protocol)", enterprise: "Empirical Gate Audit Protocol" },
  { feature: "Workforce Training", spark: "—", one: "0 (Add-on available)", pro: "2 Tracks (All-Hands + Labs)", enterprise: "All 3 Tracks (+ Leadership Seminar)" },
  { feature: "Risk & Regulatory Register", spark: "Basic Checklist", one: "Basic Checklist", pro: "5x5 Matrix (DPDP / EU AI)", enterprise: "Continuous Audit Architecture" },
  { feature: "Shadow AI Teardown", spark: "—", one: "—", pro: "—", enterprise: "Included (DLP & Switch-Cost)" },
  { feature: "Change Management (OCM)", spark: "—", one: "Guidance Notes", pro: "Full OCM Plan + RACI", enterprise: "Custom Org Design & CoE Setup" },
  { feature: "Cloud Infra Pass-Through", spark: "Direct Pass-Through", one: "Direct Pass-Through", pro: "Direct Pass-Through", enterprise: "Direct Pass-Through" },
  { feature: "Delivery Timeline", spark: "3 Business Days", one: "7–11 Business Days", pro: "10–15 Business Days", enterprise: "Phased (4–8 Weeks)" },
  { feature: "Architecture Ownership", spark: "100% Client Owned", one: "100% Client Owned", pro: "100% Client Owned", enterprise: "100% Client Owned" }
];

// The 3 SOW Guarantees
const SOW_GUARANTEES = [
  {
    num: "01",
    title: "Stop-the-Clock Clause",
    desc: "If we are waiting on your data, security clearance, or internal team, the sprint clock stops immediately. You never pay for our waiting time. Timeboxed sprints only."
  },
  {
    num: "02",
    title: "No-Blame Exit",
    desc: "If Gate 0 fails (data hygiene or security readiness is not ready for production AI), you exit cleanly with a full audit and pay only for work completed. No blame. No lock-in."
  },
  {
    num: "03",
    title: "Client Infra Pass-Through",
    desc: "You pay AWS, GCP, or Azure directly. We never touch, markup, or own your data. Tenant-isolated infrastructure, strict RBAC, and zero public model training."
  }
];

// The Cost of Not Knowing (Macro Failure Economics)
const FAILURE_RISKS = [
  {
    title: "The 73% Failure Cliff",
    metric: "73% Fail",
    desc: "Enterprises that launch AI pilots without architectural gating fail before production, creating multi-crore shelfware."
  },
  {
    title: "Runaway Token OPEX",
    metric: "₹1.80/chunk",
    desc: "Naive RAG systems bleed cash with unoptimized chunking, redundant embeddings, and unbudgeted inference loops."
  },
  {
    title: "Vendor Lock-In Drag",
    metric: "6 Months",
    desc: "Traditional consulting builds proprietary wrappers that make you dependent on their hourly billing clock indefinitely."
  },
  {
    title: "Shadow AI & PII Exposure",
    metric: "Severe Fine",
    desc: "Unsanitized employee prompts and open cloud endpoints violating DPDP Act 2023 and EU AI Act compliance."
  }
];

// FAQs
const FAQS = [
  {
    q: "Why does Nisolai offer fixed-price SOWs instead of hourly billing?",
    a: "Traditional consulting firms charge open-ended time and materials, which misaligns incentives—the longer they take, the more they bill. Nisol 360™ operates on fixed-scope, fixed-price SOWs, delivering board-ready outcomes in 7–11 business days with zero budget surprises."
  },
  {
    q: "What happens after the 7-day architecture sprint?",
    a: "You have complete freedom. Option A: Have Nisol engineer what we architected. Option B: Your internal engineering team builds while our master architects audit against the 4 Gates. Option C: Hand the blueprint to any systems integrator or internal team. You own 100% of the architecture."
  },
  {
    q: "Why is Cloud compute and LLM token infrastructure a pass-through cost?",
    a: "Nisolai's fees cover solution architecture, prompt engineering, data pipelines, and evaluation harnesses exclusively. All third-party cloud compute (AWS/Azure/GCP VPCs) and model tokens (OpenAI, Anthropic, Google) are provisioned inside your enterprise tenant and paid directly by you. We never mark up your cloud spend."
  },
  {
    q: "How are the CFO financial ROI numbers calculated?",
    a: "We do not use generic AI hype numbers. Our models calibrate projections using your company's actual headcount, payroll pools, and manual task exposure percentages across departments, including a 3-scenario CFO sensitivity stress test (Conservative, Base, Optimistic) using a 10% discount rate."
  },
  {
    q: "How does Nisol 360™ compare to traditional consulting assessments?",
    a: "Traditional consulting firms typically charge ₹25L–₹75L ($50k–$150k+) and take 3–6 months to deliver 120-slide PowerPoint decks. Nisolai delivers superior technical rigour, code-ready specs, vector database topologies, and deterministic financial models in 7–11 days at a fraction of the cost."
  }
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <div className="bg-[#FBF8F3] text-[#0C1731] antialiased">
      
      {/* ============================================================ */}
      {/* 1. HERO HEADER                                               */}
      {/* ============================================================ */}
      <section className="relative min-h-[70vh] bg-[#0C1731] text-white flex flex-col justify-center pt-28 pb-20 overflow-hidden border-b border-[#1B2D5B]">
        {/* Architectural Glow & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1B2D5B_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4A24E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101D3D] border border-[#D4A24E]/40 text-[#D4A24E] text-xs font-semibold tracking-widest uppercase font-mono shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24E] animate-pulse" />
            <span>FIXED-PRICE SOW • 4 ARCHITECTURES • ZERO VENDOR LOCK-IN</span>
          </div>

          {/* Headline & Subhead */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.98] text-white">
              Four Blueprints. <br />
              <span className="text-[#D4A24E]">Zero Ambiguity.</span>
            </h1>

            <p className="text-lg sm:text-2xl text-slate-200 font-light tracking-tight max-w-3xl mx-auto pt-2">
              Fixed-price SOW. Code-free discovery. <span className="font-semibold text-white">You own the architecture forever.</span>
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
              Traditional consultancies charge open-ended time &amp; materials that drag for 6 months. Nisolai offers deterministic, fixed-price SOW architectures delivered in days with 100% IP ownership.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-[#101D3D] border border-[#D4A24E]/40 shadow-inner">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  currency === "INR" 
                    ? "bg-[#D4A24E] text-[#0C1731] shadow-md" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                India (INR ₹)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  currency === "USD" 
                    ? "bg-[#D4A24E] text-[#0C1731] shadow-md" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Global (USD $)
              </button>
            </div>
          </div>

          {/* Micro-Trust Strip */}
          <div className="pt-4 text-xs sm:text-sm text-slate-400 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono">
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

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE 4 ARCHITECTURE TIERS                                   */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {BLUEPRINTS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? "bg-[#0C1731] text-white border-2 border-[#D4A24E] shadow-2xl lg:-translate-y-2"
                  : "bg-white text-[#0C1731] border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4A24E] text-[#0C1731] font-black text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                  RECOMMENDED FOR MOST ENTERPRISES
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tier.popular ? "bg-[#D4A24E]/20 text-[#D4A24E] border border-[#D4A24E]/40" : "bg-slate-100 text-slate-700"
                    }`}>
                      {tier.badge}
                    </span>
                    <span className={`text-xs font-mono font-semibold ${tier.popular ? "text-slate-300" : "text-slate-500"}`}>
                      {tier.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black">{tier.name}</h3>
                  <div className="text-xs font-mono font-bold text-[#D4A24E] mt-1">{tier.subhead}</div>

                  <p className={`text-xs mt-3 leading-relaxed font-normal ${tier.popular ? "text-slate-300" : "text-slate-600"}`}>
                    {tier.ideal}
                  </p>
                </div>

                {/* Price Display */}
                <div className="border-t border-b py-4 border-slate-200/30">
                  <div className="text-3xl font-black tracking-tight">
                    {currency === "INR" ? tier.priceINR : tier.priceUSD}
                  </div>
                  <div className={`text-[11px] font-mono mt-1 ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {tier.billingType} • Timeboxed
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-3">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                    tier.popular ? "text-[#D4A24E]" : "text-slate-800"
                  }`}>
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2.5 text-xs">
                    {tier.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.popular ? "text-[#D4A24E]" : "text-emerald-600"}`} />
                        <span className={tier.popular ? "text-slate-200" : "text-slate-700"}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-6 mt-6 border-t border-slate-200/20">
                <Link
                  href={tier.ctaLink}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    tier.popular
                      ? "bg-[#D4A24E] hover:bg-[#E5B25B] text-[#0C1731] font-black"
                      : "bg-[#0C1731] hover:bg-[#162752] text-white"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 font-mono">
          All Blueprints: 100% Architecture Ownership. No code in discovery. Zero vendor dependency.
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT YOU GET: THE 3-PACK BOARD DOSSIER (15 REPORTS)       */}
      {/* ============================================================ */}
      <section className="bg-white py-24 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/30 text-xs font-mono font-bold uppercase tracking-wider">
              15 Tangible Deliverables
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
              What You Get on Day 7.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Not a generic 120-slide deck. A physical, museum-grade bound dossier your CFO can present Monday morning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DELIVERABLE_PACKS.map((pack, pIdx) => (
              <div
                key={pIdx}
                className="bg-[#FBF8F3] rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#D4A24E] uppercase">
                      {pack.tag}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0C1731]/10 text-[#0C1731]">
                      {pack.count}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[#0C1731]">{pack.title}</h3>
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

                <div className="pt-6 mt-6 border-t border-slate-200 text-[11px] text-slate-400 font-mono">
                  Delivered inside Nisol One &amp; Pro bound dossier.
                </div>
              </div>
            ))}
          </div>

          {/* PACKAGING THEATER: PHYSICAL LEATHER-BOUND FOLIO */}
          <div className="mt-14 rounded-3xl bg-[#0C1731] text-white p-8 sm:p-12 border border-[#1B2D5B] shadow-2xl relative overflow-hidden">
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
                      Folio Serial: NISOL-360-PRICING-ARCH
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

          <div className="text-center pt-8">
            <Link
              href="/blueprint"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D4A24E] hover:underline"
            >
              <span>Explore Complete Blueprint Product Specifications &amp; Radar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THREE GUARANTEES WE PUT IN THE SOW                        */}
      {/* ============================================================ */}
      <section className="bg-[#0C1731] text-white py-24 border-b border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101D3D] text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
              Enforceable Contract Terms
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Three Guarantees We Put in the SOW
            </h2>
            <p className="text-base text-slate-300">
              Not marketing language. Legally binding protections written directly into every ordering document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOW_GUARANTEES.map((g, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-8 bg-[#101D3D] border border-[#1B2D5B] shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-sm font-mono font-bold text-[#D4A24E]">{g.num}</span>
                  <h3 className="text-xl font-bold text-white">{g.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {g.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 text-xs font-mono text-[#D4A24E]">
                  Legally Binding SOW Term
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. SIDE-BY-SIDE COMPARISON MATRIX                            */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/30 text-xs font-mono font-bold uppercase tracking-wider">
            Detailed Comparison
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
            Compare Blueprint Scopes
          </h2>
          <p className="text-base text-slate-600">
            Compare diagnostic scope, technical architectures, and financial modeling depth across all four tiers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-md">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-[#0C1731] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider w-1/4">Architecture Feature</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-slate-300">Spark (₹1.5L)</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-[#D4A24E]">One (₹4.5L ★)</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-slate-300">Pro (₹8.5L)</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-slate-300">Enterprise (₹18.5L+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#0C1731]">{row.feature}</td>
                  <td className="px-4 py-4 text-slate-600">{row.spark}</td>
                  <td className="px-4 py-4 font-bold text-[#0C1731] bg-[#FEF6E8]/70 border-l border-r border-[#D4A24E]/20">{row.one}</td>
                  <td className="px-4 py-4 text-slate-600">{row.pro}</td>
                  <td className="px-4 py-4 text-slate-600">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. THE COST OF NOT KNOWING (Failure Economics)               */}
      {/* ============================================================ */}
      <section className="bg-[#0C1731] text-white py-24 border-t border-b border-[#1B2D5B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-mono font-bold uppercase tracking-wider">
              Capital Preservation
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Cost of Not Knowing
            </h2>
            <p className="text-base text-slate-300">
              What happens if you deploy AI code before validating architecture? The cost of getting it wrong dwarfs the cost of a blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FAILURE_RISKS.map((risk, idx) => (
              <div 
                key={idx}
                className="bg-[#101D3D] p-6 rounded-2xl border border-red-500/30 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400">{risk.metric}</span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-base font-bold text-white">{risk.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{risk.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400 uppercase">
                  Arrested by Nisol 360™ Gate 0
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#101D3D] border border-[#D4A24E]/40 max-w-3xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-mono text-slate-200">
              <strong className="text-[#D4A24E]">Mathematical Fact:</strong> The average enterprise wastes ₹1.2 Cr on failed AI pilots. A ₹4.5L Nisol 360™ architecture prevents bad capital allocation before writing a single line of code.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. TRANSPARENT EXECUTIVE FAQS                                */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/30 text-xs font-mono font-bold uppercase tracking-wider">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Transparent explanations of our commercial model, IP ownership, and deliverables.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-[#0C1731] flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#D4A24E] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6 font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. VELVET ROPE CONTROLLED SCARCITY CLOSE                    */}
      {/* ============================================================ */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A24E]/10 text-[#D4A24E] border border-[#D4A24E]/40 text-xs font-mono font-bold uppercase tracking-wider">
            Controlled Intake
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0C1731] tracking-tight">
            We Architect Only 5 Blueprints Per Month.
          </h2>

          <div className="space-y-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            <p>
              Master enterprise architects. 62 dimensions. 15 capabilities. One board-ready 30-360 architecture in 7 days. Zero code in discovery. Zero vendor lock-in. You own it.
            </p>
            <p className="text-sm text-slate-500">
              Applications reviewed directly by master enterprise architects within 48 hours. Mutual NDA provided prior to technical review.
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
              See Full Product Spec
            </Link>
          </div>

          <p className="text-xs text-slate-400 font-mono pt-2">
            Strict Non-Disclosure • Client Infra Pass-Through • Direct Master Architect Review.
          </p>

        </div>
      </section>

    </div>
  );
}
