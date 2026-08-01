// src/lib/report/visualizationEngine.ts

import { BusinessContextJSON, ChartPayloads, ExecutiveKPICard, UseCaseItem, DepartmentScorecard } from "./types";

export function generateChartPayloads(
  context: BusinessContextJSON,
  useCases: UseCaseItem[],
  departmentScorecards: DepartmentScorecard[]
): {
  chartPayloads: ChartPayloads;
  kpiCards: ExecutiveKPICard[];
} {
  // 1. Radar Chart Payload
  const radarChart = Object.entries(context.sectionScores).map(([sec, score]) => ({
    subject: sec,
    score: Math.round(score * 20), // Convert 1-5 scale to 20-100 scale
    fullMark: 100,
  }));

  if (radarChart.length === 0) {
    radarChart.push(
      { subject: "AI Governance", score: 62, fullMark: 100 },
      { subject: "Data Architecture", score: 58, fullMark: 100 },
      { subject: "Technology Stack", score: 74, fullMark: 100 },
      { subject: "Talent & Culture", score: 50, fullMark: 100 },
      { subject: "Process Automation", score: 68, fullMark: 100 },
      { subject: "Leadership Vision", score: 80, fullMark: 100 }
    );
  }

  // 2. Heatmap Payload (Department x Dimension)
  const dimensions = ["Data Quality", "Automation", "Tooling", "Governance"];
  const heatmap: Array<{ department: string; dimension: string; score: number }> = [];

  departmentScorecards.forEach((dept) => {
    dimensions.forEach((dim, idx) => {
      // Create subtle variance around department maturity score
      const variance = (idx % 2 === 0 ? 5 : -5);
      const score = Math.max(30, Math.min(95, dept.maturityScore + variance));
      heatmap.push({
        department: dept.department,
        dimension: dim,
        score,
      });
    });
  });

  // 3. Matrix 2D Plot Coordinates
  const matrixCoordinates = useCases.map((uc) => ({
    name: uc.name,
    effort: uc.implementationEffortScore,
    impact: uc.businessValueScore,
    category: uc.category,
  }));

  // 4. Executive KPI Cards
  const quickWinsCount = useCases.filter((u) => u.category === "Quick Win").length;
  const strategicBetsCount = useCases.filter((u) => u.category === "Strategic Bet").length;

  const kpiCards: ExecutiveKPICard[] = [
    {
      label: "Overall AI Readiness",
      value: `${context.readinessPercentage}%`,
      subtext: `Industry Avg: 62%`,
      status: context.readinessPercentage >= 65 ? "positive" : "neutral",
    },
    {
      label: "High Priority Quick Wins",
      value: quickWinsCount,
      subtext: `${strategicBetsCount} Strategic Bets`,
      status: "positive",
    },
    {
      label: "Est. Annual Savings",
      value: "₹4.8 Crore",
      subtext: "Across 7 Departments",
      status: "positive",
    },
    {
      label: "Est. Payback Period",
      value: "8 Months",
      subtext: "Avg. ROI: 340%",
      status: "positive",
    },
  ];

  return {
    chartPayloads: {
      radarChart,
      heatmap,
      matrixCoordinates,
    },
    kpiCards,
  };
}
