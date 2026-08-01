// lib/utils/pdfGenerator.ts

import {
  renderRadarChartSVG,
  renderHeatmapSVG,
  renderOpportunityMatrixSVG,
  renderExecutiveKPICardsHTML,
} from "@/lib/report/pdfComponentEngine";

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

  const tenantObj = audit?.tenants ? (Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants) : null;
  const tenantName = tenantObj?.name || report?.companyName || "Enterprise Client";
  const industry = tenantObj?.industry || report?.industry || "Technology & Operations";
  const auditTitle = audit?.title || "AI Transformation Strategy Assessment";
  const reportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });

  const kpiCards = report?.executiveDashboard?.kpiCards || [
    { label: "Overall AI Readiness", value: `${report?.ai_readiness_assessment?.overall_score || 68}%`, subtext: "Industry Benchmark: 62%", status: "positive" },
    { label: "High Priority Quick Wins", value: report?.opportunityPortfolio?.quickWinsCount || 4, subtext: "Immediate ROI", status: "positive" },
    { label: "Est. Annual Savings", value: report?.roiAnalysis?.totalEstimatedAnnualSavings || "₹4.8 Crore", subtext: "Across Departments", status: "positive" },
    { label: "Est. Payback Horizon", value: `${report?.roiAnalysis?.averagePaybackMonths || 8} Months`, subtext: "High Payback Speed", status: "positive" }
  ];

  const radarData = report?.chartPayloads?.radarChart || [
    { subject: "AI Governance", score: 62, fullMark: 100 },
    { subject: "Data Architecture", score: 58, fullMark: 100 },
    { subject: "Technology Stack", score: 74, fullMark: 100 },
    { subject: "Talent & Culture", score: 50, fullMark: 100 },
    { subject: "Process Automation", score: 68, fullMark: 100 },
    { subject: "Leadership Vision", score: 80, fullMark: 100 }
  ];

  const heatmapData = report?.chartPayloads?.heatmap || [
    { department: "Sales", dimension: "Automation", score: 75 },
    { department: "HR", dimension: "Automation", score: 45 },
    { department: "Finance", dimension: "Automation", score: 80 },
    { department: "Operations", dimension: "Automation", score: 60 }
  ];

  const useCases = report?.opportunityPortfolio?.useCases || report?.top_use_cases?.use_cases || [];

  const radarSVG = renderRadarChartSVG(radarData);
  const heatmapSVG = renderHeatmapSVG(heatmapData);
  const matrixSVG = renderOpportunityMatrixSVG(useCases);
  const kpiCardsHTML = renderExecutiveKPICardsHTML(kpiCards);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - Nisol AI Transformation Strategy</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
    
    @page {
      size: A4;
      margin: 15mm;
      @bottom-right {
        content: "Page " counter(page);
        font-size: 8pt;
        color: #64748B;
      }
    }
    body {
      font-family: ${fontFamily};
      color: #0F172A;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #FFFFFF;
      -webkit-print-color-adjust: exact;
    }
    .cover-page {
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, ${primaryColor} 0%, #030712 100%);
      color: #FFFFFF;
      padding: 50px;
      border-radius: 16px;
      box-sizing: border-box;
      page-break-after: always;
    }
    .cover-header {
      border-bottom: 3px solid ${secondaryColor};
      padding-bottom: 24px;
    }
    .cover-brand {
      font-size: 16pt;
      font-weight: 900;
      letter-spacing: 2px;
      color: ${secondaryColor};
      margin-bottom: 12px;
    }
    .cover-title {
      font-size: 34pt;
      font-weight: 900;
      line-height: 1.1;
      margin: 0 0 12px 0;
      color: #FFFFFF;
    }
    .cover-subtitle {
      font-size: 20pt;
      color: #E2E8F0;
      font-weight: 600;
    }
    .cover-meta {
      font-size: 11pt;
      color: #94A3B8;
      background: rgba(255, 255, 255, 0.05);
      padding: 24px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .watermark {
      position: fixed;
      top: 40%;
      left: 15%;
      font-size: 65pt;
      font-weight: 900;
      color: rgba(148, 163, 184, 0.06);
      transform: rotate(-35deg);
      pointer-events: none;
      z-index: 999;
    }
    .section {
      page-break-inside: avoid;
      margin-bottom: 36px;
    }
    .section-title {
      font-size: 18pt;
      font-weight: 800;
      color: ${primaryColor};
      border-bottom: 2px solid ${secondaryColor};
      padding-bottom: 8px;
      margin-bottom: 20px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .card-title {
      font-size: 11pt;
      font-weight: 800;
      color: ${primaryColor};
      margin-bottom: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 9.5pt;
    }
    th {
      background-color: ${primaryColor};
      color: #FFFFFF;
      text-align: left;
      padding: 10px;
      font-weight: 700;
      border-radius: 4px 4px 0 0;
    }
    td {
      border-bottom: 1px solid #E2E8F0;
      padding: 10px;
    }
    tr:nth-child(even) {
      background-color: #F8FAFC;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 8pt;
      font-weight: 800;
      background: #E0F2FE;
      color: #0369A1;
    }
    .badge-quickwin {
      background: #D1FAE5;
      color: #065F46;
    }
    .badge-strategic {
      background: #DBEAFE;
      color: #1E40AF;
    }
  </style>
</head>
<body>
  <div class="watermark">${watermarkText}</div>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-header">
      <div class="cover-brand">NISOL AI ADVISORY</div>
      <h1 class="cover-title">AI Transformation Strategy & Execution Blueprint</h1>
      <div class="cover-subtitle">${tenantName}</div>
    </div>
    <div class="cover-meta">
      <p style="margin:4px 0;">Industry Domain: <strong style="color:#FFF">${industry}</strong></p>
      <p style="margin:4px 0;">Assessment Track: <strong style="color:#FFF">${auditTitle}</strong></p>
      <p style="margin:4px 0;">Date of Delivery: <strong style="color:#FFF">${reportDate}</strong></p>
      <p style="margin:4px 0;">Prepared By: <strong style="color:${secondaryColor}">Nisol AI Transformation Engine</strong></p>
    </div>
  </div>

  <!-- EXECUTIVE DASHBOARD PAGE -->
  <div class="section" style="page-break-after: always;">
    <h2 class="section-title">Executive Scorecard & KPI Dashboard</h2>
    ${kpiCardsHTML}

    <div class="grid-2">
      <div>${radarSVG}</div>
      <div>${heatmapSVG}</div>
    </div>
  </div>

  <!-- OPPORTUNITY MATRIX & PORTFOLIO -->
  <div class="section" style="page-break-after: always;">
    <h2 class="section-title">AI Opportunity Portfolio & Matrix</h2>
    <div style="margin-bottom: 20px;">${matrixSVG}</div>

    <h3 style="font-size: 14pt; color:${primaryColor}; margin-top: 24px;">Prioritized AI Use Case Catalog</h3>
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Use Case Initiative</th>
          <th>Category</th>
          <th>Est. ROI</th>
          <th>Timeline</th>
        </tr>
      </thead>
      <tbody>
        ${useCases
          .map(
            (uc: any) => `
          <tr>
            <td><span class="badge">${uc.department || "Enterprise"}</span></td>
            <td><strong>${uc.name}</strong><br/><small style="color:#64748B;">${uc.businessProblem || uc.description || ""}</small></td>
            <td><span class="badge ${uc.category === 'Quick Win' ? 'badge-quickwin' : 'badge-strategic'}">${uc.category || "Quick Win"}</span></td>
            <td><strong style="color:#10B981;">+${uc.estimatedRoiPercentage || uc.estimated_roi_percentage || 250}%</strong></td>
            <td>${uc.estimatedTimelineWeeks || 6} Weeks</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- EXECUTIVE NARRATIVE SUMMARY -->
  ${
    report?.executiveSummary || report?.executive_summary
      ? `
    <div class="section">
      <h2 class="section-title">Executive Summary & Strategic Diagnosis</h2>
      <div style="background:#F8FAFC; border-left: 4px solid ${secondaryColor}; padding: 20px; border-radius: 8px; font-size: 10.5pt; white-space: pre-wrap;">${
        report.executiveSummary || report.executive_summary
      }</div>
    </div>
  `
      : ""
  }

  <!-- COMMERCIAL PROPOSAL DRAFT -->
  ${
    report?.proposalDraft || report?.proposal_draft
      ? `
    <div class="section">
      <h2 class="section-title">Transformation Engagement Proposal</h2>
      <div style="background:#F8FAFC; border: 1px solid #E2E8F0; padding: 20px; border-radius: 12px; font-size: 10pt; white-space: pre-wrap;">${
        report.proposalDraft || report.proposal_draft
      }</div>
    </div>
  `
      : ""
  }

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;
}
