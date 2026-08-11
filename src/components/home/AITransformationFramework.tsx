"use client";

import React, { useState } from "react";
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
  FileText,
  LayoutTemplate,
  Users,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// 9-Stage Transformation Lifecycle Data
const stages = [
  {
    id: "discover",
    step: "01",
    icon: Search,
    title: "Discover",
    subtitle: "Opportunity Discovery & Bottlenecks",
    description:
      "Identify high-impact AI opportunities, process bottlenecks, and ROI hypotheses before writing code.",
    activities: [
      "AI Discovery Workshop",
      "Process & Bottleneck Analysis",
      "Nisol Intelligence™ Synthesis",
      "Stakeholder Impact Mapping"
    ],
    deliverables: [
      "AI Opportunity Matrix",
      "Executive Pain Point Report",
      "Initial ROI Hypothesis"
    ],
    link: "/transformation-framework#discover",
  },
  {
    id: "assess",
    step: "02",
    icon: CheckCircle2,
    title: "Assess",
    subtitle: "Data Readiness & Tech SLA Audit",
    description:
      "Rigorously evaluate data hygiene, API readiness, infrastructure SLA compliance, and security posture.",
    activities: [
      "62-Question AI Readiness Audit",
      "Data Quality & Hygiene Audit",
      "Legacy Tech Stack Review",
      "Security & SLA Compliance Map"
    ],
    deliverables: [
      "Data Readiness Index Scorecard",
      "Infrastructure Gap Analysis",
      "Security SLA Audit Log"
    ],
    link: "/transformation-framework#assess",
  },
  {
    id: "prioritize",
    step: "03",
    icon: BarChart3,
    title: "Prioritize",
    subtitle: "Strategic ROI Roadmap",
    description:
      "Map opportunities onto an Impact vs. Feasibility matrix to construct a board-ready implementation blueprint.",
    activities: [
      "Impact vs. Feasibility Quadrant",
      "Phase-1 Quick Win Selection",
      "5-Year Token & Financial Modeling",
      "Executive Stakeholder Alignment"
    ],
    deliverables: [
      "5-Year Board-Ready AI Roadmap",
      "Phase-1 Pilot Scope & Budget",
      "Financial ROI & Payback Model"
    ],
    link: "/transformation-framework#prioritize",
  },
  {
    id: "implement",
    step: "04",
    icon: Code2,
    title: "Implement",
    tagline: "Custom AI Engineering",
    subtitle: "Custom AI Agent Engineering",
    description:
      "Develop production-grade AI solutions: Autonomous AI Agents, RAG retrieval pipelines, and workflow automation.",
    activities: [
      "Multi-Agent Orchestration",
      "Enterprise RAG Architecture",
      "Custom MCP Tool Protocols",
      "Production-Grade AI Codebase"
    ],
    deliverables: [
      "Working Autonomous AI Agents",
      "RAG Vector Pipeline Code",
      "Automated Test Coverage Suite"
    ],
    link: "/transformation-framework#implement",
  },
  {
    id: "integrate",
    step: "05",
    icon: Layers,
    title: "Integrate",
    subtitle: "Enterprise System Connection",
    description:
      "Connect AI engines smoothly into existing enterprise software—SAP, Salesforce, databases, and custom REST APIs.",
    activities: [
      "Enterprise Webhook & Middleware",
      "Bi-directional Database Connection",
      "Identity & SSO Authentication",
      "Zero Vendor Lock-in Architecture"
    ],
    deliverables: [
      "Enterprise Integration Connectors",
      "API & Architecture Docs",
      "Data Pipeline Flow Diagram"
    ],
    link: "/transformation-framework#integrate",
  },
  {
    id: "govern",
    step: "06",
    icon: ShieldCheck,
    title: "Govern",
    subtitle: "Responsible AI & Guardrails",
    description:
      "Establish strict guardrails against hallucination/bias, DLP redaction, RBAC, and human-in-the-loop oversight.",
    activities: [
      "Anti-Hallucination Guardrails",
      "RBAC & Data Loss Prevention",
      "Human-in-the-Loop Workflows",
      "Regulatory Audit Logging"
    ],
    deliverables: [
      "AI Governance Policy Blueprint",
      "Compliance Audit Log System",
      "Human-in-the-Loop Protocol"
    ],
    link: "/transformation-framework#govern",
  },
  {
    id: "monitor",
    step: "07",
    icon: Activity,
    title: "Monitor",
    subtitle: "LLMOps Telemetry & Alerts",
    description:
      "Track agent execution metrics, token cost, accuracy, and fallback rates in real-time via centralized dashboards.",
    activities: [
      "Real-Time LLMOps Dashboard",
      "Token Expenditure Tracking",
      "Accuracy & Latency Alerting",
      "Automated Fallback Handling"
    ],
    deliverables: [
      "Live Telemetry Portal Access",
      "Monthly LLMOps Health Reports",
      "Automated System Alert Suite"
    ],
    link: "/transformation-framework#monitor",
  },
  {
    id: "optimize",
    step: "08",
    icon: Zap,
    title: "Optimize",
    subtitle: "Continuous Prompt & Cost Tuning",
    description:
      "Iteratively tune prompts, model routing, and vector retrieval to cut token expenditure and boost response accuracy.",
    activities: [
      "Prompt Optimization Sprints",
      "Vector Retrieval Tuning",
      "Cost-per-Task Reduction",
      "Reinforcement Feedback Loops"
    ],
    deliverables: [
      "Optimized System Prompts",
      "Model Evaluation Metrics",
      "Cost-Efficiency Optimization Log"
    ],
    link: "/transformation-framework#optimize",
  },
  {
    id: "scale",
    step: "09",
    icon: TrendingUp,
    title: "Scale",
    subtitle: "Enterprise-Wide AI Adoption",
    description:
      "Roll out AI capabilities cross-functionally, train internal teams, and institutionalize AI across the enterprise.",
    activities: [
      "Multi-Department Rollout",
      "Team Training & Enablement",
      "Institutional Knowledge Expansion",
      "Continuous SLA Cadence"
    ],
    deliverables: [
      "Enterprise AI Scaling Playbook",
      "Organization AI Adoption Matrix",
      "Long-term SLA SLA Blueprint"
    ],
    link: "/transformation-framework#scale",
  },
];

