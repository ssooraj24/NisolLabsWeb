// src/lib/report/reportComposer.ts

import { ReportObject } from "./types";
import { computeCapabilityScores, RawQuestion } from "./scoreEngine";
import { distillBusinessContext } from "./contextDistiller";
import { generateCustomizedUseCases } from "./useCaseEngine";
import { categorizeUseCasesAndMatrix, computeFinancialROI, buildTransformationRoadmap } from "./analyticsEngine";
import { generateDepartmentScorecards } from "./departmentEngine";
import { generateGovernanceAssessment } from "./governanceEngine";
import { generateDataReadinessAssessment } from "./dataReadinessEngine";
import { generateOCMPlan } from "./ocmEngine";
import { generateSolutionBlueprints } from "./blueprintEngine";
import { generateExecutiveSummaryNarrative, generateProposalDraftNarrative } from "./narrativeEngine";
import { generateChartPayloads } from "./visualizationEngine";
import { resolveIndustryBenchmark } from "./industryBenchmarks";
import { PricingPlan, normalizePricingPlan } from "./reportPortfolioTypes";

export async function composeFullReport(
  auditId: string,
  companyName: string,
  industry: string,
  questions: RawQuestion[],
  rawResponses: Record<string, any>,
  planTier: PricingPlan | string = "foundation"
): Promise<ReportObject> {
  const activePlan = normalizePricingPlan(planTier);
  console.log(`[ReportComposer] Starting composite report build for audit ${auditId} (${companyName}) under Plan: ${activePlan}`);

  // 1. Score Engine
  const { calculatedCapabilityScores, overallMaturityScore } = computeCapabilityScores(questions, rawResponses);

  // 2. Business Context Distiller & Industry Benchmark Lookup
  const businessContext = distillBusinessContext(
    companyName,
    industry,
    rawResponses,
    calculatedCapabilityScores,
    overallMaturityScore
  );
  const benchmark = resolveIndustryBenchmark(businessContext.industry);

  // 3. Hybrid Use Case Engine (AI Opportunity Library + LLM Contextualization)
  const useCases = await generateCustomizedUseCases(businessContext);

  // 4. Analytics Engine (Matrix Placement, Financial ROI Math with Sensitivity & Scenarios, Roadmap)
  const matrixQuadrants = categorizeUseCasesAndMatrix(useCases);
  const roiAnalysis = computeFinancialROI(useCases, businessContext);
  const transformationRoadmap = {
    phases: buildTransformationRoadmap(
      matrixQuadrants.quickWins,
      matrixQuadrants.strategicBets,
      matrixQuadrants.fillIns
    ),
  };

  // 5. Department, Governance, Data Readiness, and OCM Engines
  const departmentScorecards = generateDepartmentScorecards(businessContext, useCases);
  const governanceAssessment = generateGovernanceAssessment(businessContext);
  const dataReadinessAssessment = generateDataReadinessAssessment(businessContext);
  const ocmPlan = generateOCMPlan(businessContext);

  // 6. Solution Blueprint Engine
  const solutionBlueprints = await generateSolutionBlueprints(businessContext, useCases);

  // 7. Visualization & Chart Engine
  const { chartPayloads, kpiCards } = generateChartPayloads(businessContext, useCases, departmentScorecards);

  // 8. Narrative LLM Engine
  const executiveSummary = await generateExecutiveSummaryNarrative(businessContext, roiAnalysis);
  const proposalDraft = await generateProposalDraftNarrative(businessContext, roiAnalysis);

  const executiveDashboard = {
    readinessPercentage: businessContext.readinessPercentage,
    readinessLevel: businessContext.overallMaturityScore >= 3.5 ? "Structured Baseline" : "Developing Baseline",
    industryBenchmarkScore: benchmark.medianScore,
    industryTopQuartileScore: benchmark.topQuartileScore,
    kpiCards,
    spiderChartData: calculatedCapabilityScores,
    departmentHeatmapSummary: departmentScorecards.map((d) => ({
      department: d.department,
      score: d.maturityScore,
      quickWinsCount: d.quickWinsCount,
    })),
    overallNarrative: executiveSummary,
  };

  return {
    auditId,
    version: 1,
    planTier: activePlan,
    companyName: businessContext.companyName,
    industry: businessContext.industry,
    generatedAt: new Date().toISOString(),
    overallMaturityScore,
    executiveDashboard,
    executiveSummary,
    aiReadinessAssessment: {
      overallScore: businessContext.readinessPercentage,
      readinessLevel: executiveDashboard.readinessLevel,
      benchmarkScore: benchmark.medianScore,
      topQuartileBenchmarkScore: benchmark.topQuartileScore,
      summaryInterpretation: `Calculated AI Readiness score of ${businessContext.readinessPercentage}% across ${Object.keys(calculatedCapabilityScores).length} strategic capability dimensions vs. ${benchmark.name} median benchmark of ${benchmark.medianScore}%.`,
    },
    capabilityScores: calculatedCapabilityScores,
    departmentScorecards,
    governanceAssessment,
    dataReadinessAssessment,
    ocmPlan,
    opportunityPortfolio: {
      totalOpportunities: useCases.length,
      quickWinsCount: matrixQuadrants.quickWins.length,
      strategicBetsCount: matrixQuadrants.strategicBets.length,
      useCases,
      matrixQuadrants,
    },
    roiAnalysis,
    transformationRoadmap,
    solutionBlueprints,
    proposalDraft,
    chartPayloads,
  };
}
