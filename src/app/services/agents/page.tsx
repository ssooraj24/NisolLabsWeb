import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Bot, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Terminal, Layers, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Autonomous AI Agents (Flagship) | Nisol Labs",
  description: "Deploy production-grade autonomous agent clusters that plan, execute, validate, and collaborate across enterprise systems with human-in-the-loop governance."
};

export default function AgentsServicePage() {
  const service = SERVICES.find((s) => s.slug === "agents")!;

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-navy-950">
        <ArrowLeft className="w-4 h-4" /> Back to All Core Pillars
      </Link>

      {/* Hero Header */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-golden-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <Badge variant="golden">FLAGSHIP PILLAR</Badge>
            <span className="text-xs text-navy-200 font-mono">LangGraph • AutoGPT • Python FastAPI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Autonomous <span className="golden-gradient-text">AI Agents</span>
          </h1>

          <p className="text-base sm:text-lg text-navy-100/90 leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Deploy Agent Architecture
            </Button>
            <Button href="/resources/roi-calculator" variant="navy" size="lg">
              Calculate Agent ROI
            </Button>
          </div>
        </div>
      </div>

      {/* Key Benefits & Deliverables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-golden-600" />
            Key Enterprise Capabilities
          </h2>
          <ul className="space-y-3 text-sm text-navy-800">
            {service.keyBenefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-golden-500 mt-2 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-navy-700" />
            Technical Deliverables
          </h2>
          <ul className="space-y-3 text-sm text-navy-800">
            {service.deliverables.map((d, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Highlighted Case Study */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-golden-400">Featured Case Benchmark</span>
          <h3 className="text-xl font-bold text-white mt-1">{service.caseStudyHighlight.title}</h3>
          <p className="text-xs text-navy-200 mt-2 max-w-xl">{service.caseStudyHighlight.impact}</p>
        </div>
        <div className="text-2xl font-black text-golden-400 bg-navy-950 px-6 py-3 rounded-xl border border-golden-500/30 shrink-0">
          {service.caseStudyHighlight.metric}
        </div>
      </div>
    </div>
  );
}
