// lib/ai/reportGenerator.ts

import { query, getOne, getAll } from "@/lib/db";
import { composeFullReport } from "@/lib/report/reportComposer";
import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";
import { encryptPayload } from "@/lib/security/encryption";
import { logAuditEvent } from "@/lib/security/auditLogger";

export async function generateFullReport(auditId: string, userId?: string) {
  // 1. Fetch Audit, Tenant, and Profiles
  const auditSql = `
    SELECT 
      a.id,
      a.title,
      a.status,
      a.tenant_id,
      a.raw_responses,
      t.name AS tenant_name,
      t.industry,
      t.pricing_plan,
      p.full_name AS consultant_name
    FROM public.audits a
    LEFT JOIN public.tenants t ON a.tenant_id = t.id
    LEFT JOIN public.profiles p ON a.conducted_by = p.id
    WHERE a.id = $1
  `;

  const audit = await getOne(auditSql, [auditId]);

  if (!audit) {
    throw new Error(`Audit record not found: ${auditId}`);
  }

  // Update audit status to 'in_analysis'
  await query(`UPDATE public.audits SET status = 'in_analysis' WHERE id = $1`, [auditId]);

  // 2. Fetch all questions
  const questions = await getAll(`SELECT * FROM public.questions ORDER BY order_index ASC`);

  if (!questions || questions.length === 0) {
    throw new Error(`Failed to fetch assessment questions from database`);
  }

  const rawResponses = (audit.raw_responses as Record<string, any>) || {};
  const companyName = resolveClientCompanyName(null, {
    ...audit,
    tenants: { name: audit.tenant_name, industry: audit.industry, pricing_plan: audit.pricing_plan }
  });
  const industry = audit.industry || rawResponses.industry || "Technology & Operations";
  const planTier = audit.pricing_plan || "foundation";

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

  // 5. Store in audit_reports table
  const insertSql = `
    INSERT INTO public.audit_reports (
      audit_id,
      version,
      status,
      executive_summary,
      ai_readiness_assessment,
      capability_scores,
      opportunity_matrix,
      top_use_cases,
      quick_wins_strategic_bets,
      roadmap,
      roi_estimates,
      solution_blueprints,
      proposal_draft,
      created_by,
      generated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING id
  `;

  const reportData = await getOne(insertSql, [
    auditId,
    1,
    "draft",
    reportObj.executiveSummary,
    JSON.stringify(reportObj.aiReadinessAssessment),
    JSON.stringify(reportObj.capabilityScores),
    JSON.stringify(reportObj.opportunityPortfolio.matrixQuadrants),
    JSON.stringify({ use_cases: reportObj.opportunityPortfolio.useCases }),
    JSON.stringify({
      quick_wins: reportObj.opportunityPortfolio.matrixQuadrants.quickWins,
      strategic_bets: reportObj.opportunityPortfolio.matrixQuadrants.strategicBets,
    }),
    JSON.stringify(reportObj.transformationRoadmap),
    JSON.stringify(reportObj.roiAnalysis),
    JSON.stringify({ blueprints: reportObj.solutionBlueprints }),
    reportObj.proposalDraft,
    userId || null,
    new Date().toISOString(),
  ]);

  if (!reportData) {
    throw new Error(`Failed to save report to database`);
  }

  // Update audit status to 'report_ready' and store calculated overall score
  await query(
    `UPDATE public.audits SET status = 'report_ready', overall_maturity_score = $1 WHERE id = $2`,
    [reportObj.overallMaturityScore, auditId]
  );

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
