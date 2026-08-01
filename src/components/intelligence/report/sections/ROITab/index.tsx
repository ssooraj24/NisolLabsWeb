"use client";

import React from "react";
import { useROI } from "./useROI";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { calculateROICalculations } from "@/lib/utils/roiCalculator";

interface ROITabProps {
  reportId: string;
}

export default function ROITab({ reportId }: ROITabProps) {
  const { roi, loading, error, saveROI } = useROI(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Financial ROI Projections...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load ROI data: {error}
      </div>
    );
  }

  const calculatedData = calculateROICalculations(roi);
  const summary = calculatedData.summary || {};
  const depts: any[] = calculatedData.department_breakdown || [];

  return (
    <div className="space-y-6">
      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Est. Investment</span>
          <span className="text-xl font-extrabold text-[#0A1E3C] mt-1 block">
            ${summary.total_estimated_investment_usd?.toLocaleString() || "0"}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">One-time Implementation</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Annual Cost Savings</span>
          <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
            ${summary.annual_cost_savings_usd?.toLocaleString() || "0"}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Operational Savings / yr</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Payback Period</span>
          <span className="text-xl font-extrabold text-[#0A1E3C] mt-1 block">
            {summary.payback_period_months || 0} Months
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Break-even milestone</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Overall Program ROI</span>
          <span className="text-xl font-extrabold text-blue-600 mt-1 block">
            +{summary.overall_roi_percentage || 0}%
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">5-Year Net ROI</span>
        </div>
      </div>

      {/* Department Financial Breakdown */}
      {depts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-[#0A1E3C]">Department Financial Benefit Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {depts.map((d, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-900 block">{d.department}</span>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Est. Investment: ${d.investment_usd?.toLocaleString() || 0}</span>
                  <span className="font-bold text-emerald-600">Annual Savings: ${d.annual_savings_usd?.toLocaleString() || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editable Raw ROI JSON */}
      <EditableContent
        label="6. ROI Financial Calculations JSON"
        initialValue={JSON.stringify(calculatedData || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            const recalculated = calculateROICalculations(parsed);
            return saveROI(recalculated);
          } catch {
            alert("Invalid JSON format");
          }
        }}
        placeholder="Edit ROI JSON..."
      />
    </div>
  );
}
