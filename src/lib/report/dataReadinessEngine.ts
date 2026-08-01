// src/lib/report/dataReadinessEngine.ts

import { BusinessContextJSON, DataReadinessData } from "./types";

export function generateDataReadinessAssessment(context: BusinessContextJSON): DataReadinessData {
  const dataScore = context.sectionScores["Data Readiness"] || context.sectionScores["Data Architecture"] || 3.1;
  const overallDataScore = Math.round((dataScore / 5) * 100);

  return {
    overallDataScore,
    dataQualityScore: Math.min(100, Math.round(overallDataScore * 0.95)),
    dataAccessibilityScore: Math.min(100, Math.round(overallDataScore * 0.88)),
    vectorRagReadinessScore: Math.min(100, Math.round(overallDataScore * 0.82)),
    dataCatalogEtlScore: Math.min(100, Math.round(overallDataScore * 0.9)),
    keyBlockers: [
      "Unstructured PDF and legacy document repositories without semantic vector embeddings",
      "Siloed departmental databases limiting cross-functional AI reasoning",
      "Inconsistent data metadata tagging and missing master data management (MDM)",
      "Lack of automated ETL data pipelines feeding vector stores"
    ],
    recommendedDataRoadmap: [
      "Build a centralized hybrid Vector Data Lakehouse (pgvector / Pinecone)",
      "Implement automated document OCR & embedding extraction pipeline",
      "Establish automated schema validation & data quality monitoring",
      "Configure role-based access control (RBAC) at the embedding chunk level"
    ]
  };
}
