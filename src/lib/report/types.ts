// src/lib/report/types.ts

export interface BusinessContextJSON {
  companyName: string;
  industry: string;
  overallMaturityScore: number;
  readinessPercentage: number;
  sectionScores: Record<string, number>;
  lowScoringSections: string[];
  topPainPoints: string[];
  budgetEstimated?: string;
  timelineEstimated?: string;
  strategicGoals?: string[];
  techStackDetected?: string[];
}

export interface ExecutiveKPICard {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  status: "positive" | "warning" | "neutral" | "critical";
}

export interface ExecutiveDashboardData {
  readinessPercentage: number;
  readinessLevel: string;
  industryBenchmarkScore: number;
  kpiCards: ExecutiveKPICard[];
  spiderChartData: Record<string, number>;
  departmentHeatmapSummary: Array<{
    department: string;
    score: number;
    quickWinsCount: number;
  }>;
  overallNarrative?: string;
}

export interface DepartmentScorecard {
  department: string;
  maturityScore: number;
  maturityLevel: string;
  painPointsCount: number;
  topOpportunitiesCount: number;
  quickWinsCount: number;
  estimatedRoi: string;
  estimatedTimeline: string;
  painPoints: string[];
  topRecommendations: string[];
}

export interface UseCaseItem {
  id: string;
  name: string;
  department: string;
  businessProblem: string;
  proposedSolution: string;
  businessValueScore: number; // 0-100
  implementationEffortScore: number; // 0-100
  category: "Quick Win" | "Strategic Bet" | "Re-evaluate" | "Long-term Fill";
  estimatedRoiPercentage: number;
  estimatedTimelineWeeks: number;
  techStack: string[];
  expectedSavings: string;
  complexity: "Low" | "Medium" | "High";
  priority: number;
}

export interface OpportunityMatrixQuadrants {
  quickWins: UseCaseItem[];
  strategicBets: UseCaseItem[];
  fillIns: UseCaseItem[];
  reEvaluate: UseCaseItem[];
}

export interface SolutionBlueprintItem {
  id: string;
  useCaseId: string;
  title: string;
  department: string;
  objectives: string[];
  architectureOverview: string;
  technologyStack: string[];
  implementationPhases: Array<{
    phase: string;
    duration: string;
    deliverables: string[];
  }>;
  dataDependencies: string[];
  securityAndCompliance: string[];
  estimatedTimeline: string;
  estimatedCost: string;
  expectedRoi: string;
  successMetrics: string[];
}

export interface GovernanceData {
  overallGovernanceScore: number;
  readinessStatus: "High Risk" | "Developing" | "Enterprise Ready";
  policyReadiness: number; // 0-100
  dataPrivacyPiiScore: number;
  modelOversightScore: number;
  riskAuditScore: number;
  keyGaps: string[];
  recommendations: string[];
}

export interface DataReadinessData {
  overallDataScore: number;
  dataQualityScore: number;
  dataAccessibilityScore: number;
  vectorRagReadinessScore: number;
  dataCatalogEtlScore: number;
  keyBlockers: string[];
  recommendedDataRoadmap: string[];
}

export interface ROISummaryData {
  totalEstimatedAnnualSavings: string;
  totalInvestmentEstimated: string;
  overallRoiPercentage: number;
  averagePaybackMonths: number;
  departmentBreakdown: Array<{
    department: string;
    investment: string;
    annualSavings: string;
    roiPercentage: number;
    paybackMonths: number;
  }>;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseName: string; // e.g., "Phase 1: Quick Wins & Foundation (Months 1-3)"
  durationMonths: number;
  focus: string;
  keyProjects: string[];
  expectedMilestones: string[];
  estimatedCost: string;
}

export interface ChartPayloads {
  radarChart: Array<{ subject: string; score: number; fullMark: number }>;
  heatmap: Array<{ department: string; dimension: string; score: number }>;
  matrixCoordinates: Array<{
    name: string;
    effort: number;
    impact: number;
    category: string;
  }>;
}

export interface ReportObject {
  id?: string;
  auditId: string;
  version: number;
  companyName: string;
  industry: string;
  generatedAt: string;
  overallMaturityScore: number;
  
  // Sections
  executiveDashboard: ExecutiveDashboardData;
  executiveSummary: string;
  aiReadinessAssessment: {
    overallScore: number;
    readinessLevel: string;
    benchmarkScore: number;
    summaryInterpretation: string;
  };
  capabilityScores: Record<string, number>;
  departmentScorecards: DepartmentScorecard[];
  governanceAssessment: GovernanceData;
  dataReadinessAssessment: DataReadinessData;
  opportunityPortfolio: {
    totalOpportunities: number;
    quickWinsCount: number;
    strategicBetsCount: number;
    useCases: UseCaseItem[];
    matrixQuadrants: OpportunityMatrixQuadrants;
  };
  roiAnalysis: ROISummaryData;
  transformationRoadmap: {
    phases: RoadmapPhase[];
  };
  solutionBlueprints: SolutionBlueprintItem[];
  proposalDraft: string;
  
  // Visualization payloads
  chartPayloads: ChartPayloads;
}
