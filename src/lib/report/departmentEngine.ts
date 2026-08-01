// src/lib/report/departmentEngine.ts

import { BusinessContextJSON, DepartmentScorecard, UseCaseItem } from "./types";

export function generateDepartmentScorecards(
  context: BusinessContextJSON,
  useCases: UseCaseItem[]
): DepartmentScorecard[] {
  const departments = [
    "Sales & Marketing",
    "Human Resources",
    "Finance & Accounting",
    "Operations & Logistics",
    "Customer Support",
    "Engineering & IT",
    "Legal & Compliance"
  ];

  return departments.map((dept) => {
    const deptUseCases = useCases.filter((uc) => uc.department === dept || uc.department.includes(dept.split(" ")[0]));
    const quickWins = deptUseCases.filter((uc) => uc.category === "Quick Win").length;
    
    // Baseline score calculation per department based on context section scores
    const sectionScore = context.sectionScores[dept] || context.overallMaturityScore;
    const score = Math.round(sectionScore * 20); // 1-5 to 20-100 scale

    let maturityLevel = "Developing Baseline";
    if (score >= 80) maturityLevel = "Advanced Optimizing";
    else if (score >= 60) maturityLevel = "Structured Baseline";
    else if (score >= 40) maturityLevel = "Emerging Capability";

    return {
      department: dept,
      maturityScore: score,
      maturityLevel,
      painPointsCount: Math.floor(Math.random() * 3) + 3,
      topOpportunitiesCount: Math.max(1, deptUseCases.length),
      quickWinsCount: quickWins,
      estimatedRoi: score < 70 ? "High (>300%)" : "Medium (180-250%)",
      estimatedTimeline: "4 - 8 Weeks",
      painPoints: [
        `Manual repetitive tasks in ${dept}`,
        `Siloed communication and delayed response loops`,
        `Lack of automated data insights`
      ],
      topRecommendations: [
        `Deploy targeted AI workflow automation for ${dept}`,
        `Establish centralized knowledge repository`,
        `Train team leads on prompt engineering SOPs`
      ]
    };
  });
}
