// src/lib/observability/langfuse.ts

import {
  LangfuseConfig,
  ModelProvider,
  ObservabilityMetrics,
  ObservabilityStatusResponse,
  TraceRecord,
  LLMUsage,
} from "./types";

// In-memory buffer of traces for portal inspection
let traceRingBuffer: TraceRecord[] = [
  {
    id: "tr-nisol-001",
    traceName: "Audit Synthesis: AI Maturity Score",
    model: "gemini-flash-latest",
    provider: "google",
    tenantName: "Apex Manufacturing Ltd.",
    userId: "admin_sooraj",
    inputPrompt: "Analyze the operational readiness of apex manufacturing with 14 automated assembly nodes. Return maturity tier 1-5 with gap analysis...",
    outputResponse: "Maturity Tier 3: Operational Foundation. Primary bottlenecks identified in legacy ERP synchronization and distributed sensor telemetry...",
    usage: {
      promptTokens: 1420,
      completionTokens: 840,
      totalTokens: 2260,
    },
    latencyMs: 1240,
    estimatedCostUsd: 0.00035,
    status: "SUCCESS",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    tags: ["audit", "enterprise", "maturity-v2"],
    metadata: { auditId: "aud_902", section: "maturity_score" },
  },
  {
    id: "tr-nisol-002",
    traceName: "Blueprint Generation: Predictive Maintenance Agent",
    model: "gpt-4o",
    provider: "openai",
    tenantName: "Global Logistics Hub",
    userId: "admin_sooraj",
    inputPrompt: "Synthesize an AI Architecture blueprint for predictive fleet maintenance utilizing edge sensors and LangChain agentic routing...",
    outputResponse: "Architecture Blueprint: Node telemetry ingestion through Kafka, vector retrieval via Supabase pgvector, and dynamic dispatch to specialized repair agents...",
    usage: {
      promptTokens: 2850,
      completionTokens: 1490,
      totalTokens: 4340,
    },
    latencyMs: 2890,
    estimatedCostUsd: 0.02202,
    status: "SUCCESS",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    tags: ["blueprint", "gpt-4o", "architecture"],
    metadata: { blueprintId: "bp_401", tier: "enterprise" },
  },
  {
    id: "tr-nisol-003",
    traceName: "Grant Feasibility Evaluation",
    model: "claude-3-5-sonnet-20241022",
    provider: "anthropic",
    tenantName: "BioGen Innovations",
    userId: "consultant_01",
    inputPrompt: "Evaluate the R&D feasibility of BioGen's drug discovery pipeline acceleration under the Nisol Enterprise AI Grant Criteria...",
    outputResponse: "Evaluation Score 88/100: High commercial viability. The proposed Bayesian neural surrogate models meet all technical milestones for Tier-1 grant allocation...",
    usage: {
      promptTokens: 3100,
      completionTokens: 920,
      totalTokens: 4020,
    },
    latencyMs: 3410,
    estimatedCostUsd: 0.0231,
    status: "SUCCESS",
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    tags: ["grants", "claude-3-5", "feasibility"],
    metadata: { grantAppId: "grt_112" },
  },
  {
    id: "tr-nisol-004",
    traceName: "ROI Calculator Estimation",
    model: "gemini-flash-latest",
    provider: "google",
    tenantName: "FinTech Vantage",
    userId: "system",
    inputPrompt: "Calculate cost savings over 36 months for automated invoice reconciliation replacing 12 FTE manual processors...",
    outputResponse: "Estimated 3-Year Net Savings: $412,000. Payback period: 4.8 months. Internal Rate of Return (IRR): 245%...",
    usage: {
      promptTokens: 890,
      completionTokens: 420,
      totalTokens: 1310,
    },
    latencyMs: 980,
    estimatedCostUsd: 0.00019,
    status: "SUCCESS",
    createdAt: new Date(Date.now() - 1000 * 60 * 190).toISOString(),
    tags: ["roi", "financial-model"],
  },
];

