import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Compass, 
  Search, 
  CheckCircle2, 
  FileText, 
  Calculator, 
  HelpCircle, 
  Send,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  BarChart3,
  Sparkles,
  Lock,
  Clock,
  TrendingUp,
  FileCheck,
  Check,
  X as XIcon,
  Bot,
  UserCheck,
  Building2,
  Download
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InvestmentEstimator } from "@/components/discovery/InvestmentEstimator";
import { BoardDeliverablesGrid } from "@/components/discovery/BoardDeliverablesGrid";
import { PricingJustificationSection } from "@/components/shared/PricingJustificationSection";
import { ZeroLockInGuarantee } from "@/components/shared/ZeroLockInGuarantee";
import { WhyFasterInclusions } from "@/components/discovery/WhyFasterInclusions";

export const metadata: Metadata = {
  title: "AI Transformation Engagements & Discovery | Nisol AI",
  description: "Fixed-price AI transformation engagements combining Nisol Intelligence™ automated synthesis with senior AI architect expertise. Delivered in 1–4 weeks.",
};

const DIFFERENTIATOR_MATRIX = [
  {
    dimension: "Speed to Insight",
    traditional: "8–12 Weeks",
    nisol: "1–4 Weeks (7–11 Business Days typical)",
    highlight: true
  },
  {
    dimension: "Data Collection",
    traditional: "Manual notes & questionnaires",
    nisol: "Structured Framework + Session Transcription Intelligence",
    highlight: false
  },
  {
    dimension: "Deliverables",
    traditional: "Static PowerPoint decks",
    nisol: "15 Live Executive Deliverables & Interactive Blueprints",
    highlight: true
  },
  {
    dimension: "ROI Modeling",
    traditional: "High-level assumptions",
    nisol: "Granular Cost Savings, Productivity & Payback Period Models",
    highlight: false
  },
  {
    dimension: "Pricing Predictability",
    traditional: "Open-ended time & materials",
    nisol: "Fixed-Price, Outcome-Based Investment",
    highlight: true
  },
  {
    dimension: "Continuity",
    traditional: "One-off engagement",
    nisol: "Permanent Baseline Snapshot for Multi-Year Re-benchmarking",
    highlight: false
  }
];

const PACKAGES = [
  {
    name: "Foundation Engagement",
    badge: "STARTER",
    price: "₹3,50,000",
    priceSub: "Starting Investment (Fixed-Price)",
    duration: "1–2 Weeks (7–11 Business Days)",
    ideal: "Ideal for small organizations or single business units embarking on AI transformation.",
    ctaText: "Book Foundation Call",
    ctaLink: "/contact?type=discovery-call&package=Foundation",
    popular: false,
    features: [
      "Up to 4 Workshop Days covering 15 capabilities",
      "1 Core Business Unit or SME scope (10–50 employees)",
      "AI Readiness Assessment & Maturity Scorecard",
      "Executive Intelligence Pack (Deliverables 1–4)",
      "AI Opportunity Matrix & Top 20 Use Cases",
      "30/90/180/365-Day Transformation Roadmap"
    ]
  },
  {
    name: "Growth Engagement",
    badge: "MOST POPULAR",
    price: "₹7,50,000",
    priceSub: "Starting Investment (Fixed-Price)",
    duration: "2–4 Weeks (10–15 Business Days)",
    ideal: "Ideal for mid-market enterprises building a comprehensive, multi-department AI roadmap.",
    ctaText: "Talk to an AI Strategist",
    ctaLink: "/contact?type=discovery-call&package=Growth",
    popular: true,
    features: [
      "Everything in Foundation, plus:",
      "Multi-department scope (51–250 employees)",
      "AI Session Contextual Capture & Transcription Processing",
      "Solution Blueprints for Top 5 AI Use Cases",
      "Granular Financial ROI & Productivity Modeling",
      "AI Governance & Change Management Frameworks",
      "Executive Steering Readout Session"
    ]
  },
  {
    name: "Enterprise Engagement",
    badge: "CUSTOM SCOPE",
    price: "Custom Pricing",
    priceSub: "Based on Organizational Scope",
    duration: "4–8 Weeks (Phased Transformation)",
    ideal: "Designed for large, multi-entity enterprises and complex operational environments.",
    ctaText: "Request Enterprise Proposal",
    ctaLink: "/contact?type=proposal&package=Enterprise",
    popular: false,
    features: [
      "Everything in Growth, plus:",
      "Enterprise-wide scope (251–1000+ employees, multi-location)",
      "Executive Steering Committee Facilitation",
      "Peer & Global Industry Maturity Benchmarking",
      "AI Transformation Office (TO) Setup & Governance",
      "Custom Solution Architecture & System Blueprints",
      "Ongoing Quarterly Re-benchmarking & Advisory Options"
    ]
  }
];

