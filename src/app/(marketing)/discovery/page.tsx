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
  Download,
  Award
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
  title: "Nisol Discovery™ | Enterprise Intelligence Architecture in 7 Days",
  description: "Two senior AI architects. 62 capability dimensions. A museum-grade board dossier your CFO can present on Monday morning. Fixed-price, outcome-based engagements.",
};

const DIFFERENTIATOR_MATRIX = [
  {
    dimension: "Speed to Insight",
    traditional: "8–12 Weeks (Consulting Drag)",
    nisol: "7–11 Business Days (3 Days for Spark)",
    highlight: true
  },
  {
    dimension: "Architect Caliber",
    traditional: "Junior analysts learning on your budget",
    nisol: "2-Person Master Architect Pod (40+ Yrs Enterprise Experience)",
    highlight: true
  },
  {
    dimension: "Deliverable Standard",
    traditional: "Generic 120-slide PowerPoint decks",
    nisol: "15 Museum-Grade Board Deliverables & CFO Financial Models",
    highlight: true
  },
  {
    dimension: "Financial Justification",
    traditional: "Vague high-level assumptions",
    nisol: "Deterministic DCF, NPV, IRR (44.5%) & 3-Scenario Stress Tests",
    highlight: false
  },
  {
    dimension: "Pricing Model",
    traditional: "Open-ended time & materials",
    nisol: "Transparent Fixed-Price SOW by Outcome",
    highlight: true
  },
  {
    dimension: "IP & Code Ownership",
    traditional: "Proprietary vendor lock-in",
    nisol: "100% Sovereign IP — You Own Every Line of Code Forever",
    highlight: true
  }
];

const PACKAGES = [
  {
    name: "Nisol Spark",
    badge: "FIRST LOOK",
    price: "₹1,50,000",
    priceSub: "$1,800 USD • Fixed-Price 3-Day Sprint",
    duration: "3 Business Days",
    ideal: "For companies wanting a fast, laser-focused evaluation of AI opportunities, token spend, or data compliance before full commitment.",
    ctaText: "Apply for Spark Sprint →",
    ctaLink: "/contact?package=Spark",
    popular: false,
    features: [
      "Choice of 1 Focus Track: Opportunity Sprint OR Cost Audit OR Compliance Check",
      "Rapid 3-day evaluation by Senior AI Architect",
      "Identification of Top 5 High-Impact Use Cases or Token Savings",
      "8–10 Page Executive Intelligence Brief",
      "Direct 100% credit toward Nisol One if upgraded within 30 days"
    ]
  },
  {
    name: "Nisol One",
    badge: "THE BEGINNING",
    price: "₹4,50,000",
    priceSub: "$5,500 USD • Fixed-Price SOW",
    duration: "7–11 Business Days",
    ideal: "For growing organizations seeking a rapid 360° evaluation across all 15 business capabilities.",
    ctaText: "Apply for Nisol One →",
    ctaLink: "/contact?package=One",
    popular: false,
    features: [
      "Full 360° Diagnostic across ALL 15 Capabilities (62 Questions)",
      "Sector Benchmarking against 8 Industry Vertical Profiles",
      "Executive AI Readiness Assessment & Maturity Scorecard",
      "2D Opportunity Bubble Matrix & Top 5 Prioritized Quick Wins",
      "Wave 1 (M 0–3) Transformation Roadmap & Lumpsum Capital Budget",
      "Basic Regulatory Risk Stance (DPDP / EU AI Act)",
      "Executive Readout & Findings Session"
    ]
  },
  {
    name: "Nisol Pro",
    badge: "MOST POPULAR",
    price: "₹8,50,000",
    priceSub: "$10,500 USD • Fixed-Price SOW",
    duration: "10–15 Business Days",
    ideal: "For mid-market enterprises needing board-ready financial models, architecture blueprints, and staff upskilling.",
    ctaText: "Apply for Nisol Pro →",
    ctaLink: "/contact?package=Pro",
    popular: true,
    features: [
      "Everything in Nisol One, plus:",
      "CFO & Board Investment Memorandum (DCF, NPV & IRR)",
      "3-Scenario Sensitivity Stress Test (75%–125% adoption)",
      "Data Strategy & Vector Architecture Blueprint (5-Dimension Scorecard)",
      "15 Departmental Action Briefs (Operational Friction & Target Outcomes)",
      "5×5 Risk & Regulatory Register (DPDP Act 2023 / EU AI Act)",
      "Organizational Change Management (OCM) & RACI Governance",
      "2 Workforce Training Tracks Included",
      "Solution Blueprints for Top 5 Priority AI Use Cases"
    ]
  },
  {
    name: "Nisol Enterprise",
    badge: "THE FULL VISION",
    price: "₹18,50,000+",
    priceSub: "$22,500+ USD • Phased Transformation",
    duration: "4–8 Weeks",
    ideal: "For multi-entity conglomerates requiring custom sovereign architectures, pilot evaluation gates, and CoE charter.",
    ctaText: "Apply for Enterprise →",
    ctaLink: "/contact?package=Enterprise",
    popular: false,
    features: [
      "Everything in Nisol Pro, plus:",
      "PoC Decision Gate & Acceptance Protocol (SLA Benchmarks & Gate 0–4 Sign-off)",
      "Shadow AI Exposure & Zero-Trust PII Gateway Spec",
      "Vendor Dependency, Multi-LLM Lock-In & Switch-Cost Teardown",
      "36-Month 3-Horizon Strategic Roadmap",
      "Valuation Multiple Expansion Modeling (15%–25% multiple premium)",
      "Full 3-Track Enablement Suite Included",
      "AI Center of Excellence (CoE) Charter & Multi-Entity Governance"
    ]
  }
];

