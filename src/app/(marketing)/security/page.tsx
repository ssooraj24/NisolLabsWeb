import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  Cpu,
  FileCheck2,
  RefreshCw,
  AlertTriangle,
  Mail,
  ArrowRight,
  CheckCircle2,
  Database,
  Activity,
  Layers
} from "lucide-react";
import { LegalHeader } from "@/components/legal/LegalHeader";
import { LegalSidebar, TOCItem } from "@/components/legal/LegalSidebar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Security & Compliance | Nisol AI - Enterprise Azure & AWS AI Architecture",
  description:
    "Explore Nisol AI's Security & Compliance whitepaper. Enterprise zero-trust architecture, Microsoft Azure & AWS Cloud-native protection, SOC 2 alignment, sub-200ms AI telemetry, and zero model training.",
};

const tocItems: TOCItem[] = [
  { id: "highlights", title: "Security Architecture Summary" },
  { id: "philosophy", title: "1. Zero-Trust Security Philosophy" },
  { id: "aws-infra", title: "2. Azure & AWS Cloud Native Infrastructure" },
  { id: "encryption", title: "3. Data Encryption & Key Management" },
  { id: "ai-guardrails", title: "4. AI Guardrails & Prompt Safety" },
  { id: "iam-access", title: "5. IAM & Role-Based Access Controls" },
  { id: "compliance-frameworks", title: "6. Compliance Standards & Certifications" },
  { id: "vulnerability-mgmt", title: "7. Vulnerability Management & Auditing" },
  { id: "bcp-dr", title: "8. Disaster Recovery & Availability" },
  { id: "incident-response", title: "9. Incident Response & Vulnerability Disclosure" },
];