const DELIVERABLE_PACKS = [
  {
    title: "Executive Intelligence Pack",
    deliverables: [
      "1. Executive Summary",
      "2. Readiness Score",
      "3. C-Suite Dashboard",
      "4. Capability Cards"
    ],
    description: "High-level strategic findings, maturity radar charts across 15 capabilities, and C-suite alignment dashboards."
  },
  {
    title: "AI Opportunity Pack",
    deliverables: [
      "5. Opportunity Matrix",
      "6. Top 20 Use Cases",
      "7. Quick Wins / Bets",
      "8. Execution Queue"
    ],
    description: "Impact vs. Feasibility matrix (2x2), catalog of top 20 prioritized use cases, and rapid ROI quick-win categorization."
  },
  {
    title: "Transformation Pack",
    deliverables: [
      "9. Transformation Plan",
      "10. Financial ROI Model",
      "11. Business Case",
      "12. Solution Blueprints",
      "13. Change Framework",
      "14. Risk Assessment",
      "15. KPI Success Metrics"
    ],
    description: "Phased roadmap (30/90/180/365 days), 5-year financial benefit projections, technical architecture blueprints, risk governance, and success metric KPIs."
  }
];

const TABLE_COMPARISON = [
  { feature: "Discovery Workshop Days", foundation: "Up to 2 Days", growth: "Up to 4 Days", enterprise: "Multi-Week / Multi-Site" },
  { feature: "Capability Scope", foundation: "15 Domains", growth: "15 Domains", enterprise: "Customized Enterprise" },
  { feature: "Session Contextual Capture", foundation: "Standard", growth: "Full Transcript AI Processing", enterprise: "Full Transcript AI Processing" },
  { feature: "Executive Intelligence Pack", foundation: "Included", growth: "Included", enterprise: "Included" },
  { feature: "AI Opportunity Pack", foundation: "Included", growth: "Included", enterprise: "Included" },
  { feature: "Transformation Roadmap", foundation: "Included", growth: "Included", enterprise: "Included" },
  { feature: "Financial ROI Modeling", foundation: "Standard", growth: "Granular Departmental", enterprise: "Multi-Entity Financial Model" },
  { feature: "Solution Blueprints", foundation: "—", growth: "Top 5 Use Cases", enterprise: "Custom / All Priorities" },
  { feature: "AI Governance Framework", foundation: "—", growth: "Included", enterprise: "Extended Enterprise" },
  { feature: "Change Management Plan", foundation: "—", growth: "Included", enterprise: "Custom Org Design" },
  { feature: "Industry Benchmarking", foundation: "—", growth: "Regional", enterprise: "Global Competitor Deep-Dive" },
  { feature: "Client Portal Access", foundation: "Read-Only Client Portal", growth: "Read-Only Client Portal", enterprise: "Dedicated Tenant Portal" },
  { feature: "Executive Readout Session", foundation: "Included", growth: "Steering Group", enterprise: "Board-Level Presentation" },
];

