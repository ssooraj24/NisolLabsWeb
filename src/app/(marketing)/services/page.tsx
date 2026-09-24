import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Bot, 
  Cpu, 
  Compass, 
  MessageSquareCode, 
  Zap, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Lock,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeliveryModelsSection } from "@/components/home/DeliveryModelsSection";
import { ZeroLockInGuarantee } from "@/components/shared/ZeroLockInGuarantee";

export const metadata: Metadata = {
  title: "Enterprise Intelligence Systems & Architecture | Nisol AI",
  description: "One unified architecture. Five interconnected systems: Autonomous Agents, Vector Memory, LLMOps, Data Lakehouses, and Zero-Trust Security.",
};

const ARCHITECTURE_SYSTEMS = [
  {
    id: "agents",
    title: "Autonomous Agent Clusters",
    tagline: "Stateful Execution Graphs",
    description: "Multi-agent orchestration workflows with deterministic state machines and human-in-the-loop review gates.",
    href: "/services/agents",
    icon: Bot,
    highlights: [
      "LangGraph & AutoGen multi-agent state machines",
      "Deterministic tool execution with rollback capability",
      "Sub-200ms decision latency on critical enterprise tasks"
    ]
  },
  {
    id: "assistants",
    title: "Enterprise Vector Memory & RAG",
    tagline: "Zero-Hallucination Domain Knowledge",
    description: "High-precision dense-sparse hybrid retrieval indexed over proprietary corporate documentation, ERP, and databases.",
    href: "/services/assistants",
    icon: MessageSquareCode,
    highlights: [
      "Hybrid BM25 + dense vector embeddings (pgvector/Qdrant)",
      "Strict Role-Based Access Control (RBAC) at chunk level",
      "Citation-backed responses with source verification"
    ]
  },
  {
    id: "engineering",
    title: "LLMOps & Model Guardrails",
    tagline: "Cost Optimization & Latency SLAs",
    description: "Production telemetry proxy enforcing PII masking, intelligent model routing, and semantic prompt caching.",
    href: "/services/engineering",
    icon: Cpu,
    highlights: [
      "Smart routing: GPT-4o only when necessary; Claude Haiku / vLLM for simple tasks",
      "Real-time semantic caching reducing token spend by up to 52%",
      "Continuous CI/CD regression evaluation against benchmark datasets"
    ]
  },
  {
    id: "data-readiness",
    title: "Data Readiness & Lakehouse Pipelines",
    tagline: "Clean Foundations for Model Ingestion",
    description: "Automated CDC ingestion pipelines transforming dirty operational databases into pristine, embedded vector lakehouses.",
    href: "/services/data-readiness",
    icon: Database,
    highlights: [
      "Automated PII scrubbing and compliance tokenization",
      "Real-time Change Data Capture (CDC) pipeline sync",
      "Embedding hygiene and vector drift monitoring"
    ]
  },
  {
    id: "strategy",
    title: "Zero-Trust Security & Compliance",
    tagline: "DPDP Act 2023 & EU AI Act Guardrails",
    description: "End-to-end security architecture isolating proprietary enterprise intelligence from external model providers.",
    href: "/services/strategy",
    icon: ShieldCheck,
    highlights: [
      "Air-gapped on-premise or sovereign cloud VPC deployments",
      "Prompt injection defense and automated jailbreak mitigation",
      "Tamper-proof compliance audit logging and telemetry"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="space-y-24 sm:space-y-32 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
          <Sparkles className="w-4 h-4 text-golden-400" />
          <span>Enterprise Intelligence Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-navy-950 tracking-tight leading-[1.08]">
          One Architecture. <br />
          <span className="golden-gradient-text">Five Interconnected Systems.</span>
        </h1>

        <p className="text-lg sm:text-xl text-navy-700/90 leading-relaxed font-medium max-w-3xl mx-auto">
          We don't sell random AI features or disconnected consulting hours. We deploy the complete architecture that allows an enterprise to think, decide, and act autonomously.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Nisol 360™ →
          </Button>
          <Button href="/pricing" variant="navy" size="lg">
            View Engagement Pricing
          </Button>
        </div>
      </section>

      {/* 2. THE 5 CORE SYSTEMS GRID */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="golden" className="mx-auto">Architectural Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            The Enterprise Intelligence Stack
          </h2>
          <p className="text-sm text-navy-700/80">
            Engineered for high reliability, sub-200ms latency, and absolute data sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARCHITECTURE_SYSTEMS.map((system) => {
            const Icon = system.icon;
            return (
              <div
                key={system.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-navy-950 text-golden-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-navy-950 mb-1">
                    {system.title}
                  </h3>
                  <div className="text-xs font-bold text-golden-600 mb-4">{system.tagline}</div>

                  <p className="text-xs sm:text-sm text-navy-700/90 leading-relaxed mb-6">
                    {system.description}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    {system.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-navy-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Production-Grade
                  </span>
                  <Link
                    href={system.href}
                    className="text-xs font-bold text-navy-900 hover:text-golden-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Deep Dive</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Product Bridge */}
          <div className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-golden-400">
                Where to Begin
              </span>
              <h3 className="text-2xl font-black text-white">
                Not Sure Which System You Need First?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                That is exactly what <strong>Nisol 360™</strong> solves. In 7 days, our architects audit your capabilities and tell you precisely which systems deliver maximum ROI.
              </p>
            </div>

            <div className="pt-6 border-t border-navy-800 space-y-3">
              <Button href="/spark" variant="primary" size="sm" className="w-full justify-center">
                Start with 3-Day Spark Sprint (₹1.5L) →
              </Button>
              <Button href="/discovery" variant="navy" size="sm" className="w-full justify-center">
                Full 360° Discovery (Nisol One)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 3 DELIVERY MODELS */}
      <div id="delivery-models" className="space-y-12">
        <DeliveryModelsSection />
      </div>

      {/* 4. ZERO LOCK-IN GUARANTEE */}
      <section className="max-w-4xl mx-auto">
        <ZeroLockInGuarantee />
      </section>

      {/* 5. STRATEGIC CALLOUT */}
      <section className="max-w-4xl mx-auto text-center space-y-6 pb-8">
        <Badge variant="golden" className="mx-auto">Controlled Scarcity</Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
          Ready to Architect Your Enterprise Intelligence?
        </h2>
        <p className="text-base text-navy-700/85 max-w-xl mx-auto">
          We accept only 5 enterprise engagements per month. Apply now to secure your architecture sprint.
        </p>
        <div className="pt-2">
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Apply for Nisol 360™ →
          </Button>
        </div>
      </section>
    </div>
  );
}
