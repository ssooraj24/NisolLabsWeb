// src/lib/report/governanceEngine.ts

import { BusinessContextJSON, GovernanceData, RiskItem } from "./types";

export function generateGovernanceAssessment(context: BusinessContextJSON): GovernanceData {
  const govScore = context.sectionScores["Governance & Risk"] || context.sectionScores["AI Governance & IP"] || 2.8;
  const overallGovernanceScore = Math.round((govScore / 5) * 100);

  let readinessStatus: "High Risk" | "Developing" | "Enterprise Ready" = "Developing";
  if (overallGovernanceScore >= 75) readinessStatus = "Enterprise Ready";
  else if (overallGovernanceScore < 50) readinessStatus = "High Risk";

  const isBfsiOrHealth = /bfsi|bank|finance|health|pharma/i.test(context.industry);

  const riskRegister: RiskItem[] = [
    {
      id: "RSK-01",
      category: "Data Privacy & Security",
      description: "PII or sensitive client intellectual property inadvertently sent to third-party public LLM endpoints without token redaction.",
      potentialImpact: "Regulatory penalty under India DPDP Act 2023 / GDPR; client data breach disclosure; reputational damage.",
      likelihood: 4,
      impact: 5,
      riskScore: 20,
      riskLevel: "Critical",
      regulatoryFrameworks: ["India DPDP Act 2023", "GDPR Art 6/9", "ISO 27001"],
      mitigationStrategy: "Deploy an enterprise API Gateway proxy with regex + Presidio automated PII redaction layer prior to external payload dispatch.",
      ownerRole: "Chief Information Security Officer (CISO)",
      residualRisk: "Low",
    },
    {
      id: "RSK-02",
      category: "Model Risk & Bias",
      description: "LLM hallucinations or biased outputs generated in customer-facing conversational interfaces or financial reports.",
      potentialImpact: "Incorrect financial or advisory recommendations, customer dissatisfaction, and brand liability.",
      likelihood: 4,
      impact: 4,
      riskScore: 16,
      riskLevel: "High",
      regulatoryFrameworks: ["EU AI Act (High-Risk AI)", "RBI AI/ML Risk Framework"],
      mitigationStrategy: "Enforce strict temperature clamping (<=0.2), grounded RAG with vector citation validation, and Human-in-the-Loop (HITL) sign-off on critical workflows.",
      ownerRole: "Head of AI Engineering & QA",
      residualRisk: "Low",
    },
    {
      id: "RSK-03",
      category: "Regulatory & Compliance",
      description: "Non-compliance with data localization mandates and emerging AI auditing standards.",
      potentialImpact: "Regulatory censure, operational suspension, or mandatory model retractions.",
      likelihood: 3,
      impact: 4,
      riskScore: 12,
      riskLevel: "High",
      regulatoryFrameworks: ["DPDP Act 2023", "SEBI / RBI Cybersecurity Guidelines"],
      mitigationStrategy: "Host vector databases and self-managed open-weights LLMs within in-region private cloud VPCs (e.g. AWS Mumbai / Azure India).",
      ownerRole: "Chief Legal Officer / Compliance Head",
      residualRisk: "Low",
    },
    {
      id: "RSK-04",
      category: "Operational & Adoption",
      description: "Staff resistance or shadow AI adoption using unauthorized consumer AI tools without corporate audit trails.",
      potentialImpact: "Data leakage, fragmented productivity metrics, and failure to realize projected ROI.",
      likelihood: 4,
      impact: 3,
      riskScore: 12,
      riskLevel: "Medium",
      regulatoryFrameworks: ["Corporate IT Acceptable Use Policy"],
      mitigationStrategy: "Roll out sanctioned enterprise AI workspace with single-sign-on (SSO), comprehensive staff upskilling, and active department champions.",
      ownerRole: "VP Human Resources & Change Management Lead",
      residualRisk: "Low",
    },
    {
      id: "RSK-05",
      category: "Vendor & Infrastructure",
      description: "Excessive dependency on a single proprietary LLM provider risking pricing spikes, API latency degradation, or deprecation.",
      potentialImpact: "Service interruption and unexpected operational expenditure expansion.",
      likelihood: 3,
      impact: 3,
      riskScore: 9,
      riskLevel: "Medium",
      regulatoryFrameworks: ["Vendor Risk Management (VRM)"],
      mitigationStrategy: "Architect model-agnostic abstraction layer (LiteLLM / OpenRouter architecture) enabling seamless multi-model fallback.",
      ownerRole: "Principal Enterprise Architect",
      residualRisk: "Low",
    },
  ];

  const regulatoryComplianceMatrix = [
    {
      regulation: "India Digital Personal Data Protection (DPDP) Act 2023",
      status: overallGovernanceScore >= 70 ? ("Compliant" as const) : ("Action Required" as const),
      gapSummary: "Requirement for explicit data principal consent and automated data erasure logs across AI embedding stores.",
      remediationAction: "Implement chunk-level metadata tagging with tenant isolation and TTL-based vector lifecycle management.",
    },
    {
      regulation: "European Union AI Act (Regulation 2024/1689)",
      status: isBfsiOrHealth ? ("Action Required" as const) : ("Compliant" as const),
      gapSummary: "High-risk categorization for automated biometric or credit/underwriting decisions requiring explainability audit trails.",
      remediationAction: "Maintain comprehensive model cards, training provenance datasets, and human override logs.",
    },
    {
      regulation: "ISO/IEC 42001:2023 (Artificial Intelligence Management System)",
      status: overallGovernanceScore >= 60 ? ("Under Review" as const) : ("Action Required" as const),
      gapSummary: "Structured framework needed for risk-based continuous AI model lifecycle evaluation.",
      remediationAction: "Establish Enterprise AI Governance Committee meeting quarterly to review model risk logs.",
    },
    {
      regulation: "RBI / SEBI AI & Cybersecurity Mandates (BFSI)",
      status: isBfsiOrHealth ? ("Action Required" as const) : ("Compliant" as const),
      gapSummary: "Mandatory auditability of automated algorithmic recommendations and algorithmic explainability.",
      remediationAction: "Enforce deterministic reasoning constraints and complete request/response telemetry logging.",
    },
  ];

  return {
    overallGovernanceScore,
    readinessStatus,
    policyReadiness: Math.min(100, Math.round(overallGovernanceScore * 0.9)),
    dataPrivacyPiiScore: Math.min(100, Math.round(overallGovernanceScore * 1.05)),
    modelOversightScore: Math.min(100, Math.round(overallGovernanceScore * 0.85)),
    riskAuditScore: Math.min(100, Math.round(overallGovernanceScore * 0.95)),
    keyGaps: [
      "Absence of an automated PII/sensitive credential masking proxy before external model dispatch",
      "Lack of centralized AI Acceptable Use Policy defining permissible proprietary data inputs",
      "No automated drift, latency, and hallucination monitoring for production agents",
      "Missing Human-in-the-Loop (HITL) mandatory authorization workflows for critical outputs",
    ],
    recommendations: [
      "Deploy an Enterprise AI API Proxy with automated PII tokenization and audit logging",
      "Publish and ratify the Enterprise AI Acceptable Use Policy across all business units",
      "Form a cross-functional AI Ethics & Governance Steering Committee",
      "Enforce deterministic schema validation and source citation verification on all RAG workflows",
    ],
    riskRegister,
    regulatoryComplianceMatrix,
  };
}
