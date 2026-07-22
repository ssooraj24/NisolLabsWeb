import React from "react";
import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Data Readiness for AI | Nisol Labs",
  description: "Prepare your enterprise data foundation for high-performance AI through data cleaning, vector database engineering, structured ETL pipelines, and semantic indexing."
};

export default function DataReadinessPage() {
  return (
    <ServicePageTemplate
      slug="data-readiness"
      badgeText="DATA PILLAR"
      heroTitle="Prepare Your Enterprise Data Foundation for AI Scale"
      heroSubheading="AI models are only as good as the context they query. We clean, chunk, enrich, and index your legacy enterprise databases, wikis, and document stores into high-performance vector lakehouses."
      challenges={[
        "Enterprise files exist in unstructured PDFs, emails, and SharePoint silos",
        "Duplicate documents and outdated folders cause model hallucinations",
        "Sensitive customer information (PII) is mixed into public documents",
        "Lack of clean metadata limits search and retrieval precision",
        "Databases lack the vector index support required for semantic search",
        "No automated pipeline to clean and index new incoming document feeds"
      ]}
      imagineInstead={[
        "Clean, structured, deduplicated enterprise document repositories",
        "Vector lakehouse architecture supporting milli-second query latency",
        "Automated PII detection and masking prior to model indexing",
        "Enriched document chunks with custom hierarchical tags",
        "Ready-to-use vector databases (Qdrant, Pinecone) integrated with ERP",
        "Continuous automated re-indexing pipelines as files change"
      ]}
      whatIsTitle="What Is Data Readiness for AI?"
      whatIsDescription="Many enterprise RAG projects fail because the underlying data is noisy, outdated, or poorly indexed. Data Readiness for AI is the engineering process of transforming raw file shares into structured semantic memory. Nisol Labs designs custom ETL pipelines that parse PDFs, remove duplicates, extract entity relationships, mask personal identifiers (PII), optimize chunk sizes for LLM context windows, and index outputs into production-grade vector lakehouses."
      applications={[
        { department: "IT & Systems", useCase: "Vector Database Setup" },
        { department: "Compliance", useCase: "PII Masking & Filtering" },
        { department: "Data Ops", useCase: "Document Parsing ETLs" },
        { department: "Strategy", useCase: "Knowledge Graph Engineering" }
      ]}
      outcomes={[
        { title: "Reduce Hallucinations", desc: "Clean databases ensure the model only accesses verified, up-to-date document coordinates." },
        { title: "Improve Query Precision", desc: "Advanced chunking and metadata tags double search accuracy speeds." },
        { title: "Secure PII Compliance", desc: "Automate PII stripping, guaranteeing compliance with SOC-2 and HIPAA standards." }
      ]}
      techStack={["Pinecone", "Qdrant", "Databricks", "Snowflake", "Neo4j", "Airflow", "Python"]}
      techComponents={[
        { label: "Semantic Chunking Parser", desc: "Groups text context based on logical sentences rather than arbitrary characters to keep meaning intact." },
        { label: "Entity Resolution Graph", desc: "Maps text relations into a Neo4j database to enable multi-hop search queries." },
        { label: "PII Anonymization Filter", desc: "Scans data streams for SSNs, emails, and phone numbers to sanitize files." }
      ]}
      deliverables={[
        "Enterprise Vector Database & Knowledge Graph Setup",
        "Automated Ingestion, Parsing & Chunking Pipelines",
        "PII Masking & Anonymization Engine Scripts",
        "Data Quality & Semantic Search Audit Report",
        "Airflow/Prefect Workflow Orchestration DAGs",
        "Retrieval Benchmarking & Accuracy Scoresheets"
      ]}
      useCases={[
        {
          title: "Healthcare Record Vectorization",
          problem: "Healthcare provider with 15 million historical medical logs needing clean indexation for a clinical RAG copilot.",
          solution: "Built Apache Airflow pipeline to parse logs, strip PHI identifiers, and index coordinates in Qdrant.",
          outcome: "Sanitized 15M records in 3 weeks, creating a 100% HIPAA-compliant search dataset."
        },
        {
          title: "Wiki Directory Deduplication",
          problem: "Software firm's RAG bot returning old, conflicting policy information because of duplicate documents on SharePoint.",
          solution: "Implemented document hashing and semantic distance deduplication filters in the ingest pipeline.",
          outcome: "Eliminated 42% duplicate document noise, resulting in 98% accurate bot answers."
        },
        {
          title: "Contracts Parsing Pipeline",
          problem: "Legal team unable to query historical lease agreements because files were scanned image PDFs.",
          solution: "Built document layouts parsing pipeline utilizing OCR and vision metadata extraction.",
          outcome: "Structured 50,000 scanned leases into clean JSON vector chunks in less than 48 hours."
        }
      ]}
      roiPreview={{
        hoursSaved: "98% Clean Data",
        costRed: "42% Noise Cut",
        payback: "1 Month",
        savings: "$150,000/Yr"
      }}
      faqs={[
        {
          question: "Why can't we just load our raw PDFs directly into an LLM?",
          answer: "Raw PDFs contain headers, footers, duplicate pages, layout artifacts, and irrelevant tables. Feeding this raw text directly to LLMs leads to high API costs, lost context, security issues, and frequent hallucination errors."
        },
        {
          question: "How do you handle data security?",
          answer: "All chunking and cleaning scripts run inside your private VPC network environment. We construct custom scrubbing filters that flag and mask PII (Personally Identifiable Information) before data hits any external embeddings engine."
        },
        {
          question: "Do you support Knowledge Graphs?",
          answer: "Yes. For complex query patterns where document connections are key, we build hybrid RAG architectures linking vector stores (Qdrant) with graph databases (Neo4j)."
        }
      ]}
    />
  );
}
