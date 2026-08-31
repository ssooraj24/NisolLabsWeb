"use client";

import React, { useState, useEffect } from "react";
import {
  DELIVERABLE_PORTFOLIO,
  DeliverableType,
  isDeliverableAllowedForPlan,
  PricingPlan,
  normalizePricingPlan,
  PLAN_CONFIG,
} from "@/lib/report/reportPortfolioTypes";
import { FileText, CheckCircle2, Shield, Layers, DollarSign, FlaskConical, Lock } from "lucide-react";

interface PDFExporterProps {
  reportId: string;
  auditTitle?: string;
  companyName?: string;
  planTier?: PricingPlan | string;
  onExportSuccess?: () => void;
}

const SECTION_OPTIONS = [
  { id: "summary", label: "1. Executive Summary & Value Prop" },
  { id: "maturity", label: "2. AI Readiness & Vulnerabilities" },
  { id: "matrix", label: "3. Opportunity Matrix & Top 20 Use Cases" },
  { id: "roadmap", label: "4. Transformation Roadmap & KPIs" },
  { id: "roi", label: "5. ROI Analysis & 5-Year Financials" },
  { id: "blueprints", label: "6. Technical Solution Blueprints" },
  { id: "proposal", label: "7. Recommended Roadmap & Investment" },
];

export function PDFExporter({ reportId, auditTitle, companyName, planTier, onExportSuccess }: PDFExporterProps) {
  const normPlan = normalizePricingPlan(planTier);
  const planInfo = PLAN_CONFIG[normPlan];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDeliverable, setActiveDeliverable] = useState<DeliverableType>("ai_readiness_transformation");

  useEffect(() => {
    if (!isDeliverableAllowedForPlan(activeDeliverable, normPlan)) {
      setActiveDeliverable("ai_readiness_transformation");
    }
  }, [activeDeliverable, normPlan]);
  const [selectedSections, setSelectedSections] = useState<string[]>(
    SECTION_OPTIONS.map((s) => s.id)
  );
  const [includeTOC, setIncludeTOC] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  // Progress Bar State (Async Export)
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  const toggleSection = (id: string) => {
    if (selectedSections.includes(id)) {
      setSelectedSections(selectedSections.filter((s) => s !== id));
    } else {
      setSelectedSections([...selectedSections, id]);
    }
  };

  const handleStartExport = async () => {
    setExporting(true);
    setProgress(15);
    setProgressLabel("Compiling specialized report data & models...");

    try {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(50);
      setProgressLabel("Rendering visual charts, vectors & tables...");

      const res = await fetch("/api/intelligence/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          auditTitle,
          companyName,
          deliverableType: activeDeliverable,
          sections: selectedSections,
          includeTOC,
          watermarkText: includeWatermark ? "CONFIDENTIAL" : "",
          currency,
        }),
      });

      setProgress(85);
      setProgressLabel("Assembling branded document pages...");

      if (!res.ok) {
        throw new Error("Failed to generate PDF export");
      }

      const html = await res.text();
      setProgress(100);
      setProgressLabel("Export Ready!");

      await new Promise((r) => setTimeout(r, 300));

      // Open in print window
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
      }

      setIsModalOpen(false);
      if (onExportSuccess) onExportSuccess();
    } catch (err: any) {
      alert(`Export error: ${err.message}`);
    } finally {
      setExporting(false);
      setProgress(0);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Export Deliverable PDF</span>
      </button>

      {/* EXPORT OPTIONS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0A1E3C]">Export Consulting Deliverable</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 uppercase">
                    ★ {planInfo.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Choose from the authorized reports for your subscription tier</p>
              </div>
              <button
                onClick={() => !exporting && setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar View */}
            {exporting ? (
              <div className="py-12 space-y-4 text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-[#0A1E3C]">{progressLabel}</h4>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden max-w-md mx-auto">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold">{progress}% Completed</span>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                {/* 1. Deliverable Type Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-slate-900 font-bold">1. Select Deliverable Type:</label>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {planInfo.allowedDeliverables.length} of {DELIVERABLE_PORTFOLIO.length} reports unlocked
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DELIVERABLE_PORTFOLIO.map((del) => {
                      const isAllowed = isDeliverableAllowedForPlan(del.id, normPlan);
                      const isSelected = activeDeliverable === del.id && isAllowed;
                      const requiredTierLabel =
                        del.id === "poc_evaluation_report" ? "Enterprise Plan Required" : "Growth Plan Required";

                      if (!isAllowed) {
                        return (
                          <div
                            key={del.id}
                            title={`This deliverable requires a ${requiredTierLabel}`}
                            className="p-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 text-left opacity-70 cursor-not-allowed select-none relative"
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-bold text-slate-500 text-xs flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{del.title}</span>
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
                                Locked
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-400 font-normal line-clamp-2 leading-tight">
                              {del.description}
                            </p>
                            <div className="text-[10px] text-amber-700 font-semibold mt-1.5 flex items-center gap-1">
                              <span>🔒 {requiredTierLabel}</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={del.id}
                          type="button"
                          onClick={() => setActiveDeliverable(del.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600"
                              : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              <span>{del.icon}</span>
                              <span>{del.title}</span>
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                isSelected ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {del.badge}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 font-normal line-clamp-2 leading-tight">
                            {del.description}
                          </p>
                          <div className="text-[10px] text-slate-400 font-medium mt-1.5">
                            Audience: {del.targetAudience.split(",")[0]} • {del.estimatedPages}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Flagship Section Selection (Only for flagship report) */}
                {activeDeliverable === "ai_readiness_transformation" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-900 font-bold">2. Sections to Include:</label>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedSections(
                            selectedSections.length === SECTION_OPTIONS.length
                              ? []
                              : SECTION_OPTIONS.map((s) => s.id)
                          )
                        }
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        {selectedSections.length === SECTION_OPTIONS.length ? "Deselect All" : "Select All"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      {SECTION_OPTIONS.map((sec) => (
                        <label key={sec.id} className="flex items-center gap-2 cursor-pointer font-normal">
                          <input
                            type="checkbox"
                            checked={selectedSections.includes(sec.id)}
                            onChange={() => toggleSection(sec.id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{sec.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Export Settings & Currency */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer font-normal">
                      <input
                        type="checkbox"
                        checked={includeWatermark}
                        onChange={(e) => setIncludeWatermark(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Include Confidential Watermark</span>
                    </label>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-900 font-bold">Currency:</span>
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setCurrency("INR")}
                          className={`px-2.5 py-0.5 text-xs font-bold rounded ${
                            currency === "INR" ? "bg-white text-blue-700 shadow-xs" : "text-slate-500"
                          }`}
                        >
                          INR (₹)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency("USD")}
                          className={`px-2.5 py-0.5 text-xs font-bold rounded ${
                            currency === "USD" ? "bg-white text-blue-700 shadow-xs" : "text-slate-500"
                          }`}
                        >
                          USD ($)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStartExport}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                  >
                    <span>🚀</span>
                    <span>Generate Branded Deliverable</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
