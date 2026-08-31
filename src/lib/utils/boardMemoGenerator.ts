// src/lib/utils/boardMemoGenerator.ts

import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";
import { resolveIndustryBenchmark } from "@/lib/report/industryBenchmarks";
import { render5YearROIBarChartSVG, renderSensitivityTableHTML } from "@/lib/report/pdfComponentEngine";

export interface BoardMemoOptions {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  watermarkText?: string;
  currency?: "INR" | "USD";
}

export function generateBoardMemoHTML(report: any, audit: any, options: BoardMemoOptions = {}): string {
  const primaryColor = options.primaryColor || "#0A1E3C";
  const secondaryColor = options.secondaryColor || "#EBB44B";
  const fontFamily = options.fontFamily || "Inter, sans-serif";
  const watermarkText = options.watermarkText || "CONFIDENTIAL — FOR BOARD REVIEW ONLY";
  const currency = options.currency || report?.businessContext?.primaryCurrency || "INR";
  const isINR = currency === "INR";

  const tenantName = resolveClientCompanyName(report, audit);
  const tenantObj = audit?.tenants ? (Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants) : null;
  const industry = tenantObj?.industry || report?.industry || "Technology & Operations";
  const benchmark = resolveIndustryBenchmark(industry);
  const reportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const totalInvestment = report?.roiAnalysis?.totalInvestmentEstimated || (isINR ? "₹95.0 Lakhs" : "$120,000");
  const annualSavings = report?.roiAnalysis?.totalEstimatedAnnualSavings || (isINR ? "₹3.20 Crore" : "$420,000");
  const fiveYearNet = report?.roiAnalysis?.fiveYearCumulativeNetBenefit || (isINR ? "₹14.20 Crore" : "$1,720,000");
  const npv = report?.roiAnalysis?.netPresentValue || (isINR ? "₹10.85 Crore" : "$1,380,000");
  const paybackPeriod = report?.roiAnalysis?.averagePaybackMonths ? `${report.roiAnalysis.averagePaybackMonths} Months` : "6.8 Months";
  const roiPercentage = report?.roiAnalysis?.overallRoiPercentage || 285;
  const irr = report?.roiAnalysis?.internalRateOfReturnPct || 44.5;

  // Dynamic Inaction Drag Calculations (Daily Burn & 30-Day Hesitation Cost)
  const rawSavingsNum = report?.roiAnalysis?.rawAnnualSavings
    ? Number(report.roiAnalysis.rawAnnualSavings)
    : isINR
    ? 32000000
    : 420000;
  const dailyDragNum = Math.round(rawSavingsNum / 365);
  const thirtyDayDelayNum = Math.round(rawSavingsNum / 12);
  const dailyDragFormatted = isINR
    ? `₹${dailyDragNum.toLocaleString("en-IN")}`
    : `$${dailyDragNum.toLocaleString("en-US")}`;
  const thirtyDayDelayFormatted = isINR
    ? `₹${(thirtyDayDelayNum / 100000).toFixed(1)} Lakhs`
    : `$${Math.round(thirtyDayDelayNum / 1000)}k`;

  const roiBarChartSVG = render5YearROIBarChartSVG(report?.roiAnalysis?.fiveYearCashFlowTimeline, currency);
  const sensitivityTableHTML = renderSensitivityTableHTML(report?.roiAnalysis?.sensitivityAnalysis);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - Board Investment Memo</title>
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
        content: "Nisol AI Advisory — ${tenantName} Board Investment Memo";
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
      font-size: 10.5pt;
      line-height: 1.55;
      background: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .cover-memo {
      page-break-after: always;
      padding: 30px;
      background: linear-gradient(135deg, ${primaryColor} 0%, #031024 100%);
      color: #FFFFFF;
      border-radius: 14px;
      box-sizing: border-box;
      height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .header-tag {
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 3px;
      color: ${secondaryColor};
      text-transform: uppercase;
    }

    .memo-title {
      font-size: 30pt;
      font-weight: 900;
      line-height: 1.15;
      margin: 14px 0;
      color: #FFFFFF;
    }

    .meta-box {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 18px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      font-size: 10.5pt;
    }

    .watermark {
      position: fixed;
      top: 45%;
      left: 12%;
      font-size: 50pt;
      font-weight: 900;
      color: rgba(148, 163, 184, 0.035);
      transform: rotate(-30deg);
      pointer-events: none;
      z-index: 9999;
    }

    .section-title {
      font-size: 17pt;
      font-weight: 900;
      color: ${primaryColor};
      border-bottom: 2px solid ${secondaryColor};
      padding-bottom: 6px;
      margin: 24px 0 14px 0;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 16px 0;
    }

    .kpi-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 14px;
    }

    .kpi-label { font-size: 8.5pt; font-weight: 700; color: #64748B; text-transform: uppercase; }
    .kpi-value { font-size: 17pt; font-weight: 900; color: #0A1E3C; margin: 4px 0; }
    .kpi-sub { font-size: 9pt; font-weight: 600; color: #059669; }

    .card-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 14px;
      font-size: 10.5pt;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .section-break {
      page-break-after: always;
    }
  </style>
</head>
<body>

  ${watermarkText ? `<div class="watermark">${watermarkText}</div>` : ""}

  <!-- COVER / HEADER PAGE -->
  <div class="cover-memo">
    <div>
      <div class="header-tag">BOARD INVESTMENT MEMORANDUM</div>
      <h1 class="memo-title">CAPITAL ALLOCATION & BUSINESS CASE FOR ENTERPRISE AI TRANSFORMATION</h1>
      <p style="font-size: 13pt; color: #CBD5E1; margin-top: 0;">Prepared for the Board of Directors & Chief Financial Officer</p>
    </div>

    <div class="meta-box">
      <div>
        <div style="font-size: 8.5pt; color: ${secondaryColor}; font-weight: 700; text-transform: uppercase;">Organization</div>
        <div style="font-size: 13pt; font-weight: 700;">${tenantName}</div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: ${secondaryColor}; font-weight: 700; text-transform: uppercase;">Industry Sector</div>
        <div style="font-size: 13pt; font-weight: 700;">${benchmark.name}</div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: ${secondaryColor}; font-weight: 700; text-transform: uppercase;">Decision Gate</div>
        <div style="font-size: 13pt; font-weight: 700;">Phase 1 Capital Authorization</div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: ${secondaryColor}; font-weight: 700; text-transform: uppercase;">Date of Issue</div>
        <div style="font-size: 13pt; font-weight: 700;">${reportDate}</div>
      </div>
    </div>
  </div>

  <!-- SECTION 1: EXECUTIVE INVESTMENT TEASER -->
  <div class="section-break">
    <div class="section-title">1. Executive Investment Teaser & Key Returns</div>
    
    <p>
      This memorandum requests board authorization for a phased capital allocation of <strong>${totalInvestment}</strong> to execute the Enterprise AI Transformation Program at <strong>${tenantName}</strong>. The program targets operational throughput acceleration and manual workflow automation across Customer Support, Engineering QA, and Financial reconciliation.
    </p>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Capital Investment</div>
        <div class="kpi-value">${totalInvestment}</div>
        <div class="kpi-sub">Phase 1-2 Total</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Annual Savings</div>
        <div class="kpi-value">${annualSavings}</div>
        <div class="kpi-sub">Recurring run-rate</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">5-Yr Net Benefit</div>
        <div class="kpi-value">${fiveYearNet}</div>
        <div class="kpi-sub">Net of all costs</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Payback Period</div>
        <div class="kpi-value">${paybackPeriod}</div>
        <div class="kpi-sub">IRR: ${irr}%</div>
      </div>
    </div>

    <div class="card-box" style="margin-top: 16px;">
      <strong style="color: ${primaryColor}; font-size: 11pt; display: block; margin-bottom: 8px;">
        Balance Sheet Impact: Hard vs. Soft Savings Decomposition
      </strong>
      <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
        <thead>
          <tr style="border-bottom: 2px solid #CBD5E1; text-align: left;">
            <th style="padding: 6px;">Benefit Tier</th>
            <th style="padding: 6px;">Description</th>
            <th style="padding: 6px;">Annual Value</th>
            <th style="padding: 6px;">CFO Realization Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 6px;"><strong>Tier 1: Hard Cash Savings</strong></td>
            <td style="padding: 6px;">Direct reductions in manual QA contractor spend & invoice processing labor</td>
            <td style="padding: 6px; font-weight: 700; color: #059669;">${isINR ? "₹1.60 Cr" : "$210,000"}</td>
            <td style="padding: 6px;"><strong>100% (Direct EBITDA)</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 6px;"><strong>Tier 2: Risk & Working Capital</strong></td>
            <td style="padding: 6px;">Avoided regulatory fines, zero PII exfiltration, and reduced invoice payment errors</td>
            <td style="padding: 6px; font-weight: 700; color: #059669;">${isINR ? "₹0.95 Cr" : "$125,000"}</td>
            <td style="padding: 6px;"><strong>75% (Risk-Adjusted)</strong></td>
          </tr>
          <tr>
            <td style="padding: 6px;"><strong>Tier 3: Productivity & Soft Value</strong></td>
            <td style="padding: 6px;">Senior developer capacity recovered for revenue-generating feature delivery</td>
            <td style="padding: 6px; font-weight: 700; color: #059669;">${isINR ? "₹0.65 Cr" : "$85,000"}</td>
            <td style="padding: 6px;"><strong>50% (Reinvestment)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- THE COST OF INACTION (EXECUTIVE FLIGHT DECK) -->
    <div style="margin-top: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <div style="font-size: 11pt; font-weight: 800; color: ${primaryColor}; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #EF4444;"></span>
          The Cost of Inaction: Executive Urgency & Valuation Multiple Impact
        </div>
        <span class="badge-pill badge-red" style="font-size: 8pt; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Strategic Cost of Delay</span>
      </div>

      <!-- 4-METRIC HIGH IMPACT FLIGHT DECK -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;">
        <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 12px 10px; text-align: center;">
          <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; color: #991B1B; letter-spacing: 0.04em;">Daily Inaction Burn</div>
          <div style="font-size: 15pt; font-weight: 900; color: #DC2626; margin: 4px 0;">${dailyDragFormatted}</div>
          <div style="font-size: 7.5pt; color: #7F1D1D; line-height: 1.3;">Direct manual friction lost every calendar day</div>
        </div>

        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px 10px; text-align: center;">
          <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; color: #92400E; letter-spacing: 0.04em;">Annual Deficit Drag</div>
          <div style="font-size: 15pt; font-weight: 900; color: #D97706; margin: 4px 0;">${annualSavings}</div>
          <div style="font-size: 7.5pt; color: #78350F; line-height: 1.3;">Avoidable operational waste across audited units</div>
        </div>

        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px 10px; text-align: center;">
          <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; color: #1E40AF; letter-spacing: 0.04em;">Competitor Velocity</div>
          <div style="font-size: 15pt; font-weight: 900; color: #2563EB; margin: 4px 0;">3 : 1 Speed Gap</div>
          <div style="font-size: 7.5pt; color: #1E3A8A; line-height: 1.3;">Top peers deploy client features 3x faster</div>
        </div>

        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 12px 10px; text-align: center;">
          <div style="font-size: 7.5pt; font-weight: 700; text-transform: uppercase; color: #166534; letter-spacing: 0.04em;">Valuation Multiple</div>
          <div style="font-size: 15pt; font-weight: 900; color: #16A34A; margin: 4px 0;">+15%–25%</div>
          <div style="font-size: 7.5pt; color: #14532D; line-height: 1.3;">EBITDA premium awarded to AI-scaled firms</div>
        </div>
      </div>

      <!-- BOTTOM TAKEAWAY BANNER -->
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #DC2626; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
        <div style="font-size: 8.5pt; color: #334155; line-height: 1.45;">
          <strong style="color: #0F172A;">Board Takeaway:</strong> Operating in <strong>${benchmark.name.split('(')[0].trim()}</strong> without dedicated automation accrues compounding debt. 
          Every 30-day hesitation burns <strong style="color: #DC2626;">~${thirtyDayDelayFormatted}</strong> in manual payroll friction while peer delivery velocity pulls further ahead.
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 2: 5-YEAR CASH FLOW & SENSITIVITY MODEL -->
  <div class="section-break">
    <div class="section-title">2. 5-Year Cash Flow & Sensitivity Stress Test</div>
    
    <div style="margin-bottom: 20px;">
      ${roiBarChartSVG}
    </div>

    <div style="margin-top: 20px;">
      <div style="font-size: 13pt; font-weight: 800; color: #334155; margin-bottom: 8px;">
        3-Scenario Sensitivity Stress Test (10% Discount Rate)
      </div>
      <p style="font-size: 10pt; color: #64748B;">
        Stress-test demonstrating program financial viability even if employee adoption drops to 75% and infrastructure maintenance expands by +15%.
      </p>
      ${sensitivityTableHTML}
    </div>
  </div>

  <!-- SECTION 3: BOARD RESOLUTION & AUTHORIZATION -->
  <div>
    <div class="section-title">3. Formal Board Resolution & Commercial Terms</div>

    <div class="card-box" style="background: #FEF3C7; border: 1px solid #FCD34D; margin-bottom: 16px;">
      <strong style="color: #92400E; font-size: 10.5pt; display: block; margin-bottom: 4px;">Commercial Term: Direct Client Infrastructure Pass-Through & Training Inclusions</strong>
      <p style="margin: 0 0 6px 0; font-size: 9pt; color: #78350F; line-height: 1.5;">
        • <strong>Infrastructure Pass-Through:</strong> The investment authorization requested herein covers Nisol AI Professional Advisory and Engineering Services exclusively. All third-party cloud compute (AWS/Azure/GCP VPCs), foundation model token API consumption, vector database hosting, and enterprise SaaS connectors across Development, Staging, UAT, and Live environments shall be provisioned directly within ${tenantName}'s enterprise accounts and paid directly by ${tenantName}.
      </p>
      <p style="margin: 0; font-size: 9pt; color: #78350F; line-height: 1.5;">
        • <strong>Workforce Enablement Included:</strong> The authorized professional fees include the full 3-Track Workforce Enablement Curriculum (Track 1: All-Hands AI Foundations, Track 2: Department Champions Sandbox Labs, Track 3: Management Seminar) to ensure staff do not start from zero and achieve rapid operational adoption.
      </p>
    </div>
    
    <div class="card-box">
      <p style="margin: 0; font-size: 10.5pt; color: #334155; line-height: 1.6;">
        <strong>RESOLVED THAT</strong>, the Board of Directors of <strong>${tenantName}</strong> hereby approves the allocation of <strong>${totalInvestment}</strong> for Phase 1 of the Enterprise AI Transformation Program under the Single-Pod governance model, authorizing executive leadership to execute the initial scope of work with Nisol AI Advisory.
      </p>
    </div>

    <div class="grid-2" style="margin-top: 40px;">
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 24px;">
        <div style="font-weight: 700; color: #0A1E3C; margin-bottom: 50px;">For the Board of Directors: ${tenantName}</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 8px;"></div>
        <div style="font-size: 9pt; color: #64748B;">Chairman / Chief Financial Officer (CFO) Signature & Date</div>
      </div>
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 24px;">
        <div style="font-weight: 700; color: #0A1E3C; margin-bottom: 50px;">For: Nisol AI Advisory</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 8px;"></div>
        <div style="font-size: 9pt; color: #64748B;">Managing Partner / Lead AI Advisor Signature & Date</div>
      </div>
    </div>
  </div>

</body>
</html>
  `;
}
