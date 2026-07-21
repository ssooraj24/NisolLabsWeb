export interface ServicePillar {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge?: "FLAGSHIP" | "DIFFERENTIATOR" | "POPULAR";
  description: string;
  fullDescription: string;
  iconName: string;
  keyBenefits: string[];
  deliverables: string[];
  technologies: string[];
  caseStudyHighlight: {
    title: string;
    impact: string;
    metric: string;
  };
}

export const SERVICES: ServicePillar[] = [
  {
    id: "agents",
    slug: "agents",
    title: "Autonomous AI Agents",
    badge: "FLAGSHIP",
    tagline: "Self-reasoning, task-executing multi-agent systems designed for complex workflow orchestration.",
    description: "Deploy production-grade autonomous agent clusters that plan, execute, validate, and collaborate across enterprise systems with human-in-the-loop governance.",
    fullDescription: "Our flagship Autonomous AI Agent solutions move beyond single prompt-response LLMs. We design state-aware multi-agent frameworks capable of breaking down ambiguous enterprise goals into sub-tasks, interacting with APIs, databases, and third-party tools, and verifying output quality prior to execution.",
    iconName: "Bot",
    keyBenefits: [
      "End-to-end task execution across siloed enterprise legacy systems",
      "Dynamic reasoning with memory-retrieval and self-correction loops",
      "Role-based multi-agent coordination (Planner, Executor, Evaluator, Auditor)",
      "Strict enterprise guardrails, output validation, and compliance tracking"
    ],
    deliverables: [
      "Custom Multi-Agent Orchestration Architecture",
      "Enterprise Tool & API Tool-Calling Integration",
      "Human-in-the-Loop Approval Dashboard",
      "Real-time Agent Telemetry & Log Monitoring System"
    ],
    technologies: ["LangGraph", "AutoGPT / CrewAI", "Python", "FastAPI", "PostgreSQL / pgvector", "Docker"],
    caseStudyHighlight: {
      title: "Autonomous Customer Support & Resolution System",
      impact: "Automated 84% of Tier-1 & Tier-2 enterprise support tickets with zero escalation errors.",
      metric: "84% Resolution Rate"
    }
  },
  {
    id: "engineering",
    slug: "engineering",
    title: "AI Engineering & DevOps",
    badge: "DIFFERENTIATOR",
    tagline: "Enterprise LLMOps, model fine-tuning, latency optimization, and automated CI/CD pipelines for AI.",
    description: "Transition prototype models into robust, resilient, low-latency enterprise AI applications backed by bulletproof continuous deployment and observability.",
    fullDescription: "AI Engineering is our core differentiator. Many firms build AI wrappers; Nisol Labs engineers resilient AI infrastructure. From custom model fine-tuning and quantization to real-time latency optimization, prompt caching, guardrail validation, and automated continuous evaluation (LLMEval), we make AI software dependable.",
    iconName: "Cpu",
    keyBenefits: [
      "Sub-200ms latency through model quantization & semantic caching",
      "Automated prompt versioning, regression testing, and CI/CD for LLMs",
      "Cost reduction up to 60% via model routing (GPT-4o to Llama 3/Mistral)",
      "Comprehensive telemetry: token usage, drift detection, and hallucination monitoring"
    ],
    deliverables: [
      "Enterprise LLMOps Pipeline & CI/CD Setup",
      "Model Router & Token Cost Optimization Engine",
      "Fine-tuned Domain Model Weights & Evaluation Benchmarks",
      "Continuous Monitoring & Security Telemetry Stack"
    ],
    technologies: ["vLLM", "Ollama", "LlamaIndex", "LangSmith", "Weights & Biases", "Kubernetes", "Prometheus"],
    caseStudyHighlight: {
      title: "DevOps & LLMOps Transformation for Software Enterprise",
      impact: "Reduced OpenAI API token spend by 58% while improving model output accuracy by 22%.",
      metric: "58% Cost Savings"
    }
  },
  {
    id: "strategy",
    slug: "strategy",
    title: "AI Strategy & Discovery",
    tagline: "Actionable AI roadmaps aligned with business KPIs, feasibility audits, and ROI forecasting.",
    description: "Identify high-value enterprise AI use cases, evaluate technology readiness, and construct a risk-mitigated executive roadmap for AI adoption.",
    fullDescription: "Navigating AI transformation requires separating hype from measurable business ROI. Our AI Strategy & Discovery engagement audits your existing business processes, data maturity, and architecture to produce a prioritized portfolio of high-impact AI initiatives.",
    iconName: "Compass",
    keyBenefits: [
      "Data-driven AI Opportunity Matrix tailored to executive goals",
      "Feasibility, security, and compliance risk assessments",
      "Clear 12-to-24 month AI adoption roadmap with milestone KPIs",
      "Vendor-neutral model & architecture selection advice"
    ],
    deliverables: [
      "Executive AI Readiness Audit Report",
      "Prioritized AI Use Case & ROI Matrix",
      "Enterprise Security & Governance Framework",
      "Proof of Concept (PoC) Blueprint & Architecture Design"
    ],
    technologies: ["Enterprise AI Framework", "Risk Analysis Models", "Value Stream Mapping"],
    caseStudyHighlight: {
      title: "Global Supply Chain Enterprise AI Roadmap",
      impact: "Identified $4.2M in annual operational savings through targeted automated procurement.",
      metric: "$4.2M Identified ROI"
    }
  },
  {
    id: "assistants",
    slug: "assistants",
    title: "Enterprise AI Assistants",
    tagline: "Context-aware conversational assistants connected to proprietary knowledge bases and tools.",
    description: "Empower your workforce with enterprise-grade copilots that securely query internal documentation, databases, and enterprise software.",
    fullDescription: "Generic chatbots fail enterprise expectations. Nisol Labs builds context-aware AI Assistants leveraging advanced Retrieval-Augmented Generation (RAG), semantic vector search, and strict document-level security permissions. Give your team instant answers grounded directly in your organizational memory.",
    iconName: "MessageSquareCode",
    keyBenefits: [
      "Instant, verified answers backed by source document citations",
      "Role-based access control (RBAC) preventing unauthorized data leakage",
      "Multi-modal capabilities (text, document tables, charts, PDFs)",
      "Seamless integration into Slack, Microsoft Teams, or custom intranet"
    ],
    deliverables: [
      "Enterprise Hybrid RAG Pipeline (Dense + Sparse Search)",
      "Custom UI & Intranet Copilot Embeds",
      "Document Ingestion & Automated Re-indexing Pipeline",
      "Hallucination Prevention Guardrails & Feedback Loop"
    ],
    technologies: ["Pinecone", "Qdrant", "Unstructured.io", "LangChain", "Next.js", "TailwindCSS"],
    caseStudyHighlight: {
      title: "Financial Knowledge Assistant for BFSI Enterprise",
      impact: "Cut research time for wealth managers from 45 minutes down to 3 minutes per query.",
      metric: "93% Faster Research"
    }
  },
  {
    id: "automation",
    slug: "automation",
    title: "AI-Powered Automation",
    tagline: "Intelligent document processing, extraction, and automated decision-making workflows.",
    description: "Transform manual document processing, invoice validation, email triage, and complex workflow steps into zero-touch intelligent automated channels.",
    fullDescription: "Standard Robotic Process Automation (RPA) breaks when encountering unstructured data. Nisol Labs combines vision-language models, structured output extraction, and intelligent routing to automate end-to-end business workflows that adapt to unstructured forms, contracts, and receipts.",
    iconName: "Zap",
    keyBenefits: [
      "Automated extraction from unstructured PDFs, handwritten forms, and scanned images",
      "99.4% field accuracy with confidence scoring and human fallback review",
      "Seamless integration with ERP systems (SAP, Salesforce, Oracle)",
      "Drastic reduction in process cycle time from days to seconds"
    ],
    deliverables: [
      "Intelligent Document Processing (IDP) Pipeline",
      "Automated Exception Handling & Human-in-the-loop Interface",
      "ERP & CRM Webhook Sync System",
      "Real-time Audit Trail & Compliance Reporting Dashboard"
    ],
    technologies: ["Tesseract / AWS Textract", "GPT-4o Vision", "Pydantic", "RabbitMQ", "Node.js"],
    caseStudyHighlight: {
      title: "Global Logistics Invoice & Freight Audit Automation",
      impact: "Processed 120,000 invoices monthly with 99.2% extraction accuracy and zero manual keying.",
      metric: "120K Invoices/Mo"
    }
  },
  {
    id: "data-readiness",
    slug: "data-readiness",
    title: "Data Readiness for AI",
    tagline: "Data cleaning, vector database engineering, structured ETL pipelines, and semantic indexing.",
    description: "Prepare your enterprise data foundation for high-performance AI through synthetic generation, chunking optimization, and vector lakehouse architectures.",
    fullDescription: "AI is only as good as the underlying data context. Nisol Labs audits, structures, cleans, and indexes legacy enterprise datasets, enabling seamless ingestion into vector search, knowledge graphs, and LLM fine-tuning datasets.",
    iconName: "Database",
    keyBenefits: [
      "High-precision chunking, deduplication, and metadata enrichment",
      "Enterprise Vector Lakehouse architecture setup",
      "Data privacy, PII masking, and SOC-2 compliance filtering",
      "Structured knowledge graph construction for complex domain entities"
    ],
    deliverables: [
      "Enterprise Vector Database & Knowledge Graph",
      "Automated Data Cleaning & Chunking Pipeline",
      "PII Masking & Anonymization Engine",
      "Data Quality & Semantic Search Benchmark Report"
    ],
    technologies: ["Snowflake", "Databricks", "Pinecone", "Neo4j", "Python", "Apache Airflow"],
    caseStudyHighlight: {
      title: "Healthcare Data Sanitization & Vector Pipeline",
      impact: "Cleaned and indexed 15M medical records for AI discovery while guaranteeing HIPAA compliance.",
      metric: "15M Records Indexed"
    }
  }
];
