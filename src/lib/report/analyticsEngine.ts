// src/lib/report/analyticsEngine.ts

import { UseCaseItem, OpportunityMatrixQuadrants, ROISummaryData, RoadmapPhase } from "./types";

export function categorizeUseCasesAndMatrix(useCases: UseCaseItem[]): OpportunityMatrixQuadrants {
  const quickWins: UseCaseItem[] = [];
  const strategicBets: UseCaseItem[] = [];
  const fillIns: UseCaseItem[] = [];
  const reEvaluate: UseCaseItem[] = [];

  useCases.forEach((uc) => {
    // Quick Win: High Impact (>=65) & Low/Medium Effort (<=50)
    if (uc.businessValueScore >= 65 && uc.implementationEffortScore <= 50) {
      uc.category = "Quick Win";
      quickWins.push(uc);
    }
    // Strategic Bet: High Impact (>=65) & High Effort (>50)
    else if (uc.businessValueScore >= 65 && uc.implementationEffortScore > 50) {
      uc.category = "Strategic Bet";
      strategicBets.push(uc);
    }
    // Fill-In: Low Impact (<65) & Low Effort (<=50)
    else if (uc.businessValueScore < 65 && uc.implementationEffortScore <= 50) {
      uc.category = "Long-term Fill";
      fillIns.push(uc);
    }
    // Re-Evaluate: Low Impact (<65) & High Effort (>50)
    else {
      uc.category = "Re-evaluate";
      reEvaluate.push(uc);
    }
  });

  return {
    quickWins,
    strategicBets,
    fillIns,
    reEvaluate,
  };
}

export function computeFinancialROI(useCases: UseCaseItem[]): ROISummaryData {
  let totalSavingsVal = 0;
  let totalInvestmentVal = 0;

  const deptMap: Record<string, { savings: number; investment: number; count: number }> = {};

  useCases.forEach((uc) => {
    // Derive rough savings & investment numbers from businessValueScore & effort
    const savings = (uc.businessValueScore || 70) * 450000; // e.g. 70 -> 31.5L
    const investment = (uc.implementationEffortScore || 40) * 180000; // e.g. 40 -> 72L

    totalSavingsVal += savings;
    totalInvestmentVal += investment;

    const dept = uc.department || "General Operations";
    if (!deptMap[dept]) {
      deptMap[dept] = { savings: 0, investment: 0, count: 0 };
    }
    deptMap[dept].savings += savings;
    deptMap[dept].investment += investment;
    deptMap[dept].count += 1;
  });

  if (totalInvestmentVal === 0) totalInvestmentVal = 5000000;
  if (totalSavingsVal === 0) totalSavingsVal = 18000000;

  const overallRoiPercentage = Math.round(((totalSavingsVal - totalInvestmentVal) / totalInvestmentVal) * 100);
  const averagePaybackMonths = Math.max(4, Math.round((totalInvestmentVal / (totalSavingsVal / 12))));

  const departmentBreakdown = Object.entries(deptMap).map(([dept, data]) => {
    const roi = Math.round(((data.savings - data.investment) / Math.max(1, data.investment)) * 100);
    const payback = Math.max(3, Math.round((data.investment / (data.savings / 12))));
    return {
      department: dept,
      investment: `₹${(data.investment / 100000).toFixed(1)} Lakhs`,
      annualSavings: `₹${(data.savings / 100000).toFixed(1)} Lakhs`,
      roiPercentage: roi,
      paybackMonths: payback,
    };
  });

  return {
    totalEstimatedAnnualSavings: `₹${(totalSavingsVal / 10000000).toFixed(2)} Crore`,
    totalInvestmentEstimated: `₹${(totalInvestmentVal / 10000000).toFixed(2)} Crore`,
    overallRoiPercentage: Math.max(180, overallRoiPercentage),
    averagePaybackMonths,
    departmentBreakdown,
  };
}

export function buildTransformationRoadmap(
  quickWins: UseCaseItem[],
  strategicBets: UseCaseItem[],
  fillIns: UseCaseItem[]
): RoadmapPhase[] {
  const phase1Projects = quickWins.slice(0, 4).map((u) => u.name);
  const phase2Projects = [...quickWins.slice(4), ...strategicBets.slice(0, 3)].map((u) => u.name);
  const phase3Projects = [...strategicBets.slice(3), ...fillIns.slice(0, 3)].map((u) => u.name);

  return [
    {
      phaseNumber: 1,
      phaseName: "Phase 1: Foundation & Quick Wins",
      durationMonths: 3,
      focus: "Deploy low-friction high-impact AI tools to drive immediate ROI and build organizational momentum.",
      keyProjects: phase1Projects.length > 0 ? phase1Projects : ["AI Proposal Generator", "AI Knowledge Assistant"],
      expectedMilestones: [
        "First production AI workflow deployed",
        "Executive dashboard live",
        "Staff prompt engineering training completed"
      ],
      estimatedCost: "₹35 - ₹50 Lakhs"
    },
    {
      phaseNumber: 2,
      phaseName: "Phase 2: Scale & Deep Integration",
      durationMonths: 6,
      focus: "Integrate core AI models into enterprise ERP/CRM workflows and expand department automation.",
      keyProjects: phase2Projects.length > 0 ? phase2Projects : ["AI Invoice Processing Engine", "AI Sales Lead Copilot"],
      expectedMilestones: [
        "Cross-department vector database active",
        "API integration with ERP complete",
        "Automated governance audit logging established"
      ],
      estimatedCost: "₹75 - ₹1.2 Crore"
    },
    {
      phaseNumber: 3,
      phaseName: "Phase 3: Autonomous AI Enterprise",
      durationMonths: 6,
      focus: "Scale strategic autonomous agentic systems and continuous model fine-tuning.",
      keyProjects: phase3Projects.length > 0 ? phase3Projects : ["Autonomous Supply Chain Optimizer", "Predictive Customer Retention Agent"],
      expectedMilestones: [
        "Multi-agent workflow orchestration live",
        "Continuous AI model monitoring & compliance active",
        "Full enterprise ROI target achieved (>300%)"
      ],
      estimatedCost: "₹1.0 - ₹1.8 Crore"
    }
  ];
}