const DELIVERABLE_PACKS = [
  {
    title: "Executive Intelligence Pack",
    deliverables: [
      "1. Executive Summary & Board Thesis",
      "2. 15-Capability Readiness Stance",
      "3. C-Suite Dashboard & Maturity Score",
      "4. Sector Benchmark Scorecard"
    ],
    description: "High-level strategic findings, maturity radar charts across 15 capabilities, and C-suite alignment dashboards."
  },
  {
    title: "AI Opportunity Pack",
    deliverables: [
      "5. 2D Opportunity Bubble Matrix",
      "6. Top 20 Prioritized Use Cases",
      "7. High-ROI Quick Wins vs. Moonshots",
      "8. Production Execution Queue"
    ],
    description: "Impact vs. Feasibility matrix (2D bubble), catalog of top 20 prioritized use cases, and rapid ROI quick-win categorization."
  },
  {
    title: "Transformation & Governance Pack",
    deliverables: [
      "9. 30/90/180/365-Day Roadmap",
      "10. CFO Financial Model (NPV/IRR)",
      "11. Vector Lakehouse Blueprint",
      "12. Top 5 Solution Blueprints",
      "13. OCM & RACI Governance",
      "14. 5x5 DPDP & EU AI Act Risk Dossier",
      "15. Empirical PoC Gate Protocol"
    ],
    description: "Phased roadmap, deterministic CFO benefit projections, data architecture blueprints, risk governance, and empirical pilot gates."
  }
];

const TABLE_COMPARISON = [
  { feature: "Diagnostic Scope", spark: "1 Focus Track (3-5 Depts)", one: "All 15 Capabilities", pro: "All 15 Capabilities", enterprise: "Multi-Entity / Holding Scope" },
  { feature: "Duration", spark: "3 Business Days", one: "7–11 Business Days", pro: "10–15 Business Days", enterprise: "4–8 Weeks" },
  { feature: "Senior Architect Engagement", spark: "1 Senior Architect", one: "2 Senior Architects", pro: "2 Senior Architects", enterprise: "Principal Architect Pod" },
  { feature: "Executive Brief / Dossier", spark: "8–10 Page Brief", one: "30+ Page Board Dossier", pro: "Full 4-Pack Portfolio", enterprise: "Full Portfolio + CoE Charter" },
  { feature: "CFO Investment Memorandum", spark: "Estimated Range", one: "Basic Budget", pro: "DCF, NPV & IRR (44.5%)", enterprise: "Multi-Entity Financial Model" },
  { feature: "Data Strategy & Lakehouse", spark: "Hygiene Scan", one: "Readiness Score", pro: "Vector Lakehouse Blueprint", enterprise: "CDC Sync & Sovereign VPC" },
  { feature: "Governance & Risk Register", spark: "Basic Stance", one: "Regulatory Checklist", pro: "5x5 DPDP/EU AI Act Matrix", enterprise: "Zero-Trust Proxy & Shadow AI" },
  { feature: "Workforce Training Tracks", spark: "—", one: "Available as Add-On", pro: "2 Tracks Included", enterprise: "Full 3-Track Enablement" },
  { feature: "PoC Decision Gate Protocol", spark: "—", one: "—", pro: "Standard Gates", enterprise: "Empirical Gate 0–4 SLA Protocol" },
  { feature: "Client IP Ownership", spark: "100% Client Owned", one: "100% Client Owned", pro: "100% Client Owned", enterprise: "100% Client Owned" },
];

