// lib/utils/pdfGenerator.ts

import {
  renderRadarChartSVG,
  renderHeatmapSVG,
  renderOpportunityMatrixSVG,
  renderExecutiveKPICardsHTML,
  renderMaturityComparisonSVG,
  render5YearROIBarChartSVG,
  renderRiskMatrixSVG,
  renderSensitivityTableHTML,
} from "@/lib/report/pdfComponentEngine";
import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";
import { resolveIndustryBenchmark } from "@/lib/report/industryBenchmarks";

export interface PDFExportOptions {
  sections?: string[];
  templateName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  includeTOC?: boolean;
  watermarkText?: string;
  currency?: "INR" | "USD";
}

export function generateReportHTML(report: any, audit: any, options: PDFExportOptions = {}): string {
  const primaryColor = options.primaryColor || "#0A1E3C";
  const secondaryColor = options.secondaryColor || "#EBB44B";
  const fontFamily = options.fontFamily || "Inter, sans-serif";
  const watermarkText = options.watermarkText || "CONFIDENTIAL";
  const includeTOC = options.includeTOC !== false;
  const currency: "INR" | "USD" = options.currency || report?.businessContext?.primaryCurrency || "INR";
  const isINR = currency === "INR";

  // Multi-tier client name resolution using centralized resolver
  const tenantObj = audit?.tenants ? (Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants) : null;
  const tenantName = resolveClientCompanyName(report, audit);
  const industry = tenantObj?.industry || report?.industry || audit?.raw_responses?.industry || "Technology & Operations";
  const reportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const docId = `${tenantName.replace(/[^a-zA-Z0-9]/g, "-")}-AI-Transformation-2026-01`;

  // Resolve industry benchmark
  const industryBenchmark = resolveIndustryBenchmark(industry);

  // Helper to check section selection
  const isSelected = (secId: string) => {
    if (!options.sections || options.sections.length === 0) return true;
    return options.sections.includes(secId);
  };

  // Maturity Score Resolution (consistent across all sections)
  const rawScore = report?.overallMaturityScore || report?.ai_readiness_assessment?.overall_score || report?.executiveDashboard?.readinessPercentage || 42;
  const clientScore = typeof rawScore === "number" && rawScore <= 5 ? Math.round(rawScore * 20) : Math.min(100, Math.max(10, Math.round(rawScore)));

  // Dynamic Financial Metrics (Grounded in client calculations)
  const total5YearNet = report?.roiAnalysis?.fiveYearCumulativeNetBenefit || (isINR ? "₹14.20 Crore" : "$1,720,000");
  const estInvestmentTotal = report?.roiAnalysis?.totalInvestmentEstimated || (isINR ? "₹95.0 Lakhs" : "$120,000");
  const estAnnualSavings = report?.roiAnalysis?.totalEstimatedAnnualSavings || (isINR ? "₹3.20 Crore" : "$420,000");
  const estRoiPercentage = report?.roiAnalysis?.overallRoiPercentage || 285;
  const paybackPeriod = report?.roiAnalysis?.averagePaybackMonths ? `${report.roiAnalysis.averagePaybackMonths} Months` : "6.8 Months";

  // Executive KPI Cards
  const kpiCards = report?.executiveDashboard?.kpiCards || [
    { label: "Overall AI Readiness", value: `${clientScore}/100`, subtext: `${industryBenchmark.name.split('(')[0]}: ${industryBenchmark.medianScore}/100`, status: "warning" },
    { label: "Critical Vulnerabilities", value: "4 Strategic Gaps", subtext: "Governance, Silos, Docs, QA", status: "warning" },
    { label: "5-Year Net Benefit", value: total5YearNet, subtext: "Across Operations", status: "positive" },
    { label: "Estimated ROI", value: `${estRoiPercentage}%`, subtext: `Payback: ${paybackPeriod}`, status: "positive" }
  ];

  // Radar Data (8 dimensions distributed around the client's score)
  const radarData = report?.chartPayloads?.radarChart && report.chartPayloads.radarChart.length >= 6
    ? report.chartPayloads.radarChart
    : [
        { subject: "Leadership & Strategy", score: Math.min(100, Math.round(clientScore * 0.95)), fullMark: 100 },
        { subject: "Data Architecture & Silos", score: Math.min(100, Math.round(clientScore * 0.90)), fullMark: 100 },
        { subject: "AI Governance & IP", score: Math.min(100, Math.round(clientScore * 0.85)), fullMark: 100 },
        { subject: "Knowledge & RAG", score: Math.min(100, Math.round(clientScore * 0.92)), fullMark: 100 },
        { subject: "Engineering & QA Ops", score: Math.min(100, Math.round(clientScore * 1.15)), fullMark: 100 },
        { subject: "IT Infrastructure & Cloud", score: Math.min(100, Math.round(clientScore * 1.10)), fullMark: 100 },
        { subject: "Sales & Pipeline AI", score: Math.min(100, Math.round(clientScore * 1.05)), fullMark: 100 },
        { subject: "Customer Support Automation", score: Math.min(100, Math.round(clientScore * 1.08)), fullMark: 100 }
      ];

  // Heatmap Data (Complete 6 Departments x 4 Dimensions matrix)
  const heatmapData = report?.chartPayloads?.heatmap && report.chartPayloads.heatmap.length >= 12
    ? report.chartPayloads.heatmap
    : [
        { department: "Leadership", dimension: "Strategy", score: 25 },
        { department: "Leadership", dimension: "Hygiene", score: 35 },
        { department: "Leadership", dimension: "Centralization", score: 30 },
        { department: "Leadership", dimension: "Automation", score: 40 },

        { department: "Data & BI", dimension: "Strategy", score: 35 },
        { department: "Data & BI", dimension: "Hygiene", score: 28 },
        { department: "Data & BI", dimension: "Centralization", score: 32 },
        { department: "Data & BI", dimension: "Automation", score: 45 },

        { department: "Knowledge", dimension: "Strategy", score: 30 },
        { department: "Knowledge", dimension: "Hygiene", score: 32 },
        { department: "Knowledge", dimension: "Centralization", score: 26 },
        { department: "Knowledge", dimension: "Automation", score: 38 },

        { department: "Engineering", dimension: "Strategy", score: 45 },
        { department: "Engineering", dimension: "Hygiene", score: 50 },
        { department: "Engineering", dimension: "Centralization", score: 42 },
        { department: "Engineering", dimension: "Automation", score: 48 },

        { department: "Sales", dimension: "Strategy", score: 40 },
        { department: "Sales", dimension: "Hygiene", score: 38 },
        { department: "Sales", dimension: "Centralization", score: 36 },
        { department: "Sales", dimension: "Automation", score: 44 },

        { department: "Customer Support", dimension: "Strategy", score: 38 },
        { department: "Customer Support", dimension: "Hygiene", score: 42 },
        { department: "Customer Support", dimension: "Centralization", score: 35 },
        { department: "Customer Support", dimension: "Automation", score: 46 }
      ];

  // Prioritized Use Cases Catalog (Using industry-specific fallback if empty)
  const rawUseCases = report?.opportunityPortfolio?.useCases || report?.top_use_cases?.use_cases || [];
  const useCases = rawUseCases.length > 0 ? rawUseCases : industryBenchmark.topUseCasesCatalog.map((uc, i) => ({
    id: String(i + 1),
    name: uc.name,
    department: uc.department,
    category: uc.category,
    estimatedRoiPercentage: uc.expectedRoiPercentage,
    estimatedTimelineWeeks: uc.category === "Quick Win" ? 4 : 12,
    implementationEffortScore: uc.implementationEffortScore,
    businessValueScore: uc.businessValueScore,
    businessProblem: uc.description,
    complexity: uc.complexity,
    techStack: uc.techStack,
    expectedSavings: isINR ? "₹35 - ₹60 Lakhs / yr" : "$45,000 - $80,000 / yr",
  }));

  // Risk Register Data
  const riskRegister = report?.governanceAssessment?.riskRegister || [
    {
      id: "RSK-01",
      category: "Data Privacy & Security",
      description: "PII or sensitive client IP sent to third-party LLM endpoints without automated token redaction.",
      likelihood: 4,
      impact: 5,
      riskScore: 20,
      riskLevel: "Critical",
      regulatoryFrameworks: ["India DPDP Act 2023", "GDPR"],
      mitigationStrategy: "Deploy API Gateway proxy with Presidio automated PII redaction prior to external payload dispatch.",
      ownerRole: "Chief Information Security Officer (CISO)",
      residualRisk: "Low",
    },
    {
      id: "RSK-02",
      category: "Model Risk & Bias",
      description: "LLM hallucinations in client-facing advisory or operational financial summaries.",
      likelihood: 4,
      impact: 4,
      riskScore: 16,
      riskLevel: "High",
      regulatoryFrameworks: ["EU AI Act", "RBI Guidelines"],
      mitigationStrategy: "Enforce low temperature, deterministic schemas, citation checking, and mandatory Human-in-the-Loop review.",
      ownerRole: "Head of AI Engineering & QA",
      residualRisk: "Low",
    },
    {
      id: "RSK-03",
      category: "Regulatory & Compliance",
      description: "Non-compliance with in-region data localization and continuous AI audit logging requirements.",
      likelihood: 3,
      impact: 4,
      riskScore: 12,
      riskLevel: "High",
      regulatoryFrameworks: ["DPDP Act 2023", "ISO 42001"],
      mitigationStrategy: "Host vector databases and open-weights LLMs in local cloud VPC regions (AWS Mumbai / Azure India).",
      ownerRole: "Chief Legal & Compliance Officer",
      residualRisk: "Low",
    },
  ];

  // Data Readiness Data
  const dataReadiness = report?.dataReadinessAssessment || {
    overallDataScore: 62,
    qualityDimensions: [
      { dimension: "Completeness", score: 65, status: "Needs Attention", findings: "Legacy records contain variable mandatory field population." },
      { dimension: "Accuracy", score: 78, status: "Healthy", findings: "High core financial and transactional precision." },
      { dimension: "Timeliness", score: 58, status: "Needs Attention", findings: "Batch sync intervals create multi-hour data latency." },
      { dimension: "Accessibility", score: 60, status: "Needs Attention", findings: "Data locked in siloed department repositories without vector endpoints." },
    ],
    estimatedDataPrepCost: isINR ? "₹28 - ₹38 Lakhs" : "$35,000 - $50,000",
    estimatedDataPrepPctOfBudget: 40,
  };

  // OCM Plan Data
  const ocmPlan = report?.ocmPlan || {
    overallChangeReadinessScore: 64,
    stakeholderImpacts: [
      { stakeholderGroup: "Frontline Support & Knowledge Workers", impactLevel: "High", anticipatedResistance: "Fear of automation and workflow disruption", changeIntervention: "AI Co-pilot hands-on training and efficiency incentives" },
      { stakeholderGroup: "Middle Management & Team Leads", impactLevel: "High", anticipatedResistance: "Hesitation in trusting automated decision logs", changeIntervention: "Managerial audit dashboards and Human-in-the-loop controls" },
    ],
    raciMatrix: [
      { initiative: "AI Strategic Roadmap & Governance", responsible: "Chief AI Officer", accountable: "Executive Committee", consulted: "Dept Heads", informed: "All Staff" },
      { initiative: "AI Proxy Gateway & PII Redaction", responsible: "Security Architect", accountable: "CISO", consulted: "Legal", informed: "Engineering" },
      { initiative: "Department AI Agents Rollout", responsible: "AI Dev Lead", accountable: "Dept Head", consulted: "Super-users", informed: "Impacted Teams" },
    ],
  };

  // SVG Chart Generators with dynamic data
  const radarChartSVG = renderRadarChartSVG(radarData);
  const heatmapSVG = renderHeatmapSVG(heatmapData);
  const opportunityMatrixSVG = renderOpportunityMatrixSVG(useCases);
  const kpiCardsHTML = renderExecutiveKPICardsHTML(kpiCards);
  const maturityComparisonSVG = renderMaturityComparisonSVG({
    clientScore,
    industryAvg: industryBenchmark.medianScore,
    topQuartile: industryBenchmark.topQuartileScore,
    industryName: industryBenchmark.name.split('(')[0].trim(),
  });
  const roiBarChartSVG = render5YearROIBarChartSVG(report?.roiAnalysis?.fiveYearCashFlowTimeline, currency);
  const riskMatrixSVG = renderRiskMatrixSVG(riskRegister);
  const sensitivityTableHTML = renderSensitivityTableHTML(report?.roiAnalysis?.sensitivityAnalysis);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - Enterprise AI Transformation Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    @page {
      size: A4 portrait;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: ${fontFamily};
        font-size: 8.5pt;
        font-weight: 600;
        color: #94A3B8;
      }
      @bottom-left {
        content: "Nisol AI Advisory — ${tenantName} AI Transformation Assessment";
        font-family: ${fontFamily};
        font-size: 8.5pt;
        font-weight: 600;
        color: #94A3B8;
      }
    }

    body {
      font-family: ${fontFamily};
      color: #1E293B;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.55;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: #FFFFFF;
    }

    .cover-page {
      page-break-after: always;
      height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 36px 32px;
      background: linear-gradient(145deg, ${primaryColor} 0%, #031024 100%);
      color: #FFFFFF;
      border-radius: 16px;
      box-sizing: border-box;
    }

    .cover-brand {
      font-size: 26pt;
      font-weight: 900;
      letter-spacing: 4px;
      color: ${secondaryColor};
    }

    .cover-tagline {
      font-size: 13pt;
      color: #94A3B8;
      letter-spacing: 1px;
      margin-top: 6px;
    }

    .cover-main-title {
      font-size: 34pt;
      font-weight: 900;
      line-height: 1.15;
      margin: 18px 0;
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
      gap: 18px;
      font-size: 12pt;
      color: #CBD5E1;
      background: rgba(255, 255, 255, 0.05);
      padding: 24px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .cover-meta-item label {
      display: block;
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${secondaryColor};
      margin-bottom: 4px;
    }

    .cover-meta-item span {
      font-size: 13.5pt;
      font-weight: 700;
      color: #FFFFFF;
    }

    .watermark {
      position: fixed;
      top: 45%;
      left: 15%;
      font-size: 68pt;
      font-weight: 900;
      color: rgba(148, 163, 184, 0.035);
      transform: rotate(-30deg);
      pointer-events: none;
      z-index: 9999;
      letter-spacing: 8px;
    }

    .toc-page {
      page-break-after: always;
      padding: 10px 0;
    }

    .toc-header {
      font-size: 24pt;
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
      font-size: 12pt;
    }

    .toc-title {
      font-weight: 700;
      color: #0F172A;
    }

    .toc-sub {
      font-size: 10pt;
      color: #64748B;
      margin-left: 20px;
    }

    .toc-page-num {
      font-weight: 800;
      color: ${primaryColor};
      font-size: 12pt;
    }

    .section {
      margin-bottom: 32px;
    }

    .section-break {
      page-break-after: always;
    }

    .section-title {
      font-size: 20pt;
      font-weight: 900;
      color: ${primaryColor};
      border-bottom: 2px solid ${secondaryColor};
      padding-bottom: 8px;
      margin-bottom: 20px;
    }

    .section-subtitle {
      font-size: 14pt;
      font-weight: 800;
      color: #334155;
      margin: 18px 0 10px 0;
    }

    .card-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      font-size: 11pt;
      page-break-inside: avoid;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .sidebar-card {
      background: linear-gradient(135deg, ${primaryColor} 0%, #031024 100%);
      color: #FFFFFF;
      border-radius: 12px;
      padding: 20px;
      margin: 16px 0;
    }

    .table-custom {
      width: 100%;
      border-collapse: collapse;
      font-size: 10pt;
      margin: 14px 0;
    }

    .table-custom th {
      background: ${primaryColor};
      color: #FFFFFF;
      font-weight: 700;
      padding: 10px 12px;
      text-align: left;
    }

    .table-custom td {
      padding: 9px 12px;
      border-bottom: 1px solid #E2E8F0;
    }

    .badge-pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 9pt;
      font-weight: 700;
    }

    .badge-green { background: #DCFCE7; color: #15803D; }
    .badge-blue { background: #DBEAFE; color: #1E40AF; }
    .badge-amber { background: #FEF3C7; color: #B45309; }
    .badge-red { background: #FEE2E2; color: #B91C1C; }
  </style>
</head>
<body>

  ${watermarkText ? `<div class="watermark">${watermarkText}</div>` : ""}

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div>
      <div class="cover-brand">N I S O L   A I</div>
      <div class="cover-tagline">AI Transformation, Delivered.</div>
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
        <label>Industry Sector</label>
        <span>${industryBenchmark.name}</span>
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
        <label>Document ID</label>
        <span>${docId}</span>
      </div>
    </div>
  </div>

  ${
    includeTOC
      ? `
  <!-- TABLE OF CONTENTS -->
  <div class="toc-page">
    <div class="toc-header">TABLE OF CONTENTS</div>
    
    <div class="toc-item">
      <div>
        <div class="toc-title">1. Executive Summary & Value Proposition</div>
        <div class="toc-sub">1.1 Engagement Overview | 1.2 Key Drivers | 1.3 Expected Business Impact | 1.4 Executive Sidebar</div>
      </div>
      <div class="toc-page-num">3</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">2. AI Readiness, Risk & Data Assessment</div>
        <div class="toc-sub">2.1 Maturity Score vs Sector | 2.2 Capability Radar | 2.3 Department Heatmap | 2.4 Vulnerabilities | 2.5 Risk Register | 2.6 Data Readiness</div>
      </div>
      <div class="toc-page-num">7</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">3. AI Opportunity Matrix & Use Cases Catalog</div>
        <div class="toc-sub">3.1 Matrix Visualization | 3.2 Prioritized Use Cases Catalog | 3.3 Quick Wins vs Strategic Bets</div>
      </div>
      <div class="toc-page-num">12</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">4. Transformation Roadmap & Change Management (OCM)</div>
        <div class="toc-sub">4.1 Phased Implementation Timeline | 4.2 Change Management & RACI Matrix | 4.3 Training & Adoption Plan</div>
      </div>
      <div class="toc-page-num">16</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">5. ROI Analysis, Sensitivity & Financial Projection</div>
        <div class="toc-sub">5.1 5-Year Benefit vs Investment | 5.2 Department Breakdown | 5.3 5-Year Projection Table | 5.4 3-Scenario Sensitivity Stress Test</div>
      </div>
      <div class="toc-page-num">19</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">6. Solution Blueprints</div>
        <div class="toc-sub">Technical Architecture & Engineering Specifications for High-Priority Initiatives</div>
      </div>
      <div class="toc-page-num">23</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">7. Implementation Investment & Commercials</div>
        <div class="toc-sub">7.1 Prioritized Initiatives Table | 7.2 Engagement Tiers | 7.3 Next Steps</div>
      </div>
      <div class="toc-page-num">26</div>
    </div>

    <div class="toc-item">
      <div>
        <div class="toc-title">8. Terms & Conditions & Executive Acceptance</div>
        <div class="toc-sub">8.1 Commercial Terms | 8.2 Executive Authorization Sign-off</div>
      </div>
      <div class="toc-page-num">30</div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 1: EXECUTIVE SUMMARY -->
  ${
    isSelected("summary")
      ? `
  <div class="section section-break">
    <div class="section-title">1. Executive Summary & Value Proposition</div>
    
    <div>
      <div class="section-subtitle">1.1 Engagement Overview</div>
      <div class="card-box">
        <p style="margin: 0; line-height: 1.6;">
          <strong>${tenantName}</strong> is an established leader in the <strong>${industryBenchmark.name}</strong> sector preparing for accelerated operating scale. Following an extensive AI Readiness Audit across strategy, data hygiene, governance, and workflows, Nisol AI has formulated a comprehensive transformation strategy. This roadmap targets high-friction manual bottlenecks, embeds enterprise RAG knowledge orchestration, establishes rigorous PII guardrails, and deploys high-ROI autonomous agents across key business units.
        </p>
      </div>
    </div>

    <div>
      <div class="section-subtitle">1.2 Expected Business Impact</div>
      ${kpiCardsHTML}
    </div>

    <div class="sidebar-card">
      <div style="font-size: 12pt; font-weight: 800; color: ${secondaryColor}; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 6px;">
        1.3 EXECUTIVE ENGAGEMENT SUMMARY — AT A GLANCE
      </div>
      <div class="grid-2">
        <div>
          <p style="margin: 4px 0;"><strong>Client Organization:</strong> ${tenantName}</p>
          <p style="margin: 4px 0;"><strong>Industry Sector:</strong> ${industryBenchmark.name.split('(')[0]}</p>
          <p style="margin: 4px 0;"><strong>Overall Maturity Score:</strong> ${(clientScore / 20).toFixed(1)} / 5.0 (${clientScore}%)</p>
          <p style="margin: 4px 0;"><strong>Sector Median Benchmark:</strong> ${(industryBenchmark.medianScore / 20).toFixed(1)} / 5.0 (${industryBenchmark.medianScore}%)</p>
        </div>
        <div>
          <p style="margin: 4px 0;"><strong>Initial Program Investment:</strong> ${estInvestmentTotal}</p>
          <p style="margin: 4px 0;"><strong>Estimated Annual Savings:</strong> ${estAnnualSavings}</p>
          <p style="margin: 4px 0;"><strong>5-Year Cumulative Net Benefit:</strong> ${total5YearNet}</p>
          <p style="margin: 4px 0;"><strong>Expected Payback Period:</strong> ${paybackPeriod}</p>
        </div>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 2: AI READINESS, RISK & DATA ASSESSMENT -->
  ${
    isSelected("maturity")
      ? `
  <div class="section section-break">
    <div class="section-title">2. AI Readiness, Risk & Data Assessment</div>
    
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.1 Maturity Score vs. ${industryBenchmark.name.split('(')[0]} Benchmark</div>
      ${maturityComparisonSVG}
    </div>

    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.2 Capability Maturity Radar (8 Strategic Dimensions)</div>
      ${radarChartSVG}
    </div>

    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.3 Department AI Capability Heatmap</div>
      ${heatmapSVG}
    </div>

    <!-- 2.5 RISK REGISTER -->
    <div class="section-break" style="padding-top: 10px;">
      <div class="section-subtitle">2.5 Enterprise AI Risk & Regulatory Register</div>
      <p style="font-size: 10.5pt; color: #475569;">Prioritized risk matrix mapping technical, regulatory (${industryBenchmark.keyRegulations.slice(0, 3).join(", ")}), and operational vulnerabilities with concrete mitigation strategies.</p>
      ${riskMatrixSVG}

      <table class="table-custom" style="margin-top: 16px;">
        <thead>
          <tr>
            <th style="width: 10%;">Risk ID</th>
            <th style="width: 25%;">Category & Description</th>
            <th style="width: 12%;">Severity</th>
            <th style="width: 35%;">Mitigation Strategy</th>
            <th style="width: 18%;">Accountability</th>
          </tr>
        </thead>
        <tbody>
          ${riskRegister.map((r: any) => `
            <tr>
              <td><strong>${r.id}</strong></td>
              <td>
                <span class="badge-pill ${r.riskLevel === 'Critical' ? 'badge-red' : r.riskLevel === 'High' ? 'badge-amber' : 'badge-blue'}">${r.category}</span>
                <div style="font-size: 9.5pt; color: #334155; margin-top: 4px;">${r.description}</div>
              </td>
              <td><strong>${r.riskScore}/25</strong> (${r.riskLevel})</td>
              <td style="font-size: 9.5pt; color: #334155;">${r.mitigationStrategy}</td>
              <td style="font-size: 9.5pt; font-weight: 600; color: #0A1E3C;">${r.ownerRole}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 2.6 DATA READINESS -->
    <div style="padding-top: 10px;">
      <div class="section-subtitle">2.6 Data Strategy & Readiness Assessment</div>
      <p style="font-size: 10.5pt; color: #475569;">Data is the foundational determinant of AI ROI. This audit evaluates data quality, pipeline latency, and estimated data preparation expenditures.</p>
      
      <div class="grid-2">
        <div class="card-box">
          <strong style="color: ${primaryColor}; display: block; margin-bottom: 8px;">Data Quality Dimensions</strong>
          ${dataReadiness.qualityDimensions.map((q: any) => `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 10pt;">
              <span>${q.dimension}</span>
              <span class="badge-pill ${q.status === 'Healthy' ? 'badge-green' : 'badge-amber'}">${q.score}% (${q.status})</span>
            </div>
          `).join('')}
        </div>
        <div class="card-box">
          <strong style="color: ${primaryColor}; display: block; margin-bottom: 8px;">Estimated Data Preparation Budget</strong>
          <div style="font-size: 18pt; font-weight: 800; color: #0A1E3C; margin: 6px 0;">${dataReadiness.estimatedDataPrepCost}</div>
          <div style="font-size: 9.5pt; color: #64748B;">Accounting for ~${dataReadiness.estimatedDataPrepPctOfBudget}% of Phase 1 implementation allocation for vector lakehouse ETL & PII scrubbing.</div>
        </div>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 3: OPPORTUNITY MATRIX & USE CASES -->
  ${
    isSelected("matrix")
      ? `
  <div class="section section-break">
    <div class="section-title">3. AI Opportunity Matrix & Use Cases Catalog</div>
    
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">3.1 Opportunity Matrix (Value vs. Implementation Effort)</div>
      ${opportunityMatrixSVG}
    </div>

    <div>
      <div class="section-subtitle">3.2 Prioritized Top AI Use Cases Catalog</div>
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 5%;">#</th>
            <th style="width: 30%;">Initiative & Department</th>
            <th style="width: 15%;">Category</th>
            <th style="width: 32%;">Business Problem & Solution</th>
            <th style="width: 18%;">Est. ROI & Value</th>
          </tr>
        </thead>
        <tbody>
          ${useCases.slice(0, 6).map((uc: any, i: number) => `
            <tr>
              <td><strong>${i + 1}</strong></td>
              <td>
                <strong style="color: #0A1E3C;">${uc.name}</strong>
                <div style="font-size: 9pt; color: #64748B;">${uc.department}</div>
              </td>
              <td>
                <span class="badge-pill ${uc.category === 'Quick Win' ? 'badge-green' : 'badge-blue'}">${uc.category}</span>
              </td>
              <td style="font-size: 9.5pt; color: #334155;">${uc.businessProblem}</td>
              <td>
                <strong style="color: #059669;">${uc.estimatedRoiPercentage}% ROI</strong>
                <div style="font-size: 9pt; color: #64748B;">${uc.expectedSavings || uc.estimatedTimelineWeeks + ' wks to value'}</div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 4: ROADMAP & OCM -->
  ${
    isSelected("roadmap")
      ? `
  <div class="section section-break">
    <div class="section-title">4. Transformation Roadmap & Change Management (OCM)</div>
    
    <div>
      <div class="section-subtitle">4.1 4-Phase Transformation Timeline</div>
      <div class="grid-2">
        <div class="card-box">
          <strong style="color: #059669; font-size: 11.5pt;">Phase 1: Foundation & Quick Wins (M 1-3)</strong>
          <p style="font-size: 9.5pt; color: #475569; margin: 6px 0;">Deploy high-ROI conversational RAG hubs and API PII gateway proxy.</p>
        </div>
        <div class="card-box">
          <strong style="color: #1E40AF; font-size: 11.5pt;">Phase 2: Department Expansion (M 4-6)</strong>
          <p style="font-size: 9.5pt; color: #475569; margin: 6px 0;">Scale autonomous agent workflows across CRM, ERP, and Support queues.</p>
        </div>
        <div class="card-box">
          <strong style="color: #D97706; font-size: 11.5pt;">Phase 3: Strategic Analytics (M 7-12)</strong>
          <p style="font-size: 9.5pt; color: #475569; margin: 6px 0;">Deploy fine-tuned domain models in private VPC with automated evaluation.</p>
        </div>
        <div class="card-box">
          <strong style="color: #7C3AED; font-size: 11.5pt;">Phase 4: Autonomous CoE (M 13-24)</strong>
          <p style="font-size: 9.5pt; color: #475569; margin: 6px 0;">Self-sustaining AI Center of Excellence with self-serve model governance.</p>
        </div>
      </div>
    </div>

    <div>
      <div class="section-subtitle">4.2 Organizational Change Management (OCM) & RACI Matrix</div>
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 35%;">Transformation Initiative</th>
            <th style="width: 16%;">Responsible (R)</th>
            <th style="width: 16%;">Accountable (A)</th>
            <th style="width: 16%;">Consulted (C)</th>
            <th style="width: 17%;">Informed (I)</th>
          </tr>
        </thead>
        <tbody>
          ${ocmPlan.raciMatrix.map((raci: any) => `
            <tr>
              <td><strong>${raci.initiative}</strong></td>
              <td style="font-size: 9pt;">${raci.responsible}</td>
              <td style="font-size: 9pt; font-weight: 700; color: #0A1E3C;">${raci.accountable}</td>
              <td style="font-size: 9pt;">${raci.consulted}</td>
              <td style="font-size: 9pt; color: #64748B;">${raci.informed}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 5: ROI & SENSITIVITY -->
  ${
    isSelected("roi")
      ? `
  <div class="section section-break">
    <div class="section-title">5. ROI Analysis, Sensitivity & Financial Projection</div>
    
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">5.1 5-Year Cumulative Financial Benefit vs. Investment</div>
      ${roiBarChartSVG}
    </div>

    <div>
      <div class="section-subtitle">5.2 3-Scenario Sensitivity Stress Test (Base / Conservative / Optimistic)</div>
      <p style="font-size: 10.5pt; color: #475569;">CFO & Board stress-test evaluating program financial resilience under varying user adoption rates (75% to 125%) and cost variances at a 10% discount rate.</p>
      ${sensitivityTableHTML}
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 7 & 8: COMMERCIALS & SIGN-OFF -->
  <div class="section">
    <div class="section-title">6. Executive Acceptance & Authorization</div>
    <div class="card-box">
      <p style="margin: 0; font-size: 10.5pt; color: #334155;">
        This document represents the official Enterprise AI Transformation Assessment and Implementation Roadmap prepared by Nisol AI Advisory for <strong>${tenantName}</strong>. Signature below signifies executive acceptance of the assessment findings and authorization to initiate Phase 1 engagement scopes.
      </p>
    </div>

    <div class="grid-2" style="margin-top: 30px;">
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 20px;">
        <div style="font-weight: 700; color: #0A1E3C; margin-bottom: 40px;">For: ${tenantName}</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 8px;"></div>
        <div style="font-size: 9.5pt; color: #64748B;">Authorized Executive Signature & Date</div>
      </div>
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 20px;">
        <div style="font-weight: 700; color: #0A1E3C; margin-bottom: 40px;">For: Nisol AI Advisory</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 8px;"></div>
        <div style="font-size: 9.5pt; color: #64748B;">Managing Partner / Lead AI Advisor Signature & Date</div>
      </div>
    </div>
  </div>

</body>
</html>
  `;
}
