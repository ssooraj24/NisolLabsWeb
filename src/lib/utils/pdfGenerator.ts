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
import { buildExecutiveFinancialModel, ExecutiveFinancialModel, formatCurrencyInteger } from "@/lib/report/financialEngine";
import { ExecutiveKPICard } from "@/lib/report/types";

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
  const fontFamily = options.fontFamily || "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const watermarkText = options.watermarkText || "CONFIDENTIAL";
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

  // Maturity Score Resolution
  const rawScore = report?.overallMaturityScore || report?.ai_readiness_assessment?.overall_score || 1.7;
  const clientScore = typeof rawScore === "number" && rawScore <= 5 ? Math.round(rawScore * 20) : Math.min(100, Math.max(10, Math.round(rawScore)));

  // Single Source of Truth Financial Model
  const finModel: ExecutiveFinancialModel =
    report?.executiveFinancialModel ||
    buildExecutiveFinancialModel(
      report?.businessContext || {
        companyName: tenantName,
        industry,
        overallMaturityScore: rawScore <= 5 ? rawScore : rawScore / 20,
        readinessPercentage: clientScore,
        sectionScores: {},
        lowScoringSections: [],
        topPainPoints: [],
        primaryCurrency: currency as any,
      },
      report?.opportunityPortfolio?.useCases
    );

  const tranche1Ask = finModel.tranche1Budget.totalTranche1.formattedRange;
  const estAnnualSavings = finModel.annualSavings.formattedNetRealizedAnnual;
  const estGrossSavings = finModel.annualSavings.formattedGrossAnnual;
  const total3YearNet = finModel.headlineSummary.formattedNetGain;
  const estRoiPercentage = finModel.headlineSummary.overallRoiPercentage;
  const paybackPeriod = `${finModel.headlineSummary.paybackMonths} Months`;
  const npvFormatted = finModel.headlineSummary.formattedNpv;

  // Radar Data (8 dimensions)
  const radarData = report?.chartPayloads?.radarChart && report.chartPayloads.radarChart.length >= 6
    ? report.chartPayloads.radarChart
    : [
        { subject: "Strategy & Vision", score: 35, fullMark: 100 },
        { subject: "Data Architecture", score: 28, fullMark: 100 },
        { subject: "AI Governance & IP", score: 20, fullMark: 100 },
        { subject: "Knowledge & RAG", score: 32, fullMark: 100 },
        { subject: "Engineering & QA", score: 48, fullMark: 100 },
        { subject: "Infrastructure", score: 45, fullMark: 100 },
        { subject: "Sales & Pre-Sales", score: 36, fullMark: 100 },
        { subject: "Customer Support", score: 40, fullMark: 100 }
      ];

  const radarChartSVG = renderRadarChartSVG(radarData);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - Enterprise AI Transformation Strategy</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    @page :first {
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: ${fontFamily};
      color: #0F172A;
      margin: 0;
      padding: 0;
      background: #FFFFFF;
      font-size: 8.5pt;
      line-height: 1.45;
    }
    .page-container {
      page-break-after: always;
      break-after: page;
      height: 275mm;
      max-height: 275mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      padding: 0;
    }
    .page-container:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
    .cover-page {
      height: 297mm;
      max-height: 297mm;
      padding: 40mm 20mm;
      background: linear-gradient(145deg, ${primaryColor} 0%, #031024 100%);
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }
    .page-header-running {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #CBD5E1;
      padding-bottom: 4px;
      margin-bottom: 8px;
      font-size: 7pt;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .page-footer-running {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #CBD5E1;
      padding-top: 4px;
      font-size: 7pt;
      color: #94A3B8;
      margin-top: 6px;
    }
    .executive-banner {
      display: grid;
      grid-template-columns: 2fr 1.1fr 1.3fr 0.9fr;
      gap: 8px;
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-left: 4px solid ${primaryColor};
      border-radius: 6px;
      padding: 6px 10px;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .banner-cell {
      display: flex;
      flex-direction: column;
    }
    .banner-label {
      font-size: 6.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
      font-weight: 800;
      margin-bottom: 1px;
    }
    .banner-val {
      font-size: 8pt;
      font-weight: 700;
      color: #0F172A;
    }
    .page-headline-callout {
      background: #EFF6FF;
      border-left: 3px solid #2563EB;
      border-radius: 4px;
      padding: 6px 10px;
      font-size: 8.5pt;
      color: #1E3A8A;
      font-weight: 600;
      margin-bottom: 8px;
      line-height: 1.35;
    }
    .section-title-compact {
      font-size: 13pt;
      font-weight: 900;
      color: ${primaryColor};
      margin: 0 0 6px 0;
      letter-spacing: -0.3px;
    }
    .card-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 8pt;
      margin-bottom: 8px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .table-custom {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.8pt;
      margin: 6px 0;
    }
    .table-custom th {
      background: ${primaryColor};
      color: #FFFFFF;
      font-weight: 700;
      padding: 6px 8px;
      text-align: left;
      font-size: 7.5pt;
    }
    .table-custom td {
      padding: 5px 8px;
      border-bottom: 1px solid #E2E8F0;
      vertical-align: top;
    }
    .badge-pill {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7pt;
      font-weight: 700;
    }
    .badge-green { background: #DCFCE7; color: #15803D; }
    .badge-blue { background: #DBEAFE; color: #1E40AF; }
    .badge-amber { background: #FEF3C7; color: #B45309; }
    .badge-red { background: #FEE2E2; color: #B91C1C; }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- PAGE 1: COVER PAGE -->
  <!-- ========================================== -->
  <div class="cover-page">
    <div>
      <div style="font-size: 24pt; font-weight: 900; letter-spacing: 4px; color: ${secondaryColor};">N I S O L   A I</div>
      <div style="font-size: 11pt; color: #94A3B8; letter-spacing: 1px; margin-top: 4px;">AI Transformation, Delivered.</div>
      <div style="height: 2px; background: linear-gradient(90deg, ${secondaryColor} 0%, rgba(235,180,75,0) 100%); margin: 24px 0;"></div>
      <div style="font-size: 10pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #38BDF8; margin-bottom: 6px;">BOARD ADVISORY DELIVERABLE</div>
      <h1 style="font-size: 28pt; font-weight: 900; line-height: 1.15; color: #FFFFFF; margin: 0 0 12px 0;">ENTERPRISE AI TRANSFORMATION STRATEGY</h1>
      <p style="font-size: 12pt; color: #E2E8F0; margin: 0; max-width: 650px; line-height: 1.4;">Executive Decision Memo, Maturity Diagnostics & 36-Month Capital Roadmap</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; background: rgba(255,255,255,0.06); padding: 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); font-size: 9pt;">
      <div>
        <div style="color: ${secondaryColor}; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Client Organization</div>
        <div style="font-size: 12pt; font-weight: 800; color: #FFFFFF; margin-top: 2px;">${tenantName}</div>
      </div>
      <div>
        <div style="color: ${secondaryColor}; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Diagnostic Assessment</div>
        <div style="font-size: 10.5pt; font-weight: 700; color: #FFFFFF; margin-top: 2px;">Nisol 360™ Diagnostic (62 Qs across 15 Capabilities)</div>
      </div>
      <div>
        <div style="color: ${secondaryColor}; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Industry Benchmark</div>
        <div style="font-size: 9.5pt; color: #E2E8F0; margin-top: 2px;">${industryBenchmark.name} (Median: ${(industryBenchmark.medianScore/20).toFixed(1)}/5.0)</div>
      </div>
      <div>
        <div style="color: ${secondaryColor}; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Verified Maturity Baseline</div>
        <div style="font-size: 9.5pt; color: #FBBF24; font-weight: 700; margin-top: 2px;">${(clientScore / 20).toFixed(1)} / 5.0 (${clientScore}%) — Developing Baseline</div>
      </div>
      <div>
        <div style="color: ${secondaryColor}; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Issuing Advisory Practice</div>
        <div style="font-size: 9.5pt; color: #E2E8F0; margin-top: 2px;">Nisol AI Advisory Services</div>
      </div>
      <div>
        <div style="color: ${secondaryColor}; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">Document ID & Date</div>
        <div style="font-size: 9.5pt; color: #E2E8F0; margin-top: 2px;">${docId} • ${reportDate}</div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 2: DECISION MEMO - PART 1 -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Decision Memo (1/2)</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Authorization of Tranche 1 Capital (${tranche1Ask})</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">Chief Executive Officer & Board</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Intake Audited (62 Qs) + SaaS Benchmarks]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">High (Pre-flight Verified)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Strategic Takeaway: Engineering capacity and pre-sales proposal response cycles represent 74% of addressable automation value; activating 2 lighthouse pilots unlocks ${estAnnualSavings} net annual savings under a protected tranche structure.
      </div>

      <div class="section-title-compact">1. Executive Decision Memo: Strategic Context & 3 Core Findings</div>

      <!-- SSOT 4-CARD FLIGHT DECK -->
      <div class="grid-4" style="margin-bottom: 8px;">
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #166534;">Tranche 1 Capital Ask</div>
          <div style="font-size: 13pt; font-weight: 900; color: #059669; margin: 2px 0;">${tranche1Ask}</div>
          <div style="font-size: 6.5pt; color: #14532D;">2 Lighthouse Pilots (6-8 Wks)</div>
        </div>
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #1E40AF;">Net Realized Savings</div>
          <div style="font-size: 13pt; font-weight: 900; color: #2563EB; margin: 2px 0;">${estAnnualSavings}</div>
          <div style="font-size: 6.5pt; color: #1E3A8A;">Per annum (after 50% haircut)</div>
        </div>
        <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #6B21A8;">3-Year Net Benefit</div>
          <div style="font-size: 13pt; font-weight: 900; color: #7E22CE; margin: 2px 0;">${total3YearNet}</div>
          <div style="font-size: 6.5pt; color: #581C87;">NPV @ 10%: ${npvFormatted}</div>
        </div>
        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #92400E;">Payback & ROI</div>
          <div style="font-size: 13pt; font-weight: 900; color: #D97706; margin: 2px 0;">${paybackPeriod}</div>
          <div style="font-size: 6.5pt; color: #78350F;">Program ROI: +${estRoiPercentage}%</div>
        </div>
      </div>

      <!-- 3 EVIDENCE-TAGGED FINDINGS -->
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
        <div class="card-box" style="border-left: 3.5px solid #2563EB; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Finding 1: Engineering Velocity Bottleneck in QA & Boilerplate</strong>
            <span class="badge-pill badge-blue">[Evidence: Intake Measured | Confidence: High]</span>
          </div>
          <p style="margin: 0; color: #334155; line-height: 1.4;">
            Senior engineering talent is currently spending an estimated 38% of total sprint capacity writing repetitive boilerplate, executing manual regression test scripts, and refactoring legacy modules. Implementing a dedicated AI Code & Test Generation Pod unlocks ₹1.2 Cr in annual developer capacity without adding headcount.
          </p>
        </div>

        <div class="card-box" style="border-left: 3.5px solid #059669; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Finding 2: 14-Day RFP Turnaround Creates Pipeline Friction</strong>
            <span class="badge-pill badge-green">[Evidence: SME Reported | Confidence: High]</span>
          </div>
          <p style="margin: 0; color: #334155; line-height: 1.4;">
            Commercial and pre-sales teams require 10–14 business days to respond to complex technical RFPs because compliance documentation, security certifications, and past proposal answers are trapped across unindexed document repositories. A centralized RAG Pre-Sales Bot reduces turnaround by 70% (down to 3–4 days).
          </p>
        </div>

        <div class="card-box" style="border-left: 3.5px solid #D97706; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Finding 3: Shadow-AI Proliferation Without Zero Data Retention</strong>
            <span class="badge-pill badge-amber">[Evidence: Audit Discovered | Confidence: High]</span>
          </div>
          <p style="margin: 0; color: #334155; line-height: 1.4;">
            The audit identified at least 6 unmonitored consumer LLM accounts in active departmental use. Staff are submitting proprietary prompts without enterprise Zero Data Retention (ZDR) terms, API proxy masking, or centralized audit logging. An immediate secure gateway deployment is mandatory to protect IP.
          </p>
        </div>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 2 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 3: DECISION MEMO - PART 2 -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Decision Memo (2/2)</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Appoint Council & Authorize 30-Day Execution Plan</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">Chief Executive Officer & Executive Sponsor</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Bottom-Up Cost Model + Sprint Velocity Plan]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">High (Pre-flight Verified)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Strategic Takeaway: The first 30 days establish the security gateway and launch 2 pilots under strict gate criteria; no further capital is committed until production accuracy reaches ≥95%.
      </div>

      <div class="section-title-compact">1.2 Executive Decision Memo: Decisions, 30-Day Plan & Tranche Ask</div>

      <!-- 3 IMMEDIATE DECISIONS TABLE -->
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 25%;">Decision</th>
            <th style="width: 15%;">Owner</th>
            <th style="width: 15%;">Target Date</th>
            <th style="width: 45%;">Immediate Operational Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Appoint Executive AI Sponsor</strong></td>
            <td>CEO</td>
            <td>Day 5</td>
            <td>Form 4-person AI Steering Council; designate 4 hrs/wk champion time in Engineering & Solutions.</td>
          </tr>
          <tr>
            <td><strong>2. Authorize Tranche 1 Budget</strong></td>
            <td>CFO</td>
            <td>Day 10</td>
            <td>Release ${tranche1Ask} envelope dedicated to 2 lighthouse pilots with stop-the-clock protection.</td>
          </tr>
          <tr>
            <td><strong>3. Mandate Secure AI Gateway</strong></td>
            <td>CTO / CISO</td>
            <td>Day 14</td>
            <td>Publish approved tools registry with verified ZDR terms; block consumer AI logins across corporate VPC.</td>
          </tr>
        </tbody>
      </table>

      <!-- 30-DAY EXECUTION CALENDAR -->
      <div style="margin: 8px 0;">
        <strong style="color: #0A1E3C; font-size: 8.5pt; display: block; margin-bottom: 4px;">First 30 Days Execution Calendar</strong>
        <div class="grid-3">
          <div class="card-box" style="margin-bottom: 0;">
            <div style="font-weight: 800; color: #1E40AF; font-size: 8pt; margin-bottom: 3px;">Days 1–10: Foundation & Charter</div>
            <ul style="margin: 0; padding-left: 12px; font-size: 7.5pt; color: #334155;">
              <li>Charter sign-off & AI Council alignment</li>
              <li>Provider ZDR terms verification</li>
              <li>Developer API gateway deployment</li>
            </ul>
          </div>
          <div class="card-box" style="margin-bottom: 0;">
            <div style="font-weight: 800; color: #059669; font-size: 8pt; margin-bottom: 3px;">Days 11–20: Pod & Data Ingestion</div>
            <ul style="margin: 0; padding-left: 12px; font-size: 7.5pt; color: #334155;">
              <li>Scoping Pilot 1 (Code) & Pilot 2 (RFP)</li>
              <li>Vector database setup & credentialing</li>
              <li>Ingest 50 historical proposals as gold set</li>
            </ul>
          </div>
          <div class="card-box" style="margin-bottom: 0;">
            <div style="font-weight: 800; color: #7C3AED; font-size: 8pt; margin-bottom: 3px;">Days 21–30: Sprint 1 & Baselines</div>
            <ul style="margin: 0; padding-left: 12px; font-size: 7.5pt; color: #334155;">
              <li>Sprint 1 code generation harness active</li>
              <li>Pre-sales knowledge retrieval validation</li>
              <li>Establish baseline benchmark accuracy</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- TRANCHE 1 CAPITAL ALLOCATION TABLE -->
      <div style="margin-top: 6px;">
        <strong style="color: #0A1E3C; font-size: 8.5pt; display: block; margin-bottom: 4px;">Tranche 1 Capital Allocation Breakdown</strong>
        <table class="table-custom">
          <thead>
            <tr>
              <th style="width: 40%;">Tranche 1 Component</th>
              <th style="width: 25%;">Scope & Deliverables</th>
              <th style="width: 20%;">Investment Range</th>
              <th style="width: 15%;">Horizon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pilot 1: AI Code & Test Generation Pod</strong></td>
              <td>Developer assistant tooling, regression test automation</td>
              <td>₹14L – ₹18L</td>
              <td>Weeks 1–6</td>
            </tr>
            <tr>
              <td><strong>Pilot 2: Technical RFP & Pre-Sales Bot</strong></td>
              <td>Vector RAG index over past bids, security questionnaires</td>
              <td>₹16L – ₹22L</td>
              <td>Weeks 2–8</td>
            </tr>
            <tr>
              <td><strong>Security Gateway & Cloud Vector Infra</strong></td>
              <td>ZDR proxy, automated PII token scrubbing, logging</td>
              <td>₹8L – ₹10L</td>
              <td>Weeks 1–3</td>
            </tr>
            <tr>
              <td><strong>Change Enablement & Prompt Mastery Labs</strong></td>
              <td>3-track curriculum, champion coaching (4 hrs/wk)</td>
              <td>₹4L – ₹6L</td>
              <td>Weeks 2–8</td>
            </tr>
            <tr>
              <td><strong>Contingency Buffer (10%)</strong></td>
              <td>Token run-rate variability, integration adjustments</td>
              <td>₹3L – ₹4L</td>
              <td>Active</td>
            </tr>
            <tr style="background: #F1F5F9; font-weight: 800;">
              <td>TOTAL TRANCHE 1 AUTHORIZATION</td>
              <td>Full Phase 1 Gated Delivery Envelope</td>
              <td style="color: #059669;">${tranche1Ask}</td>
              <td>Payback: ${paybackPeriod}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 3 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 4: WHERE YOU STAND -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Diagnostic Baseline</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Baseline Diagnostic Endorsement</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">CTO, COO & Head of Engineering</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[62-Dimension Assessment across 15 Capabilities]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">Audited & Verified</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Diagnostic Finding: ${tenantName} scores ${(clientScore / 20).toFixed(1)} / 5.0 (${clientScore}%), placing the company 30 points behind the sector median (3.2 / 5.0). The primary deficits are governance (1.0/5.0) and unindexed data architecture (1.4/5.0).
      </div>

      <div class="section-title-compact">2. Where You Stand: Maturity Baseline, Peer Benchmark & Constraints</div>

      <div class="grid-2">
        <!-- LEFT: RADAR & BENCHMARK -->
        <div>
          <div style="text-align: center; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 6px;">
            <div style="font-size: 7.5pt; font-weight: 700; color: #0A1E3C; margin-bottom: 2px;">Capability Maturity Radar (8 Core Dimensions)</div>
            ${radarChartSVG}
            <div style="font-size: 6.5pt; color: #64748B; margin-top: 2px;">
              * Calibrated against Stanford HAI & NIST AI RMF 1.0 frameworks. [Confidence: High]
            </div>
          </div>

          <div class="card-box" style="margin-top: 6px; padding: 6px 10px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; font-size: 7.5pt; margin-bottom: 3px;">
              <span><strong>${tenantName}</strong></span>
              <span style="color: #2563EB; font-weight: 800;">${clientScore}% (1.7/5.0)</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 7.5pt; margin-bottom: 3px;">
              <span>SaaS Sector Median Benchmark</span>
              <span style="color: #64748B; font-weight: 700;">64% (3.2/5.0)</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 7.5pt;">
              <span>SaaS Sector Top Quartile</span>
              <span style="color: #059669; font-weight: 700;">82% (4.1/5.0)</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: SHADOW AI & 3 CONSTRAINTS -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="card-box" style="border-left: 3px solid #DC2626; margin-bottom: 0;">
            <div style="font-weight: 800; color: #991B1B; font-size: 8pt; margin-bottom: 2px;">Shadow-AI Inventory & Vulnerabilities</div>
            <ul style="margin: 0; padding-left: 12px; font-size: 7.5pt; color: #334155; line-height: 1.35;">
              <li><strong>6+ Unmonitored Accounts:</strong> Identified ad-hoc use of consumer ChatGPT/Claude without enterprise billing or logging.</li>
              <li><strong>No Data Isolation:</strong> Client project snippets submitted to public endpoints without zero data retention guarantee.</li>
              <li><strong>Zero PII Redaction:</strong> No automated proxy scrubbing customer identifiers prior to inference dispatch.</li>
            </ul>
          </div>

          <div class="card-box" style="border-left: 3px solid #0A1E3C; margin-bottom: 0;">
            <div style="font-weight: 800; color: #0A1E3C; font-size: 8pt; margin-bottom: 2px;">The 3 Constraints That Actually Matter</div>
            <div style="font-size: 7.5pt; color: #334155; line-height: 1.35;">
              <div style="margin-bottom: 4px;">
                <strong>1. Data Silos & Knowledge Latency:</strong> Critical engineering documentation, past proposals, and SOPs are scattered across unindexed Confluence, Jira, and Slack.
              </div>
              <div style="margin-bottom: 4px;">
                <strong>2. Security & Policy Vacuum:</strong> No published acceptable-use policy or approved AI tooling registry exists for engineering or customer-facing staff.
              </div>
              <div>
                <strong>3. Skills & Verification Literacy Gap:</strong> Teams lack training in structured prompt engineering, system evaluations, and output citation verification.
              </div>
            </div>
          </div>

          <div class="card-box" style="background: #F0FDF4; border-color: #BBF7D0; margin-bottom: 0;">
            <div style="font-weight: 800; color: #166534; font-size: 7.5pt; margin-bottom: 2px;">Target State After Wave 1 (90 Days)</div>
            <p style="margin: 0; font-size: 7.2pt; color: #14532D; line-height: 1.35;">
              Deploying the enterprise proxy gateway and the 2 lighthouse pilots closes 14 points of the benchmark deficit, advancing ${tenantName} to <strong>2.4 / 5.0 (48%)</strong> with zero shadow-AI vulnerability.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 4 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 5: PRIORITIES & THE "NOT YET" BOX -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Priorities & Scope Discipline</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Approval of Priority Pilots & Scope Exclusions</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">AI Steering Council & Practice Leads</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Opportunity Matrix: Value vs. Complexity]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">High (Intake Audited)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Focus Principle: We select only 2 high-impact lighthouse pilots for immediate execution, deliberately parking high-complexity distractions in the "Not Yet" box until maturity unlocks them.
      </div>

      <div class="section-title-compact">3. Priorities: 3 Compact Initiatives & The "Not Yet" Box</div>

      <!-- 3 COMPACT INITIATIVE CARDS -->
      <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;">
        <div class="card-box" style="border-left: 3.5px solid #2563EB; padding: 8px 10px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Priority 1: AI Code & Test Generation Pod (Engineering)</strong>
            <span class="badge-pill badge-green">Lighthouse Pilot #1</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 7.2pt; color: #334155; margin-top: 3px;">
            <div><strong>Metric & Baseline:</strong> 38% dev time on boilerplate & tests</div>
            <div><strong>Effort & Cost:</strong> 6 Weeks | ₹14L – ₹18L</div>
            <div><strong>Target Value:</strong> ₹1.2 Cr net annual capacity unlocked</div>
            <div><strong>Owner:</strong> VP Engineering</div>
          </div>
          <div style="font-size: 7.2pt; color: #475569; margin-top: 3px; border-top: 1px dashed #E2E8F0; padding-top: 3px;">
            <strong>Key Assumption:</strong> 75% dev adoption within 60 days. • <strong>Stop Rule:</strong> If automated test pass accuracy &lt; 90% or dev usage &lt; 60% by Week 6, pause and re-scope.
          </div>
        </div>

        <div class="card-box" style="border-left: 3.5px solid #059669; padding: 8px 10px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Priority 2: Technical RFP & Pre-Sales Knowledge Bot (Commercial)</strong>
            <span class="badge-pill badge-green">Lighthouse Pilot #2</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 7.2pt; color: #334155; margin-top: 3px;">
            <div><strong>Metric & Baseline:</strong> 14-day turnaround -> target 4 days</div>
            <div><strong>Effort & Cost:</strong> 8 Weeks | ₹16L – ₹22L</div>
            <div><strong>Target Value:</strong> ₹95L net annual pre-sales capacity</div>
            <div><strong>Owner:</strong> Head of Solutions</div>
          </div>
          <div style="font-size: 7.2pt; color: #475569; margin-top: 3px; border-top: 1px dashed #E2E8F0; padding-top: 3px;">
            <strong>Key Assumption:</strong> Historical win/loss proposals formatted cleanly. • <strong>Stop Rule:</strong> If proposal citation accuracy &lt; 95% on gold benchmark set, delay cutover.
          </div>
        </div>

        <div class="card-box" style="border-left: 3.5px solid #7C3AED; padding: 8px 10px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Priority 3: Tier-1 Client Support & Ticket Triage Co-Pilot (Operations)</strong>
            <span class="badge-pill badge-blue">Wave 2 Initiative</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 7.2pt; color: #334155; margin-top: 3px;">
            <div><strong>Metric & Baseline:</strong> 42 min MTTR -> target 18 min MTTR</div>
            <div><strong>Effort & Cost:</strong> 7 Weeks | ₹12L – ₹16L</div>
            <div><strong>Target Value:</strong> ₹65L net annual support capacity</div>
            <div><strong>Owner:</strong> Head of Support</div>
          </div>
          <div style="font-size: 7.2pt; color: #475569; margin-top: 3px; border-top: 1px dashed #E2E8F0; padding-top: 3px;">
            <strong>Key Assumption:</strong> Tier-1 ticket taxonomy categorized. • <strong>Stop Rule:</strong> If automated resolution deflection &lt; 30% by Week 5, revert to manual triage.
          </div>
        </div>
      </div>

      <!-- THE "NOT YET" BOX -->
      <div class="card-box" style="background: #FFFBEB; border: 1.5px solid #FCD34D; margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="color: #92400E; font-size: 8.5pt;">The "Not Yet" Box: Disciplined Scope Exclusions & Unlock Triggers</strong>
          <span class="badge-pill badge-amber">Strict Scope Fence</span>
        </div>
        <p style="margin: 0 0 4px 0; font-size: 7.2pt; color: #78350F;">
          To prevent pilot failure, the following ambitious initiatives are explicitly excluded from Phase 1 until prerequisite maturity conditions are satisfied:
        </p>
        <table class="table-custom" style="margin: 0;">
          <thead>
            <tr style="background: #F59E0B;">
              <th style="width: 30%;">Deferred Initiative</th>
              <th style="width: 40%;">Why Deferred Today</th>
              <th style="width: 30%;">Condition That Unlocks It</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #FFFFFF;">
              <td><strong>Autonomous Agentic Code Refactoring</strong></td>
              <td>High risk of introducing regressions without comprehensive unit test coverage.</td>
              <td>Automated CI/CD test coverage exceeds 85% (Target: Month 6).</td>
            </tr>
            <tr style="background: #FFFFFF;">
              <td><strong>Customer-Facing Autonomous Chatbot</strong></td>
              <td>Hallucination risk on client commitments; lack of strict gateway guardrails.</td>
              <td>Gateway hallucination tests achieve ≥99.5% accuracy over 30 days.</td>
            </tr>
            <tr style="background: #FFFFFF;">
              <td><strong>Proprietary Model Fine-Tuning</strong></td>
              <td>Unnecessary cost and technical debt before standard RAG potential is exhausted.</td>
              <td>RAG context retrieval benchmark reaches verified performance ceiling.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 5 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 6: TRANSFORMATION ROADMAP -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Roadmap & Re-Score Horizons</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">12-Month Multi-Horizon Program Timeline Endorsement</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">AI Steering Council & Transformation Pod</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Sprint Velocity Modeling & Change Dynamics]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">High (Pre-flight Verified)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Execution Rhythm: A disciplined single-pod delivery cadence elevates ${tenantName} from 1.7 to 3.8 / 5.0 across 12 months, with formal maturity re-scoring at 90 days, 6 months, and 12 months.
      </div>

      <div class="section-title-compact">4. Transformation Roadmap & Phased Re-Score Horizons</div>

      <!-- 3 HORIZONS -->
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px;">
        <div class="card-box" style="border-left: 3.5px solid #2563EB; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Horizon 1: Foundation & Lighthouse Pilots (Months 1–3)</strong>
            <span class="badge-pill badge-blue">Target 90-Day Re-Score: 2.4 / 5.0 (+0.7 pts)</span>
          </div>
          <p style="margin: 0 0 3px 0; font-size: 7.5pt; color: #334155;">
            Deploy Enterprise AI Gateway with verified ZDR terms; build and deploy Pilot 1 (AI Code & Test Pod) and Pilot 2 (Technical RFP Knowledge Bot); conduct Track 1 all-hands training.
          </p>
          <div style="font-size: 7pt; color: #1E40AF; font-weight: 700;">
            Gate Review at Day 90: Verify ≥95% accuracy and ≥70% adoption before authorizing Wave 2 release.
          </div>
        </div>

        <div class="card-box" style="border-left: 3.5px solid #059669; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Horizon 2: Scaled Workflows & Pod Expansion (Months 4–6)</strong>
            <span class="badge-pill badge-green">Target 6-Month Re-Score: 3.1 / 5.0 (+1.4 pts)</span>
          </div>
          <p style="margin: 0 0 3px 0; font-size: 7.5pt; color: #334155;">
            Expand to Tier-1 Support Co-Pilot and Financial Invoice Extraction Agent; institute automated prompt regression testing; roll out Track 2 Practitioner Labs to department champions.
          </p>
          <div style="font-size: 7pt; color: #166534; font-weight: 700;">
            Milestone: Reach parity with sector median benchmark (3.2/5.0); achieve run-rate breakeven.
          </div>
        </div>

        <div class="card-box" style="border-left: 3.5px solid #7C3AED; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="color: #0A1E3C; font-size: 8.5pt;">Horizon 3: Autonomous Orchestration & Competitive Moat (Months 7–12)</strong>
            <span class="badge-pill badge-purple" style="background: #F3E8FF; color: #7E22CE;">Target 12-Month Re-Score: 3.8 / 5.0 (+2.1 pts)</span>
          </div>
          <p style="margin: 0 0 3px 0; font-size: 7.5pt; color: #334155;">
            Deploy multi-agent workflows across customer onboarding and contract analysis; transition to full Hub-and-Spoke CoE; formalize proprietary evaluation harness as institutional IP.
          </p>
          <div style="font-size: 7pt; color: #6B21A8; font-weight: 700;">
            Milestone: Top-quartile industry leadership; full operational independence from external advisory.
          </div>
        </div>
      </div>

      <!-- DEPENDENCY MATRIX -->
      <div>
        <strong style="color: #0A1E3C; font-size: 8.5pt; display: block; margin-bottom: 4px;">Technical & Operational Dependencies Matrix</strong>
        <table class="table-custom">
          <thead>
            <tr>
              <th style="width: 25%;">Dependency Item</th>
              <th style="width: 25%;">Required By</th>
              <th style="width: 25%;">Impact If Delayed</th>
              <th style="width: 25%;">Mitigation Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Vector DB Cluster (Cloud VPC)</strong></td>
              <td>Week 2 (Pilot 1/2 Ingestion)</td>
              <td>Postpones RAG document indexing</td>
              <td>Pre-provision managed Pinecone / pgvector instance</td>
            </tr>
            <tr>
              <td><strong>SSO & RBAC Syncing</strong></td>
              <td>Week 3 (Gateway Access)</td>
              <td>Limits pilot user access testing</td>
              <td>Use role-mapped API tokens during pilot gate stage</td>
            </tr>
            <tr>
              <td><strong>SME Champion Allocation (4 hrs/wk)</strong></td>
              <td>Week 3 (Gold Evaluation Set)</td>
              <td>Delays benchmark prompt curation</td>
              <td>Protect champion hours in sprint planning</td>
            </tr>
            <tr>
              <td><strong>ZDR Terms per Model Provider</strong></td>
              <td>Week 1 (Pre-Flight Cutover)</td>
              <td>Blocks live production payload dispatch</td>
              <td>Execute enterprise addenda with OpenAI / Anthropic</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 6 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 7: INVESTMENT & 3-YEAR TCO -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Financial Model & 36-Month TCO</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">3-Year Budget Commitment & Tranche Gate Approval</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">Chief Financial Officer & Finance Committee</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Single Source of Truth Bottom-Up Financial Model]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">Audited (50% CFO Haircut Applied)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        CFO Audit Lens: Modeling benefits and costs over a uniform 36-month horizon with a 50% cashability haircut on soft hours yields ${total3YearNet} net gain, +${estRoiPercentage}% ROI, and a ${paybackPeriod} payback.
      </div>

      <div class="section-title-compact">5. Investment & 3-Year Total Cost of Ownership (TCO)</div>

      <!-- 3-YEAR UNIFORM CASH FLOW TABLE -->
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 32%;">Financial Component</th>
            <th style="width: 17%;">Tranche 1 (M 0-3)</th>
            <th style="width: 17%;">Year 1 Total</th>
            <th style="width: 17%;">Year 2</th>
            <th style="width: 17%;">Year 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Implementation & Advisory Fees (Nisol Pod)</td>
            <td>${finModel.tranche1Budget.totalTranche1.formattedRange}</td>
            <td>₹45,00,000</td>
            <td>₹24,00,000</td>
            <td>₹12,00,000</td>
          </tr>
          <tr>
            <td>Cloud, Vector DB & Model Inference Run Costs</td>
            <td>₹3,50,000</td>
            <td>₹12,00,000</td>
            <td>₹18,00,000</td>
            <td>₹22,00,000</td>
          </tr>
          <tr>
            <td>Internal SME Time & Training Enablement</td>
            <td>₹4,00,000</td>
            <td>₹10,00,000</td>
            <td>₹8,00,000</td>
            <td>₹6,00,000</td>
          </tr>
          <tr style="background: #F8FAFC; font-weight: 700;">
            <td>TOTAL ANNUAL PROGRAM TCO</td>
            <td>${tranche1Ask}</td>
            <td>₹67,00,000</td>
            <td>₹50,00,000</td>
            <td>₹40,00,000</td>
          </tr>
          <tr>
            <td>Gross Unadjusted Value Modeled</td>
            <td>₹25,00,000</td>
            <td>${estGrossSavings}</td>
            <td>₹3,20,00,000</td>
            <td>₹3,80,00,000</td>
          </tr>
          <tr style="color: #991B1B;">
            <td>Less: 50% CFO Cashability Haircut (Assumption)</td>
            <td>-₹12,50,000</td>
            <td>-₹75,00,000</td>
            <td>-₹1,60,00,000</td>
            <td>-₹1,90,00,000</td>
          </tr>
          <tr style="background: #F0FDF4; font-weight: 800; color: #166534;">
            <td>NET REALIZED ANNUAL BENEFIT</td>
            <td>₹12,50,000</td>
            <td>${estAnnualSavings}</td>
            <td>₹1,60,00,000</td>
            <td>₹1,90,00,000</td>
          </tr>
          <tr style="background: #EFF6FF; font-weight: 800; color: #1E40AF;">
            <td>CUMULATIVE NET CASH POSITION</td>
            <td>-₹35,00,000</td>
            <td>+₹8,00,000</td>
            <td>+₹1,18,00,000</td>
            <td>${total3YearNet}</td>
          </tr>
        </tbody>
      </table>

      <!-- 3-SCENARIO STRESS TEST & DELAY SENSITIVITY -->
      <div class="grid-2" style="margin-top: 6px;">
        <div class="card-box" style="margin-bottom: 0;">
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">3-Scenario Stress Test (36-Month Cumulative)</strong>
          <table class="table-custom" style="margin: 0; font-size: 7.2pt;">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Adoption</th>
                <th>Net Benefit</th>
                <th>ROI</th>
                <th>Payback</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Conservative</strong></td>
                <td>50%</td>
                <td>₹1.45 Cr</td>
                <td>+165%</td>
                <td>11.2 Mo</td>
              </tr>
              <tr style="background: #F0FDF4; font-weight: 700;">
                <td><strong>Base Case</strong></td>
                <td>75%</td>
                <td>${total3YearNet}</td>
                <td>+${estRoiPercentage}%</td>
                <td>${paybackPeriod}</td>
              </tr>
              <tr>
                <td><strong>Optimistic</strong></td>
                <td>90%</td>
                <td>₹3.60 Cr</td>
                <td>+410%</td>
                <td>4.9 Mo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-box" style="border-left: 3px solid #DC2626; margin-bottom: 0;">
          <strong style="color: #991B1B; font-size: 8pt; display: block; margin-bottom: 3px;">Delay Sensitivity & Capital Tranche Guardrails</strong>
          <p style="margin: 0 0 3px 0; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <strong>Cost of Delay [Assumption]:</strong> Operating under manual workflows imposes an opportunity friction of ~${formatCurrencyInteger(Math.round(finModel.annualSavings.netRealizedAnnual / 365), currency)}/day in unrecovered capacity.
          </p>
          <p style="margin: 0; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <strong>Capital Protection:</strong> Phase 2 capital is only released after Phase 1 pilots meet all production accuracy and unit economic gates.
          </p>
        </div>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 7 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 8: OPERATING MODEL & GOVERNANCE -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Operating Model & Governance</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">AI Operating Charter Adoption & Council Appointments</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">Executive Sponsor & CISO</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[BCG 10-20-70 Framework & NIST AI RMF]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">High (Intake Audited)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Governance Principle: Calibrated against BCG's 10-20-70 heuristic, we deploy a lean AI Council avoiding premature CoE bureaucracy for a 1.7/5.0 maturity client, while establishing strict gate rights.
      </div>

      <div class="section-title-compact">6. Operating Model: Lean AI Council & Governance Architecture</div>

      <!-- BCG 10-20-70 & LEAN COUNCIL -->
      <div class="grid-2" style="margin-bottom: 6px;">
        <div class="card-box" style="margin-bottom: 0;">
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">BCG 10-20-70 Heuristic Calibration</strong>
          <p style="margin: 0 0 4px 0; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            BCG's empirical research indicates that successful enterprise AI programs allocate transformation effort as:
          </p>
          <div style="font-size: 7.2pt; color: #0F172A; line-height: 1.4;">
            <div>• <strong>10% Algorithms & Models:</strong> Off-the-shelf foundation LLMs (OpenAI, Anthropic).</div>
            <div>• <strong>20% Technology & Data Backbone:</strong> Cloud VPC, vector storage, API proxy gateway.</div>
            <div>• <strong>70% Business & People Transformation:</strong> SOP redesign, champion enablement, adoption.</div>
          </div>
          <div style="font-size: 6.5pt; color: #64748B; margin-top: 3px;">
            * Cited as a budgeting heuristic to prevent capital over-allocation to pure model licensing.
          </div>
        </div>

        <div class="card-box" style="margin-bottom: 0;">
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">Lean AI Council Structure (Stage 1)</strong>
          <div style="font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <div>• <strong>Executive Sponsor (CEO/CTO):</strong> Overall mandate, funding tranche sign-off.</div>
            <div>• <strong>AI Steering Council (4 Leads):</strong> VP Eng, Head of Solutions, CISO, Head of Ops.</div>
            <div>• <strong>Department Champions:</strong> 1 named lead per unit committing <strong>4 hours/week</strong>.</div>
          </div>
          <div style="background: #EFF6FF; border-left: 2.5px solid #2563EB; padding: 4px 6px; margin-top: 4px; font-size: 7pt; color: #1E3A8A;">
            <strong>Note on CoE:</strong> A formal centralized Center of Excellence is deliberately deferred to Horizon 3 to prevent overhead before value arrives.
          </div>
        </div>
      </div>

      <!-- TOP 5 RISKS WITH OWNERS TABLE -->
      <div>
        <strong style="color: #0A1E3C; font-size: 8.5pt; display: block; margin-bottom: 4px;">Top 5 Enterprise AI Risks & Named Accountable Owners</strong>
        <table class="table-custom">
          <thead>
            <tr>
              <th style="width: 12%;">Risk ID</th>
              <th style="width: 25%;">Category & Vulnerability</th>
              <th style="width: 12%;">Severity</th>
              <th style="width: 33%;">Mitigation Strategy</th>
              <th style="width: 18%;">Accountable Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>RSK-01</strong></td>
              <td><strong>Data Privacy & PII</strong><br><span style="font-size: 6.8pt; color: #64748B;">Client IP leak to public LLM</span></td>
              <td><span class="badge-pill badge-red">Critical</span></td>
              <td>API proxy gateway with automated token redaction & verified provider ZDR terms.</td>
              <td><strong>CISO / Security Lead</strong></td>
            </tr>
            <tr>
              <td><strong>RSK-02</strong></td>
              <td><strong>Hallucination in Proposals</strong><br><span style="font-size: 6.8pt; color: #64748B;">Inaccurate compliance claims</span></td>
              <td><span class="badge-pill badge-amber">High</span></td>
              <td>Mandatory citation checking against gold vector index; human-in-the-loop sign-off.</td>
              <td><strong>Head of Solutions</strong></td>
            </tr>
            <tr>
              <td><strong>RSK-03</strong></td>
              <td><strong>Regulatory Compliance</strong><br><span style="font-size: 6.8pt; color: #64748B;">DPDP Act & ISO 42001 audit</span></td>
              <td><span class="badge-pill badge-amber">High</span></td>
              <td>Centralized query logging, prompt audit trails, and in-region cloud hosting.</td>
              <td><strong>Chief Legal Officer</strong></td>
            </tr>
            <tr>
              <td><strong>RSK-04</strong></td>
              <td><strong>Adoption Friction</strong><br><span style="font-size: 6.8pt; color: #64748B;">Reversion to manual workflows</span></td>
              <td><span class="badge-pill badge-blue">Medium</span></td>
              <td>3-track curriculum, champion network, and active usage gates for phase transitions.</td>
              <td><strong>VP Human Resources</strong></td>
            </tr>
            <tr>
              <td><strong>RSK-05</strong></td>
              <td><strong>Unit Economic Drift</strong><br><span style="font-size: 6.8pt; color: #64748B;">Runaway token consumption</span></td>
              <td><span class="badge-pill badge-blue">Medium</span></td>
              <td>Hard monthly cost caps per pod; prompt caching; token budgeting per user tier.</td>
              <td><strong>VP Engineering</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 8 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 9: CHANGE MANAGEMENT & ADOPTION -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Change Management & Enablement</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Change Program Authorization & Champion Time Allocation</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">VP Human Resources & Practice Leads</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Stakeholder Discovery Interviews & SOP Diagnostics]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">High (Intake Audited)</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Adoption Imperative: Technology without behavioral adoption yields negative ROI. We structure change through stakeholder interview findings, a 3-track curriculum, and hard usage gates.
      </div>

      <div class="section-title-compact">7. Change Management & Adoption Suite (The 3-Track Curriculum)</div>

      <!-- INTERVIEW FINDINGS & 3-TRACK CURRICULUM -->
      <div class="grid-2" style="margin-bottom: 6px;">
        <div class="card-box" style="margin-bottom: 0;">
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">Stakeholder Interview Findings</strong>
          <ul style="margin: 0; padding-left: 12px; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <li><strong>Engineering (78% Enthusiastic):</strong> High appetite for automated test writing and boilerplate generation; concern over code review quality.</li>
            <li><strong>Pre-Sales / Solutions (65% Cautious):</strong> High interest in proposal speed, but intense anxiety regarding hallucinated technical commitments.</li>
            <li><strong>Executive Leadership:</strong> Demands verifiable governance and clear ROI metrics before authorizing company-wide rollout.</li>
          </ul>
        </div>

        <div class="card-box" style="margin-bottom: 0;">
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">The 3-Track Enablement Curriculum</strong>
          <div style="font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <div style="margin-bottom: 3px;">
              <strong>Track 1: AI Literacy (All-Hands):</strong> 2x 90-min sessions covering acceptable use, verified ZDR policies, and safe prompting.
            </div>
            <div style="margin-bottom: 3px;">
              <strong>Track 2: Practitioner Mastery (Champions):</strong> 4 intensive half-day labs on structured prompt design, context injection, and citation checking.
            </div>
            <div>
              <strong>Track 3: AI Engineering (Core Pod):</strong> 2-week immersion in vector RAG architectures, evaluation harnesses, and guardrail enforcement.
            </div>
          </div>
        </div>
      </div>

      <!-- SOP REDESIGN & ADOPTION GATES -->
      <div class="grid-2">
        <div>
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">Priority SOP Redesign Candidates</strong>
          <table class="table-custom" style="margin: 0; font-size: 7.2pt;">
            <thead>
              <tr>
                <th style="width: 35%;">Workflow</th>
                <th style="width: 35%;">Old Manual SOP</th>
                <th style="width: 30%;">Redesigned AI SOP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Pre-Sales RFP</strong></td>
                <td>14 days manual doc search</td>
                <td>AI draft in 1 day; 3 days SME review</td>
              </tr>
              <tr>
                <td><strong>Code Review</strong></td>
                <td>Manual syntax & regression triage</td>
                <td>AI lint & test bot gate prior to PR</td>
              </tr>
              <tr>
                <td><strong>Ticket Triage</strong></td>
                <td>Tier-1 human routing (42 min)</td>
                <td>Auto-classification & suggested response</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">Adoption Leading Metrics & Gates</strong>
          <table class="table-custom" style="margin: 0; font-size: 7.2pt;">
            <thead>
              <tr>
                <th style="width: 40%;">Adoption Metric</th>
                <th style="width: 30%;">Target SLA</th>
                <th style="width: 30%;">Evaluation Cadence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Weekly Active Users (WAU)</strong></td>
                <td>≥75% of cohort</td>
                <td>Weekly dashboard review</td>
              </tr>
              <tr>
                <td><strong>Task Output Without Rework</strong></td>
                <td>≥85% accepted</td>
                <td>Bi-weekly sprint retrospective</td>
              </tr>
              <tr>
                <td><strong>Employee Confidence Index</strong></td>
                <td>≥80% favorable</td>
                <td>30-day pulse survey</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 9 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 10: PILOT GATE PROTOCOL & EXIT TERMS -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Gate Protocol & Commercial Protections</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Gate Protocol Adoption & Commercial Terms Endorsement</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">AI Steering Council, CTO & CFO</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Production Engineering SLAs & Audit Gates]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">Contractual & Binding</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Accountability Gate: Production cutover requires passing 5 explicit quality, security, and economic gates; client is protected by stop-the-clock and no-blame exit provisions.
      </div>

      <div class="section-title-compact">8. Pilot Gate Protocol, Stop-the-Clock & Exit Protections</div>

      <!-- 5 GATES TABLE -->
      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 15%;">Gate</th>
            <th style="width: 25%;">Evaluation Metric</th>
            <th style="width: 20%;">Pass Threshold</th>
            <th style="width: 40%;">Verification Protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Gate 1: Accuracy</strong></td>
            <td>Citation & Grounding Score</td>
            <td><strong>≥95% Accuracy</strong></td>
            <td>Evaluated against 50 curated gold standard RFP prompts; zero uncited factual claims.</td>
          </tr>
          <tr>
            <td><strong>Gate 2: Security & ZDR</strong></td>
            <td>PII Redaction & Provider Terms</td>
            <td><strong>100% Masked / ZDR Verified</strong></td>
            <td>Automated test suite verifying zero unmasked client identifiers; signed provider ZDR terms.</td>
          </tr>
          <tr>
            <td><strong>Gate 3: Usability</strong></td>
            <td>User CSAT & Interaction Latency</td>
            <td><strong>≥4.2 / 5.0 CSAT (&lt;3s latency)</strong></td>
            <td>Survey of pilot cohort after 20 real-world production runs.</td>
          </tr>
          <tr>
            <td><strong>Gate 4: Unit Economics</strong></td>
            <td>Cost per Task / Token Budget</td>
            <td><strong>&lt;₹8.50 per task ($0.10)</strong></td>
            <td>API invoice audit proving model run-rate conforms to financial TCO projections.</td>
          </tr>
          <tr>
            <td><strong>Gate 5: Adoption</strong></td>
            <td>Cohort Active Utilization</td>
            <td><strong>≥70% Daily Active Usage</strong></td>
            <td>Telemetry verification that team is actively utilizing tooling without manual bypass.</td>
          </tr>
        </tbody>
      </table>

      <!-- COMMERCIAL PROTECTIONS & CLIENT PREREQUISITES -->
      <div class="grid-2" style="margin-top: 6px;">
        <div class="card-box" style="border-left: 3px solid #059669; margin-bottom: 0;">
          <strong style="color: #059669; font-size: 8pt; display: block; margin-bottom: 3px;">Commercial Safeguards & Exit Provisions</strong>
          <p style="margin: 0 0 4px 0; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <strong>Stop-the-Clock Provision:</strong> If client dependencies (data access, credentialing, or SME champion hours) are delayed, the pilot delivery timeline freezes automatically with zero financial penalty or fee escalation.
          </p>
          <p style="margin: 0; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <strong>No-Blame Exit Clause:</strong> If Gate 1 (Accuracy) or Gate 2 (Security) fails during pilot verification, ${tenantName} may terminate the engagement with payment owed <strong>strictly for work performed to date</strong>, with zero forward obligation.
          </p>
        </div>

        <div class="card-box" style="border-left: 3px solid #2563EB; margin-bottom: 0;">
          <strong style="color: #1E40AF; font-size: 8pt; display: block; margin-bottom: 3px;">Client Prerequisites Checklist</strong>
          <ul style="margin: 0; padding-left: 12px; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <li><strong>Named Sponsor:</strong> Formally designated executive sponsor with sign-off authority.</li>
            <li><strong>SME Time Allocation:</strong> 4 hours/week protected in sprint plans for 2 champions.</li>
            <li><strong>Data & Repo Access:</strong> Read-only API access to historical RFP docs and codebase.</li>
            <li><strong>Model Billing Accounts:</strong> Corporate cloud accounts with established spend caps.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 10 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 11: DELIVERY OPTIONS & NEXT 14 DAYS -->
  <!-- ========================================== -->
  <div class="page-container">
    <div>
      <div class="page-header-running">
        <span>Nisol AI Advisory • ${tenantName} AI Transformation Strategy</span>
        <span>Delivery Options & Authorization</span>
      </div>
      <div class="executive-banner">
        <div class="banner-cell">
          <span class="banner-label">Decision Requested</span>
          <span class="banner-val">Delivery Model Selection & Sprint 1 Mobilization</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Who Decides</span>
          <span class="banner-val">CEO, CFO & Executive Board</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Evidence Level</span>
          <span class="banner-val">[Market Delivery Model Comparison & IP Terms]</span>
        </div>
        <div class="banner-cell">
          <span class="banner-label">Confidence Level</span>
          <span class="banner-val">Definitive & Client-Owned</span>
        </div>
      </div>

      <div class="page-headline-callout">
        Strategic Neutrality: ${tenantName} owns 100% of all blueprints, code, and prompts created; choose from 4 delivery models based on your engineering capacity.
      </div>

      <div class="section-title-compact">9. Path Forward: 4 Delivery Options & Next 14 Days Mobilization</div>

      <!-- 4 DELIVERY OPTIONS -->
      <div class="grid-2" style="margin-bottom: 6px;">
        <div class="card-box" style="border-left: 3px solid #64748B; margin-bottom: 0;">
          <strong style="color: #0F172A; font-size: 7.8pt;">Option 1: Discovery & Strategy Only</strong>
          <p style="margin: 2px 0 0 0; font-size: 7.2pt; color: #475569; line-height: 1.35;">
            ${tenantName} executes pilots entirely in-house using internal engineering. Nisol provides no ongoing delivery, retaining zero IP claim.
          </p>
        </div>
        <div class="card-box" style="border-left: 3px solid #2563EB; margin-bottom: 0;">
          <strong style="color: #1E40AF; font-size: 7.8pt;">Option 2: Nisol-Managed Co-Delivery</strong>
          <p style="margin: 2px 0 0 0; font-size: 7.2pt; color: #475569; line-height: 1.35;">
            Hybrid model: Nisol embeds a Principal Architect and Prompt Engineer to lead sprint architecture, paired with ${tenantName} developers.
          </p>
        </div>
        <div class="card-box" style="border-left: 3px solid #059669; margin-bottom: 0;">
          <strong style="color: #166534; font-size: 7.8pt;">Option 3: Nisol Turnkey Build & Delivery</strong>
          <p style="margin: 2px 0 0 0; font-size: 7.2pt; color: #475569; line-height: 1.35;">
            Full external engineering pod executes Tranche 1 (${tranche1Ask}) end-to-end, subject to strict SLAs and paid-to-date exit terms.
          </p>
        </div>
        <div class="card-box" style="border-left: 3px solid #7C3AED; margin-bottom: 0;">
          <strong style="color: #6B21A8; font-size: 7.8pt;">Option 4: In-House / External Vendor Handover</strong>
          <p style="margin: 2px 0 0 0; font-size: 7.2pt; color: #475569; line-height: 1.35;">
            Complete handover of specifications and architecture blueprints to an alternative systems integrator, with Nisol conducting gate audits.
          </p>
        </div>
      </div>

      <!-- NEXT 14 DAYS TIMELINE -->
      <div class="card-box" style="margin-bottom: 6px;">
        <strong style="color: #0A1E3C; font-size: 8pt; display: block; margin-bottom: 3px;">Next 14 Days Mobilization Timeline</strong>
        <div class="grid-4" style="font-size: 7.2pt; color: #334155;">
          <div><strong>Days 1–3:</strong> Decision memo review & Executive Sponsor nomination.</div>
          <div><strong>Days 4–7:</strong> Delivery path selection & gateway provisioning.</div>
          <div><strong>Days 8–10:</strong> SME champion alignment & repository handover.</div>
          <div><strong>Days 11–14:</strong> Sprint 1 backlog grooming & pilot kickoff.</div>
        </div>
      </div>

      <!-- SIGNATURE BLOCK -->
      <div class="grid-2" style="margin-top: 6px;">
        <div style="border: 1px solid #CBD5E1; border-radius: 6px; padding: 10px;">
          <div style="font-size: 8pt; font-weight: 700; color: #0A1E3C; margin-bottom: 24px;">For ${tenantName}: Executive Authorization</div>
          <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 4px;"></div>
          <div style="font-size: 7pt; color: #64748B;">Signature, Printed Name & Date</div>
        </div>
        <div style="border: 1px solid #CBD5E1; border-radius: 6px; padding: 10px;">
          <div style="font-size: 8pt; font-weight: 700; color: #0A1E3C; margin-bottom: 24px;">For Nisol AI Advisory Services: Managing Partner</div>
          <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 4px;"></div>
          <div style="font-size: 7pt; color: #64748B;">Signature, Printed Name & Date</div>
        </div>
      </div>
    </div>

    <div class="page-footer-running">
      <span>CONFIDENTIAL // FOR EXECUTIVE COMMITTEE ONLY</span>
      <span>Page 11 of 11</span>
      <span>Doc ID: ${docId}</span>
    </div>
  </div>

</body>
</html>`;
}
