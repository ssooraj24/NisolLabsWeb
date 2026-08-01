// lib/utils/pdfGenerator.ts

import {
  renderRadarChartSVG,
  renderHeatmapSVG,
  renderOpportunityMatrixSVG,
  renderExecutiveKPICardsHTML,
  renderMaturityComparisonSVG,
  render5YearROIBarChartSVG,
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
  const auditTitle = audit?.title || "Enterprise AI Transformation Strategy";
  const reportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const docId = `${tenantName.replace(/[^a-zA-Z0-9]/g, "-")}-AI-Transformation-2026-01`;

  // Helper to check section selection
  const isSelected = (secId: string) => {
    if (!options.sections || options.sections.length === 0) return true;
    return options.sections.includes(secId);
  };

  // Default KPI Cards
  const kpiCards = report?.executiveDashboard?.kpiCards || [
    { label: "Overall AI Readiness", value: `${report?.ai_readiness_assessment?.overall_score || 42}/100`, subtext: "Industry Benchmark: 62/100", status: "warning" },
    { label: "Critical Vulnerabilities", value: "3 Gaps", subtext: "Governance, Data & RAG", status: "warning" },
    { label: "5-Year Net Benefit", value: report?.roiAnalysis?.total5YearNetBenefit || "$2,450,000", subtext: "Across Operations", status: "positive" },
    { label: "Estimated ROI", value: `${report?.roiAnalysis?.overallRoiPercentage || 285}%`, subtext: "Payback: 7.2 Months", status: "positive" }
  ];

  // Default Radar Data
  const radarData = report?.chartPayloads?.radarChart || [
    { subject: "Leadership & Strategy", score: 20, fullMark: 100 },
    { subject: "Data & Analytics", score: 24, fullMark: 100 },
    { subject: "Knowledge & RAG", score: 26, fullMark: 100 },
    { subject: "Legal & Compliance", score: 26, fullMark: 100 },
    { subject: "IT / Infrastructure", score: 40, fullMark: 100 },
    { subject: "Operations & Supply", score: 46, fullMark: 100 },
    { subject: "Customer Experience", score: 36, fullMark: 100 },
    { subject: "Sales & Pipeline", score: 40, fullMark: 100 }
  ];

  // Default Heatmap Data
  const heatmapData = report?.chartPayloads?.heatmap || [
    { department: "Leadership", dimension: "Strategy", score: 20 },
    { department: "Data & BI", dimension: "Hygiene", score: 24 },
    { department: "Knowledge", dimension: "Centralization", score: 26 },
    { department: "Engineering", dimension: "Automation", score: 40 },
    { department: "Sales", dimension: "Pipeline AI", score: 40 },
    { department: "Customer Desk", dimension: "RAG Containment", score: 36 }
  ];

  // Default Use Cases (Top 20 format)
  const rawUseCases = report?.opportunityPortfolio?.useCases || report?.top_use_cases?.use_cases || [];
  const useCases = rawUseCases.length > 0 ? rawUseCases : [
    { id: "1", name: "AI-Driven Automated QA Test Generation", department: "Engineering", category: "Quick Win", estimatedRoiPercentage: 190, estimatedTimelineWeeks: 4, implementationEffortScore: 25, businessValueScore: 85, businessProblem: "Manual QA regression cycles delay bi-weekly deployments and increase developer bench costs." },
    { id: "2", name: "Automated AI Code Review & Vulnerability Audit", department: "Engineering", category: "Quick Win", estimatedRoiPercentage: 180, estimatedTimelineWeeks: 4, implementationEffortScore: 20, businessValueScore: 80, businessProblem: "PR reviews take 3-5 days; security vulnerabilities caught late in release cycle." },
    { id: "3", name: "Predictive Lead Scoring & Pipeline Optimization", department: "Sales", category: "Quick Win", estimatedRoiPercentage: 175, estimatedTimelineWeeks: 6, implementationEffortScore: 35, businessValueScore: 88, businessProblem: "Unqualified leads flood sales reps; conversion rate trails industry peers." },
    { id: "4", name: "Intelligent Document & Invoice Processing", department: "Finance", category: "Quick Win", estimatedRoiPercentage: 160, estimatedTimelineWeeks: 6, implementationEffortScore: 30, businessValueScore: 78, businessProblem: "Manual invoice reconciliation delays monthly financial close by 10 days." },
    { id: "5", name: "RAG-Powered Customer Support Desk Assistant", department: "Customer Service", category: "Quick Win", estimatedRoiPercentage: 145, estimatedTimelineWeeks: 8, implementationEffortScore: 40, businessValueScore: 82, businessProblem: "Support reps manually search fragmented documentation across Slack and Drive." },
    { id: "6", name: "AI Contract Lifecycle & Regulatory Audit", department: "Legal", category: "Strategic Bet", estimatedRoiPercentage: 140, estimatedTimelineWeeks: 12, implementationEffortScore: 60, businessValueScore: 86, businessProblem: "Non-standard client contracts require hours of senior legal counsel review." },
    { id: "7", name: "Enterprise Knowledge Graph & Semantic Search", department: "IT / Data", category: "Strategic Bet", estimatedRoiPercentage: 130, estimatedTimelineWeeks: 14, implementationEffortScore: 70, businessValueScore: 90, businessProblem: "Institutional memory stored in senior heads; siloed databases limit cross-team search." },
    { id: "8", name: "Autonomous Infrastructure Self-Healing Ops", department: "IT Ops", category: "Strategic Bet", estimatedRoiPercentage: 165, estimatedTimelineWeeks: 16, implementationEffortScore: 75, businessValueScore: 92, businessProblem: "Server downtime and incident response rely on manual level-2 triage." }
  ];

  // SVG Renders
  const radarSVG = renderRadarChartSVG(radarData);
  const heatmapSVG = renderHeatmapSVG(heatmapData);
  const matrixSVG = renderOpportunityMatrixSVG(useCases);
  const kpiCardsHTML = renderExecutiveKPICardsHTML(kpiCards);
  const comparisonSVG = renderMaturityComparisonSVG({ clientScore: 42, industryAvg: 62, topQuartile: 85 });
  const roiChartSVG = render5YearROIBarChartSVG();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - Enterprise AI Transformation Engagement</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    @page {
      size: A4;
      margin: 14mm 16mm;
      @bottom-right {
        content: "Page " counter(page);
        font-size: 8pt;
        color: #64748B;
        font-family: ${fontFamily};
      }
      @bottom-left {
        content: "Nisol AI — Commercial-in-Confidence";
        font-size: 8pt;
        color: #64748B;
        font-family: ${fontFamily};
      }
    }

    body {
      font-family: ${fontFamily};
      color: #0F172A;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      background-color: #FFFFFF;
      -webkit-print-color-adjust: exact;
    }

    /* COVER PAGE */
    .cover-page {
      height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, ${primaryColor} 0%, #030712 100%);
      color: #FFFFFF;
      padding: 44px;
      border-radius: 16px;
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }

    .cover-brand-box {
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.04);
      padding: 16px 24px;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 24px;
    }

    .cover-brand {
      font-size: 20pt;
      font-weight: 900;
      letter-spacing: 4px;
      color: ${secondaryColor};
    }

    .cover-tagline {
      font-size: 10pt;
      color: #94A3B8;
      letter-spacing: 1px;
      margin-top: 4px;
    }

    .cover-main-title {
      font-size: 32pt;
      font-weight: 900;
      line-height: 1.15;
      margin: 16px 0;
      color: #FFFFFF;
      letter-spacing: -0.5px;
    }

    .cover-divider {
      height: 3px;
      background: linear-gradient(90deg, ${secondaryColor} 0%, rgba(235, 180, 75, 0) 100%);
      margin: 20px 0;
    }

    .cover-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      font-size: 10pt;
      color: #CBD5E1;
      background: rgba(255, 255, 255, 0.05);
      padding: 24px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .cover-meta-item label {
      display: block;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${secondaryColor};
      margin-bottom: 4px;
    }

    .cover-meta-item span {
      font-size: 11pt;
      font-weight: 700;
      color: #FFFFFF;
    }

    /* WATERMARK */
    .watermark {
      position: fixed;
      top: 42%;
      left: 10%;
      font-size: 60pt;
      font-weight: 900;
      color: rgba(148, 163, 184, 0.05);
      transform: rotate(-30deg);
      pointer-events: none;
      z-index: 9999;
      letter-spacing: 6px;
    }

    /* TOC PAGE */
    .toc-page {
      page-break-after: always;
      padding: 10px 0;
    }

    .toc-header {
      font-size: 20pt;
      font-weight: 900;
      color: ${primaryColor};
      border-bottom: 3px solid ${secondaryColor};
      padding-bottom: 8px;
      margin-bottom: 24px;
      letter-spacing: -0.5px;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 10px 0;
      border-bottom: 1px dashed #E2E8F0;
      font-size: 10.5pt;
    }

    .toc-title {
      font-weight: 700;
      color: #0F172A;
    }

    .toc-sub {
      font-size: 9pt;
      color: #64748B;
      margin-left: 20px;
    }

    .toc-page-num {
      font-weight: 800;
      color: ${primaryColor};
      font-mono: true;
    }

    /* SECTIONS */
    .section {
      page-break-inside: avoid;
      margin-bottom: 36px;
    }

    .section-break {
      page-break-after: always;
    }

    .section-title {
      font-size: 16pt;
      font-weight: 900;
      color: ${primaryColor};
      border-bottom: 2px solid ${secondaryColor};
      padding-bottom: 8px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-subtitle {
      font-size: 12pt;
      font-weight: 800;
      color: #334155;
      margin: 18px 0 10px 0;
    }

    /* CARDS & CONTAINERS */
    .card-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 16px;
    }

    .sidebar-card {
      background: linear-gradient(135deg, #0A1E3C 0%, #1E293B 100%);
      color: #FFFFFF;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(10, 30, 60, 0.1);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    /* TABLES */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 9pt;
    }

    th {
      background-color: ${primaryColor};
      color: #FFFFFF;
      text-align: left;
      padding: 10px 12px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8pt;
      letter-spacing: 0.5px;
    }

    td {
      border-bottom: 1px solid #E2E8F0;
      padding: 10px 12px;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background-color: #F8FAFC;
    }

    /* BADGES */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 8pt;
      font-weight: 800;
      background: #E0F2FE;
      color: #0369A1;
    }

    .badge-p1 {
      background: #FEE2E2;
      color: #991B1B;
    }

    .badge-p2 {
      background: #FEF3C7;
      color: #92400E;
    }

    .badge-quickwin {
      background: #D1FAE5;
      color: #065F46;
    }

    .badge-strategic {
      background: #DBEAFE;
      color: #1E40AF;
    }

    /* SIGNATURE BLOCK */
    .sig-box {
      border: 1px solid #CBD5E1;
      border-radius: 10px;
      padding: 16px;
      background: #FAFAFA;
      margin-top: 12px;
    }

    .sig-line {
      border-bottom: 1px stroke #94A3B8;
      height: 40px;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  ${watermarkText ? `<div class="watermark">${watermarkText}</div>` : ""}

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div>
      <div class="cover-brand-box">
        <div class="cover-brand">N I S O L   A I</div>
        <div class="cover-tagline">AI Transformation, Delivered.</div>
      </div>
      <div class="cover-divider"></div>
      <h1 class="cover-main-title">ENTERPRISE AI TRANSFORMATION ENGAGEMENT</h1>
      <p style="font-size: 14pt; color: #E2E8F0; margin-top: 0;">Board-Ready AI Strategy, Capability Assessment & Roadmap</p>
    </div>

    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <label>Prepared For</label>
        <span>${tenantName}</span>
      </div>
      <div class="cover-meta-item">
        <label>Prepared By</label>
        <span>Nisol AI Advisory</span>
      </div>
      <div class="cover-meta-item">
        <label>Date of Issue</label>
        <span>${reportDate}</span>
      </div>
      <div class="cover-meta-item">
        <label>Classification</label>
        <span>Commercial-in-Confidence</span>
      </div>
      <div class="cover-meta-item">
        <label>Version</label>
        <span>1.0 Final</span>
      </div>
      <div class="cover-meta-item">
        <label>Document ID</label>
        <span>${docId}</span>
      </div>
    </div>
  </div>

  ${
    includeTOC
      ? `
  <!-- TABLE OF CONTENTS PAGE -->
  <div class="toc-page">
    <div class="toc-header">TABLE OF CONTENTS</div>
    
    <div class="toc-item">
      <div>
        <div class="toc-title">1. Executive Summary & Value Proposition</div>
        <div class="toc-sub">1.1 Engagement Overview | 1.2 Key Drivers | 1.3 Business Impact | 1.4 Executive Sidebar</div>
      </div>
      <div class="toc-page-num">1</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">2. AI Readiness Assessment</div>
        <div class="toc-sub">2.1 Maturity Score | 2.2 Capability Radar | 2.3 Heatmap | 2.4 Vulnerabilities Matrix</div>
      </div>
      <div class="toc-page-num">2</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">3. AI Opportunity Matrix</div>
        <div class="toc-sub">3.1 Matrix Visualization | 3.2 Top 20 Use Cases | 3.3 Quick Wins vs Strategic Bets</div>
      </div>
      <div class="toc-page-num">3</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">4. AI Transformation Roadmap</div>
        <div class="toc-sub">4.1 Phased Implementation Plan | 4.2 Success Metrics & KPIs | 4.3 Dependencies</div>
      </div>
      <div class="toc-page-num">4</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">5. ROI Analysis</div>
        <div class="toc-sub">5.1 Financial Summary | 5.2 Department Breakdown | 5.3 5-Year Projection | 5.4 Methodology</div>
      </div>
      <div class="toc-page-num">5</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">6. Solution Blueprints</div>
        <div class="toc-sub">Architectural Blueprints for High-Impact Priority AI Initiatives</div>
      </div>
      <div class="toc-page-num">6</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">7. Commercial Proposal</div>
        <div class="toc-sub">7.1 Engagement Scope | 7.2 Commercial Model | 7.3 Payment Terms | 7.4 Assumptions</div>
      </div>
      <div class="toc-page-num">7</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">8. Next Steps & Action Plan</div>
        <div class="toc-sub">Kickoff Logistics & Proposal Acceptance Terms</div>
      </div>
      <div class="toc-page-num">8</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">9. Terms & Conditions</div>
        <div class="toc-sub">Intellectual Property, Confidentiality & Scope Change Framework</div>
      </div>
      <div class="toc-page-num">9</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">10. Acceptance & Sign-off</div>
        <div class="toc-sub">Executive Acceptance Signatures</div>
      </div>
      <div class="toc-page-num">10</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">Appendix: Data Sources</div>
        <div class="toc-sub">Discovery Data, Benchmark Data, & Audit Methodology</div>
      </div>
      <div class="toc-page-num">App.</div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 1: EXECUTIVE SUMMARY & VALUE PROPOSITION -->
  ${
    isSelected("summary")
      ? `
  <div class="section section-break">
    <div class="section-title">1. Executive Summary & Value Proposition</div>
    
    <div class="card-box">
      <div style="font-size: 11pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">1.1 Engagement Overview</div>
      <p style="margin: 0; font-size: 9.5pt; color: #334155;">
        <strong>${tenantName}</strong> is a leading <strong>${industry}</strong> enterprise poised for its next acceleration cycle. However, current operations rely heavily on manual verification, legacy code maintenance, and fragmented data silos. Nisol AI proposes a multi-phase Enterprise AI Transformation designed to modernize core operations, automate developer QA, elevate customer support, and compress sales cycles.
      </p>
    </div>

    <div class="section-subtitle">1.2 Key Value Drivers</div>
    <div class="grid-2" style="margin-bottom: 20px;">
      <div class="card-box" style="margin-bottom: 0;">
        <strong style="color:${primaryColor}">📊 Engineering & Delivery Acceleration</strong>
        <p style="font-size: 8.5pt; color: #475569; margin: 4px 0 0 0;">Accelerate SDLC with automated QA test generation and AI code reviews, eliminating manual regression bottlenecks.</p>
      </div>
      <div class="card-box" style="margin-bottom: 0;">
        <strong style="color:${primaryColor}">📈 Operational & Financial Optimization</strong>
        <p style="font-size: 8.5pt; color: #475569; margin: 4px 0 0 0;">Eliminate data re-entry across CRM and ERP systems, compressing monthly financial close cycles from 10 days to 4 days.</p>
      </div>
      <div class="card-box" style="margin-bottom: 0;">
        <strong style="color:${primaryColor}">🤝 CX & Support Modernization</strong>
        <p style="font-size: 8.5pt; color: #475569; margin: 4px 0 0 0;">Deploy RAG-powered omnichannel support assistants to automate up to 40% of Tier-1 support tickets instantly.</p>
      </div>
      <div class="card-box" style="margin-bottom: 0;">
        <strong style="color:${primaryColor}">⚡ Sales Cycle Compression</strong>
        <p style="font-size: 8.5pt; color: #475569; margin: 4px 0 0 0;">Shrink proposal turnaround times from days to minutes using RAG generators while boosting lead win rates by 22%.</p>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div class="section-subtitle">1.3 Expected Business Impact</div>
        ${kpiCardsHTML}
      </div>

      <div class="sidebar-card">
        <div style="font-size: 11pt; font-weight: 800; color: ${secondaryColor}; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); pb-2;">
          1.4 EXECUTIVE SUMMARY SIDEBAR — AT A GLANCE
        </div>
        <div style="font-size: 9pt; space-y-2;">
          <p style="margin: 4px 0;"><strong>📊 AI Maturity Score:</strong> 42/100 (Benchmark: 62/100, Gap: 20 pts)</p>
          <p style="margin: 4px 0;"><strong>🚨 Critical Vulnerabilities:</strong> AI Governance, Data Silos, Tribal Knowledge</p>
          <p style="margin: 4px 0;"><strong>🔥 Top Priority:</strong> Automated QA & Code Review AI</p>
          <p style="margin: 4px 0;"><strong>💰 Est. Investment:</strong> $120,000</p>
          <p style="margin: 4px 0;"><strong>📈 5-Year Net Benefit:</strong> $2,450,000</p>
          <p style="margin: 4px 0;"><strong>🚀 Projected ROI:</strong> 285% (Payback: 7.2 months)</p>
        </div>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 2: AI READINESS ASSESSMENT -->
  ${
    isSelected("readiness")
      ? `
  <div class="section section-break">
    <div class="section-title">2. AI Readiness Assessment</div>
    
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.1 Overall Maturity Score & Benchmark Comparison</div>
      <div>${comparisonSVG}</div>
    </div>

    <div class="grid-2" style="margin-bottom: 20px;">
      <div>
        <div class="section-subtitle">2.2 AI Readiness Radar</div>
        ${radarSVG}
      </div>
      <div>
        <div class="section-subtitle">2.3 Capability Heatmap Summary</div>
        ${heatmapSVG}
      </div>
    </div>

    <div class="section-subtitle">2.4 Critical Vulnerabilities Matrix</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Vulnerability & Description</th>
          <th>Impact</th>
          <th>Urgency</th>
          <th>Recommended Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1</strong></td>
          <td><strong>AI Governance & IP Exposure</strong><br/><small style="color:#64748B;">No formal AI ethics policy; public AI tools used on proprietary code.</small></td>
          <td><span class="badge badge-p1">High (1.0)</span></td>
          <td><span class="badge badge-p1">High</span></td>
          <td>Implement Enterprise AI Governance & Policy within 30 days.</td>
        </tr>
        <tr>
          <td><strong>2</strong></td>
          <td><strong>Data Fragmentation & Silos</strong><br/><small style="color:#64748B;">Data split across PostgreSQL, MySQL, Excel, and local drives.</small></td>
          <td><span class="badge badge-p1">High (1.2)</span></td>
          <td><span class="badge badge-p1">High</span></td>
          <td>Deploy Master Data Management & Unified Data Warehouse.</td>
        </tr>
        <tr>
          <td><strong>3</strong></td>
          <td><strong>Tribal Knowledge & Documentation Gaps</strong><br/><small style="color:#64748B;">SOPs trapped in senior heads; docs scattered in Slack/Drive.</small></td>
          <td><span class="badge badge-p1">High (1.3)</span></td>
          <td><span class="badge badge-p1">High</span></td>
          <td>Build Centralized Vector RAG Knowledge Engine.</td>
        </tr>
        <tr>
          <td><strong>4</strong></td>
          <td><strong>Manual QA & Slow Release Cycles</strong><br/><small style="color:#64748B;">Bi-weekly deployments bottlenecked by manual regression testing.</small></td>
          <td><span class="badge badge-p2">Medium (2.0)</span></td>
          <td><span class="badge badge-p2">Medium</span></td>
          <td>Integrate AI-driven QA automation into CI/CD pipelines.</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
      : ""
  }

  <!-- SECTION 3: AI OPPORTUNITY MATRIX -->
  ${
    isSelected("matrix")
      ? `
  <div class="section section-break">
    <div class="section-title">3. AI Opportunity Matrix</div>
    
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">3.1 Opportunity Matrix Visualization (Impact vs. Effort)</div>
      ${matrixSVG}
    </div>

    <div class="section-subtitle">3.2 Prioritized Top AI Use Cases Catalog</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Use Case Initiative</th>
          <th>Department</th>
          <th>Category</th>
          <th>Est. ROI</th>
          <th>Timeline</th>
        </tr>
      </thead>
      <tbody>
        ${useCases
          .map(
            (uc: any, idx: number) => `
          <tr>
            <td><strong>${idx + 1}</strong></td>
            <td>
              <strong>${uc.name}</strong><br/>
              <small style="color:#64748B;">${uc.businessProblem || ""}</small>
            </td>
            <td><span class="badge">${uc.department || "Enterprise"}</span></td>
            <td><span class="badge ${uc.category === 'Quick Win' ? 'badge-quickwin' : 'badge-strategic'}">${uc.category || "Quick Win"}</span></td>
            <td><strong style="color:#10B981;">+${uc.estimatedRoiPercentage || 180}%</strong></td>
            <td>${uc.estimatedTimelineWeeks || 6} Weeks</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>

    <div class="section-subtitle">3.3 Quick Wins vs. Strategic Bets Rationale</div>
    <div class="grid-2">
      <div class="card-box" style="border-left: 4px solid #10B981;">
        <strong style="color:#047857;">⚡ QUICK WINS — Deploy in 0-3 Months</strong>
        <p style="font-size: 8.5pt; color: #334155; margin-top: 6px;">
          High business impact with minimal integration effort. Immediate reduction in manual labor costs (e.g. QA Automation, AI Code Review, Automated Report Generation).
        </p>
      </div>
      <div class="card-box" style="border-left: 4px solid #3B82F6;">
        <strong style="color:#1D4ED8;">🚀 STRATEGIC BETS — Plan for 6-12 Months</strong>
        <p style="font-size: 8.5pt; color: #334155; margin-top: 6px;">
          High business impact requiring foundational data engineering (e.g. Enterprise Knowledge Graph, Self-Healing Infrastructure Ops, CLM Review).
        </p>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 4: AI TRANSFORMATION ROADMAP -->
  ${
    isSelected("roadmap")
      ? `
  <div class="section section-break">
    <div class="section-title">4. AI Transformation Roadmap</div>
    
    <div class="section-subtitle">4.1 Phased Implementation Plan</div>
    
    <div class="card-box">
      <div style="font-size: 10.5pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        🚩 Phase 1: 30 DAYS — Foundation & Governance
      </div>
      <ul style="font-size: 8.5pt; color: #334155; margin: 0; padding-left: 18px;">
        <li>✅ Establish Enterprise AI Ethics & Security Policy.</li>
        <li>✅ Provision secure, enterprise-grade LLM instances with Zero-Data-Retention guarantees.</li>
        <li>✅ Complete inventory of key databases and data readiness scoring.</li>
      </ul>
      <div style="margin-top: 8px; font-size: 8pt; font-weight: 700; color: #047857;">🎯 Target: Approved AI Policy & Provisioned Enterprise Environment</div>
    </div>

    <div class="card-box">
      <div style="font-size: 10.5pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        🚀 Phase 2: 90 DAYS — Quick Wins Implementation
      </div>
      <ul style="font-size: 8.5pt; color: #334155; margin: 0; padding-left: 18px;">
        <li>✅ Deploy AI-driven automated QA test generation for core engineering products.</li>
        <li>✅ Integrate automated LLM code review into developer CI/CD pipelines.</li>
        <li>✅ Automate recurring PMO and operational status reporting.</li>
      </ul>
      <div style="margin-top: 8px; font-size: 8pt; font-weight: 700; color: #047857;">🎯 Target: 30% reduction in manual QA testing hours & 50% faster report prep</div>
    </div>

    <div class="card-box">
      <div style="font-size: 10.5pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        🌐 Phase 3: 180 DAYS — Scale & System Integration
      </div>
      <ul style="font-size: 8.5pt; color: #334155; margin: 0; padding-left: 18px;">
        <li>✅ Unify internal SOPs and Slack/Drive docs into Vector RAG search engine.</li>
        <li>✅ Deploy predictive ML lead scoring into CRM for sales pipeline optimization.</li>
        <li>✅ Implement RAG-based automated proposal generator for sales reps.</li>
      </ul>
      <div style="margin-top: 8px; font-size: 8pt; font-weight: 700; color: #047857;">🎯 Target: 50% faster proposal turnaround & +22% lead conversion rate</div>
    </div>

    <div class="card-box">
      <div style="font-size: 10.5pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        ⚡ Phase 4: 365 DAYS — Enterprise Automation & Continuous Optimization
      </div>
      <ul style="font-size: 8.5pt; color: #334155; margin: 0; padding-left: 18px;">
        <li>✅ Deploy self-healing infrastructure monitoring for critical servers.</li>
        <li>✅ Build unified operational and financial dashboard.</li>
        <li>✅ Formally launch internal AI Center of Excellence (CoE) with quarterly review cadence.</li>
      </ul>
      <div style="margin-top: 8px; font-size: 8pt; font-weight: 700; color: #047857;">🎯 Target: 85%+ delivery predictability & 4-day financial close cycle</div>
    </div>

    <div class="section-subtitle">4.2 Success Metrics & Key Dependencies</div>
    <div class="grid-2">
      <div>
        <table style="margin:0;">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Key Performance Indicator</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30 Days</td>
              <td>AI Policy Sign-off</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>90 Days</td>
              <td>Manual QA Hours Saved</td>
              <td>30%</td>
            </tr>
            <tr>
              <td>180 Days</td>
              <td>Proposal Lead Time</td>
              <td>-50%</td>
            </tr>
            <tr>
              <td>365 Days</td>
              <td>Financial Close Cycle</td>
              <td>4 Days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <table style="margin:0;">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Dependency</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30 Days</td>
              <td>Executive Sponsorship</td>
              <td>CEO / CTO</td>
            </tr>
            <tr>
              <td>90 Days</td>
              <td>CI/CD Pipeline Access</td>
              <td>VP Eng</td>
            </tr>
            <tr>
              <td>180 Days</td>
              <td>CRM Data Integration</td>
              <td>VP Sales</td>
            </tr>
            <tr>
              <td>365 Days</td>
              <td>Change Mgmt Training</td>
              <td>HR Lead</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 5: ROI ANALYSIS -->
  ${
    isSelected("roi")
      ? `
  <div class="section section-break">
    <div class="section-title">5. ROI Analysis & Financial Projection</div>
    
    <div class="section-subtitle">5.1 Financial Summary & 5-Year Cumulative Benefit</div>
    <div style="margin-bottom: 20px;">
      ${roiChartSVG}
    </div>

    <div class="section-subtitle">5.2 Department Breakdown Table</div>
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Estimated Investment</th>
          <th>Annual Cost Savings</th>
          <th>ROI %</th>
          <th>Key Value Driver</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Customer Support</strong></td>
          <td>$25,000</td>
          <td>$110,000</td>
          <td><strong style="color:#10B981;">340%</strong></td>
          <td>40% ticket containment via RAG chatbot</td>
        </tr>
        <tr>
          <td><strong>Engineering</strong></td>
          <td>$45,000</td>
          <td>$180,000</td>
          <td><strong style="color:#10B981;">300%</strong></td>
          <td>15-20 hrs/week saved per dev via AI QA</td>
        </tr>
        <tr>
          <td><strong>Sales & Pipeline</strong></td>
          <td>$20,000</td>
          <td>$95,000</td>
          <td><strong style="color:#10B981;">375%</strong></td>
          <td>50% proposal time reduction & lead scoring</td>
        </tr>
        <tr>
          <td><strong>Finance</strong></td>
          <td>$15,000</td>
          <td>$65,000</td>
          <td><strong style="color:#10B981;">333%</strong></td>
          <td>Automated invoice reconciliation & close</td>
        </tr>
        <tr>
          <td><strong>IT Operations</strong></td>
          <td>$15,000</td>
          <td>$50,000</td>
          <td><strong style="color:#10B981;">233%</strong></td>
          <td>Self-healing infrastructure monitoring</td>
        </tr>
      </tbody>
    </table>

    <div class="section-subtitle">5.3 5-Year Projection Summary</div>
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Estimated Investment</th>
          <th>Annual Benefits</th>
          <th>Net Financial Benefit</th>
          <th>Cumulative Net Benefit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Year 1</strong></td>
          <td>$120,000</td>
          <td>$280,000</td>
          <td>$160,000</td>
          <td><strong>$160,000</strong></td>
        </tr>
        <tr>
          <td><strong>Year 2</strong></td>
          <td>$40,000</td>
          <td>$450,000</td>
          <td>$410,000</td>
          <td><strong>$570,000</strong></td>
        </tr>
        <tr>
          <td><strong>Year 3</strong></td>
          <td>$40,000</td>
          <td>$650,000</td>
          <td>$610,000</td>
          <td><strong>$1,180,000</strong></td>
        </tr>
        <tr>
          <td><strong>Year 4</strong></td>
          <td>$30,000</td>
          <td>$820,000</td>
          <td>$790,000</td>
          <td><strong>$1,970,000</strong></td>
        </tr>
        <tr>
          <td><strong>Year 5</strong></td>
          <td>$30,000</td>
          <td>$980,000</td>
          <td>$950,000</td>
          <td><strong>$2,920,000</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="card-box" style="margin-top: 14px;">
      <strong style="color:${primaryColor}">5.4 Assumptions & Methodology</strong>
      <ul style="font-size: 8.5pt; color: #475569; margin: 4px 0 0 0; padding-left: 18px;">
        <li>Average developer hourly rate calculated at $75/hr; average support agent cost calculated at $35/hr.</li>
        <li>Conservative revenue uplift assumes +15% increase in lead win rates from automated proposal turnaround.</li>
        <li>All implementation fees, LLM API costs, and vector database hosting fees are included in investment estimates.</li>
      </ul>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 6: SOLUTION BLUEPRINTS -->
  ${
    isSelected("blueprints")
      ? `
  <div class="section section-break">
    <div class="section-title">6. Solution Blueprints</div>
    <p style="font-size: 9.5pt; color: #475569;">
      High-level technical execution blueprints for priority AI transformation initiatives.
    </p>

    <!-- BLUEPRINT 1 -->
    <div class="card-box">
      <div style="font-size: 11pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        6.1 Blueprint 1: AI-Driven Automated QA Test Generation
      </div>
      <div style="font-size: 8.5pt; color: #334155; space-y-2;">
        <p style="margin: 3px 0;"><strong>Category:</strong> Quick Win | <strong>Department:</strong> Engineering | <strong>Timeline:</strong> 4 Weeks</p>
        <p style="margin: 3px 0;"><strong>Business Problem:</strong> Manual QA testing causes 3-5 day release delays and frequent post-release bug hotfixes.</p>
        <p style="margin: 3px 0;"><strong>Proposed Solution:</strong> LLM engine that parses code diffs on Git PRs, automatically generating Jest/Cypress integration tests and executing regression suites in CI/CD.</p>
        <p style="margin: 3px 0;"><strong>Tech Stack:</strong> OpenAI GPT-4o, GitHub Actions, Docker, Jest / Playwright</p>
        <p style="margin: 3px 0;"><strong>Implementation Phases:</strong> Phase 1: Repo Integration (1 wk) ➔ Phase 2: Prompt Engineering & Rules (1 wk) ➔ Phase 3: CI/CD Pipeline Hook (1 wk) ➔ Phase 4: Developer Training (1 wk)</p>
        <p style="margin: 3px 0;"><strong>Risks & Mitigation:</strong> Risk: Flaky tests generated ➔ Mitigation: Human-in-the-loop review threshold for first 30 days.</p>
      </div>
    </div>

    <!-- BLUEPRINT 2 -->
    <div class="card-box">
      <div style="font-size: 11pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        6.2 Blueprint 2: Centralized Enterprise RAG Knowledge Engine
      </div>
      <div style="font-size: 8.5pt; color: #334155; space-y-2;">
        <p style="margin: 3px 0;"><strong>Category:</strong> Strategic Bet | <strong>Department:</strong> IT / Operations | <strong>Timeline:</strong> 8 Weeks</p>
        <p style="margin: 3px 0;"><strong>Business Problem:</strong> Documentation scattered across Slack, Google Drive, Notion, and local PDF drives, causing high search latency.</p>
        <p style="margin: 3px 0;"><strong>Proposed Solution:</strong> Unified vector embedding pipeline indexing company knowledge into a secure, permission-aware RAG search API and Slack Bot.</p>
        <p style="margin: 3px 0;"><strong>Tech Stack:</strong> Supabase pgvector, LangChain / LlamaIndex, OpenAI Text-Embedding-3-Large, Next.js</p>
        <p style="margin: 3px 0;"><strong>Implementation Phases:</strong> Phase 1: Connectors & Ingestion (2 wks) ➔ Phase 2: Chunking & Indexing (2 wks) ➔ Phase 3: Slack Bot & API Integration (2 wks) ➔ Phase 4: Security & Rollout (2 wks)</p>
        <p style="margin: 3px 0;"><strong>Risks & Mitigation:</strong> Risk: Data leak across departments ➔ Mitigation: Strict Row Level Security (RLS) and user role token validation.</p>
      </div>
    </div>

    <!-- BLUEPRINT 3 -->
    <div class="card-box">
      <div style="font-size: 11pt; font-weight: 800; color: ${primaryColor}; margin-bottom: 6px;">
        6.3 Blueprint 3: Automated Proposal Generator for Sales
      </div>
      <div style="font-size: 8.5pt; color: #334155; space-y-2;">
        <p style="margin: 3px 0;"><strong>Category:</strong> Quick Win | <strong>Department:</strong> Sales | <strong>Timeline:</strong> 6 Weeks</p>
        <p style="margin: 3px 0;"><strong>Business Problem:</strong> Sales reps take 3-5 days to assemble custom client proposals and SOWs.</p>
        <p style="margin: 3px 0;"><strong>Proposed Solution:</strong> RAG tool pulling historical winning proposals and pricing calculators to output tailored draft proposals in under 10 minutes.</p>
        <p style="margin: 3px 0;"><strong>Tech Stack:</strong> GPT-4o, Supabase Vector, Hubspot CRM API, PDF Generation Engine</p>
        <p style="margin: 3px 0;"><strong>Implementation Phases:</strong> Phase 1: Template Library Ingestion (1 wk) ➔ Phase 2: CRM Connector (2 wks) ➔ Phase 3: UI Generator (2 wks) ➔ Phase 4: User Adoption (1 wk)</p>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 7: COMMERCIAL PROPOSAL -->
  ${
    isSelected("proposal")
      ? `
  <div class="section section-break">
    <div class="section-title">7. Commercial Proposal</div>
    
    <div class="section-subtitle">7.1 Scope Boundaries</div>
    <div class="grid-2" style="margin-bottom: 16px;">
      <div class="card-box" style="border-top: 3px solid #10B981; margin-bottom:0;">
        <strong style="color:#047857;">✅ IN-SCOPE DELIVERABLES</strong>
        <ul style="font-size: 8.5pt; color: #334155; margin: 6px 0 0 0; padding-left: 16px;">
          <li>Executive Discovery Workshops across 15 capabilities.</li>
          <li>AI Readiness Assessment & Capability Heatmap.</li>
          <li>Top 20 AI Use Cases catalog & Opportunity Matrix.</li>
          <li>Phased Transformation Roadmap & ROI financial models.</li>
          <li>5 Solution Blueprints & Executive Board Presentation.</li>
        </ul>
      </div>

      <div class="card-box" style="border-top: 3px solid #EF4444; margin-bottom:0;">
        <strong style="color:#991B1B;">❌ OUT-OF-SCOPE ACTIVITIES</strong>
        <ul style="font-size: 8.5pt; color: #334155; margin: 6px 0 0 0; padding-left: 16px;">
          <li>Custom production software coding / execution.</li>
          <li>Third-party platform licensing fees.</li>
          <li>Legacy data cleansing or ETL migrations.</li>
          <li>Ongoing 24/7 SLA infrastructure support.</li>
        </ul>
      </div>
    </div>

    <div class="section-subtitle">7.2 Commercial Model & Fixed Investment</div>
    <div class="card-box" style="background:#F0FDF4; border: 1px solid #BBF7D0;">
      <div style="font-size: 12pt; font-weight: 900; color: #047857;">Fixed-Price Outcome Engagement Fee: $120,000 USD</div>
      <p style="font-size: 8.5pt; color: #166534; margin: 4px 0 0 0;">
        This engagement is delivered on a fixed-fee, outcome-backed basis, ensuring guaranteed deliverable completion within an agreed 8-week timeline.
      </p>
    </div>

    <div class="section-subtitle">7.3 Payment Milestones</div>
    <table>
      <thead>
        <tr>
          <th>Milestone</th>
          <th>Percentage</th>
          <th>Amount ($ USD)</th>
          <th>Timing / Trigger</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Advance / Mobilization</strong></td>
          <td>40%</td>
          <td>$48,000</td>
          <td>Upon agreement execution & kickoff</td>
        </tr>
        <tr>
          <td><strong>Mid-Term Discovery & Roadmap</strong></td>
          <td>40%</td>
          <td>$48,000</td>
          <td>Upon completion of Phase 2 workshops</td>
        </tr>
        <tr>
          <td><strong>Final Delivery & Executive Presentation</strong></td>
          <td>20%</td>
          <td>$24,000</td>
          <td>Upon delivery of final board presentation</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
      : ""
  }

  <!-- SECTION 8, 9, 10: NEXT STEPS, TERMS & ACCEPTANCE -->
  ${
    isSelected("proposal") || isSelected("roadmap")
      ? `
  <div class="section section-break">
    <div class="section-title">8. Next Steps & Action Plan</div>
    <div class="card-box">
      <ol style="font-size: 9pt; color: #334155; margin: 0; padding-left: 18px;">
        <li><strong>Review & Formally Execute Proposal:</strong> Sign and return the acceptance block in Section 10.</li>
        <li><strong>Schedule Executive Kickoff Meeting:</strong> Align core leadership team and workshop schedules.</li>
        <li><strong>Nominate Stakeholder Leads:</strong> Designate single points of contact across Engineering, Sales, and Operations.</li>
        <li><strong>Proposal Validity:</strong> This commercial proposal remains valid for <strong>30 days</strong> from issue date.</li>
      </ol>
    </div>

    <div class="section-title" style="margin-top: 24px;">9. Terms & Conditions Summary</div>
    <div class="card-box" style="font-size: 8.5pt; color: #475569; space-y-2;">
      <p style="margin: 3px 0;"><strong>Intellectual Property:</strong> All advisory reports and blueprints become perpetual internal property of ${tenantName} upon full payment.</p>
      <p style="margin: 3px 0;"><strong>Confidentiality:</strong> Both parties agree to maintain strict mutual confidentiality under Non-Disclosure terms.</p>
      <p style="margin: 3px 0;"><strong>Termination:</strong> Either party may terminate with 15 days' written notice, with invoicing for work completed to date.</p>
    </div>

    <div class="section-title" style="margin-top: 24px;">10. Executive Acceptance & Authorization</div>
    <p style="font-size: 9pt; color: #475569;">
      By signing below, the authorized representatives accept the scope, commercial model, and terms outlined in this proposal.
    </p>

    <div class="grid-2" style="margin-top: 16px;">
      <div class="sig-box">
        <strong style="color:${primaryColor}">For & On Behalf Of ${tenantName}</strong>
        <div class="sig-line"></div>
        <div style="font-size: 8pt; color: #64748B; margin-top: 6px;">
          Authorized Signature<br/>
          Name: ______________________<br/>
          Title: ______________________<br/>
          Date: ______________________
        </div>
      </div>

      <div class="sig-box">
        <strong style="color:${primaryColor}">For & On Behalf Of Nisol AI Advisory</strong>
        <div class="sig-line"></div>
        <div style="font-size: 8pt; color: #64748B; margin-top: 6px;">
          Authorized Signature<br/>
          Name: Nisol AI Executive Lead<br/>
          Title: Principal AI Transformation Advisory<br/>
          Date: ${reportDate}
        </div>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- APPENDIX: DATA SOURCES -->
  <div class="section">
    <div class="section-title">Appendix: Data Sources & Audit Methodology</div>
    <div class="card-box">
      <ul style="font-size: 8.5pt; color: #475569; margin: 0; padding-left: 18px;">
        <li><strong>Nisol Discovery™ Assessment:</strong> Data captured across 62 discovery questions in stakeholder workshops.</li>
        <li><strong>Industry Benchmarks:</strong> Proprietary database derived from Nisol AI benchmark studies of enterprise peers.</li>
        <li><strong>Financial Inputs:</strong> Operating budgets and cost estimates provided by client leadership.</li>
      </ul>
    </div>
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
