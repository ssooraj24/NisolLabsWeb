// lib/ai/modelConfig.ts

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
  primary: string;
  fallbacks: string[];
  maxTokens: number;
  temperature: number;
}

export const MODEL_ROUTING: Record<ReportOutputType, ModelRoutingConfig> = {
  executive_summary: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"],
    maxTokens: 4000,
    temperature: 0.7,
  },
  ai_readiness: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku-20241022"],
    maxTokens: 2500,
    temperature: 0.3,
  },
  capability_scores: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku-20241022"],
    maxTokens: 3000,
    temperature: 0.3,
  },
  top_use_cases: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku-20241022"],
    maxTokens: 4000,
    temperature: 0.5,
  },
  opportunity_matrix: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku-20241022"],
    maxTokens: 3000,
    temperature: 0.4,
  },
  quick_wins_strategic_bets: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku-20241022"],
    maxTokens: 3000,
    temperature: 0.4,
  },
  roadmap: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"],
    maxTokens: 4000,
    temperature: 0.5,
  },
  roi_estimates: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"],
    maxTokens: 3500,
    temperature: 0.5,
  },
  solution_blueprints: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"],
    maxTokens: 4000,
    temperature: 0.5,
  },
  proposal_draft: {
    primary: "google/gemini-1.5-flash",
    fallbacks: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"],
    maxTokens: 4000,
    temperature: 0.7,
  },
};