export default function SecurityCompliancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <LegalHeader
        title="Security & Compliance"
        subtitle="Engineered for enterprise scale, zero trust, and multi-cloud (Microsoft Azure & AWS) native security. Discover how Nisol AI protects your data, agent workflows, and vector architectures."
        lastUpdated="August 19, 2026"
        badgeText="Enterprise Azure & AWS Security Architecture"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">

          {/* Highlights Box for Quick Scan */}
          <section id="highlights" className="scroll-mt-28 space-y-4">
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
                <ShieldCheck className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">Security & Compliance Highlights</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Server className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Azure & AWS Multi-Cloud Security</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Deployed on Microsoft Azure and AWS infrastructure utilizing isolated VNets/VPCs, Azure OpenAI Service, AWS Bedrock, and Azure Key Vault / KMS.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Lock className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">End-to-End Encryption</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      TLS 1.3 enforced in-transit across all HTTP/API endpoints and AES-256 encryption at-rest for vector databases and object stores.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Cpu className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Guardrails & Zero Training</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Active prompt injection defenses, automated PII redaction, and strict guarantees that customer data is never used to train public LLMs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <FileCheck2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">SOC 2 & ISO 27001 Alignment</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Architected around SOC 2 Trust Services Criteria, ISO/IEC 27001 controls, and ISO 42001 (Artificial Intelligence Governance).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1 */}
          <section id="philosophy" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">01.</span>
                Zero-Trust Security Philosophy
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                At Nisol AI, security is not an afterthought or a marketing checkbox — it is a core architectural pillar of every agent workflow, RAG pipeline, and cloud deployment we engineer.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                We operate under a strict <strong>Zero-Trust architecture principle</strong>: <em>"Never trust, always verify."</em> Every API request, agent communication boundary, model execution call, and database query must be authenticated, authorized, and logged regardless of whether it originates inside or outside the network perimeter.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="aws-infra" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">02.</span>
                Microsoft Azure & AWS Cloud Infrastructure (Mumbai, India Region)
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our primary production infrastructure, vector databases, and AI model endpoints are deployed in <strong>Mumbai, India</strong> (Azure Central India & AWS Asia Pacific ap-south-1), capitalizing on tier-1 MeitY empaneled cloud data centers:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h3 className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-golden-500" />
                    Isolated VNets & VPC Environments
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Compute and vector database resources operate within private Azure Virtual Networks (VNets) and AWS VPCs with strict subnet isolation and no direct public internet exposure for data stores.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h3 className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-golden-500" />
                    Azure DDoS & WAF Protection
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Azure Front Door WAF and AWS Shield inspect edge web traffic to automatically mitigate OWASP Top 10 vulnerabilities, botnets, and DDoS attacks.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h3 className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-golden-500" />
                    Azure OpenAI & AWS Bedrock Endpoints
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Foundational LLM processing takes place via private Azure OpenAI Service and AWS Bedrock endpoints, ensuring enterprise data remains securely contained within dedicated cloud perimeters.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h3 className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-golden-500" />
                    Multi-Region Redundancy
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applications and storage replicas are distributed across multiple Azure Availability Zones and AWS regions to guarantee zero single points of failure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="encryption" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">03.</span>
                Data Encryption & Key Management
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI enforces mandatory encryption across data lifecycles—whether data is moving across the network or stored in persistent databases:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">Encryption In Transit (TLS 1.3)</h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Enforced Everywhere</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All browser sessions, microservice communications, and external API requests require TLS 1.3 encryption. HTTP traffic is automatically redirected to HTTPS with Strict-Transport-Security (HSTS) headers enabled.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">Encryption At Rest (AES-256, Azure Key Vault & AWS KMS)</h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">FIPS 140-2 Validated</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All relational databases, pgvector stores, blob storage, and system logs are encrypted at rest using AES-256 encryption. Encryption keys are managed and rotated via Azure Key Vault and AWS Key Management Service (KMS).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">Tenant Data Isolation (PostgreSQL RLS)</h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Strict Row-Level Security</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    PostgreSQL database architecture uses Row Level Security (RLS) policies ensuring complete data isolation between enterprise accounts. A tenant can never query or view another client's data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 - AI Guardrails & Prompt Safety */}
          <section id="ai-guardrails" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/40 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="golden">AI SAFETY & GOVERNANCE</Badge>
                <h2 className="text-xl font-bold text-white">4. AI Guardrails & Prompt Safety Architecture</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Deploying LLMs into production requires multi-layered safety guardrails to ensure reliability, prevent hallucinations, and reject malicious prompt injection attempts:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <Activity className="w-4 h-4" />
                    <span>Sub-200ms Evaluation Loops</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automated real-time evaluation engines benchmark model response accuracy, latency, and groundness against reference context prior to delivering output.
                  </p>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Adversarial Prompt Defense</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Input sanitization filters prevent prompt injection, system prompt leakage, jailbreaks, and unauthorized tool execution.
                  </p>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <Lock className="w-4 h-4" />
                    <span>Automated PII Redaction</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sensitive personal identifiable information (SSNs, credit card numbers, confidential keys) is automatically masked prior to model processing.
                  </p>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Data Retention APIs</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We configure foundational model APIs with zero-data-retention parameters, guaranteeing that enterprise queries are erased immediately after inference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="iam-access" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">05.</span>
                IAM & Role-Based Access Controls
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Access to Nisol AI development and production environments is controlled through granular Identity and Access Management (IAM):
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li><strong>Least-Privilege Authorization & Entra ID (Azure AD):</strong> Personnel access is governed via Microsoft Entra ID (Azure AD) SSO, SAML 2.0, and strict Role-Based Access Controls (RBAC).</li>
                <li><strong>Mandatory Multi-Factor Authentication (MFA):</strong> Hardware key or TOTP MFA is enforced on all internal developer, Azure portal, cloud console, and database accounts.</li>
                <li><strong>Immutable Audit Logging:</strong> All administrative access events and configuration changes are recorded in immutable Azure Monitor / AWS CloudTrail logs.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="compliance-frameworks" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">06.</span>
                Compliance Standards & Framework Alignment
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI's security practices align with internationally recognized cybersecurity and governance standards:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">DPDP Act 2023 & CERT-In (India)</h3>
                  <p className="text-xs text-slate-600">
                    Compliant with India's Digital Personal Data Protection Act (DPDP 2023) data residency and CERT-In 6-hour incident reporting rules.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">SOC 2 Type II Alignment</h3>
                  <p className="text-xs text-slate-600">
                    Controls mapped across Security, Confidentiality, and Availability Trust Services Criteria.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">ISO/IEC 27001 & ISO 42001</h3>
                  <p className="text-xs text-slate-600">
                    Adherence to Information Security Management and pioneering Artificial Intelligence Governance standards.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">GDPR, CCPA & HIPAA Ready</h3>
                  <p className="text-xs text-slate-600">
                    Infrastructure supporting international privacy rights, BAAs, and isolated enterprise tenant data environments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="vulnerability-mgmt" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">07.</span>
                Vulnerability Management & Auditing
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We maintain continuous visibility into potential software vulnerabilities:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li><strong>Automated Code Scanning:</strong> Static Application Security Testing (SAST) integrated directly into GitHub CI/CD build pipelines.</li>
                <li><strong>Dependency Monitoring:</strong> Real-time dependency vulnerability tracking to immediately patch outdated npm or Python packages.</li>
                <li><strong>Penetration Testing:</strong> Periodic third-party web application and cloud architecture security audits.</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section id="bcp-dr" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">08.</span>
                Disaster Recovery & Availability
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI ensures enterprise service continuity through robust backup and recovery targets:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-navy-950">Recovery Point Objective (RPO): &lt; 5 Minutes</strong>
                  <p className="text-slate-600">Continuous Point-in-Time Recovery (PITR) for PostgreSQL relational databases.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-navy-950">Recovery Time Objective (RTO): &lt; 1 Hour</strong>
                  <p className="text-slate-600">Automated infrastructure deployment scripts (Terraform/CloudFormation) for rapid region restoration.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="incident-response" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">09. Incident Response & Responsible Disclosure</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                We take all security reports seriously. If you suspect a security vulnerability or wish to report an incident regarding Nisol AI infrastructure, please contact our security response team immediately:
              </p>

              <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2 text-xs">
                <p className="text-white font-bold">Nisol AI Security Operations Center (SOC)</p>
                <p className="text-slate-300">Security Email: <a href="mailto:contact@nisolai.com" className="text-golden-400 hover:underline">contact@nisolai.com</a></p>
                <p className="text-slate-300">Response SLA: Within 24 hours of notification receipt</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/contact?type=security-report" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Report a Vulnerability
                </Button>
                <Button href="/terms" variant="outline" size="sm">
                  View Terms of Service
                </Button>
              </div>
            </div>
          </section>

        </main>

        {/* Sidebar TOC */}
        <div className="lg:col-span-1">
          <LegalSidebar items={tocItems} contactEmail="contact@nisolai.com" />
        </div>
      </div>
    </div>
  );
}
