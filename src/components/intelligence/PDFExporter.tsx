"use client";

import React, { useState } from "react";
import {
  DELIVERABLE_PORTFOLIO,
  DeliverableType,
  isDeliverableAllowedForPlan,
  PricingPlan,
  normalizePricingPlan,
  PLAN_CONFIG,
} from "@/lib/report/reportPortfolioTypes";
import { FileText, Download, Lock, CheckCircle2, ArrowRight } from "lucide-react";

interface PDFExporterProps {
  reportId: string;
  auditTitle?: string;
  companyName?: string;
  planTier?: PricingPlan | string;
  onExportSuccess?: () => void;
}

export function PDFExporter({ reportId, auditTitle, companyName, planTier, onExportSuccess }: PDFExporterProps) {
  const normPlan = normalizePricingPlan(planTier);
  const planInfo = PLAN_CONFIG[normPlan];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  // Progress Bar State (Async Export)
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const executeExport = async (deliverableTypes: DeliverableType[]) => {
    if (deliverableTypes.length === 0) return;
    setExporting(true);
    setProgress(15);
    setProgressLabel(
      deliverableTypes.length > 1
        ? `Compiling full ${deliverableTypes.length}-document engagement dossier...`
        : `Generating specialized deliverable...`
    );

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
          deliverableTypes,
          deliverableType: deliverableTypes[0] || "ai_readiness_transformation",
          includeTOC: true,
          watermarkText: includeWatermark ? "CONFIDENTIAL" : "",
          currency,
        }),
      });

      setProgress(85);
      setProgressLabel("Assembling branded document bundle...");

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
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
      }

      if (onExportSuccess) {
        onExportSuccess();
      }

      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } catch (err: any) {
      console.error("[PDFExporter] Export error:", err);
      alert(err.message || "Failed to export PDF deliverable.");
    } finally {
      setExporting(false);
      setProgress(0);
    }
  };

  const handleExportAll = () => {
    executeExport([...planInfo.allowedDeliverables]);
  };

  const handleExportSingle = (delId: DeliverableType) => {
    executeExport([delId]);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
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
                  <h3 className="text-lg font-bold text-[#0A1E3C]">Export Consulting Deliverables</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 uppercase">
                    ★ {planInfo.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Authorized transformation dossier for {companyName || "your enterprise"}.
                </p>
              </div>
              <button
                onClick={() => !exporting && setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
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
                {/* Dossier Deliverables List (No checkboxes) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <label className="text-slate-900 font-bold">Authorized Deliverables Suite:</label>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {planInfo.allowedDeliverables.length} Included in Plan
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {DELIVERABLE_PORTFOLIO.map((del) => {
                      const isAllowed = isDeliverableAllowedForPlan(del.id, normPlan);
                      const requiredTierLabel =
                        del.id === "poc_evaluation_report" ? "Enterprise Plan Required" : "Growth Plan Required";

                      if (!isAllowed) {
                        return (
                          <div
                            key={del.id}
                            className="p-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 opacity-60 select-none"
                          >
                            <div className="flex items-start gap-2.5">
                              <div className="p-2 rounded-lg bg-slate-100 text-slate-400 mt-0.5">
                                <Lock className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-600 text-xs">{del.title}</span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-600">
                                    Locked
                                  </span>
                                </div>
                                <p className="text-[10.5px] text-slate-400 font-normal leading-tight mt-0.5">
                                  {del.description}
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] text-amber-700 font-semibold shrink-0 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                              🔒 {requiredTierLabel}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={del.id}
                          className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all flex items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="text-xl mt-0.5">{del.icon}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-xs">{del.title}</span>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                  {del.badge}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-500 font-normal leading-tight mt-0.5">
                                {del.description}
                              </p>
                              <div className="text-[10px] text-slate-400 font-medium mt-1">
                                Audience: {del.targetAudience.split(",")[0]} • {del.estimatedPages}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleExportSingle(del.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 font-bold rounded-lg border border-slate-200 flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                            title={`Export ${del.title} individually`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Export Settings & Currency */}
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
                          className={`px-2.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                            currency === "INR" ? "bg-white text-blue-700 shadow-xs" : "text-slate-500"
                          }`}
                        >
                          INR (₹)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency("USD")}
                          className={`px-2.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
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
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-normal">
                    Includes professional formatting, SVG charts & executive sign-off sheets.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl cursor-pointer font-semibold"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleExportAll}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        Download Complete Dossier ({planInfo.allowedDeliverables.length} Deliverable
                        {planInfo.allowedDeliverables.length > 1 ? "s" : ""})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