export function AITransformationFramework() {
  const [activeStage, setActiveStage] = useState(stages[0].id);
  const currentStage = stages.find((s) => s.id === activeStage) || stages[0];
  const currentIndex = stages.findIndex((s) => s.id === activeStage);

  return (
    <section className="py-20 bg-slate-900 text-slate-100 overflow-hidden relative">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-golden-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="golden" className="mx-auto">
            End-to-End Execution Methodology
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            The 9-Stage AI Transformation Lifecycle™
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Nisol AI is an end-to-end AI Transformation & Implementation company. We partner with you across every stage of the enterprise AI journey.
          </p>
        </div>

        {/* Lifecycle Stage Nav Pills (Horizontal Scrollable) */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? "bg-golden-500 text-navy-950 border-golden-400 shadow-lg shadow-golden-500/20 scale-105"
                    : "bg-navy-950/80 text-slate-300 border-navy-700 hover:border-slate-500 hover:text-white"
                }`}
              >
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isActive ? "bg-navy-950 text-golden-400" : "bg-navy-800 text-golden-400"}`}>
                  {stage.step}
                </span>
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Details Card */}
        <div className="bg-navy-950/90 rounded-2xl shadow-2xl border border-navy-700 p-6 md:p-8 lg:p-10 max-w-5xl mx-auto backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-navy-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-golden-500/10 border border-golden-500/30 flex items-center justify-center shrink-0">
                <currentStage.icon className="w-7 h-7 text-golden-400" />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-golden-400">
                  Stage {currentStage.step} of 09
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  {currentStage.title} — <span className="text-golden-300 font-normal">{currentStage.subtitle}</span>
                </h3>
              </div>
            </div>
            <Button
              href="/transformation-framework"
              variant="outline"
              size="sm"
              className="border-golden-500/40 text-golden-300 hover:bg-golden-500 hover:text-navy-950 self-start md:self-auto"
            >
              Explore Full 9-Stage Framework →
            </Button>
          </div>

          <p className="text-slate-300 text-base mb-8 leading-relaxed">
            {currentStage.description}
          </p>

          {/* Two-Column Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Activities */}
            <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-800">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-golden-400 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Key Activities & Execution
              </h4>
              <ul className="space-y-2">
                {currentStage.activities.map((act, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-golden-400" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-800">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Tangible Outputs
              </h4>
              <ul className="space-y-2">
                {currentStage.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer CTA inside card */}
          <div className="mt-8 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-slate-400">
              <strong className="text-slate-200">Continuous Transformation:</strong> Discover → Assess → Prioritize → Implement → Integrate → Govern → Monitor → Optimize → Scale
            </span>
            <Link
              href={`/transformation-framework#${currentStage.id}`}
              className="text-golden-400 font-bold hover:text-golden-300 flex items-center gap-1 shrink-0"
            >
              <span>Learn about Stage {currentStage.step} details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Banner Button */}
        <div className="text-center mt-12">
          <Button
            href="/transformation-framework"
            size="lg"
            className="bg-golden-500 text-navy-950 hover:bg-golden-400 font-extrabold shadow-xl"
          >
            Explore Complete 9-Stage Transformation Page
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}