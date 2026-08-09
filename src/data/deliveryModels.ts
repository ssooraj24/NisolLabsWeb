export interface DeliveryModel {
  id: "build" | "manage" | "monitor";
  title: string;
  badge: string;
  tagline: string;
  description: string;
  bestFor: string;
  deliverables: string[];
  iconName: string;
}

export const DELIVERY_MODELS: DeliveryModel[] = [
  {
    id: "build",
    title: "MODEL 1: BUILD",
    badge: "FULL-SERVICE IMPLEMENTATION",
    tagline: "End-to-End Production Engineering",
    description: "After the Nisol Discovery™ engagement, our elite engineering team handles the complete build, integration, production deployment, and LLMOps optimization.",
    bestFor: "Organizations that want a single, accountable partner to take them from strategy to live production deployment.",
    deliverables: [
      "Custom Multi-Agent & RAG Production Architecture",
      "Enterprise System Integration (ERP, CRM, Database, API)",
      "Low-latency Model Quantization & Semantic Prompt Caching",
      "Production Deployment, Guardrails & LLMOps Telemetry Stack"
    ],
    iconName: "Wrench"
  },
  {
    id: "manage",
    title: "MODEL 2: MANAGE",
    badge: "PROGRAM MANAGEMENT & OVERSIGHT",
    tagline: "Expert Technical Oversight for Your Teams",
    description: "You have internal engineering teams or external software vendors. We define the technical architecture, enforce standards, and manage execution.",
    bestFor: "Organizations with internal engineering capacity that need senior AI architecture guidance to execute complex initiatives.",
    deliverables: [
      "Technical Requirements & System Architecture Blueprint",
      "Vendor Selection, Evaluation Criteria & Onboarding",
      "Sprint Milestones, Delivery Governance & Code Auditing",
      "Continuous Strategic Advisory & C-Suite Progress Reporting"
    ],
    iconName: "ClipboardCheck"
  },
  {
    id: "monitor",
    title: "MODEL 3: MONITOR",
    badge: "ADVISORY & QUALITY ASSURANCE",
    tagline: "Independent Technical Validation",
    description: "You want to build internally or use another implementation partner. We serve as your independent AI advisors, conducting technical QA and validating strategic alignment.",
    bestFor: "Organizations with established IT teams seeking independent expert validation to prevent bad tech bets and vendor lock-in.",
    deliverables: [
      "Independent Review of Vendor Proposals & Technical Designs",
      "Architectural Quality Assurance & Code Vulnerability Audits",
      "Strategic Alignment Validation against Enterprise Roadmap",
      "Model Accuracy, Evals & Security Risk Assessment"
    ],
    iconName: "Eye"
  }
];

export interface ComparisonRow {
  category: string;
  traditionalConsultancy: string;
  pureStrategyFirm: string;
  nisolAI: string;
  highlight?: boolean;
}

export const COMPARISON_MATRIX: ComparisonRow[] = [
  {
    category: "Executive Discovery",
    traditionalConsultancy: "3 – 6 Months",
    pureStrategyFirm: "2 – 4 Months",
    nisolAI: "7 – 11 Business Days",
    highlight: true
  },
  {
    category: "Methodology",
    traditionalConsultancy: "Ad-hoc Interviews",
    pureStrategyFirm: "Generic Frameworks",
    nisolAI: "Nisol Discovery™ (62 Qs, 15 Capabilities)"
  },
  {
    category: "Board-Ready Deliverables",
    traditionalConsultancy: "Generic PPT Decks",
    pureStrategyFirm: "Vague Advice & Slides",
    nisolAI: "15 Board-Ready Reports & Blueprints",
    highlight: true
  },
  {
    category: "Financial ROI Analysis",
    traditionalConsultancy: "High-level Estimates",
    pureStrategyFirm: "Vague Assumptions",
    nisolAI: "Quantified 5-Yr Payback & NPV Model"
  },
  {
    category: "Implementation Choice",
    traditionalConsultancy: "Heavy Lock-in (Build Only)",
    pureStrategyFirm: "No Execution Offered",
    nisolAI: "Full Choice: Build, Manage, or Monitor",
    highlight: true
  },
  {
    category: "Vendor & IP Lock-in",
    traditionalConsultancy: "High Vendor Lock-in",
    pureStrategyFirm: "Strategy Only",
    nisolAI: "Zero Lock-in Guaranteed (Client Owns IP)"
  }
];
