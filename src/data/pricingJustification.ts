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
      { name: "CFO & Board Investment Memorandum", description: "Rigorous financial business case featuring DCF, NPV, IRR, 3-scenario sensitivity stress tests, and formal Board Resolution." },
      { name: "Flagship AI Transformation Strategy (9 Comprehensive Chapters)", description: "Enterprise audit evaluating 15 capability dimensions vs. industry peer median and leader benchmarks." },
      { name: "2D AI Opportunity & Value Matrix (20 Use Cases)", description: "Bubble matrix mapping high-impact initiatives across 6 execution horizons against feasibility and ROI magnitude." },
      { name: "AI Transformation Roadmap (Single-Pod Benchmark)", description: "Phased implementation timeline with milestone KPIs, budget allocations, and RACI ownership under the 1 pod / 1 initiative rule." },
      { name: "Minto Pyramid Executive Presentation Briefing", description: "Structured Situation-Complication-Resolution briefing formatted for executive presentation." }
    ]
  },
  {
    title: "DATA STRATEGY & ARCHITECTURE BLUEPRINT PACK",
    badge: "CTO & DATA ENGINEERING",
    description: "Deep-dive technical blueprints, data quality scorecards, and security frameworks for engineering teams and architects.",
    deliverables: [
      { name: "Data Strategy & Vector Architecture Blueprint", description: "Target architectural hypothesis combining pgvector/Qdrant dense embeddings with BM25 hybrid keyword retrieval." },
      { name: "5-Dimension Enterprise Data Quality Scorecard", description: "Evaluation of Completeness, Accuracy, Timeliness, Consistency, and Accessibility across CRM & ERP." },
      { name: "Zero-Trust Security & PII Redaction Proxy Framework", description: "API proxy gateway specs with automated Presidio PII tokenization and audit logging." },
      { name: "Real-Time Change Data Capture (CDC) Pipeline Spec", description: "Debezium/Kafka streaming architecture replicating operational data into analytical vector stores." },
      { name: "Direct Client Infrastructure Pass-Through Spec", description: "Itemized cloud compute (AWS/Azure/GCP VPCs) and foundation model token consumption guidelines." }
    ]
  },
  {
    title: "GOVERNANCE, OCM & PILOT EVALUATION PACK",
    badge: "RISK & OPERATIONS",
    description: "Organizational change management frameworks, empirical pilot evaluations, and regulatory compliance registers.",
    deliverables: [
      { name: "Proof of Concept (PoC) Decision Gate & Acceptance Protocol", description: "Prospective pilot governance protocol defining quantitative SLA thresholds and formal Gate 0–4 Go/No-Go decision matrix." },
      { name: "Enterprise AI Risk & Regulatory Register (5x5 Matrix)", description: "Risk register mapped to India DPDP Act 2023, EU AI Act, and RBI AI guidelines with concrete mitigation roadmaps." },
      { name: "Organizational Change Management (OCM) Plan", description: "Stakeholder resistance analysis, governance RACI matrix, and 90-day/1-year adoption KPIs." },
      { name: "3-Track Workforce Enablement Curriculum", description: "Tailored training modules for All-Hands Foundations, Department Champions Labs, and Leadership Management Seminars." },
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
