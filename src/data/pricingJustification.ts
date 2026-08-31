export interface JustificationPillar {
  title: string;
  subtitle: string;
  message: string;
  evidence: string;
  iconName: string;
}

export const JUSTIFICATION_PILLARS: JustificationPillar[] = [
  {
    title: "1. AI Readiness Assessment",
    subtitle: "8 Organizational Dimensions",
    message: "Evaluate leadership, data hygiene, technology, security, governance, culture, processes, and skills against sector benchmarks.",
    evidence: "Comprehensive audit benchmarking against 8 industry sectors (BFSI, Healthcare, Tech, etc.).",
    iconName: "Brain"
  },
  {
    title: "2. AI Opportunity Mapping",
    subtitle: "2D Interactive Bubble Matrix",
    message: "Identify and prioritize AI use cases across Value vs. Feasibility, scaled by projected ROI magnitude.",
    evidence: "2D Opportunity Bubble Matrix categorizing Quick Wins vs. Strategic Bets.",
    iconName: "Zap"
  },
  {
    title: "3. ROI & Board Business Case",
    subtitle: "3-Scenario Sensitivity Stress Test",
    message: "Build a board-ready financial business case featuring NPV, IRR (44.5%), 5-year cashflows, and sensitivity models.",
    evidence: "Quantified 5-year payback model with deterministic sensitivity analysis (75%–125% adoption).",
    iconName: "FileCheck"
  },
  {
    title: "4. Transformation Roadmap & OCM",
    subtitle: "Phased Execution & Change Plan",
    message: "Receive an implementation plan with stakeholder resistance matrices, RACI tables, and technical blueprints.",
    evidence: "Structured 30/90/180/365-day execution plan paired with enterprise OCM.",
    iconName: "Award"
  }
];

export interface BoardDeliverablePack {
  title: string;
  badge: string;
  description: string;
  deliverables: { name: string; description: string }[];
}

export const BOARD_DELIVERABLE_PACKS: BoardDeliverablePack[] = [
  {
    title: "EXECUTIVE & BOARD STRATEGY PACK",
    badge: "C-SUITE & BOARD",
    description: "CFO and Boardroom-ready investment memoranda and executive roadmaps designed for capital release and steering committee alignment.",
    deliverables: [
      { name: "CFO & Board Investment Memorandum (10 Pages)", description: "Rigorous financial business case featuring NPV, IRR, 3-scenario sensitivity stress tests, and formal Board Resolution." },
      { name: "Executive AI Readiness & Benchmark Report (30+ Pages)", description: "30-page comprehensive audit evaluating 8 capability dimensions vs. industry peer median and leader benchmarks." },
      { name: "2D AI Opportunity & Value Matrix", description: "Interactive bubble matrix mapping high-impact initiatives against implementation feasibility and ROI magnitude." },
      { name: "AI Transformation Strategy & 12-24 Mo Roadmap", description: "Phased implementation timeline with milestone KPIs, budget allocations, and RACI ownership." },
      { name: "Minto Pyramid Executive Presentation Briefing", description: "Structured Situation-Complication-Resolution briefing formatted for executive presentation." }
    ]
  },
  {
    title: "DATA STRATEGY & ARCHITECTURE BLUEPRINT PACK",
    badge: "CTO & DATA ENGINEERING",
    description: "Deep-dive technical blueprints, data quality scorecards, and security frameworks for engineering teams and architects.",
    deliverables: [
      { name: "Data Strategy & Hybrid Vector Lakehouse Blueprint (12 Pages)", description: "Technical topology combining pgvector/Qdrant dense embeddings with BM25 hybrid keyword retrieval." },
      { name: "5-Dimension Enterprise Data Quality Scorecard", description: "Evaluation of Completeness, Accuracy, Timeliness, Consistency, and Accessibility across CRM & ERP." },
      { name: "Zero-Trust Security & PII Redaction Proxy Framework", description: "API proxy gateway specs with automated Presidio PII tokenization and audit logging." },
      { name: "Real-Time Change Data Capture (CDC) Pipeline Spec", description: "Debezium/Kafka streaming architecture replicating operational data into analytical vector stores." },
      { name: "Data Preparation & Pre-requisites Budget Plan", description: "Itemized allocation (~42% of Phase 1 budget) for document OCR, ETL cleansing, and vector indexing." }
    ]
  },
  {
    title: "GOVERNANCE, OCM & PILOT EVALUATION PACK",
    badge: "RISK & OPERATIONS",
    description: "Organizational change management frameworks, empirical pilot evaluations, and regulatory compliance registers.",
    deliverables: [
      { name: "Proof of Concept (PoC) Evaluation & Scalability Dossier (8 Pages)", description: "Empirical validation of pilot prototypes (accuracy, latency SLAs, task reduction) with formal Go/No-Go decision matrix." },
      { name: "Enterprise AI Risk & Regulatory Register (5x5 Matrix)", description: "Risk register mapped to India DPDP Act 2023, EU AI Act, and RBI AI guidelines with concrete mitigation roadmaps." },
      { name: "Organizational Change Management (OCM) Plan", description: "Stakeholder resistance analysis, governance RACI matrix, and 90-day/1-year adoption KPIs." },
      { name: "Role-Based AI Upskilling Curriculum", description: "Tailored training modules for General Staff (4 hrs), Champions (12 hrs), and Engineering (24 hrs)." },
      { name: "LLMOps & Continuous Evaluation Protocol", description: "Automated telemetry, hallucination monitoring, and cost optimization routing." }
    ]
  }
];

export const COST_OF_NOT_KNOWING_RISKS = [
  { risk: "Investing in the wrong AI use cases", costRange: "₹50 Lakhs – ₹2 Crores", impact: "Wasted capital on low-ROI wrapper projects" },
  { risk: "Failed implementation & scope drift", costRange: "₹1 Crore – ₹5 Crores", impact: "Project abandonment after 6-12 months" },
  { risk: "Delayed AI transformation timeline", costRange: "12-24 Months Lost", impact: "Competitors capture market share with automated workflows" },
  { risk: "Data leaks & governance regulatory fines", costRange: "Severe Compliance Penalties", impact: "PII leakage or un-sanitized LLM data exposure under DPDP Act" }
];
