
// src/data/playbookDetails.ts
import { Playbook } from '@/types/playbook';

// ------------------------------------------------------------------
// 1. AI FOR FINANCE
// ------------------------------------------------------------------
const financePlaybook: Playbook = {
  slug: 'ai-finance',
  industry: 'Finance',
  hero: {
    title: 'AI for Finance',
    subtitle: 'A practical guide to AI in banking, insurance, wealth management, and fintech.',
    image: '/images/hero-finance.jpg',
    roi: '200–400%',
    timeline: '4–12 Months',
    opportunitiesCount: 18,
  },
  purpose: `Financial institutions face rising pressure to cut operational costs, detect fraud in real time, and deliver hyper‑personalised customer experiences—all while navigating complex regulations. This playbook maps out high‑impact AI opportunities that generate measurable returns.

  Whether you are a retail bank, an insurer, or an asset manager, you’ll learn how to prioritise use cases, build a compliant business case, and roll out AI in a phased, risk‑aware manner.`,
  challenges: [
    { title: 'Fraud & Financial Crime' },
    { title: 'Manual Document Processing' },
    { title: 'Regulatory Compliance Burden' },
    { title: 'Customer Churn' },
    { title: 'Siloed Legacy Systems' },
    { title: 'Credit Risk Assessment' },
    { title: 'Claims Processing Delays' },
    { title: 'Data Privacy & Security' },
  ],
  opportunities: [
    { department: 'Risk', opportunity: 'Real‑Time Fraud Detection', priority: 'High', slug: 'fraud-detection' },
    { department: 'Operations', opportunity: 'Intelligent Document Processing', priority: 'High', slug: 'document-processing' },
    { department: 'Compliance', opportunity: 'Automated Regulatory Reporting', priority: 'High', slug: 'compliance-automation' },
    { department: 'Customer Service', opportunity: 'AI‑Powered Virtual Assistants', priority: 'Medium', slug: 'customer-service-bot' },
    { department: 'Wealth', opportunity: 'Personalised Investment Insights', priority: 'Medium', slug: 'investment-insights' },
    { department: 'Underwriting', opportunity: 'Automated Risk Scoring', priority: 'High', slug: 'risk-scoring' },
    { department: 'Finance Ops', opportunity: 'Invoice & Contract Analysis', priority: 'High', slug: 'invoice-contract-ai' },
  ],
  featuredSolutions: [
    {
      title: 'Intelligent Document Processing (IDP)',
      businessProblem: 'Banks and insurers process thousands of invoices, claims, and contracts manually, leading to delays and human errors.',
      solution: 'AI extracts, classifies, and validates data from unstructured documents, integrating seamlessly with core systems.',
      benefits: '80% faster processing, 60% lower operational cost, and fully auditable trails.',
      technology: 'Azure AI Document Intelligence, GPT‑4, Power Automate, secure APIs.',
      timeline: '6–8 weeks for pilot',
      roi: '350%+ over 12 months',
      slug: 'idp-solution',
    },
    {
      title: 'Real‑Time Fraud Detection',
      businessProblem: 'Legacy rule‑based systems miss sophisticated fraud patterns and generate too many false positives.',
      solution: 'Graph neural networks analyse transactional relationships in milliseconds to flag anomalies.',
      benefits: '50% reduction in false positives, 40% faster investigation, millions saved in fraud losses.',
      technology: 'Neo4j, PyTorch Geometric, real‑time Kafka streams.',
      timeline: '8–10 weeks for pilot',
      roi: '500%+ over 12 months',
      slug: 'fraud-detection-solution',
    },
  ],
  maturityJourney: ['Current State', 'Exploring AI', 'Pilot Projects', 'Department AI', 'Enterprise AI', 'AI‑Driven Business'],
  roadmap: [
    { month: 'Month 1', milestone: 'Discovery Workshop & Regulatory Review' },
    { month: 'Month 2', milestone: 'Deploy IDP for invoice processing (quick win)' },
    { month: 'Month 4', milestone: 'Pilot fraud detection on a single product line' },
    { month: 'Month 6', milestone: 'Integrate AI into core banking systems' },
    { month: 'Month 12', milestone: 'Full enterprise AI orchestration platform' },
  ],
  businessBenefits: [
    'Lower Operational Costs',
    'Faster Customer Onboarding',
    'Reduced Fraud Losses',
    'Improved Regulatory Compliance',
    'Better Risk Management',
    'Personalised Customer Journeys',
    'Increased Cross‑Sell Revenue',
    'Higher Employee Productivity',
  ],
  services: [
    { name: 'AI Strategy & Roadmap', description: 'Define your AI vision aligned with financial regulations.', link: '/services/strategy' },
    { name: 'Compliant AI Development', description: 'Build secure, auditable AI solutions for finance.', link: '/services/compliant-ai' },
    { name: 'Legacy System Integration', description: 'Bridge AI with core banking platforms (FIS, Temenos, etc.).', link: '/services/integration' },
    { name: 'AI Managed Services', description: 'Ongoing monitoring, retraining, and governance.', link: '/services/managed-ai' },
  ],
  faq: [
    { q: 'Is AI safe for highly regulated financial data?', a: 'Yes—we implement enterprise‑grade encryption, access controls, and full audit trails. Our solutions are built with SOX, SEC, and GDPR requirements from day one.' },
    { q: 'Can AI integrate with our core banking system?', a: 'Absolutely. We use secure APIs and middleware (e.g., MuleSoft, Azure Logic Apps) to connect AI without disrupting production.' },
    { q: 'How long to see ROI?', a: 'Most clients see positive ROI within 4–6 months, starting with a focused quick‑win like document automation.' },
    { q: 'What about model explainability for regulators?', a: 'We use interpretable ML frameworks and provide full model documentation to satisfy regulatory scrutiny.' },
  ],
};

