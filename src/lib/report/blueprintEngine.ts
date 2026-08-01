// src/lib/report/blueprintEngine.ts

import { BusinessContextJSON, UseCaseItem, SolutionBlueprintItem } from "./types";
import { aiClient } from "@/lib/ai/client";

export async function generateSolutionBlueprints(
  context: BusinessContextJSON,
  topUseCases: UseCaseItem[]
): Promise<SolutionBlueprintItem[]> {
  const selectedCases = topUseCases.slice(0, 3); // Blueprints for top 3 initiatives

  const prompt = `You are an Enterprise AI Solutions Architect defining implementation blueprints for ${context.companyName} (${context.industry}).

TOP INITIATIVES:
${JSON.stringify(selectedCases, null, 2)}

INSTRUCTIONS:
Generate detailed solution blueprints for each initiative.
Return ONLY a JSON array inside a wrapper object:
{
  "blueprints": [
    {
      "id": "bp-1",
      "useCaseId": "uc-1",
      "title": "...",
      "department": "...",
      "objectives": ["..."],
      "architectureOverview": "...",
      "technologyStack": ["..."],
      "implementationPhases": [
        { "phase": "Phase 1: Discovery & Data Preparation", "duration": "2 Weeks", "deliverables": ["Data schema definition", "API keys"] },
        { "phase": "Phase 2: MVP Model Integration", "duration": "3 Weeks", "deliverables": ["RAG pipeline", "Prompt templates"] },
        { "phase": "Phase 3: UAT & Production Rollout", "duration": "2 Weeks", "deliverables": ["Staff training", "Monitoring dashboard"] }
      ],
      "dataDependencies": ["..."],
      "securityAndCompliance": ["..."],
      "estimatedTimeline": "7 Weeks",
      "estimatedCost": "₹12 - ₹18 Lakhs",
      "expectedRoi": "320%",
      "successMetrics": ["..."]
    }
  ]
}`;

  try {
    const res = await aiClient.generateWithFallback("solution_blueprints", prompt);
    const cleanedText = res.text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    if (parsed?.blueprints && Array.isArray(parsed.blueprints) && parsed.blueprints.length > 0) {
      return parsed.blueprints;
    }
  } catch (err) {
    console.warn("[BlueprintEngine] AI Blueprint generation failed, utilizing default blueprints fallback:", err);
  }

  // Fallback default blueprints
  return selectedCases.map((uc, idx) => ({
    id: `bp-${idx + 1}`,
    useCaseId: uc.id,
    title: `${uc.name} Implementation Blueprint`,
    department: uc.department,
    objectives: [
      `Automate manual workflow for ${uc.department}`,
      `Achieve target ROI of +${uc.estimatedRoiPercentage}%`,
      `Ensure 99.9% uptime and role-based data security`
    ],
    architectureOverview: `Cloud-native microservices architecture deploying ${uc.techStack.join(", ")} with enterprise security guardrails.`,
    technologyStack: uc.techStack,
    implementationPhases: [
      { phase: "Phase 1: Architecture & Vector Pipeline Setup", duration: "2 Weeks", deliverables: ["Ingestion pipeline", "Security rules"] },
      { phase: "Phase 2: Core Model Fine-Tuning & Integration", duration: "3 Weeks", deliverables: ["API endpoints", "Prompt templates"] },
      { phase: "Phase 3: User Acceptance & Enterprise Rollout", duration: "2 Weeks", deliverables: ["Staff training", "Monitoring dashboard"] }
    ],
    dataDependencies: ["Internal document repository", "User permission schema", "Historical transaction logs"],
    securityAndCompliance: ["AES-256 Encryption at Rest", "SOC2 Compliance", "PII Redaction Engine"],
    estimatedTimeline: `${uc.estimatedTimelineWeeks} Weeks`,
    estimatedCost: "₹15 - ₹25 Lakhs",
    expectedRoi: `+${uc.estimatedRoiPercentage}%`,
    successMetrics: ["95%+ reduction in manual processing time", "<2s response latency", "Zero security non-compliance flags"]
  }));
}
