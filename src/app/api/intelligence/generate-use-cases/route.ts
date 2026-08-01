import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { aiClient } from "@/lib/ai/client";
import { PROMPTS } from "@/lib/ai/prompts";
import { DEFAULT_TOP_20_USE_CASES } from "@/lib/ai/defaultUseCases";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, serviceKey || anonKey);
}

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

    const supabase = getSupabaseClient();

    // 1. Fetch Audit Report and linked Audit & Tenant data
    let targetReportId = reportId;
    let rawAudit: any = null;

    if (reportId) {
      const { data: report, error: repErr } = await supabase
        .from("audit_reports")
        .select(`
          id,
          audit_id,
          audits (
            id,
            raw_responses,
            tenants:tenant_id (name, industry)
          )
        `)
        .eq("id", reportId)
        .single();

      if (repErr || !report) {
        return NextResponse.json(
          { success: false, error: `Report not found: ${repErr?.message || reportId}` },
          { status: 404 }
        );
      }
      targetReportId = report.id;
      rawAudit = Array.isArray(report.audits) ? report.audits[0] : report.audits;
    } else if (auditId) {
      const { data: report, error: repErr } = await supabase
        .from("audit_reports")
        .select(`
          id,
          audit_id,
          audits (
            id,
            raw_responses,
            tenants:tenant_id (name, industry)
          )
        `)
        .eq("audit_id", auditId)
        .single();

      if (repErr || !report) {
        return NextResponse.json(
          { success: false, error: `Report for audit not found: ${repErr?.message || auditId}` },
          { status: 404 }
        );
      }
      targetReportId = report.id;
      rawAudit = Array.isArray(report.audits) ? report.audits[0] : report.audits;
    }

    const rawResponses = rawAudit?.raw_responses || {};
    const tenantObj = Array.isArray(rawAudit?.tenants) ? rawAudit.tenants[0] : rawAudit?.tenants;
    const companyName = tenantObj?.name || "Enterprise Client";
    const industry = tenantObj?.industry || "Technology";

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

    // 3. Save to database
    const { error: updateErr } = await supabase
      .from("audit_reports")
      .update({
        top_use_cases: newUseCasesData,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", targetReportId);

    if (updateErr) {
      throw new Error(`Failed to update top_use_cases in database: ${updateErr.message}`);
    }

    console.log(`[GenerateUseCases API] Successfully generated ${useCasesList.length} customized use cases.`);

    return NextResponse.json({
      success: true,
      reportId: targetReportId,
      top_use_cases: newUseCasesData,
    });
  } catch (err: any) {
    console.error("[GenerateUseCases API] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate customized use cases" },
      { status: 500 }
    );
  }
}
