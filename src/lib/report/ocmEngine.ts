// src/lib/report/ocmEngine.ts

import { BusinessContextJSON, OCMPlanData, StakeholderImpact, RaciEntry, TrainingCurriculumItem } from "./types";

export function generateOCMPlan(context: BusinessContextJSON): OCMPlanData {
  const readinessScore = context.overallMaturityScore || 3.2;
  const overallChangeReadinessScore = Math.min(100, Math.max(30, Math.round((readinessScore / 5) * 100)));

  const stakeholderImpacts: StakeholderImpact[] = [
    {
      stakeholderGroup: "Frontline Knowledge Workers & Support Agents",
      impactLevel: "High",
      anticipatedResistance: "Anxiety regarding role redundancy, skepticism towards automated recommendations, learning curve for AI tools.",
      changeIntervention: "Position AI as an 'Iron Man suit' / co-pilot that eliminates drudgery; run hands-on 'AI Champion' sandboxes; tie AI adoption to performance bonuses.",
    },
    {
      stakeholderGroup: "Middle Management & Team Leads",
      impactLevel: "High",
      anticipatedResistance: "Uncertainty on how to evaluate AI-augmented team output, reluctance to trust automated decision logs.",
      changeIntervention: "Provide managerial dashboards for review/audit; establish clear escalation and Human-in-the-Loop approval boundaries.",
    },
    {
      stakeholderGroup: "Engineering & IT Operations",
      impactLevel: "Medium",
      anticipatedResistance: "Concerns over maintenance overhead, vector DB scaling, model latency SLAs, and infrastructure security.",
      changeIntervention: "Involve technical leads in architecture decision records (ADRs); provide MLOps and LLMOps specialized training tracks.",
    },
    {
      stakeholderGroup: "Executive Leadership & Board",
      impactLevel: "Medium",
      anticipatedResistance: "Need for clear ROI validation, risk of brand liability from hallucinations, budget scrutiny.",
      changeIntervention: "Deliver monthly Benefits Realization Reports; establish quarterly AI Steering Committee governance reviews.",
    },
  ];

  const raciMatrix: RaciEntry[] = [
    {
      initiative: "AI Strategic Roadmap & Capital Allocation",
      responsible: "Chief AI Officer / Advisory Lead",
      accountable: "CEO & Executive Committee",
      consulted: "Business Unit Heads",
      informed: "Company-wide",
    },
    {
      initiative: "AI Proxy Gateway & Data Privacy (PII) Guardrails",
      responsible: "Security Architect / Data Ops",
      accountable: "CISO",
      consulted: "Legal & Compliance",
      informed: "All Engineering Staff",
    },
    {
      initiative: "Departmental Use Case Rollout (Support/Sales/Ops)",
      responsible: "AI Product Manager & Dev Lead",
      accountable: "Department Head",
      consulted: "Frontline Super-Users",
      informed: "Impacted Teams",
    },
    {
      initiative: "Continuous Model Monitoring & Governance Audits",
      responsible: "MLOps Engineer",
      accountable: "AI Steering Committee",
      consulted: "Internal Audit",
      informed: "Executive Leadership",
    },
  ];

  const trainingPlan: TrainingCurriculumItem[] = [
    {
      targetAudience: "All Employees / General Staff",
      moduleName: "Enterprise AI Fundamentals & Responsible Usage",
      durationHours: 4,
      coreCompetencies: [
        "Effective prompt engineering & context structuring",
        "Recognizing hallucinations & validating citations",
        "Company AI Acceptable Use Policy & PII safety guidelines",
      ],
    },
    {
      targetAudience: "Department Champions & Super-Users",
      moduleName: "Advanced AI Co-Pilots & Workflow Automation",
      durationHours: 12,
      coreCompetencies: [
        "Building custom prompts & department templates",
        "Human-in-the-Loop review & quality control procedures",
        "Feedback loop logging to improve organizational vector memory",
      ],
    },
    {
      targetAudience: "Technical & IT Engineering Staff",
      moduleName: "Enterprise LLMOps, RAG Architecture & Model Governance",
      durationHours: 24,
      coreCompetencies: [
        "Vector database indexing (pgvector, Qdrant) & chunking strategies",
        "Latency optimization & API caching architectures",
        "Automated evaluation suites (Ragas, TruLens) & CI/CD deployment",
      ],
    },
  ];

  const changeAdoptionKpis = [
    {
      metric: "Active Weekly AI Co-Pilot Utilization Rate",
      baseline: "12%",
      target90Days: "55%",
      target1Year: "85%+",
    },
    {
      metric: "Frontline Staff AI Competency Certification",
      baseline: "5%",
      target90Days: "70%",
      target1Year: "95%",
    },
    {
      metric: "Self-Reported Weekly Hours Saved per Employee",
      baseline: "0.5 hrs",
      target90Days: "3.5 hrs",
      target1Year: "6.0+ hrs",
    },
    {
      metric: "Prompt Policy Compliance & Zero-PII Leakage Rate",
      baseline: "80%",
      target90Days: "99.5%",
      target1Year: "100%",
    },
  ];

  return {
    overallChangeReadinessScore,
    stakeholderImpacts,
    raciMatrix,
    trainingPlan,
    changeAdoptionKpis,
    leadershipCommitmentRecommendations: [
      "Appoint visible executive sponsors for each departmental AI workstream",
      "Establish a bi-weekly 'AI Wins' all-hands showcase highlighting employee-led innovations",
      "Incorporate AI efficiency and adoption targets into annual performance scorecards",
      "Create a frictionless feedback channel for employees to flag tool issues and suggest automations",
    ],
  };
}
