// lib/ai/client.ts

import { MODEL_ROUTING, MODEL_ALIASES, ReportOutputType, ModelAlias } from "./modelConfig";
import { recordTrace } from "@/lib/observability/langfuse";

export interface AICallMetadata {
  app_name?: string;
  feature?: string;
  tenant_name?: string;
  tenant_id?: string;
  user_id?: string;
  audit_id?: string;
  [key: string]: any;
}

export interface AICallParams {
  model?: ModelAlias;
  messages?: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  prompt?: string;
  maxTokens?: number;
  temperature?: number;
  responseFormat?: { type: "json_object" | "text" } | Record<string, any>;
  tools?: any[];
  toolChoice?: any;
  stream?: boolean;
  userId?: string;
  tenantName?: string;
  feature?: string;
  metadata?: AICallMetadata;
  tags?: string[];
}

export interface AICallResult {
  text: string;
  modelUsed: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  rawResponse?: any;
}

export class AIClient {
  private readonly appName = "nisollabs";

  /**
   * Resolves the Central AI Gateway Base URL (LiteLLM)
   * Internal Docker fallback: http://ai-gateway:4000/v1
   * External fallback: https://llm.nisolai.com/v1 or http://localhost:4000/v1
   */
  public getGatewayUrl(): string {
    const raw = process.env.AI_GATEWAY_URL || "http://ai-gateway:4000/v1";
    return raw.replace(/\/+$/, "");
  }

  /**
   * Resolves the Central AI Gateway master/auth token
   */
  public getGatewayKey(): string {
    return (
      process.env.LITELLM_MASTER_KEY ||
      process.env.AI_GATEWAY_KEY ||
      "nisol-internal-ai-master-key"
    );
  }

  /**
   * Normalizes legacy model specs (e.g. "google/gemini-flash-latest" -> "nisol-smart")
   * into gateway aliases when applicable, or preserves custom model spec.
   */
  private normalizeModel(modelSpec: string): string {
    const trimmed = modelSpec.trim();
    if (
      trimmed === MODEL_ALIASES.SMART ||
      trimmed === MODEL_ALIASES.FAST ||
      trimmed === MODEL_ALIASES.CLIENT_PREMIUM
    ) {
      return trimmed;
    }

    // Strip provider prefix if present (e.g., "openai/gpt-4o" -> "gpt-4o")
    if (trimmed.includes("/")) {
      const parts = trimmed.split("/");
      return parts[1] || parts[0];
    }

    return trimmed;
  }

