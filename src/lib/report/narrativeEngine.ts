// src/lib/report/narrativeEngine.ts

import { BusinessContextJSON, ROISummaryData } from "./types";
import { aiClient } from "@/lib/ai/client";

export async function generateExecutiveSummaryNarrative(
  context: BusinessContextJSON,
  roi: ROISummaryData
): Promise<string> {
  const prompt = `You are a Senior Partner at a tier-1 AI consulting firm (Nisol AI). Write an authoritative, executive-ready Executive Summary for ${context.companyName} (${context.industry}).

CONTEXT METRICS:
- Overall AI Readiness: ${context.readinessPercentage}% (Score: ${context.overallMaturityScore}/5)
- Key Focus Areas: ${context.lowScoringSections.join(", ")}
- Top Pain Points: ${context.topPainPoints.join("; ")}
- Potential Annual Savings: ${roi.totalEstimatedAnnualSavings}
- Projected ROI: +${roi.overallRoiPercentage}%
- Expected Payback Horizon: ${roi.averagePaybackMonths} Months

STRUCTURE:
1. **Strategic Context & Diagnosis**: Summarize ${context.companyName}'s current state, maturity benchmark, and primary operational bottlenecks in crisp business language.
2. **Key Opportunities & ROI Impact**: Highlight why immediate investment in low-friction AI initiatives will yield ${roi.totalEstimatedAnnualSavings} in savings.
3. **Strategic Recommendations & Next Steps**: Recommend immediate 90-day action plan focusing on Quick Wins and establishing governance.

Style: Direct, professional, authoritative, no jargon. Avoid fluff.`;

  try {
    const res = await aiClient.generateWithFallback("executive_summary", prompt);
    if (res.text && res.text.trim().length > 100) {
      return res.text.trim();
    }
  } catch (err) {
    console.warn("[NarrativeEngine] Executive summary AI generation failed, using structured fallback:", err);
  }

  return `### Strategic Context & Assessment Diagnosis

${context.companyName} demonstrates an overall AI Readiness score of **${context.readinessPercentage}%** (${context.overallMaturityScore}/5.0), placing the organization at a **Developing Baseline** relative to industry peers (benchmark avg: 62%). While leadership demonstrates strong vision for technology adoption, primary operational bottlenecks exist in **${context.lowScoringSections.join(", ")}**.

Key operational pain points impacting throughput include:
${context.topPainPoints.map((p) => `- ${p}`).join("\n")}

### Value Opportunity & Financial Impact

Our quantitative assessment indicates that strategic deployment of targeted AI automation can generate **${roi.totalEstimatedAnnualSavings}** in annual savings with an estimated ROI of **+${roi.overallRoiPercentage}%** and an average payback period of **${roi.averagePaybackMonths} months**. 

Primary value drivers center on automating document processing, accelerating RFP proposal turnaround times, and deploying conversational knowledge assistants across core departments.

### 90-Day Transformation Horizon

We recommend a phased transformation strategy:
1. **Immediate (Days 1-30)**: Establish an Enterprise AI Governance Taskforce and publish baseline acceptable AI usage policies.
2. **Quick Wins (Days 31-60)**: Deploy high-impact, low-friction pilot tools for Sales and Finance.
3. **Scale & Integration (Days 61-90)**: Integrate core vector databases with ERP/CRM workflows.`;
}

export async function generateProposalDraftNarrative(
  context: BusinessContextJSON,
  roi: ROISummaryData
): Promise<string> {
  const prompt = `You are a Managing Director at Nisol AI writing a Commercial Discovery Proposal Draft for ${context.companyName}.

CONTEXT:
- Client: ${context.companyName} (${context.industry})
- Projected Annual Savings: ${roi.totalEstimatedAnnualSavings}
- Proposed Timeline: 12-Month Engagement (Phased: Discovery -> Quick Wins -> Scale)

Write a compelling commercial proposal draft covering:
1. Executive Offer & Engagement Objectives
2. Scope of Work (Discovery Workshop, Blueprinting, Governance Setup, Pilot Deployment)
3. Investment Summary & Payment Milestones
4. Expected Outcomes & ROI Guarantee Framework

Style: Professional consulting proposal format.`;

  try {
    const res = await aiClient.generateWithFallback("proposal_draft", prompt);
    if (res.text && res.text.trim().length > 100) {
      return res.text.trim();
    }
  } catch (err) {
    console.warn("[NarrativeEngine] Commercial proposal draft AI generation failed, using structured fallback:", err);
  }

  return `## Commercial Advisory & Transformation Proposal

**Prepared for:** ${context.companyName}  
**Prepared by:** Nisol AI Advisory Services  
**Target Impact:** ${roi.totalEstimatedAnnualSavings} Annual Operational Savings  

---

### 1. Executive Engagement Overview

Nisol AI proposes a comprehensive 12-Month AI Transformation Engagement designed to transition ${context.companyName} from a Developing Baseline maturity to an AI-First Enterprise. 

Our engagement is structured into three distinct execution phases to minimize operational risk while guaranteeing early financial return.

---

### 2. Scope of Work

* **Phase 1: Foundation, Governance & Quick Wins (Months 1-3)**
  - Establishment of AI Governance Committee and Security Policy Framework.
  - Deployment of AI Proposal Generator and HR Knowledge Assistant.
  - Staff prompt engineering and AI workflow training.
* **Phase 2: Enterprise Workflow Integration (Months 4-8)**
  - Integration of OCR Vision AI with ERP/CRM databases.
  - Custom RAG Vector Store construction across company document repos.
* **Phase 3: Autonomous Agent Scaling (Months 9-12)**
  - Deployment of multi-agent supply chain and customer support copilots.
  - Continuous model monitoring and auditing.

---

### 3. Investment Summary

| Engagement Phase | Duration | Investment | Primary Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 1: Quick Wins** | 3 Months | ₹35,000,000 | Governance SOPs, 2 Live Pilots, Staff Training |
| **Phase 2: Scale** | 5 Months | ₹75,000,000 | ERP/CRM Connectors, Vector Lakehouse, 4 Workflows |
| **Phase 3: Autonomous Agent**| 4 Months | ₹50,000,000 | Multi-Agent Orchestration, Continuous Audit |

---

### 4. Terms & Next Steps

Upon signature of this proposal, Nisol AI will initiate Phase 1 within 10 business days. Monthly executive steering reviews will monitor financial savings against our targeted payback horizon of **${roi.averagePaybackMonths} months**.`;
}
