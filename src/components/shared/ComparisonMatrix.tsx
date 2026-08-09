"use client";

import React from "react";
import { COMPARISON_MATRIX } from "@/data/deliveryModels";
import { Check, X, ShieldCheck } from "lucide-react";

export function ComparisonMatrix() {
  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Nisol AI vs. <span className="gradient-text-gold">The Alternatives</span>
          </h2>
          <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
            See how Nisol AI compares against traditional management consultancies and pure strategy firms in speed, deliverable depth, and client freedom.
          </p>
        </div>

        {/* Table Container */}
        <div className="glass-panel-dark rounded-2xl border border-navy-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-950/80 border-b border-navy-800 text-xs uppercase tracking-wider text-slate-300">
                  <th className="py-4 px-6 font-extrabold">Capability / Metric</th>
                  <th className="py-4 px-6 font-bold text-slate-400">Traditional Consultancy</th>
                  <th className="py-4 px-6 font-bold text-slate-400">Pure Strategy Firm</th>
                  <th className="py-4 px-6 font-extrabold text-golden-300 bg-golden-500/10 border-x border-golden-500/20">
                    Nisol AI (You)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/80 text-xs">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-navy-800/30 ${
                      row.highlight ? "bg-navy-900/50 font-semibold" : ""
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                      <span>{row.category}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{row.traditionalConsultancy}</td>
                    <td className="py-4 px-6 text-slate-300">{row.pureStrategyFirm}</td>
                    <td className="py-4 px-6 font-bold text-golden-300 bg-golden-500/10 border-x border-golden-500/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-golden-400 shrink-0" />
                        <span>{row.nisolAI}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-navy-950/90 border-t border-navy-800 flex items-center justify-between text-xs text-navy-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-golden-400" />
              <span>Full flexibility: Choose Build, Manage, or Monitor after Discovery.</span>
            </div>
            <span className="font-bold text-golden-300 hidden sm:inline">Zero Vendor Lock-in Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
