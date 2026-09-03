import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  BarChart3, 
  Sparkles, 
  FileCheck, 
  TrendingUp, 
  Users, 
  Building2, 
  Zap, 
  Database, 
  Scale, 
  MessageSquare, 
  Lock, 
  Clock, 
  Download, 
  HelpCircle, 
  FileText, 
  X, 
  DollarSign,
  Briefcase,
  Target,
  Workflow
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZeroLockInGuarantee } from "@/components/shared/ZeroLockInGuarantee";
import { CostOfNotKnowing } from "@/components/shared/CostOfNotKnowing";
import { ComparisonMatrix } from "@/components/shared/ComparisonMatrix";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models | Nisol AI",
  description: "Transparent, outcome-based pricing for enterprise AI transformation. Fixed-price discovery engagements, CFO-ready business cases, and zero lock-in.",
};

const PRICING_TIERS = [
  {
    id: "spark",
    name: "Nisol Spark",
    badge: "FIRST LOOK",
    price: "₹1,50,000",
    priceUSD: "$1,800",
    priceSub: "Fixed-Price 3-Day Sprint",
    duration: "3 Business Days",
    ideal: "For companies considering AI or wanting a fast evaluation of AI opportunities, token spend, or data compliance before full commitment.",
    popular: false,
    ctaText: "Apply for Spark Sprint",
    ctaLink: "/contact?type=apply&package=Spark",
    highlights: [
      "Choice of 1 Focus Track: Opportunity Sprint OR Cost Audit OR Data/Compliance Check",
      "Rapid 3-day evaluation by Senior AI Architect",
      "Identification of Top 5 High-Impact AI Use Cases or Token Savings",
      "8–10 Page Executive Intelligence Brief",
      "Direct 100% credit toward Nisol One if upgraded within 30 days"
    ]
  },
  {
    id: "foundation",
    name: "Nisol One",
    badge: "THE BEGINNING",
    price: "₹4,50,000",
    priceUSD: "$5,500",
    priceSub: "Fixed-Price SOW (Scope-Based)",
    duration: "1–2 Weeks (7–11 Business Days)",
    ideal: "For growing organizations (10–50 employees) seeking rapid 360° evaluation across all 15 business capabilities.",
    popular: false,
    ctaText: "Apply for Nisol One",
    ctaLink: "/contact?type=apply&package=One",
    highlights: [
      "Full 360° Diagnostic across 15 capabilities (62 questions)",
      "Sector Benchmarking against 8 industry verticals",
      "Executive AI Readiness Assessment & Maturity Scorecard",
      "2D Opportunity Bubble Matrix & Top 5 Prioritized Quick Wins",
      "Wave 1 (M 0–3) Transformation Roadmap & Lumpsum Budget",
      "Basic Regulatory Checklist & Risk Stance",
      "0 Training Tracks (Self-Serve Diagnostic; Training available as add-on)",
      "Executive Readout & Findings Session"
    ]
  },
  {
    id: "growth",
    name: "Nisol Pro",
    badge: "MOST POPULAR",
    price: "₹8,50,000",
    priceUSD: "$10,500",
    priceSub: "Fixed-Price SOW (Scope-Based)",
    duration: "2–4 Weeks (10–15 Business Days)",
    ideal: "For mid-market enterprises (51–250 employees) needing board-level financial justification, engineering architecture, and staff upskilling.",
    popular: true,
    ctaText: "Apply for Nisol Pro",
    ctaLink: "/contact?type=apply&package=Pro",
    highlights: [
      "Everything in Nisol One, plus:",
      "CFO & Board Investment Memorandum (DCF, NPV & IRR)",
      "3-Scenario Sensitivity Stress Test (75%–125% adoption)",
      "Data Strategy & Vector Architecture Blueprint (5-Dimension Hygiene)",
      "15 Departmental Action Briefs (Operational Friction & Target Outcomes)",
      "5×5 Risk & Regulatory Register (DPDP Act 2023 / EU AI Act)",
      "Organizational Change Management (OCM) Plan & RACI Matrix",
      "2 Workforce Training Tracks Included (All-Hands Demystification + Champions Labs)",
      "Solution Blueprints for Top 5 Priority Use Cases",
      "Single-Pod Capacity Delivery Benchmark Guarantee"
    ]
  },
  {
    id: "enterprise",
    name: "Nisol Enterprise",
    badge: "THE FULL VISION",
    price: "₹18,50,000",
    priceUSD: "$22,500",
    priceSub: "Starting from ₹18,50,000 (Multi-Entity Scope)",
    duration: "4–8 Weeks (Phased Rollout)",
    ideal: "For large enterprises (250+ employees) requiring multi-entity governance, custom architectures, competitive defense, and pilot evaluation.",
    popular: false,
    ctaText: "Apply for Enterprise",
    ctaLink: "/contact?type=apply&package=Enterprise",
    highlights: [
      "Everything in Nisol Pro, plus:",
      "PoC Decision Gate & Acceptance Protocol (SLA Benchmarks & Gate 0–4 Sign-off)",
      "Shadow AI Exposure, Penetration Audit & Zero-Trust PII Gateway Spec",
      "Vendor Dependency, Multi-LLM Lock-In & Switch-Cost Teardown",
      "36-Month 3-Horizon Strategic Warfare Roadmap",
      "Valuation Multiple Expansion Modeling (15%–25% multiple premium)",
      "Full 3-Track Enablement Suite Included (All-Hands + Champions + Leadership Seminar)",
      "Real-Time Change Data Capture (CDC) Pipeline Specification",
      "AI Center of Excellence (CoE) Charter & Multi-Entity Governance",
      "Quarterly Re-benchmarking & Executive Steering Advisory"
    ]
  }
];

