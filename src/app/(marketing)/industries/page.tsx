import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Code, Building2, Activity, Factory, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { INDUSTRIES } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries | IT, BFSI, Healthcare, Manufacturing & Professional Services | Nisol Labs",
  description: "Discover how Nisol Labs delivers specialized AI solutions tailored for high-scale enterprise verticals."
};

export default function IndustriesPage() {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <Badge variant="golden">Industry Verticals</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-navy-950 tracking-tight">
          Tailored AI Architecture for <br />
          <span className="golden-gradient-text">Enterprise Sectors</span>
        </h1>
        <p className="text-base sm:text-lg text-navy-700/90 leading-relaxed">
          We bring deep domain compliance and specialized engineering patterns to high-stakes enterprise industries.
        </p>
      </div>

      {/* Vertical Deep Dives */}
      <div className="space-y-12">
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.id}
            className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-golden-400 flex items-center justify-center shrink-0">
                  {ind.id === "it-software" && <Code className="w-6 h-6" />}
                  {ind.id === "bfsi" && <Building2 className="w-6 h-6" />}
                  {ind.id === "healthcare" && <Activity className="w-6 h-6" />}
                  {ind.id === "manufacturing" && <Factory className="w-6 h-6" />}
                  {ind.id === "professional-services" && <Briefcase className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy-950">{ind.name}</h2>
                  <p className="text-xs font-semibold text-golden-700">{ind.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-navy-700/90 leading-relaxed">
                {ind.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-navy-600">Tailored AI Use Cases</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ind.keyUseCases.map((uc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-navy-800 bg-white p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-golden-600 shrink-0" />
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy-950 rounded-2xl p-6 text-white space-y-4 border border-golden-500/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-golden-400 mb-2">Proven Vertical Benchmark</div>
                <div className="text-xl font-extrabold text-white leading-snug">{ind.sampleImpact}</div>
              </div>
              <Button href="/resources#case-studies" variant="primary" size="md" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                View Vertical Case Study
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
