"use client";

import React, { useState } from "react";

interface PDFExporterProps {
  reportId: string;
  auditTitle?: string;
  onExportSuccess?: () => void;
}

const SECTION_OPTIONS = [
  { id: "summary", label: "Executive Summary" },
  { id: "readiness", label: "AI Readiness Assessment" },
  { id: "capabilities", label: "Capability-wise Maturity Scores" },
  { id: "matrix", label: "AI Opportunity Matrix" },
  { id: "usecases", label: "Top 20 AI Use Cases" },
  { id: "roadmap", label: "AI Transformation Roadmap" },
  { id: "roi", label: "ROI Analysis" },
  { id: "blueprints", label: "Solution Blueprints" },
  { id: "proposal", label: "Proposal Draft" },
];

export function PDFExporter({ reportId, auditTitle, onExportSuccess }: PDFExporterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>(
    SECTION_OPTIONS.map((s) => s.id)
  );
  const [includeTOC, setIncludeTOC] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(true);

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
    setProgressLabel("Fetching report data & styling...");

    try {
      await new Promise((r) => setTimeout(r, 600));
      setProgress(45);
      setProgressLabel("Rendering section vectors & charts...");

      const res = await fetch("/api/intelligence/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          sections: selectedSections,
          includeTOC,
          watermarkText: includeWatermark ? "CONFIDENTIAL" : "",
        }),
      });

      setProgress(85);
      setProgressLabel("Assembling branded PDF pages...");

      if (!res.ok) {
        throw new Error("Failed to generate PDF export");
      }

      const html = await res.text();
      setProgress(100);
      setProgressLabel("Export Complete!");

      await new Promise((r) => setTimeout(r, 400));

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
        <span>📄</span>
        <span>Export PDF</span>
      </button>

      {/* EXPORT OPTIONS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#0A1E3C]">Export Advisory Report</h3>
                <p className="text-xs text-slate-500">{auditTitle || "Nisol Intelligence PDF Center"}</p>
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
              <div className="py-8 space-y-4 text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-[#0A1E3C]">{progressLabel}</h4>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold">{progress}% Completed</span>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                {/* Section Checkboxes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-slate-900 font-bold">Select Sections to Include:</label>
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

                {/* Toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer font-normal">
                    <input
                      type="checkbox"
                      checked={includeTOC}
                      onChange={(e) => setIncludeTOC(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Include Table of Contents (TOC) Page</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-normal">
                    <input
                      type="checkbox"
                      checked={includeWatermark}
                      onChange={(e) => setIncludeWatermark(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Include "CONFIDENTIAL" Watermark Overlay</span>
                  </label>
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
                    disabled={selectedSections.length === 0}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>🚀</span>
                    <span>Generate Branded PDF</span>
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
