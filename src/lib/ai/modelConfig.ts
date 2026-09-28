// lib/ai/modelConfig.ts

/**
 * Central AI Gateway (LiteLLM) Model Aliases & Auto-Fallback Routing Configuration
 *
 * Model Aliases:
 * 1. nisol-smart (Default Workhorse):
 *    Waterfall: Cerebras Llama 70B -> Groq Llama 70B -> Gemini 2.0 Flash -> GPT-4o-mini -> Claude 3.5 Haiku
 *    Use for: General chat, CRM reasoning, complex extraction, drafting, agent actions.
 *
 * 2. nisol-fast (Ultra-low latency):
 *    Waterfall: Groq Llama 8B -> Cerebras 70B -> Gemini Flash -> GPT-4o-mini
 *    Use for: Intent detection, routing, quick classifications, summarization.
 *
 * 3. nisol-client-premium (Paid/Client Tier):
 *    Waterfall: Claude 3.5 Sonnet -> GPT-4o -> Gemini 2.0 Flash
 *    Use for: Client-facing critical tasks, advanced coding, multi-step math/reasoning.
 */

export const MODEL_ALIASES = {
  SMART: "nisol-smart",
  FAST: "nisol-fast",
  CLIENT_PREMIUM: "nisol-client-premium",
} as const;

export type ModelAlias = (typeof MODEL_ALIASES)[keyof typeof MODEL_ALIASES] | string;

export type ReportOutputType =
  | "executive_summary"
  | "ai_readiness"
  | "capability_scores"
  | "top_use_cases"
  | "opportunity_matrix"
  | "quick_wins_strategic_bets"
  | "roadmap"
  | "roi_estimates"
  | "solution_blueprints"
  | "proposal_draft";

export interface ModelRoutingConfig {
  primary: ModelAlias;
  fallbacks: ModelAlias[];
  maxTokens: number;
  temperature: number;
}

export const MODEL_ROUTING: Record<ReportOutputType, ModelRoutingConfig> = {
  executive_summary: {
    primary: MODEL_ALIASES.SMART,
    fallbacks: [MODEL_ALIASES.CLIENT_PREMIUM, MODEL_ALIASES.FAST],
    maxTokens: 4000,
    temperature: 0.7,
  },
  ai_readiness: {
    primary: MODEL_ALIASES.FAST,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 2500,
    temperature: 0.3,
  },
  capability_scores: {
    primary: MODEL_ALIASES.FAST,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 3000,
    temperature: 0.3,
  },
  top_use_cases: {
    primary: MODEL_ALIASES.SMART,
    fallbacks: [MODEL_ALIASES.CLIENT_PREMIUM, MODEL_ALIASES.FAST],
    maxTokens: 4000,
    temperature: 0.5,
  },
  opportunity_matrix: {
    primary: MODEL_ALIASES.FAST,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 3000,
    temperature: 0.4,
  },
  quick_wins_strategic_bets: {
    primary: MODEL_ALIASES.FAST,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 3000,
    temperature: 0.4,
  },
  roadmap: {
    primary: MODEL_ALIASES.SMART,
    fallbacks: [MODEL_ALIASES.CLIENT_PREMIUM],
    maxTokens: 4000,
    temperature: 0.5,
  },
  roi_estimates: {
    primary: MODEL_ALIASES.CLIENT_PREMIUM,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 3500,
    temperature: 0.5,
  },
  solution_blueprints: {
    primary: MODEL_ALIASES.CLIENT_PREMIUM,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 4000,
    temperature: 0.5,
  },
  proposal_draft: {
    primary: MODEL_ALIASES.CLIENT_PREMIUM,
    fallbacks: [MODEL_ALIASES.SMART],
    maxTokens: 4000,
    temperature: 0.7,
  },
};