/**
 * Retrieves the Langfuse Configuration from environment variables
 */
export function getLangfuseConfig(): LangfuseConfig {
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY || process.env.NEXT_PUBLIC_LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const baseUrl = (process.env.LANGFUSE_HOST || process.env.LANGFUSE_BASEURL || "https://cloud.langfuse.com").replace(/\/$/, "");

  const isConfigured = Boolean(publicKey && secretKey);

  return {
    publicKey,
    secretKey,
    baseUrl,
    isConfigured,
  };
}

/**
 * Calculates estimated cost for standard LLM models
 */
export function calculateCost(model: string, promptTokens: number, completionTokens: number): number {
  const m = model.toLowerCase();

  // Gemini pricing (approx $0.075 / 1M prompt, $0.30 / 1M completion)
  if (m.includes("gemini")) {
    return (promptTokens * 0.075 + completionTokens * 0.3) / 1_000_000;
  }
  // Claude 3.5 Sonnet ($3.00 / 1M prompt, $15.00 / 1M completion)
  if (m.includes("claude") || m.includes("sonnet")) {
    return (promptTokens * 3.0 + completionTokens * 15.0) / 1_000_000;
  }
  // GPT-4o ($2.50 / 1M prompt, $10.00 / 1M completion)
  if (m.includes("gpt-4o") || m.includes("openai")) {
    return (promptTokens * 2.5 + completionTokens * 10.0) / 1_000_000;
  }

  // Generic fallback ($1.00 / 1M prompt, $3.00 / 1M completion)
  return (promptTokens * 1.0 + completionTokens * 3.0) / 1_000_000;
}

/**
 * Determines provider from model name
 */
export function resolveProvider(model: string): ModelProvider {
  const m = model.toLowerCase();
  if (m.includes("gemini") || m.includes("google")) return "google";
  if (m.includes("gpt") || m.includes("openai")) return "openai";
  if (m.includes("claude") || m.includes("anthropic")) return "anthropic";
  return "custom";
}

/**
 * Sends a trace batch directly to Langfuse via REST Ingestion API
 */
async function dispatchToLangfuseCloud(record: TraceRecord): Promise<{ success: boolean; error?: string }> {
  const config = getLangfuseConfig();
  if (!config.isConfigured || !config.publicKey || !config.secretKey) {
    return { success: false, error: "Langfuse credentials not configured" };
  }

  try {
    const authHeader = `Basic ${Buffer.from(`${config.publicKey}:${config.secretKey}`).toString("base64")}`;
    const now = record.createdAt || new Date().toISOString();

    const payload = {
      batch: [
        {
          id: `trace-${record.id}`,
          type: "trace-create",
          timestamp: now,
          body: {
            id: record.id,
            name: record.traceName,
            userId: record.userId,
            sessionId: record.sessionId,
            metadata: {
              tenantName: record.tenantName,
              ...record.metadata,
            },
            tags: record.tags || ["nisol-discovery"],
          },
        },
        {
          id: `gen-${record.id}`,
          type: "generation-create",
          timestamp: now,
          body: {
            id: `gen-${record.id}`,
            traceId: record.id,
            name: record.traceName,
            model: record.model,
            startTime: now,
            endTime: new Date(new Date(now).getTime() + record.latencyMs).toISOString(),
            input: record.inputPrompt,
            output: record.outputResponse,
            usage: {
              input: record.usage.promptTokens,
              output: record.usage.completionTokens,
              total: record.usage.totalTokens,
              unit: "TOKENS",
            },
            level: record.status === "ERROR" ? "ERROR" : "DEFAULT",
            statusMessage: record.errorMessage,
          },
        },
      ],
    };

    const response = await fetch(`${config.baseUrl}/api/public/ingestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Langfuse Ingestion Warning ${response.status}]:`, errText);
      return { success: false, error: `Langfuse API ${response.status}: ${errText}` };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Langfuse Dispatch Error]:", err);
    return { success: false, error: err.message || "Failed to contact Langfuse endpoint" };
  }
}

