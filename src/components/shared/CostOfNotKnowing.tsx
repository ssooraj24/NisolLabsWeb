"use client";

import React from "react";
import { COST_OF_NOT_KNOWING_RISKS } from "@/data/pricingJustification";
import { AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CostOfNotKnowing() {
  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Risk Mitigation & Avoidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            The Cost of <span className="text-red-400">Not Knowing</span>
          </h2>
          <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
            What happens if you launch AI initiatives without rigorous architectural scoping and ROI validation? The cost of getting it wrong far outweighs the cost of discovery.
          </p>
        </div>

        {/* Risk Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {COST_OF_NOT_KNOWING_RISKS.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel-dark rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 w-fit mb-4 border border-red-500/20">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{item.risk}</h3>
                <span className="text-xs font-extrabold text-red-400 block mb-3">{item.costRange}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.impact}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Risk Factor #{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Prevented Risk Callout Banner */}
        <div className="p-8 rounded-2xl bg-navy-900 border border-golden-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-golden-500/20 text-golden-300 shrink-0 border border-golden-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Prevent Bad AI Investments</h3>
              <p className="text-xs text-navy-200 max-w-xl">
                A Nisol Discovery™ engagement validates technical feasibility, data readiness, and ROI upfront—protecting your capital before you write a single line of code.
              </p>
            </div>
          </div>
          <Button href="/contact?type=discovery-call" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Protect Your AI Investment
          </Button>
        </div>

      </div>
    </section>
  );
}