// ------------------------------------------------------------------
// 2. AI FOR MANUFACTURING
// ------------------------------------------------------------------
const manufacturingPlaybook: Playbook = {
  slug: 'ai-manufacturing',
  industry: 'Manufacturing',
  hero: {
    title: 'AI for Manufacturing',
    subtitle: 'A complete guide to AI across production, quality, maintenance, supply chain, and operations.',
    image: '/images/hero-manufacturing.jpg',
    roi: '250–450%',
    timeline: '3–12 Months',
    opportunitiesCount: 20,
  },
  purpose: `Manufacturers are under constant pressure to improve OEE, reduce unplanned downtime, and maintain quality while managing supply chain volatility. This playbook outlines practical AI applications that deliver tangible operational and financial improvements.

  From predictive maintenance to visual inspection and demand forecasting, you’ll get a clear roadmap to move from pilot to enterprise‑wide AI adoption.`,
  challenges: [
    { title: 'Production Delays' },
    { title: 'Quality Issues' },
    { title: 'Machine Downtime' },
    { title: 'Inventory Inefficiency' },
    { title: 'Supply Chain Disruption' },
    { title: 'Energy Costs' },
    { title: 'Labour Shortage' },
    { title: 'Compliance Burden' },
  ],
  opportunities: [
    { department: 'Production', opportunity: 'Predictive Maintenance', priority: 'High', slug: 'predictive-maintenance' },
    { department: 'Quality', opportunity: 'Visual Inspection (AOI)', priority: 'High', slug: 'visual-inspection' },
    { department: 'Supply Chain', opportunity: 'Demand Forecasting', priority: 'High', slug: 'demand-forecasting' },
    { department: 'HR', opportunity: 'AI Knowledge Assistant', priority: 'Medium', slug: 'knowledge-assistant' },
    { department: 'Finance', opportunity: 'Invoice Processing', priority: 'High', slug: 'invoice-processing' },
    { department: 'Maintenance', opportunity: 'Asset Performance Management', priority: 'High', slug: 'asset-performance' },
  ],
  featuredSolutions: [
    {
      title: 'Predictive Maintenance',
      businessProblem: 'Unexpected equipment failures cause costly downtime and reactive maintenance.',
      solution: 'AI models analyse IoT sensor data to predict failures days in advance, enabling just‑in‑time maintenance.',
      benefits: 'Reduce downtime by 45%, extend asset life, lower maintenance spend.',
      technology: 'IoT sensors, time‑series anomaly detection, MLOps pipelines.',
      timeline: '4–6 weeks for pilot',
      roi: '300%+ over 12 months',
      slug: 'predictive-maintenance',
    },
    {
      title: 'AI Visual Inspection',
      businessProblem: 'Manual quality inspection is slow, subjective, and misses micro‑defects.',
      solution: 'Computer vision models detect surface defects, dimensional errors, and assembly faults in real time.',
      benefits: '99%+ defect detection, 10x faster than human inspection, reduced scrap.',
      technology: 'Deep learning (CNNs), edge AI cameras, MES integration.',
      timeline: '6–8 weeks for pilot',
      roi: '400%+ over 12 months',
      slug: 'visual-inspection',
    },
  ],
  maturityJourney: ['Current State', 'Exploring AI', 'Pilot Projects', 'Department AI', 'Enterprise AI', 'AI‑Driven Business'],
  roadmap: [
    { month: 'Month 1', milestone: 'Discovery Workshop & Use Case Prioritisation' },
    { month: 'Month 2', milestone: 'Quick Win: Deploy document processing for supply chain' },
    { month: 'Month 4', milestone: 'Pilot Predictive Maintenance on critical assets' },
    { month: 'Month 6', milestone: 'Rollout to multiple production lines' },
    { month: 'Month 12', milestone: 'Full enterprise‑scale AI platform' },
  ],
  businessBenefits: [
    'Lower Operating Costs',
    'Increase Productivity',
    'Improve Quality',
    'Reduce Manual Work',
    'Better Decisions',
    'Faster Customer Response',
    'Improve Compliance',
    'Increase Revenue',
  ],
  services: [
    { name: 'AI Opportunity Mapping', description: 'Identify highest‑value AI use cases for your factory.', link: '/services/opportunity-mapping' },
    { name: 'AI Strategy', description: 'Develop a tailored AI roadmap aligned with business goals.', link: '/services/strategy' },
    { name: 'AI Readiness Assessment', description: 'Evaluate your data, infrastructure, and talent readiness.', link: '/services/readiness' },
    { name: 'AI Agent Development', description: 'Build autonomous AI agents for production and supply chain.', link: '/services/agent-development' },
  ],
  faq: [
    { q: 'How much does an AI implementation cost?', a: 'We typically start with a discovery workshop for $5,000, followed by pilot projects from $25,000.' },
    { q: 'What should we automate first?', a: 'We recommend starting with high‑impact, low‑effort use cases like document processing or knowledge management.' },
    { q: 'Is our ERP compatible?', a: 'Yes, most modern ERPs (SAP, Oracle, Microsoft) integrate with AI through APIs and middleware.' },
    { q: 'Do we need new sensors?', a: 'Often you can use existing PLC and SCADA data. We assess what you already have first.' },
  ],
};

