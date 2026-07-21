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
  AlertTriangle
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

      {/* 1. HERO SECTION */}
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
                <span>Enterprise AI Architecture & Multi-Agent Systems</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                The Core of <br className="hidden sm:block" />
                <span className="golden-gradient-text">Enterprise Intelligence</span>
              </h1>

              <p className="text-lg sm:text-xl text-navy-100/90 max-w-2xl leading-relaxed font-normal">
                Nisol Labs turns AI promise into enterprise reality. We build production-grade <strong className="text-white font-semibold">Autonomous AI Agents</strong>, <strong className="text-white font-semibold">LLMOps Pipelines</strong>, and enterprise RAG systems engineered for scale, security, and measurable ROI.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book AI Strategy Call
                </Button>
                <Button href="/resources/roi-calculator" variant="navy" size="lg" icon={<BarChart3 className="w-4 h-4" />}>
                  Calculate AI ROI
                </Button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-navy-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">45+</div>
                  <div className="text-xs text-navy-200">AI Deployments</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">52%</div>
                  <div className="text-xs text-navy-200">Avg Token Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">99.9%</div>
                  <div className="text-xs text-navy-200">Security SLA</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Multi-Agent Preview Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel-dark rounded-2xl p-6 shadow-2xl border border-golden-500/20 relative group hover:border-golden-500/40 transition-all">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Live Multi-Agent Graph Telemetry
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-golden-500/20 text-golden-300">
                    Nisol Orchestrator v3
                  </span>
                </div>

                {/* Simulated Agent Telemetry Nodes */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <Bot className="w-4 h-4 text-golden-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Planner Agent]</span>
                        <span className="text-emerald-400">STABILITY 100%</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Decomposing ambiguous query into sub-tasks & selecting API schemas...</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-navy-300 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Executor Agent]</span>
                        <span className="text-golden-400">LATENCY 142ms</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Executing tool calling against PostgreSQL Vector Store (Qdrant)...</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Auditor & Evaluator]</span>
                        <span className="text-emerald-400">PASSED</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Hallucination score: 0.00 | Grounded citations verified.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] text-navy-200">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-golden-400" />
                    Zero-Trust RBAC Enforced
                  </span>
                  <Link href="/services/agents" className="text-golden-400 hover:underline font-semibold flex items-center gap-1">
                    View Agent Architecture
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-8 shadow-sm border border-slate-200/80">
          <div className="text-center mb-6 text-xs font-bold uppercase tracking-wider text-navy-600">
            Trusted Framework Architecture & Measurable Results
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">84%</div>
              <div className="text-xs text-navy-600 font-medium mt-1">Ticket Support Automation</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">Sub-200ms</div>
              <div className="text-xs text-navy-600 font-medium mt-1">Model Latency Target</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">58%</div>
              <div className="text-xs text-navy-600 font-medium mt-1">API Token Cost Reduction</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">99.4%</div>
              <div className="text-xs text-navy-600 font-medium mt-1">IDP Document Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM STATEMENT (Standard AI vs. Nisol Labs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Strategic Difference"
          title="Why Enterprise AI Projects Fail"
          subtitle="And How Nisol Labs Fixes It"
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

          {/* Nisol Labs Approach (The Solution) */}
          <div className="bg-navy-950 rounded-2xl p-8 border border-golden-500/30 shadow-xl relative text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Nisol Labs Standard (Outcome-Driven)</h3>
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

      {/* 4. CORE SERVICES (6 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Our Core Services"
          title="End-to-End AI Engineering"
          subtitle="From Discovery to Scaling"
          description="We deliver full-stack enterprise AI capabilities across 6 specialized pillars, anchored by our flagship Autonomous AI Agents and LLMOps engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-panel rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              {service.badge && (
                <div className="absolute top-6 right-6">
                  <Badge variant={service.badge === "FLAGSHIP" ? "golden" : "navy"}>
                    {service.badge}
                  </Badge>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                  {service.id === "agents" && <Bot className="w-6 h-6" />}
                  {service.id === "engineering" && <Cpu className="w-6 h-6" />}
                  {service.id === "strategy" && <Compass className="w-6 h-6" />}
                  {service.id === "assistants" && <MessageSquareCode className="w-6 h-6" />}
                  {service.id === "automation" && <Zap className="w-6 h-6" />}
                  {service.id === "data-readiness" && <Database className="w-6 h-6" />}
                </div>

                <h3 className="text-xl font-bold text-navy-950 mb-2 group-hover:text-navy-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-navy-700/90 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-600">Key Capabilities</div>
                  {service.keyBenefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-navy-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-golden-600 shrink-0" />
                      <span className="truncate">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {service.caseStudyHighlight.metric}
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-navy-900 hover:text-golden-600 flex items-center gap-1 group/link"
                >
                  Explore Pillar
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY NISOL LABS */}
      <section className="bg-navy-950 text-white py-20 border-y border-navy-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="The Nisol Difference"
            title="Built for Enterprise Trust & Performance"
            description="We bridge the gap between academic AI research and mission-critical production software."
            theme="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY.values.map((val, idx) => (
              <div key={idx} className="glass-panel-dark rounded-xl p-6 border border-navy-800 hover:border-golden-500/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-4 font-extrabold text-sm">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{val.title}</h4>
                <p className="text-xs text-navy-200 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK (4-Step Methodology) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Our Process"
          title="4-Step Enterprise AI Implementation"
          subtitle="Risk-Mitigated & Milestone Driven"
          description="We take AI initiatives from audit to production deployment in weeks, not years."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="glass-panel rounded-2xl p-6 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-golden-600 uppercase tracking-wider">Step 01</div>
            <h4 className="text-lg font-bold text-navy-950">AI Audit & Strategy</h4>
            <p className="text-xs text-navy-700 leading-relaxed">Audit existing workflows, data readiness, security boundaries, and construct high-ROI use case matrix.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-golden-600 uppercase tracking-wider">Step 02</div>
            <h4 className="text-lg font-bold text-navy-950">Architecture & PoC</h4>
            <p className="text-xs text-navy-700 leading-relaxed">Design multi-agent state graph, tool API endpoints, vector indexing, and build rapid working prototype.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-golden-600 uppercase tracking-wider">Step 03</div>
            <h4 className="text-lg font-bold text-navy-950">Engineering & Tuning</h4>
            <p className="text-xs text-navy-700 leading-relaxed">Model quantization, continuous prompt evaluation, PII guardrails, and human-in-the-loop approval UI.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-golden-600 uppercase tracking-wider">Step 04</div>
            <h4 className="text-lg font-bold text-navy-950">LLMOps & Scale</h4>
            <p className="text-xs text-navy-700 leading-relaxed">CI/CD automation, semantic caching, real-time latency optimization, and ongoing drift monitoring.</p>
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Industry Verticals"
            title="Tailored AI Solutions for Core Sectors"
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

      {/* 8. TECHNOLOGY STACK (Interactive Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Technology Ecosystem"
          title="Battle-Tested AI Stack"
          subtitle="Vendor-Neutral & Scale-Ready"
          description="We leverage industry-standard open-source and enterprise frameworks to ensure zero vendor lock-in."
        />

        <div className="glass-panel rounded-2xl p-8 border border-slate-200">
          <div className="flex justify-center gap-2 mb-8 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveTechTab("agents")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTechTab === "agents" ? "bg-navy-900 text-white shadow-md" : "text-navy-700 hover:bg-slate-200/60"
              }`}
            >
              Multi-Agent & Orchestration
            </button>
            <button
              onClick={() => setActiveTechTab("llmops")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTechTab === "llmops" ? "bg-navy-900 text-white shadow-md" : "text-navy-700 hover:bg-slate-200/60"
              }`}
            >
              LLMOps & Inference Serving
            </button>
            <button
              onClick={() => setActiveTechTab("data")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTechTab === "data" ? "bg-navy-900 text-white shadow-md" : "text-navy-700 hover:bg-slate-200/60"
              }`}
            >
              Vector Databases & Lakehouse
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStackData[activeTechTab].map((tech, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-golden-600 bg-golden-50 px-2 py-0.5 rounded">
                  {tech.category}
                </span>
                <h4 className="text-base font-bold text-navy-950">{tech.name}</h4>
                <p className="text-xs text-navy-700">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS & CASE STUDY HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Impact Spotlights"
          title="Proven Enterprise Outcomes"
          description="Explore real case study benchmarks achieved for our clients."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.slice(0, 3).map((cs) => (
            <div key={cs.id} className="glass-panel rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-600 bg-navy-100 px-2 py-1 rounded mb-3 inline-block">
                  {cs.industry}
                </span>
                <h3 className="text-base font-bold text-navy-950 mb-3">{cs.title}</h3>
                <p className="text-xs text-navy-700 mb-4">{cs.challenge}</p>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl mb-4 border border-slate-200">
                  {cs.impactMetrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-extrabold text-navy-900">{m.value}</div>
                      <div className="text-[9px] text-navy-600 font-semibold">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/resources#case-studies" className="text-xs font-bold text-navy-900 hover:text-golden-600 flex items-center gap-1">
                Read Full Blueprint Case Study
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 rounded-3xl p-10 lg:p-14 border border-golden-500/30 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6 text-center mx-auto">
            <Badge variant="golden">Ready to Become an AI-First Enterprise?</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Discover Your High-ROI <br />
              <span className="golden-gradient-text">AI Architecture Today</span>
            </h2>
            <p className="text-sm sm:text-base text-navy-100/90 leading-relaxed">
              Schedule a confidential 30-minute AI Strategy & Audit call with our senior AI architects. Receive an initial feasibility audit and actionable timeline for your enterprise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Book Consultation Now
              </Button>
              <Button href="/resources/roi-calculator" variant="navy" size="lg" icon={<BarChart3 className="w-4 h-4" />}>
                Try ROI Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
