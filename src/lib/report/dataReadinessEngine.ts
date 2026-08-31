// src/lib/report/dataReadinessEngine.ts

import { BusinessContextJSON, DataReadinessData, DataQualityDimension, DomainDataScorecard } from "./types";

export function generateDataReadinessAssessment(context: BusinessContextJSON): DataReadinessData {
  const dataScore = context.sectionScores["Data Readiness"] || context.sectionScores["Data Architecture & Silos"] || 3.1;
  const overallDataScore = Math.round((dataScore / 5) * 100);

  const qualityDimensions: DataQualityDimension[] = [
    {
      dimension: "Completeness",
      score: Math.min(100, Math.round(overallDataScore * 0.92)),
      status: overallDataScore >= 70 ? "Healthy" : "Needs Attention",
      findings: "Legacy transactional records have variable mandatory field population; document archives contain unindexed scanned PDFs.",
    },
    {
      dimension: "Accuracy",
      score: Math.min(100, Math.round(overallDataScore * 0.98)),
      status: overallDataScore >= 65 ? "Healthy" : "Needs Attention",
      findings: "High core financial and operational precision, but cross-system customer identity records require deduplication.",
    },
    {
      dimension: "Timeliness",
      score: Math.min(100, Math.round(overallDataScore * 0.85)),
      status: overallDataScore >= 60 ? "Healthy" : "Needs Attention",
      findings: "Batch ETL sync intervals (daily/weekly) create lag; real-time event streaming is required for autonomous agent response.",
    },
    {
      dimension: "Consistency",
      score: Math.min(100, Math.round(overallDataScore * 0.82)),
      status: overallDataScore >= 75 ? "Healthy" : "Needs Attention",
      findings: "Discrepant schema naming conventions across sales CRM vs ERP databases require canonical data modeling.",
    },
    {
      dimension: "Accessibility",
      score: Math.min(100, Math.round(overallDataScore * 0.88)),
      status: overallDataScore >= 65 ? "Healthy" : "Critical Blocker",
      findings: "Data locked in siloed department repositories without unified semantic vector embeddings or secure REST/GraphQL endpoints.",
    },
  ];

  const domainScorecards: DomainDataScorecard[] = [
    {
      domain: "Customer & CRM Telemetry",
      dataQualityScore: Math.min(100, Math.round(overallDataScore * 1.05)),
      ragVectorReadiness: "High",
      governanceMaturity: "Defined",
      keyBottlenecks: ["Lead interaction notes lack standardized structuring", "Historical ticket archives need PII redaction before embedding"],
    },
    {
      domain: "ERP & Financial Records",
      dataQualityScore: Math.min(100, Math.round(overallDataScore * 1.1)),
      ragVectorReadiness: "Moderate",
      governanceMaturity: "Managed",
      keyBottlenecks: ["Direct database read-only replicas needed to prevent operational locking", "Complex join logic across disparate ledger tables"],
    },
    {
      domain: "Unstructured Document Repositories (PDFs/Docs)",
      dataQualityScore: Math.min(100, Math.round(overallDataScore * 0.78)),
      ragVectorReadiness: "Moderate",
      governanceMaturity: "Ad-hoc",
      keyBottlenecks: ["Scanned image PDFs require high-accuracy OCR pre-processing", "Missing document versioning and obsolescence tagging"],
    },
    {
      domain: "Operational & Product Telemetry",
      dataQualityScore: Math.min(100, Math.round(overallDataScore * 0.9)),
      ragVectorReadiness: "High",
      governanceMaturity: "Defined",
      keyBottlenecks: ["High velocity log feeds require aggregation pipelines before vectorization", "Retention policies must balance storage vs context depth"],
    },
  ];

  const isINR = context.primaryCurrency !== "USD";
  const estimatedDataPrepCost = isINR ? "₹28 - ₹38 Lakhs" : "$35,000 - $50,000";
  const estimatedDataPrepPctOfBudget = 42; // standard enterprise consulting benchmark

  return {
    overallDataScore,
    dataQualityScore: Math.min(100, Math.round(overallDataScore * 0.95)),
    dataAccessibilityScore: Math.min(100, Math.round(overallDataScore * 0.88)),
    vectorRagReadinessScore: Math.min(100, Math.round(overallDataScore * 0.82)),
    dataCatalogEtlScore: Math.min(100, Math.round(overallDataScore * 0.9)),
    qualityDimensions,
    domainScorecards,
    keyBlockers: [
      "Unstructured PDF and legacy document archives lack semantic chunking and vector embeddings",
      "Siloed departmental database architectures restrict cross-functional AI reasoning",
      "Absence of automated continuous ETL pipelines synchronizing source databases with vector stores",
      "Inconsistent metadata tagging and lack of Master Data Management (MDM) for entity resolution",
    ],
    recommendedDataRoadmap: [
      "Build a centralized Hybrid Vector Lakehouse (e.g. pgvector / Qdrant with hybrid BM25 search)",
      "Deploy an automated Document Ingestion & OCR pipeline with chunk-level metadata tagging",
      "Implement real-time Change Data Capture (CDC) pipelines from ERP/CRM into analytical vector stores",
      "Configure granular Role-Based Access Control (RBAC) filtering at the embedding chunk level",
    ],
    estimatedDataPrepCost,
    estimatedDataPrepPctOfBudget,
  };
}
