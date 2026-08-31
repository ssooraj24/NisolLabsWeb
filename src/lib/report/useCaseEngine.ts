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
      const customizedList: UseCaseItem[] = parsed.use_cases.map((uc: any, idx: number) => {
        const seed = seedCases[idx % seedCases.length];
        return {
          id: uc.id || `uc-${idx + 1}`,
          name: uc.name || seed.name,
          department: uc.department || seed.department,
          businessProblem: uc.businessProblem || seed.businessProblem,
          proposedSolution: uc.proposedSolution || seed.proposedSolution,
          businessValueScore: typeof uc.businessValueScore === "number" ? uc.businessValueScore : seed.businessValueScore || 80,
          implementationEffortScore: typeof uc.implementationEffortScore === "number" ? uc.implementationEffortScore : seed.implementationEffortScore || 40,
          category: uc.category || seed.category || (uc.businessValueScore >= 65 && uc.implementationEffortScore <= 50 ? "Quick Win" : "Strategic Bet"),
          estimatedRoiPercentage: typeof uc.estimatedRoiPercentage === "number" ? uc.estimatedRoiPercentage : seed.estimatedRoiPercentage || 280,
          estimatedTimelineWeeks: typeof uc.estimatedTimelineWeeks === "number" ? uc.estimatedTimelineWeeks : seed.estimatedTimelineWeeks || 6,
          techStack: Array.isArray(uc.techStack) ? uc.techStack : seed.techStack || ["LLM API", "Vector DB"],
          expectedSavings: uc.expectedSavings || seed.expectedSavings || "₹25 Lakhs/year",
          complexity: uc.complexity || seed.complexity || "Medium",
          priority: idx + 1,
          horizonWindow: uc.horizonWindow || seed.horizonWindow,
          podRequirement: uc.podRequirement || seed.podRequirement,
        };
      });

      // If AI customized a subset (e.g. 6-8), append the remaining high-impact seed cases to provide a full 20-use-case portfolio
      if (customizedList.length < seedCases.length) {
        const remainingSeeds = seedCases.slice(customizedList.length).map((s, extraIdx) => ({
          ...s,
          id: `uc-${customizedList.length + extraIdx + 1}`,
          priority: customizedList.length + extraIdx + 1,
        }));
        return [...customizedList, ...remainingSeeds];
      }

      return customizedList;
    }
  } catch (err) {
    console.warn("[UseCaseEngine] AI customization failed, utilizing curated seeds fallback:", err);
  }

  return seedCases;
}
