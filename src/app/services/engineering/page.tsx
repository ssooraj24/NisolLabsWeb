import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Cpu, ArrowRight, CheckCircle2, Layers, ArrowLeft, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "AI Engineering & DevOps (Differentiator) | Nisol Labs",
  description: "Enterprise LLMOps, model fine-tuning, latency optimization, and automated CI/CD pipelines for AI applications."
};

export default function EngineeringServicePage() {
  const service = SERVICES.find((s) => s.slug === "engineering")!;

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-navy-950">
        <ArrowLeft className="w-4 h-4" /> Back to All Core Pillars
      </Link>

      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <Badge variant="navy">DIFFERENTIATOR PILLAR</Badge>
            <span className="text-xs text-navy-200 font-mono">vLLM • Ollama • LlamaIndex • Kubernetes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            AI Engineering & <span className="golden-gradient-text">DevOps (LLMOps)</span>
          </h1>

          <p className="text-base sm:text-lg text-navy-100/90 leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Optimize Your AI Infra
            </Button>
            <Button href="/resources/roi-calculator" variant="navy" size="lg">
              Calculate Token Savings
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-golden-600" />
            Key Engineering Advantages
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
            Deliverables & Architecture
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
    </div>
  );
}
