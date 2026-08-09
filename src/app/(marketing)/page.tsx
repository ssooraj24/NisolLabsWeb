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
  const [comparisonMode, setComparisonMode] = useState<"nisol" | "traditional">("nisol");
  const [activeProcessStep, setActiveProcessStep] = useState<number>(1);

  const processSteps = [
    {
      step: 1,
      title: "Discovery Workshop",
      subtitle: "Executive Diagnostic",
      description: "A structured 62-question diagnostic workshop evaluating 15 business capabilities and 8 readiness dimensions.",
      deliverable: "Capability Stance & Gap Audit"
    },
    {
      step: 2,
      title: "Capability Assessment",
      subtitle: "Infrastructure & Data Stance",
      description: "In-depth audit of data availability, security requirements (PII/RBAC), and technical architecture maturity.",
      deliverable: "Data Readiness & Security Scorecard"
    },
    {
      step: 3,
      title: "Opportunity Mapping",
      subtitle: "Use Case Cataloging",
      description: "Cataloging and prioritizing top 20 GenAI use cases into Quick Wins vs. Strategic Long-Term Bets.",
      deliverable: "Prioritized Opportunity Matrix"
    },
    {
      step: 4,
      title: "ROI & Payback Analysis",
      subtitle: "Financial Case",
      description: "Rigorous modeling of expected labor efficiency, token cost optimization, and net payback timelines.",
      deliverable: "Executive Financial Business Case"
    },
    {
      step: 5,
      title: "Transformation Roadmap",
      subtitle: "Board Blueprint",
      description: "Creating a board-ready execution blueprint, vendor-neutral architecture specs, and governance policy.",
      deliverable: "15 Executive Deliverable Reports"
    },
    {
      step: 6,
      title: "Scaled Implementation",
      subtitle: "Production Build",
      description: "Transitioning from roadmap to rapid production build with continuous LLMOps telemetry and safety guardrails.",
      deliverable: "Production-Grade AI Systems"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-golden-500/30 text-golden-300 text-xs font-semibold shadow-lg">
                <Sparkles className="w-4 h-4 text-golden-400" />
                <span>Nisol AI — From Discovery to Delivery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                AI Transformation, Delivered. <br className="hidden sm:block" />
                <span className="golden-gradient-text">Your Way.</span>
              </h1>

              <p className="text-lg sm:text-xl text-navy-100/90 max-w-2xl leading-relaxed font-normal">
                Discover high-value AI opportunities in 7–11 business days, then execute with total freedom—<strong className="text-golden-300 font-semibold">Build, Manage, or Monitor</strong> with guaranteed zero vendor lock-in.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Book AI Discovery Workshop
                </Button>
                <Button href="/discovery" variant="navy" size="lg" icon={<Search className="w-4 h-4" />}>
                  Explore Nisol Discovery™
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

            {/* Why Nisol Discovery™ Metrics Summary & Scope Hint */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
              
              {/* Summary Metrics Box */}
              <div className="lg:col-span-7 bg-navy-900/80 p-6 rounded-2xl border border-navy-700/90 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-golden-400 uppercase tracking-wider">
                  <span>Why Nisol Discovery™ Summary</span>
                  <Sparkles className="w-4 h-4" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800">
                    <div className="text-xl font-black text-golden-400">62</div>
                    <div className="text-[11px] text-navy-200 font-medium">Business Questions</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800">
                    <div className="text-xl font-black text-golden-400">15</div>
                    <div className="text-[11px] text-navy-200 font-medium">Capability Areas</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800">
                    <div className="text-xl font-black text-golden-400">8</div>
                    <div className="text-[11px] text-navy-200 font-medium">Readiness Dimensions</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800">
                    <div className="text-xl font-black text-emerald-400">20</div>
                    <div className="text-[11px] text-navy-200 font-medium">AI Opportunities</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800">
                    <div className="text-xl font-black text-emerald-400">15</div>
                    <div className="text-[11px] text-navy-200 font-medium">Executive Reports</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800">
                    <div className="text-xl font-black text-white">10–14 Days</div>
                    <div className="text-[11px] text-navy-200 font-medium">Full Assessment</div>
                  </div>
                </div>
              </div>

              {/* Engagement Scope Hint Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-navy-900 to-navy-950 p-6 rounded-2xl border border-golden-500/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-golden-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-golden-400" />
                    <span>Typical Discovery Engagement</span>
                  </div>
                  <p className="text-xs text-navy-200 leading-relaxed mb-4">
                    Clear scope, rapid execution, and executive-ready deliverables designed for enterprise leadership teams.
                  </p>

                  <ul className="space-y-2 text-xs font-semibold text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>2-Week Discovery Workshop & Audit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Fixed Scope & Guaranteed Milestones</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>3 Strategic Packs (15 Executive Deliverables)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-navy-800">
                  <Button href="/discovery" variant="primary" size="md" className="w-full justify-center" icon={<ArrowRight className="w-4 h-4" />}>
                    Explore Nisol Discovery™
                  </Button>
                </div>
              </div>

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

      {/* SECTION 4: THE DISCOVERY ADVANTAGE (Interactive Comparison Toggle Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="The Discovery Advantage"
          title="Traditional Consulting vs. Nisol Discovery™"
          subtitle="Why Leaders Choose Our Proprietary Platform"
          description="See how our technology-backed discovery methodology outperforms standard manual consulting."
        />

        <div className="glass-panel rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
          
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