const FAQS_LIST = [
  {
    q: "How does Nisol Discovery™ differ from traditional management consulting?",
    a: "Traditional consulting relies on manual interviews and weeks of spreadsheet synthesis. We combine structured domain questions and live discussion transcription with our proprietary Nisol Intelligence™ engine to generate 15 executive deliverables in days rather than months."
  },
  {
    q: "What is included in the Discovery Workshop?",
    a: "The workshop covers 62 core questions across 15 capability domains (Leadership, Data, Security, Operations, HR, Finance, etc.) facilitated over 2–4 days with your key department leads."
  },
  {
    q: "How long does the entire engagement take?",
    a: "Typical duration is 7 to 11 business days for Foundation and Growth packages, from kickoff to final executive presentation."
  },
  {
    q: "Is our business data safe when processed by your AI engine?",
    a: "Absolutely. All client data is encrypted and processed within strict tenant-isolated environments. We strictly enforce a zero model training policy—your proprietary insights are never shared or used to train external LLMs."
  },
  {
    q: "Do you help implement the roadmap after Discovery?",
    a: "Yes. While Discovery is a standalone, outcome-based assessment, Nisol AI provides ongoing implementation advisory, AI engineering, multi-agent development, and quarterly governance as add-on services."
  }
];

export default function DiscoveryPage() {
  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── 1. HERO SECTION ───────────────────────────────────────────── */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-golden-600" />
          <span>Stage 01 & 02 of the 9-Stage AI Transformation Lifecycle</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-navy-950 tracking-tight leading-tight">
          Executive Clarity & Practical AI Roadmaps— <br />
          <span className="golden-gradient-text">Delivered in Weeks, Not Months</span>
        </h1>

        <p className="text-base sm:text-xl text-navy-700 max-w-3xl mx-auto leading-relaxed font-medium">
          Fixed-price engagements combining proprietary session intelligence, automated AI synthesis, and senior AI architect expertise to accelerate your transformation.
        </p>

        {/* Lifecycle Stepper Banner */}
        <div className="mt-4 p-3 bg-navy-950 text-white rounded-xl max-w-3xl mx-auto text-xs flex items-center justify-between gap-2 border border-golden-500/30">
          <span className="text-slate-300">
            <strong className="text-golden-400">9-Stage Transformation Journey:</strong> <span className="text-golden-300 font-bold underline">Discover & Assess</span> → Prioritize → Implement → Integrate → Govern → Monitor → Optimize → Scale
          </span>
          <Link href="/transformation-framework" className="text-golden-400 hover:text-golden-300 font-bold shrink-0 flex items-center gap-1">
            View Full Lifecycle →
          </Link>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-navy-900 pt-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <span className="text-lg">🎯</span>
            <span className="text-left leading-snug"><strong>15 Capabilities</strong> assessed across 62 domain questions</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <span className="text-lg">🎙️</span>
            <span className="text-left leading-snug"><strong>Session Intelligence</strong> via live transcription synthesis</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <span className="text-lg">📦</span>
            <span className="text-left leading-snug"><strong>15 Deliverables</strong> across 3 executive insight packs</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <span className="text-lg">📊</span>
            <span className="text-left leading-snug"><strong>Multi-Year Baseline</strong> snapshot for long-term ROI</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Schedule a Discovery Call
          </Button>
          <Button href="/discovery/deliverables" variant="outline" size="lg" icon={<Download className="w-4 h-4" />}>
            View Engagement Brief
          </Button>
        </div>
      </div>

      {/* ── 1.5. WHY FASTER & EVERY ENGAGEMENT INCLUDES ───────────────────── */}
      <WhyFasterInclusions />

      {/* ── 2. DIFFERENTIATOR MATRIX ─────────────────────────────────────── */}
      <section className="space-y-10">
        <SectionHeader
          badgeText="Why Partner with Nisol AI?"
          title="Rethinking AI Advisory"
          subtitle="Modern AI Transformation vs. Traditional Advisory Overhead"
          description="Traditional advisory engagements take months of manual interviews, heavy overhead, and static slide decks. Nisol AI accelerates this process through our proprietary Nisol Intelligence™ engine combined with human-in-the-loop strategy experts."
        />

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy-950 text-white border-b border-navy-800">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider">Capability Dimension</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-slate-300">Traditional Consulting</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-golden-400 bg-navy-900/80">Nisol AI Engagements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DIFFERENTIATOR_MATRIX.map((row, idx) => (
                  <tr key={idx} className={row.highlight ? "bg-golden-50/30" : "bg-white"}>
                    <td className="py-4 px-6 font-bold text-navy-950">{row.dimension}</td>
                    <td className="py-4 px-6 text-slate-500">{row.traditional}</td>
                    <td className="py-4 px-6 font-bold text-navy-900 bg-golden-500/5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-golden-600 shrink-0" />
                      <span>{row.nisol}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 3. 15 BOARD-READY DELIVERABLES GRID ───────────────────────────── */}
      <BoardDeliverablesGrid />

      {/* ── 4. NISOL DISCOVERY VALUE FRAMEWORK ───────────────────── */}
      <PricingJustificationSection />

      {/* ── 5. ZERO VENDOR LOCK-IN GUARANTEE ─────────────────────────────── */}
      <ZeroLockInGuarantee />

      {/* ── 3. ENGAGEMENT PACKAGES (3-TIER CARDS) ───────────────────────── */}
      <section className="space-y-12">
        <SectionHeader
          badgeText="Engagement Tiers"
          title="Fixed-Price Engagement Packages"
          subtitle="Transparent Baseline Investments Tailored to Your Operational Scale"
          description="Choose from fixed-price baseline tiers or contact our strategy architects for custom enterprise multi-entity transformations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? "bg-navy-950 text-white border-2 border-golden-500 shadow-2xl scale-[1.02]"
                  : "bg-white text-navy-950 border border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-golden-500 text-navy-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Badge variant={pkg.popular ? "golden" : "navy"} className="text-[10px]">
                    {pkg.badge}
                  </Badge>
                  <h3 className={`text-2xl font-black ${pkg.popular ? "text-white" : "text-navy-950"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs ${pkg.popular ? "text-slate-300" : "text-slate-600"} min-h-[36px]`}>
                    {pkg.ideal}
                  </p>
                </div>

                <div className="space-y-1 border-y border-slate-200/40 py-4">
                  <div className={`text-3xl font-black ${pkg.popular ? "golden-gradient-text" : "text-navy-950"}`}>
                    {pkg.price}
                  </div>
                  <div className={`text-[11px] font-semibold ${pkg.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {pkg.priceSub}
                  </div>
                  <div className={`text-xs font-bold pt-1 ${pkg.popular ? "text-golden-400" : "text-golden-600"} flex items-center gap-1.5`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <span className={`font-bold uppercase tracking-wider block ${pkg.popular ? "text-golden-400" : "text-navy-900"}`}>
                    Included Scope & Capabilities:
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? "text-golden-400" : "text-emerald-600"}`} />
                        <span className={pkg.popular ? "text-slate-200" : "text-navy-800"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  href={pkg.ctaLink}
                  variant={pkg.popular ? "primary" : "outline"}
                  size="md"
                  className="w-full justify-center text-xs font-bold"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {pkg.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. DELIVERABLES BREAKDOWN (3 EXECUTIVE INSIGHT PACKS) ───────────── */}
      <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="golden">15 Executive Deliverables</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white">3 Executive Insight Packs</h2>
          <p className="text-sm text-slate-300">
            Every engagement produces 15 distinct executive-grade deliverables synthesized by our AI engine and vetted by senior strategy consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DELIVERABLE_PACKS.map((pack, idx) => (
            <div key={idx} className="bg-navy-900/90 rounded-2xl p-6 border border-navy-700/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-golden-400 uppercase tracking-widest border-b border-navy-800 pb-2">
                  PACK 0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{pack.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pack.description}</p>

                <div className="pt-2 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-golden-300 tracking-wider block">Deliverables Included:</span>
                  <div className="space-y-1.5">
                    {pack.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="text-xs font-semibold text-slate-200 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-golden-400 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. FEATURE COMPARISON TABLE ─────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          badgeText="Full Comparison"
          title="Comprehensive Feature & Deliverable Table"
          subtitle="Compare Capabilities Across Engagement Tiers"
        />

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs sm:text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-950 text-white border-b border-navy-800">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider">Deliverable / Feature</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-slate-300">Foundation (₹3.5L+)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-golden-400 bg-navy-900/80">Growth (₹7.5L+)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-slate-300">Enterprise (Custom)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TABLE_COMPARISON.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="py-3.5 px-6 font-bold text-navy-950">{row.feature}</td>
                    <td className="py-3.5 px-6 text-navy-700">{row.foundation}</td>
                    <td className="py-3.5 px-6 font-bold text-navy-900 bg-golden-500/5">{row.growth}</td>
                    <td className="py-3.5 px-6 text-navy-700">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE INVESTMENT ESTIMATOR ──────────────────────────── */}
      <section className="space-y-6">
        <InvestmentEstimator />
      </section>

      {/* ── 7. DATA SECURITY & CLIENT PORTAL HIGHLIGHTS ─────────────────── */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="golden">Data Isolation & Governance</Badge>
          <h2 className="text-3xl font-black text-white">Enterprise Data Security & Client Portal</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Addressing C-suite security concerns with strict data isolation policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 w-fit border border-slate-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Public Model Training</h3>
            <p className="text-slate-300 leading-relaxed">
              Your internal data, workshop responses, and transcript logs are completely isolated and never used to train public or third-party AI models.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 text-golden-400 w-fit border border-slate-700">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Enterprise Tenant Security</h3>
            <p className="text-slate-300 leading-relaxed">
              All discovery data is stored in isolated, encrypted cloud databases with strict Role-Based Access Control (RBAC).
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 text-blue-400 w-fit border border-slate-700">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Read-Only Client Portal</h3>
            <p className="text-slate-300 leading-relaxed">
              Clients receive secure portal credentials to monitor progress, review responses, and download approved deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS (ACCORDION) ────────────────────── */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <SectionHeader
          badgeText="Questions & Answers"
          title="Frequently Asked Questions"
          subtitle="Everything You Need to Know About AI Transformation Engagements"
        />

        <div className="space-y-4">
          {FAQS_LIST.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
              <h3 className="text-base font-bold text-navy-950 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-golden-600 shrink-0 mt-1" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-navy-700 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. FINAL CALL TO ACTION (CTA) ─────────────────────────────────── */}
      <div className="bg-navy-950 text-white rounded-3xl p-10 text-center space-y-6 border border-golden-500/30 shadow-2xl">
        <Badge variant="golden">Get Started</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Ready to Accelerate Your AI Transformation Journey?
        </h2>
        <p className="text-sm text-navy-200 max-w-2xl mx-auto leading-relaxed">
          Schedule a no-obligation Discovery Call with a senior Nisol AI strategist to review your goals, select the right engagement tier, and establish your organizational AI baseline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Schedule Your Discovery Call
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="border-golden-500/40 text-golden-300 hover:bg-golden-500/10">
            Contact Strategy Team
          </Button>
        </div>

        <div className="pt-6 border-t border-navy-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-6">
          <span>📧 Email: <strong>nisollabs@gmail.com</strong></span>
          <span>🌐 Client Portal: <strong>Nisol Discovery Portal</strong></span>
        </div>
      </div>
    </div>
  );
}
