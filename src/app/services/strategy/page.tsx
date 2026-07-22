import React from "react";
import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Strategy & Discovery | Nisol Labs",
  description: "Identify high-value enterprise AI use cases, evaluate technology readiness, and construct a risk-mitigated executive roadmap for AI adoption."
};

export default function StrategyPage() {
  return (
    <ServicePageTemplate
      slug="strategy"
      badgeText="DISCOVERY PILLAR"
      heroTitle="Align AI Initiatives Directly to Business Outcomes"
      heroSubheading="Stop chasing AI hype. We map your business processes, audit your technical architecture, and design a 12-to-24 month milestone-driven roadmap to deploy practical, high-ROI AI solutions."
      challenges={[
        "Chasing AI hype without a clear business case or goal",
        "Wasting budgets on pilot projects that never reach production",
        "Unclear data foundations preventing model deployments",
        "Uncertainty around security, data privacy, and model copyright",
        "Resistance to AI adoption from internal operations teams",
        "Evaluating build vs. buy decisions for model architectures"
      ]}
      imagineInstead={[
        "Clear, prioritized portfolio of high-ROI AI initiatives",
        "Detailed technical feasibility audits of data lakes",
        "Executive-level risk mitigation and compliance frameworks",
        "12-to-24 month clear implementation roadmaps",
        "Proven vendor-neutral recommendations for models",
        "Immediate clarity on internal operational cost saving opportunities"
      ]}
      whatIsTitle="What Is AI Strategy & Discovery?"
      whatIsDescription="Many organizations waste months trying to integrate models without first understanding their data maturity or ROI metrics. Nisol Labs provides a structured, engineering-led discovery audit. We analyze your workflows, evaluate data readiness, isolate security risks, and produce a detailed opportunity matrix that maps complexity against financial savings, giving you a vendor-neutral path to successful AI adoption."
      applications={[
        { department: "Executive Board", useCase: "AI Opportunity & ROI Matrix" },
        { department: "Security & Legal", useCase: "AI Stance & Compliance Audits" },
        { department: "IT & Systems", useCase: "Integration & Model Planning" },
        { department: "Operations", useCase: "Process Anomaly Auditing" }
      ]}
      outcomes={[
        { title: "Define Business Case", desc: "Identify immediate operational savings with concrete ROI calculations." },
        { title: "Mitigate Security Risk", desc: "Define access control, PII masking, and isolated host requirements." },
        { title: "Accelerate Roadmap", desc: "Go from abstract goals to a structured implementation blueprint in weeks." }
      ]}
      techStack={["Enterprise AI Framework", "Feasibility Models", "Value Stream Mapping"]}
      techComponents={[
        { label: "Opportunities Mapping", desc: "We evaluate and prioritize processes based on task repetition and data structuredness." },
        { label: "Data Audit Matrix", desc: "Audit text databases, unstructured file shares, and APIs for model ingestion viability." },
        { label: "Risk Mitigation Plan", desc: "Comprehensive review of data transmission pipelines, model licenses, and compliance boundaries." }
      ]}
      deliverables={[
        "Executive AI Opportunity & Prioritization Matrix",
        "Detailed Data Maturity & API Infrastructure Audit",
        "12-to-24 Month Technical Implementation Roadmap",
        "Proof of Concept (PoC) Prototype Scope & Blueprint",
        "Comprehensive Vendor-Neutral Model Stance Report",
        "Enterprise Security, Compliance & Governance Framework"
      ]}
      useCases={[
        {
          title: "Supply Chain Strategy Blueprint",
          problem: "Global logistics provider wanted to implement AI but was paralyzed by having 20+ legacy software platforms.",
          solution: "Audited data systems, mapped procurement processes, and designed a phased API integration strategy.",
          outcome: "Identified $4.2M in annual operational savings with a 3-stage integration blueprint."
        },
        {
          title: "Regulatory Compliance Discovery",
          problem: "Asset manager wanting to deploy RAG over SEC filings but blocked by strict internal security mandates.",
          solution: "Conducted security audit and proposed Tenant Isolation architecture using private VPC setups.",
          outcome: "Received internal compliance sign-off to initiate production knowledge pilot."
        },
        {
          title: "Operations Optimization Audit",
          problem: "Insurance vendor spending too much on manual claims processing but unsure where AI would be most effective.",
          solution: "Analyzed workflow cycle times and mapped key bottlenecks in unstructured email parsing.",
          outcome: "Proposed targeted Intelligent Document pipeline with projected 65% cost reduction."
        }
      ]}
      roiPreview={{
        hoursSaved: "Discovery in 2 Wks",
        costRed: "Risk Mitigated",
        payback: "Instant Value",
        savings: "$4.2M Identified"
      }}
      faqs={[
        {
          question: "How long does a Discovery Workshop take?",
          answer: "Our standard discovery audit takes between 2 to 3 weeks depending on the size of the organization and complexity of current systems."
        },
        {
          question: "What is the primary deliverable of this service?",
          answer: "A comprehensive executive-ready report featuring a prioritized Opportunity Matrix, Technical Implementation Roadmap, Data Readiness Audit, and security stance guidelines."
        },
        {
          question: "Why should we choose Nisol Labs over standard consulting firms?",
          answer: "We are hands-on engineers, not slide writers. Our recommendations are grounded in what can actually be built, optimized, and secured at scale, preventing budget waste on unrealistic prototypes."
        }
      ]}
    />
  );
}
