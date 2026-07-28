"use client";

import React from "react";
import { useUseCases } from "./useUseCases";
import { EditableContent } from "@/components/intelligence/EditableContent";

interface UseCasesTabProps {
  reportId: string;
}

export default function UseCasesTab({ reportId }: UseCasesTabProps) {
  const { useCases, loading, error, saveUseCases } = useUseCases(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Top 20 AI Use Cases...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load use cases: {error}
      </div>
    );
  }

  const items: any[] = useCases?.use_cases || (Array.isArray(useCases) ? useCases : []);

  return (
    <div className="space-y-6">
      {/* Table / Grid view */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-[#0A1E3C]">Prioritized Top 20 AI Initiatives</h3>
          <span className="text-xs font-semibold text-slate-500">{items.length} Use Cases</span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((uc, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {uc.department || "General"}
                  </span>
                  {uc.estimated_roi_percentage && (
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ROI: +{uc.estimated_roi_percentage}%
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{uc.name || `Use Case #${idx + 1}`}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{uc.description}</p>
                {uc.suggested_tech_stack && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {uc.suggested_tech_stack.map((t: string, i: number) => (
                      <span key={i} className="text-[10px] font-mono bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No formatted use cases found.</p>
        )}
      </div>

      {/* Editable Raw JSON */}
      <EditableContent
        label="4. AI Use Cases Config JSON"
        initialValue={JSON.stringify(useCases || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            return saveUseCases(parsed);
          } catch {
            alert("Invalid JSON format");
          }
        }}
        placeholder="Edit use cases JSON..."
      />
    </div>
  );
}
