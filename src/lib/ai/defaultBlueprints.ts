// lib/ai/defaultBlueprints.ts

export interface BlueprintItem {
  id?: string;
  use_case_name?: string;
  name?: string;
  category?: string;
  business_problem?: string;
  description?: string;
  proposed_solution?: string;
  technology_stack?: string[];
  architecture_summary?: string;
  implementation_phases?: string[];
  success_metrics?: string[];
}

export const DEFAULT_SOLUTION_BLUEPRINTS: BlueprintItem[] = [
  {
    use_case_name: "AI-Powered Omnichannel Customer Support Assistant",
    category: "Customer Service",
    business_problem: "High support ticket volume resulting in extended resolution delays and increased operating costs.",
    proposed_solution: "RAG-enabled LLM assistant integrated with enterprise knowledge base and ticket routing systems.",
    technology_stack: [
      "OpenAI GPT-4o / Gemini 1.5",
      "Supabase Vector (pgvector)",
      "Next.js / TypeScript",
      "Zendesk / Salesforce API",
    ],
    architecture_summary: "User Request -> API Gateway -> Hybrid Vector Search (pgvector) -> Context Retrieval -> LLM Synthesis -> Guardrail Check -> Streaming Response",
    implementation_phases: [
      "Phase 1: Knowledge Ingestion & Vector Indexing (2 weeks)",
      "Phase 2: RAG Pipeline Setup & Prompt Tuning (2 weeks)",
      "Phase 3: Omnichannel Widget & API Integration (2 weeks)",
      "Phase 4: Production Rollout & Guardrail Verification (1 week)",
    ],
    success_metrics: [
      "60% ticket containment rate",
      "< 4s average response latency",
      "90% CSAT user satisfaction",
    ],
  },
  {
    use_case_name: "Predictive Maintenance & Asset Analytics Radar",
    category: "Operations & Supply Chain",
    business_problem: "Unplanned manufacturing equipment downtime causing severe operational bottlenecks and revenue loss.",
    proposed_solution: "Real-time IoT telemetry ingestion with time-series ML models forecasting equipment failure 48 hours in advance.",
    technology_stack: [
      "Python (XGBoost / Prophet)",
      "Kafka Streams / Azure IoT Hub",
      "PostgreSQL / TimescaleDB",
      "React Dashboard",
    ],
    architecture_summary: "Logistics Sensors -> Kafka Telemetry Pipeline -> Predictive Anomaly Model -> Risk Scoring Radar -> Automated Service Alert",
    implementation_phases: [
      "Phase 1: IoT Telemetry Pipeline Setup (3 weeks)",
      "Phase 2: Historical Failure Model Fine-Tuning (3 weeks)",
      "Phase 3: Real-Time Alerting Dashboard & Testing (2 weeks)",
    ],
    success_metrics: [
      "30% reduction in unplanned downtime",
      "48-hour advance failure warning",
      "25% maintenance cost savings",
    ],
  },
  {
    use_case_name: "Automated Intelligent Document & Invoice Processing",
    category: "Finance & Accounting",
    business_problem: "Manual multi-page invoice data extraction leading to high error rates and slow AP cycle times.",
    proposed_solution: "Vision-LLM OCR document processing engine parsing invoices and auto-reconciling POs into ERP.",
    technology_stack: [
      "Google Gemini Vision / Azure Document Intelligence",
      "Python FastAPI",
      "Supabase DB",
      "SAP / NetSuite Connector",
    ],
    architecture_summary: "Document Ingestion (Email/PDF) -> Vision OCR Extractor -> Entity Schema Normalization -> ERP PO Matcher -> Approval Routing",
    implementation_phases: [
      "Phase 1: Document Schema Mapping & Extraction (2 weeks)",
      "Phase 2: ERP Integration & Reconciler Rules (3 weeks)",
      "Phase 3: Exception Management Human-in-the-Loop Portal (2 weeks)",
    ],
    success_metrics: [
      "85% straight-through processing rate",
      "99.2% entity extraction accuracy",
      "70% reduction in AP cycle time",
    ],
  },
  {
    use_case_name: "Enterprise Knowledge Graph & Semantic Search",
    category: "IT & Engineering",
    business_problem: "Siloed enterprise documentation across Confluence, Google Drive, and Slack slowing down team productivity.",
    proposed_solution: "Unified semantic vector search engine providing instant answers with source citations across all internal tools.",
    technology_stack: [
      "Anthropic Claude / OpenAI GPT-4o",
      "Qdrant / Supabase Vector",
      "LangChain",
      "Node.js Gateway",
    ],
    architecture_summary: "User Search Query -> Multi-Source Crawler -> Hybrid Vector Search -> LLM Context Synthesizer -> Cited Answer Output",
    implementation_phases: [
      "Phase 1: Multi-source Connector Setup & Permissions (2 weeks)",
      "Phase 2: Chunking & Hybrid Vector Indexing (3 weeks)",
      "Phase 3: Search Portal UI & Access Control Verification (2 weeks)",
    ],
    success_metrics: [
      "45 mins saved per employee daily",
      "< 2s search response latency",
      "100% enterprise RBAC compliance",
    ],
  },
];

export function getSolutionBlueprints(blueprintsData: any): BlueprintItem[] {
  const items = blueprintsData?.blueprints || (Array.isArray(blueprintsData) ? blueprintsData : []);
  if (Array.isArray(items) && items.length > 0) {
    return items;
  }
  return DEFAULT_SOLUTION_BLUEPRINTS;
}
