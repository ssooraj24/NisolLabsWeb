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
  Share2,
  Lightbulb,
  Workflow,
  Target,
  Download,
  HelpCircle,
  FileText,
  Bookmark
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Nisol Discovery™ Methodology | AI Transformation Framework",
  description: "A proprietary, AI-powered framework to identify, prioritize, and plan your AI transformation across 15 capabilities.",
};

const CAPABILITIES = [
  {
    title: "Leadership & Strategy",
    count: 5,
    icon: Users,
    desc: "Aligning top-level strategic vision, decision authority, success metrics, and ethics governance.",
    color: "from-amber-500/20 to-golden-500/20 text-golden-500 border-golden-500/30"
  },
  {
    title: "IT / Technology",
    count: 5,
    icon: Cpu,
    desc: "Evaluating cloud infrastructure, legacy modernization readiness, vLLM capabilities, and technical stack.",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30"
  },
  {
    title: "Data & Analytics",
    count: 5,
    icon: Database,
    desc: "Auditing knowledge ingestion pipelines, vector readiness, lakehouse setups, and metadata hygiene.",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    title: "Security & Compliance",
    count: 5,
    icon: ShieldCheck,
    desc: "Configuring Zero-Trust guardrails, output compliance, PII masking, and audit telemetry.",
    color: "from-red-500/20 to-rose-500/20 text-rose-400 border-red-500/30"
  },
  {
    title: "Customer Service",
    count: 4,
    icon: MessageSquare,
    desc: "Identifying high-frequency automation loops and conversational agent integration points.",
    color: "from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30"
  },
  {
    title: "Sales",
    count: 4,
    icon: Target,
    desc: "Mapping lead triage, CRM augmentation, automated intelligence, and pipeline acceleration.",
    color: "from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30"
  },
  {
    title: "Marketing",
    count: 4,
    icon: Sparkles,
    desc: "Auditing copywriting, SEO operations, personalization pipelines, and campaign assets generation.",
    color: "from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/30"
  },
  {
    title: "Operations & Supply Chain",
    count: 4,
    icon: Workflow,
    desc: "Mapping manual logistics, routing efficiencies, queue bottlenecks, and resource allocation.",
    color: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30"
  },
  {
    title: "Finance",
    count: 4,
    icon: BarChart3,
    desc: "Modeling token consumption budgets, operational ROI payback, and infrastructure cost comparisons.",
    color: "from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    title: "HR / Talent",
    count: 4,
    icon: Building2,
    desc: "Assessing recruiting filters, onboarding workflows, internal training modules, and policy access.",
    color: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30"
  },
  {
    title: "Procurement",
    count: 3,
    icon: FileCheck,
    desc: "Automating invoice reconciliation, vendor SLA tracking, and contract comparison pipelines.",
    color: "from-yellow-500/20 to-amber-500/20 text-amber-400 border-yellow-500/30"
  },
  {
    title: "Legal",
    count: 3,
    icon: Scale,
    desc: "Analyzing contract drafting compliance, clause indexing, and automated liability screening.",
    color: "from-slate-500/20 to-zinc-500/20 text-slate-300 border-slate-500/30"
  },
  {
    title: "Knowledge Management",
    count: 3,
    icon: Share2,
    desc: "Mapping enterprise wikis, semantic search capabilities, and organizational memory lookup.",
    color: "from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/30"
  },
  {
    title: "Project Management",
    count: 3,
    icon: Lightbulb,
    desc: "Analyzing status updates, task assignment triggers, and automated project notes synthesis.",
    color: "from-lime-500/20 to-green-500/20 text-lime-400 border-lime-500/30"
  },
  {
    title: "Culture & Change",
    count: 6,
    icon: TrendingUp,
    desc: "Measuring AI readiness levels, team communication channels, and technical change tolerance.",
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30"
  }
];

const PHASES = [
  {
    phase: "Phase 1",
    name: "Discovery",
    focus: "Stakeholder Workshops & Data Ingestion",
    description: "On-site/remote workshops with leadership and stakeholders. We address all 62 questions across the 15 capability areas.",
    deliverable: "Raw data, initial observations, and a validated dataset."
  },
  {
    phase: "Phase 2",
    name: "Analysis",
    focus: "Data Sanitization & Intelligence Generation",
    description: "Our engineering team sanitizes and validates the collected dataset. Nisol Intelligence™ processes the metrics to generate core AI suitability scores.",
    deliverable: "AI-generated insights and the first draft of the Opportunity Matrix."
  },
  {
    phase: "Phase 3",
    name: "Review",
    focus: "Human Context Audit & Roadmap Draft",
    description: "Our elite AI transformation architects perform a detailed quality audit on all AI-generated reports, infusing deep industry nuance and strategic positioning.",
    deliverable: "Refined, client-ready reports and a preliminary roadmap."
  },
  {
    phase: "Phase 4",
    name: "Delivery",
    focus: "Executive Handover & Strategic Presentation",
    description: "We finalize the comprehensive packages and present findings, illustrating the AI Transformation Roadmap, detailed ROI analysis, and solution blueprints.",
    deliverable: "Executive presentation and final deliverables."
  }
];

