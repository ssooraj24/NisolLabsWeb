import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  BarChart3,
  Code2,
  Layers,
  ShieldCheck,
  Activity,
  Zap,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ChevronRight,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "9-Stage Enterprise AI Transformation Lifecycle | Nisol AI",
  description:
    "Explore Nisol AI's end-to-end transformation framework: Discover, Assess, Prioritize, Implement, Integrate, Govern, Monitor, Optimize, and Scale enterprise AI.",
};

const stages = [
  {
    step: "01",
    id: "discover",
    title: "Discover",
    tagline: "Opportunity Discovery & Challenge Mapping",
    icon: Search,
    color: "from-blue-500/20 to-indigo-500/10",
    borderColor: "border-blue-500/30",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    summary:
      "Identify high-impact AI opportunities, operational bottlenecks, and strategic enterprise objectives before writing a line of code.",
    activities: [
      "AI Discovery Workshops & Leadership Alignment",
      "Line-of-Business Process & Bottleneck Analysis",
      "Opportunity Extraction via Nisol Intelligence™ Engine",
      "Stakeholder Impact & ROI Hypothesis Mapping"
    ],
    deliverables: [
      "AI Opportunity Matrix",
      "Executive Pain Point Report",
      "Initial ROI Estimate & Business Case"
    ],
    nisolIP: "Nisol Session Intelligence™ Automated Transcription & Synthesis"
  },
  {
    step: "02",
    id: "assess",
    title: "Assess",
    tagline: "Data Readiness & Infrastructure Audit",
    icon: CheckCircle2,
    color: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-500/30",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    summary:
      "Rigorously evaluate data pipelines, ERP/CRM tech stack compatibility, security SLAs, and current organizational AI maturity.",
    activities: [
      "62-Question Enterprise AI Readiness Audit",
      "Data Quality, Governance & Hygiene Mapping",
      "Legacy Tech Stack & API Integration Audit",
      "Security, Compliance (GDPR/HIPAA/SOC2) Review"
    ],
    deliverables: [
      "Data Readiness Index Scorecard",
      "Infrastructure Gap Analysis",
      "Security SLA Compliance Map"
    ],
    nisolIP: "Nisol Automated AI Readiness Diagnostic Platform"
  },
  {
    step: "03",
    id: "prioritize",
    title: "Prioritize",
    tagline: "Strategic Roadmap & ROI Quadrant",
    icon: BarChart3,
    color: "from-teal-500/20 to-emerald-500/10",
    borderColor: "border-teal-500/30",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    summary:
      "Map discovered opportunities onto an Impact vs. Feasibility matrix to draft a phased, board-ready implementation blueprint.",
    activities: [
      "Feasibility vs. Business Impact Quadrant Mapping",
      "Phase-1 Quick Win Pilot Selection",
      "5-Year Token & Operational Cost Modeling",
      "Executive Stakeholder Roadmap Approval"
    ],
    deliverables: [
      "5-Year Board-Ready AI Roadmap",
      "Phase-1 Pilot Scope & Budget",
      "Financial ROI & Payback Timeline Model"
    ],
    nisolIP: "Interactive Enterprise AI ROI & Financial Simulator"
  },
  {
    step: "04",
    id: "implement",
    title: "Implement",
    tagline: "Custom AI Engineering & Agent Development",
    icon: Code2,
    color: "from-golden-500/20 to-amber-500/10",
    borderColor: "border-golden-500/30",
    badgeColor: "bg-golden-500/10 text-golden-400 border-golden-500/30",
    summary:
      "Engineer enterprise-grade AI solutions: Autonomous AI Agents, RAG retrieval pipelines, custom LLM fine-tuning, and workflow automation.",
    activities: [
      "Multi-Agent Orchestration & Workflow Clusters",
      "Hybrid Vector Memory (RAG) Architecture",
      "Custom Model Context Protocol (MCP) Tools",
      "Production-Grade AI Codebase & Unit Testing"
    ],
    deliverables: [
      "Production-Ready AI Solution Code",
      "Agent Orchestration Blueprint",
      "Automated Test Coverage & Evaluation Suite"
    ],
    nisolIP: "Nisol Multi-Agent Engine & Custom MCP Integrations"
  },
  {
    step: "05",
    id: "integrate",
    title: "Integrate",
    tagline: "Enterprise Stack & API Connection",
    icon: Layers,
    color: "from-orange-500/20 to-red-500/10",
    borderColor: "border-orange-500/30",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    summary:
      "Seamlessly connect custom AI systems with your existing enterprise ecosystem—SAP, Salesforce, internal DBs, and legacy software.",
    activities: [
      "Enterprise Middleware & Webhook Integration",
      "Bi-directional API & Database Connection",
      "Identity & SSO Authentication (OAuth2/SAML)",
      "Zero Vendor Lock-in Architecture Setup"
    ],
    deliverables: [
      "Enterprise Integration Connectors",
      "API & Webhook Architecture Documentation",
      "Data Pipeline Flow Diagram"
    ],
    nisolIP: "Secure Enterprise Connector Library & MCP Routers"
  },
  {
    step: "06",
    id: "govern",
    title: "Govern",
    tagline: "Guardrails, Privacy & Responsible AI",
    icon: ShieldCheck,
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-500/30",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    summary:
      "Establish strict operational guardrails, data loss prevention (DLP), anti-hallucination policies, RBAC, and human-in-the-loop validation.",
    activities: [
      "Anti-Hallucination & Bias Guardrail Configuration",
      "Role-Based Access Control (RBAC) & Data Redaction",
      "Human-in-the-Loop Approval Workflows",
      "Regulatory & Compliance Audit Logging"
    ],
    deliverables: [
      "AI Governance Policy Framework",
      "Compliance Audit Log System",
      "Human-in-the-Loop Oversight Protocol"
    ],
    nisolIP: "Nisol Enterprise Guardrail & DLP Filter Engine"
  },
  {
    step: "07",
    id: "monitor",
    title: "Monitor",
    tagline: "LLMOps & Real-Time Telemetry",
    icon: Activity,
    color: "from-emerald-500/20 to-green-500/10",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    summary:
      "Track agent performance, LLM token costs, response latency, accuracy, and fallback rates in real-time with centralized telemetry.",
    activities: [
      "Real-Time LLMOps Dashboard Deployment",
      "Token Expenditure & Cost-Per-Task Tracking",
      "Agent Accuracy & Latency Alert Setup",
      "Automated Fallback & Retry Handling"
    ],
    deliverables: [
      "Live Centralized Telemetry Portal",
      "Monthly LLMOps Performance Reports",
      "Automated System Health Alerts"
    ],
    nisolIP: "Nisol Telemetry & Token Cost Optimization Portal"
  },
  {
    step: "08",
    id: "optimize",
    title: "Optimize",
    tagline: "Continuous Refinement & Prompt Tuning",
    icon: Zap,
    color: "from-amber-500/20 to-yellow-500/10",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    summary:
      "Iteratively refine model routing, prompt engineering, vector retrieval precision, and cost efficiency using production feedback loops.",
    activities: [
      "Prompt Optimization & Model Routing Refinement",
      "RAG Vector Retrieval Precision Tuning",
      "Cost-per-Query Reduction Sprints",
      "Feedback Loop & Reinforcement Integration"
    ],
    deliverables: [
      "Optimized System Prompts & Routings",
      "Model Evaluation Benchmark Metrics",
      "Cost-Efficiency Improvements Log"
    ],
    nisolIP: "Nisol Dynamic Model Router & Evaluation Suite"
  },
  {
    step: "09",
    id: "scale",
    title: "Scale",
    tagline: "Enterprise-Wide Rollout & Adoption",
    icon: TrendingUp,
    color: "from-indigo-500/20 to-blue-500/10",
    borderColor: "border-indigo-500/30",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    summary:
      "Expand AI capability across business units, operationalize change management, empower teams, and institutionalize AI adoption.",
    activities: [
      "Multi-Department Rollout & Workflow Replication",
      "Team Enablement & Interactive Training Sessions",
      "Institutional Knowledge Base Expansion",
      "Continuous Innovation Strategy Cadence"
    ],
    deliverables: [
      "Enterprise AI Scaling Playbook",
      "Organization-Wide AI Adoption Scorecard",
      "Continuous Optimization SLA Plan"
    ],
    nisolIP: "Nisol Enterprise AI Scale Playbooks & Change Templates"
  }
];