const DELIVERABLES_SUMMARY = [
  {
    title: "1. Flagship AI Transformation Strategy",
    pages: "9 Comprehensive Chapters",
    badge: "CEO & Steering Comm.",
    desc: "Comprehensive diagnostic covering 15 capabilities, 8 industry benchmarks, 2D opportunity bubble chart, 20 use cases, and 6-horizon roadmap."
  },
  {
    title: "2. CFO & Board Investment Memo",
    pages: "Executive Decision Memo",
    badge: "Board & CFO",
    desc: "Audit-ready financial business case featuring Net Present Value (NPV), IRR, Hard vs. Soft savings decomposition, 3-scenario stress tests, and formal Board Resolution."
  },
  {
    title: "3. Data Strategy & Vector Architecture",
    pages: "Technical Architecture Spec",
    badge: "CTO & Data Leads",
    desc: "Technical blueprint detailing 5 data quality dimensions, hybrid vector topology (pgvector/Qdrant + BM25), real-time CDC specs, and cloud PII gateway."
  },
  {
    title: "4. PoC Decision Gate & Acceptance Dossier",
    pages: "Decision Gate Protocol",
    badge: "Product & BU Heads",
    desc: "Prospective pilot governance protocol defining quantitative SLA thresholds (latency, citation precision, task reduction) and Gate 0–4 Go/No-Go criteria."
  }
];

const COMPARISON_ROWS = [
  { feature: "Diagnostic Depth", spark: "1 Focus Track (3–5 Depts)", foundation: "15 Capabilities / 62 Questions", growth: "15 Capabilities / 62 Questions", enterprise: "Extended Multi-Entity Scope" },
  { feature: "Industry Peer Benchmarking", spark: "—", foundation: "8 Sectors (Median)", growth: "8 Sectors (Median + Top Quartile)", enterprise: "Global Competitor Deep-Dive" },
  { feature: "Opportunity Prioritization", spark: "Top 5 List", foundation: "Top 5 Quick Wins", growth: "2D Bubble Matrix (20 Cases)", enterprise: "Build-vs-Buy & Money-Pit Teardown" },
  { feature: "Financial Modeling", spark: "Estimated ROI Range", foundation: "Lumpsum ROI & Payback", growth: "CFO Board Memo + Phased Budget", enterprise: "Full DCF Model + Valuation Premium" },
  { feature: "Workforce Enablement & Training", spark: "—", foundation: "0 Tracks (Add-on available)", growth: "2 Tracks (All-Hands + Champions Labs)", enterprise: "All 3 Tracks (+ Leadership Seminar)" },
  { feature: "Risk & Regulatory Register", spark: "Basic Checklist (Track C)", foundation: "Basic Regulatory Checklist", growth: "5x5 Matrix (DPDP Act / EU AI Act)", enterprise: "Continuous Audit Architecture" },
  { feature: "Data Strategy & Architecture", spark: "Gap Summary", foundation: "Readiness Score", growth: "5-Dimension Scorecard + CDC Spec", enterprise: "Full Vector Lakehouse & PII Gateway" },
  { feature: "Shadow AI & Vendor Dependency", spark: "—", foundation: "—", growth: "—", enterprise: "Included (DLP & Switch-Cost Audit)" },
  { feature: "Change Management & RACI", spark: "—", foundation: "General Guidance", growth: "Full OCM Plan + RACI Matrix", enterprise: "Custom Org Design & CoE Setup" },
  { feature: "PoC Decision Gate Protocol", spark: "—", foundation: "—", growth: "Optional Add-on", enterprise: "Included (Prospective Gate Dossier)" },
  { feature: "Cloud & LLM Infrastructure", spark: "Direct Pass-Through", foundation: "Direct Client Pass-Through", growth: "Direct Client Pass-Through", enterprise: "Direct Client Pass-Through" },
  { feature: "Delivery Timeline", spark: "3 Business Days", foundation: "7–11 Business Days", growth: "10–15 Business Days", enterprise: "Phased (4–8 Weeks)" },
  { feature: "IP Ownership", spark: "100% Client Owned", foundation: "100% Client Owned", growth: "100% Client Owned", enterprise: "100% Client Owned" }
];

