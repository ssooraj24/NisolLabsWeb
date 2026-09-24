import { NextRequest, NextResponse } from "next/server";
import { query, getOne } from "@/lib/db";
import { aiClient } from "@/lib/ai/client";
import { PROMPTS } from "@/lib/ai/prompts";
import { DEFAULT_TOP_20_USE_CASES } from "@/lib/ai/defaultUseCases";

function parseAIJson<T>(text: string, fallback: T): T {
  if (!text || typeof text !== "string") return fallback;

  try {
    let cleaned = text
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    const firstBrace = cleaned.indexOf("{");
    const firstBracket = cleaned.indexOf("[");
    let startIdx = -1;
    if (firstBrace !== -1 && firstBracket !== -1) {
      startIdx = Math.min(firstBrace, firstBracket);
    } else if (firstBrace !== -1) {
      startIdx = firstBrace;
    } else if (firstBracket !== -1) {
      startIdx = firstBracket;
    }

    const lastBrace = cleaned.lastIndexOf("}");
    const lastBracket = cleaned.lastIndexOf("]");
    let endIdx = -1;
    if (lastBrace !== -1 && lastBracket !== -1) {
      endIdx = Math.max(lastBrace, lastBracket);
    } else if (lastBrace !== -1) {
      endIdx = lastBrace;
    } else if (lastBracket !== -1) {
      endIdx = lastBracket;
    }

    if (startIdx !== -1 && endIdx > startIdx) {
      cleaned = cleaned.substring(startIdx, endIdx + 1);
    }

    cleaned = cleaned.replace(/,\s*([\}\]])/g, "$1");
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.warn("[GenerateUseCases API] Failed to parse JSON from AI response:", err);
    return fallback;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, auditId } = body;

    if (!reportId && !auditId) {
      return NextResponse.json(
        { success: false, error: "reportId or auditId is required" },
        { status: 400 }
      );
    }

    // 1. Fetch Audit Report and linked Audit & Tenant data from PostgreSQL
    const selectSql = `
      SELECT r.id, r.audit_id, a.raw_responses, t.name AS company_name, t.industry
      FROM public.audit_reports r
      JOIN public.audits a ON r.audit_id = a.id
      LEFT JOIN public.tenants t ON a.tenant_id = t.id
      WHERE ${reportId ? "r.id = $1" : "r.audit_id = $1"}
      LIMIT 1
    `;

    const report = await getOne<any>(selectSql, [reportId || auditId]);

    if (!report) {
      return NextResponse.json(
        { success: false, error: `Report not found for ${reportId || auditId}` },
        { status: 404 }
      );
    }

    const targetReportId = report.id;
    const rawResponses = report.raw_responses || {};
    const companyName = report.company_name || "Enterprise Client";
    const industry = report.industry || "Technology";

    console.log(`[GenerateUseCases API] Generating custom use cases for report ${targetReportId} (${companyName})`);

    // 2. Generate customized AI use cases
    const useCasesPrompt = PROMPTS.buildTopUseCasesPrompt(companyName, industry, rawResponses);
    const useCasesRes = await aiClient.generateWithFallback("top_use_cases", useCasesPrompt);

    const parsedJSON: any = parseAIJson(useCasesRes.text, { use_cases: [] });
    let useCasesList: any[] =
      parsedJSON?.use_cases ||
      parsedJSON?.useCases ||
      parsedJSON?.top_use_cases ||
      (Array.isArray(parsedJSON) ? parsedJSON : []);

    if (!Array.isArray(useCasesList) || useCasesList.length === 0) {
      console.warn("[GenerateUseCases API] AI response parsing resulted in empty list. Utilizing fallback use cases.");
      useCasesList = DEFAULT_TOP_20_USE_CASES.slice(0, 10);
    }

    const newUseCasesData = { use_cases: useCasesList };

    // 3. Save to database using PostgreSQL query
    await query(
      `UPDATE public.audit_reports SET top_use_cases = $1, last_edited_at = $2 WHERE id = $3`,
      [JSON.stringify(newUseCasesData), new Date().toISOString(), targetReportId]
    );

    return NextResponse.json(
      {
        success: true,
        reportId: targetReportId,
        useCasesCount: useCasesList.length,
        data: newUseCasesData,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[GenerateUseCases API] Critical error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate use cases" },
      { status: 500 }
    );
  }
}
