"use client";

import React from "react";

interface RoadmapInitiative {
  title: string;
  description?: string;
  dependencies?: string[];
  success_metrics?: string;
}

interface RoadmapPhase {
  phase: string; // "30 Days", "90 Days", "180 Days", "365 Days"
  title: string;
  initiatives: RoadmapInitiative[];
}

interface RoadmapTimelineProps {
  phases?: RoadmapPhase[];
}

export function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const defaultPhases: RoadmapPhase[] = [
    { phase: "30 Days", title: "Foundation & Governance", initiatives: [] },
    { phase: "90 Days", title: "Pilot Implementations", initiatives: [] },
    { phase: "180 Days", title: "Scale & System Integration", initiatives: [] },
    { phase: "365 Days", title: "Enterprise AI Rollout", initiatives: [] },
  ];

  const list = phases && phases.length > 0 ? phases : defaultPhases;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-[#0A1E3C]">AI Transformation Roadmap</h3>
        <p className="text-xs text-slate-500">Phased rollout schedule across 30, 90, 180, and 365 day milestones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {list.map((ph, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                {ph.phase}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{ph.title}</h4>
            </div>

            <div className="space-y-2.5">
              {ph.initiatives && ph.initiatives.length > 0 ? (
                ph.initiatives.map((init, iIdx) => (
                  <div key={iIdx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs shadow-2xs space-y-1">
                    <span className="font-bold text-slate-900 block">{init.title}</span>
                    {init.description && <p className="text-[11px] text-slate-600 leading-relaxed">{init.description}</p>}
                    {init.success_metrics && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium block mt-1">
                        🎯 {init.success_metrics}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No initiatives defined for this phase.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
