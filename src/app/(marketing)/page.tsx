"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  TrendingUp, 
  Layers, 
  Users, 
  Building2, 
  Code, 
  Activity, 
  Factory, 
  Briefcase,
  Sparkles,
  Lock,
  Target,
  Workflow,
  BarChart3,
  Terminal,
  FileCode2,
  AlertTriangle,
  Search,
  FileText,
  Check,
  X,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { COMPANY } from "@/data/company";
import { CASE_STUDIES } from "@/data/resources";

export default function HomePage() {
  const [activeTechTab, setActiveTechTab] = useState<"agents" | "llmops" | "data">("agents");
  const [comparisonMode, setComparisonMode] = useState<"nisol" | "traditional">("nisol");

  const techStackData = {
    agents: [
      { name: "LangGraph", role: "Multi-Agent State Orchestration", category: "Agent Framework" },
      { name: "AutoGPT / CrewAI", role: "Autonomous Goal Planning", category: "Agent Framework" },
      { name: "FastAPI & Python", role: "Low-Latency Agent Backend", category: "Backend Engine" },
      { name: "Docker Sandboxes", role: "Secure Agent Code Execution", category: "Security Infrastructure" }
    ],
    llmops: [
      { name: "vLLM & Ollama", role: "High-Throughput Local Model Serving", category: "Inference Engine" },
      { name: "LlamaIndex & LangChain", role: "Modular Retrieval & Indexing", category: "RAG Infrastructure" },
      { name: "LangSmith & W&B", role: "Prompt Evaluation & Telemetry", category: "Observability" },
      { name: "GPTCache", role: "Semantic Cache & Latency Reducer", category: "Performance" }
    ],
    data: [
      { name: "Pinecone & Qdrant", role: "Enterprise Vector Databases", category: "Vector Store" },
      { name: "Neo4j Knowledge Graph", role: "Entity Relationship Mapping", category: "Knowledge Graph" },
      { name: "Snowflake & Databricks", role: "Enterprise Data Lakehouse", category: "Data Warehouse" },
      { name: "Unstructured.io", role: "Multi-modal Document Parsing", category: "ETL Processing" }
    ]
  };

  return (
    <div className="space-y-24 pb-20">

      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-[90vh] bg-navy-950 text-white flex items-center pt-12 pb-24 overflow-hidden border-b border-navy-800">
        {/* Animated Background Gradients & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#153C78_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-navy-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
                <Sparkles className="w-4 h-4 text-golden-400" />
                <span>Proprietary AI Transformation Methodology</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Transform Your Business <br className="hidden sm:block" />
                with Confidence. <br className="hidden sm:block" />
                <span className="golden-gradient-text">Start with Nisol Discovery™</span>
              </h1>

              <p className="text-lg sm:text-xl text-navy-100/90 max-w-2xl leading-relaxed font-normal">
                Discover exactly where AI will create the highest business value, prioritize opportunities, estimate ROI, and build an executive-ready transformation roadmap before investing in technology.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book AI Discovery Workshop
                </Button>
                <Button href="/discovery/methodology" variant="navy" size="lg" icon={<Search className="w-4 h-4" />}>
                  Explore Methodology
                </Button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-navy-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">62</div>
                  <div className="text-xs text-navy-200">Business Diagnostics</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">15</div>
                  <div className="text-xs text-navy-200">Capabilities Assessed</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">100%</div>
                  <div className="text-xs text-navy-200">Executive Clarity</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Discovery Preview Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel-dark rounded-2xl p-6 shadow-2xl border border-golden-500/20 relative group hover:border-golden-500/40 transition-all">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-golden-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Nisol Discovery™ Diagnostic Engine
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-golden-500/20 text-golden-300">
                    Flagship Assessment
                  </span>
                </div>

                {/* Simulated Diagnostic Telemetry Nodes */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <Search className="w-4 h-4 text-golden-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Diagnostic Phase]</span>
                        <span className="text-emerald-400">62 QUESTIONS</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Evaluating 15 enterprise capabilities & 8 AI readiness dimensions...</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <Target className="w-4 h-4 text-golden-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Opportunity Matrix]</span>
                        <span className="text-golden-400">TOP 20 USE CASES</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Categorizing Quick Wins vs. Strategic Bets with ROI impact score...</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <FileText className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Executive Deliverables]</span>
                        <span className="text-emerald-400">BOARD-READY</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">15 Reports generated across 3 Strategic Executive Packs.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] text-navy-200">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-golden-400" />
                    Proprietary Methodology
                  </span>
                  <Link href="/discovery" className="text-golden-400 hover:underline font-semibold flex items-center gap-1">
                    Explore Nisol Discovery
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE DISCOVERY SECTION (THE HEART OF THE PAGE — Concise & High Impact) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-dark rounded-3xl p-8 lg:p-12 border border-golden-500/30 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-navy-800">
              <div>
                <Badge variant="golden" className="mb-3">🔍 Flagship Differentiator</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Nisol Discovery™
                </h2>
                <p className="text-lg text-golden-300 font-semibold mt-1">
                  The Heart of Your AI Transformation
                </p>
              </div>
              <p className="text-sm text-navy-200 max-w-lg leading-relaxed">
                Nisol Discovery™ is our proprietary AI transformation diagnostic. It combines a structured 62-question diagnostic workshop with AI-powered analysis to deliver executive-ready clarity in weeks—not months.
              </p>
            </div>

            {/* 5 Concise Pillars Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-3 group-hover:scale-110 transition-transform">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">62-Question Assessment</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Diagnostic across 15 core business capabilities.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-3 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">8 Readiness Dimensions</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Technical, data, security, & cultural maturity score.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-3 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Opportunity Matrix</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Top 20 Use Cases cataloged by Quick Wins vs. Strategic Bets.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">ROI & Business Case</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Quantified financial payback & cost reduction metrics.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-5 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-3 group-hover:scale-110 transition-transform">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Executive Roadmap</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Board-ready implementation blueprints & governance.</p>
                </div>
              </div>
            </div>

            {/* Section Footer CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-navy-800">
              <span className="text-xs text-navy-200 font-medium">
                Start with clarity before investing millions in unverified AI technology.
              </span>
              <Button href="/discovery" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Nisol Discovery →
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: WHY ENTERPRISE AI PROJECTS FAIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Strategic Difference"
          title="Why Enterprise AI Projects Fail"
          subtitle="And How Nisol AI Fixes It"
          description="Most AI initiatives get stuck in prototype purgatory—fragile prompt wrappers with high costs, unverified outputs, and security risks. We build outcome-driven AI software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Standard AI Wrappers (The Problem) */}
          <div className="bg-red-50/50 rounded-2xl p-8 border border-red-200 shadow-sm relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Standard AI Approach (The Pitfall)</h3>
                <p className="text-xs text-red-700 font-medium">Fragile wrappers & unmonitored hype</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong>Single-Prompt Fragility:</strong> Breaks on unexpected edge cases or unstructured enterprise inputs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong>Runaway Token Spend:</strong> Naive LLM queries routing simple tasks to expensive models like GPT-4o.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong>Security & Data Leaks:</strong> Sensitive customer data passed directly into third-party endpoints without PII masking.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong>No Telemetry or Evaluation:</strong> Hallucinations go unnoticed without regression benchmarking.</span>
              </li>
            </ul>
          </div>

          {/* Nisol AI Approach (The Solution) */}
          <div className="bg-navy-950 rounded-2xl p-8 border border-golden-500/30 shadow-xl relative text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Nisol AI Standard (Outcome-Driven)</h3>
                <p className="text-xs text-golden-400 font-semibold">Resilient, audited & cost-engineered</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-navy-100">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Stateful Multi-Agent Graph:</strong> Reasoning loops with self-correction, tool validation, and fallback handling.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Intelligent Model Router:</strong> Dynamic task routing to fine-tuned local Llama 3 models or GPT-4o based on cost/latency requirements.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Zero-Trust Security & PII Masking:</strong> Mandatory document access filters (RBAC) and automated data sanitization.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Continuous LLMOps Telemetry:</strong> Real-time latency tracking, token caching, and automated hallucination scoring.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY NISOL AI (Interactive Comparison Toggle Card & Trust Builders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="The Discovery Advantage"
          title="Traditional Consulting vs. Nisol Discovery™"
          subtitle="Why Leaders Choose Our Proprietary Platform"
          description="See how our technology-backed discovery methodology outperforms standard manual consulting."
        />

        {/* Interactive Comparison Toggle Card */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
          
          {/* Toggle Switch Controls */}
          <div className="flex justify-center">
            <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-2 max-w-md w-full">
              <button
                onClick={() => setComparisonMode("nisol")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-2 ${
                  comparisonMode === "nisol"
                    ? "bg-navy-950 text-white shadow-lg border border-golden-500/40"
                    : "text-navy-700 hover:text-navy-950"
                }`}
              >
                <Sparkles className="w-4 h-4 text-golden-400" />
                <span>Nisol Discovery™ Advantage</span>
              </button>
              <button
                onClick={() => setComparisonMode("traditional")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-2 ${
                  comparisonMode === "traditional"
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-navy-700 hover:text-navy-950"
                }`}
              >
                <X className="w-4 h-4 text-red-400" />
                <span>Traditional Consulting</span>
              </button>
            </div>
          </div>

          {/* Toggle Content View */}
          {comparisonMode === "nisol" ? (
            <div className="bg-navy-950 text-white rounded-2xl p-8 border border-golden-500/30 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Nisol Discovery™ Methodology</h3>
                    <p className="text-xs text-golden-300">Fast, data-driven, proprietary platform execution</p>
                  </div>
                </div>
                <Badge variant="golden">Recommended</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/80">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Weeks to Insights</span>
                  </div>
                  <p className="text-xs text-navy-200">Rapid 10-14 day turnaround from initial workshop to executive roadmap presentation.</p>
                </div>

                <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/80">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Data-Driven Specific Insights</span>
                  </div>
                  <p className="text-xs text-navy-200">Quantified metrics across 15 capability areas with objective scoring models.</p>
                </div>

                <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/80">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Proprietary AI Platform</span>
                  </div>
                  <p className="text-xs text-navy-200">Powered by Nisol Intelligence™ engines to analyze readiness and cost benchmarks.</p>
                </div>

                <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/80">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>15 Executive Deliverables</span>
                  </div>
                  <p className="text-xs text-navy-200">3 Strategic Packs (Intelligence, Opportunity, Transformation) ready for board approval.</p>
                </div>

                <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/80">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>AI Maturity Benchmarking</span>
                  </div>
                  <p className="text-xs text-navy-200">Compare organizational readiness against peer industry verticals.</p>
                </div>

                <div className="bg-navy-900/90 p-5 rounded-xl border border-navy-700/80">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Continuous Intelligence</span>
                  </div>
                  <p className="text-xs text-navy-200">Living transformation platform updated as new GenAI capabilities emerge.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-8 border border-slate-700 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                    <X className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Traditional Management Consulting</h3>
                    <p className="text-xs text-slate-400">Slow manual process & high billable hours</p>
                  </div>
                </div>
                <Badge variant="navy">Legacy Model</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Months of Interviews</span>
                  </div>
                  <p className="text-xs text-slate-300">Long drawn-out interview schedules pulling key staff away from operations.</p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Generic Recommendations</span>
                  </div>
                  <p className="text-xs text-slate-300">High-level buzzwords without technical feasibility or architectural detail.</p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Consultant-Dependent</span>
                  </div>
                  <p className="text-xs text-slate-300">Knowledge leaves when consultants exit, offering zero software tooling.</p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Static PDF Reports</span>
                  </div>
                  <p className="text-xs text-slate-300">Outdated slide decks that sit on shelves without actionable implementation specs.</p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Limited Benchmarking</span>
                  </div>
                  <p className="text-xs text-slate-300">Subjective opinions lacking empirical data model benchmarks.</p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <X className="w-4 h-4 shrink-0" />
                    <span>One-Time Engagement</span>
                  </div>
                  <p className="text-xs text-slate-300">Requires expensive re-engagements every time AI models update.</p>
                </div>
              </div>
            </div>
          )}

          {/* Key Trust Signals (Leadership & Deliverables) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-950 mb-1">40+ Combined Leadership Years</h4>
                <p className="text-xs text-navy-700 leading-relaxed">Enterprise transformation & GenAI architectural oversight led by industry veterans.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-950 mb-1">Proprietary AI Platform</h4>
                <p className="text-xs text-navy-700 leading-relaxed">Nisol Discovery™ + Nisol Intelligence™ engines automate diagnostic analysis.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy-950 mb-1">15 Board-Ready Deliverables</h4>
                <p className="text-xs text-navy-700 leading-relaxed">Complete Executive, Opportunity, and Transformation Packs ready for C-suite sign-off.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: SOLUTIONS OVERVIEW (7 Solution Areas) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Post-Discovery Execution"
          title="Solutions — AI Implementation"
          subtitle="From Discovery Roadmap to Scaled Execution"
          description="After Discovery, we help you build and deploy production-grade enterprise software across 7 core specialized areas."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">AI Strategy</h4>
            <p className="text-xs text-navy-700 font-medium">Governance & Strategic Roadmap</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">AI Engineering</h4>
            <p className="text-xs text-navy-700 font-medium">Custom Model & API Pipelines</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">AI Automation</h4>
            <p className="text-xs text-navy-700 font-medium">Workflow & IDP Optimization</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">Agentic AI</h4>
            <p className="text-xs text-navy-700 font-medium">Autonomous Multi-Agent Graphs</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">RAG Systems</h4>
            <p className="text-xs text-navy-700 font-medium">Vector Knowledge Retrieval</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <Workflow className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">LLMOps</h4>
            <p className="text-xs text-navy-700 font-medium">Telemetry & Guardrails</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-lg transition-all text-center space-y-3 group col-span-2 md:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-950 text-base">AI Governance</h4>
            <p className="text-xs text-navy-700 font-medium">Zero-Trust & Compliance Audits</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: INDUSTRIES WE SERVE */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Industry Verticals"
            title="Industries We Serve"
            subtitle="Tailored AI Solutions for Core Sectors"
            description="Deep domain expertise across high-compliance and high-scale enterprise verticals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((ind) => (
              <div key={ind.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-navy-900 text-golden-400 flex items-center justify-center mb-3">
                  {ind.id === "it-software" && <Code className="w-5 h-5" />}
                  {ind.id === "bfsi" && <Building2 className="w-5 h-5" />}
                  {ind.id === "healthcare" && <Activity className="w-5 h-5" />}
                  {ind.id === "manufacturing" && <Factory className="w-5 h-5" />}
                  {ind.id === "professional-services" && <Briefcase className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-bold text-navy-950 mb-1">{ind.name}</h4>
                <p className="text-xs text-navy-700/80 mb-3 line-clamp-2">{ind.tagline}</p>
                <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded">
                  {ind.sampleImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED AI ROI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-golden-500/40 shadow-xl bg-gradient-to-br from-white via-slate-50 to-golden-50/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <Badge variant="golden">Featured Interactive Tool</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              Estimate Your <span className="golden-gradient-text">AI Transformation ROI</span>
            </h2>
            <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
              Get a personalized estimate for your organization in just 2 minutes with our interactive calculator.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-navy-900 pt-2">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Maturity Score (0-100)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Estimated Annual Savings ($ / ₹)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-Year Net ROI & Payback Months</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Personalized AI Implementation Roadmap</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button href="/resources/roi-calculator" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Calculate My ROI Now
              </Button>
              <span className="text-xs text-navy-600 font-medium hidden sm:inline">⏱️ Takes ~2 minutes • 🔒 100% Confidential</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy-950 text-white rounded-2xl p-6 border border-golden-500/30 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-navy-800 text-xs">
              <span className="font-bold text-golden-400 uppercase tracking-wider">Sample Assessment Result</span>
              <span className="text-emerald-400 font-mono text-[10px]">Score: 72/100 (Adopting)</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-navy-300">Annual Savings:</span>
                <span className="text-golden-400 font-bold">$452,700 / yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-300">1-Year ROI:</span>
                <span className="text-emerald-400 font-bold">+906% Return</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-300">Payback Period:</span>
                <span className="text-white font-bold">1.2 Months</span>
              </div>
            </div>
            <div className="pt-2 border-t border-navy-800 text-[10px] text-navy-300">
              Formula based on standard enterprise labor & support audit metrics.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Client Verification"
          title="What Our Clients Say"
          subtitle="Real Impact from Nisol Discovery™"
          description="Hear how executive leadership teams gained clarity and unlocked high-ROI transformation opportunities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-sm relative flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex text-golden-500 gap-1 text-sm">
                ★★★★★
              </div>
              <p className="text-navy-900 text-base font-medium leading-relaxed italic">
                &ldquo;Nisol Discovery™ gave us clarity on our AI priorities in just 10 days. We identified 8 high-impact use cases and have a clear roadmap for implementation.&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-navy-950 text-sm">CTO</div>
                <div className="text-xs text-navy-600 font-medium">Acme Corp</div>
              </div>
              <Badge variant="golden">Discovery Client</Badge>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-sm relative flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex text-golden-500 gap-1 text-sm">
                ★★★★★
              </div>
              <p className="text-navy-900 text-base font-medium leading-relaxed italic">
                &ldquo;The ROI analysis was eye-opening. We discovered a ₹2.4 Cr annual savings opportunity we had completely missed.&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-navy-950 text-sm">CFO</div>
                <div className="text-xs text-navy-600 font-medium">TechWave Inc</div>
              </div>
              <Badge variant="golden">Discovery Client</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 rounded-3xl p-10 lg:p-14 border border-golden-500/30 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6 text-center mx-auto">
            <Badge variant="golden">Ready to Start Your AI Transformation?</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Discover Your High-ROI <br />
              <span className="golden-gradient-text">AI Architecture Today</span>
            </h2>
            <p className="text-sm sm:text-base text-navy-100/90 leading-relaxed">
              Discover your AI readiness, identify high-impact opportunities, and build an executive transformation roadmap in weeks—not months.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Book AI Discovery Workshop
              </Button>
              <Button href="/resources/roi-calculator" variant="navy" size="lg" icon={<BarChart3 className="w-4 h-4" />}>
                Try the ROI Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