/**
 * Record a generation trace into the observer ring-buffer and send to Langfuse if configured
 */
export async function recordTrace(params: {
  traceName: string;
  model: string;
  inputPrompt: string;
  outputResponse: string;
  promptTokens?: number;
  completionTokens?: number;
  latencyMs: number;
  userId?: string;
  tenantName?: string;
  sessionId?: string;
  status?: "SUCCESS" | "ERROR";
  errorMessage?: string;
  metadata?: Record<string, any>;
  tags?: string[];
}): Promise<TraceRecord> {
  const pTokens = params.promptTokens ?? Math.round(params.inputPrompt.length / 4);
  const cTokens = params.completionTokens ?? Math.round(params.outputResponse.length / 4);
  const provider = resolveProvider(params.model);
  const cost = calculateCost(params.model, pTokens, cTokens);

  const newRecord: TraceRecord = {
    id: `tr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    traceName: params.traceName,
    model: params.model,
    provider,
    inputPrompt: params.inputPrompt,
    outputResponse: params.outputResponse,
    usage: {
      promptTokens: pTokens,
      completionTokens: cTokens,
      totalTokens: pTokens + cTokens,
    },
    latencyMs: params.latencyMs,
    estimatedCostUsd: Number(cost.toFixed(6)),
    status: params.status || "SUCCESS",
    errorMessage: params.errorMessage,
    createdAt: new Date().toISOString(),
    userId: params.userId || "nisol_admin",
    tenantName: params.tenantName,
    sessionId: params.sessionId,
    metadata: params.metadata,
    tags: params.tags,
  };

  // Add to local ring buffer (keep last 50)
  traceRingBuffer.unshift(newRecord);
  if (traceRingBuffer.length > 50) {
    traceRingBuffer.pop();
  }

  // Attempt live dispatch to Langfuse Cloud / Self-hosted if configured
  const config = getLangfuseConfig();
  if (config.isConfigured) {
    await dispatchToLangfuseCloud(newRecord);
  }

  return newRecord;
}

/**
 * Compute aggregated metrics across all recorded traces
 */
export function getAggregatedMetrics(): ObservabilityMetrics {
  const totalGenerations = traceRingBuffer.length;
  let totalPromptTokens = 0;
  let totalCompletionTokens = 0;
  let totalCost = 0;
  let totalLatency = 0;
  let successCount = 0;

  const providerCounts = {
    google: 0,
    openai: 0,
    anthropic: 0,
  };

  for (const t of traceRingBuffer) {
    totalPromptTokens += t.usage.promptTokens;
    totalCompletionTokens += t.usage.completionTokens;
    totalCost += t.estimatedCostUsd;
    totalLatency += t.latencyMs;
    if (t.status === "SUCCESS") successCount++;

    if (t.provider === "google") providerCounts.google++;
    else if (t.provider === "openai") providerCounts.openai++;
    else if (t.provider === "anthropic") providerCounts.anthropic++;
  }

  return {
    totalGenerations,
    totalPromptTokens,
    totalCompletionTokens,
    totalTokens: totalPromptTokens + totalCompletionTokens,
    estimatedCostUsd: Number(totalCost.toFixed(5)),
    avgLatencyMs: totalGenerations > 0 ? Math.round(totalLatency / totalGenerations) : 0,
    successRate: totalGenerations > 0 ? Math.round((successCount / totalGenerations) * 100) : 100,
    providerBreakdown: providerCounts,
  };
}

/**
 * Returns full status response for the portal
 */
export function getObservabilityOverview(): ObservabilityStatusResponse {
  const config = getLangfuseConfig();
  const metrics = getAggregatedMetrics();

  return {
    config: {
      isConfigured: config.isConfigured,
      baseUrl: config.baseUrl,
      publicKeyMasked: config.publicKey ? `${config.publicKey.substring(0, 7)}...${config.publicKey.slice(-4)}` : undefined,
    },
    metrics,
    recentTraces: [...traceRingBuffer],
  };
}
