// src/app/api/observability/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getObservabilityOverview, recordTrace } from "@/lib/observability/langfuse";
import { AIClient } from "@/lib/ai/client";

export async function GET() {
  try {
    const overview = getObservabilityOverview();
    return NextResponse.json({ success: true, ...overview });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch observability status" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      traceName = "Interactive Portal Benchmark",
      model = "gemini-flash-latest",
      inputPrompt = "Summarize enterprise AI governance risks in 3 bullet points.",
      runLiveCall = false,
      tenantName = "Demo Enterprise Tenant",
      userId = "portal_user",
    } = body;

    const startTime = Date.now();
    let outputResponse = "";
    let status: "SUCCESS" | "ERROR" = "SUCCESS";
    let errorMessage: string | undefined;

    if (runLiveCall) {
      try {
        const client = new AIClient();
        // format modelSpec as provider/model
        let modelSpec = `google/${model}`;
        if (model.includes("gpt")) modelSpec = `openai/${model}`;
        else if (model.includes("claude")) modelSpec = `anthropic/${model}`;

        outputResponse = await client.callModel(modelSpec, inputPrompt, 500, 0.7);
      } catch (callErr: any) {
        status = "ERROR";
        errorMessage = callErr.message || "AI Call invocation error";
        outputResponse = `[Execution Error]: ${errorMessage}`;
      }
    } else {
      // High-fidelity simulated LLM response
      if (model.includes("gemini")) {
        outputResponse = "1. Data Sovereignty & Lineage: Inability to trace ingested proprietary models creates compliance liabilities under EU AI Act.\n2. Model Drift & Silent Degradation: Production inference outputs diverge without telemetry baseline drift detection.\n3. Shadow AI Adoption: Unregulated employee fine-tuning leading to zero-day credential leaks.";
      } else if (model.includes("claude")) {
        outputResponse = "Key Enterprise AI Governance Vulnerabilities:\n• Epistemic Opacity: Lack of mechanistic explainability in high-stakes automated credit and hiring decisions.\n• Prompt Injection & Data Extraction: Insufficient runtime boundary defenses on multi-tenant RAG vector search.\n• Lifecycle Responsibility: Ambiguous audit liability between foundation model vendor and enterprise downstream wrapper.";
      } else {
        outputResponse = "Core AI Governance Risks Identified:\n1. Unbounded Token Spend: Lack of quota limits causing budget overruns.\n2. Hallucination Risk: Generative models asserting false facts as definitive audit findings.\n3. Access Control Gaps: Sensitive internal HR and financial data accessible to unpermissioned agent tools.";
      }
    }

    const latencyMs = Math.max(Date.now() - startTime, runLiveCall ? 50 : Math.floor(Math.random() * 600) + 450);

    const record = await recordTrace({
      traceName,
      model,
      inputPrompt,
      outputResponse,
      latencyMs,
      status,
      errorMessage,
      userId,
      tenantName,
      tags: ["interactive-test", "portal-observer"],
    });

    return NextResponse.json({
      success: true,
      trace: record,
      overview: getObservabilityOverview(),
    });
  } catch (err: any) {
    console.error("[Observability API Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Error processing trace trigger" },
      { status: 500 }
    );
  }
}
