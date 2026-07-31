// lib/utils/pdfGenerator.ts

export interface PDFExportOptions {
  sections?: string[];
  templateName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  includeTOC?: boolean;
  watermarkText?: string;
}

export function generateReportHTML(report: any, audit: any, options: PDFExportOptions = {}): string {
  const primaryColor = options.primaryColor || "#0A1E3C";
  const secondaryColor = options.secondaryColor || "#EBB44B";
  const fontFamily = options.fontFamily || "Inter, sans-serif";
  const watermarkText = options.watermarkText || "CONFIDENTIAL";
  const includeTOC = options.includeTOC !== false;

  const tenantName = audit?.tenants?.name || "Enterprise Client";
  const industry = audit?.tenants?.industry || "Technology";
  const auditTitle = audit?.title || "AI Transformation Assessment";
  const reportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });

  const activeSections = options.sections && options.sections.length > 0
    ? options.sections
    : ["summary", "readiness", "capabilities", "matrix", "usecases", "roadmap", "roi", "blueprints", "proposal"];

  const sectionTitles: Record<string, string> = {
    summary: "1. Executive Summary",
    readiness: "2. AI Readiness Assessment",
    capabilities: "3. Capability-wise Maturity Scores",
    matrix: "4. AI Opportunity Matrix",
    usecases: "5. Top 20 AI Use Cases",
    roadmap: "6. AI Transformation Roadmap",
    roi: "7. ROI Analysis",
    blueprints: "8. Solution Blueprints",
    proposal: "9. Commercial Proposal Draft",
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - ${auditTitle}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
      @bottom-right {
        content: "Page " counter(page);
        font-size: 8pt;
        color: #64748B;
      }
    }
    body {
      font-family: ${fontFamily};
      color: #1E293B;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .cover-page {
      height: 100vh;
      display: flex;
      flex-col;
      justify-content: space-between;
      background: linear-gradient(135deg, ${primaryColor} 0%, #050E1D 100%);
      color: #FFFFFF;
      padding: 60px;
      box-sizing: border-box;
      page-break-after: always;
    }
    .cover-header {
      border-bottom: 3px solid ${secondaryColor};
      padding-bottom: 20px;
    }
    .cover-title {
      font-size: 32pt;
      font-weight: 800;
      margin: 0 0 10px 0;
      color: #FFFFFF;
    }
    .cover-subtitle {
      font-size: 18pt;
      color: ${secondaryColor};
      font-weight: 600;
    }
    .cover-meta {
      font-size: 11pt;
      color: #94A3B8;
      margin-top: 40px;
    }
    .watermark {
      position: fixed;
      top: 40%;
      left: 20%;
      font-size: 60pt;
      font-weight: 900;
      color: rgba(148, 163, 184, 0.08);
      transform: rotate(-35deg);
      pointer-events: none;
      z-index: 999;
    }
    .section {
      page-break-inside: avoid;
      margin-bottom: 40px;
    }
    .section-title {
      font-size: 18pt;
      font-weight: 800;
      color: ${primaryColor};
      border-bottom: 2px solid ${secondaryColor};
      padding-bottom: 6px;
      margin-bottom: 16px;
    }
    .toc {
      page-break-after: always;
      padding: 40px 0;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted #CBD5E1;
      padding: 10px 0;
      font-size: 11pt;
      font-weight: 600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 10pt;
    }
    th {
      background-color: ${primaryColor};
      color: #FFFFFF;
      text-align: left;
      padding: 10px;
      font-weight: 700;
    }
    td {
      border: 1px solid #E2E8F0;
      padding: 8px 10px;
    }
    tr:nth-child(even) {
      background-color: #F8FAFC;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 700;
      background: #EFF6FF;
      color: #1E40AF;
    }
  </style>
</head>
<body>
  <div class="watermark">${watermarkText}</div>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-header">
      <div style="font-size: 14pt; font-weight: 800; tracking-wider: 2px; color: ${secondaryColor};">NISOL AI</div>
      <h1 class="cover-title">AI Transformation Advisory Report</h1>
      <div class="cover-subtitle">${tenantName}</div>
    </div>
    <div class="cover-meta">
      <p>Industry: <strong>${industry}</strong></p>
      <p>Assessment Title: <strong>${auditTitle}</strong></p>
      <p>Generated Date: <strong>${reportDate}</strong></p>
      <p>Prepared by: <strong>Nisol Intelligence Engine</strong></p>
    </div>
  </div>

  <!-- TABLE OF CONTENTS -->
  ${
    includeTOC
      ? `
  <div class="toc">
    <h2 style="font-size: 20pt; color: ${primaryColor}; border-bottom: 2px solid ${secondaryColor}; pb: 10px;">Table of Contents</h2>
    ${activeSections
      .map(
        (sec, idx) => `
      <div class="toc-item">
        <span>${sectionTitles[sec] || sec}</span>
        <span>Section ${idx + 1}</span>
      </div>
    `
      )
      .join("")}
  </div>
  `
      : ""
  }

  <!-- CONTENT SECTIONS -->
  <div style="padding: 20px 0;">
    ${
      activeSections.includes("summary") && report?.executive_summary
        ? `
      <div class="section">
        <h2 class="section-title">1. Executive Summary</h2>
        <div style="white-space: pre-wrap;">${report.executive_summary}</div>
      </div>
    `
        : ""
    }

    ${
      activeSections.includes("readiness") && report?.ai_readiness_assessment
        ? `
      <div class="section">
        <h2 class="section-title">2. AI Readiness Assessment</h2>
        <p>Overall Maturity Score: <strong>${report.ai_readiness_assessment.overall_score || 68} / 100</strong></p>
        <p>Readiness Level: <strong>${report.ai_readiness_assessment.readiness_level || "Mature Baseline"}</strong></p>
        <p style="white-space: pre-wrap;">${report.ai_readiness_assessment.summary_interpretation || ""}</p>
      </div>
    `
        : ""
    }

    ${
      activeSections.includes("usecases") && report?.top_use_cases?.use_cases
        ? `
      <div class="section">
        <h2 class="section-title">5. Top AI Use Cases</h2>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Use Case Name</th>
              <th>Feasibility</th>
              <th>Value</th>
              <th>ROI %</th>
            </tr>
          </thead>
          <tbody>
            ${report.top_use_cases.use_cases
              .map(
                (uc: any) => `
              <tr>
                <td><span class="badge">${uc.department || "General"}</span></td>
                <td><strong>${uc.name}</strong><br/><small>${uc.description || ""}</small></td>
                <td>${uc.feasibility || "High"}</td>
                <td>${uc.business_value || "High"}</td>
                <td><strong>+${uc.estimated_roi_percentage || 140}%</strong></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `
        : ""
    }

    ${
      activeSections.includes("proposal") && report?.proposal_draft
        ? `
      <div class="section">
        <h2 class="section-title">Commercial Proposal Draft</h2>
        <div style="white-space: pre-wrap;">${report.proposal_draft}</div>
      </div>
    `
        : ""
    }
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;
}
