import React from "react";
import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI-Powered Automation | Nisol Labs",
  description: "Transform manual document processing, invoice validation, email triage, and complex workflow steps into zero-touch intelligent automated channels."
};

export default function AutomationPage() {
  return (
    <ServicePageTemplate
      slug="automation"
      badgeText="AUTOMATION PILLAR"
      heroTitle="Automate Unstructured Document Workflows with Vision LLMs"
      heroSubheading="Standard RPA breaks when templates change. We build intelligent document processing and decision-making pipelines that handle unstructured formats, vision documents, and complex invoices with 99%+ accuracy."
      challenges={[
        "Manual data entry from invoices, bills, and receipts is slow and error-prone",
        "RPA templates break whenever a customer changes a PDF layout",
        "Unable to read handwritten text or low-resolution scans",
        "High exception rates requiring constant manual correction",
        "Delayed vendor payments leading to operational bottlenecks",
        "Integrating unstructured email attachments with legacy ERPs"
      ]}
      imagineInstead={[
        "Zero-touch data extraction from any invoice format",
        "99%+ extraction accuracy using vision-language models",
        "Seamless processing of low-quality scans and handwritings",
        "Automated exception handling queues with human fallback validation",
        "3-way matching of invoices, purchase orders, and packing slips",
        "Instant web hook synchronization to SAP, Salesforce, or Oracle"
      ]}
      whatIsTitle="What Is AI-Powered Automation?"
      whatIsDescription="Robotic Process Automation (RPA) is fragile because it depends on fixed coordinates. Nisol Labs engineers Intelligent Document Processing (IDP) pipelines utilizing vision LLMs and structured output schemas (Pydantic). Our pipelines read document images, understand content semantically, extract key-value data with confidence scoring, and route exceptions to human review UI screens, allowing you to scale transaction volumes without adding headcount."
      applications={[
        { department: "Finance", useCase: "AP Invoice Processing" },
        { department: "Logistics", useCase: "Freight Bill Auditing" },
        { department: "Customer Ops", useCase: "Email Attachment Triage" },
        { department: "Compliance", useCase: "Contract Clause Extraction" }
      ]}
      outcomes={[
        { title: "Reduce Cycle Time", desc: "Process monthly volumes in minutes rather than days, eliminating backlogs." },
        { title: "Reduce Data Error", desc: "Achieve 99.4% extraction accuracy, reducing processing cost per document." },
        { title: "Scalable Output", desc: "Handle transaction volume spikes during month-end closes without operational friction." }
      ]}
      techStack={["GPT-4o Vision", "Pydantic", "Celery", "Redis", "AWS Textract", "Tesseract"]}
      techComponents={[
        { label: "Vision Extraction Engine", desc: "Processes documents as images to parse structural layouts, handwritings, and tables." },
        { label: "Confidence Scorer", desc: "Flags fields that fail threshold criteria and alerts validation operators." },
        { label: "ERP Sync Webhook", desc: "Automated connector payloads routing structured outputs directly to database APIs." }
      ]}
      deliverables={[
        "Intelligent Document Processing (IDP) Pipeline",
        "Automated Exception Handling & Human-in-the-Loop UI",
        "Custom API & Webhook Connector Integrations",
        "Pydantic Validation & Output Formatting Schemas",
        "Detailed Audit Trail & Compliance Tracking Logs",
        "Performance Calibration & Accuracy Reports"
      ]}
      useCases={[
        {
          title: "Accounts Payable Invoice Processing",
          problem: "Global firm receiving 15,000 monthly invoices in hundreds of different layout configurations requiring manual keying.",
          solution: "Deployed vision-language extraction pipeline with automated 3-way matching and human verification interface.",
          outcome: "Reduced invoice processing cost by 82% while maintaining 99.4% extraction accuracy."
        },
        {
          title: "Freight Bill Audit Automation",
          problem: "Logistics team spending 20+ hours weekly audit-checking shipping slips against freight rate schedules.",
          solution: "Built automated document ingestion pipeline extracting container numbers, weights, and routes.",
          outcome: "Automates freight audit for 120,000 invoices monthly with zero manual entry errors."
        },
        {
          title: "Customer Purchase Order Intake",
          problem: "Customer service agents manually copying items from incoming customer purchase orders into internal ERP systems.",
          solution: "Implemented PO extraction agent connected to Oracle ERP system via REST APIs.",
          outcome: "Cuts average order processing cycle times from 24 hours down to less than 2 minutes."
        }
      ]}
      roiPreview={{
        hoursSaved: "82% Cost Saved",
        costRed: "99.4% Accuracy",
        payback: "1.2 Months",
        savings: "$280,000/Yr"
      }}
      faqs={[
        {
          question: "How does this compare to traditional RPA?",
          answer: "Traditional RPA relies on templates and pixel coordinates. If a vendor moves their logo or table column, RPA breaks. Our AI-powered automation reads documents semantically, understanding context like a human does, meaning it won't break when layouts change."
        },
        {
          question: "What happens if the model is unsure of a field?",
          answer: "Our system calculates a confidence score for each field. If any field drops below your defined threshold (e.g. 95%), the document is routed to a human review queue, ensuring zero incorrect data enters your ERP."
        },
        {
          question: "Can it extract data from handwritten documents?",
          answer: "Yes. Using advanced vision LLMs, we parse handwriting, signatures, low-quality mobile uploads, and skewed document scans with high precision."
        }
      ]}
    />
  );
}