// ------------------------------------------------------------------
// 3. AI FOR HEALTHCARE
// ------------------------------------------------------------------
const healthcarePlaybook: Playbook = {
  slug: 'ai-healthcare',
  industry: 'Healthcare',
  hero: {
    title: 'AI for Healthcare',
    subtitle: 'A practical guide to AI in hospitals, clinics, pharma, and life sciences.',
    image: '/images/hero-healthcare.jpg',
    roi: '200–350%',
    timeline: '4–14 Months',
    opportunitiesCount: 16,
  },
  purpose: `Healthcare providers and life sciences organisations are drowning in administrative work while striving to improve patient outcomes. This playbook explores AI solutions that reduce clinician burnout, accelerate research, and enhance diagnostic accuracy—all within strict regulatory frameworks.

  Whether you run a hospital network or a biotech lab, you’ll find actionable paths to deploy AI safely and at scale.`,
  challenges: [
    { title: 'Clinical Documentation Burden' },
    { title: 'Medical Coding Errors' },
    { title: 'Claims Denials & Appeals' },
    { title: 'Patient No‑Shows' },
    { title: 'Radiology Backlogs' },
    { title: 'Drug Discovery Speed' },
    { title: 'Regulatory & HIPAA Compliance' },
    { title: 'Staff Shortages' },
  ],
  opportunities: [
    { department: 'Clinical', opportunity: 'Ambient Clinical Documentation', priority: 'High', slug: 'clinical-documentation' },
    { department: 'Revenue Cycle', opportunity: 'Automated Medical Coding', priority: 'High', slug: 'medical-coding' },
    { department: 'Operations', opportunity: 'Claims Processing Automation', priority: 'High', slug: 'claims-automation' },
    { department: 'Patient Experience', opportunity: 'AI Appointment Scheduling', priority: 'Medium', slug: 'appointment-scheduling' },
    { department: 'Radiology', opportunity: 'AI‑Assisted Diagnostic Support', priority: 'High', slug: 'diagnostic-support' },
    { department: 'R&D', opportunity: 'Drug Discovery Acceleration', priority: 'Medium', slug: 'drug-discovery' },
  ],
  featuredSolutions: [
    {
      title: 'Ambient Clinical Documentation',
      businessProblem: 'Clinicians spend 2+ hours on documentation per hour of patient care, leading to burnout.',
      solution: 'AI listens to patient visits and generates structured SOAP notes, discharge summaries, and referral letters in real time.',
      benefits: 'Reduce documentation time by 70%, improve patient interaction, increase clinician satisfaction.',
      technology: 'Speech‑to‑text, GPT‑4, EHR integration (Epic, Cerner).',
      timeline: '6–8 weeks for pilot',
      roi: '300%+ over 12 months',
      slug: 'ambient-documentation',
    },
    {
      title: 'Claims Processing Automation',
      businessProblem: 'Manual claims review leads to denials, delayed reimbursements, and high administrative costs.',
      solution: 'AI extracts and validates claim data, predicts denials, and auto‑submits corrections.',
      benefits: '50% faster claims turnaround, 30% reduction in denials, improved cash flow.',
      technology: 'NLP, rule‑based validation, RPA integration.',
      timeline: '4–6 weeks for pilot',
      roi: '250%+ over 12 months',
      slug: 'claims-automation',
    },
  ],
  maturityJourney: ['Current State', 'Exploring AI', 'Pilot Projects', 'Department AI', 'Enterprise AI', 'AI‑Driven Business'],
  roadmap: [
    { month: 'Month 1', milestone: 'Discovery Workshop & HIPAA Risk Assessment' },
    { month: 'Month 2', milestone: 'Deploy ambient documentation for a pilot department' },
    { month: 'Month 4', milestone: 'Roll out claims automation across revenue cycle' },
    { month: 'Month 8', milestone: 'Integrate diagnostic AI into radiology workflow' },
    { month: 'Month 14', milestone: 'Enterprise‑wide AI governance & scaling' },
  ],
  businessBenefits: [
    'Reduce Clinician Burnout',
    'Improve Patient Outcomes',
    'Accelerate Reimbursements',
    'Lower Admin Costs',
    'Enhance Diagnostic Accuracy',
    'Speed Drug Discovery',
    'Improve Compliance',
    'Increase Patient Access',
  ],
  services: [
    { name: 'AI Strategy for Healthcare', description: 'Navigate regulatory and clinical requirements.', link: '/services/healthcare-strategy' },
    { name: 'EHR Integration', description: 'Seamlessly connect AI with Epic, Cerner, and others.', link: '/services/ehr-integration' },
    { name: 'HIPAA‑Compliant AI', description: 'Build secure, auditable AI with enterprise‑grade privacy.', link: '/services/hipaa-ai' },
  ],
  faq: [
    { q: 'Is AI diagnosis approved by regulators?', a: 'Our solutions are designed to assist, not replace, clinicians. We follow FDA guidance on AI‑as‑a‑medical‑device and ensure human‑in‑the‑loop oversight.' },
    { q: 'Can AI integrate with our EHR?', a: 'Yes, we use HL7/FHIR standards to integrate with Epic, Cerner, and other major EHR platforms.' },
    { q: 'How do you handle patient data privacy?', a: 'We implement de‑identification, encryption, and strict access controls, and we sign BAAs for HIPAA compliance.' },
  ],
};