const FAQS_LIST = [
  {
    q: "How does Nisol Discovery™ differ from traditional management consulting?",
    a: "Traditional consulting relies on junior analysts, months of manual interviews, and generic slide decks. We send two master enterprise architects who audit 62 dimensions in 7 days and deliver museum-grade board dossiers with mathematical CFO models."
  },
  {
    q: "What is the Nisol Spark 100% credit guarantee?",
    a: "If you start with Nisol Spark (₹1,50,000) and decide to upgrade to Nisol One within 30 days of receiving your brief, 100% of your ₹1.5L fee is credited directly toward Nisol One. You risk nothing."
  },
  {
    q: "How long does the entire engagement take?",
    a: "Duration is strictly timeboxed: 3 business days for Nisol Spark, 7 to 11 business days for Nisol One, and 10 to 15 business days for Nisol Pro from kickoff to final board readout."
  },
  {
    q: "Is our business data safe during the audit?",
    a: "Strictly guaranteed. All discussions and data samples are covered by mutual non-disclosure agreements prior to technical review. We enforce zero third-party model training—your data never leaves your secure perimeter."
  },
  {
    q: "What happens after Discovery?",
    a: "You have complete freedom. With our Zero Lock-In Guarantee, you own every deliverable, architecture blueprint, and line of code. You can build it with your internal team, hire third-party vendors, or engage Nisol AI for scaled execution."
  }
];

