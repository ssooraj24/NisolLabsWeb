// lib/ai/prompts.ts

// ============================================
// TYPE DEFINITIONS (Matches expected LLM response)
// ============================================

export interface UseCase {
  id: string;                    // e.g., "uc-01"
  name: string;                  // e.g., "AI-Powered Customer Support Assistant"
  department: string;            // e.g., "Customer Service"
  description: string;           // Detailed description of the use case
  business_value: 'High' | 'Medium' | 'Low';
  feasibility: 'High' | 'Medium' | 'Low';
  estimated_roi_percentage: number;
  implementation_months: number;
  suggested_tech_stack: string[];
  estimated_savings_annual_usd: number;
}

export interface UseCaseResponse {
  use_cases: UseCase[];
}

export interface CapabilityScore {
  name: string;
  score: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export interface CapabilityResponse {
  capabilities: CapabilityScore[];
}

export interface RoadmapInitiative {
  title: string;
  description: string;
  dependencies: string[];
  success_metrics: string;
}

export interface RoadmapPhase {
  phase: string;               // e.g., "30 Days", "90 Days", etc.
  title: string;               // e.g., "Foundation & Governance"
  initiatives: RoadmapInitiative[];
}

export interface RoadmapResponse {
  phases: RoadmapPhase[];
}

// ============================================
// PROMPTS
// ============================================

export const PROMPTS = {
  // Prompt 1: Executive Summary (Markdown format)
  buildExecutiveSummaryPrompt(companyName: string, industry: string, rawResponses: any, capabilityScores?: any) {
    return `
You are a senior AI strategy consultant at Nisol AI.
Generate a comprehensive Executive Summary for ${companyName}, an enterprise in the ${industry} industry.

Input Data:
- Raw Assessment Responses (62 Questions):
${JSON.stringify(rawResponses, null, 2)}

${capabilityScores ? `- Capability Scores Baseline:\n${JSON.stringify(capabilityScores, null, 2)}` : ""}

Structure your response with clear markdown headings:
1. **Executive Overview**: Company context and AI transformation posture.
2. **Core Strengths**: 2-3 key capability areas where the organization demonstrates solid foundation.
3. **Critical Vulnerabilities & Gaps**: 2-3 urgent areas requiring strategic intervention.
4. **Strategic Recommendations**: Top 3 priority actions for executive leadership.
5. **Expected Transformation Value**: High-level financial impact and operational summary.

Tone: Executive, authoritative, highly actionable, and tailored specifically to the ${industry} domain.
`.trim();
  },

  // Prompt 2: AI Readiness Assessment (JSON format)
  buildAIReadinessPrompt(companyName: string, industry: string, rawResponses: any, capabilityScores?: any) {
    return `
You are an enterprise AI assessment architect at Nisol AI.
Based on the discovery workshop responses for ${companyName} (${industry}), evaluate overall organizational readiness.

Input Data:
- Raw Responses: ${JSON.stringify(rawResponses, null, 2)}
${capabilityScores ? `- Capability Breakdown: ${JSON.stringify(capabilityScores, null, 2)}` : ""}

Return a strictly valid JSON object matching the following structure. 
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "overall_score": 68,
  "readiness_level": "Mature Baseline",
  "industry_benchmark_score": 58,
  "summary_interpretation": "Your organization demonstrates a strong data infrastructure but requires formal AI governance...",
  "radar_data": {
    "Leadership & Strategy": 3.8,
    "IT / Technology": 4.2,
    "Data & Analytics": 4.0,
    "Security & Compliance": 3.5,
    "Customer Service": 3.2,
    "Sales": 3.0,
    "Marketing": 2.8,
    "Operations & Supply Chain": 3.5,
    "Finance": 3.7,
    "HR": 3.1,
    "Procurement": 3.0,
    "Legal": 2.5,
    "Knowledge Management": 3.4,
    "Project Management": 3.6,
    "Culture & Change": 3.2
  },
  "key_findings": [
    "High readiness in core cloud architecture",
    "Governance gap in legal & ethics framework"
  ]
}
`.trim();
  },

  // Prompt 3: Capability-wise Maturity Scores (JSON format)
  buildCapabilityScoresPrompt(companyName: string, industry: string, rawResponses: any) {
    return `
Analyze the 62 assessment answers for ${companyName} (${industry}) and calculate maturity scores for each capability section.

Input Data:
${JSON.stringify(rawResponses, null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "capabilities": [
    {
      "name": "Leadership & Strategy",
      "score": 3.8,
      "strengths": ["Executive endorsement", "Dedicated budget allocation"],
      "gaps": ["Lacks centralized AI steering committee"],
      "recommendations": ["Establish AI Governance Council within 30 days"]
    },
    {
      "name": "IT / Technology",
      "score": 4.2,
      "strengths": ["Strong cloud infrastructure", "DevOps maturity"],
      "gaps": ["Legacy API integration"],
      "recommendations": ["Modernize API gateway"]
    }
    // ... continue for all 15 capabilities
  ]
}

Ensure all 15 key capabilities are covered:
Leadership & Strategy, IT / Technology, Data & Analytics, Security & Compliance,
Customer Service, Sales, Marketing, Operations & Supply Chain, Finance, HR,
Procurement, Legal, Knowledge Management, Project Management, Culture & Change.

Use the actual data from the responses to inform scores. Be specific and evidence-based.
`.trim();
  },

  // Prompt 4: Top 20 AI Use Cases (JSON format)
  buildTopUseCasesPrompt(companyName: string, industry: string, rawResponses: any) {
    return `
Based on the operational friction points and data maturity of ${companyName} (${industry}), generate a prioritized list of 20 high-impact AI use cases.

Input Data:
${JSON.stringify(rawResponses, null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "use_cases": [
    {
      "id": "uc-01",
      "name": "AI-Powered Customer Support Assistant",
      "department": "Customer Service",
      "description": "Deploy RAG-augmented chatbot integrated with knowledge base to handle 60% of tier-1 support tickets.",
      "business_value": "High",
      "feasibility": "High",
      "estimated_roi_percentage": 140,
      "implementation_months": 3,
      "suggested_tech_stack": ["LLM (GPT-4/Claude/Gemini)", "Vector Database", "Next.js"],
      "estimated_savings_annual_usd": 120000
    },
    {
      "id": "uc-02",
      "name": "Predictive Maintenance for Manufacturing Equipment",
      "department": "Operations & Supply Chain",
      "description": "Deploy IoT sensor data analysis to predict equipment failures 48 hours in advance.",
      "business_value": "High",
      "feasibility": "Medium",
      "estimated_roi_percentage": 180,
      "implementation_months": 6,
      "suggested_tech_stack": ["IoT Gateway", "Time Series Database", "ML Models"],
      "estimated_savings_annual_usd": 250000
    }
    // ... continue for 20 use cases
  ]
}

Generate exactly 20 distinct, practical, domain-specific AI use cases.
Prioritize based on business impact and feasibility. Ensure diversity across departments.
`.trim();
  },

  // Prompt 5: Opportunity Matrix (JSON format)
  buildOpportunityMatrixPrompt(companyName: string, industry: string, topUseCases: any) {
    return `
Using the top 20 AI use cases for ${companyName} (${industry}), map each initiative onto a 2x2 Opportunity Matrix based on Impact vs Feasibility.

Input Use Cases:
${JSON.stringify(topUseCases, null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "quadrants": {
    "quick_wins": [
      {
        "id": "uc-01",
        "name": "AI-Powered Customer Support Assistant",
        "impact": "High",
        "feasibility": "High",
        "rationale": "Existing knowledge base and mature API infrastructure enable rapid deployment."
      }
    ],
    "strategic_bets": [
      {
        "id": "uc-02",
        "name": "Autonomous Supply Chain Forecasting",
        "impact": "High",
        "feasibility": "Low",
        "rationale": "Requires deep ERP integration and custom ML model training."
      }
    ],
    "incremental_improvements": [
      {
        "id": "uc-03",
        "name": "Automated Invoice Processing",
        "impact": "Low",
        "feasibility": "High",
        "rationale": "Standard OCR solution with minimal integration requirements."
      }
    ],
    "long_term_investments": [
      {
        "id": "uc-04",
        "name": "Enterprise AI Governance Platform",
        "impact": "Low",
        "feasibility": "Low",
        "rationale": "Requires organization-wide cultural and process changes."
      }
    ]
  }
}
`.trim();
  },

  // Prompt 6: Quick Wins vs Strategic Bets (JSON format)
  buildQuickWinsStrategicBetsPrompt(companyName: string, industry: string, topUseCases: any) {
    return `
Categorize the AI initiatives for ${companyName} (${industry}) into Quick Wins (< 3 months implementation, high feasibility) and Strategic Bets (12+ months, high impact transformation).

Input Use Cases:
${JSON.stringify(topUseCases, null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "quick_wins": [
    {
      "name": "Automated Document Classifier",
      "timeframe": "30-60 Days",
      "business_justification": "Low risk integration using pre-trained vision-LLMs with existing document repositories."
    },
    {
      "name": "Email Response Automation",
      "timeframe": "45-60 Days",
      "business_justification": "Simple RAG implementation using existing email templates and knowledge base."
    }
  ],
  "strategic_bets": [
    {
      "name": "Autonomous Supply Chain Forecasting Engine",
      "timeframe": "12-18 Months",
      "business_justification": "Requires deep ERP data integration, custom model training, and organizational change management."
    },
    {
      "name": "Enterprise AI Knowledge Graph",
      "timeframe": "18-24 Months",
      "business_justification": "Requires unification of all enterprise data sources and creation of a semantic layer."
    }
  ]
}
`.trim();
  },

  // Prompt 7: AI Transformation Roadmap (JSON format)
  buildRoadmapPrompt(companyName: string, industry: string, topUseCases: any, capabilityScores?: any) {
    return `
Generate a structured, phased AI Transformation Roadmap for ${companyName} (${industry}).

Phases:
- 30 Days (Foundation & Governance Setup)
- 90 Days (Pilot Implementation & Quick Wins)
- 180 Days (Scale & System Integration)
- 365 Days (Enterprise Automation & Continuous Optimization)

Input Data:
${JSON.stringify({ topUseCases, capabilityScores }, null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "phases": [
    {
      "phase": "30 Days",
      "title": "Foundation & Governance",
      "initiatives": [
        {
          "title": "AI Steering Council Formation",
          "description": "Define governance framework and data privacy guardrails.",
          "dependencies": ["Executive alignment", "Budget approval"],
          "success_metrics": "Governance charter approved and signed"
        },
        {
          "title": "Data Readiness Assessment",
          "description": "Inventory all data sources and assess quality for AI readiness.",
          "dependencies": ["IT team availability"],
          "success_metrics": "Complete data inventory with quality scores"
        }
      ]
    },
    {
      "phase": "90 Days",
      "title": "Pilot Implementation & Quick Wins",
      "initiatives": [
        {
          "title": "Customer Support Chatbot Pilot",
          "description": "Deploy RAG-enabled chatbot for 3 priority departments.",
          "dependencies": ["Knowledge base ingestion", "API integration"],
          "success_metrics": "40% ticket containment in pilot departments"
        }
      ]
    },
    {
      "phase": "180 Days",
      "title": "Scale & System Integration",
      "initiatives": [
        {
          "title": "Enterprise-wide Chatbot Rollout",
          "description": "Scale chatbot to all departments with multi-language support.",
          "dependencies": ["Pilot success metrics met", "Infrastructure scaling"],
          "success_metrics": "60% enterprise ticket containment"
        }
      ]
    },
    {
      "phase": "365 Days",
      "title": "Enterprise Automation & Continuous Optimization",
      "initiatives": [
        {
          "title": "AI Center of Excellence Establishment",
          "description": "Formalized AI governance, best practices, and continuous improvement program.",
          "dependencies": ["All pilots completed", "ROI validated"],
          "success_metrics": "CoE operational with quarterly review cadence"
        }
      ]
    }
  ]
}
`.trim();
  },

  // Prompt 8: ROI Analysis (JSON format)
  buildROIEstimatesPrompt(companyName: string, industry: string, topUseCases: any) {
    return `
Calculate detailed ROI projections and financial analysis for ${companyName}'s AI transformation program.

Input Use Cases:
${JSON.stringify(topUseCases, null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "summary": {
    "total_estimated_investment_usd": 250000,
    "annual_cost_savings_usd": 480000,
    "annual_revenue_uplift_usd": 200000,
    "payback_period_months": 5.5,
    "five_year_net_benefit_usd": 2800000,
    "overall_roi_percentage": 290
  },
  "department_breakdown": [
    {
      "department": "Customer Service",
      "investment_usd": 50000,
      "annual_savings_usd": 140000,
      "key_drivers": ["40% ticket resolution automation", "Reduction in agent headcount required"]
    },
    {
      "department": "Operations & Supply Chain",
      "investment_usd": 100000,
      "annual_savings_usd": 250000,
      "key_drivers": ["Predictive maintenance reducing downtime by 30%"]
    }
  ],
  "financial_timeline_years": [
    { "year": 1, "costs": 250000, "benefits": 320000, "net": 70000 },
    { "year": 2, "costs": 50000, "benefits": 680000, "net": 630000 },
    { "year": 3, "costs": 50000, "benefits": 980000, "net": 930000 },
    { "year": 4, "costs": 50000, "benefits": 1250000, "net": 1200000 },
    { "year": 5, "costs": 50000, "benefits": 1500000, "net": 1450000 }
  ]
}
`.trim();
  },

  // Prompt 9: Solution Blueprints (JSON format)
  buildSolutionBlueprintsPrompt(companyName: string, industry: string, topUseCases: any) {
    const useCasesArray = Array.isArray(topUseCases)
      ? topUseCases
      : Array.isArray(topUseCases?.use_cases)
      ? topUseCases.use_cases
      : Array.isArray(topUseCases?.top_use_cases)
      ? topUseCases.top_use_cases
      : [];

    return `
For the top 5 priority AI use cases of ${companyName} (${industry}), produce comprehensive technical Solution Blueprints.

Input Priority Use Cases (Top 5):
${JSON.stringify(useCasesArray.slice(0, 5), null, 2)}

Return a strictly valid JSON object matching the following structure.
**DO NOT** wrap in markdown code blocks. Return ONLY the raw JSON.

{
  "blueprints": [
    {
      "use_case_name": "AI-Powered Customer Support Chatbot",
      "category": "Customer Service",
      "business_problem": "High ticket volume (5,000+/month) resulting in 48h average resolution delays.",
      "proposed_solution": "RAG-enabled LLM assistant with real-time vector search across knowledge base.",
      "technology_stack": [
        "LLM (GPT-4/Claude/Gemini)",
        "Vector Database (Supabase pgvector)",
        "Framework (Next.js)",
        "Integration (API Gateway)",
        "Monitoring (LangSmith)"
      ],
      "architecture_summary": "User request -> API Gateway -> Embedding generation (OpenAI text-embedding-3) -> Vector similarity search (Supabase pgvector) -> Context retrieval -> LLM synthesis -> Response streaming -> Usage tracking (LangSmith)",
      "implementation_phases": [
        "Phase 1: Knowledge Ingestion & Embedding (2 weeks)",
        "Phase 2: RAG Pipeline Setup & Testing (2 weeks)",
        "Phase 3: Integration with Existing Systems (2 weeks)",
        "Phase 4: UAT, Guardrail Verification & Deployment (1 week)"
      ],
      "risks": [
        "Hallucination: Implement guardrail prompts and human-in-the-loop for critical tickets",
        "Data Privacy: Ensure PII redaction before embedding generation"
      ],
      "success_metrics": [
        "60% ticket containment rate",
        "< 5s average response time",
        "85% user satisfaction rate"
      ]
    },
    {
      "use_case_name": "Predictive Maintenance for Manufacturing Equipment",
      "category": "Operations & Supply Chain",
      "business_problem": "Unplanned equipment downtime costing ₹2 Cr annually.",
      "proposed_solution": "IoT sensor data + ML models to predict failures 48 hours in advance.",
      "technology_stack": [
        "IoT Gateway (Azure IoT / AWS IoT)",
        "Time Series Database (InfluxDB)",
        "ML Models (XGBoost / Prophet)",
        "Dashboard (Power BI / Grafana)",
        "Alerting (PagerDuty)"
      ],
      "architecture_summary": "IoT sensors -> Edge processing -> Time series DB -> ML inference -> Alert system -> Dashboard visualization",
      "implementation_phases": [
        "Phase 1: Sensor installation & data collection (4 weeks)",
        "Phase 2: Model training & validation (4 weeks)",
        "Phase 3: Integration with maintenance workflows (2 weeks)",
        "Phase 4: Deployment & continuous improvement (2 weeks)"
      ],
      "risks": [
        "Sensor failure: Implement redundant sensors",
        "Data quality: Ensure consistent data collection standards"
      ],
      "success_metrics": [
        "80% failure prediction accuracy",
        "40% reduction in unplanned downtime",
        "₹1.5 Cr annual savings"
      ]
    }
  ]
}

Generate exactly 5 complete blueprint objects. Keep technology recommendations generic—consultant will customize based on client's existing stack.
`.trim();
  },

  // Prompt 10: Proposal Draft (Markdown format)
  buildProposalDraftPrompt(companyName: string, industry: string, rawResponses: any, roadmap?: any, roi?: any) {
    return `
Generate a formal commercial consulting proposal draft from Nisol AI to ${companyName} (${industry}).

Input Context:
- Raw Responses: ${JSON.stringify(rawResponses, null, 2)}
${roadmap ? `- Roadmap: ${JSON.stringify(roadmap, null, 2)}` : ""}
${roi ? `- ROI Projections: ${JSON.stringify(roi, null, 2)}` : ""}

Structure in clean, professional markdown format:

1. **Executive Summary & Value Proposition**
   - Brief overview of the engagement
   - Key value drivers for ${companyName}
   - Expected business impact

2. **Assessment Findings & Strategic Vision**
   - Current AI maturity assessment
   - Key strengths and opportunities
   - Strategic vision for ${industry}

3. **Scope of Engagement & Phased Roadmap**
   - Phase 1: Discovery Validation (30 Days)
   - Phase 2: Quick Wins Implementation (90 Days)
   - Phase 3: Strategic Transformation (180-365 Days)

4. **Commercial Investment & Value Realization Framework**
   - Investment structure (placeholder for consultant to customize)
   - ROI projections and payback period
   - Value realization timeline

5. **Nisol AI Capabilities & Methodology**
   - Our approach to AI transformation
   - Technology partnerships and ecosystem
   - Success stories and case studies

6. **Next Steps & Timeline for Execution**
   - Immediate actions to begin engagement
   - Governance and communication structure

Tone: Professional, compelling, client-ready consulting proposal.
`.trim();
  },
};

// ============================================
// SYSTEM PROMPTS (Improves AI response quality)
// ============================================

export const SYSTEM_PROMPTS = {
  executive_summary: `You are a senior AI strategy consultant at Nisol AI. Generate executive-level, actionable, and authoritative consulting summaries. Focus on specific insights derived from the data provided. Avoid generic filler language. Use clear markdown formatting with headings and bullet points.`,
  
  readiness_assessment: `You are an enterprise AI assessment architect at Nisol AI. Provide rigorous, data-driven readiness evaluations with clear benchmarks and actionable insights. Return ONLY valid JSON, without markdown wrappers.`,
  
  capability_scores: `You are an AI maturity assessment expert. Calculate structured capability scores based on the provided data. Ensure consistency and provide specific evidence for each score. Return ONLY valid JSON, without markdown wrappers.`,
  
  use_cases: `You are an enterprise AI use case expert. Generate specific, practical, and high-impact AI initiatives. Base recommendations on the client's actual pain points and data maturity. Return ONLY valid JSON, without markdown wrappers.`,
  
  opportunity_matrix: `You are a strategy expert. Map AI initiatives onto a 2x2 matrix based on business impact and implementation feasibility. Provide clear justifications for each placement. Return ONLY valid JSON, without markdown wrappers.`,
  
  quick_wins: `You are a transformation strategy expert. Categorize initiatives into Quick Wins and Strategic Bets based on implementation timeline and business impact. Return ONLY valid JSON, without markdown wrappers.`,
  
  roadmap: `You are a transformation roadmap expert. Create detailed, phased implementation plans with clear milestones, dependencies, and success metrics. Return ONLY valid JSON, without markdown wrappers.`,
  
  roi: `You are a financial analysis expert. Provide conservative, data-driven ROI calculations with clear assumptions and breakdowns by department. Return ONLY valid JSON, without markdown wrappers.`,
  
  solution_blueprints: `You are a solution architect. Generate detailed, practical, and implementable technical blueprints. Use generic technology recommendations that can be adapted to the client's existing stack. Return ONLY valid JSON, without markdown wrappers.`,
  
  proposal: `You are a commercial proposal expert. Generate professional, compelling, and client-ready consulting proposals. Use persuasive language while remaining factual and specific.`,
};