// ------------------------------------------------------------------
// 4. AI FOR RETAIL
// ------------------------------------------------------------------
const retailPlaybook: Playbook = {
  slug: 'ai-retail',
  industry: 'Retail',
  hero: {
    title: 'AI for Retail',
    subtitle: 'A practical guide to AI in e‑commerce, omnichannel, and consumer goods.',
    image: '/images/hero-retail.jpg',
    roi: '300–500%',
    timeline: '3–10 Months',
    opportunitiesCount: 18,
  },
  purpose: `Retailers face thin margins, intense competition, and ever‑changing consumer expectations. This playbook shows you how AI can drive revenue growth, optimise inventory, and deliver personalised shopping experiences at scale.

  From product recommendations to dynamic pricing and supply chain optimisation, you’ll get a clear path to becoming an AI‑first retailer.`,
  challenges: [
    { title: 'Personalisation at Scale' },
    { title: 'Inventory Overstock / Stockouts' },
    { title: 'Supply Chain Volatility' },
    { title: 'High Customer Service Costs' },
    { title: 'Visual Search & Discovery' },
    { title: 'Dynamic Pricing Complexity' },
    { title: 'Fraud & Returns Abuse' },
    { title: 'Employee Scheduling' },
  ],
  opportunities: [
    { department: 'Marketing', opportunity: 'Hyper‑Personalised Recommendations', priority: 'High', slug: 'personalization' },
    { department: 'Supply Chain', opportunity: 'Demand & Inventory Optimisation', priority: 'High', slug: 'inventory-optimization' },
    { department: 'Customer Service', opportunity: 'AI‑Powered Chatbots', priority: 'Medium', slug: 'cs-bot' },
    { department: 'E‑commerce', opportunity: 'Visual & Voice Search', priority: 'Medium', slug: 'visual-search' },
    { department: 'Pricing', opportunity: 'Dynamic Pricing Engine', priority: 'High', slug: 'dynamic-pricing' },
    { department: 'Fraud', opportunity: 'Transaction Fraud Detection', priority: 'High', slug: 'retail-fraud' },
  ],
  featuredSolutions: [
    {
      title: 'AI Personalisation Engine',
      businessProblem: 'Generic promotions and product feeds lead to low conversion and high bounce rates.',
      solution: 'AI analyses browsing, purchase, and contextual data to deliver real‑time product recommendations and dynamic content.',
      benefits: '30% increase in AOV, 25% higher conversion, improved customer lifetime value.',
      technology: 'Collab filtering, LLM embeddings, real‑time feature stores.',
      timeline: '6–8 weeks for pilot',
      roi: '400%+ over 12 months',
      slug: 'personalization-engine',
    },
    {
      title: 'Inventory & Demand Optimisation',
      businessProblem: 'Overstock ties up capital; stockouts lose sales and damage brand trust.',
      solution: 'AI predicts demand at SKU‑level with external factors (weather, trends, promotions) to automate replenishment.',
      benefits: '20% reduction in inventory carrying costs, 15% increase in in‑stock rates.',
      technology: 'Time‑series forecasting, causal ML, supply chain APIs.',
      timeline: '6–8 weeks for pilot',
      roi: '300%+ over 12 months',
      slug: 'inventory-optimization',
    },
  ],
  maturityJourney: ['Current State', 'Exploring AI', 'Pilot Projects', 'Department AI', 'Enterprise AI', 'AI‑Driven Business'],
  roadmap: [
    { month: 'Month 1', milestone: 'Discovery Workshop & Data Audit' },
    { month: 'Month 2', milestone: 'Deploy personalisation on the product detail page' },
    { month: 'Month 4', milestone: 'Pilot demand forecasting for top‑selling categories' },
    { month: 'Month 6', milestone: 'Roll out dynamic pricing and chatbot' },
    { month: 'Month 10', milestone: 'Enterprise‑wide AI orchestration' },
  ],
  businessBenefits: [
    'Increase Revenue',
    'Reduce Stockouts',
    'Lower Inventory Costs',
    'Improve Customer Experience',
    'Increase Conversion Rate',
    'Reduce Support Costs',
    'Optimise Pricing',
    'Prevent Fraud',
  ],
  services: [
    { name: 'AI Retail Strategy', description: 'Identify your highest‑value AI initiatives.', link: '/services/retail-strategy' },
    { name: 'E‑commerce AI Integration', description: 'Embed AI into Shopify, Magento, or custom platforms.', link: '/services/ecommerce-ai' },
    { name: 'Supply Chain AI', description: 'Optimise forecasting and replenishment.', link: '/services/supply-chain-ai' },
  ],
  faq: [
    { q: 'How long does AI personalisation take to implement?', a: 'We can deploy a pilot in 6–8 weeks and start seeing conversion lift within the first month.' },
    { q: 'Can we use AI without a data science team?', a: 'Yes. We build and manage the models for you, delivering insights through dashboards and APIs.' },
    { q: 'Does AI work for physical stores too?', a: 'Absolutely—we integrate with POS, cameras, and loyalty systems to unify online and offline data.' },
  ],
};