export default function TransformationFrameworkPage() {
  return (
    <div className="bg-navy-950 min-h-screen text-slate-100 selection:bg-golden-500 selection:text-navy-950">
      {/* Background Subtle Grid & Glow */}
      <div className="relative overflow-hidden pt-12 pb-20 border-b border-navy-800/80">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-golden-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Enterprise Methodology</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
            The 9-Stage Enterprise <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-golden-300 via-golden-400 to-amber-200 bg-clip-text text-transparent">
              AI Transformation Lifecycle
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Nisol AI partners with organizations throughout their entire AI transformation journey—from opportunity discovery and implementation to adoption, governance, and enterprise scale.
          </p>

          {/* Stepper Flow Header Preview */}
          <div className="max-w-5xl mx-auto bg-navy-900/80 border border-navy-700/70 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            <div className="text-xs font-bold uppercase tracking-wider text-golden-400 mb-4 text-center">
              The Complete Continuous Transformation Flow
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-200">
              {stages.map((s, idx) => (
                <React.Fragment key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="px-3 py-1.5 rounded-lg bg-navy-800/90 border border-navy-700 hover:border-golden-400/60 hover:text-golden-300 transition-all flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-golden-400 font-bold">{s.step}</span>
                    <span>{s.title}</span>
                  </a>
                  {idx < stages.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-navy-500 hidden md:inline" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Button
              href="/contact?type=discovery-call"
              size="lg"
              className="bg-golden-500 text-navy-950 hover:bg-golden-400 font-extrabold shadow-lg shadow-golden-500/20"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book AI Discovery Workshop
            </Button>
            <Button
              href="/contact?type=expert"
              size="lg"
              variant="outline"
              className="border-navy-700 text-slate-200 hover:text-white hover:bg-navy-800"
            >
              Talk to a Transformation Expert
            </Button>
          </div>
        </div>
      </div>

      {/* Main 9 Stages Deep Dive Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="golden">Detailed Stage Breakdown</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What We Do at Every Stage of Your Transformation
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            We don’t just deliver recommendations. We build, operationalize, govern, and continuously refine custom AI engines across all 9 stages.
          </p>
        </div>

        <div className="space-y-12">
          {stages.map((stage) => {
            const IconComponent = stage.icon;
            return (
              <div
                key={stage.id}
                id={stage.id}
                className={`scroll-mt-28 relative rounded-2xl border ${stage.borderColor} bg-gradient-to-br ${stage.color} p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-golden-400/40`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Stage Info */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-navy-900 border border-navy-700 flex items-center justify-center text-golden-400 font-bold shadow-inner">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold uppercase tracking-widest text-golden-400">
                          Stage {stage.step} of 09
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <div className={`inline-block px-3 py-1 rounded border text-xs font-semibold uppercase tracking-wider ${stage.badgeColor}`}>
                      {stage.tagline}
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {stage.summary}
                    </p>

                    <div className="pt-2 border-t border-white/10">
                      <span className="text-xs font-bold text-golden-400 uppercase tracking-wider block mb-1">
                        Proprietary Technology & IP Utilized:
                      </span>
                      <p className="text-xs font-medium text-slate-300 bg-navy-950/60 p-2.5 rounded-lg border border-navy-800">
                        ⚡ {stage.nisolIP}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Activities & Deliverables */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-navy-900/90 rounded-xl p-6 border border-navy-700/80">
                    {/* Activities */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-golden-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Key Activities & Execution</span>
                      </h4>
                      <ul className="space-y-2">
                        {stage.activities.map((act, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-golden-400 mt-0.5">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-golden-400 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        <span>Tangible Output & Deliverables</span>
                      </h4>
                      <ul className="space-y-2">
                        {stage.deliverables.map((del, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-navy-950/40 p-2 rounded border border-navy-800">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Section: Why We Are Not a Consulting Firm */}
      <section className="py-16 bg-navy-900/60 border-t border-navy-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="golden">Differentiator</Badge>
            <h2 className="text-3xl font-extrabold text-white">
              Traditional Advisory vs. Nisol AI Transformation Partner
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Advisory */}
            <div className="bg-navy-950/80 border border-red-500/20 rounded-2xl p-6 space-y-4">
              <div className="text-red-400 font-extrabold text-lg flex items-center gap-2">
                <span>❌ Traditional AI Consulting Firms</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Produce static PowerPoint decks and leave execution to internal teams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Lack hands-on AI engineering, RAG architecture, and agent orchestration skills.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Charge massive hourly advisory rates without accountability for production uptime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Ignore real-time telemetry, model drift, and long-term cost optimization.</span>
                </li>
              </ul>
            </div>

            {/* Nisol AI Partner */}
            <div className="bg-navy-950/80 border border-golden-500/40 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-golden-500 text-navy-950 font-extrabold text-[10px] uppercase rounded-bl-lg">
                Recommended
              </div>
              <div className="text-golden-400 font-extrabold text-lg flex items-center gap-2">
                <span>✅ Nisol AI (Transformation & Implementation Partner)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-golden-400 font-bold">✓</span>
                  <span>Full end-to-end execution: Discover, Implement, Integrate, Govern, and Scale.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-golden-400 font-bold">✓</span>
                  <span>Deep AI engineering talent building custom Autonomous Agents, MCP tools, and LLMOps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-golden-400 font-bold">✓</span>
                  <span>Fixed-price engagements & choice of 3 delivery models (Build, Manage, Monitor).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-golden-400 font-bold">✓</span>
                  <span>Guaranteed zero vendor lock-in with real-time performance telemetry.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 relative overflow-hidden text-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Begin Your AI Transformation Journey?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Book an AI Discovery Workshop or speak with an AI Transformation Architect to build your prioritized implementation roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              href="/contact?type=discovery-call"
              size="lg"
              className="bg-golden-500 text-navy-950 hover:bg-golden-400 font-extrabold shadow-xl"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book AI Discovery Workshop
            </Button>
            <Button
              href="/discovery"
              size="lg"
              variant="outline"
              className="border-navy-700 text-slate-200 hover:text-white"
            >
              Explore Discovery Deliverables
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
