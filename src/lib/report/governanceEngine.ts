// src/lib/report/governanceEngine.ts

import { BusinessContextJSON, GovernanceData } from "./types";

export function generateGovernanceAssessment(context: BusinessContextJSON): GovernanceData {
  const govScore = context.sectionScores["Governance & Risk"] || context.sectionScores["AI Governance"] || 2.8;
  const overallGovernanceScore = Math.round((govScore / 5) * 100);

  let readinessStatus: "High Risk" | "Developing" | "Enterprise Ready" = "Developing";
  if (overallGovernanceScore >= 75) readinessStatus = "Enterprise Ready";
  else if (overallGovernanceScore < 50) readinessStatus = "High Risk";

  return {
    overallGovernanceScore,
    readinessStatus,
    policyReadiness: Math.min(100, Math.round(overallGovernanceScore * 0.9)),
    dataPrivacyPiiScore: Math.min(100, Math.round(overallGovernanceScore * 1.05)),
    modelOversightScore: Math.min(100, Math.round(overallGovernanceScore * 0.85)),
    riskAuditScore: Math.min(100, Math.round(overallGovernanceScore * 0.95)),
    keyGaps: [
      "Lack of formal Acceptable AI Usage Policy for staff",
      "No automated PII mask/redaction layer before sending prompt payloads to external LLMs",
      "Absence of audit logging for proprietary business prompt telemetry",
      "Missing Human-in-the-loop (HITL) sign-off workflows for critical financial outputs"
    ],
    recommendations: [
      "Publish Enterprise AI Acceptable Use Policy across all departments",
      "Implement a API Proxy Gateway with automated PII redaction and audit logging",
      "Establish an AI Ethics & Governance Committee for model validation",
      "Require mandatory Human-in-the-Loop review for automated client communications"
    ]
  };
}
