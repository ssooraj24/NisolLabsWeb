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
    id: "foundation",
    name: "Foundation Diagnostic",
    badge: "STARTER",
    price: "₹4,50,000",
    priceUSD: "$5,500",
    priceSub: "Fixed-Price SOW (Scope-Based)",
    duration: "1–2 Weeks (7–11 Business Days)",
    ideal: "For growing organizations (10–50 employees) seeking rapid 360° evaluation across all 15 business capabilities.",
    popular: false,
    ctaText: "Book Foundation Call",
    ctaLink: "/contact?type=discovery-call&package=Foundation",
    highlights: [
      "Full 360° Diagnostic across 15 capabilities (62 questions)",
      "Sector Benchmarking against 8 industry verticals",
      "Executive AI Readiness Assessment & Maturity Scorecard",
      "2D Opportunity Bubble Matrix & Top 20 Use Cases",
      "Phased 30/90/180/365-Day Transformation Roadmap",
      "Interactive Intelligence Portal (Read-Only Access)",
      "Executive Readout & Findings Session"
    ]
  },
  {
    id: "growth",
    name: "Growth Transformation",
    badge: "MOST POPULAR",
    price: "₹7,50,000",
    priceUSD: "$9,500",
    priceSub: "Fixed-Price SOW (Scope-Based)",
    duration: "2–4 Weeks (10–15 Business Days)",
    ideal: "For mid-market enterprises (51–250 employees) needing board-level financial justification and engineering architecture.",
    popular: true,
    ctaText: "Talk to an AI Strategist",
    ctaLink: "/contact?type=discovery-call&package=Growth",
    highlights: [
      "Everything in Foundation, plus:",
      "CFO & Board Investment Memorandum (10 Pages, NPV & IRR)",
      "3-Scenario Sensitivity Stress Test (75%–125% adoption)",
      "Data Strategy & Vector Lakehouse Blueprint (12 Pages)",
      "5-Dimension Data Quality Scorecard (Completeness, Accuracy, etc.)",
      "5×5 Risk & Regulatory Register (DPDP Act 2023 / EU AI Act)",
      "Organizational Change Management (OCM) Plan & RACI Matrix",
      "Role-Based Upskilling Curricula (Staff, Champions, Engineers)",
      "Solution Blueprints for Top 5 Priority Use Cases",
      "Executive Steering Group Readout Session"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Scale",
    badge: "CUSTOM SCOPE",
    price: "Custom Quote",
    priceUSD: "Custom",
    priceSub: "Tailored to Multi-Entity Scope",
    duration: "4–8 Weeks (Phased Rollout)",
    ideal: "For large enterprises (250+ employees) requiring multi-entity governance, custom architectures, and pilot evaluation.",
    popular: false,
    ctaText: "Request Enterprise Proposal",
    ctaLink: "/contact?type=proposal&package=Enterprise",
    highlights: [
      "Everything in Growth, plus:",
      "Multi-entity & multi-location operational scoping",
      "Empirical PoC Evaluation & Scalability Dossier (8 Pages)",
      "Live Pilot Telemetry & Go/No-Go Decision Gate Matrix",
      "Custom Multi-Agent Cluster & PII Proxy Topology",
      "AI Center of Excellence (CoE) Charter & Governance",
      "Real-Time Change Data Capture (CDC) Pipeline Architecture",
      "Dedicated Enterprise Tenant Intelligence Portal",
      "Quarterly Re-benchmarking & Steering Advisory"
    ]
  }
];

const DELIVERABLES_SUMMARY = [
  {
    title: "1. Flagship AI Transformation Strategy",
    pages: "~30 Pages",
    badge: "CEO & Steering Comm.",
    desc: "Comprehensive diagnostic covering 15 capabilities, 8 industry benchmarks, 2D opportunity bubble chart, and 4-phase transformation roadmap."
  },
  {
    title: "2. CFO & Board Investment Memo",
    pages: "~10 Pages",
    badge: "Board & CFO",
    desc: "Structured financial business case featuring Net Present Value (NPV), IRR (44.5%), 3-scenario sensitivity stress tests, and formal Board Resolution."
  },
  {
    title: "3. Data Strategy & Vector Blueprint",
    pages: "~12 Pages",
    badge: "CTO & Data Leads",
    desc: "Technical blueprint detailing 5 data quality dimensions, pgvector/Qdrant BM25 hybrid search topology, and data prep cost allocations."
  },
  {
    title: "4. PoC Evaluation & Scalability Dossier",
    pages: "~8 Pages",
    badge: "Product & BU Heads",
    desc: "Empirical validation of pilot prototypes (accuracy, latency SLAs, task reduction) with a rigorous Go/No-Go decision matrix for production scale."
  }
];

