// src/lib/report/reportComposer.ts

import { ReportObject } from "./types";
import { computeCapabilityScores, RawQuestion } from "./scoreEngine";
import { distillBusinessContext } from "./contextDistiller";
import { generateCustomizedUseCases } from "./useCaseEngine";
import { categorizeUseCasesAndMatrix, computeFinancialROI, buildTransformationRoadmap } from "./analyticsEngine";
import { generateDepartmentScorecards } from "./departmentEngine";
import { generateGovernanceAssessment } from "./governanceEngine";
import { generateDataReadinessAssessment } from "./dataReadinessEngine";
import { generateSolutionBlueprints } from "./blueprintEngine";
import { generateExecutiveSummaryNarrative, generateProposalDraftNarrative } from "./narrativeEngine";
import { generateChartPayloads } from "./visualizationEngine";

export async function composeFullReport(
  auditId: string,
  companyName: string,
  industry: string,
  questions: RawQuestion[],
  rawResponses: Record<string, any>
): Promise<ReportObject> {
  console.log(`[ReportComposer] Starting composite report build for audit ${auditId} (${companyName})`);

  // 1. Score Engine
  const { calculatedCapabilityScores, overallMaturityScore } = computeCapabilityScores(questions, rawResponses);

  // 2. Business Context Distiller
  const businessContext = distillBusinessContext(
    companyName,
    industry,
    rawResponses,
    calculatedCapabilityScores,
    overallMaturityScore
  );

  // 3. Hybrid Use Case Engine (AI Opportunity Library + LLM Contextualization)
  const useCases = await generateCustomizedUseCases(businessContext);

  // 4. Analytics Engine (Matrix Placement, Financial ROI Math, Roadmap)
  const matrixQuadrants = categorizeUseCasesAndMatrix(useCases);
  const roiAnalysis = computeFinancialROI(useCases);
  const transformationRoadmap = {
    phases: buildTransformationRoadmap(
      matrixQuadrants.quickWins,
      matrixQuadrants.strategicBets,
      matrixQuadrants.fillIns
    ),
  };

  // 5. Department, Governance, and Data Readiness Engines
  const departmentScorecards = generateDepartmentScorecards(businessContext, useCases);
  const governanceAssessment = generateGovernanceAssessment(businessContext);
  const dataReadinessAssessment = generateDataReadinessAssessment(businessContext);

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
    industryBenchmarkScore: 62,
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
    companyName: businessContext.companyName,
    industry: businessContext.industry,
    generatedAt: new Date().toISOString(),
    overallMaturityScore,
    executiveDashboard,
    executiveSummary,
    aiReadinessAssessment: {
      overallScore: businessContext.readinessPercentage,
      readinessLevel: executiveDashboard.readinessLevel,
      benchmarkScore: 62,
      summaryInterpretation: `Calculated AI Readiness score of ${businessContext.readinessPercentage}% across ${Object.keys(calculatedCapabilityScores).length} strategic capability dimensions.`,
    },
    capabilityScores: calculatedCapabilityScores,
    departmentScorecards,
    governanceAssessment,
    dataReadinessAssessment,
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
