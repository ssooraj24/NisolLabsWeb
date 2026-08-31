"use client";

import React, { useState } from "react";
import { useUseCases } from "./useUseCases";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { ListFilter, LayoutGrid, Table, Sparkles, Star } from "lucide-react";

interface UseCasesTabProps {
  reportId: string;
}

export default function UseCasesTab({ reportId }: UseCasesTabProps) {
  const { useCases, loading, error, saveUseCases } = useUseCases(reportId);
  const [isPopulating, setIsPopulating] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Prioritized AI Use Cases...
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
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-[#0A1E3C]">Prioritized AI Opportunity Catalog</h3>
            <span className="text-xs font-bold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {items.length} Initiatives
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "table" ? "bg-white text-[#0A1E3C] shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                Scorecard Table
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid" ? "bg-white text-[#0A1E3C] shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Cards
              </button>
            </div>

            <button
              onClick={handleGenerateUseCases}
              disabled={isPopulating}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isPopulating ? "Analyzing..." : "Re-Score with AI"}
            </button>
          </div>
        </div>

        {items.length > 0 ? (
          viewMode === "table" ? (
            /* Multi-Criteria Prioritization Ranking Table */
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-3 font-bold rounded-l-lg" style={{ width: "6%" }}>Rank</th>
                    <th className="p-3 font-bold" style={{ width: "28%" }}>AI Initiative & Department</th>
                    <th className="p-3 font-bold" style={{ width: "12%" }}>Category</th>
                    <th className="p-3 font-bold text-center" style={{ width: "10%" }}>Strategic Fit</th>
                    <th className="p-3 font-bold text-center" style={{ width: "10%" }}>Ease (1-5)</th>
                    <th className="p-3 font-bold text-center" style={{ width: "10%" }}>Data Ready</th>
                    <th className="p-3 font-bold" style={{ width: "12%" }}>Time to Value</th>
                    <th className="p-3 font-bold rounded-r-lg" style={{ width: "12%" }}>Est. ROI %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((uc, idx) => {
                    const rank = uc.compositePriorityRank || idx + 1;
                    const strategicFit = uc.strategicFitScore || Math.min(5, Math.max(3, Math.round((uc.businessValueScore || 75) / 20)));
                    const ease = uc.easeOfImplementationScore || Math.min(5, Math.max(2, Math.round((100 - (uc.implementationEffortScore || 40)) / 20)));
                    const dataReady = uc.dataReadinessScore || 4;
                    const roi = uc.estimatedRoiPercentage || uc.estimated_roi_percentage || 280;

                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-extrabold text-[#0A1E3C]">
                          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-mono">
                            #{rank}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{uc.name || `Use Case #${idx + 1}`}</div>
                          <div className="text-[11px] text-slate-500">{uc.department || "General Operations"}</div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              uc.category === "Quick Win"
                                ? "bg-emerald-100 text-emerald-700"
                                : uc.category === "Strategic Bet"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {uc.category || "Quick Win"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-0.5 text-amber-500 font-bold">
                            {strategicFit} / 5
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-slate-700">{ease} / 5</td>
                        <td className="p-3 text-center font-bold text-indigo-600">{dataReady} / 5</td>
                        <td className="p-3 font-semibold text-slate-600">
                          {uc.timeToValueWeeks || uc.estimatedTimelineWeeks || 6} Weeks
                        </td>
                        <td className="p-3 font-extrabold text-emerald-600">+{roi}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Cards View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((uc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {uc.department || "General"}
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ROI: +{uc.estimatedRoiPercentage || uc.estimated_roi_percentage || 280}%
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{uc.name || `Use Case #${idx + 1}`}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{uc.description || uc.businessProblem}</p>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-3">
            <p className="text-sm text-slate-600 font-medium">No formatted use cases found for this report.</p>
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
        label="AI Use Cases Config JSON"
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
