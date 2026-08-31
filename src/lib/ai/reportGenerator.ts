// lib/ai/reportGenerator.ts

import { createClient } from "@supabase/supabase-js";
import { composeFullReport } from "@/lib/report/reportComposer";
import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";
import { encryptPayload } from "@/lib/security/encryption";
import { logAuditEvent } from "@/lib/security/auditLogger";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!serviceKey) {
    console.warn(
      "[ReportGenerator] SUPABASE_SERVICE_ROLE_KEY is not configured in env. Falling back to ANON key."
    );
  }

  return createClient(url, serviceKey || anonKey);
}

export async function generateFullReport(auditId: string, userId?: string) {
  const supabase = getSupabaseClient();

  // 1. Fetch Audit, Tenant, and Profiles
  const { data: audit, error: auditErr } = await supabase
    .from("audits")
    .select(`
      id,
      title,
      status,
      tenant_id,
      raw_responses,
      tenants:tenant_id (name, industry, pricing_plan),
      profiles:conducted_by (full_name)
    `)
    .eq("id", auditId)
    .single();

  if (auditErr || !audit) {
    throw new Error(`Audit record not found: ${auditErr?.message || auditId}`);
  }

  // Update audit status to 'in_analysis'
  await supabase.from("audits").update({ status: "in_analysis" }).eq("id", auditId);

  // 2. Fetch all questions
  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select("*")
    .order("order_index", { ascending: true });

  if (qErr || !questions) {
    throw new Error(`Failed to fetch assessment questions: ${qErr?.message}`);
  }

  const rawResponses = (audit.raw_responses as Record<string, any>) || {};
  const companyName = resolveClientCompanyName(null, audit);
  const tenantObj = Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants;
  const industry = tenantObj?.industry || rawResponses.industry || "Technology & Operations";
  const planTier = tenantObj?.pricing_plan || "foundation";

  // 3. Compose Full Modular Report Object using Report Composer Pipeline as per Plan Tier
  const reportObj = await composeFullReport(
    auditId,
    companyName,
    industry,
    questions,
    rawResponses,
    planTier
  );

  // 4. Encrypt full report object as report_payload
  const encryptedReportPayload = encryptPayload(reportObj);

  // 5. Store in audit_reports table (storing both backward-compatible fields and encrypted JSON payload)
  const { data: reportData, error: reportErr } = await supabase
    .from("audit_reports")
    .insert({
      audit_id: auditId,
      version: 1,
      status: "draft",
      plan_tier: planTier,
      report_payload: encryptedReportPayload,
      executive_summary: reportObj.executiveSummary,
      ai_readiness_assessment: reportObj.aiReadinessAssessment,
      capability_scores: reportObj.capabilityScores,
      opportunity_matrix: reportObj.opportunityPortfolio.matrixQuadrants,
      top_use_cases: { use_cases: reportObj.opportunityPortfolio.useCases },
      quick_wins_strategic_bets: {
        quick_wins: reportObj.opportunityPortfolio.matrixQuadrants.quickWins,
        strategic_bets: reportObj.opportunityPortfolio.matrixQuadrants.strategicBets,
      },
      roadmap: reportObj.transformationRoadmap,
      roi_estimates: reportObj.roiAnalysis,
      solution_blueprints: { blueprints: reportObj.solutionBlueprints },
      proposal_draft: reportObj.proposalDraft,
      created_by: userId || null,
      generated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (reportErr || !reportData) {
    throw new Error(`Failed to save report to database: ${reportErr?.message}`);
  }

  // Update audit status to 'report_ready' and store calculated overall score
  await supabase
    .from("audits")
    .update({
      status: "report_ready",
      overall_maturity_score: reportObj.overallMaturityScore,
    })
    .eq("id", auditId);

  // 6. Log Audit Event
  await logAuditEvent({
    userId,
    tenantId: audit.tenant_id,
    action: "GENERATE_AI_REPORT",
    resourceType: "audit_reports",
    metadata: { auditId, reportId: reportData.id, maturityScore: reportObj.overallMaturityScore },
  });

  console.log(`[ReportGenerator] Successfully generated strategy report ${reportData.id} for audit ${auditId}`);

  return {
    success: true,
    reportId: reportData.id,
    auditId,
    overallMaturityScore: reportObj.overallMaturityScore,
  };
}
