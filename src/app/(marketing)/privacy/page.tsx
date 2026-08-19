import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Database,
  EyeOff,
  Server,
  FileCheck,
  UserCheck,
  Globe,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { LegalHeader } from "@/components/legal/LegalHeader";
import { LegalSidebar, TOCItem } from "@/components/legal/LegalSidebar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy | Nisol AI - Enterprise Data Protection & AI Governance",
  description:
    "Read Nisol AI's Privacy Policy. We guarantee zero training of public AI models on customer data, enterprise-grade Azure and AWS cloud security, and strict data sovereignty.",
};

const tocItems: TOCItem[] = [
  { id: "highlights", title: "Key Highlights & Guarantees" },
  { id: "scope", title: "1. Scope & Entity Information" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "ai-data-protections", title: "3. AI Model Data Protection & Non-Training" },
  { id: "usage", title: "4. How We Use Information" },
  { id: "infrastructure", title: "5. Cloud Sub-Processors (Azure & AWS Infrastructure)" },
  { id: "security", title: "6. Security & Encryption Standards" },
  { id: "retention", title: "7. Data Retention & Deletion" },
  { id: "rights", title: "8. Your Privacy Rights (DPDP Act India, GDPR & CCPA)" },
  { id: "cookies", title: "9. Cookies & Analytical Data" },
  { id: "transfers", title: "10. Data Residency & Mumbai Cloud Sovereignty" },
  { id: "contact", title: "11. Contact Data Protection Officer" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <LegalHeader
        title="Privacy Policy"
        subtitle="Nisol AI is committed to enterprise data protection, privacy compliance, and absolute customer data sovereignty across all our AI transformation solutions, agent orchestrations, and cloud deployments."
        lastUpdated="August 19, 2026"
        badgeText="Enterprise Data Protection"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content (3 Columns on Large Screens) */}
        <main className="lg:col-span-3 space-y-12">

          {/* Highlights Box for Quick Scan */}
          <section id="highlights" className="scroll-mt-28 space-y-4">
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
                <ShieldCheck className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">Enterprise Privacy Guarantees</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <EyeOff className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Zero Model Training</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Your business data, code, prompts, vector embeddings, and outputs are <strong>NEVER</strong> used to train public foundational AI models.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Database className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">100% Data Sovereignty</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      All custom models, fine-tuned adapters, codebases, and RAG vector store assets remain 100% owned by your enterprise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Server className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Azure & AWS Enterprise Security</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Hosted on Microsoft Azure and AWS cloud-native architecture with TLS 1.3 in-transit and AES-256 at-rest KMS encryption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <FileCheck className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">GDPR & CCPA Compliant</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Full support for access, deletion, data portability, and audit telemetry requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1 */}
          <section id="scope" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">01.</span>
                Scope & Entity Information
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                This Privacy Policy applies to personal data and enterprise technical information collected by <strong>Nisol AI</strong> ("Nisol AI", "Nisol Labs", "we", "us", or "our") when you access our website at <Link href="https://www.nisolai.com" className="text-golden-600 underline font-semibold">www.nisolai.com</Link>, utilize our client discovery portal, engage our AI engineering consulting services, or interact with our proprietary AI frameworks (such as RoSense AI and stateful multi-agent workflows).
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                As an enterprise AI transformation partner, Nisol AI acts both as a Data Controller (for website visitor details and customer administrative accounts) and as a Data Processor/Service Provider (when processing client datasets, prompts, and vector embeddings during AI system deployment).
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="collection" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">02.</span>
                Information We Collect
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We collect information necessary to deliver production-grade AI solutions, manage executive discovery engagements, and ensure cloud system security:
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">A. Information Provided Directly by You</h3>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li><strong>Contact & Account Details:</strong> Name, work email address, company name, job title, phone number, and discovery call bookings.</li>
                    <li><strong>Diagnostic Inputs & Questionnaires:</strong> Enterprise AI readiness inputs, cloud infrastructure parameters, token usage metrics, and business process automation requirements submitted via Nisol Discovery™.</li>
                    <li><strong>Billing & Contractual Information:</strong> Corporate invoicing details, enterprise agreement terms, and payment transaction metadata.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950 uppercase tracking-wider">B. Technical & System Telemetry (Automated Collection)</h3>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li><strong>Interaction & Network Logs:</strong> IP address, browser type, operating system, referrer URLs, and device identifiers.</li>
                    <li><strong>LLMOps & Agent Telemetry:</strong> Model invocation latencies, sub-200ms evaluation scores, token consumption rates, and error traces captured in anonymized observability logs.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 - AI Model Data Protections */}
          <section id="ai-data-protections" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/40 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="golden">CRITICAL COMMITMENT</Badge>
                <h2 className="text-xl font-bold text-white">3. AI Model Data Protection & Non-Training</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nisol AI recognizes that proprietary enterprise data, internal documentation, source code, and customer records represent your most sensitive competitive assets. We enforce strict technical and operational safeguards around LLM usage:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>No Model Retraining</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Customer data processed through Nisol AI agents, Azure OpenAI Service, or AWS Bedrock integration pipelines is <strong>never</strong> transmitted to third parties for public model training or fine-tuning without your explicit written authorization.
                  </p>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Isolated VPC & Embeddings</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Vector stores (pgvector, OpenSearch, Pinecone) and RAG document indexes are partitioned per enterprise tenant with strict Row Level Security (RLS) and encrypted keys.
                  </p>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Ephemeral Processing</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Transient LLM prompt contexts are held in memory only for the duration required to execute agent tasks and produce deterministic system output.
                  </p>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center gap-2 text-golden-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Prompt Injection & PII Filtering</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automated pre-processing guardrails scan inputs to prevent PII exposure, confidential token leaks, or malicious prompt injection vectors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="usage" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">04.</span>
                How We Use Information
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We process collected data exclusively for explicit, legitimate business and technical purposes:
              </p>

              <ul className="text-xs text-slate-600 space-y-2.5 list-disc pl-5">
                <li><strong>Executing AI Transformation Engagements:</strong> Delivering board-ready discovery reports, ROI financial models, architecture blueprints, and autonomous AI workflow deployments.</li>
                <li><strong>Operating Client Discovery Portal:</strong> Authenticating users, providing portal analytics, storing project documentation, and tracking 9-Stage Transformation progress.</li>
                <li><strong>LLMOps Monitoring & Telemetry:</strong> Tracking system performance, sub-200ms evaluation loops, API response times, model accuracy, and token optimization.</li>
                <li><strong>Communication & Support:</strong> Responding to inquiry forms, conducting executive strategy calls, and sending critical administrative/security notices.</li>
                <li><strong>Legal & Security Governance:</strong> Auditing access logs, detecting security anomalies, and ensuring compliance with enterprise customer NDAs and contracts.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="infrastructure" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">05.</span>
                Cloud Sub-Processors (Azure & AWS Infrastructure)
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI leverages enterprise-grade cloud sub-processors with SOC 2 Type II, ISO 27001, and ISO 42001 certifications. Key sub-processors include:
              </p>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-navy-950 text-white font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Sub-Processor</th>
                      <th className="py-3 px-4">Role / Function</th>
                      <th className="py-3 px-4">Data Location</th>
                      <th className="py-3 px-4">Security Standards</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-navy-950">Microsoft Corporation (Azure)</td>
                      <td className="py-3 px-4">Enterprise Cloud Infrastructure, Azure OpenAI Service, Azure Key Vault, VNets</td>
                      <td className="py-3 px-4"><strong>Primary: Azure Central India (Mumbai)</strong> / South India (Chennai)</td>
                      <td className="py-3 px-4">SOC 1/2/3, ISO 27001, MeitY Empaneled, HIPAA Ready</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-navy-950">Amazon Web Services (AWS)</td>
                      <td className="py-3 px-4">Cloud Infrastructure, AWS Bedrock, Lambda, KMS, S3, ECS</td>
                      <td className="py-3 px-4"><strong>Primary: AWS Asia Pacific (Mumbai - ap-south-1)</strong></td>
                      <td className="py-3 px-4">SOC 1/2/3, ISO 27001, MeitY Empaneled, HIPAA Ready</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-navy-950">Supabase Inc.</td>
                      <td className="py-3 px-4">Database hosting (PostgreSQL), Vector Store (pgvector), Authentication</td>
                      <td className="py-3 px-4"><strong>AWS ap-south-1 (Mumbai, India)</strong></td>
                      <td className="py-3 px-4">SOC 2 Type II, Encrypted at Rest (AES-256)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-navy-950">Resend Inc.</td>
                      <td className="py-3 px-4">Transactional System Email Delivery</td>
                      <td className="py-3 px-4">Global / US East</td>
                      <td className="py-3 px-4">SOC 2 Compliant, TLS 1.3 Enforced</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="security" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">06.</span>
                Security & Encryption Standards
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI implements zero-trust defense-in-depth protocols to safeguard client data against unauthorized access, loss, or manipulation:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">Encryption In Transit</h3>
                  <p className="text-xs text-slate-600">
                    All web traffic, API payloads, and database connections enforce TLS 1.3 protocols with HSTS preloading.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">Encryption At Rest</h3>
                  <p className="text-xs text-slate-600">
                    Database tables, vector stores, and object backups are encrypted using AES-256 via AWS KMS managed keys.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">Access Controls & RBAC</h3>
                  <p className="text-xs text-slate-600">
                    Strict Role-Based Access Control (RBAC), multi-factor authentication (MFA), and least-privilege policies.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-navy-950">Vulnerability Scanning</h3>
                  <p className="text-xs text-slate-600">
                    Automated dependency security audits, CI/CD static code analysis, and periodic penetration testing.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 pt-2">
                For detailed security specs, review our dedicated <Link href="/security" className="text-golden-600 underline font-semibold">Security & Compliance Whitepaper</Link>.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="retention" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">07.</span>
                Data Retention & Deletion
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We retain personal and technical data only as long as necessary to fulfill contract obligations, maintain service operations, and comply with legal requirements:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li><strong>Active Engagement Datasets:</strong> Retained during the active engagement term and deleted or exported to client within 30 days of contract conclusion upon written request.</li>
                <li><strong>Observability Telemetry:</strong> Model evaluation metrics and system logs are retained for a default of 90 days before automated rotation/purging.</li>
                <li><strong>Executive Discovery Portal Accounts:</strong> Retained until account closure request or 12 months of inactivity.</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section id="rights" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">08.</span>
                Your Privacy Rights (DPDP Act India, GDPR & CCPA/CPRA)
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI complies fully with India's <strong>Digital Personal Data Protection Act (DPDP Act 2023)</strong> as well as global standards (GDPR, CCPA/CPRA). As a data principal, you possess specific statutory rights:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <strong className="text-navy-950">Right of Access & Portability:</strong>
                  <p className="text-slate-600">Request a complete machine-readable copy of your personal data held by Nisol AI.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <strong className="text-navy-950">Right to Rectification:</strong>
                  <p className="text-slate-600">Correct inaccurate or incomplete personal contact details in our records.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <strong className="text-navy-950">Right to Erasure ("Right to be Forgotten"):</strong>
                  <p className="text-slate-600">Request the complete deletion of your account and personal records.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <strong className="text-navy-950">Opt-Out & Non-Discrimination:</strong>
                  <p className="text-slate-600">Opt out of non-essential communications without impact on core services.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="cookies" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">09.</span>
                Cookies & Analytical Data
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We use essential cookies and minimal web analytics to maintain user sessions and optimize website navigation. We do <strong>not</strong> sell, rent, or trade user tracking data to third-party ad networks or data brokers.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="transfers" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">10.</span>
                Data Residency & Mumbai Cloud Sovereignty
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our primary cloud infrastructure for client data, RAG vector stores, relational databases, and AI model endpoints is hosted locally in <strong>Mumbai, India</strong> (Azure Central India & AWS Asia Pacific ap-south-1).
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                This guarantees sub-millisecond network latency across India, full data residency compliance under the Indian DPDP Act 2023, and adherence to CERT-In cybersecurity directives. For international clients, multi-region deployments (EU, US) remain available upon request.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="contact" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">11. Contact Our Data Protection Officer</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you have questions, data subject requests, or privacy inquiries regarding this Privacy Policy or Nisol AI's enterprise data governance standards, please reach out to our legal and security leadership:
              </p>

              <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2 text-xs">
                <p className="text-white font-bold">Nisol AI — Legal & Data Protection Team</p>
                <p className="text-slate-300">Email: <a href="mailto:contact@nisolai.com" className="text-golden-400 hover:underline">contact@nisolai.com</a></p>
                <p className="text-slate-300">Website: <a href="https://www.nisolai.com" className="text-golden-400 hover:underline">www.nisolai.com</a></p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/contact?type=privacy-inquiry" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Submit Privacy Inquiry
                </Button>
                <Button href="/security" variant="outline" size="sm">
                  View Security & Compliance Specs
                </Button>
              </div>
            </div>
          </section>

        </main>

        {/* Sidebar TOC (1 Column on Large Screens) */}
        <div className="lg:col-span-1">
          <LegalSidebar items={tocItems} contactEmail="contact@nisolai.com" />
        </div>
      </div>
    </div>
  );
}
