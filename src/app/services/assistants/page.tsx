import React from "react";
import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Enterprise AI Assistants | Nisol Labs",
  description: "Empower your workforce with context-aware conversational assistants securely connected to proprietary knowledge bases."
};

export default function AssistantsPage() {
  return (
    <ServicePageTemplate
      slug="assistants"
      badgeText="HYBRID RAG PILLAR"
      heroTitle="Provide Verified Enterprise Answers Grounded in Your Data"
      heroSubheading="Stop dealing with generic chat interfaces that hallucinate or leak data. We build secure, role-based, context-aware AI Assistants connected directly to your documentation and databases."
      challenges={[
        "Employees waste hours searching for files across email and SharePoint",
        "Generic AI tools hallucinate answers, causing operational risks",
        "Sensitive documents leaked because tools lack access control (RBAC)",
        "Static PDF manuals or guides are difficult to reference quickly",
        "New employee onboarding is slow and resource-heavy",
        "Inability to handle complex charts, tables, or scanned documents"
      ]}
      imagineInstead={[
        "Instant, accurate answers grounded directly in company memory",
        "100% verified citations mapping responses to source files",
        "Tenant and role-based permissions preventing unauthorized leaks",
        "Conversational access to complex technical guides and manuals",
        "Rapid onboarding with self-service AI guides",
        "Full multi-modal parsing of tables, layouts, and scans"
      ]}
      whatIsTitle="What Are Enterprise AI Assistants?"
      whatIsDescription="Generic chat systems fail in enterprise settings because they lack proprietary context and violate access boundaries. Nisol Labs builds Enterprise AI Assistants utilizing advanced Hybrid Retrieval-Augmented Generation (RAG). We index your unstructured data (PDFs, Wikis, Shared Drives) into high-performance vector databases, apply dense-sparse semantic reranking to find exact answers, and enforce strict document-level role permissions (RBAC) so users only see answers they are authorized to access."
      applications={[
        { department: "Operations", useCase: "Technical SOP Copilots" },
        { department: "HR & Onboarding", useCase: "Internal Policy Assistants" },
        { department: "Wealth & Finance", useCase: "SEC Analyst RAG" },
        { department: "Customer Support", useCase: "Agent-Facing Knowledge Bases" }
      ]}
      outcomes={[
        { title: "Reduce Research Time", desc: "Cut document discovery cycles by up to 90%, transforming searches from hours into seconds." },
        { title: "Enforce Governance", desc: "Embed document-level permissions ensuring compliance with internal security guidelines." },
        { title: "Increase Accuracy", desc: "Eliminate hallucinations using cross-encoder rerankers and strict context groundings." }
      ]}
      techStack={["Pinecone", "Qdrant", "Unstructured.io", "LlamaIndex", "LangChain", "Cohere Rerank"]}
      techComponents={[
        { label: "Dense-Sparse Vector Index", desc: "Combines keyword matching with semantic vector distance for maximum accuracy." },
        { label: "Cohere Reranking Engine", desc: "Re-evaluates the top retrieved document chunks to ensure only highly relevant context goes to the model." },
        { label: "Document permission middleware", desc: "Filters query outputs against active Active Directory / OAuth user roles." }
      ]}
      deliverables={[
        "Enterprise Hybrid RAG Pipeline Implementation",
        "Custom UI Interface & Slack/Teams Connectors",
        "Automated Document Ingest & Indexing Services",
        "Role-Based Access Control (RBAC) Security Setup",
        "Hallucination Guardrail Benchmarking Suites",
        "Telemetry Dashboard Tracking Search Success"
      ]}
      useCases={[
        {
          title: "Financial Knowledge Assistant",
          problem: "Wealth managers spending up to 45 minutes manually parsing 500+ page regulatory documents during planning.",
          solution: "Built conversational analyst assistant using Qdrant vector database and Cohere reranker.",
          outcome: "Reduced research cycle times to under 3 minutes per query with verified source page citations."
        },
        {
          title: "Technical SOP Assistant",
          problem: "Shop floor technicians carrying around heavy printed manuals and struggling to debug machine codes.",
          solution: "Implemented multi-modal vector search indexing all technical schematics and manuals.",
          outcome: "Allows technicians to upload error screenshots and get step-by-step resolution advice in 15 seconds."
        },
        {
          title: "HR Policy Guide",
          problem: "HR team flooded with identical repeat questions regarding benefits, leave, and tax schedules.",
          solution: "Connected internal employee handbook to Slack using secure RAG pipeline.",
          outcome: "Automates 74% of common HR policy inquiries, freeing up team bandwidth."
        }
      ]}
      roiPreview={{
        hoursSaved: "90% Time Saved",
        costRed: "Zero Data Leaks",
        payback: "2 Months",
        savings: "$210,000/Yr"
      }}
      faqs={[
        {
          question: "Can it run with our existing documents?",
          answer: "Yes. Our ingestion pipelines support PDFs, Word Docs, PowerPoint slides, spreadsheets, scanned images, SharePoint directories, and raw database records."
        },
        {
          question: "How do you prevent hallucinations?",
          answer: "We restrict the model's response to only the retrieved text chunks. If the answer is not present in the indexed source documents, the AI is programmed to answer that it cannot find the information, preventing guess-work."
        },
        {
          question: "Can it respect our Active Directory permissions?",
          answer: "Yes. We map document-level access permissions directly from your LDAP, Active Directory, or Okta scopes to vector search filters, preventing unauthorized access."
        }
      ]}
    />
  );
}