const COMPARISON_ROWS = [
  { feature: "Diagnostic Depth", foundation: "15 Capabilities / 62 Questions", growth: "15 Capabilities / 62 Questions", enterprise: "Extended Multi-Entity Scope" },
  { feature: "Industry Peer Benchmarking", foundation: "8 Sectors (Median)", growth: "8 Sectors (Median + Top Quartile)", enterprise: "Global Competitor Deep-Dive" },
  { feature: "Opportunity Prioritization", foundation: "2D Bubble Matrix (20 Cases)", growth: "2D Bubble Matrix (20 Cases)", enterprise: "Custom Priority Scorecards" },
  { feature: "Financial Modeling", foundation: "Standard ROI & Payback", growth: "CFO Board Memo + Sensitivity Table", enterprise: "Multi-Entity Financial P&L Model" },
  { feature: "Risk & Regulatory Register", foundation: "Basic Risk Stance", growth: "5x5 Matrix (DPDP Act / EU AI Act)", enterprise: "Enterprise Zero-Trust SLA Map" },
  { feature: "Data Readiness & Lakehouse Spec", foundation: "Readiness Score", growth: "5-Dimension Scorecard + CDC Spec", enterprise: "Full Vector DB Schema & Topology" },
  { feature: "Change Management & RACI", foundation: "General Guidance", growth: "Full OCM Plan + Upskilling Curricula", enterprise: "Custom Org Design & CoE Setup" },
  { feature: "PoC Pilot Evaluation", foundation: "—", growth: "Optional Add-on", enterprise: "Included (Empirical Gate Dossier)" },
  { feature: "Technical Solution Blueprints", foundation: "—", growth: "Top 5 Priority Use Cases", enterprise: "All Priority Implementations" },
  { feature: "Delivery Timeline", foundation: "7–11 Business Days", growth: "10–15 Business Days", enterprise: "Phased (4–8 Weeks)" },
  { feature: "IP Ownership", foundation: "100% Client Owned", growth: "100% Client Owned", enterprise: "100% Client Owned" }
];

const FAQS = [
  {
    q: "Why does Nisol AI offer fixed-price engagements instead of hourly billing?",
    a: "Traditional consulting firms charge open-ended time and materials, which misaligns incentives—the longer they take, the more they bill. Nisol Discovery™ operates on fixed-scope, fixed-price SOWs backed by our Nisol Intelligence™ automation platform, delivering board-ready outcomes in 7–11 days with zero budget surprises."
  },
  {
    q: "How are the financial ROI numbers calculated?",
    a: "We do not use generic AI hype numbers. Our analytics engine calibrates projections using your company's actual headcount, revenue tier, payroll pools, and manual task exposure percentages across departments. We also include a 3-scenario CFO sensitivity stress test (Conservative, Base, Optimistic) using a 10% discount rate."
  },
  {
    q: "What happens after the Discovery engagement?",
    a: "You have complete freedom with Zero Lock-In. You own all 15 deliverables, architecture blueprints, and code specs. You can choose to: (1) Build internally with your own engineering team using our specs, (2) Partner with Nisol AI to build and deploy production multi-agent systems, or (3) Have Nisol AI monitor and govern your existing vendors."
  },
  {
    q: "How does Nisol Discovery compare to Big-4 consulting assessments?",
    a: "Big-4 firms (KPMG, McKinsey, Deloitte) typically charge ₹25L–₹75L ($50k–$150k+) and take 3–6 months to deliver subjective PowerPoint decks. Nisol AI delivers superior technical rigour, code-level blueprints, vector database topologies, and deterministic financial models in 7–11 days at a fraction of the cost."
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? "bg-navy-950 text-white border-2 border-golden-500 shadow-2xl scale-[1.02]"
                : "bg-white text-navy-950 border border-slate-200 shadow-md hover:shadow-xl"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-golden-500 to-golden-600 text-navy-950 font-black text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                Recommended For Most Enterprises
              </div>
            )}

            <div className="space-y-6">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  tier.popular ? "bg-golden-500/20 text-golden-400 border border-golden-500/30" : "bg-slate-100 text-slate-700"
                }`}>
                  {tier.badge}
                </span>
                <h3 className="text-2xl font-black mt-3">{tier.name}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${tier.popular ? "text-navy-200" : "text-slate-600"}`}>
                  {tier.ideal}
                </p>
              </div>

              <div className="border-t border-b py-4 border-slate-200/40">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black">{tier.price}</span>
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
                <ul className="space-y-2.5 text-xs font-medium">
                  {tier.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.popular ? "text-golden-400" : "text-emerald-600"}`} />
                      <span className={tier.popular ? "text-navy-100" : "text-slate-700"}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Button
                href={tier.ctaLink}
                variant={tier.popular ? "primary" : "secondary"}
                size="lg"
                className={`w-full justify-center ${tier.popular ? "bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-navy-950 font-black border-none shadow-lg" : ""}`}
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
          description="Compare diagnostic scope, technical architectures, and financial modeling depth across all three tiers."
          badgeText="Side-by-Side"
          badgeVariant="outline"
        />

        <div className="max-w-5xl mx-auto overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-navy-950 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider w-1/3">Feature / Capability</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Foundation</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-golden-400">Growth (Most Popular)</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Enterprise Scale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-navy-950">{row.feature}</td>
                  <td className="px-6 py-4 text-slate-600">{row.foundation}</td>
                  <td className="px-6 py-4 font-bold text-navy-950 bg-golden-50/40">{row.growth}</td>
                  <td className="px-6 py-4 text-slate-600">{row.enterprise}</td>
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
