// lib/ai/reportGenerator.ts

import { createClient } from "@supabase/supabase-js";
import { aiClient } from "./client";
import { PROMPTS } from "./prompts";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!serviceKey) {
    console.warn(
      "[ReportGenerator] SUPABASE_SERVICE_ROLE_KEY is not configured in env. Falling back to ANON key. Make sure SECURITY DEFINER RLS fixes are applied in Supabase."
    );
  }

  return createClient(url, serviceKey || anonKey);
}

function parseAIJson<T>(text: string, fallback: T): T {
  try {
    const cleaned = text
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.warn("[ReportGenerator] Failed to parse JSON from AI response, using fallback:", err);
    return fallback;
  }
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
      raw_responses,
      tenants:tenant_id (name, industry),
      profiles:conducted_by (full_name)
    `)
    .eq("id", auditId)
    .single();

  if (auditErr || !audit) {
    throw new Error(`Audit record not found: ${auditErr?.message || auditId}`);
  }

  // Update audit status to 'in_analysis'
  await supabase.from("audits").update({ status: "in_analysis" }).eq("id", auditId);

  // 2. Fetch all 62 questions
  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select("*")
    .order("order_index", { ascending: true });

  if (qErr || !questions) {
    throw new Error(`Failed to fetch assessment questions: ${qErr?.message}`);
  }

  const rawResponses = (audit.raw_responses as Record<string, any>) || {};
  const tenantObj = Array.isArray(audit.tenants) ? audit.tenants[0] : audit.tenants;
  const companyName = tenantObj?.name || "Enterprise Client";
  const industry = tenantObj?.industry || "Technology";

  // 3. Calculate capability scores by section
  const sectionScores: Record<string, { total: number; count: number }> = {};
  let totalScoreSum = 0;
  let totalScoredQuestions = 0;

  questions.forEach((q) => {
    const resp = rawResponses[q.id] || rawResponses[String(q.id)];
    let score = 3; // Default midpoint score
    if (typeof resp === "object" && resp !== null && typeof resp.score === "number") {
      score = resp.score;
    } else if (typeof resp === "number") {
      score = resp;
    }

    if (!sectionScores[q.section]) {
      sectionScores[q.section] = { total: 0, count: 0 };
    }
    sectionScores[q.section].total += score;
    sectionScores[q.section].count += 1;

    totalScoreSum += score;
    totalScoredQuestions += 1;
  });

  const calculatedCapabilityScores: Record<string, number> = {};
  Object.keys(sectionScores).forEach((sec) => {
    const avg = sectionScores[sec].total / sectionScores[sec].count;
    calculatedCapabilityScores[sec] = Math.round(avg * 10) / 10;
  });

  const overallMaturityScore =
    totalScoredQuestions > 0 ? Math.round((totalScoreSum / totalScoredQuestions) * 10) / 10 : 3.5;

  console.log(`[ReportGenerator] Strategic analysis started for audit ${auditId} (${companyName})`);

  // 4. Trigger AI Generation Pipeline (10 distinct outputs)

  // Output 1: Executive Summary (Text)
  const execSummaryPrompt = PROMPTS.buildExecutiveSummaryPrompt(
    companyName,
    industry,
    rawResponses,
    calculatedCapabilityScores
  );
  const execSummaryRes = await aiClient.generateWithFallback("executive_summary", execSummaryPrompt);

  // Output 2: AI Readiness Assessment (JSON)
  const readinessPrompt = PROMPTS.buildAIReadinessPrompt(
    companyName,
    industry,
    rawResponses,
    calculatedCapabilityScores
  );
  const readinessRes = await aiClient.generateWithFallback("ai_readiness", readinessPrompt);
  const readinessJSON = parseAIJson(readinessRes.text, {
    overall_score: Math.round((overallMaturityScore / 5) * 100),
    readiness_level: "Developing Baseline",
    industry_benchmark_score: 60,
    radar_data: calculatedCapabilityScores,
  });

  // Output 3: Capability Scores (JSON)
  const capScoresPrompt = PROMPTS.buildCapabilityScoresPrompt(companyName, industry, rawResponses);
  const capScoresRes = await aiClient.generateWithFallback("capability_scores", capScoresPrompt);
  const capScoresJSON = parseAIJson(capScoresRes.text, {
    capabilities: Object.entries(calculatedCapabilityScores).map(([name, score]) => ({
      name,
      score,
      strengths: ["Established functional baseline"],
      gaps: ["Process automation opportunities"],
      recommendations: ["Upgrade platform tools"],
    })),
  });

  // Output 4: Top 20 AI Use Cases (JSON)
  const useCasesPrompt = PROMPTS.buildTopUseCasesPrompt(companyName, industry, rawResponses);
  const useCasesRes = await aiClient.generateWithFallback("top_use_cases", useCasesPrompt);
  const useCasesJSON = parseAIJson(useCasesRes.text, { use_cases: [] });

  // Output 5: Opportunity Matrix (JSON)
  const matrixPrompt = PROMPTS.buildOpportunityMatrixPrompt(companyName, industry, useCasesJSON);
  const matrixRes = await aiClient.generateWithFallback("opportunity_matrix", matrixPrompt);
  const matrixJSON = parseAIJson(matrixRes.text, { quadrants: {} });

  // Output 6: Quick Wins vs Strategic Bets (JSON)
  const quickWinsPrompt = PROMPTS.buildQuickWinsStrategicBetsPrompt(companyName, industry, useCasesJSON);
  const quickWinsRes = await aiClient.generateWithFallback("quick_wins_strategic_bets", quickWinsPrompt);
  const quickWinsJSON = parseAIJson(quickWinsRes.text, { quick_wins: [], strategic_bets: [] });

  // Output 7: AI Transformation Roadmap (JSON)
  const roadmapPrompt = PROMPTS.buildRoadmapPrompt(
    companyName,
    industry,
    useCasesJSON,
    calculatedCapabilityScores
  );
  const roadmapRes = await aiClient.generateWithFallback("roadmap", roadmapPrompt);
  const roadmapJSON = parseAIJson(roadmapRes.text, { phases: [] });

  // Output 8: ROI Estimates (JSON)
  const roiPrompt = PROMPTS.buildROIEstimatesPrompt(companyName, industry, useCasesJSON);
  const roiRes = await aiClient.generateWithFallback("roi_estimates", roiPrompt);
  const roiJSON = parseAIJson(roiRes.text, { summary: {}, department_breakdown: [] });

  // Output 9: Solution Blueprints (JSON)
  const blueprintsPrompt = PROMPTS.buildSolutionBlueprintsPrompt(companyName, industry, useCasesJSON);
  const blueprintsRes = await aiClient.generateWithFallback("solution_blueprints", blueprintsPrompt);
  const blueprintsJSON = parseAIJson(blueprintsRes.text, { blueprints: [] });

  // Output 10: Proposal Draft (Text)
  const proposalPrompt = PROMPTS.buildProposalDraftPrompt(
    companyName,
    industry,
    rawResponses,
    roadmapJSON,
    roiJSON
  );
  const proposalRes = await aiClient.generateWithFallback("proposal_draft", proposalPrompt);

  // 5. Store in audit_reports table
  const { data: reportData, error: reportErr } = await supabase
    .from("audit_reports")
    .insert({
      audit_id: auditId,
      version: 1,
      status: "draft",
      executive_summary: execSummaryRes.text,
      ai_readiness_assessment: readinessJSON,
      capability_scores: capScoresJSON,
      opportunity_matrix: matrixJSON,
      top_use_cases: useCasesJSON,
      quick_wins_strategic_bets: quickWinsJSON,
      roadmap: roadmapJSON,
      roi_estimates: roiJSON,
      solution_blueprints: blueprintsJSON,
      proposal_draft: proposalRes.text,
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
      overall_maturity_score: overallMaturityScore,
    })
    .eq("id", auditId);

  console.log(`[ReportGenerator] Successfully generated report ${reportData.id} for audit ${auditId}`);

  return {
    success: true,
    reportId: reportData.id,
    auditId,
    overallMaturityScore,
  };
}
