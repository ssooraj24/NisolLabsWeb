"use client";

import React, { useState } from "react";
import { BOARD_DELIVERABLE_PACKS } from "@/data/pricingJustification";
import { FileText, CheckCircle2, Shield, Layers, TrendingUp } from "lucide-react";

export function BoardDeliverablesGrid() {
  const [activePackIndex, setActivePackIndex] = useState<number>(0);

  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Guaranteed Deliverable Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            15 Board-Ready <span className="gradient-text-gold">Executive Deliverables</span>
          </h2>
          <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
            Our Nisol Discovery™ framework delivers 15 comprehensive, executive-ready reports across 3 strategic packs—ready for boardroom review and immediate technical execution.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {BOARD_DELIVERABLE_PACKS.map((pack, idx) => (
            <button
              key={idx}
              onClick={() => setActivePackIndex(idx)}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border ${
                activePackIndex === idx
                  ? "bg-golden-500 text-navy-950 border-golden-400 shadow-lg shadow-golden-500/20"
                  : "bg-navy-900/60 text-slate-300 border-navy-800 hover:border-navy-700 hover:text-white"
              }`}
            >
              <span>{pack.title}</span>
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                activePackIndex === idx ? "bg-navy-950 text-golden-300" : "bg-navy-800 text-slate-400"
              }`}>
                {pack.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Active Pack Grid */}
        <div className="glass-panel-dark rounded-2xl p-6 sm:p-10 border border-golden-500/30">
          <div className="mb-8 border-b border-navy-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-golden-400 block mb-1">
                {BOARD_DELIVERABLE_PACKS[activePackIndex].badge}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {BOARD_DELIVERABLE_PACKS[activePackIndex].title}
              </h3>
              <p className="text-xs text-navy-200 mt-1 max-w-2xl">
                {BOARD_DELIVERABLE_PACKS[activePackIndex].description}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-navy-900 border border-navy-800 text-golden-300 text-xs font-bold shrink-0">
              5 Reports Included
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOARD_DELIVERABLE_PACKS[activePackIndex].deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-navy-900/60 border border-navy-800 hover:border-navy-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded bg-navy-950 border border-navy-800 text-golden-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-extrabold text-golden-400 uppercase tracking-wider">
                      Deliverable #{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">{item.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-800/60 flex items-center gap-1.5 text-[11px] text-golden-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-golden-400 shrink-0" />
                  <span>Executive Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
