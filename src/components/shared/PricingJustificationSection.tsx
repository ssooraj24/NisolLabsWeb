"use client";

import React from "react";
import Link from "next/link";
import { JUSTIFICATION_PILLARS } from "@/data/pricingJustification";
import { Award, Brain, Zap, FileCheck, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const iconMap = {
  Award: Award,
  Brain: Brain,
  Zap: Zap,
  FileCheck: FileCheck
};

export function PricingJustificationSection() {
  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Speed Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider mb-4">
              <span>AI Transformation Partner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Why Nisol Discovery <span className="gradient-text-gold">Accelerates AI Transformation</span>
            </h2>
            <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
              Identify high-impact AI opportunities, quantify ROI, and build an implementation roadmap in days—not months. Nisol AI helps organizations move from AI uncertainty to business outcomes.
            </p>
          </div>

          {/* Comparison Panel */}
          <div className="lg:col-span-5">
            <div className="glass-panel-dark rounded-2xl p-6 border border-golden-500/30 space-y-4">
              <div className="space-y-3 border-b border-navy-800 pb-4">
                {/* Traditional Box */}
                <div className="p-3 rounded-xl bg-navy-950/80 border border-red-500/30">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">Traditional Approach</span>
                  <p className="text-xs text-slate-300 font-medium">Months of interviews, reports, and ambiguity</p>
                </div>
                {/* Nisol Box */}
                <div className="p-3 rounded-xl bg-navy-950 border border-golden-400/80">
                  <span className="text-[10px] font-bold text-golden-300 uppercase tracking-wider block mb-1">Nisol Discovery™</span>
                  <p className="text-xs text-golden-200 font-bold">Structured assessment, prioritized use cases, ROI-backed roadmap</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-golden-400 shrink-0" />
                <span>Accelerate transformation in 7–11 business days without consulting overhead.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {JUSTIFICATION_PILLARS.map((pillar, idx) => {
            const IconComp = iconMap[pillar.iconName as keyof typeof iconMap] || Award;
            return (
              <div
                key={idx}
                className="glass-panel-dark rounded-xl p-6 border border-navy-800 hover:border-golden-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 text-golden-400 w-fit mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{pillar.title}</h3>
                  <span className="text-[11px] font-semibold text-golden-400 block mb-3">{pillar.subtitle}</span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{pillar.message}</p>
                </div>

                <div className="pt-3 border-t border-navy-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Deliverable:</span>
                  <p className="text-[11px] text-golden-200 font-medium leading-snug">{pillar.evidence}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="text-center bg-navy-950 p-8 rounded-2xl border border-navy-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-white mb-1">Ready to Accelerate Your AI Transformation?</h4>
            <p className="text-xs text-navy-200">
              Move from AI uncertainty to a board-ready implementation roadmap in 7–11 business days.
            </p>
          </div>
          <Button href="/contact?type=discovery-call" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Book Nisol Discovery
          </Button>
        </div>

      </div>
    </section>
  );
}
