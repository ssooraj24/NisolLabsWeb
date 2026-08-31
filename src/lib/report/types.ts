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
  employeeCount?: number;
  annualRevenueUsd?: number;
  manualTaskHoursPct?: number;
  primaryCurrency?: "INR" | "USD";
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
  industryTopQuartileScore?: number;
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
  // Multi-criteria prioritization extensions
  strategicFitScore?: number; // 1-5
  easeOfImplementationScore?: number; // 1-5
  dataReadinessScore?: number; // 1-5
  riskMitigationScore?: number; // 1-5
  compositePriorityRank?: number;
  timeToValueWeeks?: number;
  estimatedFteSavings?: number;
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

export interface RiskItem {
  id: string;
  category: "Regulatory & Compliance" | "Data Privacy & Security" | "Model Risk & Bias" | "Operational & Adoption" | "Vendor & Infrastructure";
  description: string;
  potentialImpact: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  riskScore: number; // likelihood * impact (1-25)
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  regulatoryFrameworks: string[]; // e.g., ["DPDP Act 2023", "EU AI Act", "GDPR"]
  mitigationStrategy: string;
  ownerRole: string;
  residualRisk: "Low" | "Medium" | "High";
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
  riskRegister: RiskItem[];
  regulatoryComplianceMatrix: Array<{
    regulation: string;
    status: "Compliant" | "Action Required" | "Non-Compliant" | "Under Review";
    gapSummary: string;
    remediationAction: string;
  }>;
}

export interface DataQualityDimension {
  dimension: "Completeness" | "Accuracy" | "Timeliness" | "Consistency" | "Accessibility";
  score: number; // 0-100
  status: "Healthy" | "Needs Attention" | "Critical Blocker";
  findings: string;
}

export interface DomainDataScorecard {
  domain: string; // e.g. "Customer & CRM Data", "ERP & Financial Records"
  dataQualityScore: number; // 0-100
  ragVectorReadiness: "High" | "Moderate" | "Low";
  governanceMaturity: "Managed" | "Defined" | "Ad-hoc";
  keyBottlenecks: string[];
}

export interface DataReadinessData {
  overallDataScore: number;
  dataQualityScore: number;
  dataAccessibilityScore: number;
  vectorRagReadinessScore: number;
  dataCatalogEtlScore: number;
  qualityDimensions: DataQualityDimension[];
  domainScorecards: DomainDataScorecard[];
  keyBlockers: string[];
  recommendedDataRoadmap: string[];
  estimatedDataPrepCost: string;
  estimatedDataPrepPctOfBudget: number;
}

export interface StakeholderImpact {
  stakeholderGroup: string; // e.g. "Frontline Support Agents", "C-Suite & Dept Heads"
  impactLevel: "High" | "Medium" | "Low";
  anticipatedResistance: string;
  changeIntervention: string;
}

export interface RaciEntry {
  initiative: string;
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
}

export interface TrainingCurriculumItem {
  targetAudience: string;
  moduleName: string;
  durationHours: number;
  coreCompetencies: string[];
}

export interface OCMPlanData {
  overallChangeReadinessScore: number;
  stakeholderImpacts: StakeholderImpact[];
  raciMatrix: RaciEntry[];
  trainingPlan: TrainingCurriculumItem[];
  changeAdoptionKpis: Array<{
    metric: string;
    baseline: string;
    target90Days: string;
    target1Year: string;
  }>;
  leadershipCommitmentRecommendations: string[];
}

export interface SensitivityScenario {
  scenarioName: "Base Case" | "Conservative Case" | "Optimistic Case";
  adoptionRatePct: number;
  implementationCostDeltaPct: number;
  annualSavingsFormatted: string;
  fiveYearNetBenefitFormatted: string;
  roiPercentage: number;
  paybackPeriodMonths: number;
  npvFormatted: string;
}

export interface SensitivityAnalysisData {
  discountRatePct: number;
  scenarios: SensitivityScenario[];
  keySensitivityDrivers: string[];
}

export interface ROISummaryData {
  totalEstimatedAnnualSavings: string;
  totalInvestmentEstimated: string;
  fiveYearCumulativeNetBenefit: string;
  overallRoiPercentage: number;
  averagePaybackMonths: number;
  netPresentValue: string;
  internalRateOfReturnPct: number;
  departmentBreakdown: Array<{
    department: string;
    investment: string;
    annualSavings: string;
    roiPercentage: number;
    paybackMonths: number;
  }>;
  fiveYearCashFlowTimeline: Array<{
    year: number;
    investment: number;
    benefit: number;
    net: number;
    cumulativeNet: number;
  }>;
  sensitivityAnalysis: SensitivityAnalysisData;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseName: string; // e.g., "Phase 1: Quick Wins & Foundation (Months 1-3)"
  durationMonths: number;
  focus: string;
  keyProjects: string[];
  expectedMilestones: string[];
  estimatedCost: string;
  ownerRole?: string;
  dependencies?: string[];
  status?: "Not Started" | "In Progress" | "Completed";
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
  planTier?: string;
  companyName: string;
  industry: string;
  generatedAt: string;
  overallMaturityScore: number;
  
  // Executive Dashboard & Summary
  executiveDashboard: ExecutiveDashboardData;
  executiveSummary: string;
  aiReadinessAssessment: {
    overallScore: number;
    readinessLevel: string;
    benchmarkScore: number;
    topQuartileBenchmarkScore?: number;
    summaryInterpretation: string;
  };
  capabilityScores: Record<string, number>;
  departmentScorecards: DepartmentScorecard[];
  
  // High-Value Advisory Modules
  governanceAssessment: GovernanceData;
  dataReadinessAssessment: DataReadinessData;
  ocmPlan: OCMPlanData;
  
  // Opportunity Portfolio & Prioritization
  opportunityPortfolio: {
    totalOpportunities: number;
    quickWinsCount: number;
    strategicBetsCount: number;
    useCases: UseCaseItem[];
    matrixQuadrants: OpportunityMatrixQuadrants;
  };
  
  // Financial Modeling & Projections
  roiAnalysis: ROISummaryData;
  transformationRoadmap: {
    phases: RoadmapPhase[];
  };
  solutionBlueprints: SolutionBlueprintItem[];
  proposalDraft: string;
  
  // Visualization payloads
  chartPayloads: ChartPayloads;
}
