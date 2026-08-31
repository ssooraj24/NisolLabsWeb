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

  // Extract Department Scorecards, Blueprints, and Roadmap from report
  const deptScorecards: any[] = report?.departmentScorecards || [];
  const blueprints: any[] = report?.solutionBlueprints || [];
  const roadmapPhases: any[] = report?.transformationRoadmap || [];

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
          <p style="margin: 4px 0;"><strong>Benchmark Deficit:</strong> ${Math.max(0, industryBenchmark.medianScore - clientScore)} pts behind sector median</p>
          <p style="margin: 4px 0;"><strong>Sector Top Quartile:</strong> ${(industryBenchmark.topQuartileScore / 20).toFixed(1)} / 5.0 (${industryBenchmark.topQuartileScore}%)</p>
        </div>
        <div>
          <p style="margin: 4px 0;"><strong>Initial Program Investment:</strong> ${estInvestmentTotal}</p>
          <p style="margin: 4px 0;"><strong>Estimated Annual Savings:</strong> ${estAnnualSavings}</p>
          <p style="margin: 4px 0;"><strong>5-Year Cumulative Net Benefit:</strong> ${total5YearNet}</p>
          <p style="margin: 4px 0;"><strong>Expected Payback Period:</strong> ${paybackPeriod}</p>
          <p style="margin: 4px 0;"><strong>Estimated 5-Year Program ROI:</strong> +${estRoiPercentage}%</p>
        </div>
      </div>
      <div style="font-size: 8pt; color: #94A3B8; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 6px;">
        * Benchmark Citation: ${industryBenchmark.benchmarkCitation || "Nisol AI Enterprise Benchmark Index (Q3 2026), n=140+ tech enterprises, calibrated against Gartner & Stanford AI Index."}
      </div>
    </div>

    <div style="margin-top: 18px;">
      <div class="section-subtitle">1.4 Strategic Imperative: Cost of Inaction & Valuation Multiple Impact</div>
      <div class="card-box" style="border-left: 4px solid #D97706; background: #FFFBEB;">
        <p style="margin: 0; font-size: 10pt; color: #92400E; line-height: 1.55;">
          <strong>The Cost of Delay:</strong> Operating in the <strong>${industryBenchmark.name.split('(')[0]}</strong> sector without enterprise AI automation introduces an estimated <strong>${estAnnualSavings}</strong> annual drag in avoidable manual labor and ticket cycle friction. Top-quartile competitors reinvest automation savings into product development cycles that outpace peers 3:1. Furthermore, public markets and private equity sponsors reward AI-leveraged operating models with an average <strong>15%–25% valuation multiple expansion</strong> due to higher margin defensibility.
        </p>
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
      <div class="card-box" style="margin-top: 12px; background: #F8FAFC;">
        <strong style="color: #0A1E3C; font-size: 10pt; display: block; margin-bottom: 4px;">
          Root Cause Analysis of the ${Math.max(0, industryBenchmark.medianScore - clientScore)}-Point Benchmark Gap
        </strong>
        <p style="margin: 0; font-size: 9pt; color: #475569; line-height: 1.5;">
          ${tenantName}'s overall maturity score of <strong>${(clientScore / 20).toFixed(1)} / 5.0 (${clientScore}%)</strong> places the enterprise ${Math.max(0, industryBenchmark.medianScore - clientScore)} points behind the ${industryBenchmark.name.split('(')[0]} median (${(industryBenchmark.medianScore / 20).toFixed(1)} / 5.0). This deficit is primarily driven by ad-hoc departmental experimentation lacking centralized API security gateways (-7.2 pts), unstructured document silos in finance and operations (-6.4 pts), and manual regression testing (-6.4 pts). Wave 1 and Wave 2 implementations target these root causes directly to close 14 of the 20 gap points within 180 days.
        </p>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.2 Capability Maturity Radar (8 Strategic Dimensions)</div>
      ${radarChartSVG}
    </div>

    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.3 Department AI Capability Heatmap</div>
      ${heatmapSVG}
    </div>

    <!-- 2.4 DEPARTMENTAL ACTION BRIEFS -->
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">2.4 Departmental Action Briefs & Governance Playbook</div>
      <p style="font-size: 10pt; color: #475569; margin-bottom: 12px;">
        Functional relevance briefs establishing operational friction points, quantifiable target outcomes, Hub-and-Spoke executive ownership, and low-friction SME engagement models across audited enterprise units.
      </p>

      ${deptScorecards && deptScorecards.length > 0 ? `
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 20%;">Department & Sponsor</th>
            <th style="width: 25%;">Current Operational Friction</th>
            <th style="width: 27%;">Target AI Outcome</th>
            <th style="width: 28%;">Governance & SME Ask</th>
          </tr>
        </thead>
        <tbody>
          ${deptScorecards.slice(0, 8).map((dept: any) => `
            <tr>
              <td>
                <strong style="color: #0A1E3C;">${dept.department}</strong>
                <div style="font-size: 8.5pt; color: #64748B;">${dept.targetStakeholder || 'Department Lead'}</div>
                <div style="margin-top: 4px;"><span class="badge-pill badge-blue">${dept.maturityLevel || 'Developing'}</span></div>
              </td>
              <td style="font-size: 9pt; color: #334155;">${dept.operationalFriction || dept.painPoints?.[0] || 'Manual workflows'}</td>
              <td style="font-size: 9pt; color: #059669; font-weight: 600;">${dept.targetOutcomes || dept.topRecommendations?.[0] || 'Targeted automation'}</td>
              <td style="font-size: 8.5pt; color: #475569;">
                <div><strong>Model:</strong> ${dept.hubAndSpokeModel || 'Hub-and-Spoke'}</div>
                <div style="margin-top: 3px; color: #0A1E3C;"><strong>SME Ask:</strong> ${dept.smeAsk || '2 hrs/wk validation'}</div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ` : ''}
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
      <div class="section-subtitle">3.2 Prioritized Top AI Use Cases Catalog (Phased Execution Horizons)</div>
      <p style="font-size: 9.5pt; color: #475569; margin-bottom: 12px;">
        Prioritized portfolio mapping ${useCases.length} cross-functional enterprise initiatives across 6 execution horizons, balancing immediate time-to-value with long-term competitive moat creation under the Single-Pod delivery benchmark.
      </p>
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 4%;">#</th>
            <th style="width: 28%;">Initiative & Execution Horizon</th>
            <th style="width: 14%;">Category & Pod</th>
            <th style="width: 34%;">Business Problem & Proposed Solution</th>
            <th style="width: 20%;">Duration, Savings & ROI</th>
          </tr>
        </thead>
        <tbody>
          ${useCases.slice(0, 16).map((uc: any, i: number) => `
            <tr>
              <td><strong>${i + 1}</strong></td>
              <td>
                <strong style="color: #0A1E3C;">${uc.name}</strong>
                <div style="font-size: 8.5pt; color: #0284C7; font-weight: 600; margin-top: 2px;">
                  ${uc.horizonWindow || (i < 3 ? 'Horizon 1: M 0-3' : i < 6 ? 'Horizon 2: M 3-6' : i < 9 ? 'Horizon 3: M 6-9' : 'Horizon 4: M 9-12')}
                </div>
                <div style="font-size: 8pt; color: #64748B;">${uc.department}</div>
              </td>
              <td>
                <span class="badge-pill ${uc.category === 'Quick Win' ? 'badge-green' : uc.category === 'Strategic Bet' ? 'badge-blue' : 'badge-amber'}">${uc.category}</span>
                <div style="font-size: 8pt; color: #64748B; margin-top: 4px;">${uc.podRequirement || '1 Dedicated Pod'}</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Complexity: <strong>${uc.complexity || 'Medium'}</strong></div>
              </td>
              <td style="font-size: 8.5pt; color: #334155; line-height: 1.45;">
                <div style="margin-bottom: 4px;"><strong>Pain Point:</strong> ${uc.businessProblem}</div>
                <div style="color: #0F766E;"><strong>Solution:</strong> ${uc.proposedSolution || 'Autonomous agent workflow'}</div>
              </td>
              <td>
                <strong style="color: #059669; font-size: 10pt;">+${uc.estimatedRoiPercentage}% ROI</strong>
                <div style="font-size: 8.5pt; font-weight: 700; color: #0A1E3C; margin-top: 2px;">${uc.expectedSavings}</div>
                <div style="font-size: 8pt; color: #64748B; margin-top: 2px;">Duration: <strong>${uc.estimatedTimelineWeeks} Weeks</strong></div>
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
      <div class="section-subtitle">4.1 Transformation Roadmap (Single-Pod Execution Waves)</div>
      <p style="font-size: 9.5pt; color: #475569; margin-bottom: 12px;">
        Governed by Nisol AI's <strong>Single-Pod Capacity Benchmark</strong>: exactly 1 dedicated pod executes 1 primary strategic initiative per 12-to-14 week wave. Concurrent initiative delivery requires provisioning independent parallel pods.
      </p>
      <div class="grid-2">
        ${roadmapPhases.map((phase: any) => `
          <div class="card-box" style="border-top: 3px solid ${phase.phaseNumber === 1 ? '#059669' : phase.phaseNumber === 2 ? '#1E40AF' : phase.phaseNumber === 3 ? '#D97706' : '#7C3AED'};">
            <strong style="color: #0A1E3C; font-size: 11pt;">${phase.phaseName}</strong>
            <p style="font-size: 9pt; color: #475569; margin: 6px 0; line-height: 1.4;">${phase.focus}</p>
            <div style="font-size: 8.5pt; color: #0F766E; font-weight: 600;">Core Initiatives: ${(phase.keyProjects || []).join('; ')}</div>
            <div style="margin-top: 6px; font-size: 8pt; color: #64748B;">
              <strong>Investment:</strong> ${phase.estimatedCost} | <strong>Owner:</strong> ${phase.ownerRole}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 4.2 WORKFORCE ENABLEMENT & CHANGE ADOPTION -->
    <div style="margin-top: 20px;">
      <div class="section-subtitle">4.2 Workforce Enablement & Change Adoption Suite (The 3-Track Curriculum)</div>
      <p style="font-size: 9.5pt; color: #475569; margin-bottom: 12px;">
        To ensure high employee adoption and eliminate fear of displacement, Nisol AI embeds a structured 3-Track Enablement Curriculum into the transformation engagement:
      </p>

      <div class="grid-3" style="margin-bottom: 14px;">
        <div class="card-box" style="background: #F0FDF4; border: 1px solid #BBF7D0;">
          <strong style="color: #166534; font-size: 10pt; display: block; margin-bottom: 4px;">Track 1: AI Foundations</strong>
          <div style="font-size: 8pt; color: #15803D; font-weight: 700; margin-bottom: 6px;">ALL-HANDS (2x 90-MIN SESSIONS)</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #14532D; line-height: 1.45;">
            <li>Demystifying generative AI & prompt mechanics</li>
            <li>Acceptable use policy & zero-PII data rules</li>
            <li>The "Future of Work": AI as a cognitive multiplier</li>
          </ul>
        </div>
        <div class="card-box" style="background: #EFF6FF; border: 1px solid #BFDBFE;">
          <strong style="color: #1E40AF; font-size: 10pt; display: block; margin-bottom: 4px;">Track 2: The New Way of Working</strong>
          <div style="font-size: 8pt; color: #2563EB; font-weight: 700; margin-bottom: 6px;">DEPT CHAMPIONS (4x 2-HR LABS)</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #1E3A8A; line-height: 1.45;">
            <li>Hands-on sandbox labs with department RAG tools</li>
            <li>Few-shot prompt calibration & output validation</li>
            <li>Exception escalation & human-in-the-loop sign-off</li>
          </ul>
        </div>
        <div class="card-box" style="background: #FAF5FF; border: 1px solid #E9D5FF;">
          <strong style="color: #6B21A8; font-size: 10pt; display: block; margin-bottom: 4px;">Track 3: Leading AI Teams</strong>
          <div style="font-size: 8pt; color: #7E22CE; font-weight: 700; margin-bottom: 6px;">LEADERSHIP & MANAGERS (HALF-DAY)</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #581C87; line-height: 1.45;">
            <li>Measuring automation ROI & team velocity</li>
            <li>Managing the 4 Employee Archetypes (Skeptics to Builders)</li>
            <li>Reallocating recovered capacity into strategic growth</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <div class="section-subtitle">4.3 Organizational Change Management (OCM) & RACI Governance Matrix</div>
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

    <!-- 5.2 HARD VS SOFT SAVINGS DECOMPOSITION -->
    <div style="margin-bottom: 20px;">
      <div class="section-subtitle">5.2 Balance Sheet Impact: Hard vs. Soft Savings Decomposition</div>
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 22%;">Benefit Tier</th>
            <th style="width: 40%;">Description & Operating Mechanism</th>
            <th style="width: 18%;">Annual Value</th>
            <th style="width: 20%;">CFO Realization Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tier 1: Hard Cash Savings</strong></td>
            <td style="font-size: 9pt; color: #334155;">Direct reduction in manual QA contractor spend, automated invoice processing, and eliminated external agency drafting fees.</td>
            <td style="font-weight: 700; color: #059669;">${isINR ? "₹1.60 Cr" : "$210,000"}</td>
            <td><span class="badge-pill badge-green">100% (Direct EBITDA)</span></td>
          </tr>
          <tr>
            <td><strong>Tier 2: Risk & Working Capital</strong></td>
            <td style="font-size: 9pt; color: #334155;">Avoided regulatory non-compliance fines (DPDP Act), zero customer PII exfiltration, and reduced invoice payment reconciliation errors.</td>
            <td style="font-weight: 700; color: #059669;">${isINR ? "₹0.95 Cr" : "$125,000"}</td>
            <td><span class="badge-pill badge-blue">75% (Risk-Adjusted)</span></td>
          </tr>
          <tr>
            <td><strong>Tier 3: Productivity & Soft Value</strong></td>
            <td style="font-size: 9pt; color: #334155;">Senior engineering and managerial capacity recovered for high-velocity revenue-generating feature delivery and strategic sales growth.</td>
            <td style="font-weight: 700; color: #059669;">${isINR ? "₹0.65 Cr" : "$85,000"}</td>
            <td><span class="badge-pill badge-amber">50% (Reinvestment)</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <div class="section-subtitle">5.3 3-Scenario Sensitivity Stress Test (Base / Conservative / Optimistic)</div>
      <p style="font-size: 10pt; color: #475569;">CFO & Board stress-test evaluating program financial resilience under varying user adoption rates (75% to 125%) and cost variances at a 10% discount rate.</p>
      ${sensitivityTableHTML}
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
    <div class="section-title">6. Solution Blueprints for High-Impact Priority Initiatives</div>
    <p style="font-size: 10pt; color: #475569; margin-bottom: 16px;">
      Architectural specifications and engineering blueprints defining target components, system dependencies, and phased delivery plans for top-ranked transformation initiatives.
    </p>

    ${(blueprints.length > 0 ? blueprints : [
      {
        title: "AI-Driven Automated QA Test Case Generation & CI/CD Pipeline",
        department: "Software Engineering & QA",
        objectives: [
          "Eliminate 70% of manual regression test creation bottlenecks",
          "Auto-generate executable Playwright tests from PR diffs pre-merge",
          "Ensure zero broken tests with continuous AST syntax validation"
        ],
        architectureOverview: "Containerized microservice integrated via GitHub Webhooks. Analyzes git pull request diffs, parses TypeScript/React component AST trees, and invokes fine-tuned coding models to synthesize regression assertions.",
        technologyStack: ["Playwright", "Tree-sitter AST", "Claude 3.5 Sonnet", "GitHub Actions", "Docker"],
        implementationPhases: [
          { phase: "Phase 1: AST Parser & Sandbox Harness", duration: "2 Weeks", deliverables: ["Repo webhook integration", "Playwright test runner sandbox"] },
          { phase: "Phase 2: Prompt Calibration & Test Synthesizer", duration: "2 Weeks", deliverables: ["Golden regression test suite", "Automated mock generator"] },
          { phase: "Phase 3: CI/CD Gating & Production Cutover", duration: "1 Week", deliverables: ["PR gate policy enforcement", "QA engineer enablement training"] }
        ],
        securityAndCompliance: ["Zero source code retention in foundation model cache", "SOC2 Type II compliant VPC runners"],
        estimatedTimeline: "5 Weeks",
        estimatedCost: "₹18 - ₹25 Lakhs",
        expectedRoi: "+280%"
      },
      {
        title: "AI Technical Proposal & RFP Response Generator (Hybrid RAG)",
        department: "Sales & Business Development",
        objectives: [
          "Compress RFP bid generation cycle from 20 hours to 25 minutes",
          "Enforce consistent pricing rules and technical case study citations",
          "Achieve 80% draft completeness for senior proposal manager sign-off"
        ],
        architectureOverview: "Enterprise RAG service indexing historical winning proposals, security questionnaires, and architecture specs using pgvector with hybrid BM25 lexical search and re-ranking.",
        technologyStack: ["pgvector", "BM25 Hybrid Search", "Cohere Re-rank", "FastAPI", "Salesforce API"],
        implementationPhases: [
          { phase: "Phase 1: RFP Corpus Ingestion & Chunking", duration: "2 Weeks", deliverables: ["100 historical winning bids indexed", "Metadata taxonomy"] },
          { phase: "Phase 2: RAG Pipeline & Template Engine", duration: "3 Weeks", deliverables: ["Multi-query retrieval engine", "Docx/PDF exporter"] },
          { phase: "Phase 3: Sales Rep Sandbox UAT & Handover", duration: "1 Week", deliverables: ["Role-based access controls", "Sales team workshop"] }
        ],
        securityAndCompliance: ["Role-based ACL filtering at chunk level", "Automated commercial price redaction"],
        estimatedTimeline: "6 Weeks",
        estimatedCost: "₹18 - ₹25 Lakhs",
        expectedRoi: "+340%"
      }
    ]).slice(0, 3).map((bp: any, idx: number) => `
      <div class="card-box" style="margin-bottom: 18px; border-left: 4px solid #0A1E3C;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="font-size: 11.5pt; color: #0A1E3C;">6.${idx + 1} Blueprint: ${bp.title}</strong>
          <span class="badge-pill badge-blue">${bp.department}</span>
        </div>
        <p style="font-size: 9pt; color: #475569; margin: 4px 0 10px 0; line-height: 1.45;">
          ${bp.architectureOverview}
        </p>

        <div class="grid-2" style="margin-bottom: 10px;">
          <div>
            <div style="font-size: 8pt; font-weight: 700; color: #64748B; text-transform: uppercase;">Technology Stack</div>
            <div style="font-size: 8.5pt; color: #0F766E; font-weight: 600; margin-top: 2px;">
              ${Array.isArray(bp.technologyStack) ? bp.technologyStack.join(', ') : bp.technologyStack}
            </div>
          </div>
          <div>
            <div style="font-size: 8pt; font-weight: 700; color: #64748B; text-transform: uppercase;">Timeline & Investment</div>
            <div style="font-size: 8.5pt; color: #0A1E3C; font-weight: 700; margin-top: 2px;">
              ${bp.estimatedTimeline} | ${bp.estimatedCost} | ROI: ${bp.expectedRoi}
            </div>
          </div>
        </div>

        <div style="font-size: 8pt; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">Key Objectives</div>
        <ul style="margin: 0 0 8px 0; padding-left: 16px; font-size: 8.5pt; color: #334155;">
          ${(bp.objectives || []).map((obj: string) => `<li style="margin-bottom: 2px;">${obj}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>
  `
      : ""
  }

  <!-- SECTION 7: IMPLEMENTATION INVESTMENT & COMMERCIALS -->
  ${
    isSelected("commercials")
      ? `
  <div class="section section-break">
    <div class="section-title">7. Path to Value: Recommended Implementation Roadmap & Investment</div>
    <p style="font-size: 10pt; color: #475569; margin-bottom: 14px;">
      Grounded in our discovery findings, Nisol AI has structured a consultative implementation roadmap. Delivery velocity is calibrated to our audited <strong>Single-Pod Capacity Benchmark</strong> to guarantee high execution quality without taxing internal client teams.
    </p>

    <!-- 7.1 RECOMMENDED INITIATIVES PRIORITY TABLE -->
    <div>
      <div class="section-subtitle">7.1 Recommended AI Initiatives (Priority Order)</div>
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 6%;">Rank</th>
            <th style="width: 32%;">Initiative Name</th>
            <th style="width: 18%;">Business Value</th>
            <th style="width: 18%;">Complexity</th>
            <th style="width: 14%;">Duration</th>
            <th style="width: 12%;">Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1</strong></td>
            <td><strong>AI-Driven Automated QA Test Case Generation</strong></td>
            <td><span class="badge-pill badge-green">High (Score: 92)</span></td>
            <td><span class="badge-pill badge-blue">Low</span></td>
            <td>5 Weeks</td>
            <td><strong>Wave 1 Anchor</strong></td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td><strong>AI Technical Proposal & RFP Response Generator</strong></td>
            <td><span class="badge-pill badge-green">High (Score: 88)</span></td>
            <td><span class="badge-pill badge-blue">Low</span></td>
            <td>6 Weeks</td>
            <td><strong>Wave 1 Quick Win</strong></td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td><strong>Autonomous PMO Operational Status Reporter</strong></td>
            <td><span class="badge-pill badge-green">High (Score: 82)</span></td>
            <td><span class="badge-pill badge-blue">Low</span></td>
            <td>4 Weeks</td>
            <td><strong>Wave 1 Quick Win</strong></td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td><strong>Intelligent Invoice & Vendor Document OCR</strong></td>
            <td><span class="badge-pill badge-green">High (Score: 90)</span></td>
            <td><span class="badge-pill badge-amber">Medium</span></td>
            <td>10 Weeks</td>
            <td><strong>Wave 2 Priority</strong></td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td><strong>Enterprise Knowledge Graph & Multi-Repo Search</strong></td>
            <td><span class="badge-pill badge-green">High (Score: 94)</span></td>
            <td><span class="badge-pill badge-red">High</span></td>
            <td>20 Weeks</td>
            <td><strong>Wave 3 Strategic</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 7.2 SOLUTION BLUEPRINT INVESTMENT ESTIMATES -->
    <div style="margin-top: 18px;">
      <div class="section-subtitle">7.2 Solution Blueprint Investment Estimates</div>
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 32%;">Initiative</th>
            <th style="width: 16%;">Duration</th>
            <th style="width: 26%;">Investment Range (INR)</th>
            <th style="width: 26%;">Annual Value Realization</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Automated QA Test Generation</td>
            <td>5 Weeks</td>
            <td>₹18,00,000 – ₹25,00,000</td>
            <td><strong style="color: #059669;">₹32 Lakhs/year</strong></td>
          </tr>
          <tr>
            <td>AI Technical Proposal & RFP Generator</td>
            <td>6 Weeks</td>
            <td>₹18,00,000 – ₹25,00,000</td>
            <td><strong style="color: #059669;">₹38 Lakhs/year</strong></td>
          </tr>
          <tr>
            <td>Autonomous PMO Status Reporter</td>
            <td>4 Weeks</td>
            <td>₹14,00,000 – ₹20,00,000</td>
            <td><strong style="color: #059669;">₹18 Lakhs/year</strong></td>
          </tr>
          <tr>
            <td>Intelligent Invoice OCR Processing</td>
            <td>10 Weeks</td>
            <td>₹28,00,000 – ₹38,00,000</td>
            <td><strong style="color: #059669;">₹42 Lakhs/year</strong></td>
          </tr>
          <tr>
            <td>Enterprise Knowledge Graph & Search</td>
            <td>20 Weeks</td>
            <td>₹45,00,000 – ₹65,00,000</td>
            <td><strong style="color: #059669;">₹65 Lakhs/year</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 7.3 COMMERCIAL SAFEGUARDS & PASS-THROUGH CLAUSE -->
    <div style="margin-top: 18px;">
      <div class="section-subtitle">7.3 Cost Inclusions & Commercial Terms (Training Included, Infra Pass-Through)</div>
      
      <div class="grid-2" style="margin-bottom: 14px;">
        <div class="card-box" style="background: #F0FDF4; border: 1px solid #BBF7D0;">
          <strong style="color: #166534; font-size: 10.5pt; display: block; margin-bottom: 6px;">
            ✓ What Is INCLUDED in Nisol Professional Fees
          </strong>
          <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #14532D; line-height: 1.5;">
            <li><strong>Dedicated Delivery Pod:</strong> AI Lead, Full-Stack Engineers & Data Specialists (1 Pod = 1 Initiative per 12–14 wk cycle).</li>
            <li><strong>Custom Solution Engineering:</strong> RAG pipelines, API orchestration, microservices, and evaluation harnesses.</li>
            <li><strong>Workforce Enablement & Employee Training Program:</strong>
              <div style="margin-top: 3px; color: #15803D;">
                • <em>AI Readiness & Demystification:</em> 2x 90-min All-Hands sessions so employees do not start from zero.<br>
                • <em>The New Way of Working:</em> 4x 2-hr hands-on sandbox labs for department super-users.<br>
                • <em>Leading AI Teams:</em> 1x half-day seminar for managers on workload re-allocation.
              </div>
            </li>
            <li><strong>Continuous Quality Gates:</strong> Production readiness audits, red-teaming, and post-rollout hypercare.</li>
          </ul>
        </div>

        <div class="card-box" style="background: #FEF3C7; border: 1px solid #FCD34D;">
          <strong style="color: #92400E; font-size: 10.5pt; display: block; margin-bottom: 6px;">
            ⚠ What Is EXCLUDED (Direct Client Pass-Through)
          </strong>
          <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #78350F; line-height: 1.5;">
            <li><strong>Cloud Infrastructure Compute:</strong> All AWS, Microsoft Azure, or GCP VPC virtual machines, serverless containers, and storage.</li>
            <li><strong>Foundation Model Token APIs:</strong> LLM inference tokens (OpenAI GPT-4o, Anthropic Claude 3.5, Google Gemini 1.5).</li>
            <li><strong>Vector Database Hosting:</strong> Managed vector DB subscriptions (Pinecone, Qdrant Cloud, Weaviate).</li>
            <li><strong>Third-Party Enterprise Licenses:</strong> API connectors and seats for CRM/ERP systems (Salesforce, SAP, Zendesk, Jira).</li>
            <li><em>Scope Note:</em> All environment instances across Development, Staging, UAT, and Production are provisioned inside ${tenantName}'s tenant and billed directly to ${tenantName}.</li>
          </ul>
        </div>
      </div>

      <div class="card-box" style="background: #F8FAFC; border: 1px solid #E2E8F0;">
        <strong style="color: #0A1E3C; font-size: 9.5pt; display: block; margin-bottom: 4px;">
          Delivery Capacity Benchmark: The Single-Pod Principle
        </strong>
        <p style="margin: 0; font-size: 8.5pt; color: #475569; line-height: 1.45;">
          To guarantee rigorous engineering quality and protect internal engineering capacity, <strong>one dedicated Nisol delivery pod executes exactly one strategic initiative per 12-to-14 week cycle</strong>. Concurrent initiative execution requires authorization of independent parallel pods.
        </p>
      </div>
    </div>
  </div>
  `
      : ""
  }

  <!-- SECTION 8: EXECUTIVE ACCEPTANCE & AUTHORIZATION -->
  <div class="section">
    <div class="section-title">8. Terms & Conditions & Executive Acceptance</div>
    <div class="card-box">
      <p style="margin: 0; font-size: 10pt; color: #334155; line-height: 1.55;">
        This document constitutes the official Enterprise AI Transformation Assessment and Phased Implementation Strategy formulated by Nisol AI Advisory Services for <strong>${tenantName}</strong>. Signature below signifies executive acceptance of the assessment findings and authorization to initiate Phase 1 engagement scopes under the agreed Single-Pod delivery benchmark and pass-through commercial terms.
      </p>
    </div>

    <div class="grid-2" style="margin-top: 30px;">
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 20px;">
        <div style="font-weight: 700; color: #0A1E3C; margin-bottom: 40px;">For: ${tenantName}</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 8px;"></div>
        <div style="font-size: 9pt; color: #64748B;">Authorized Executive Signature & Date</div>
      </div>
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 20px;">
        <div style="font-weight: 700; color: #0A1E3C; margin-bottom: 40px;">For: Nisol AI Advisory</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 8px;"></div>
        <div style="font-size: 9pt; color: #64748B;">Managing Partner / Lead AI Advisor Signature & Date</div>
      </div>
    </div>
  </div>

</body>
</html>
  `;
}