const FAQS = [
  {
    q: "Why does Nisol AI offer fixed-price engagements instead of hourly billing?",
    a: "Traditional consulting firms charge open-ended time and materials, which misaligns incentives—the longer they take, the more they bill. Nisol Discovery™ operates on fixed-scope, fixed-price SOWs backed by our Nisol Intelligence™ automation platform, delivering board-ready outcomes in weeks with zero budget surprises."
  },
  {
    q: "How does the Workforce Enablement & Training program work?",
    a: "We ensure your employees do not start from zero. Our Growth plan includes 2 core tracks: Track 1 (All-Hands AI Foundations & Future of Work, 2x 90-min sessions to demystify AI and address fear of displacement) and Track 2 (Department Champions Sandbox Labs, 4x 2-hr sessions on practical workflow shortcuts). Enterprise plans add Track 3: a half-day leadership seminar for C-suite and managers on workload re-allocation and productivity tracking."
  },
  {
    q: "Why is Cloud compute and LLM token infrastructure a pass-through cost?",
    a: "Nisol AI's professional fees cover solution architecture, prompt engineering, data pipelines, and evaluation harnesses exclusively. All third-party cloud compute (AWS/Azure/GCP VPCs), foundation model token API consumption (OpenAI, Anthropic, Google), and vector database hosting are provisioned inside your enterprise tenant and paid directly by you. This guarantees 100% data residency and eliminates marked-up infrastructure costs."
  },
  {
    q: "What is the Single-Pod Delivery Capacity Benchmark?",
    a: "To protect internal engineering quality and avoid over-taxing your staff, one dedicated Nisol delivery pod delivers exactly one primary strategic initiative per 12-to-14 week cycle. If an enterprise wishes to accelerate velocity with concurrent initiatives, we deploy independent parallel pods."
  },
  {
    q: "How are the financial ROI numbers calculated?",
    a: "We do not use generic AI hype numbers. Our analytics engine calibrates projections using your company's actual headcount, revenue tier, payroll pools, and manual task exposure percentages across departments. We also include a 3-scenario CFO sensitivity stress test (Conservative, Base, Optimistic) using a 10% discount rate."
  },
  {
    q: "How does Nisol Discovery compare to Big-4 consulting assessments?",
    a: "Big-4 firms (KPMG, McKinsey, Deloitte) typically charge ₹25L–₹75L ($50k–$150k+) and take 3–6 months to deliver subjective PowerPoint decks. Nisol AI delivers superior technical rigour, code-level blueprints, vector database topologies, and deterministic financial models in weeks at a fraction of the cost."
  }
];

