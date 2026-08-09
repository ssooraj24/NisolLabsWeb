export interface JustificationPillar {
  title: string;
  subtitle: string;
  message: string;
  evidence: string;
  iconName: string;
}

export const JUSTIFICATION_PILLARS: JustificationPillar[] = [
  {
    title: "1. Enterprise Expertise",
    subtitle: "Senior Leadership, No Juniors",
    message: "You're not paying for hours—you're paying for 25+ years of enterprise architecture, cloud-native scale, and LLMOps leadership.",
    evidence: "25+ years global system architecture experience across Ssooraj Rauth & Amol.",
    iconName: "Award"
  },
  {
    title: "2. Proprietary Methodology",
    subtitle: "Nisol Discovery™ Audit",
    message: "62 questions across 15 capability pillars evaluated by our Nisol Intelligence™ audit system—not ad-hoc templates.",
    evidence: "15 capabilities audited across Data, Security, Agentic Workflows & Model Runtimes.",
    iconName: "Brain"
  },
  {
    title: "3. Executive Speed",
    subtitle: "7-11 Business Days Execution",
    message: "We deliver full board-ready clarity in 7 to 11 days—eliminating 3 to 6 months of traditional consulting overhead.",
    evidence: "Guaranteed 7-11 business day audit turnaround.",
    iconName: "Zap"
  },
  {
    title: "4. Board-Ready Outcomes",
    subtitle: "15 Deliverables + Quantified ROI",
    message: "You receive 15 executive reports, solution blueprints, and a 5-year financial payback model with clear NPV projections.",
    evidence: "15 board-ready deliverables across Executive, Opportunity, and Transformation Packs.",
    iconName: "FileCheck"
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
    title: "EXECUTIVE STRATEGY PACK",
    badge: "BOARD ALIGNMENT",
    description: "C-suite strategic summaries designed for immediate leadership alignment and board approval.",
    deliverables: [
      { name: "Executive AI Readiness Audit Report", description: "Comprehensive 20-slide executive evaluation of organizational AI maturity." },
      { name: "Prioritized AI Opportunity & Value Matrix", description: "Matrix mapping high-ROI AI initiatives against technical feasibility." },
      { name: "AI Transformation Strategy & 12-24 Mo Roadmap", description: "Phased implementation timeline with milestone KPIs and resource allocation." },
      { name: "Executive C-Suite Presentation Deck", description: "Boardroom-ready presentation deck formatted for executive stakeholders." },
      { name: "Vendor-Neutral Technology & Model Selection Report", description: "Unbiased assessment of proprietary vs. open-weight models and vector DBs." }
    ]
  },
  {
    title: "TECHNICAL ARCHITECTURE & BLUEPRINT PACK",
    badge: "ENGINEERING SPECIFICATION",
    description: "Deep-dive technical blueprints and security frameworks for internal teams or implementation partners.",
    deliverables: [
      { name: "Enterprise AI Target Architecture Blueprint", description: "Complete system topology for multi-agent clusters, RAG pipelines, and LLM routers." },
      { name: "Zero-Trust Security & PII Governance Framework", description: "RBAC permissions, PII masking rules, and SOC-2/HIPAA compliance controls." },
      { name: "Data Readiness & Vector Lakehouse Specification", description: "ETL pipeline specs, chunking strategy, and vector database schema definition." },
      { name: "Proof of Concept (PoC) Engineering Specification", description: "Step-by-step build blueprint for rapid 4-week prototype deployment." },
      { name: "LLMOps & Telemetry Monitoring Framework", description: "Latency optimization, prompt versioning, and automated evaluation metrics." }
    ]
  },
  {
    title: "FINANCIAL ROI & GOVERNANCE PACK",
    badge: "BUSINESS CASE",
    description: "Rigorous financial calculations and risk mitigation matrices justifying enterprise AI investment.",
    deliverables: [
      { name: "Quantified 5-Year AI Payback & NPV Financial Model", description: "Detailed financial model projecting cost savings, cycle time reduction, and ROI." },
      { name: "Cost of Not Knowing & Risk Mitigation Report", description: "Financial analysis of risks prevented (e.g. ₹50L-₹2Cr in failed implementations)." },
      { name: "Token Cost & LLM Router Optimization Strategy", description: "Cost reduction strategy leveraging model routing (e.g. GPT-4o to Llama 3)." },
      { name: "Human-in-the-Loop Governance & Verification Protocol", description: "Approval workflows and verification controls for autonomous agent actions." },
      { name: "Delivery Model Evaluation & Partner Selection Guide", description: "Decision matrix for selecting Build, Manage, or Monitor execution paths." }
    ]
  }
];

export const COST_OF_NOT_KNOWING_RISKS = [
  { risk: "Investing in the wrong AI use cases", costRange: "₹50 Lakhs – ₹2 Crores", impact: "Wasted capital on low-ROI wrapper projects" },
  { risk: "Failed implementation & scope drift", costRange: "₹1 Crore – ₹5 Crores", impact: "Project abandonment after 6-12 months" },
  { risk: "Delayed AI transformation timeline", costRange: "12-24 Months Lost", impact: "Competitors capture market share with automated workflows" },
  { risk: "Data leaks & governance regulatory fines", costRange: "Severe Compliance Penalties", impact: "PII leakage or un-sanitized LLM data exposure" }
];