// ------------------------------------------------------------------
// 5. AI FOR IT SERVICES (MSPs & Consulting Firms)
// ------------------------------------------------------------------
const itServicesPlaybook: Playbook = {
  slug: 'ai-it-services',
  industry: 'IT Services',
  hero: {
    title: 'AI for IT Services Companies',
    subtitle: 'The MSP & IT consulting playbook for internal efficiency and new AI‑driven revenue streams.',
    image: '/images/hero-it-services.jpg',
    roi: '200–500%',
    timeline: '2–10 Months',
    opportunitiesCount: 16,
  },
  purpose: `IT service providers and MSPs face pressure to deliver more value with leaner teams while client expectations rise. This playbook covers how to use AI internally to supercharge your delivery, and externally to create new AI‑as‑a‑Service offerings.

  Whether you want to automate your service desk or build a white‑label AI practice, this is your blueprint.`,
  challenges: [
    { title: 'Service Desk Ticket Overload' },
    { title: 'Slow Triage & Escalation' },
    { title: 'Client Infrastructure Complexity' },
    { title: 'Knowledge Silos' },
    { title: 'Documentation Drift' },
    { title: 'Code Quality & Review Bottlenecks' },
    { title: 'DevOps Pipeline Inefficiency' },
    { title: 'Margin Pressure' },
  ],
  opportunities: [
    { department: 'Service Desk', opportunity: 'AI‑Powered Tier‑0/1 Support', priority: 'High', slug: 'ai-service-desk' },
    { department: 'NOC', opportunity: 'Predictive Incident Detection', priority: 'High', slug: 'predictive-noc' },
    { department: 'Knowledge Mgmt', opportunity: 'AI Knowledge Base & Chat', priority: 'High', slug: 'kb-chat' },
    { department: 'Delivery', opportunity: 'Automated Documentation Generation', priority: 'Medium', slug: 'doc-generation' },
    { department: 'DevOps', opportunity: 'AI‑Assisted Code Review & CI/CD', priority: 'Medium', slug: 'ai-devops' },
    { department: 'Client Offerings', opportunity: 'White‑Label AI Agents (AIaaS)', priority: 'High', slug: 'aiaas' },
  ],
  featuredSolutions: [
    {
      title: 'AI‑Powered Service Desk',
      businessProblem: 'L1/L2 agents spend 60% of time on repetitive tickets, causing SLA breaches and burnout.',
      solution: 'AI agent handles triage, classification, and resolution for common issues, escalating only complex tickets.',
      benefits: '70% faster resolution, 50% reduction in L1 workload, improved CSAT.',
      technology: 'LLMs, RAG, ticketing system APIs (ConnectWise, ServiceNow).',
      timeline: '4–6 weeks for pilot',
      roi: '400%+ over 12 months',
      slug: 'service-desk-ai',
    },
    {
      title: 'AI‑as‑a‑Service (AIaaS) for Your Clients',
      businessProblem: 'Your clients are asking for AI but don’t know where to start, and you lack an AI practice.',
      solution: 'We help you build a white‑label AI offering—from strategy to implementation—that you sell as your own.',
      benefits: 'New recurring revenue stream, higher client retention, differentiated positioning.',
      technology: 'Our proprietary AI agent frameworks, fully branded for your firm.',
      timeline: '8–10 weeks to go‑to‑market',
      roi: '500%+ over 12 months',
      slug: 'aiaas',
    },
  ],
  maturityJourney: ['Current State', 'Exploring AI', 'Pilot Projects', 'Department AI', 'Enterprise AI', 'AI‑Driven Business'],
  roadmap: [
    { month: 'Month 1', milestone: 'Discovery Workshop & Internal Opportunity Mapping' },
    { month: 'Month 2', milestone: 'Deploy AI service desk for your internal IT' },
    { month: 'Month 3', milestone: 'Pilot AI Knowledge Base for top clients' },
    { month: 'Month 6', milestone: 'Launch white‑label AIaaS offering' },
    { month: 'Month 10', milestone: 'Scale to full AI practice with managed services' },
  ],
  businessBenefits: [
    'Reduce Delivery Costs',
    'Increase Margins',
    'New Recurring Revenue',
    'Improve SLA Attainment',
    'Reduce Staff Burnout',
    'Differentiate from Competitors',
    'Increase Client Stickiness',
    'Accelerate Onboarding',
  ],
  services: [
    { name: 'AI for MSPs Practice', description: 'Turn your firm into an AI‑powered IT provider.', link: '/services/msp-ai' },
    { name: 'White‑Label AI Agents', description: 'Sell AI solutions under your own brand.', link: '/services/white-label-ai' },
    { name: 'Internal AI Transformation', description: 'Use AI to optimise your own delivery engine.', link: '/services/internal-ai' },
  ],
  faq: [
    { q: 'Do we need to hire data scientists?', a: 'No. We provide the IP and managed models. Your team focuses on client relationships and delivery.' },
    { q: 'Can we resell these AI agents?', a: 'Yes, we offer full white‑labelling and commercial licensing so you own the client relationship.' },
    { q: 'How quickly can we launch an AI practice?', a: 'We can have your first pilot client within 8 weeks and a fully branded offering within 12 weeks.' },
  ],
};