  /**
   * Core invocation method for Central AI Gateway (LiteLLM OpenAI-compatible endpoint)
   * Automatically attaches application-level metadata and Langfuse telemetry tracking.
   */
  async chatCompletion(params: AICallParams): Promise<AICallResult> {
    const gatewayUrl = this.getGatewayUrl();
    const apiKey = this.getGatewayKey();
    const targetModel = this.normalizeModel(params.model || MODEL_ALIASES.SMART);
    const featureName = params.feature || "chat_completion";
    const startTime = Date.now();

    const messages = params.messages || [
      { role: "user" as const, content: params.prompt || "" },
    ];
    const promptString = params.prompt || messages.map((m) => `${m.role}: ${m.content}`).join("\n\n");

    const mergedMetadata: AICallMetadata = {
      app_name: this.appName,
      feature: featureName,
      tenant_name: params.tenantName,
      ...(params.metadata || {}),
    };

    const payload: Record<string, any> = {
      model: targetModel,
      messages,
      max_tokens: params.maxTokens ?? 4000,
      temperature: params.temperature ?? 0.7,
      user: params.userId || this.appName,
      metadata: mergedMetadata,
    };

    if (params.responseFormat) {
      payload.response_format = params.responseFormat;
    }
    if (params.tools) {
      payload.tools = params.tools;
    }
    if (params.toolChoice) {
      payload.tool_choice = params.toolChoice;
    }
    if (params.stream !== undefined) {
      payload.stream = params.stream;
    }

    const endpoint = `${gatewayUrl}/chat/completions`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[AI GATEWAY ERROR ${response.status}] Endpoint: ${endpoint}`, errText);
        throw new Error(`AI Gateway error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const outputText = data.choices?.[0]?.message?.content || "";

      const promptTokens = data.usage?.prompt_tokens ?? Math.max(1, Math.round(promptString.length / 4));
      const completionTokens = data.usage?.completion_tokens ?? Math.max(1, Math.round(outputText.length / 4));
      const totalTokens = data.usage?.total_tokens ?? promptTokens + completionTokens;

      // Telemetry trace logging for Langfuse
      recordTrace({
        traceName: `Gateway [${targetModel}]: ${featureName}`,
        model: targetModel,
        inputPrompt: promptString,
        outputResponse: outputText,
        promptTokens,
        completionTokens,
        latencyMs,
        status: "SUCCESS",
        userId: params.userId || this.appName,
        tenantName: params.tenantName,
        metadata: mergedMetadata,
        tags: [
          "nisol-ai-gateway",
          `model:${targetModel}`,
          `feature:${featureName}`,
          ...(params.tags || []),
        ],
      }).catch((traceErr) => console.warn("[Langfuse Trace Warning]:", traceErr));

      return {
        text: outputText,
        modelUsed: targetModel,
        usage: { promptTokens, completionTokens, totalTokens },
        rawResponse: data,
      };
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;

      // Telemetry failure record
      recordTrace({
        traceName: `Gateway Failure [${targetModel}]: ${featureName}`,
        model: targetModel,
        inputPrompt: promptString,
        outputResponse: `[FAILED]: ${err.message}`,
        latencyMs,
        status: "ERROR",
        errorMessage: err.message,
        userId: params.userId || this.appName,
        tenantName: params.tenantName,
        metadata: mergedMetadata,
        tags: [
          "nisol-ai-gateway",
          "error",
          `model:${targetModel}`,
          `feature:${featureName}`,
          ...(params.tags || []),
        ],
      }).catch((traceErr) => console.warn("[Langfuse Trace Warning]:", traceErr));

      throw err;
    }
  }

  /**
   * Direct model invocation helper matching legacy signature
   */
  async callModel(
    modelSpec: string,
    prompt: string,
    maxTokens = 4000,
    temperature = 0.7,
    options: Partial<AICallParams> = {}
  ): Promise<string> {
    const result = await this.chatCompletion({
      model: modelSpec,
      prompt,
      maxTokens,
      temperature,
      ...options,
    });
    return result.text;
  }

  /**
   * Generates output using Central AI Gateway with automatic waterfall model fallback.
   * Central AI Gateway LiteLLM handles fallbacks natively, but client-level fallback is also
   * preserved across configured tier aliases.
   */
  async generateWithFallback(
    outputType: ReportOutputType,
    prompt: string,
    options: Partial<AICallParams> = {}
  ): Promise<{ text: string; modelUsed: string }> {
    const config = MODEL_ROUTING[outputType] || {
      primary: MODEL_ALIASES.SMART,
      fallbacks: [MODEL_ALIASES.CLIENT_PREMIUM, MODEL_ALIASES.FAST],
      maxTokens: 4000,
      temperature: 0.7,
    };

    const candidateModels = [config.primary, ...config.fallbacks];
    const errors: { modelSpec: string; error: string }[] = [];

    console.log("=== Central AI Gateway Invocation ===");
    console.log("Gateway Endpoint:", this.getGatewayUrl());
    console.log("Output Type:", outputType);
    console.log("Candidate Models:", candidateModels.join(" -> "));
    console.log("=====================================");

    for (const modelSpec of candidateModels) {
      try {
        console.log(`[AIClient] Attempting generation for ${outputType} using model alias: ${modelSpec}`);
        const result = await this.chatCompletion({
          model: modelSpec,
          prompt,
          maxTokens: options.maxTokens ?? config.maxTokens,
          temperature: options.temperature ?? config.temperature,
          feature: options.feature || outputType,
          ...options,
        });

        console.log(`[AIClient] Successfully generated ${outputType} using model: ${result.modelUsed}`);
        return { text: result.text, modelUsed: result.modelUsed };
      } catch (err: any) {
        console.error(`[AIClient] Model alias ${modelSpec} failed:`, err.message);
        errors.push({ modelSpec, error: err.message });
      }
    }

    const failureSummary = errors.map((e) => `${e.modelSpec}: ${e.error}`).join(" | ");
    throw new Error(`All Central AI Gateway models failed for ${outputType}. Summary: ${failureSummary}`);
  }
}

export const aiClient = new AIClient();
