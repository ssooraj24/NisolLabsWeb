import React from "react";
import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Engineering & DevOps | Nisol Labs",
  description: "Transition prototype models into robust, resilient, low-latency enterprise applications backed by continuous deployment and observability."
};

export default function EngineeringPage() {
  return (
    <ServicePageTemplate
      slug="engineering"
      badgeText="DIFFERENTIATOR PILLAR"
      heroTitle="Resilient AI Systems Engineered for Enterprise Scale"
      heroSubheading="Stop building fragile wrappers. We deploy scalable LLMOps architectures, semantic cache systems, model routers, and automated evaluation frameworks to guarantee latency, accuracy, and budget goals."
      challenges={[
        "AI applications suffer from slow response times and high latency",
        "API costs explode as prompt volume scales up",
        "System performance degrades with model updates (hallucinations, drift)",
        "Lack of versioning and automated testing for prompts",
        "Security breaches due to sensitive data leaks",
        "Fragile setups that crash under peak concurrent traffic"
      ]}
      imagineInstead={[
        "Sub-200ms latency target using semantic model caching",
        "Up to 60% API cost savings through intelligent model routing",
        "Continuous automated regression testing for all prompt versions",
        "PII data mask gateways keeping customer details secure",
        "High availability setups with Kubernetes scaling",
        "Real-time token cost and hallucination monitoring"
      ]}
      whatIsTitle="What Is AI Engineering & DevOps?"
      whatIsDescription="Many agencies build simple API wrappers. Nisol Labs builds robust AI software engineering platforms. We optimize every layer of the AI lifecycle: from quantization of open weights (Mistral/Llama 3) to deployment on dedicated local vLLM nodes, setup of hybrid dense-sparse vector indexing, implementation of Redis semantic caching to prevent duplicate API hits, and establishing automated prompt validation pipelines (CI/CD for LLMs) so prompt adjustments never break production features."
      applications={[
        { department: "Engineering", useCase: "CI/CD LLM Eval pipelines" },
        { department: "Operations", useCase: "Model Routing & Caching Engines" },
        { department: "Security", useCase: "PII Masking & Token Auditing" },
        { department: "Infrastructure", useCase: "vLLM Inference Cluster Setup" }
      ]}
      outcomes={[
        { title: "Reduce Token Spend", desc: "Cut API cost overhead by up to 58% via local open model hosting and cache hits." },
        { title: "Optimize Speed", desc: "Improve user experience with sub-200ms response times for repeat queries." },
        { title: "Secure Operations", desc: "Embed security telemetry, SOC-2 readiness, and model output audits." }
      ]}
      techStack={["vLLM", "Ollama", "LangSmith", "Weights & Biases", "Kubernetes", "Prometheus", "GPTCache"]}
      techComponents={[
        { label: "vLLM Inference", desc: "High-throughput hosting of local weights on dedicated GPU infrastructure." },
        { label: "Semantic Caching", desc: "Saves duplicate query patterns using cosine distance checks to cut costs." },
        { label: "LLMEval CI/CD", desc: "Automated regression suite checking response metrics prior to code deployment." }
      ]}
      deliverables={[
        "Enterprise LLMOps Pipeline & CI/CD Setup",
        "Model Router & Token Cost Optimization Engine",
        "Fine-tuned Domain Model Weights & Evaluation Benchmarks",
        "Continuous Observability, Monitoring & Alerting Telemetry",
        "Kubernetes Helm Charts & Terraform Configuration Files",
        "On-Premise or isolated Private Cloud Deployment Setup"
      ]}
      useCases={[
        {
          title: "Token Optimization Transformation",
          problem: "SaaS provider spending $40,000 monthly on OpenAI APIs with slow 3+ second latencies.",
          solution: "Implemented GPTCache semantic caching and routed simple queries to local Llama 3 vLLM models.",
          outcome: "Reduced OpenAI API token spend by 58% while cutting latency down to sub-300ms."
        },
        {
          title: "CI/CD Evaluation Setup",
          problem: "Financial platform team afraid to edit system prompts because it frequently led to logic regressions.",
          solution: "Built automated testing engine using LangSmith evaluating prompts on 200 standard test cases.",
          outcome: "Enables safe, continuous deployment of prompts with automated regression flagging."
        },
        {
          title: "VPC Private Model Hosting",
          problem: "Healthcare system unable to share data with third-party model providers due to strict HIPAA compliance.",
          solution: "Deployed localized open-source model weights inside private AWS GovCloud VPC.",
          outcome: "100% compliance guaranteed since medical data never leaves the internal hospital network."
        }
      ]}
      roiPreview={{
        hoursSaved: "Sub-200ms Target",
        costRed: "58% Token Saved",
        payback: "1.5 Months",
        savings: "$180,000/Yr"
      }}
      faqs={[
        {
          question: "What is the difference between an API wrapper and AI Engineering?",
          answer: "API wrappers send raw prompts directly to third-party endpoints (e.g. OpenAI). AI Engineering designs the complete middleware infrastructure: caching duplicate queries, routing based on complexity, auditing inputs for security, measuring hallucination rates, and maintaining local model hosting."
        },
        {
          question: "Can you host models inside our own private cloud?",
          answer: "Yes. We configure and deploy local models using vLLM on Kubernetes inside your private AWS VPC, Azure tenant, Google Cloud, or on-premise hardware."
        },
        {
          question: "What open-source weights do you recommend?",
          answer: "We typically work with Llama 3 (Meta), Mistral (Mistral AI), and Phi-3 (Microsoft) depending on the specific latency, accuracy, and hardware constraint requirements."
        }
      ]}
    />
  );
}
