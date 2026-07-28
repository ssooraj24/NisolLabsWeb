"use client";

import React from "react";

interface OpportunityItem {
  id?: string;
  name: string;
  department?: string;
  description?: string;
  business_value?: string;
  feasibility?: string;
}

interface OpportunityMatrixProps {
  data?: {
    quadrants?: {
      quick_wins?: OpportunityItem[];
      strategic_bets?: OpportunityItem[];
      incremental_improvements?: OpportunityItem[];
      long_term_investments?: OpportunityItem[];
    };
  };
}

export function OpportunityMatrix({ data }: OpportunityMatrixProps) {
  const q = data?.quadrants || {};

  const quickWins = q.quick_wins || [];
  const strategicBets = q.strategic_bets || [];
  const incremental = q.incremental_improvements || [];
  const longTerm = q.long_term_investments || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-[#0A1E3C]">AI Opportunity Prioritization Matrix (2x2)</h3>
        <p className="text-xs text-slate-500">Categorization based on Business Value vs Implementation Feasibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1: Quick Wins */}
        <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              ⚡ Quick Wins (High Impact, High Feasibility)
            </span>
            <span className="text-xs font-extrabold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
              {quickWins.length} Initiatives
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {quickWins.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-emerald-100 text-xs shadow-2xs">
                <span className="font-bold text-slate-900 block">{item.name}</span>
                {item.department && <span className="text-[10px] text-emerald-700 font-semibold">{item.department}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 2: Strategic Bets */}
        <div className="p-5 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
              🚀 Strategic Bets (High Impact, Low Feasibility)
            </span>
            <span className="text-xs font-extrabold bg-purple-200/80 text-purple-900 px-2 py-0.5 rounded-full">
              {strategicBets.length} Initiatives
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {strategicBets.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-purple-100 text-xs shadow-2xs">
                <span className="font-bold text-slate-900 block">{item.name}</span>
                {item.department && <span className="text-[10px] text-purple-700 font-semibold">{item.department}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 3: Incremental Improvements */}
        <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              🔧 Incremental (Low Impact, High Feasibility)
            </span>
            <span className="text-xs font-extrabold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full">
              {incremental.length} Initiatives
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {incremental.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-blue-100 text-xs shadow-2xs">
                <span className="font-bold text-slate-900 block">{item.name}</span>
                {item.department && <span className="text-[10px] text-blue-700 font-semibold">{item.department}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Long-Term Investments */}
        <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              ⏳ Long-Term (Low Impact, Low Feasibility)
            </span>
            <span className="text-xs font-extrabold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
              {longTerm.length} Initiatives
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {longTerm.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-amber-100 text-xs shadow-2xs">
                <span className="font-bold text-slate-900 block">{item.name}</span>
                {item.department && <span className="text-[10px] text-amber-700 font-semibold">{item.department}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
