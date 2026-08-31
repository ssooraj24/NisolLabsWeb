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
    estimatedPages: "~30 Pages",
    badge: "Flagship",
    icon: "🚀",
    description: "Comprehensive 9-section enterprise audit covering capability scores, opportunity matrix, 4-phase roadmap, blueprints, and ROI.",
  },
  {
    id: "board_investment_memo",
    title: "CFO & Board Investment Memo",
    targetAudience: "Board of Directors, CFO & Investment Committee",
    estimatedPages: "~10 Pages",
    badge: "Capital Allocation",
    icon: "💼",
    description: "Structured financial business case featuring NPV, IRR, 3-scenario sensitivity stress-tests, capital phasing, and formal Board Resolution.",
  },
  {
    id: "data_strategy_blueprint",
    title: "Data Strategy & Vector Lakehouse Blueprint",
    targetAudience: "CTO, Chief Data Officer & Engineering Leads",
    estimatedPages: "~12 Pages",
    badge: "Technical Blueprint",
    icon: "🗄️",
    description: "Technical architecture dossier covering 5-dimension data quality scorecards, vector DB topology, CDC pipelines, and data prep budgets.",
  },
  {
    id: "poc_evaluation_report",
    title: "PoC Evaluation & Scalability Dossier",
    targetAudience: "Product Leaders, AI PMs & Business Unit Heads",
    estimatedPages: "~8 Pages",
    badge: "Go / No-Go Gate",
    icon: "🧪",
    description: "Empirical proof-of-concept audit analyzing accuracy benchmarks, latency SLAs, user feedback, and scale-up feasibility.",
  },
];

export type PricingPlan = "foundation" | "growth" | "enterprise" | "custom";

export interface PlanConfig {
  id: PricingPlan;
  name: string;
  badge: string;
  priceLabel: string;
  description: string;
  allowedDeliverables: DeliverableType[];
  allowedTabs: string[];
}

export const PLAN_CONFIG: Record<PricingPlan, PlanConfig> = {
  foundation: {
    id: "foundation",
    name: "Foundation Diagnostic",
    badge: "STARTER",
    priceLabel: "₹4,50,000",
    description: "Core 360° AI diagnostic for small to mid organizations (10–50 employees).",
    allowedDeliverables: ["ai_readiness_transformation"],
    allowedTabs: ["summary", "maturity", "matrix", "usecases", "roadmap", "proposal"],
  },
  growth: {
    id: "growth",
    name: "Growth Transformation",
    badge: "MOST POPULAR",
    priceLabel: "₹7,50,000",
    description: "Full enterprise transformation package with CFO board memo & vector data blueprint.",
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
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Scale",
    badge: "ENTERPRISE",
    priceLabel: "Custom Quote",
    description: "Complete multi-entity portfolio including PoC evaluation dossier & scalability governance.",
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
  },
  custom: {
    id: "custom",
    name: "Custom Scope",
    badge: "CUSTOM",
    priceLabel: "Tailored Scope",
    description: "Custom tailored enterprise engagement with full unlocked access.",
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
