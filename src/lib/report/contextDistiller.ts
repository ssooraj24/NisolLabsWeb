// src/lib/report/contextDistiller.ts

import { BusinessContextJSON } from "./types";

export function distillBusinessContext(
  companyName: string,
  industry: string,
  rawResponses: Record<string, any>,
  calculatedCapabilityScores: Record<string, number>,
  overallMaturityScore: number
): BusinessContextJSON {
  const readinessPercentage = Math.round((overallMaturityScore / 5) * 100);

  // Identify low scoring sections (< 3.2 out of 5)
  const lowScoringSections = Object.entries(calculatedCapabilityScores)
    .filter(([_, score]) => score < 3.2)
    .map(([section]) => section);

  // Extract explicit text pain points or negative responses from rawResponses
  const topPainPoints: string[] = [];
  let employeeCount = 250;
  let annualRevenueUsd = 15000000;
  let manualTaskHoursPct = 25;
  let primaryCurrency: "INR" | "USD" = "INR";

  Object.entries(rawResponses).forEach(([key, val]) => {
    if (typeof val === "object" && val !== null) {
      if (val.text && typeof val.text === "string" && val.text.trim().length > 10) {
        topPainPoints.push(val.text.trim());
      }
      if (val.notes && typeof val.notes === "string" && val.notes.trim().length > 10) {
        topPainPoints.push(val.notes.trim());
      }

      // Check for employee count or team size
      if (val.employeeCount || val.employees || val.team_size) {
        const parsed = parseInt(val.employeeCount || val.employees || val.team_size, 10);
        if (!isNaN(parsed) && parsed > 0) employeeCount = parsed;
      }

      // Check for manual task hours
      if (val.manual_hours_pct || val.manualHours) {
        const parsed = parseFloat(val.manual_hours_pct || val.manualHours);
        if (!isNaN(parsed) && parsed > 0) manualTaskHoursPct = Math.min(60, Math.max(10, parsed));
      }

      // Currency preference
      if (val.currency && (val.currency === "USD" || val.currency === "INR")) {
        primaryCurrency = val.currency;
      }
    } else if (typeof val === "string") {
      if (key.includes("employee") || key.includes("headcount")) {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed > 0) employeeCount = parsed;
      }
      if (key.includes("currency") && (val === "USD" || val === "INR")) {
        primaryCurrency = val;
      }
    }
  });

  // Default fallback pain points if survey lacked text notes
  if (topPainPoints.length === 0) {
    topPainPoints.push(
      "Manual data extraction and document processing across core operational workflows",
      "Scattered organizational knowledge leading to repetitive inquiries and delayed decisions",
      "Lack of centralized AI governance and systematic PII/security compliance oversight",
      "Siloed legacy data architectures restricting cross-functional intelligence synthesis"
    );
  }

  return {
    companyName: companyName || "Enterprise Client",
    industry: industry || "Cross-Industry / General Operations",
    overallMaturityScore,
    readinessPercentage,
    sectionScores: calculatedCapabilityScores,
    lowScoringSections: lowScoringSections.length > 0 ? lowScoringSections : ["Data Architecture & Silos", "AI Governance & IP"],
    topPainPoints: topPainPoints.slice(0, 5),
    budgetEstimated: primaryCurrency === "INR" ? "₹1.5 - ₹3.0 Crore" : "$200,000 - $400,000",
    timelineEstimated: "12 Months Transformation Horizon",
    strategicGoals: [
      "Accelerate departmental throughput and operational turnaround by 30-40%",
      "Automate high-frequency repetitive manual tasks across sales, support, and finance",
      "Establish enterprise-grade AI governance, DPDP/GDPR compliance, and security oversight",
      "Achieve measurable payback and positive cashflow within 6-9 months"
    ],
    techStackDetected: ["ERP/CRM", "SharePoint/Cloud Document Store", "REST APIs", "SQL Data Warehouse"],
    employeeCount,
    annualRevenueUsd,
    manualTaskHoursPct,
    primaryCurrency,
  };
}
