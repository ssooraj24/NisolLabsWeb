"use client";

import React from "react";

export interface BlueprintItem {
  id?: string;
  use_case_name?: string;
  name?: string;
  category?: string;
  business_problem?: string;
  description?: string;
  proposed_solution?: string;
  technology_stack?: string[];
  architecture_summary?: string;
  implementation_phases?: string[];
  success_metrics?: string[];
}

interface BlueprintCardProps {
  blueprint: BlueprintItem;
}

export function BlueprintCard({ blueprint }: BlueprintCardProps) {
  const title = blueprint.use_case_name || blueprint.name || "Solution Blueprint";
  const category = blueprint.category || "General AI";
  const problem = blueprint.business_problem || blueprint.description || "";
  const solution = blueprint.proposed_solution || "";
  const techStack = blueprint.technology_stack || [];
  const phases = blueprint.implementation_phases || [];
  const metrics = blueprint.success_metrics || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
            {category}
          </span>
          <h3 className="text-lg font-bold text-[#0A1E3C] mt-1">{title}</h3>
        </div>
      </div>

      {problem && (
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Business Problem</span>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">{problem}</p>
        </div>
      )}

      {solution && (
        <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">Proposed Solution</span>
          <p className="text-xs text-slate-800 mt-1 leading-relaxed">{solution}</p>
        </div>
      )}

      {techStack.length > 0 && (
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Technology Stack</span>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold rounded-md border border-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {blueprint.architecture_summary && (
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Architecture Overview</span>
          <p className="text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1">
            {blueprint.architecture_summary}
          </p>
        </div>
      )}

      {phases.length > 0 && (
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Implementation Steps</span>
          <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
            {phases.map((ph, idx) => (
              <li key={idx}>{ph}</li>
            ))}
          </ul>
        </div>
      )}

      {metrics.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Success Metrics</span>
          <div className="flex flex-wrap gap-2">
            {metrics.map((m, idx) => (
              <span key={idx} className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
                🎯 {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
