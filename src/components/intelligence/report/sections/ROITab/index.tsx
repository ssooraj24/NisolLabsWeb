"use client";

import React, { useState } from "react";
import { useROI } from "./useROI";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { calculateROICalculations } from "@/lib/utils/roiCalculator";
import { TrendingUp, ShieldAlert, BarChart3, Calculator } from "lucide-react";

interface ROITabProps {
  reportId: string;
}

export default function ROITab({ reportId }: ROITabProps) {
  const { roi, loading, error, saveROI } = useROI(reportId);
  const [activeScenario, setActiveScenario] = useState<"Base" | "Conservative" | "Optimistic">("Base");

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

  const sensitivity = roi?.sensitivityAnalysis || {
    discountRatePct: 10,
    scenarios: [
      { scenarioName: "Conservative Case", adoptionRatePct: 75, annualSavingsFormatted: "₹2.40 Crore", fiveYearNetBenefitFormatted: "₹9.80 Crore", roiPercentage: 195, paybackPeriodMonths: 8.8, npvFormatted: "₹7.45 Crore" },
      { scenarioName: "Base Case", adoptionRatePct: 100, annualSavingsFormatted: "₹3.20 Crore", fiveYearNetBenefitFormatted: "₹14.20 Crore", roiPercentage: 285, paybackPeriodMonths: 6.8, npvFormatted: "₹10.85 Crore" },
      { scenarioName: "Optimistic Case", adoptionRatePct: 125, annualSavingsFormatted: "₹4.00 Crore", fiveYearNetBenefitFormatted: "₹18.75 Crore", roiPercentage: 385, paybackPeriodMonths: 5.2, npvFormatted: "₹14.20 Crore" },
    ],
  };

  const cashFlows = roi?.fiveYearCashFlowTimeline || [
    { year: 1, investment: 9500000, benefit: 20800000, net: 11300000, cumulativeNet: 11300000 },
    { year: 2, investment: 1425000, benefit: 32000000, net: 30575000, cumulativeNet: 41875000 },
    { year: 3, investment: 950000, benefit: 40000000, net: 39050000, cumulativeNet: 80925000 },
    { year: 4, investment: 475000, benefit: 46400000, net: 45925000, cumulativeNet: 126850000 },
    { year: 5, investment: 475000, benefit: 51200000, net: 50725000, cumulativeNet: 177575000 },
  ];

  return (
    <div className="space-y-6">
      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Est. Investment</span>
          <span className="text-xl font-extrabold text-[#0A1E3C] mt-1 block">
            {roi?.totalInvestmentEstimated || `$${summary.total_estimated_investment_usd?.toLocaleString() || "95,000"}`}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Initial Implementation</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Annual Cost Savings</span>
          <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
            {roi?.totalEstimatedAnnualSavings || `$${summary.annual_cost_savings_usd?.toLocaleString() || "320,000"}`}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Operational Savings / yr</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Payback Period</span>
          <span className="text-xl font-extrabold text-[#0A1E3C] mt-1 block">
            {roi?.averagePaybackMonths || summary.payback_period_months || 6.8} Months
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Break-even milestone</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Overall 5-Yr Net ROI</span>
          <span className="text-xl font-extrabold text-blue-600 mt-1 block">
            +{roi?.overallRoiPercentage || summary.overall_roi_percentage || 285}%
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">Net Present Value: {roi?.netPresentValue || "₹10.8 Cr"}</span>
        </div>
      </div>

      {/* 3-Scenario Sensitivity Analysis */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              CFO Sensitivity Stress Test
            </div>
            <h3 className="text-lg font-bold text-[#0A1E3C]">3-Scenario Sensitivity Analysis (10% Discount Rate)</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {["Conservative", "Base", "Optimistic"].map((sc) => (
              <button
                key={sc}
                onClick={() => setActiveScenario(sc as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeScenario === sc
                    ? "bg-[#0A1E3C] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {sc}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 font-bold rounded-l-lg">Scenario Model</th>
                <th className="p-3 font-bold">Adoption Rate</th>
                <th className="p-3 font-bold">Annual Savings</th>
                <th className="p-3 font-bold">5-Year Net Benefit</th>
                <th className="p-3 font-bold">5-Yr ROI %</th>
                <th className="p-3 font-bold">Payback</th>
                <th className="p-3 font-bold rounded-r-lg">Net Present Value (NPV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sensitivity.scenarios.map((sc: any, i: number) => {
                const isSelected = sc.scenarioName.includes(activeScenario);
                return (
                  <tr key={i} className={isSelected ? "bg-indigo-50/70 font-semibold" : "hover:bg-slate-50"}>
                    <td className="p-3 font-bold text-slate-900">{sc.scenarioName}</td>
                    <td className="p-3 text-slate-600">{sc.adoptionRatePct}%</td>
                    <td className="p-3 text-emerald-700 font-bold">{sc.annualSavingsFormatted}</td>
                    <td className="p-3 text-[#0A1E3C] font-extrabold">{sc.fiveYearNetBenefitFormatted}</td>
                    <td className="p-3 text-emerald-600 font-bold">{sc.roiPercentage}%</td>
                    <td className="p-3 text-slate-600">{sc.paybackPeriodMonths} Mo</td>
                    <td className="p-3 font-bold text-slate-900">{sc.npvFormatted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5-Year Cash Flow Projection */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-[#0A1E3C]">5-Year Cash Flow Projection</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {cashFlows.map((cf: any, i: number) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Year {cf.year}</span>
                <div className="text-[11px] text-slate-500">
                  Inv: ₹{(cf.investment / 100000).toFixed(1)}L
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Benefit: ₹{(cf.benefit / 100000).toFixed(1)}L
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 mt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Net Cumulative</span>
                <div className="font-extrabold text-[#0A1E3C] text-sm">₹{(cf.cumulativeNet / 10000000).toFixed(2)} Cr</div>
              </div>
            </div>
          ))}
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
                  <span className="text-slate-500">Est. Investment: {d.investment || `$${d.investment_usd?.toLocaleString() || 0}`}</span>
                  <span className="font-bold text-emerald-600">Annual Savings: {d.annualSavings || `$${d.annual_savings_usd?.toLocaleString() || 0}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editable Raw ROI JSON */}
      <EditableContent
        label="ROI Financial Calculations JSON"
        initialValue={JSON.stringify(calculatedData || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            const recalculated = calculateROICalculations(parsed);
            return saveROI(recalculated);
          } catch {
            alert("Invalid JSON format");
            return Promise.resolve();
          }
        }}
      />
    </div>
  );
}