export default function PricingPage() {
  return (
    <div className="space-y-24 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO HEADER */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-8 pb-4">
        <Badge variant="golden" className="animate-pulse">Outcome-Based Engagements</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-navy-950 tracking-tight leading-none">
          Predictable Pricing for <br />
          <span className="golden-gradient-text">Enterprise AI Transformation</span>
        </h1>
        <p className="text-lg sm:text-xl text-navy-800 font-semibold max-w-3xl mx-auto leading-relaxed">
          Fixed-scope, outcome-driven investments delivering board-ready clarity in weeks—not open-ended consulting billing.
        </p>
        <p className="text-sm sm:text-base text-navy-600 max-w-2xl mx-auto font-medium">
          Every engagement delivers audit-grade deliverables reviewed by senior AI architects, backed by our Zero Lock-In Guarantee.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <Button href="/resources/roi-calculator" variant="secondary" size="lg">
            Try Interactive ROI Calculator →
          </Button>
        </div>
      </div>

      {/* 2. PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? "bg-navy-950 text-white border-2 border-golden-500 shadow-2xl scale-[1.02]"
                : "bg-white text-navy-950 border border-slate-200 shadow-md hover:shadow-xl"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-golden-500 to-golden-600 text-navy-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                Recommended For Most Enterprises
              </div>
            )}

            <div className="space-y-5">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  tier.popular ? "bg-golden-500/20 text-golden-400 border border-golden-500/30" : "bg-slate-100 text-slate-700"
                }`}>
                  {tier.badge}
                </span>
                <h3 className="text-xl font-black mt-3">{tier.name}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${tier.popular ? "text-navy-200" : "text-slate-600"}`}>
                  {tier.ideal}
                </p>
              </div>

              <div className="border-t border-b py-3 border-slate-200/40">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black">{tier.price}</span>
                  <span className={`text-xs font-semibold ${tier.popular ? "text-golden-400" : "text-slate-500"}`}>
                    ({tier.priceUSD})
                  </span>
                </div>
                <div className={`text-[11px] font-medium mt-1 ${tier.popular ? "text-navy-300" : "text-slate-500"}`}>
                  {tier.priceSub} • {tier.duration}
                </div>
              </div>

              <div className="space-y-3">
                <span className={`text-xs font-bold uppercase tracking-wider block ${tier.popular ? "text-golden-400" : "text-slate-900"}`}>
                  What&apos;s Included:
                </span>
                <ul className="space-y-2 text-xs font-medium">
                  {tier.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.popular ? "text-golden-400" : "text-emerald-600"}`} />
                      <span className={tier.popular ? "text-navy-100" : "text-slate-700"}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <Button
                href={tier.ctaLink}
                variant={tier.popular ? "primary" : "secondary"}
                size="md"
                className={`w-full justify-center text-xs ${tier.popular ? "bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-navy-950 font-black border-none shadow-lg" : ""}`}
              >
                {tier.ctaText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. WHAT YOU GET: THE 4 EXECUTIVE DELIVERABLE DOSSIERS */}
      <div className="space-y-12">
        <SectionHeader
          title="What You Get: 4 Board-Ready Deliverables"
          subtitle="Multi-Report Enterprise Deliverable Portfolio"
          description="Unlike traditional consultancies that deliver generic slide decks, Nisol Discovery™ generates 4 specialized, standalone executive dossiers tailored for each stakeholder group."
          badgeText="Tangible Assets"
          badgeVariant="golden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {DELIVERABLES_SUMMARY.map((del, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-golden-600 bg-golden-50 px-2 py-0.5 rounded border border-golden-200">
                    Audience: {del.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{del.pages}</span>
                </div>
                <h4 className="text-base font-black text-navy-950 group-hover:text-golden-600 transition-colors">
                  {del.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {del.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                <span>Executive Quality Guaranteed</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Button href="/discovery/deliverables" variant="secondary" size="md">
            Explore All 15 Deliverables in Detail →
          </Button>
        </div>
      </div>

      {/* 4. SIDE-BY-SIDE COMPARISON TABLE */}
      <div className="space-y-12">
        <SectionHeader
          title="Detailed Package Comparison"
          subtitle="Complete Feature Breakdown"
          description="Compare diagnostic scope, technical architectures, and financial modeling depth across all four tiers."
          badgeText="Side-by-Side"
          badgeVariant="outline"
        />

        <div className="max-w-6xl mx-auto overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-navy-950 text-white">
              <tr>
                <th className="px-5 py-4 text-left font-bold uppercase tracking-wider w-1/4">Feature / Capability</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-emerald-400">Spark (₹1.5L)</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider">One (₹4.5L)</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider text-golden-400">Pro (₹8.5L ★)</th>
                <th className="px-4 py-4 text-left font-bold uppercase tracking-wider">Enterprise (₹18.5L+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-navy-950">{row.feature}</td>
                  <td className="px-4 py-4 text-slate-600 bg-emerald-50/30">{row.spark}</td>
                  <td className="px-4 py-4 text-slate-600">{row.foundation}</td>
                  <td className="px-4 py-4 font-bold text-navy-950 bg-golden-50/40">{row.growth}</td>
                  <td className="px-4 py-4 text-slate-600">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. GUARANTEE & RISK PREVENTION */}
      <div className="space-y-12">
        <ZeroLockInGuarantee />
        <CostOfNotKnowing />
      </div>

      {/* 6. FAQS */}
      <div className="space-y-12 max-w-4xl mx-auto">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Pricing & Engagement Transparency"
          description="Common questions about investment models, delivery timelines, and outcomes."
          badgeText="FAQs"
          badgeVariant="golden"
        />

        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-sm font-black text-navy-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-golden-500 shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6 font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. BOTTOM CTA */}
      <div className="bg-navy-950 text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 border border-golden-500/30 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient-golden opacity-10 pointer-events-none" />
        <Badge variant="golden">Ready to Build Your Business Case?</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Move from AI Uncertainty to an Executable Roadmap in Days
        </h2>
        <p className="text-xs sm:text-sm text-navy-200 max-w-xl mx-auto leading-relaxed">
          Schedule a 30-minute discovery consultation with senior enterprise AI architects to define your scope and expected ROI payback.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <Button href="/contact?type=proposal" variant="navy" size="lg">
            Request a Custom Scope Proposal
          </Button>
        </div>
      </div>

    </div>
  );
}
