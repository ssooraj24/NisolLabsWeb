// src/lib/report/useCaseEngine.ts

import { BusinessContextJSON, UseCaseItem } from "./types";
import { getMatchingSeedUseCases } from "./opportunityLibrary";
import { aiClient } from "@/lib/ai/client";

export async function generateCustomizedUseCases(
  context: BusinessContextJSON
): Promise<UseCaseItem[]> {
  const seedCases = getMatchingSeedUseCases(
    context.industry,
    context.lowScoringSections,
    context.topPainPoints
  );

  // We craft a prompt passing pre-filtered seeds + BusinessContextJSON to customize tech stack & ROI narratives
  const prompt = `You are a Tier-1 Management Consulting Partner evaluating AI opportunities for ${context.companyName} (${context.industry}).

BUSINESS CONTEXT:
- Overall AI Maturity Score: ${context.overallMaturityScore}/5 (${context.readinessPercentage}%)
- Key Focus Areas needing improvement: ${context.lowScoringSections.join(", ")}
- Top Client Pain Points: ${context.topPainPoints.join("; ")}
- Tech Stack Detected: ${context.techStackDetected?.join(", ") || "Standard Enterprise Stack"}

SEED OPPORTUNITY CANDIDATES:
${JSON.stringify(seedCases, null, 2)}

INSTRUCTIONS:
Refine and return a JSON array containing the Top 6-8 AI Use Cases tailored specifically for ${context.companyName}.
Customize:
1. 'businessProblem' to reference ${context.companyName}'s specific industry domain (${context.industry}) and pain points.
2. 'techStack' to include specific compatible tools (e.g. SAP/Oracle/Salesforce/Slack/SharePoint).
3. 'expectedSavings' and 'estimatedRoiPercentage' to be realistic and compelling.

Return ONLY a JSON object formatted as:
{
  "use_cases": [
    {
      "id": "uc-1",
      "name": "...",
      "department": "...",
      "businessProblem": "...",
      "proposedSolution": "...",
      "businessValueScore": 85,
      "implementationEffortScore": 35,
      "category": "Quick Win",
      "estimatedRoiPercentage": 320,
      "estimatedTimelineWeeks": 6,
      "techStack": ["..."],
      "expectedSavings": "...",
      "complexity": "Low",
      "priority": 1
    }
  ]
}`;

  try {
    const res = await aiClient.generateWithFallback("top_use_cases", prompt);
    const cleanedText = res.text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    if (parsed?.use_cases && Array.isArray(parsed.use_cases) && parsed.use_cases.length > 0) {
      return parsed.use_cases.map((uc: any, idx: number) => ({
        id: uc.id || `uc-${idx + 1}`,
        name: uc.name || seedCases[idx % seedCases.length].name,
        department: uc.department || seedCases[idx % seedCases.length].department,
        businessProblem: uc.businessProblem || seedCases[idx % seedCases.length].businessProblem,
        proposedSolution: uc.proposedSolution || seedCases[idx % seedCases.length].proposedSolution,
        businessValueScore: typeof uc.businessValueScore === "number" ? uc.businessValueScore : 80,
        implementationEffortScore: typeof uc.implementationEffortScore === "number" ? uc.implementationEffortScore : 40,
        category: uc.category || (uc.businessValueScore >= 65 && uc.implementationEffortScore <= 50 ? "Quick Win" : "Strategic Bet"),
        estimatedRoiPercentage: typeof uc.estimatedRoiPercentage === "number" ? uc.estimatedRoiPercentage : 250,
        estimatedTimelineWeeks: typeof uc.estimatedTimelineWeeks === "number" ? uc.estimatedTimelineWeeks : 6,
        techStack: Array.isArray(uc.techStack) ? uc.techStack : ["LLM API", "Vector DB"],
        expectedSavings: uc.expectedSavings || "₹25 Lakhs/year",
        complexity: uc.complexity || "Medium",
        priority: idx + 1,
      }));
    }
  } catch (err) {
    console.warn("[UseCaseEngine] AI customization failed, utilizing curated seeds fallback:", err);
  }

  return seedCases;
}
