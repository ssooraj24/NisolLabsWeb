export interface IndustryVertical {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  keyUseCases: string[];
  sampleImpact: string;
  featuredCaseStudyId: string;
}

export const INDUSTRIES: IndustryVertical[] = [
  {
    id: "it-software",
    name: "IT & Software",
    iconName: "Code",
    tagline: "Supercharge developer velocity, automated testing, and software lifecycle engineering.",
    description: "Accelerate software delivery cycles with specialized code-generation copilots, automated code review agents, and telemetry-driven LLMOps infrastructure.",
    keyUseCases: [
      "Automated Git Pull Request & Security Code Reviews",
      "Repository-Grounded Architectural RAG",
      "Synthetic Test Case Generation & Regression Testing",
      "Continuous Prompt Deployment & Latency Optimization"
    ],
    sampleImpact: "42% increase in developer velocity and 68% reduction in PR review cycle times.",
    featuredCaseStudyId: "it-software-engineering"
  },
  {
    id: "bfsi",
    name: "BFSI (Banking, Financial Services & Insurance)",
    iconName: "Building2",
    tagline: "Institutional AI security, financial query assistants, and automated document analysis.",
    description: "Empower wealth managers, risk analysts, and underwriters with secure, permission-filtered retrieval-augmented generation and financial document extraction.",
    keyUseCases: [
      "SEC Filing & Annual Report Financial RAG",
      "Automated Loan & Credit Agreement Underwriting Analysis",
      "Real-time Fraud & Anomaly Detection Telemetry",
      "Institutional Policy & Regulatory Compliance Assistants"
    ],
    sampleImpact: "93% reduction in wealth management research cycle time with zero data leakage.",
    featuredCaseStudyId: "finance-invoice-processing"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    iconName: "Activity",
    tagline: "HIPAA-compliant clinical documentation, ambient transcription, and medical vector search.",
    description: "Transform clinical workflows with secure, de-identified patient data pipelines, ambient audio medical documentation, and research knowledge retrieval.",
    keyUseCases: [
      "HIPAA-Compliant Ambient Audio Clinical Consultation Notes",
      "De-identified PHI Medical Data Sanitization Pipelines",
      "Clinical Protocol & Research Vector Databases",
      "Patient Triage & Prior Authorization Automation"
    ],
    sampleImpact: "75% reduction in physician EMR documentation burden and 96% doctor satisfaction.",
    featuredCaseStudyId: "healthcare-documentation"
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Supply Chain",
    iconName: "Factory",
    tagline: "Predictive maintenance, automated procurement, and supply chain telemetry.",
    description: "Optimize factory operations and supply chain management by integrating edge IoT telemetry with autonomous procurement and inventory monitoring agents.",
    keyUseCases: [
      "Edge IoT Telemetry Anomaly Detection",
      "Autonomous Threshold-based Purchase Order Execution",
      "Vendor Invoice & Logistics Freight IDP",
      "Shop Floor Operational Maintenance Assistants"
    ],
    sampleImpact: "120,000 monthly invoices audited automatically with 99.2% extraction accuracy.",
    featuredCaseStudyId: "customer-support-automation"
  },
  {
    id: "professional-services",
    name: "Professional Services",
    iconName: "Briefcase",
    tagline: "Automate research, candidate screening, proposal drafting, and knowledge retrieval.",
    description: "Multiply consultant and advisor leverage with custom research agents, contract review tools, and automated client deliverable generators.",
    keyUseCases: [
      "Autonomous Candidate Screening & Talent Matching",
      "RFP & Proposal Response Synthesis",
      "Legal Contract Clause & Compliance Analysis",
      "Outbound Account Research & Lead Enrichment Agents"
    ],
    sampleImpact: "3.2x recruiter screening throughput and 58% sales outbound response rates.",
    featuredCaseStudyId: "hr-recruitment-agent"
  }
];
