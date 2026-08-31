// src/lib/report/industryBenchmarks.ts

export interface IndustryBenchmark {
  id: string;
  name: string;
  aliases: string[];
  medianScore: number; // out of 100
  topQuartileScore: number; // out of 100
  laggardScore: number; // out of 100
  avgAiInvestmentPctRevenue: number;
  avgPaybackPeriodMonths: number;
  keyRegulations: string[];
  benchmarkCitation?: string;
  dimensionBenchmarks: Record<string, number>; // Dimension -> score out of 100
  topUseCasesCatalog: Array<{
    name: string;
    department: string;
    description: string;
    businessValueScore: number;
    implementationEffortScore: number;
    category: "Quick Win" | "Strategic Bet" | "Long-term Fill" | "Re-evaluate";
    expectedRoiPercentage: number;
    techStack: string[];
    complexity: "Low" | "Medium" | "High";
  }>;
}

export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  bfsi: {
    id: "bfsi",
    name: "Banking, Financial Services & Insurance (BFSI)",
    aliases: ["bfsi", "banking", "finance", "insurance", "fintech", "wealth management", "capital markets"],
    medianScore: 68,
    topQuartileScore: 88,
    laggardScore: 42,
    avgAiInvestmentPctRevenue: 3.8,
    avgPaybackPeriodMonths: 6.8,
    keyRegulations: ["India DPDP Act 2023", "RBI AI/ML Risk Framework", "SEBI Cybersecurity Circular", "GDPR", "Basel III Risk Aggregation"],
    dimensionBenchmarks: {
      "Leadership & Strategy": 72,
      "Data Architecture & Silos": 65,
      "AI Governance & IP": 78,
      "Knowledge & RAG": 62,
      "Engineering & QA Ops": 74,
      "IT Infrastructure & Cloud": 76,
      "Sales & Pipeline AI": 60,
      "Customer Support Automation": 70,
    },
    topUseCasesCatalog: [
      {
        name: "AI-Powered AML & Fraud Transaction Anomaly Engine",
        department: "Risk & Compliance",
        description: "Real-time graph neural network analyzing transaction patterns to flag money laundering and payment fraud with sub-second latency.",
        businessValueScore: 92,
        implementationEffortScore: 48,
        category: "Quick Win",
        expectedRoiPercentage: 340,
        techStack: ["Graph Neural Networks", "Kafka Streams", "Python", "Vector Anomaly DB"],
        complexity: "Medium",
      },
      {
        name: "Automated Regulatory Compliance & Circular Digest System",
        department: "Legal & Compliance",
        description: "RAG system ingesting RBI, SEBI, and DPDP circulars to cross-reference internal policies and auto-generate compliance audit checklists.",
        businessValueScore: 85,
        implementationEffortScore: 35,
        category: "Quick Win",
        expectedRoiPercentage: 290,
        techStack: ["Hybrid RAG", "LlamaIndex", "pgvector", "Claude 3.5 Sonnet"],
        complexity: "Low",
      },
      {
        name: "Algorithmic Credit Underwriting & Alternative Data Scoring",
        department: "Lending & Underwriting",
        description: "Multi-modal model synthesizing bank statements, GST returns, and alternate cashflow telemetry to expedite SME lending decisions.",
        businessValueScore: 94,
        implementationEffortScore: 68,
        category: "Strategic Bet",
        expectedRoiPercentage: 420,
        techStack: ["XGBoost", "LLM Feature Extractor", "Secure Enclave (Confidential AI)", "Postgres"],
        complexity: "High",
      },
      {
        name: "Conversational Wealth Advisor & Portfolio Rebalancer",
        department: "Wealth Management",
        description: "Client-facing conversational agent providing customized portfolio performance commentary, rebalancing suggestions, and tax-loss harvesting alerts.",
        businessValueScore: 88,
        implementationEffortScore: 62,
        category: "Strategic Bet",
        expectedRoiPercentage: 310,
        techStack: ["LangChain", "Deterministic Policy Engine", "FastAPI", "Redis Cache"],
        complexity: "Medium",
      },
    ],
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare, Pharmaceuticals & Life Sciences",
    aliases: ["healthcare", "health", "pharma", "pharmaceuticals", "biotech", "hospital", "life sciences", "medical"],
    medianScore: 58,
    topQuartileScore: 82,
    laggardScore: 34,
    avgAiInvestmentPctRevenue: 2.9,
    avgPaybackPeriodMonths: 8.4,
    keyRegulations: ["HIPAA", "DISHA (India)", "FDA SaMD Guidelines", "DPDP Act 2023", "GAMP 5 (Good Automated Manufacturing Practice)"],
    dimensionBenchmarks: {
      "Leadership & Strategy": 60,
      "Data Architecture & Silos": 52,
      "AI Governance & IP": 80,
      "Knowledge & RAG": 64,
      "Engineering & QA Ops": 58,
      "IT Infrastructure & Cloud": 66,
      "Sales & Pipeline AI": 48,
      "Customer Support Automation": 62,
    },
    topUseCasesCatalog: [
      {
        name: "Clinical Trial Protocol Extraction & Regulatory Dossier Generator",
        department: "R&D / Clinical",
        description: "Automated extraction and structuring of clinical data points across legacy trials to generate CDISC-compliant regulatory submissions.",
        businessValueScore: 90,
        implementationEffortScore: 45,
        category: "Quick Win",
        expectedRoiPercentage: 360,
        techStack: ["Domain-Tuned Biomedical LLMs", "Unstructured.io", "Qdrant", "FastAPI"],
        complexity: "Medium",
      },
      {
        name: "Patient Discharge Summary & Medical Coding Auto-Scribe",
        department: "Hospital Operations",
        description: "Ambient listening and EHR documentation agent converting physician audio notes into standardized ICD-10 medical billing codes.",
        businessValueScore: 88,
        implementationEffortScore: 40,
        category: "Quick Win",
        expectedRoiPercentage: 310,
        techStack: ["Whisper v3 Medical", "ICD-10 Vector Mapper", "HL7 FHIR API"],
        complexity: "Medium",
      },
      {
        name: "AI Pharmacovigilance & Adverse Drug Reaction (ADR) Detector",
        department: "Drug Safety",
        description: "Continuous crawler analyzing global medical journals, patient forums, and clinical notes to flag adverse drug interactions in near real-time.",
        businessValueScore: 92,
        implementationEffortScore: 65,
        category: "Strategic Bet",
        expectedRoiPercentage: 400,
        techStack: ["BioBERT", "Kafka Streams", "Graph DB (Neo4j)", "LLM Validation"],
        complexity: "High",
      },
    ],
  },
  manufacturing: {
    id: "manufacturing",
    name: "Manufacturing, Automotive & Heavy Industry",
    aliases: ["manufacturing", "automotive", "industrial", "aerospace", "chemicals", "supply chain", "energy", "hardware"],
    medianScore: 54,
    topQuartileScore: 79,
    laggardScore: 30,
    avgAiInvestmentPctRevenue: 2.2,
    avgPaybackPeriodMonths: 7.6,
    keyRegulations: ["ISO 27001", "IEC 62443 (OT Security)", "OSHA AI Safety", "DPDP Act", "EU Corporate Sustainability Directive"],
    dimensionBenchmarks: {
      "Leadership & Strategy": 58,
      "Data Architecture & Silos": 48,
      "AI Governance & IP": 56,
      "Knowledge & RAG": 50,
      "Engineering & QA Ops": 70,
      "IT Infrastructure & Cloud": 62,
      "Sales & Pipeline AI": 45,
      "Customer Support Automation": 52,
    },
    topUseCasesCatalog: [
      {
        name: "Computer Vision Surface Quality & Defect Detection on Assembly Lines",
        department: "Quality Assurance",
        description: "High-speed edge camera vision pipeline detecting microscopic solder, weld, and paint defects with 99.4% precision.",
        businessValueScore: 93,
        implementationEffortScore: 44,
        category: "Quick Win",
        expectedRoiPercentage: 380,
        techStack: ["YOLOv10 / Edge TPU", "TensorRT", "MQTT / OPC-UA", "InfluxDB"],
        complexity: "Medium",
      },
      {
        name: "Predictive Asset Maintenance & Thermal Anomaly Detection",
        department: "Plant Maintenance",
        description: "IoT sensor telemetry analyzer predicting turbine and bearing failures 14 days before critical breakdown.",
        businessValueScore: 89,
        implementationEffortScore: 46,
        category: "Quick Win",
        expectedRoiPercentage: 350,
        techStack: ["TimesFM (Time Series Foundation Model)", "Kafka", "TimescaleDB"],
        complexity: "Medium",
      },
      {
        name: "Autonomous Demand Forecasting & Raw Material Procurement Optimizer",
        department: "Supply Chain",
        description: "Multi-variate predictive engine aligning supplier lead times, freight indices, and commodity prices to optimize inventory buffers.",
        businessValueScore: 91,
        implementationEffortScore: 64,
        category: "Strategic Bet",
        expectedRoiPercentage: 410,
        techStack: ["Transformer Time Series", "Python Optimization Solvers", "SAP ERP Connector"],
        complexity: "High",
      },
    ],
  },
  retail: {
    id: "retail",
    name: "Retail, E-commerce & Consumer Goods (CPG)",
    aliases: ["retail", "ecommerce", "e-commerce", "cpg", "fmcg", "consumer", "apparel", "grocery"],
    medianScore: 64,
    topQuartileScore: 86,
    laggardScore: 38,
    avgAiInvestmentPctRevenue: 3.2,
    avgPaybackPeriodMonths: 5.9,
    keyRegulations: ["Consumer Protection Act", "DPDP Act 2023", "PCI-DSS", "GDPR", "E-commerce Transparency Directives"],
    dimensionBenchmarks: {
      "Leadership & Strategy": 66,
      "Data Architecture & Silos": 62,
      "AI Governance & IP": 58,
      "Knowledge & RAG": 60,
      "Engineering & QA Ops": 68,
      "IT Infrastructure & Cloud": 72,
      "Sales & Pipeline AI": 78,
      "Customer Support Automation": 80,
    },
    topUseCasesCatalog: [
      {
        name: "Omnichannel 24/7 AI Customer Concierge & Return Resolution",
        department: "Customer Experience",
        description: "Autonomous multimodal customer support agent resolving 65% of order tracking, exchange, and return inquiries without human intervention.",
        businessValueScore: 92,
        implementationEffortScore: 34,
        category: "Quick Win",
        expectedRoiPercentage: 390,
        techStack: ["Voice & Chat LLM", "Shopify/Salesforce CRM API", "pgvector"],
        complexity: "Low",
      },
      {
        name: "Dynamic Markdown & Personalized Pricing Engine",
        department: "Merchandising & Revenue",
        description: "Reinforcement learning model adjusting SKU discounting based on elasticity, competitor pricing, and inventory obsolescence curves.",
        businessValueScore: 88,
        implementationEffortScore: 48,
        category: "Quick Win",
        expectedRoiPercentage: 320,
        techStack: ["Reinforcement Learning (RL)", "Ray", "ClickHouse", "FastAPI"],
        complexity: "Medium",
      },
      {
        name: "Hyper-Personalized Visual Search & Outfit Recommendation Engine",
        department: "Digital E-Commerce",
        description: "Multi-modal CLIP-based visual discovery engine matching customer photo uploads with relevant catalogue items and personalized cross-sells.",
        businessValueScore: 86,
        implementationEffortScore: 58,
        category: "Strategic Bet",
        expectedRoiPercentage: 280,
        techStack: ["CLIP / SigLIP", "Pinecone Vector DB", "Next.js", "Redis"],
        complexity: "Medium",
      },
    ],
  },
  technology: {
    id: "technology",
    name: "Technology, SaaS & IT Services",
    aliases: ["technology", "tech", "saas", "software", "it services", "cloud", "digital", "telecom"],
    medianScore: 72,
    topQuartileScore: 91,
    laggardScore: 48,
    avgAiInvestmentPctRevenue: 4.5,
    avgPaybackPeriodMonths: 5.2,
    keyRegulations: ["SOC 2 Type II", "ISO 27001", "DPDP Act 2023", "EU AI Act", "NIST AI RMF"],
    dimensionBenchmarks: {
      "Leadership & Strategy": 78,
      "Data Architecture & Silos": 74,
      "AI Governance & IP": 70,
      "Knowledge & RAG": 76,
      "Engineering & QA Ops": 84,
      "IT Infrastructure & Cloud": 86,
      "Sales & Pipeline AI": 72,
      "Customer Support Automation": 78,
    },
    topUseCasesCatalog: [
      {
        name: "AI-Driven Automated QA Test Generation & Regression Suite",
        department: "Engineering",
        description: "Autonomous agent analyzing pull requests, generating end-to-end Cypress/Playwright tests, and catching regression flaws pre-deployment.",
        businessValueScore: 90,
        implementationEffortScore: 36,
        category: "Quick Win",
        expectedRoiPercentage: 360,
        techStack: ["Tree-sitter", "Claude 3.5 Sonnet", "GitHub Actions CI/CD", "Playwright"],
        complexity: "Low",
      },
      {
        name: "Automated Code Review & Security Vulnerability Audit Pipeline",
        department: "Engineering & Security",
        description: "Inline AST code reviewer enforcing corporate security guidelines, SAST rules, and secrets leakage detection before merge.",
        businessValueScore: 88,
        implementationEffortScore: 38,
        category: "Quick Win",
        expectedRoiPercentage: 320,
        techStack: ["Semgrep", "DeepSeek-Coder", "Docker", "GitLab CI"],
        complexity: "Low",
      },
      {
        name: "Internal Knowledge RAG & Multi-Repo Developer Search Engine",
        department: "Engineering & Operations",
        description: "Hybrid vector + BM25 developer documentation and source-code search delivering instant architectural answers and API examples.",
        businessValueScore: 86,
        implementationEffortScore: 42,
        category: "Quick Win",
        expectedRoiPercentage: 290,
        techStack: ["Hybrid RAG (BGE-M3 + BM25)", "Qdrant", "FastAPI", "Slack Bot"],
        complexity: "Medium",
      },
      {
        name: "Autonomous L1/L2 IT Helpdesk Resolution Agent",
        department: "IT Operations",
        description: "Self-healing IT agent resolving VPN resets, access permissions, and SaaS provisioning through automated Jira/Slack actions.",
        businessValueScore: 85,
        implementationEffortScore: 40,
        category: "Quick Win",
        expectedRoiPercentage: 310,
        techStack: ["LangGraph", "Jira API", "Okta SCIM", "Postgres"],
        complexity: "Medium",
      },
    ],
  },
  general: {
    id: "general",
    name: "Cross-Industry / General Operations",
    aliases: ["general", "services", "corporate", "default", "operations", "consulting"],
    medianScore: 62,
    topQuartileScore: 85,
    laggardScore: 36,
    avgAiInvestmentPctRevenue: 2.8,
    avgPaybackPeriodMonths: 7.2,
    keyRegulations: ["India DPDP Act 2023", "ISO 27001", "GDPR", "NIST AI Risk Management Framework"],
    dimensionBenchmarks: {
      "Leadership & Strategy": 64,
      "Data Architecture & Silos": 58,
      "AI Governance & IP": 60,
      "Knowledge & RAG": 62,
      "Engineering & QA Ops": 66,
      "IT Infrastructure & Cloud": 68,
      "Sales & Pipeline AI": 60,
      "Customer Support Automation": 64,
    },
    topUseCasesCatalog: [
      {
        name: "Enterprise Knowledge Base & Policy Assistant (RAG)",
        department: "Operations & HR",
        description: "Centralized AI knowledge hub allowing staff to query company SOPs, HR benefits, and project files with verifiable source citations.",
        businessValueScore: 88,
        implementationEffortScore: 35,
        category: "Quick Win",
        expectedRoiPercentage: 320,
        techStack: ["Hybrid RAG", "Pinecone", "FastAPI", "Slack / Teams Bot"],
        complexity: "Low",
      },
      {
        name: "Automated Invoice OCR & Accounts Payable Reconciliation",
        department: "Finance & Accounts",
        description: "Vision-LLM agent ingesting multi-format PDF invoices, matching purchase orders, and flagging billing discrepancies directly in ERP.",
        businessValueScore: 90,
        implementationEffortScore: 38,
        category: "Quick Win",
        expectedRoiPercentage: 340,
        techStack: ["GPT-4o Vision / Tesseract", "SAP/QuickBooks API", "Postgres"],
        complexity: "Low",
      },
      {
        name: "AI Sales Proposal & RFP Response Generator",
        department: "Sales & Marketing",
        description: "Autonomous RFP responder indexing past winning proposals, security questionnaires, and case studies to draft 80% of proposals in minutes.",
        businessValueScore: 86,
        implementationEffortScore: 40,
        category: "Quick Win",
        expectedRoiPercentage: 290,
        techStack: ["LlamaIndex", "Claude 3.5 Sonnet", "FastAPI"],
        complexity: "Medium",
      },
    ],
  },
};

/**
 * Resolves the industry benchmark profile given an industry string.
 */
export function resolveIndustryBenchmark(rawIndustry?: string): IndustryBenchmark {
  const defaultCitation = "Nisol AI Enterprise Benchmark Index (Q3 2026), n=140+ tech enterprises, calibrated against Gartner & Stanford AI Index maturity frameworks.";
  let resolved = INDUSTRY_BENCHMARKS.general;

  if (rawIndustry && typeof rawIndustry === "string") {
    const normalized = rawIndustry.toLowerCase().trim();
    for (const [_, benchmark] of Object.entries(INDUSTRY_BENCHMARKS)) {
      if (benchmark.aliases.some((alias) => normalized.includes(alias))) {
        resolved = benchmark;
        break;
      }
    }
  }

  return {
    ...resolved,
    benchmarkCitation: resolved.benchmarkCitation || defaultCitation,
  };
}
