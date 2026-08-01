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
    use_case_name: "Automated AI Code Review & Security Vulnerability Audit",
    category: "Software Engineering & DevOps",
    business_problem: "Manual code reviews bottlenecking release cycles and missing security vulnerabilities prior to production deployment.",
    proposed_solution: "LLM-driven static analysis engine integrated into GitHub Actions / GitLab CI for real-time security auditing and code quality scoring.",
    technology_stack: [
      "Claude 3.5 Sonnet / OpenAI GPT-4o",
      "SonarQube API / Semgrep",
      "GitHub Actions Runner / TypeScript",
      "PostgreSQL / Supabase",
    ],
    architecture_summary: "Pull Request Event -> GitHub Webhook -> Diff Analyzer -> LLM Vulnerability Ingestion -> Inline PR Commenting -> Compliance Report",
    implementation_phases: [
      "Phase 1: Webhook Ingestion & Diff Extraction (2 weeks)",
      "Phase 2: Security & Clean Code Prompt Guardrails (2 weeks)",
      "Phase 3: Automated Inline PR Commenting & Bot Integration (2 weeks)",
      "Phase 4: Engineering Analytics Dashboard (1 week)",
    ],
    success_metrics: [
      "75% reduction in manual code review turnaround time",
      "95% pre-merge vulnerability detection rate",
      "Zero critical security regressions in production",
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
