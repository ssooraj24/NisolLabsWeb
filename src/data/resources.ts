export interface Playbook {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  targetAudience: string;
}

export interface Blueprint {
  id: string;
  title: string;
  complexity: "Intermediate" | "Advanced" | "Enterprise";
  summary: string;
  architectureComponents: string[];
  techStack: string[];
  keyDesignDecision: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  clientType: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  featuredTech: string[];
}

export const PLAYBOOKS: Playbook[] = [
  {
    id: "ai-small-business",
    title: "AI for Small Businesses: A Practical Guide to AI Adoption",
    category: "Small Business",
    readTime: "8 min read",
    summary: "Practical guide to deploying AI tools for small businesses, covering use cases, ROI, and implementation roadmap.",
    keyTakeaways: [
      "Audit internal tasks for quick AI wins",
      "Select off-the-shelf vs custom solutions",
      "Prevent security leaks with low-cost privacy boundaries"
    ],
    targetAudience: "Founders, Operations Leads, IT Managers"
  },
  {
    id: "ai-it-services",
    title: "AI for IT Services Companies: The MSP's AI Playbook",
    category: "IT Services",
    readTime: "12 min read",
    summary: "How modern engineering organizations cut sprint delivery times by 40% using AI agents, tool integration, and automation.",
    keyTakeaways: [
      "Integrate AI into CI/CD pipelines",
      "Measure developer velocity securely",
      "Custom RAG over legacy code"
    ],
    targetAudience: "CTOs, VPs of Engineering, Engineering Managers"
  },
  {
    id: "ai-manufacturing",
    title: "AI for Manufacturing: A Practical Guide to AI in Manufacturing",
    category: "Manufacturing",
    readTime: "10 min read",
    summary: "Modernizing shop floor logistics, equipment monitoring, and procurement with edge AI and autonomous agents.",
    keyTakeaways: [
      "Connect IoT sensors to anomaly detection",
      "Automate purchase orders on low inventory",
      "Reduce unplanned downtime by 35%"
    ],
    targetAudience: "Plant Managers, Chief Operating Officers, Supply Chain Directors"
  },
  {
    id: "ai-healthcare",
    title: "AI for Healthcare: A Practical Guide to AI in Healthcare",
    category: "Healthcare",
    readTime: "11 min read",
    summary: "Navigating privacy standards while deploying AI for clinical transcription, triage, and medical record vector search.",
    keyTakeaways: [
      "On-premise vs VPC deployment patterns",
      "De-identification pipelines before LLMs",
      "Audit logging and medical risk mitigation framework"
    ],
    targetAudience: "Healthcare CIOs, Chief Medical Officers, Compliance Officers"
  },
  {
    id: "ai-retail",
    title: "AI for Retail & E-commerce: Personalized Journeys and Inventory Optimization",
    category: "Retail & E-commerce",
    readTime: "9 min read",
    summary: "Transforming customer support and product recommendations using multi-modal AI agents and real-time inventory forecasting.",
    keyTakeaways: [
      "Multi-modal visual product search architecture",
      "Autonomous support agents handling order changes and returns",
      "Dynamic demand forecasting grounded in historic metrics"
    ],
    targetAudience: "E-Commerce VPs, CMOs, Head of Customer Experience"
  },
  {
    id: "ai-finance",
    title: "AI for Finance & Banking: Fraud Detection, Contract Analysis & RAG",
    category: "Finance & Banking",
    readTime: "14 min read",
    summary: "Architecting financial analytical agents, automated regulatory report parsers, and institutional risk modeling platforms.",
    keyTakeaways: [
      "Dense hybrid retrieval over 500+ page annual SEC filings",
      "Automated covenant and credit risk extraction from legal agreements",
      "Real-time transaction anomaly detection pipelines"
    ],
    targetAudience: "Chief Risk Officers, FinTech Founders, Financial Analysts"
  }
];