export default function DiscoveryPage() {
  return (
    <div className="space-y-24 sm:space-y-32 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── 1. HERO SECTION ───────────────────────────────────────────── */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-golden-400" />
          <span>The Nisol Discovery™ Framework</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy-950 tracking-tight leading-[1.08]">
          Your Enterprise Intelligence System, <br />
          <span className="golden-gradient-text">Architected in 7 Days.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-navy-700/90 max-w-3xl mx-auto leading-relaxed font-medium">
          "Two senior enterprise architects. 62 capability dimensions. A museum-grade board dossier your CFO can present on Monday morning."
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button href="/contact?package=One" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Discovery →
          </Button>
          <Button href="#pricing" variant="navy" size="lg">
            Explore Engagement Tiers
          </Button>
        </div>

        {/* Rhythm Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-2xl font-black text-golden-600">7–11 Days</div>
            <div className="text-[11px] text-slate-500 font-medium">Executive Speed</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-2xl font-black text-navy-950">62 Dimensions</div>
            <div className="text-[11px] text-slate-500 font-medium">Rigorous Audit</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-2xl font-black text-emerald-600">15 Dossiers</div>
            <div className="text-[11px] text-slate-500 font-medium">Board Deliverables</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-2xl font-black text-golden-600">0% Lock-In</div>
            <div className="text-[11px] text-slate-500 font-medium">100% Client IP</div>
          </div>
        </div>
      </section>

      {/* ── 2. WHY FASTER & INCLUSIONS ─────────────────────────────────── */}
      <WhyFasterInclusions />

      {/* ── 3. DIFFERENTIATOR MATRIX (Nisol Standard vs Industry) ──────────────── */}
      <section className="space-y-10 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Built Different</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            The Anti-Consulting Discovery Standard
          </h2>
          <p className="text-sm text-navy-700/80">
            How we eliminate months of consulting drag while delivering vastly superior architectural rigor.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-xs sm:text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-950 text-white border-b border-navy-800">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider">Dimension</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-rose-400">Traditional Consulting</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-golden-400 bg-navy-900/80">The Nisol AI Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DIFFERENTIATOR_MATRIX.map((row, idx) => (
                  <tr key={idx} className={row.highlight ? "bg-golden-50/20" : "bg-white"}>
                    <td className="py-4 px-6 font-bold text-navy-950">{row.dimension}</td>
                    <td className="py-4 px-6 text-slate-500">{row.traditional}</td>
                    <td className="py-4 px-6 font-bold text-navy-950 bg-golden-500/5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{row.nisol}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4. 15 BOARD-READY DELIVERABLES GRID ───────────────────────────── */}
      <BoardDeliverablesGrid />

      {/* ── 5. PRICING JUSTIFICATION VALUE FRAMEWORK ──────────────────────── */}
      <PricingJustificationSection />

      {/* ── 6. ZERO VENDOR LOCK-IN GUARANTEE ─────────────────────────────── */}
      <ZeroLockInGuarantee />

      {/* ── 7. ENGAGEMENT PACKAGES (4-TIER CARDS) ────────────────────────── */}
      <section className="space-y-12" id="pricing">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Engagement Hierarchy</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
            Four Iconic Tiers. Fixed-Price SOW.
          </h2>
          <p className="text-base text-navy-700/80">
            Transparent, outcome-based investments designed to scale strictly by your enterprise scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? "bg-navy-950 text-white ring-2 ring-golden-500 shadow-2xl lg:-translate-y-2"
                  : "bg-white text-navy-950 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      pkg.popular ? "bg-golden-500 text-navy-950" : "bg-navy-100 text-navy-800"
                    }`}>
                      {pkg.badge}
                    </span>
                    <span className={`text-xs font-medium ${pkg.popular ? "text-slate-400" : "text-slate-500"}`}>
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black mb-1">{pkg.name}</h3>
                  <p className={`text-xs leading-relaxed ${pkg.popular ? "text-slate-300" : "text-slate-600"}`}>
                    {pkg.ideal}
                  </p>
                </div>

                <div className="space-y-1 border-y border-slate-200/20 py-4">
                  <div className={`text-3xl font-black ${pkg.popular ? "text-golden-400" : "text-navy-950"}`}>
                    {pkg.price}
                  </div>
                  <div className={`text-xs ${pkg.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {pkg.priceSub}
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <span className={`font-bold uppercase tracking-wider block ${pkg.popular ? "text-golden-400" : "text-navy-900"}`}>
                    Included Scope:
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.popular ? "text-golden-400" : "text-emerald-600"}`} />
                        <span className={pkg.popular ? "text-slate-200" : "text-navy-800"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  href={pkg.ctaLink}
                  variant={pkg.popular ? "primary" : "navy"}
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

      {/* ── 8. DELIVERABLES BREAKDOWN (3 EXECUTIVE INSIGHT PACKS) ───────────── */}
      <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="golden">Museum-Grade Dossier</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white">3 Executive Deliverable Packs</h2>
          <p className="text-sm text-slate-300">
            Every deliverable leaving Nisol AI follows museum-grade unboxing principles: custom-bound physical dossiers, clear CFO sensitivity models, and deterministic architectural blueprints.
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

      {/* ── 9. FEATURE COMPARISON TABLE ─────────────────────────────────── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="golden" className="mx-auto">Full Comparison</Badge>
          <h2 className="text-3xl font-black text-navy-950">Compare Capabilities Across Tiers</h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-xs sm:text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-950 text-white border-b border-navy-800">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider">Dimension / Feature</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-emerald-400">Spark (₹1.5L)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-slate-300">Nisol One (₹4.5L)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-golden-400 bg-navy-900/80">Nisol Pro (₹8.5L ★)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-slate-300">Enterprise (₹18.5L+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TABLE_COMPARISON.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="py-3.5 px-6 font-bold text-navy-950">{row.feature}</td>
                    <td className="py-3.5 px-6 font-medium text-emerald-800 bg-emerald-50/40">{row.spark}</td>
                    <td className="py-3.5 px-6 text-navy-700">{row.one}</td>
                    <td className="py-3.5 px-6 font-bold text-navy-900 bg-golden-500/5">{row.pro}</td>
                    <td className="py-3.5 px-6 text-navy-700">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 10. INTERACTIVE INVESTMENT ESTIMATOR ──────────────────────────── */}
      <section className="space-y-6">
        <InvestmentEstimator />
      </section>

      {/* ── 11. DATA SECURITY HIGHLIGHTS ─────────────────────────────────── */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="golden">Data Sovereignty</Badge>
          <h2 className="text-3xl font-black text-white">Enterprise Security & Zero Public Training</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Your intelligence belongs inside your perimeter. Strict tenant isolation on every engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 w-fit border border-slate-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Public Model Training</h3>
            <p className="text-slate-300 leading-relaxed">
              Your internal data, workshop responses, and transcript logs are completely isolated and never used to train external LLMs.
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

      {/* ── 12. FREQUENTLY ASKED QUESTIONS ───────────────────────────────── */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <SectionHeader
          badgeText="Questions & Answers"
          title="Frequently Asked Questions"
          subtitle="Everything You Need to Know About Nisol Discovery™"
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

      {/* ── 13. FINAL CONTROLLED SCARCITY CLOSE ───────────────────────────── */}
      <section className="bg-navy-950 text-white rounded-3xl p-10 text-center space-y-6 border border-golden-500/30 shadow-2xl max-w-4xl mx-auto">
        <Badge variant="golden" className="mx-auto">Controlled Scarcity</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          We Partner With Only 5 New Enterprises Each Month.
        </h2>
        <p className="text-sm text-navy-200 max-w-2xl mx-auto leading-relaxed">
          Our senior systems architects dedicate their undivided attention to every engagement. Apply now to secure your transformation sprint.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button href="/contact?package=One" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Discovery Session →
          </Button>
          <Button href="/assessment" variant="navy" size="lg">
            Take 2-Min Readiness Quiz
          </Button>
        </div>

        <div className="pt-6 border-t border-navy-800 text-xs text-slate-400">
          Mutual NDA Guaranteed • Applications Reviewed Within 48 Hours
        </div>
      </section>
    </div>
  );
}
