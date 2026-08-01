"use client";

import React, { useState } from "react";
import { useUseCases } from "./useUseCases";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { DEFAULT_TOP_20_USE_CASES } from "@/lib/ai/defaultUseCases";

interface UseCasesTabProps {
  reportId: string;
}

export default function UseCasesTab({ reportId }: UseCasesTabProps) {
  const { useCases, loading, error, saveUseCases } = useUseCases(reportId);
  const [isPopulating, setIsPopulating] = useState(false);

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

  const items: any[] =
    useCases?.use_cases ||
    useCases?.useCases ||
    useCases?.top_use_cases ||
    (Array.isArray(useCases) ? useCases : []);

  const handleGenerateUseCases = async () => {
    try {
      setIsPopulating(true);
      const res = await fetch("/api/intelligence/generate-use-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate customized use cases");
      }

      await saveUseCases(data.top_use_cases);
    } catch (err: any) {
      alert("Failed to generate use cases: " + (err.message || err));
    } finally {
      setIsPopulating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Table / Grid view */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-[#0A1E3C]">Prioritized AI Initiatives</h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {items.length} Use Cases
            </span>
          </div>

          <button
            onClick={handleGenerateUseCases}
            disabled={isPopulating}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            {isPopulating ? "Generating..." : "✨ Generate Client AI Use Cases"}
          </button>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((uc, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
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
                {uc.suggested_tech_stack && Array.isArray(uc.suggested_tech_stack) && (
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
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-3">
            <p className="text-sm text-slate-600 font-medium">No formatted use cases found for this report.</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Click below to analyze client assessment responses and generate tailored AI initiatives.
            </p>
            <button
              onClick={handleGenerateUseCases}
              disabled={isPopulating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              {isPopulating ? "Generating Client Use Cases..." : "✨ Generate Client AI Use Cases Now"}
            </button>
          </div>
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
