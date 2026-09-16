// src/lib/observability/types.ts

export type ModelProvider = "google" | "openai" | "anthropic" | "custom";

export interface LangfuseConfig {
  publicKey?: string;
  secretKey?: string;
  baseUrl: string;
  isConfigured: boolean;
}

export interface LLMUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface TraceRecord {
  id: string;
  traceName: string;
  sessionId?: string;
  userId?: string;
  tenantName?: string;
  model: string;
  provider: ModelProvider;
  inputPrompt: string;
  outputResponse: string;
  usage: LLMUsage;
  latencyMs: number;
  estimatedCostUsd: number;
  status: "SUCCESS" | "ERROR";
  errorMessage?: string;
  createdAt: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface ObservabilityMetrics {
  totalGenerations: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  avgLatencyMs: number;
  successRate: number;
  providerBreakdown: {
    google: number;
    openai: number;
    anthropic: number;
  };
}

export interface ObservabilityStatusResponse {
  config: {
    isConfigured: boolean;
    baseUrl: string;
    publicKeyMasked?: string;
  };
  metrics: ObservabilityMetrics;
  recentTraces: TraceRecord[];
}