// ------------------------------------------------------------------
// 6. AI FOR SMALL BUSINESSES
// ------------------------------------------------------------------
const smallBusinessPlaybook: Playbook = {
  slug: 'ai-small-business',
  industry: 'Small Business',
  hero: {
    title: 'AI for Small Businesses',
    subtitle: 'A practical, affordable guide to AI adoption for solopreneurs, startups, and SMBs — from first use‑case to full AI stack.',
    image: '/images/playbook/ai-small-business.png',
    roi: '300–600%',
    timeline: '2–8 Months',
    opportunitiesCount: 14,
  },
  purpose: `Small businesses don't have massive IT budgets or data science teams—but they can still leverage AI to compete with larger players. This playbook focuses on low‑cost, high‑impact AI tools and strategies that deliver immediate results.

  From automating customer service to generating marketing content and analysing financials, you'll discover how to start small, learn fast, and scale wisely. Most importantly, this playbook shows you exactly how Nisol Labs guides your journey—from Discovery Workshop to optimisation.`,
  challenges: [
    { title: 'Limited Marketing Budget', description: 'Can\'t afford agencies or full-time creators. Content output is inconsistent and slow.' },
    { title: 'Customer Service Overhead', description: 'Small teams can\'t cover 24/7 support—queries go unanswered and leads are lost.' },
    { title: 'Lead Qualification Bottlenecks', description: 'Manually sorting leads wastes hours and lets hot prospects go cold.' },
    { title: 'Social Media Management', description: 'Keeping up with consistent posting, captions, and engagement is a full-time job.' },
    { title: 'Financial Tracking & Analysis', description: 'Cash flow blind spots and manual bookkeeping create costly errors and delays.' },
    { title: 'Document Chaos', description: 'Contracts, proposals, and invoices are scattered—hard to find, easy to lose.' },
    { title: 'Data Analysis', description: 'No analyst on the team means decisions are gut-feel rather than data-driven.' },
    { title: 'Time Scarcity', description: 'Owners spend 12+ hrs/week on tasks that AI could automate entirely.' },
  ],
  opportunities: [
    { department: 'Marketing', opportunity: 'Content Generation & SEO', priority: 'High', slug: 'content-gen' },
    { department: 'Customer Service', opportunity: 'AI Chatbot (24/7 Support)', priority: 'High', slug: 'chatbot' },
    { department: 'Sales', opportunity: 'Lead Qualification & Scoring', priority: 'High', slug: 'lead-scoring' },
    { department: 'Social', opportunity: 'Social Media Scheduling & Copy', priority: 'Medium', slug: 'social-media' },
    { department: 'Finance', opportunity: 'Automated Bookkeeping Analysis', priority: 'Medium', slug: 'finance-ai' },
    { department: 'Admin', opportunity: 'Document Management & Search', priority: 'High', slug: 'doc-search' },
    { department: 'HR', opportunity: 'AI‑Assisted Candidate Screening', priority: 'Medium', slug: 'hr-screening' },
    { department: 'Operations', opportunity: 'Workflow & Email Automation', priority: 'High', slug: 'workflow-automation' },
  ],
  featuredSolutions: [
    {
      title: 'AI Customer Service Chatbot',
      businessProblem: 'Small teams can\'t answer customer queries 24/7, leading to lost sales and frustrated clients.',
      solution: 'Deploy an AI chatbot on your website and social channels to answer FAQs, book calls, and qualify leads around the clock.',
      benefits: 'Capture leads after hours, reduce support load by 60%, improve response time to seconds.',
      technology: 'RAG, OpenAI GPT‑4o, website integration (no‑code embed).',
      timeline: '2–3 weeks for pilot',
      roi: '500%+ over 12 months',
      slug: 'sb-chatbot',
    },
    {
      title: 'Marketing Content Generation',
      businessProblem: 'Creating blogs, emails, and social posts consistently is time‑consuming and expensive to outsource.',
      solution: 'AI generates on‑brand content drafts, social captions, and email sequences based on your voice and keywords—ready in minutes.',
      benefits: '10x faster content creation, lower agency costs, improved SEO ranking.',
      technology: 'Fine‑tuned LLMs, brand voice customisation, integration with Notion/WordPress.',
      timeline: '1–2 weeks for pilot',
      roi: '400%+ over 12 months',
      slug: 'sb-content-gen',
    },
  ],
  maturityJourney: ['Current State', 'Exploring AI', 'Pilot Projects', 'Department AI', 'Enterprise AI', 'AI‑Driven Business'],
  roadmap: [
    { month: 'Week 1–2', milestone: 'AI Discovery Workshop — map operations, identify top 5 opportunities' },
    { month: 'Week 2–3', milestone: 'Deploy chatbot on website (first live client interaction)' },
    { month: 'Month 1', milestone: 'Roll out AI content generation for social media & blog' },
    { month: 'Month 2', milestone: 'Automate lead scoring and email follow-up sequences' },
    { month: 'Month 3–4', milestone: 'AI financial analysis & document management live' },
    { month: 'Month 6–8', milestone: 'Full AI stack with custom agents and workflow automation' },
  ],
  businessBenefits: [
    'Save 10+ hrs/week',
    'Reduce Costs by 30–45%',
    'Capture More Leads',
    'Improve Customer Experience',
    'Grow Revenue',
    'Compete with Big Players',
    'Simplify Operations',
    'Scale Without Hiring',
  ],
  services: [
    { name: 'AI Discovery Workshop (SMB)', description: 'Focused 2‑hour session to map your operations and identify quick wins.', link: '/services/smb-workshop' },
    { name: 'AI Accelerator Package', description: 'Chatbot + Content AI + Lead Scoring bundle — deployed in 4 weeks.', link: '/services/smb-accelerator' },
    { name: 'Ongoing AI Support', description: 'Monthly check‑ins, model tuning, and optimisation as you grow.', link: '/services/smb-support' },
  ],
  faq: [
    { q: 'How much does AI cost for a small business?', a: 'We offer entry‑level packages starting at $2,500 for a standalone chatbot deployment, and full AI starter stacks from $8,000. Ongoing support starts at $500/month.' },
    { q: 'Do I need technical skills to use these tools?', a: 'No. We build everything for you and provide easy‑to‑use dashboards. You just manage your business — we handle the AI complexity.' },
    { q: 'What if I don\'t have much data?', a: 'Many AI tools work well with minimal historical data. We leverage pre‑trained models and your existing documents, emails, and website content.' },
    { q: 'How fast can I see results?', a: 'Chatbots and content tools show value in the first week. ROI is typically visible within 30 days of going live.' },
    { q: 'Will AI replace my team?', a: 'No — AI handles repetitive, time-consuming tasks so your team can focus on higher-value work. Most clients find their team is more productive and happier after AI adoption.' },
    { q: 'What is an AI Discovery Workshop?', a: 'A focused 2-hour session (virtual or in-person) where Nisol Labs consultants audit your current operations, identify your top AI opportunities, and deliver a prioritised roadmap on the day.' },
  ],
};

// At the bottom of src/data/playbookDetails.ts

export const PLAYBOOKS = {
  aiFinance: financePlaybook,
  aiManufacturing: manufacturingPlaybook,
  aiHealthcare: healthcarePlaybook,
  aiRetail: retailPlaybook,
  aiItServices: itServicesPlaybook,
  aiSmallBusiness: smallBusinessPlaybook,
};