export const BLUEPRINTS: Blueprint[] = [
  {
    id: "ai-devops-pipeline",
    title: "AI-Powered DevOps Pipeline Architecture",
    complexity: "Enterprise",
    summary: "Continuous automated code reviews, vulnerability scanning, self-healing deployment scripts, and telemetry-driven rollbacks using LLM agents.",
    architectureComponents: [
      "GitHub Actions Webhook Listener",
      "Multi-Agent Code Reviewer (Security, Style, Logic)",
      "Automated Unit Test Generator Engine",
      "Prometheus Telemetry Feedback Loop"
    ],
    techStack: ["LangGraph", "Docker", "Kubernetes", "FastAPI", "PostgreSQL"],
    keyDesignDecision: "Isolated execution in sandboxed Docker containers to prevent rogue agent code execution."
  },
  {
    id: "enterprise-knowledge-assistant",
    title: "Enterprise Knowledge Assistant (Hybrid RAG)",
    complexity: "Intermediate",
    summary: "Production RAG architecture featuring hybrid dense (vector) + sparse (BM25) search, reranking (Cohere), and document-level permission filters.",
    architectureComponents: [
      "Unstructured Document Parsing Pipeline",
      "Qdrant Vector DB with Tenant Isolation",
      "Cohere Rerank Model Integration",
      "Next.js Intranet Assistant UI"
    ],
    techStack: ["Next.js", "Qdrant", "Cohere", "LlamaIndex", "Redis"],
    keyDesignDecision: "Cross-encoder reranking applied to top 50 retrieved chunks to eliminate irrelevant context."
  },
  {
    id: "autonomous-support-agent",
    title: "Autonomous Customer Support Agent with Tool Calling",
    complexity: "Advanced",
    summary: "Multi-turn conversational agent capable of querying order status, processing refunds, updating shipping addresses, and escalating when confidence falls below 85%.",
    architectureComponents: [
      "Intent Router & Classifier",
      "Stripe & Shopify API Tool Gateway",
      "Sentiment & Confidence Scorer",
      "Zendesk / Escalation Webhook Integration"
    ],
    techStack: ["Python", "FastAPI", "OpenAI Tool Calling", "PostgreSQL", "React"],
    keyDesignDecision: "Strict JSON schema enforcement for all tool-calling actions to prevent payload corruption."
  },
  {
    id: "ai-procurement-workflow",
    title: "AI-Driven Procurement & Invoice Processing Workflow",
    complexity: "Enterprise",
    summary: "End-to-end intelligent document processing system that extracts line items from vendor invoices, matches 3-way purchase orders, and flags price discrepancies.",
    architectureComponents: [
      "Vision Document Ingestion API",
      "Structured Pydantic Extraction Engine",
      "SAP / ERP 3-Way Match Verification",
      "Human Review & Approvals UI"
    ],
    techStack: ["GPT-4o Vision", "Pydantic", "Celery", "Redis", "TailwindCSS"],
    keyDesignDecision: "Asynchronous task queue processing to handle burst volumes during monthly invoice reconciliation."
  },
  {
    id: "rag-end-to-end",
    title: "End-to-End Modular RAG Architecture with Semantic Caching",
    complexity: "Advanced",
    summary: "High-throughput enterprise search platform equipped with GPTCache semantic caching to cut API latency by 75% and token cost by 60%.",
    architectureComponents: [
      "GPTCache Embedding Vector Cache Layer",
      "Semantic Router & Guardrails",
      "Pinecone Distributed Vector Store",
      "Streamlit & REST API Endpoints"
    ],
    techStack: ["GPTCache", "Pinecone", "LangChain", "FastAPI", "Grafana"],
    keyDesignDecision: "Semantic distance threshold (Cosine similarity > 0.96) for instant cache response returns."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "it-software-engineering",
    industry: "IT & Software Engineering",
    title: "Transforming Developer Productivity for a 450-Engineer SaaS Org",
    clientType: "Enterprise B2B SaaS",
    challenge: "Long code review cycles (avg 3.5 days) and high onboarding ramp-up times for junior software engineers.",
    solution: "Deployed an internal AI Copilot and automated PR review agent trained on internal architecture patterns and security standards.",
    impactMetrics: [
      { label: "Code Review Cycle Time", value: "-68%" },
      { label: "Developer Velocity", value: "+42%" },
      { label: "Annual Savings", value: "$1.8M" }
    ],
    featuredTech: ["LangGraph", "FastAPI", "Pinecone", "GitHub Actions"]
  },
  {
    id: "customer-support-automation",
    industry: "Customer Support Automation",
    title: "Autonomous Tier-1 & Tier-2 Support Resolution Engine",
    clientType: "Global Logistics Leader",
    challenge: "Over 80,000 monthly inquiries regarding shipment tracking, customs paperwork, and delivery rescheduling causing high support queue backlogs.",
    solution: "Built an Autonomous Support Agent cluster integrated with internal logistics APIs and Zendesk.",
    impactMetrics: [
      { label: "Ticket Automation Rate", value: "84%" },
      { label: "Average Resolution Time", value: "45 sec" },
      { label: "Customer CSAT Score", value: "4.8/5" }
    ],
    featuredTech: ["Python", "FastAPI", "OpenAI Tool Calling", "Zendesk API"]
  },
  {
    id: "hr-recruitment-agent",
    industry: "HR & Talent Operations",
    title: "Autonomous Talent Screening & Match Assessment Agent",
    clientType: "Professional Staffing Firm",
    challenge: "Recruiters spending 25+ hours weekly manually screening thousands of technical resumes against complex job requisitions.",
    solution: "Engineered a candidate analysis agent that parses resumes, evaluates candidate experience against custom rubrics, and schedules interviews.",
    impactMetrics: [
      { label: "Time-to-Hire", value: "-55%" },
      { label: "Recruiter Productivity", value: "3.2x" },
      { label: "Candidate Quality Match", value: "94%" }
    ],
    featuredTech: ["LlamaIndex", "FastAPI", "React", "PostgreSQL"]
  },
  {
    id: "finance-invoice-processing",
    industry: "Finance & Accounting",
    title: "Zero-Touch Accounts Payable Invoice Processing",
    clientType: "FinTech Enterprise",
    challenge: "Manual keying of 15,000 monthly multi-currency invoices led to a 4% data error rate and vendor payment delays.",
    solution: "Implemented an Intelligent Document Processing pipeline with vision LLMs, automated currency conversion, and 3-way matching.",
    impactMetrics: [
      { label: "Processing Cost / Invoice", value: "-82%" },
      { label: "Data Extraction Accuracy", value: "99.4%" },
      { label: "Monthly Processing Volume", value: "15,000+" }
    ],
    featuredTech: ["GPT-4o Vision", "Pydantic", "Celery", "SAP Integration"]
  },
  {
    id: "sales-lead-generation",
    industry: "Sales Operations",
    title: "AI-Driven B2B Prospecting & Account Enrichment Agent",
    clientType: "Enterprise Tech Firm",
    challenge: "Outbound sales team spent 60% of their day manually researching prospect companies, finding emails, and tailoring outbound emails.",
    solution: "Built an autonomous research agent that scrapes market triggers, enriches prospect profiles, and drafts hyper-personalized outbound sequences.",
    impactMetrics: [
      { label: "Email Open Rate", value: "58%" },
      { label: "Qualified Pipeline Gen", value: "+3.4x" },
      { label: "Hours Saved per Rep/Week", value: "14 hrs" }
    ],
    featuredTech: ["Python", "Playwright", "Claude 3.5 Sonnet", "HubSpot API"]
  },
  {
    id: "healthcare-documentation",
    industry: "Healthcare",
    title: "Clinical Ambient Intelligence & SOAP Note Generation",
    clientType: "Multi-Specialty Medical Group",
    challenge: "Physicians spending 3 hours daily on post-consultation EMR documentation, contributing to severe doctor burnout.",
    solution: "Deployed a HIPAA-compliant ambient audio transcription and clinical note generation agent integrated into Epic EMR.",
    impactMetrics: [
      { label: "Documentation Time / Patient", value: "-75%" },
      { label: "Physician Satisfaction", value: "96%" },
      { label: "Daily Patient Capacity", value: "+22%" }
    ],
    featuredTech: ["Whisper AI", "HIPAA VPC", "Custom Fine-tuned Llama 3", "Epic EHR API"]
  },
  {
    id: "enterprise-multi-agent",
    industry: "Cross-Industry Operations",
    title: "Enterprise Multi-Agent Orchestration Engine",
    clientType: "Global Telecom Enterprise",
    challenge: "Complex cross-departmental operations required coordinated execution across IT provisioning, billing updates, and network diagnostics.",
    solution: "Architected a master supervisor multi-agent graph with specialized sub-agents executing independent tool workflows.",
    impactMetrics: [
      { label: "Process SLA Completion", value: "99.1%" },
      { label: "Cross-System Hand-offs", value: "Instant" },
      { label: "Annual Operational Savings", value: "$3.6M" }
    ],
    featuredTech: ["LangGraph", "vLLM", "Redis", "Kafka", "Docker"]
  }
];