const DELIVERABLES = [
  {
    title: "Executive & Board Strategy Pack",
    desc: "CFO and Boardroom-ready investment memoranda and executive roadmaps designed for capital release and steering committee alignment.",
    items: [
      "CFO & Board Investment Memorandum (DCF, NPV & IRR)",
      "Flagship AI Transformation Strategy (9 Comprehensive Chapters)",
      "2D Opportunity Bubble Matrix & Scorecard",
      "Executive Minto Pyramid Presentation Briefing"
    ]
  },
  {
    title: "Data Strategy & Architecture Blueprint Pack",
    desc: "Deep-dive technical blueprints, vector lakehouse topologies, and data hygiene scorecards for CTOs and engineering teams.",
    items: [
      "Data Strategy & Vector Architecture Blueprint (5-Dimension Hygiene)",
      "5-Dimension Data Quality Scorecard (Completeness, Accuracy, etc.)",
      "Real-Time Change Data Capture (CDC) Streaming Spec",
      "Zero-Trust PII Redaction Proxy Architecture"
    ]
  },
  {
    title: "Governance, OCM & Pilot Evaluation Pack",
    desc: "Organizational change management frameworks, empirical pilot evaluations, and regulatory compliance registers.",
    items: [
      "PoC Decision Gate & Acceptance Protocol (Prospective Pilot Gates)",
      "5x5 Likelihood x Impact Risk Register (DPDP Act / EU AI Act)",
      "Organizational Change Management (OCM) & RACI Matrix",
      "Role-Based 3-Track AI Upskilling Curricula (Staff, Champions, Leadership)"
    ]
  }
];

