import React from "react";
import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Autonomous AI Agents | Nisol Labs",
  description: "Deploy production-grade autonomous agent clusters that plan, execute, validate, and collaborate across enterprise systems with human-in-the-loop governance."
};

export default function AgentsPage() {
  return (
    <ServicePageTemplate
      slug="agents"
      badgeText="FLAGSHIP PILLAR"
      heroTitle="Build AI Employees That Work 24x7 Across Your Business"
      heroSubheading="Replace repetitive work with autonomous AI agents that understand business goals, coordinate multiple systems, make decisions within guardrails, and complete end-to-end business processes—reducing cost, increasing speed, and enabling teams to focus on high-value work."
      challenges={[
        "Teams spend hours copying information between systems",
        "Customer requests wait in support queues for hours",
        "Employees repeat the same data entry tasks daily",
        "Traditional automation breaks on unstructured emails or documents",
        "Business processes stall waiting for manual approvals",
        "Scaling operations requires hiring expensive support staff"
      ]}
      imagineInstead={[
        "Read incoming emails and understand customer intent",
        "Retrieve relevant knowledge base articles instantly",
        "Check inventory levels and update ERP databases",
        "Generate draft responses and submit API actions",
        "Escalate to human agents only when confidence drops",
        "Complete entire workflows in minutes, not business days"
      ]}
      whatIsTitle="What Are Autonomous AI Agents?"
      whatIsDescription="Traditional software follows rigid, pre-defined rules. Autonomous AI Agents understand goals rather than simple instructions. Instead of coding every single logical step, you define the business objective. The AI plans the work, gathers information, makes decisions within defined guardrails, coordinates with other specialized agents, integrates with legacy APIs, and verifies results. Think of it as hiring a digital employee instead of writing another complex script."
      applications={[
        { department: "Customer Support", useCase: "Ticket Resolution Agent" },
        { department: "HR & Recruitment", useCase: "Employee Onboarding Agent" },
        { department: "Finance & Accounts", useCase: "Invoice Reconciliation Agent" },
        { department: "Sales Operations", useCase: "Lead Research & Proposal Agent" }
      ]}
      outcomes={[
        { title: "Reduce Operational Costs", desc: "Automate repetitive manual work and reduce processing costs by up to 60%." },
        { title: "Increase Productivity", desc: "Allow employees to focus on strategic work while AI handles repetitive processes." },
        { title: "Improve Customer Experience", desc: "Provide faster response times with 24x7 intelligent assistance and instant resolutions." }
      ]}
      techStack={["LangGraph", "CrewAI", "FastAPI", "Docker", "Python", "LlamaIndex"]}
      techComponents={[
        { label: "Stateful Supervisor Graph", desc: "Orchestrates sub-agents, routes tasks, and maintains memory across conversation steps." },
        { label: "Secure API Gateways", desc: "Custom tool calling schemas to safely read and write to CRM, ERP, and databases." },
        { label: "PII Masking & Guardrails", desc: "Filters sensitive client data prior to model inference and validates outputs." }
      ]}
      deliverables={[
        "Custom Multi-Agent Orchestration Architecture",
        "Enterprise API Tool-Calling Schema Integration",
        "Human-in-the-Loop Approval UI Interface",
        "Real-time Agent Telemetry & Log Monitoring System",
        "Comprehensive Deployment & Security Documentation",
        "HIPAA / SOC-2 Compliance Verification Audits"
      ]}
      useCases={[
        {
          title: "Tier-1 & Tier-2 Support Agent",
          problem: "Support queue overload with customers waiting 8+ hours for simple refund or tracking status changes.",
          solution: "Deployed LangGraph customer support agent cluster integrated with Shopify and Zendesk APIs.",
          outcome: "84% ticket resolution rate automatically with sub-45 second response times."
        },
        {
          title: "Intelligent Invoice Auditor",
          problem: "Accounting teams manually verifying invoice line-items against purchase orders, leading to slow cycle times and payment errors.",
          solution: "Implemented vision-based document processing agent with 3-way matching engine.",
          outcome: "Reduced processing costs by 82% with 99.4% extraction accuracy."
        },
        {
          title: "B2B Lead Enrichment Agent",
          problem: "SDRs spending 15+ hours weekly researching leads, scraping sites, and writing outbound sequences.",
          solution: "Built autonomous research agent that scrapes target companies, enriches CRM profiles, and drafts personalized sequences.",
          outcome: "Saves 14 hours per rep weekly while increasing email open rates to 58%."
        }
      ]}
      roiPreview={{
        hoursSaved: "14 hrs/Rep/Wk",
        costRed: "Up to 60%",
        payback: "1.2 Months",
        savings: "$452,700/Yr"
      }}
      faqs={[
        {
          question: "How long does implementation take?",
          answer: "A standard pilot implementation takes between 4 to 6 weeks, which includes discovery, architecture mapping, development, sandboxed testing, and rollouts."
        },
        {
          question: "Will AI agents replace our employees?",
          answer: "No. Our AI agents are designed to handle repetitive, low-context, high-volume tasks. This allows your team to focus on strategic work, complex exceptions, and customer relationship building."
        },
        {
          question: "Can it integrate with our legacy SAP or Salesforce system?",
          answer: "Yes. We build custom API gateways and adapters that securely communicate with Salesforce, SAP, HubSpot, Microsoft 365, and proprietary SQL databases."
        },
        {
          question: "How secure are these autonomous agents?",
          answer: "Extremely secure. We implement PII masking, SOC-2 compliant tenant isolation, role-based access control, and human-in-the-loop validation checkpoints before any data modification happens."
        }
      ]}
    />
  );
}
