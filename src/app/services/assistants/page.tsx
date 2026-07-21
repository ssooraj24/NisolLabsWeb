import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MessageSquareCode, ArrowRight, CheckCircle2, Layers, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Enterprise AI Assistants (Hybrid RAG) | Nisol Labs",
  description: "Context-aware conversational assistants connected securely to proprietary knowledge bases and enterprise tools."
};

export default function AssistantsServicePage() {
  const service = SERVICES.find((s) => s.slug === "assistants")!;

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-navy-950">
        <ArrowLeft className="w-4 h-4" /> Back to All Core Pillars
      </Link>

      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-golden-500/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <Badge variant="golden">HYBRID RAG COPILOTS</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Enterprise <span className="golden-gradient-text">AI Assistants</span>
          </h1>
          <p className="text-base sm:text-lg text-navy-100/90 leading-relaxed">
            {service.fullDescription}
          </p>
          <div className="pt-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Build Knowledge Copilot
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-golden-600" />
            Key Benefits
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
            Deliverables
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
