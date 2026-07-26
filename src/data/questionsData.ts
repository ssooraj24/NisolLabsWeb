export type QuestionItem = {
  id: number
  section: string
  order_index: number
  question_text: string
  tip_discussion: string | null
  triggered_patterns: string[] | null
}

export const INITIAL_62_QUESTIONS: QuestionItem[] = [
  // SECTION 1: Leadership & Strategy (1-5)
  {
    id: 1,
    section: "Leadership & Strategy",
    order_index: 1,
    question_text: "What is the organization's top-level strategic vision for AI over the next 3 years?",
    tip_discussion: "Look for specifics: Is there a formal AI roadmap? Is AI mentioned in the annual report? Who is driving it—CEO, CTO, or a dedicated CAIO?",
    triggered_patterns: ["AI Strategy Advisor", "Innovation Portfolio Manager"]
  },
  {
    id: 2,
    section: "Leadership & Strategy",
    order_index: 2,
    question_text: "Who holds the ultimate decision-making authority and budget for AI investments?",
    tip_discussion: "Identify if this is the CEO, CTO, CIO, or a dedicated CAIO. Check if budget is centralized (one pool) or distributed across departments.",
    triggered_patterns: ["Governance Framework Setup", "Executive Dashboard"]
  },
  {
    id: 3,
    section: "Leadership & Strategy",
    order_index: 3,
    question_text: "How does the organization currently measure the success of technology or digital transformation initiatives?",
    tip_discussion: "Probe for specific KPIs: ROI, time-to-market, efficiency gains, cost savings, or user adoption rates. Are these tracked systematically?",
    triggered_patterns: ["Transformation KPI Tracker", "Value Realization Office"]
  },
  {
    id: 4,
    section: "Leadership & Strategy",
    order_index: 4,
    question_text: "Has the organization undergone any major digital transformations in the last 3 years, and if so, what were the outcomes?",
    tip_discussion: "Understand their change appetite. Did they succeed? Fail? What were the cultural impacts? This reveals their readiness for AI-led change.",
    triggered_patterns: ["Change Management Predictor", "Legacy Migration Planner"]
  },
  {
    id: 5,
    section: "Leadership & Strategy",
    order_index: 5,
    question_text: "Is there a formal AI ethics, governance, or responsible AI policy currently in place?",
    tip_discussion: "Ask about responsible AI, bias testing, transparency requirements, and who oversees ethical AI usage.",
    triggered_patterns: ["AI Governance Framework", "Bias Detection Suite"]
  },

  // SECTION 2: IT / Technology (6-10)
  {
    id: 6,
    section: "IT / Technology",
    order_index: 6,
    question_text: "What is the current state of your cloud infrastructure (On-prem, Hybrid, Cloud-native)?",
    tip_discussion: "Assess maturity: Are they lifting-and-shifting legacy apps, or building cloud-native microservices? Do they use containers (Docker/K8s)?",
    triggered_patterns: ["Cloud Optimization Agent", "Application Modernization Planner"]
  },
  {
    id: 7,
    section: "IT / Technology",
    order_index: 7,
    question_text: "How mature is your API ecosystem and system integration capability?",
    tip_discussion: "Do they have an API gateway? Are systems tightly coupled (point-to-point) or loosely coupled (event-driven)?",
    triggered_patterns: ["API Discovery & Governance", "Integration Accelerator"]
  },
  {
    id: 8,
    section: "IT / Technology",
    order_index: 8,
    question_text: "What does your current software development lifecycle (SDLC) and DevOps velocity look like?",
    tip_discussion: "Probe for deployment frequency, lead time for changes, mean time to recovery (MTTR). Do they practice CI/CD?",
    triggered_patterns: ["DevOps Assistant", "CI/CD Pipeline Optimizer"]
  },
  {
    id: 9,
    section: "IT / Technology",
    order_index: 9,
    question_text: "What are the top 3 legacy systems or technical debts that are currently constraining your business?",
    tip_discussion: "Identify mainframe, outdated ERPs, or custom monolithic code that hinders AI adoption and integration.",
    triggered_patterns: ["Legacy Modernization Copilot", "Technical Debt Analyzer"]
  },
  {
    id: 10,
    section: "IT / Technology",
    order_index: 10,
    question_text: "How do you currently manage vendor lock-in risk for your core technology platforms?",
    tip_discussion: "Are there open-source alternatives? Are their contracts flexible? Do they have a multi-cloud or hybrid strategy?",
    triggered_patterns: ["Vendor Risk Intelligence", "Multi-Cloud Strategy Planner"]
  },

  // SECTION 3: Data & Analytics (11-15)
  {
    id: 11,
    section: "Data & Analytics",
    order_index: 11,
    question_text: "How do you currently handle data quality monitoring? Who is responsible, and what tools are used?",
    tip_discussion: "Probe: Is it proactive (automated) or reactive (manual checks)? Do they have data stewards? Are there data quality SLAs?",
    triggered_patterns: ["Data Quality Monitor", "Data Profiling Agent"]
  },
  {
    id: 12,
    section: "Data & Analytics",
    order_index: 12,
    question_text: "Is there a centralized data warehouse/lake, or are systems siloed?",
    tip_discussion: "Determine the existence of a Single Source of Truth (SSOT). Are data pipelines ETL/ELT? Do they use tools like Snowflake, BigQuery, or Databricks?",
    triggered_patterns: ["Data Fabric Architect", "Data Lakehouse Builder"]
  },
  {
    id: 13,
    section: "Data & Analytics",
    order_index: 13,
    question_text: "How mature is your Master Data Management (MDM) for critical entities (e.g., Customer, Product, Supplier)?",
    tip_discussion: "Are customer IDs consistent across Sales, Support, and Billing? Is there a golden record?",
    triggered_patterns: ["MDM Harmonization Tool", "Entity Resolution AI"]
  },
  {
    id: 14,
    section: "Data & Analytics",
    order_index: 14,
    question_text: "What is your current BI and reporting cadence? Is it real-time, daily, or weekly?",
    tip_discussion: "Identify if decisions are made on stale data. Do they have self-service BI tools (PowerBI, Tableau) or rely on IT for every report?",
    triggered_patterns: ["Real-time Analytics Pipeline", "Automated Reporting Assistant"]
  },
  {
    id: 15,
    section: "Data & Analytics",
    order_index: 15,
    question_text: "Do you have a dedicated data science or advanced analytics team, and what is their primary focus?",
    tip_discussion: "Probe for skill levels: Descriptive analytics (what happened), Predictive (what will happen), or Prescriptive (what should we do).",
    triggered_patterns: ["Talent Augmentation Planner", "AI/ML Platform Setup"]
  },

  // SECTION 4: Security & Compliance (16-20)
  {
    id: 16,
    section: "Security & Compliance",
    order_index: 16,
    question_text: "How mature is your cybersecurity posture, and do you have a formal incident response plan?",
    tip_discussion: "Assess if they have a Security Operations Center (SOC) or rely on outsourcing. Do they conduct regular penetration testing?",
    triggered_patterns: ["AI Threat Intelligence", "Automated Incident Response"]
  },
  {
    id: 17,
    section: "Security & Compliance",
    order_index: 17,
    question_text: "Which regulatory frameworks apply to you (GDPR, HIPAA, SOC2, PCI-DSS, ISO 27001), and how are they managed?",
    tip_discussion: "Are they manually audited (spreadsheets) or are controls automated with continuous compliance monitoring?",
    triggered_patterns: ["Compliance Automation Agent", "Regulatory Change Tracker"]
  },
  {
    id: 18,
    section: "Security & Compliance",
    order_index: 18,
    question_text: "How do you handle Data Privacy (PII) and sensitive data discovery?",
    tip_discussion: "Is data classified at rest? Are there automated data masking or anonymization tools in place?",
    triggered_patterns: ["PII Discovery & Masking", "Data Privacy Copilot"]
  },
  {
    id: 19,
    section: "Security & Compliance",
    order_index: 19,
    question_text: "What is the current process for third-party vendor security assessments?",
    tip_discussion: "Is it a manual checklist sent once a year, or is there continuous monitoring with security scores?",
    triggered_patterns: ["Vendor Risk Intelligence", "Automated Security Scoring"]
  },
  {
    id: 20,
    section: "Security & Compliance",
    order_index: 20,
    question_text: "How quickly can you identify and patch newly discovered vulnerabilities in your environment?",
    tip_discussion: "Measure their Mean Time to Remediate (MTTR). Do they have automated patch management?",
    triggered_patterns: ["Vulnerability Prioritizer", "Patch Automation Bot"]
  },

  // SECTION 5: Customer Service (21-24)
  {
    id: 21,
    section: "Customer Service",
    order_index: 21,
    question_text: "What is your current monthly ticket volume across all support channels?",
    tip_discussion: "Is volume growing year-over-year? What is the peak season like? This helps size AI automation opportunities.",
    triggered_patterns: ["AI Chatbot", "Agent Assist Tool"]
  },
  {
    id: 22,
    section: "Customer Service",
    order_index: 22,
    question_text: "What channels do you support, and are they unified (Email, Chat, Social, Phone)?",
    tip_discussion: "Siloed channels often lead to poor experiences. Check if they have an omnichannel platform.",
    triggered_patterns: ["Omnichannel Routing AI", "Unified Agent Desktop"]
  },
  {
    id: 23,
    section: "Customer Service",
    order_index: 23,
    question_text: "Do you have a self-service knowledge base, and how is it maintained?",
    tip_discussion: "Is it static PDFs or a dynamic, searchable wiki? Is it integrated with their ticketing system?",
    triggered_patterns: ["Knowledge Assistant", "Self-Service Optimizer"]
  },
  {
    id: 24,
    section: "Customer Service",
    order_index: 24,
    question_text: "How do you currently measure CSAT/NPS, and what is the average response and resolution time?",
    tip_discussion: "Identify automation opportunities in post-call surveys and sentiment analysis.",
    triggered_patterns: ["Sentiment Analysis Engine", "Predictive CSAT Analyzer"]
  },

  // SECTION 6: Sales (25-28)
  {
    id: 25,
    section: "Sales",
    order_index: 25,
    question_text: "How mature is your CRM system, and how accurate is your sales forecasting?",
    tip_discussion: "Compare forecast vs. actuals over the last 4 quarters. Is forecasting done by AI/ML or purely sales rep intuition?",
    triggered_patterns: ["Forecasting Intelligence", "Deal Risk Predictor"]
  },
  {
    id: 26,
    section: "Sales",
    order_index: 26,
    question_text: "How are proposals, quotes, and contracts currently generated?",
    tip_discussion: "Is it manual (copy-paste from Word) or automated via a CPQ (Configure, Price, Quote) system?",
    triggered_patterns: ["Proposal Generator", "CPQ (Configure Price Quote) AI"]
  },
  {
    id: 27,
    section: "Sales",
    order_index: 27,
    question_text: "How do you prioritize leads and account scoring?",
    tip_discussion: "Are they using BANT, CHAMP, or purely manual intuition? Is there a lead scoring model?",
    triggered_patterns: ["Lead Scoring AI", "Next-Best-Action Recommender"]
  },
  {
    id: 28,
    section: "Sales",
    order_index: 28,
    question_text: "Where are the biggest friction points in your sales cycle?",
    tip_discussion: "Look for bottlenecks: legal review, compliance, pricing approvals, or lengthy procurement processes.",
    triggered_patterns: ["Sales Cycle Optimizer", "Deal Acceleration AI"]
  },

  // SECTION 7: Marketing (29-32)
  {
    id: 29,
    section: "Marketing",
    order_index: 29,
    question_text: "How do you currently personalize digital content for different customer segments?",
    tip_discussion: "Is it dynamic in real-time (based on behavior) or static generic messaging sent to everyone?",
    triggered_patterns: ["Content Personalization AI", "Segmentation Engine"]
  },
  {
    id: 30,
    section: "Marketing",
    order_index: 30,
    question_text: "What automation tools do you use for ad buying (PPC/Programmatic) and SEO?",
    tip_discussion: "Are campaigns optimized manually daily or algorithmically via AI bidding?",
    triggered_patterns: ["Ad Optimizer", "SEO Content Generator"]
  },
  {
    id: 31,
    section: "Marketing",
    order_index: 31,
    question_text: "How is marketing attribution (touchpoint tracking) currently handled?",
    tip_discussion: "Challenges with multi-channel attribution are common. Are they using last-click, multi-touch, or algorithmic attribution?",
    triggered_patterns: ["Multi-Touch Attribution AI", "Customer Journey Mapping"]
  },
  {
    id: 32,
    section: "Marketing",
    order_index: 32,
    question_text: "What is the process for creating and distributing new marketing collateral?",
    tip_discussion: "Is there a review bottleneck? Are they using DAM (Digital Asset Management) tools?",
    triggered_patterns: ["Creative Asset Generator", "Marketing Calendar AI"]
  },

  // SECTION 8: Operations & Supply Chain (33-36)
  {
    id: 33,
    section: "Operations & Supply Chain",
    order_index: 33,
    question_text: "How automated are your core operational processes (e.g., order-to-cash, procure-to-pay)?",
    tip_discussion: "Identify manual handoffs between departments. Count the number of times a human touches a process.",
    triggered_patterns: ["Process Mining AI", "Robotic Process Automation (RPA) Spotter"]
  },
  {
    id: 34,
    section: "Operations & Supply Chain",
    order_index: 34,
    question_text: "How do you currently manage inventory, warehousing, or logistics visibility?",
    tip_discussion: "For manufacturing: IoT sensors on machines. For retail: SKU-level tracking. For logistics: fleet tracking GPS.",
    triggered_patterns: ["Inventory Optimizer", "Predictive Maintenance (Mfg)"]
  },
  {
    id: 35,
    section: "Operations & Supply Chain",
    order_index: 35,
    question_text: "How do you collaborate with suppliers and manage disruptions?",
    tip_discussion: "Probe for visibility into tier-2/tier-3 suppliers. Are they using supplier portals or email/Excel?",
    triggered_patterns: ["Supply Chain Risk Radar", "Supplier Collaboration Portal"]
  },
  {
    id: 36,
    section: "Operations & Supply Chain",
    order_index: 36,
    question_text: "What is your biggest operational bottleneck causing delays or cost overruns?",
    tip_discussion: "Note: Is it labor shortages, machine downtime, shipping delays, or quality issues?",
    triggered_patterns: ["Bottleneck Analysis AI", "Operational Efficiency Copilot"]
  },

  // SECTION 9: Finance (37-40)
  {
    id: 37,
    section: "Finance",
    order_index: 37,
    question_text: "How are invoices received, processed, and approved in your accounts payable team?",
    tip_discussion: "Count the number of manual touches. Are they using OCR for invoice extraction? What is the approval workflow?",
    triggered_patterns: ["Invoice Intelligence", "Automated AP Processing"]
  },
  {
    id: 38,
    section: "Finance",
    order_index: 38,
    question_text: "How long does your monthly/quarterly financial close and reconciliation process take?",
    tip_discussion: "Speed of close indicates data integration maturity. Are they using spreadsheets for consolidation?",
    triggered_patterns: ["Financial Close Automation", "Reconciliation AI"]
  },
  {
    id: 39,
    section: "Finance",
    order_index: 39,
    question_text: "How do you handle Financial Planning & Analysis (FP&A) and forecasting?",
    tip_discussion: "Are spreadsheets still heavily used? Is there a dedicated FP&A tool?",
    triggered_patterns: ["FP&A Copilot", "Predictive Budgeting AI"]
  },
  {
    id: 40,
    section: "Finance",
    order_index: 40,
    question_text: "What is your current approach to fraud detection and transaction monitoring?",
    tip_discussion: "Is it rule-based (static), or is there ML detection for anomalies?",
    triggered_patterns: ["Fraud Detection AI", "Anomaly Monitoring System"]
  },

  // SECTION 10: HR / Talent (41-44)
  {
    id: 41,
    section: "HR",
    order_index: 41,
    question_text: "How is recruitment sourcing, screening, and onboarding currently managed?",
    tip_discussion: "Assess volume of resumes processed manually. Is there an ATS (Applicant Tracking System)?",
    triggered_patterns: ["Resume Screening AI", "Recruiter Copilot"]
  },
  {
    id: 42,
    section: "HR",
    order_index: 42,
    question_text: "How are Learning & Development (L&D) courses and training delivered and tracked?",
    tip_discussion: "Are they personalized? Is completion tracked? Do they have an LMS (Learning Management System)?",
    triggered_patterns: ["L&D Recommender", "Skills Gap Analyzer"]
  },
  {
    id: 43,
    section: "HR",
    order_index: 43,
    question_text: "What tools support employee engagement and attrition tracking?",
    tip_discussion: "Can they predict high-risk departures? Do they conduct pulse surveys?",
    triggered_patterns: ["Attrition Predictor", "Engagement Sentiment Analyzer"]
  },
  {
    id: 44,
    section: "HR",
    order_index: 44,
    question_text: "How are performance reviews and goal-setting (OKRs) managed across teams?",
    tip_discussion: "Is it an annual pain point or continuous feedback? Is there a tool?",
    triggered_patterns: ["Performance Insight AI", "Goal Alignment Tracker"]
  },

  // SECTION 11: Procurement (45-47)
  {
    id: 45,
    section: "Procurement",
    order_index: 45,
    question_text: "How do you identify, evaluate, and onboard new suppliers?",
    tip_discussion: "Is it manual or digital? Do they use a supplier discovery platform?",
    triggered_patterns: ["Sourcing Automation", "Supplier Discovery AI"]
  },
  {
    id: 46,
    section: "Procurement",
    order_index: 46,
    question_text: "How are procurement contracts managed throughout their lifecycle?",
    tip_discussion: "Are they in a CLM (Contract Lifecycle Management) system or scattered drives and emails?",
    triggered_patterns: ["Contract Lifecycle Management (CLM) AI", "Obligation Tracker"]
  },
  {
    id: 47,
    section: "Procurement",
    order_index: 47,
    question_text: "How do you track and benchmark supplier performance against SLAs?",
    tip_discussion: "Quantitative (scorecards, dashboards) or anecdotal? Is data shared back with suppliers?",
    triggered_patterns: ["Supplier Scorecard AI", "Performance Analytics"]
  },

  // SECTION 12: Legal (48-50)
  {
    id: 48,
    section: "Legal",
    order_index: 48,
    question_text: "What is the volume of contracts, NDAs, and legal documents reviewed weekly?",
    tip_discussion: "High volume suggests AI contract review. What is the current average turnaround time?",
    triggered_patterns: ["Contract Review AI", "NDA Analyzer"]
  },
  {
    id: 49,
    section: "Legal",
    order_index: 49,
    question_text: "How does the legal team stay on top of changes in relevant regulations?",
    tip_discussion: "Manual monitoring (trade journals, regulators) or automated alerts (regulatory intelligence platforms)?",
    triggered_patterns: ["Regulatory Monitoring AI", "Regulatory Change Impact Analysis"]
  },
  {
    id: 50,
    section: "Legal",
    order_index: 50,
    question_text: "How are legal holds, e-discovery, and litigation support currently handled?",
    tip_discussion: "Probe for data retrieval times. Is there a dedicated e-discovery tool?",
    triggered_patterns: ["E-Discovery Assistant", "Legal Hold Automation"]
  },

  // SECTION 13: Knowledge Management (51-53)
  {
    id: 51,
    section: "Knowledge Management",
    order_index: 51,
    question_text: "How do employees currently search for internal documents and expertise?",
    tip_discussion: "Is there a company wiki or intranet, and is it effective? Or do they rely on asking colleagues?",
    triggered_patterns: ["Enterprise Search AI", "Internal Wiki GPT"]
  },
  {
    id: 52,
    section: "Knowledge Management",
    order_index: 52,
    question_text: "How are standard operating procedures (SOPs) and best practices captured and updated?",
    tip_discussion: "Are they living documents (version-controlled, searchable) or dusty PDFs in a shared drive?",
    triggered_patterns: ["SOP Generator", "Knowledge Base Health Monitor"]
  },
  {
    id: 53,
    section: "Knowledge Management",
    order_index: 53,
    question_text: "What happens when a new employee needs to find technical knowledge to solve a problem?",
    tip_discussion: "Do they ask a colleague (tribal knowledge) or search a system? This reveals knowledge silos.",
    triggered_patterns: ["Expertise Location AI", "Contextual Knowledge Assistant"]
  },

  // SECTION 14: Project Management / PMO (54-56)
  {
    id: 54,
    section: "Project Management",
    order_index: 54,
    question_text: "How does the PMO track resource allocation and capacity planning across projects?",
    tip_discussion: "Is it spreadsheets or enterprise PPM (Project Portfolio Management) tools like Jira, Asana, or MS Project?",
    triggered_patterns: ["Resource Optimizer", "Capacity Planning AI"]
  },
  {
    id: 55,
    section: "Project Management",
    order_index: 55,
    question_text: "What is the current project delivery predictability (e.g., on-time/on-budget rate)?",
    tip_discussion: "Track the variance percentage. Do you have a standard delivery methodology?",
    triggered_patterns: ["Delivery Risk Predictor", "Project Health Dashboard"]
  },
  {
    id: 56,
    section: "Project Management",
    order_index: 56,
    question_text: "How are project status reports, meeting minutes, and action items generated?",
    tip_discussion: "Is the PM writing them manually from multiple emails and Slack threads, or is there a tool?",
    triggered_patterns: ["Status Report Generator", "Meeting Intelligence Assistant"]
  },

  // BONUS: Culture & Change (57-62)
  {
    id: 57,
    section: "Culture & Change",
    order_index: 57,
    question_text: "How would you describe the overall data-driven culture of your organization?",
    tip_discussion: "Do leaders make decisions based on data/evidence or primarily on intuition? Is data literacy widespread?",
    triggered_patterns: ["Culture Change Navigator", "Digital Fluency Assessment"]
  },
  {
    id: 58,
    section: "Culture & Change",
    order_index: 58,
    question_text: "What is the level of AI literacy among your leadership and middle management?",
    tip_discussion: "Have they had AI training or workshops? Do they understand basic AI concepts?",
    triggered_patterns: ["AI Literacy Bootcamp", "Leadership AI Workshop Planner"]
  },
  {
    id: 59,
    section: "Culture & Change",
    order_index: 59,
    question_text: "How does the organization handle failure and risk-taking regarding new technologies?",
    tip_discussion: "Is it a 'fail fast, learn fast' culture, or is it highly risk-averse?",
    triggered_patterns: ["Innovation Sandbox Planner", "Risk-Tolerance Assessment"]
  },
  {
    id: 60,
    section: "Culture & Change",
    order_index: 60,
    question_text: "What are the primary barriers to change you foresee in adopting AI?",
    tip_discussion: "Top answers: Fear of job loss, lack of trust in AI, unclear business value, or lack of technical skills.",
    triggered_patterns: ["Change Impact Analysis", "Stakeholder Communication Generator"]
  },
  {
    id: 61,
    section: "Culture & Change",
    order_index: 61,
    question_text: "How siloed are the departments currently?",
    tip_discussion: "Probe about cross-functional collaboration. Do teams share data and insights freely?",
    triggered_patterns: ["Silo Breaker Strategy", "Cross-Functional AI Council Planner"]
  },
  {
    id: 62,
    section: "Culture & Change",
    order_index: 62,
    question_text: "Is there a clear internal communications channel for upcoming tech changes?",
    tip_discussion: "Crucial for managing digital transformation. Do they have an internal comms plan for major tech rollouts?",
    triggered_patterns: ["Internal Comms AI", "Digital Change Agent"]
  }
]
