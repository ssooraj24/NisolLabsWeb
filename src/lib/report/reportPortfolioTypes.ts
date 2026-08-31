// src/lib/report/reportPortfolioTypes.ts

export type DeliverableType =
  | "ai_readiness_transformation"
  | "board_investment_memo"
  | "data_strategy_blueprint"
  | "poc_evaluation_report";

export interface DeliverableMeta {
  id: DeliverableType;
  title: string;
  targetAudience: string;
  estimatedPages: string;
  badge: string;
  icon: string;
  description: string;
}

export const DELIVERABLE_PORTFOLIO: DeliverableMeta[] = [
  {
    id: "ai_readiness_transformation",
    title: "Enterprise AI Transformation Strategy",
    targetAudience: "Executive Committee, CEO & Steering Committee",
    estimatedPages: "9 Comprehensive Chapters",
    badge: "Flagship",
    icon: "🚀",
    description: "Comprehensive 9-chapter strategic dossier covering 360° readiness scores, 20-use-case portfolio, 6-horizon roadmap, blueprints, and ROI.",
  },
  {
    id: "board_investment_memo",
    title: "CFO & Board Investment Memo",
    targetAudience: "Board of Directors, CFO & Investment Committee",
    estimatedPages: "Executive Decision Memo",
    badge: "Capital Allocation",
    icon: "💼",
    description: "Audit-ready financial business case featuring DCF, NPV, IRR, 3-scenario sensitivity stress-tests, capital phasing, and formal Board Resolution.",
  },
  {
    id: "data_strategy_blueprint",
    title: "Data Strategy & Vector Architecture Blueprint",
    targetAudience: "CTO, Chief Data Officer & Engineering Leads",
    estimatedPages: "Technical Architecture Spec",
    badge: "Technical Blueprint",
    icon: "🗄️",
    description: "Technical architecture specification covering 5-dimension data hygiene scorecards, hybrid vector topology, real-time CDC specs, and PII gateway.",
  },
  {
    id: "poc_evaluation_report",
    title: "PoC Decision Gate & Acceptance Dossier",
    targetAudience: "Product Leaders, AI PMs & Business Unit Heads",
    estimatedPages: "Decision Gate Protocol",
    badge: "Go / No-Go Gate",
    icon: "🧪",
    description: "Prospective pilot decision gate protocol defining pilot hypotheses, SLA benchmark thresholds, evaluation methodology, and Go/No-Go criteria.",
  },
];

export type PricingPlan = "foundation" | "growth" | "enterprise" | "custom";

export interface PlanConfig {
  id: PricingPlan;
  name: string;
  badge: string;
  priceLabel: string;
  priceUSD: string;
  description: string;
  allowedDeliverables: DeliverableType[];
  allowedTabs: string[];
  trainingTracksCount: number;
  trainingHighlights: string[];
}

export const PLAN_CONFIG: Record<PricingPlan, PlanConfig> = {
  foundation: {
    id: "foundation",
    name: "Foundation Diagnostic",
    badge: "STARTER",
    priceLabel: "₹4,50,000",
    priceUSD: "$5,500",
    description: "Core 360° AI diagnostic for small to mid organizations (10–50 employees).",
    allowedDeliverables: ["ai_readiness_transformation"],
    allowedTabs: ["summary", "maturity", "matrix", "usecases", "roadmap", "proposal"],
    trainingTracksCount: 0,
    trainingHighlights: ["Training tracks available as dedicated add-on"],
  },
  growth: {
    id: "growth",
    name: "Growth Transformation",
    badge: "MOST POPULAR",
    priceLabel: "₹8,50,000",
    priceUSD: "$10,500",
    description: "Full enterprise transformation package with CFO board memo, vector architecture blueprint, and 2 training tracks.",
    allowedDeliverables: [
      "ai_readiness_transformation",
      "board_investment_memo",
      "data_strategy_blueprint",
    ],
    allowedTabs: [
      "summary",
      "maturity",
      "risk",
      "data",
      "matrix",
      "usecases",
      "roadmap",
      "ocm",
      "roi",
      "blueprints",
      "proposal",
    ],
    trainingTracksCount: 2,
    trainingHighlights: [
      "Track 1: AI Readiness & Demystification (All-Hands, 2x 90-min sessions)",
      "Track 2: The New Way of Working with AI (Dept Champions, 4x 2-hr sandbox labs)",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Scale",
    badge: "ENTERPRISE",
    priceLabel: "₹18,50,000",
    priceUSD: "$22,500",
    description: "Complete multi-entity portfolio including PoC decision gate protocol, Shadow AI remediation, and full 3-track training suite.",
    allowedDeliverables: [
      "ai_readiness_transformation",
      "board_investment_memo",
      "data_strategy_blueprint",
      "poc_evaluation_report",
    ],
    allowedTabs: [
      "summary",
      "maturity",
      "risk",
      "data",
      "matrix",
      "usecases",
      "roadmap",
      "ocm",
      "roi",
      "blueprints",
      "proposal",
    ],
    trainingTracksCount: 3,
    trainingHighlights: [
      "Track 1: AI Readiness & Demystification (All-Hands, 2x 90-min sessions)",
      "Track 2: The New Way of Working with AI (Dept Champions, 4x 2-hr sandbox labs)",
      "Track 3: Leading AI-Augmented Teams (Executive & Management Seminar, Half-Day)",
    ],
  },
  custom: {
    id: "custom",
    name: "Custom Scope",
    badge: "CUSTOM",
    priceLabel: "Tailored Scope",
    priceUSD: "Custom Quote",
    description: "Custom tailored enterprise engagement with full unlocked access and custom training allocation.",
    allowedDeliverables: [
      "ai_readiness_transformation",
      "board_investment_memo",
      "data_strategy_blueprint",
      "poc_evaluation_report",
    ],
    allowedTabs: [
      "summary",
      "maturity",
      "risk",
      "data",
      "matrix",
      "usecases",
      "roadmap",
      "ocm",
      "roi",
      "blueprints",
      "proposal",
    ],
    trainingTracksCount: 3,
    trainingHighlights: [
      "Track 1: AI Readiness & Demystification",
      "Track 2: The New Way of Working with AI",
      "Track 3: Leading AI-Augmented Teams",
    ],
  },
};

export function normalizePricingPlan(plan?: string | null): PricingPlan {
  if (!plan) return "foundation";
  const normalized = plan.toLowerCase().trim();
  if (normalized === "growth") return "growth";
  if (normalized === "enterprise") return "enterprise";
  if (normalized === "custom") return "custom";
  return "foundation";
}

export function isDeliverableAllowedForPlan(
  deliverable: DeliverableType,
  plan?: string | null
): boolean {
  const activePlan = normalizePricingPlan(plan);
  return PLAN_CONFIG[activePlan].allowedDeliverables.includes(deliverable);
}

export function isTabAllowedForPlan(
  tabId: string,
  plan?: string | null
): boolean {
  const activePlan = normalizePricingPlan(plan);
  return PLAN_CONFIG[activePlan].allowedTabs.includes(tabId);
}
