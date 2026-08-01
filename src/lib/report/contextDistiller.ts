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

  // Identify low scoring sections (< 3.0 out of 5)
  const lowScoringSections = Object.entries(calculatedCapabilityScores)
    .filter(([_, score]) => score < 3.2)
    .map(([section]) => section);

  // Extract explicit text pain points or negative responses from rawResponses
  const topPainPoints: string[] = [];
  Object.values(rawResponses).forEach((val) => {
    if (typeof val === "object" && val !== null) {
      if (val.text && typeof val.text === "string" && val.text.trim().length > 10) {
        topPainPoints.push(val.text.trim());
      }
      if (val.notes && typeof val.notes === "string" && val.notes.trim().length > 10) {
        topPainPoints.push(val.notes.trim());
      }
    }
  });

  // Default fallback pain points if survey lacked text notes
  if (topPainPoints.length === 0) {
    topPainPoints.push(
      "Manual data extraction and document processing across core departments",
      "Scattered organizational knowledge and slow employee response times",
      "Lack of centralized AI governance and security oversight",
      "Siloed legacy databases restricting real-time insights"
    );
  }

  return {
    companyName: companyName || "Enterprise Client",
    industry: industry || "Technology & Operations",
    overallMaturityScore,
    readinessPercentage,
    sectionScores: calculatedCapabilityScores,
    lowScoringSections: lowScoringSections.length > 0 ? lowScoringSections : ["Data Governance", "Model Training"],
    topPainPoints: topPainPoints.slice(0, 5),
    budgetEstimated: "₹1.5 - ₹3.0 Crore",
    timelineEstimated: "12 Months Transformation Horizon",
    strategicGoals: [
      "Accelerate operational throughput by 30%",
      "Automate repetitive manual workflows",
      "Establish enterprise-grade AI security and governance",
      "Achieve measurable ROI within 8 months"
    ],
    techStackDetected: ["ERP/CRM", "SharePoint/Document Store", "REST APIs", "SQL Data Warehouse"]
  };
}
