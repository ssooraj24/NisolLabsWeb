"use client";

import React, { useState } from "react";

interface ExportButtonsProps {
  proposalText: string;
  companyName?: string;
  onExportPDF?: () => void;
}

export function ExportButtons({ proposalText, companyName = "Proposal", onExportPDF }: ExportButtonsProps) {
  const [downloading, setDownloading] = useState(false);

  const handleExportPDF = () => {
    if (onExportPDF) onExportPDF();
    else window.print();
  };

  const handleExportWord = () => {
    setDownloading(true);
    try {
      // Build Word-compatible HTML document blob
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${companyName} - AI Transformation Proposal</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #1E293B; margin: 40px; }
            h1 { color: #0A1E3C; font-size: 22pt; font-weight: bold; border-bottom: 2px solid #EBB44B; padding-bottom: 8px; }
            h2 { color: #0A1E3C; font-size: 16pt; font-weight: bold; margin-top: 24px; }
            h3 { color: #2563EB; font-size: 13pt; font-weight: bold; }
            p { margin-bottom: 12px; }
            ul { margin-bottom: 12px; }
            .header-banner { background-color: #0A1E3C; color: #FFFFFF; padding: 20px; text-align: center; }
            .footer { font-size: 9pt; color: #64748B; border-top: 1px solid #CBD5E1; padding-top: 10px; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h1 style="color: #FFFFFF; border: none;">NISOL LABS</h1>
            <p style="color: #EBB44B; font-weight: bold; margin: 0;">AI Transformation Intelligence & Commercial Proposal</p>
          </div>

          <div style="margin-top: 30px;">
            ${proposalText
              .split("\n\n")
              .map((para) => {
                if (para.startsWith("# ")) return `<h1>${para.replace("# ", "")}</h1>`;
                if (para.startsWith("## ")) return `<h2>${para.replace("## ", "")}</h2>`;
                if (para.startsWith("### ")) return `<h3>${para.replace("### ", "")}</h3>`;
                return `<p>${para.replace(/\n/g, "<br/>")}</p>`;
              })
              .join("")}
          </div>

          <div class="footer">
            <p>Confidential • Prepared exclusively for ${companyName} by Nisol Labs Product Team.</p>
          </div>
        </body>
        </html>
      `;

      const blob = new Blob(["\ufeff", htmlContent], {
        type: "application/msword;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${companyName.replace(/[^a-z0-9]/gi, "_")}_AI_Proposal.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export Word document:", err);
      alert("Failed to generate Word document");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExportPDF}
        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
      >
        <span>📄</span>
        <span>Export PDF</span>
      </button>

      <button
        onClick={handleExportWord}
        disabled={downloading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
      >
        <span>📝</span>
        <span>{downloading ? "Generating..." : "Export as Word (.docx)"}</span>
      </button>
    </div>
  );
}