export default function DiscoveryMethodologyPage() {
  return (
    <div className="space-y-24 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Page Header & Positioning */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-8 pb-4">
        <Badge variant="golden" className="animate-pulse">Proprietary Framework</Badge>
        <h1 id="page-title" className="text-4xl sm:text-6xl font-black text-navy-950 tracking-tight leading-none">
          The Nisol Discovery™ <span className="golden-gradient-text">Methodology</span>
        </h1>
        <p className="text-lg sm:text-xl text-navy-800 font-semibold max-w-3xl mx-auto leading-relaxed">
          A proprietary, AI-powered framework to identify, prioritize, and plan your enterprise AI transformation.
        </p>
        <p className="text-sm sm:text-base text-navy-600 max-w-2xl mx-auto">
          Unlike generic advisory assessments, Nisol Discovery™ is a structured, data-driven methodology designed to deliver absolute executive clarity and measurable business outcomes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
          <Button href="/transformation-framework" variant="secondary" size="lg">
            Explore 9-Stage Transformation Lifecycle →
          </Button>
        </div>
      </div>

      {/* 2. The Core Framework (Your "Why") */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">The Core Framework</h2>
          <p className="text-sm sm:text-base text-navy-700">
            Our comprehensive 360-degree assessment measures organization-wide capabilities across 15 key segments, addressing 62 proprietary questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx} 
                className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-golden-400 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group cursor-default"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cap.color} border shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-navy-950">{cap.title}</h3>
                    <p className="text-xs text-navy-600 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-navy-400">Diagnostic Focus</span>
                  <Badge variant="navy" className="text-[10px] py-0.5 px-2">{cap.count} Critical Questions</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. The 4-Phase Methodology (Your "How") */}
      <div id="phases" className="space-y-12 pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="navy">Strategic Timeline</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">The 4-Phase Engagement</h2>
          <p className="text-sm sm:text-base text-navy-700">
            A reliable process balancing automation speed with human validation to ensure zero deployment risk.
          </p>
        </div>

        <div className="relative border-l border-slate-200 ml-4 md:ml-8 space-y-12 max-w-5xl mx-auto">
          {PHASES.map((p, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Timeline marker */}
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-navy-950 border-4 border-golden-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-200 z-10" />
              
              <div className="bg-white border border-slate-200 hover:border-navy-900 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono tracking-widest text-golden-600 uppercase">{p.phase}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="text-xs text-navy-500 font-medium">{p.focus}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-navy-950">{p.name}</h3>
                  <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">{p.description}</p>
                </div>
                
                <div className="lg:col-span-4 bg-navy-950 text-white rounded-2xl p-5 border border-golden-500/20 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-golden-400">Phase Deliverable</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p.deliverable}</span>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. The Deliverables (Your "What") */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="golden">Actionable Assets</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">Tangible Enterprise Deliverables</h2>
          <p className="text-sm sm:text-base text-navy-700">
            Outputs are structured into comprehensive deliverables packs to facilitate internal alignment, governance, and rapid build pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DELIVERABLES.map((del, idx) => (
            <div key={idx} className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/20 flex flex-col justify-between hover:border-golden-400 transition-all duration-300">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-golden-400 uppercase tracking-wider">Pack 0{idx + 1}</span>
                  <h3 className="text-xl font-bold text-white">{del.title}</h3>
                  <p className="text-xs text-navy-200/90 leading-relaxed">{del.desc}</p>
                </div>
                <div className="w-full h-px bg-slate-800" />
                <ul className="space-y-3">
                  {del.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-3 text-xs text-navy-100">
                      <Bookmark className="w-4 h-4 text-golden-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Why It's Different (Your Differentiator) */}
      <div className="space-y-12 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">A New Paradigm in AI Transformation</h2>
          <p className="text-sm sm:text-base text-navy-700">
            How Nisol Discovery™ compares to traditional advisory firms.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 bg-navy-950 text-white p-5 font-bold text-sm sm:text-base">
            <div>Traditional Advisory Firms</div>
            <div className="text-golden-400">Nisol AI Transformation Partner</div>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-2 p-5 text-xs sm:text-sm text-navy-800 gap-4">
              <div>Manual, time-intensive, subjective assessments spanning months.</div>
              <div className="font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-golden-600 shrink-0 mt-0.5" />
                <span>AI-powered, accelerated structured analysis completed in weeks.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 p-5 text-xs sm:text-sm text-navy-800 gap-4">
              <div>Generic, templated slide decks with boilerplate advisory recommendations.</div>
              <div className="font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-golden-600 shrink-0 mt-0.5" />
                <span>Data-driven, organization-specific insights mapped directly to operational code.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 p-5 text-xs sm:text-sm text-navy-800 gap-4">
              <div>Highly dependent on a single consultant&apos;s isolated background and bias.</div>
              <div className="font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-golden-600 shrink-0 mt-0.5" />
                <span>A repeatable, proprietary software platform backed by seasoned enterprise AI architects.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Trust Signals & Proof */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-between items-start space-y-6">
          <div className="space-y-3">
            <div className="p-3 bg-navy-100 rounded-xl inline-block text-navy-950">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">Sample Methodology Report</h3>
            <p className="text-xs text-navy-700 leading-relaxed">
              Examine the depth and granularity of our analysis. Download a sanitized Nisol Discovery™ report detailing sample architectures and readiness scores.
            </p>
          </div>
          <Button href="/assets/documents/sample-discovery-report.pdf" variant="secondary" size="md">
            Download Sample Report
          </Button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-between items-start space-y-6">
          <div className="space-y-3">
            <div className="p-3 bg-golden-100 rounded-xl inline-block text-golden-800">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">Interactive ROI Calculator</h3>
            <p className="text-xs text-navy-700 leading-relaxed">
              Estimate potential efficiency gains, token utilization budgets, and initial operational return on investment figures before scheduling.
            </p>
          </div>
          <Button href="/resources/roi-calculator" variant="navy" size="md">
            Estimate AI Value
          </Button>
        </div>
      </div>

      {/* 7. Call to Action (CTA) */}
      <div className="bg-navy-950 text-white rounded-3xl p-10 sm:p-12 text-center space-y-6 border border-golden-500/20 max-w-5xl mx-auto">
        <Badge variant="golden">Ready to Transform?</Badge>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Ready to apply the Nisol Discovery™ methodology to your business?
        </h2>
        <p className="text-xs sm:text-sm text-navy-200 max-w-xl mx-auto">
          Collaborate with Nisol AI architects to establish a definitive transformation timeline tailored to your specific organizational needs.
        </p>
        <div className="pt-2">
          <Button href="/contact?type=discovery-call" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Discovery Call
          </Button>
        </div>
      </div>
    </div>
  );
}

