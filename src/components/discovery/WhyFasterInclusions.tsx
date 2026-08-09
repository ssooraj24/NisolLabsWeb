"use client";

import React from "react";
import { Clock, Zap, CheckCircle2, XCircle, ArrowRight, ShieldCheck, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const EVERY_ENGAGEMENT_INCLUDES = [
  { title: "AI Readiness Assessment", description: "Evaluating 15 capability pillars and data infrastructure stance." },
  { title: "Department Discovery Workshops", description: "62-question diagnostic across business units & team leads." },
  { title: "Opportunity Matrix", description: "Mapping impact vs. feasibility for prioritized AI initiatives." },
  { title: "Prioritized Use Cases", description: "Cataloging top 20 GenAI opportunities into Quick Wins vs. Bets." },
  { title: "ROI Analysis", description: "Quantified 5-year financial payback, labor savings & NPV model." },
  { title: "Transformation Roadmap", description: "30/90/180/365-day execution plan with milestone KPIs." },
  { title: "Executive Report", description: "20-slide boardroom-ready deck formatted for C-suite alignment." },
  { title: "Commercial Blueprint", description: "Target architecture, model selection & delivery choice specs." }
];

export const WHY_FASTER_COMPARISON = {
  traditional: {
    title: "Traditional Consulting",
    duration: "3–6 Months",
    points: [
      "3–6 months long engagement",
      "Multiple disjointed workshops",
      "Junior consultants doing data gathering",
      "Generic slide deck recommendations",
      "Slow, painful stakeholder alignment"
    ]
  },
  nisol: {
    title: "Nisol Discovery™",
    duration: "7–11 Business Days",
    points: [
      "7–11 business days execution",
      "Executive-led assessment (24+ yrs engineering)",
      "AI opportunity mapping & telemetry audit",
      "ROI-backed business cases (payback & NPV)",
      "Board-ready roadmap & 15 deliverables"
    ]
  }
};

export function WhyFasterInclusions() {
  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden border-t border-navy-800">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-golden-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-500/10 border border-golden-500/30 text-golden-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Executive Speed & Standard Inclusions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why Nisol Discovery™ <span className="gradient-text-gold">Delivers Results Faster</span>
          </h2>
          <p className="text-navy-200 text-base sm:text-lg leading-relaxed">
            Eliminate months of traditional consulting overhead. We deliver 15 board-ready deliverables in 7–11 business days—backed by senior leadership and AI-powered session synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* LEFT COLUMN: Why We Deliver Faster (Comparison Card) */}
          <div className="lg:col-span-5 glass-panel-dark rounded-2xl p-6 sm:p-8 border border-golden-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-golden-400" />
                  <h3 className="text-lg font-bold text-white">Speed Comparison</h3>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-golden-500/20 text-golden-300 border border-golden-500/30">
                  7-11 DAYS TURNAROUND
                </span>
              </div>

              {/* Traditional vs Nisol Boxes */}
              <div className="space-y-4 mb-6">
                {/* Traditional Box */}
                <div className="p-4 rounded-xl bg-navy-950/80 border border-red-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Traditional Consulting</span>
                    <span className="text-xs font-extrabold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      {WHY_FASTER_COMPARISON.traditional.duration}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {WHY_FASTER_COMPARISON.traditional.points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nisol Box */}
                <div className="p-4 rounded-xl bg-navy-900 border border-golden-400 shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-golden-300">Nisol Discovery™</span>
                    <span className="text-xs font-extrabold text-navy-950 bg-golden-400 px-2 py-0.5 rounded">
                      {WHY_FASTER_COMPARISON.nisol.duration}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {WHY_FASTER_COMPARISON.nisol.points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-golden-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-navy-800 text-xs text-navy-200 flex items-center justify-between">
              <span>Executive Senior Consultants Only</span>
              <span className="text-golden-300 font-bold">Zero Junior Oversight</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Every Engagement Includes Checklist */}
          <div className="lg:col-span-7 glass-panel-dark rounded-2xl p-6 sm:p-8 border border-navy-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-golden-400" />
                  <h3 className="text-xl font-bold text-white">Every Engagement Includes</h3>
                </div>
                <span className="text-xs text-golden-300 font-semibold">Standard Methodology Inclusions</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EVERY_ENGAGEMENT_INCLUDES.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-navy-950/60 border border-navy-800 hover:border-golden-500/40 transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-golden-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">{item.title}</h4>
                        <p className="text-[11px] text-slate-300 leading-snug">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-navy-200">
                <ShieldCheck className="w-4 h-4 text-golden-400 shrink-0" />
                <span>All 8 deliverables are included in Nisol Discovery™.</span>
              </div>
              <Button href="/contact?type=discovery-call" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Request Engagement Proposal
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
