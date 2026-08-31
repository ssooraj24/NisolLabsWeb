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
  Award,
  Clock,
  ChevronRight,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { COMPANY } from "@/data/company";
import { DeliveryModelsSection } from "@/components/home/DeliveryModelsSection";
import { BoardDeliverablesGrid } from "@/components/discovery/BoardDeliverablesGrid";
import { ComparisonMatrix } from "@/components/shared/ComparisonMatrix";
import { CostOfNotKnowing } from "@/components/shared/CostOfNotKnowing";
import { ZeroLockInGuarantee } from "@/components/shared/ZeroLockInGuarantee";
import { WhyFasterInclusions } from "@/components/discovery/WhyFasterInclusions";

export default function HomePage() {
  const [activeProcessStep, setActiveProcessStep] = useState<number>(1);

  const processSteps = [
    {
      step: 1,
      title: "Discovery Diagnostic",
      subtitle: "Benchmark & Capability Audit",
      description: "A structured 62-question diagnostic benchmarking your organization against 8 industry sectors and 15 business capabilities.",
      deliverable: "Industry Benchmark & Capability Audit"
    },
    {
      step: 2,
      title: "Data Strategy & Readiness",
      subtitle: "5-Dimension Hygiene & Vector Blueprint",
      description: "In-depth audit of data quality (Completeness, Accuracy, Timeliness), pgvector/Qdrant lakehouses, and CDC pipeline readiness.",
      deliverable: "Data Strategy & Vector Lakehouse Blueprint"
    },
    {
      step: 3,
      title: "Opportunity Prioritization",
      subtitle: "2D Interactive Bubble Matrix",
      description: "Cataloging and prioritizing top 20 use cases by Value vs. Feasibility, scaled by projected ROI % in an interactive 2D Bubble Matrix.",
      deliverable: "2D Opportunity Bubble Matrix & Scorecard"
    },
    {
      step: 4,
      title: "Financial Modeling & Sensitivity",
      subtitle: "CFO & Board Investment Memo",
      description: "Deterministic financial modeling with NPV, IRR (44.5%), and 3-scenario sensitivity stress-tests (75%–125% adoption).",
      deliverable: "CFO & Board Investment Memorandum"
    },
    {
      step: 5,
      title: "Governance, OCM & PoC Evaluation",
      subtitle: "Risk Register & Change Framework",
      description: "5x5 Risk Register (DPDP Act 2023/EU AI Act), stakeholder RACI change management, and empirical pilot Go/No-Go decision gates.",
      deliverable: "Risk Dossier & PoC Evaluation Gate"
    },
    {
      step: 6,
      title: "Scaled Implementation",
      subtitle: "Production Agent Architecture",
      description: "Deploying multi-agent clusters, PII redaction API proxies, and continuous LLMOps evaluation telemetry.",
      deliverable: "Production-Grade Multi-Agent Systems"
    }
  ];

  const leadershipLogos = [
    { name: "Wipro", domain: "Enterprise Systems" },
    { name: "IBM", domain: "AI & Cloud Architecture" },
    { name: "Infosys", domain: "Global Delivery" },
    { name: "TCS", domain: "Enterprise Integration" },
    { name: "Oracle", domain: "Data & Infrastructure" },
    { name: "Microsoft", domain: "Cloud & AI Ecosystem" },
    { name: "AWS", domain: "Cloud Infrastructure" },
    { name: "Azure", domain: "Enterprise AI Services" }
  ];

  return (
    <div className="space-y-24 pb-20">

      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-[90vh] bg-navy-950 text-white flex items-center pt-12 pb-24 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-[radial-gradient(#153C78_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-navy-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Nisol AI — End-to-End Enterprise Transformation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Transform Enterprise Operations with{" "}
                <span className="bg-gradient-to-r from-golden-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  End-to-End AI.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-navy-100/90 max-w-2xl leading-relaxed font-normal">
                From 7–11 day executive discovery workshops and AWS multi-agent implementation to continuous LLMOps telemetry and governance. Powered by proprietary AI engines like <strong className="text-emerald-400 font-semibold">RoSense AI</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book AI Discovery Workshop
                </Button>
                <Button href="/products/rosense-ai" variant="navy" size="lg" icon={<Cpu className="w-4 h-4 text-emerald-400" />}>
                  Explore RoSense AI
                </Button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-navy-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-extrabold text-golden-400">Phase 1</div>
                  <div className="text-xs text-navy-200">Discovery & Strategy</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-400">Phase 2</div>
                  <div className="text-xs text-navy-200">AWS Build & Deploy</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-teal-300">Phase 3</div>
                  <div className="text-xs text-navy-200">Monitoring & Scale</div>
                </div>
                </div>
            </div>

            {/* Right Interactive Discovery Preview Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel-dark rounded-2xl p-7 shadow-2xl border border-golden-500/20 relative group hover:border-golden-500/40 transition-all">
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

                <div className="space-y-3.5 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <Search className="w-4 h-4 text-golden-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Diagnostic Phase]</span>
                        <span className="text-emerald-400">62 QUESTIONS</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Evaluating 15 enterprise capabilities & 8 AI readiness dimensions...</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
                    <Target className="w-4 h-4 text-golden-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-golden-300 font-bold mb-1">
                        <span>[Opportunity Matrix]</span>
                        <span className="text-golden-400">TOP 20 USE CASES</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Categorizing Quick Wins vs. Strategic Bets with ROI impact score...</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-navy-900/90 border border-navy-700 flex items-start gap-3">
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

                <div className="mt-4 pt-3.5 border-t border-navy-800 flex items-center justify-between text-[11px] text-navy-200">
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

      {/* SECTION 1.2: THE 3-PHASE TRANSFORMATION LIFECYCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 lg:p-10 rounded-3xl bg-navy-950 border border-navy-800 shadow-2xl relative overflow-hidden text-white">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-golden-500/10 text-golden-400 border border-golden-500/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Transformation Lifecycle</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              The 3-Phase Enterprise AI Journey
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              We partner with enterprise clients from initial strategy discovery to engineered production and continuous telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Phase 1 */}
            <div className="p-6 rounded-2xl bg-navy-900/90 border border-golden-500/30 hover:border-golden-500/60 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-golden-500 text-navy-950">PHASE 01</span>
                <Search className="w-5 h-5 text-golden-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Discovery & Strategy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                7–11 Day Nisol Discovery™ workshops, 62-question capability diagnostics, and opportunity prioritization.
              </p>
              <div className="pt-2 border-t border-navy-800 text-[11px] text-golden-300 font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Powered by RoSense AI Audio Engine</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-2xl bg-navy-900/90 border border-emerald-500/30 hover:border-emerald-500/60 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500 text-navy-950">PHASE 02</span>
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Build & Implementation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engineering autonomous agent clusters, RAG knowledge copilots, and cloud/on-prem appliances with zero vendor lock-in.
              </p>
              <div className="pt-2 border-t border-navy-800 text-[11px] text-emerald-400 font-mono">
                <span>AWS Bedrock • Textract • EC2/ECS</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-2xl bg-navy-900/90 border border-teal-500/30 hover:border-teal-500/60 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-teal-400 text-navy-950">PHASE 03</span>
                <ShieldCheck className="w-5 h-5 text-teal-300" />
              </div>
              <h3 className="text-xl font-bold text-white">Monitoring & Scaling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Real-time LLMOps telemetry, token cost optimization, hallucination monitoring, and enterprise governance.
              </p>
              <div className="pt-2 border-t border-navy-800 text-[11px] text-teal-300 font-mono">
                <span>Sub-200ms Latency • SOC-2 Guardrails</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.3: PROPRIETARY FEATURED PRODUCT — ROSENSE AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-navy-950 via-[#030d1d] to-navy-950 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <Cpu className="w-4 h-4" />
                <span>FLAGSHIP PROPRIETARY PRODUCT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                RoSense AI — <span className="text-emerald-400">Enterprise Conversation Intelligence</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Turn 18 hours of strategy offsites and boardroom discussions into structured execution. RoSense AI transcribes, diarizes, and extracts decisions, commitments, and risks with 100% data sovereignty.
              </p>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-navy-900/80 p-2.5 rounded-lg border border-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhisperX + Pyannote 3.1</span>
                </div>
                <div className="flex items-center gap-2 bg-navy-900/80 p-2.5 rounded-lg border border-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mamba-3 SSM Engine</span>
                </div>
                <div className="flex items-center gap-2 bg-navy-900/80 p-2.5 rounded-lg border border-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Supabase pgvector Search</span>
                </div>
                <div className="flex items-center gap-2 bg-navy-900/80 p-2.5 rounded-lg border border-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AWS Cloud & Air-Gapped Box</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button 
                  href="/products/rosense-ai" 
                  variant="primary" 
                  size="md"
                  className="bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold border-emerald-400"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore RoSense AI Product
                </Button>
              </div>
            </div>

            {/* Right Feature Card */}
            <div className="lg:col-span-5 bg-navy-900/90 rounded-2xl p-6 border border-emerald-500/30 font-mono text-xs text-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-700 text-[11px]">
                <span className="text-emerald-400 font-bold">Listen ➔ Structure ➔ Deliver</span>
                <span className="text-slate-400">v2.1 Supabase Native</span>
              </div>
              <div className="space-y-2 text-[11px] text-slate-300">
                <div className="p-2.5 rounded bg-navy-950 border border-navy-800">
                  <span className="text-golden-400 font-semibold">[Listen]</span> Transcribes 18+ hour recordings without context loss
                </div>
                <div className="p-2.5 rounded bg-navy-950 border border-navy-800">
                  <span className="text-emerald-400 font-semibold">[Structure]</span> Zero-shot decision & action item extraction
                </div>
                <div className="p-2.5 rounded bg-navy-950 border border-navy-800">
                  <span className="text-teal-300 font-semibold">[Deliver]</span> Sub-10ms vector memory search over 1M+ embeddings
                </div>
              </div>
              <div className="pt-2 border-t border-navy-700 text-[10px] text-slate-400 flex items-center justify-between">
                <span>AES-256 Encrypted</span>
                <span className="text-emerald-400">Zero Model Training</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: WHY NISOL AI? (15-Second Executive Summary) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="15-Second Executive Overview"
          title="Why Nisol AI?"
          subtitle="Discover Before You Invest. Quantify ROI. Build Production AI."
          description="We provide the strategic rigor and enterprise alignment that software agencies and generic AI vendors lack."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel-dark rounded-2xl p-8 border border-golden-500/20 hover:border-golden-500/50 shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 group-hover:scale-110 transition-transform shadow-md">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                We Discover Before We Build
              </h3>
              <p className="text-sm text-navy-200 leading-relaxed">
                Avoid costly failed AI initiatives by identifying, diagnosing, and prioritizing your highest-value enterprise opportunities before purchasing software or hiring developers.
              </p>
            </div>
            <div className="pt-4 border-t border-navy-800 text-xs font-semibold text-golden-400 flex items-center justify-between">
              <span>Risk-free discovery alignment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-panel-dark rounded-2xl p-8 border border-golden-500/20 hover:border-golden-500/50 shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 group-hover:scale-110 transition-transform shadow-md">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                We Quantify ROI
              </h3>
              <p className="text-sm text-navy-200 leading-relaxed">
                Every architectural recommendation is backed by empirical financial payback metrics, cost-reduction scores, labor efficiency gains, and 1-year net return calculations.
              </p>
            </div>
            <div className="pt-4 border-t border-navy-800 text-xs font-semibold text-golden-400 flex items-center justify-between">
              <span>Measurable payback model</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-panel-dark rounded-2xl p-8 border border-golden-500/20 hover:border-golden-500/50 shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 group-hover:scale-110 transition-transform shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                We Deliver Production AI
              </h3>
              <p className="text-sm text-navy-200 leading-relaxed">
                From strategy to deployment, we build resilient enterprise-grade AI software with RBAC security, zero-trust data governance, and automated cost controls.
              </p>
            </div>
            <div className="pt-4 border-t border-navy-800 text-xs font-semibold text-golden-400 flex items-center justify-between">
              <span>Enterprise SLA & Governance</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.8: 3 FLEXIBLE DELIVERY MODELS */}
      <DeliveryModelsSection />

      {/* SECTION 1.85: WHY FASTER & EVERY ENGAGEMENT INCLUDES */}
      <WhyFasterInclusions />

      {/* SECTION 1.95: 15 BOARD-READY EXECUTIVE DELIVERABLES */}
      <BoardDeliverablesGrid />

      {/* SECTION 2: THE DISCOVERY SECTION (The Heart of Nisol AI) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-dark rounded-3xl p-8 lg:p-12 border border-golden-500/30 shadow-2xl relative overflow-hidden text-white space-y-10">
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              <div className="bg-navy-900/90 rounded-xl p-6 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-4 group-hover:scale-110 transition-transform">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">62-Question Diagnostic</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Deep analysis across 15 core business capabilities.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-6 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">8 Readiness Dimensions</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Technical, data, security, & cultural maturity score.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-6 border border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">Opportunity Matrix</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Top 20 Use Cases cataloged by Quick Wins vs. Strategic Bets.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-6 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">ROI & Business Case</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Quantified financial payback & cost reduction metrics.</p>
                </div>
              </div>

              <div className="bg-navy-900/90 rounded-xl p-6 border border-navy-700/80 hover:border-golden-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-golden-500/10 border border-golden-500/30 flex items-center justify-center text-golden-400 mb-4 group-hover:scale-110 transition-transform">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">Executive Roadmap</h3>
                  <p className="text-xs text-navy-200 leading-relaxed">Board-ready implementation blueprints & governance.</p>
                </div>
              </div>
            </div>

            {/* Sleek Action Bar */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-golden-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-golden-400 shrink-0" />
                <p className="text-xs sm:text-sm text-white font-medium">
                  Nisol Discovery™ delivers 15 board-ready deliverables in 7–11 business days.
                </p>
              </div>
              <Button href="/discovery" variant="primary" size="md" className="shrink-0" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Full Discovery Framework
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2.5: 6-STEP VISUAL TRANSFORMATION PROCESS DIAGRAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Methodology Process"
          title="The Discovery & Transformation Journey"
          subtitle="6 Steps from Diagnostic to Scaled Execution"
          description="How Nisol AI takes your enterprise from initial discovery alignment to production AI software."
        />

        <div className="space-y-8">
          {/* Stepper Tabs / Header */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {processSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveProcessStep(s.step)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  activeProcessStep === s.step
                    ? "bg-navy-950 text-white border-golden-500 shadow-xl"
                    : "bg-white text-navy-950 border-slate-200 hover:border-golden-500/50 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    activeProcessStep === s.step
                      ? "bg-golden-500 text-navy-950"
                      : "bg-navy-900 text-golden-400"
                  }`}>
                    {s.step}
                  </span>
                  {s.step < 6 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />}
                </div>
                <div className="text-xs font-bold truncate">{s.title}</div>
                <div className={`text-[10px] truncate ${activeProcessStep === s.step ? "text-golden-300" : "text-navy-600"}`}>
                  {s.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Detailed Card View */}
          {processSteps.find(s => s.step === activeProcessStep) && (
            <div className="bg-navy-950 text-white rounded-2xl p-8 border border-golden-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-golden-500/20 text-golden-300 text-xs font-bold border border-golden-500/30">
                    <span>STEP {activeProcessStep} OF 6</span>
                    <span>•</span>
                    <span>{processSteps[activeProcessStep - 1].subtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {processSteps[activeProcessStep - 1].title}
                  </h3>

                  <p className="text-sm sm:text-base text-navy-100 leading-relaxed">
                    {processSteps[activeProcessStep - 1].description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs font-semibold text-golden-300 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span>Deliverable: {processSteps[activeProcessStep - 1].deliverable}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <Button href="/contact" variant="primary" size="md" className="justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                    Schedule Workshop Step
                  </Button>
                  <Button href="/discovery/methodology" variant="navy" size="md" className="justify-center" icon={<Search className="w-4 h-4" />}>
                    View Full Methodology
                  </Button>
                </div>
              </div>
            </div>
          )}
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
          <div className="bg-red-50/50 rounded-2xl p-8 border border-red-200 shadow-sm relative space-y-6">
            <div className="flex items-center gap-3">
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
                <span><strong>Runaway Token Spend:</strong> Naive LLM queries routing simple tasks to expensive third-party endpoints.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong>Security & Data Leaks:</strong> Sensitive customer data passed directly into public API endpoints without governance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong>No Telemetry or Evaluation:</strong> Unchecked hallucinations go unnoticed without regression benchmarking.</span>
              </li>
            </ul>
          </div>

          {/* Nisol AI Approach (The Solution) */}
          <div className="bg-navy-950 rounded-2xl p-8 border border-golden-500/30 shadow-xl relative text-white space-y-6">
            <div className="flex items-center gap-3">
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
                <span><strong>Stateful Multi-Agent Reasoning:</strong> Self-correcting workflows, tool validation, and fallback handling.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Cost & Model Optimization:</strong> Dynamic task routing to fine-tuned local models or GPT-4o based on cost/latency.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Zero-Trust Security & RBAC:</strong> Mandatory document access filters, PII masking, and data sanitization.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                <span><strong>Continuous LLMOps Telemetry:</strong> Real-time latency tracking, token caching, and automated evaluation metrics.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: SOLUTIONS OVERVIEW (With Learn More Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Post-Discovery Execution"
          title="Solutions — Scaled Implementation"
          subtitle="From Discovery Roadmap to Production AI Software"
          description="After Discovery, we help you build and deploy production-grade enterprise software across specialized core solution areas."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="glass-panel p-7 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-lg">AI Strategy & Governance</h4>
              <p className="text-xs text-navy-700 font-normal leading-relaxed">
                Executive roadmap planning, data stance evaluation, risk mitigation, and compliance frameworks for C-suite alignment.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <Link href="/services/strategy" className="text-xs font-bold text-navy-900 group-hover:text-golden-600 flex items-center gap-1">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-lg">AI Engineering & DevOps</h4>
              <p className="text-xs text-navy-700 font-normal leading-relaxed">
                Production-grade model serving, fine-tuning pipelines, low-latency architecture, and continuous evaluation guardrails.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <Link href="/services/engineering" className="text-xs font-bold text-navy-900 group-hover:text-golden-600 flex items-center gap-1">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-lg">AI-Powered Automation</h4>
              <p className="text-xs text-navy-700 font-normal leading-relaxed">
                Intelligent document parsing, operational workflow automation, and enterprise process optimization.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <Link href="/services/automation" className="text-xs font-bold text-navy-900 group-hover:text-golden-600 flex items-center gap-1">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-lg">Agentic AI & Multi-Agents</h4>
              <p className="text-xs text-navy-700 font-normal leading-relaxed">
                Autonomous task execution clusters with stateful reasoning loops, tool integration, and human-in-the-loop oversight.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <Link href="/services/agents" className="text-xs font-bold text-navy-900 group-hover:text-golden-600 flex items-center gap-1">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <MessageSquareCode className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-lg">Enterprise RAG Systems</h4>
              <p className="text-xs text-navy-700 font-normal leading-relaxed">
                Hybrid vector-dense memory engines, document retrieval, and enterprise knowledge copilots with zero-trust RBAC.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <Link href="/services/assistants" className="text-xs font-bold text-navy-900 group-hover:text-golden-600 flex items-center gap-1">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-2xl border border-slate-200 hover:border-golden-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-950 text-lg">Data Readiness & Security</h4>
              <p className="text-xs text-navy-700 font-normal leading-relaxed">
                ETL data pipelines, PII redaction, role-based access control, and enterprise compliance stance audits.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <Link href="/services/data-readiness" className="text-xs font-bold text-navy-900 group-hover:text-golden-600 flex items-center gap-1">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: INDUSTRIES WE SERVE */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeader
            badgeText="Industry Verticals"
            title="Industries We Serve"
            subtitle="Tailored AI Solutions for Core Enterprise Sectors"
            description="Deep domain expertise across high-compliance and high-scale enterprise verticals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((ind) => (
              <div key={ind.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-navy-900 text-golden-400 flex items-center justify-center mb-3">
                    {ind.id === "it-software" && <Code className="w-5 h-5" />}
                    {ind.id === "bfsi" && <Building2 className="w-5 h-5" />}
                    {ind.id === "healthcare" && <Activity className="w-5 h-5" />}
                    {ind.id === "manufacturing" && <Factory className="w-5 h-5" />}
                    {ind.id === "professional-services" && <Briefcase className="w-5 h-5" />}
                  </div>
                  <h4 className="text-sm font-bold text-navy-950 mb-1">{ind.name}</h4>
                  <p className="text-xs text-navy-700/80 leading-relaxed line-clamp-2">{ind.tagline}</p>
                </div>

                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100">
                  {ind.sampleImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED AI ROI CALCULATOR */}
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
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Maturity Score (0-100)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Estimated Annual Savings ($ / ₹)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-Year Net ROI & Payback Months</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
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

      {/* SECTION 8: ENTERPRISE EXPERTISE — PROVEN DELIVERY AT SCALE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badgeText="Enterprise Trust & Capability"
          title="ENTERPRISE EXPERTISE — PROVEN DELIVERY AT SCALE"
          subtitle="Backed by 40+ Years of Combined Leadership & Enterprise Transformation Experience"
          subtitleClassName="block golden-gradient-text text-2xl"
          description="Our leadership team brings 40+ years of combined expertise in enterprise AI, cloud architecture, and digital transformation. Here's what that means for your organization:"
        />

        {/* 3 Core Expertise Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1: Strategic Direction & Governance */}
          <div className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-golden-500/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div className="w-12 h-12 rounded-2xl bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-400 font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-golden-400 bg-golden-500/10 px-3 py-1 rounded-full border border-golden-500/20">Pillar 01</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">1. Strategic Direction & Governance</h3>
                <p className="text-xs text-navy-200 mt-1">Establishing executive alignment, ethical guardrails, and enterprise portfolio ROI.</p>
              </div>

              <ul className="space-y-4 pt-2 text-xs">
                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI Strategy & Governance</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">Operationalizing responsible AI frameworks and ethical AI deployment across the enterprise.</p>
                </li>

                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Program & Portfolio Management</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">Driving multi-stream alignment and measurable ROI across complex transformation programs.</p>
                </li>

                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Executive Stakeholder Management</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">Bridging business goals and technical delivery to ensure leadership alignment and board-ready outcomes.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: Architecture & Delivery */}
          <div className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-golden-500/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div className="w-12 h-12 rounded-2xl bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-400 font-bold">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-golden-400 bg-golden-500/10 px-3 py-1 rounded-full border border-golden-500/20">Pillar 02</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">2. Architecture & Delivery</h3>
                <p className="text-xs text-navy-200 mt-1">Building resilient, production-ready systems and cloud-native modern infrastructure.</p>
              </div>

              <ul className="space-y-4 pt-2 text-xs">
                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Enterprise Platform Delivery</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">End-to-end rollout of mission-critical systems with zero downtime and full stakeholder adoption.</p>
                </li>

                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI Solution Architecture</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">Designing scalable, production-ready AI models that integrate seamlessly with existing enterprise systems.</p>
                </li>

                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>DevOps & Cloud Modernization</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">Building cloud-native, resilient infrastructure with automated CI/CD pipelines and observability.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 3: Operational Efficiency */}
          <div className="bg-navy-950 text-white rounded-3xl p-8 border border-golden-500/30 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-golden-500/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-golden-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div className="w-12 h-12 rounded-2xl bg-golden-500/20 border border-golden-500/40 flex items-center justify-center text-golden-400 font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-golden-400 bg-golden-500/10 px-3 py-1 rounded-full border border-golden-500/20">Pillar 03</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">3. Operational Efficiency</h3>
                <p className="text-xs text-navy-200 mt-1">Accelerating execution velocity, reducing friction, and eliminating operational waste.</p>
              </div>

              <ul className="space-y-4 pt-2 text-xs">
                <li className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-1 hover:border-golden-500/40 transition-colors">
                  <div className="font-bold text-golden-300 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Digital Transformation & Process Automation</span>
                  </div>
                  <p className="text-navy-200 leading-relaxed pl-6">Eliminating friction through automated enterprise workflows, reducing costs, and accelerating time-to-market.</p>
                </li>
              </ul>

              {/* Embedding Callout Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-golden-500/20 to-golden-600/10 border border-golden-500/40 space-y-3 mt-6">
                <div className="flex items-center gap-2 text-golden-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-golden-400" />
                  <span>Embedded Advantage</span>
                </div>
                <p className="text-xs text-white font-medium leading-relaxed">
                  This expertise is embedded in every Nisol Discovery™ engagement.
                </p>
                <Button href="/discovery" variant="primary" size="sm" className="w-full justify-center text-xs" icon={<Search className="w-3.5 h-3.5" />}>
                  Start Your Discovery
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* HOW NISOL DISCOVERY™ ADDRESSES ENTERPRISE PAIN POINTS Matrix */}
        <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-golden-600">Enterprise Impact Matrix</span>
              <h3 className="text-xl sm:text-2xl font-black text-navy-950 mt-0.5">
                How Nisol Discovery™ Addresses Enterprise Pain Points
              </h3>
            </div>
            <Badge variant="navy">Problem → Solution Mapping</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { pain: "No clear AI strategy", solution: "AI Strategy & Governance" },
              { pain: "Unclear AI ROI", solution: "ROI Analysis & Business Case" },
              { pain: "Fragmented AI initiatives", solution: "Program & Portfolio Management" },
              { pain: "Siloed business & IT", solution: "Executive Stakeholder Alignment" },
              { pain: "Slow time-to-market", solution: "Enterprise Platform Delivery" },
              { pain: "AI that doesn't scale", solution: "AI Solution Architecture" },
              { pain: "Outdated infrastructure", solution: "DevOps & Cloud Modernization" },
              { pain: "Manual, inefficient processes", solution: "Digital Transformation & Automation" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-golden-500/40 transition-all">
                <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                  <X className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="truncate">{item.pain}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="truncate">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* COMPETITIVE MATRIX SECTION */}
      <ComparisonMatrix />

      {/* COST OF NOT KNOWING RISK PREVENTION */}
      <CostOfNotKnowing />

      {/* ZERO VENDOR LOCK-IN GUARANTEE */}
      <ZeroLockInGuarantee />

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