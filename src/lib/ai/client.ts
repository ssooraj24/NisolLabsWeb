// lib/ai/client.ts

import { MODEL_ROUTING, ReportOutputType } from "./modelConfig";

export class AIClient {
  private getGeminiKey(): string | undefined {
    return (
      process.env["Gemini_NisolLabs_API_Key"] ||
      process.env["Gemini-NisolLabs-API-Key"] ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY
    );
  }

  private getOpenAIKey(): string | undefined {
    return (
      process.env["OpenAI_NisolLabs_API_Key"] ||
      process.env["OpenAI-NisolLabs-API-Key"] ||
      process.env.OPENAI_API_KEY
    );
  }

  private getClaudeKey(): string | undefined {
    return (
      process.env["Claude_NisolLab_API_Key"] ||
      process.env["Claude_NisolLab_Key"] ||
      process.env["Claude-NisolLab-Key"] ||
      process.env["Claude-NisolLab-API-Key"] ||
      process.env.ANTHROPIC_API_KEY
    );
  }

  /**
   * Calls a specific model by provider and model identifier.
   */
  async callModel(modelSpec: string, prompt: string, maxTokens = 4000, temperature = 0.7): Promise<string> {
    const [provider, modelName] = modelSpec.split("/");

    if (provider === "google") {
      return this.callGemini(modelName || "gemini-1.5-flash", prompt, maxTokens, temperature);
    } else if (provider === "openai") {
      return this.callOpenAI(modelName || "gpt-4o", prompt, maxTokens, temperature);
    } else if (provider === "anthropic") {
      return this.callAnthropic(modelName || "claude-3-5-sonnet-20241022", prompt, maxTokens, temperature);
    } else {
      throw new Error(`Unsupported model provider: ${provider}`);
    }
  }

  private async callGemini(modelName: string, prompt: string, maxTokens: number, temperature: number): Promise<string> {
    const apiKey = this.getGeminiKey();
    if (!apiKey) {
      throw new Error("Gemini API key is missing or not loaded in environment variables");
    }

    const targetModel = modelName || "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[GEMINI ERROR ${response.status}]`, errText);
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Gemini returned empty response content");
    }
    return text;
  }

  private async callOpenAI(modelName: string, prompt: string, maxTokens: number, temperature: number): Promise<string> {
    const apiKey = this.getOpenAIKey();
    if (!apiKey) {
      throw new Error("OpenAI API key is missing or not loaded in environment variables");
    }

    const url = "https://api.openai.com/v1/chat/completions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName || "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[OPENAI ERROR ${response.status}]`, errText);
      throw new Error(`OpenAI API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("OpenAI returned empty response content");
    }
    return text;
  }

  private async callAnthropic(modelName: string, prompt: string, maxTokens: number, temperature: number): Promise<string> {
    const apiKey = this.getClaudeKey();
    if (!apiKey) {
      throw new Error("Anthropic API key is missing or not loaded in environment variables");
    }

    let anthropicModel = modelName;
    if (modelName === "claude-3-7-sonnet" || modelName === "claude-3.7-sonnet") {
      anthropicModel = "claude-3-7-sonnet-20250219";
    } else if (modelName === "claude-3-5-sonnet" || modelName === "claude-3.5-sonnet") {
      anthropicModel = "claude-3-5-sonnet-20241022";
    } else if (modelName === "claude-3-5-haiku" || modelName === "claude-3.5-haiku") {
      anthropicModel = "claude-3-5-haiku-20241022";
    }

    const url = "https://api.anthropic.com/v1/messages";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: anthropicModel,
        max_tokens: maxTokens,
        temperature,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[ANTHROPIC ERROR ${response.status}]`, errText);
      throw new Error(`Anthropic API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;
    if (!text) {
      throw new Error("Anthropic returned empty response content");
    }
    return text;
  }

  /**
   * Generates output with automatic provider fallback routing based on output type configuration.
   */
  async generateWithFallback(
    outputType: ReportOutputType,
    prompt: string
  ): Promise<{ text: string; modelUsed: string }> {
    const config = MODEL_ROUTING[outputType] || {
      primary: "google/gemini-1.5-flash",
      fallbacks: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet-20241022"],
      maxTokens: 4000,
      temperature: 0.7,
    };
    
    const candidateModels = [config.primary, ...config.fallbacks];
    const errors: { modelSpec: string; error: string }[] = [];

    console.log("=== AI Key Verification ===");
    console.log("Gemini Key Loaded:", !!this.getGeminiKey());
    console.log("OpenAI Key Loaded:", !!this.getOpenAIKey());
    console.log("Claude Key Loaded:", !!this.getClaudeKey());
    console.log("===========================");

    for (const modelSpec of candidateModels) {
      try {
        console.log(`[AIClient] Attempting generation for ${outputType} using model: ${modelSpec}`);
        const result = await this.callModel(modelSpec, prompt, config.maxTokens, config.temperature);
        console.log(`[AIClient] Successfully generated ${outputType} using model: ${modelSpec}`);
        return { text: result, modelUsed: modelSpec };
      } catch (err: any) {
        console.error("================================");
        console.error("Provider Failed:", modelSpec);
        console.error("Message:", err.message);
        console.error("Stack:", err.stack);
        console.error("================================");
        errors.push({ modelSpec, error: err.message });
      }
    }

    const failureSummary = errors.map((e) => `${e.modelSpec}: ${e.error}`).join(" | ");
    throw new Error(`All AI models failed for ${outputType}. Summary of all providers: ${failureSummary}`);
  }
}

export const aiClient = new AIClient();
