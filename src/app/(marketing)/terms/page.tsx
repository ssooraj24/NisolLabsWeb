import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Code2,
  Zap,
  Scale,
  Building,
  Mail,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { LegalHeader } from "@/components/legal/LegalHeader";
import { LegalSidebar, TOCItem } from "@/components/legal/LegalSidebar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Terms of Service | Nisol AI - Enterprise Engagement & IP Ownership",
  description:
    "Review Nisol AI's Terms of Service. Learn about our Guaranteed Zero Vendor Lock-in, 100% enterprise IP ownership, 3 Delivery Models, and engagement standards.",
};

const tocItems: TOCItem[] = [
  { id: "highlights", title: "Core Agreement Principles" },
  { id: "acceptance", title: "1. Acceptance of Terms & Eligibility" },
  { id: "services", title: "2. Description of Services & Delivery Models" },
  { id: "ip-rights", title: "3. IP Ownership & Zero Vendor Lock-in" },
  { id: "client-duties", title: "4. Client Responsibilities & Access" },
  { id: "confidentiality", title: "5. Confidentiality & Mutual NDA" },
  { id: "sla-pricing", title: "6. Service Levels & Engagement Timelines" },
  { id: "acceptable-use", title: "7. Acceptable Use & AI Safety Guardrails" },
  { id: "billing", title: "8. Payment Terms & Invoicing" },
  { id: "warranties", title: "9. Warranties & Disclaimers" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "termination", title: "11. Termination & Data Portability" },
  { id: "governing-law", title: "12. Governing Law & Disputes" },
  { id: "contact", title: "13. Contact Information" },
];

export default function TermsOfServicePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <LegalHeader
        title="Terms of Service"
        subtitle="These Terms of Service govern your access to Nisol AI's digital platform, executive discovery portal, AI engineering consulting services, and stateful multi-agent systems."
        lastUpdated="August 19, 2026"
        badgeText="Enterprise Service Agreement"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">

          {/* Highlights Box for Quick Scan */}
          <section id="highlights" className="scroll-mt-28 space-y-4">
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
                <Scale className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">Core Agreement Principles</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Code2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Zero Vendor Lock-In</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      You own 100% of custom code, architecture diagrams, prompt templates, fine-tuned adapters, and board-ready deliverables built for your enterprise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Zap className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">3 Flexible Delivery Models</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Choose between <strong>Build</strong> (turnkey engineering), <strong>Manage</strong> (team oversight), or <strong>Monitor</strong> (independent advisory & evaluation).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">7-11 Day Speed Guarantee</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Nisol Discovery™ delivers 15 board-ready deliverables in 7 to 11 business days with fixed-price transparency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <ShieldCheck className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Enterprise Confidentiality</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Strict mutual non-disclosure, enterprise data isolation, and Azure/AWS multi-cloud native security protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1 */}
          <section id="acceptance" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">01.</span>
                Acceptance of Terms & Eligibility
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                By accessing or using the website, client portal, software products, or consulting services offered by <strong>Nisol AI</strong> ("Nisol AI", "Nisol Labs", "Company", "we", "us"), you ("Client", "User", "Organization") agree to be bound by these Terms of Service.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the legal authority to bind such entity to these terms. If you do not agree to all provisions contained herein, you must not access or use our services.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="services" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">02.</span>
                Description of Services & Delivery Models
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI provides end-to-end Enterprise AI Transformation services, software solutions, multi-agent frameworks, and cloud architecture implementation. Our offerings include:
              </p>

              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <Badge variant="navy">MODEL 1: BUILD</Badge>
                  <h3 className="text-xs font-bold text-navy-950">Turnkey AI Engineering</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    End-to-end design, code implementation, and deployment of autonomous AI agents, RAG vector pipelines, and LLMOps telemetry.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <Badge variant="navy">MODEL 2: MANAGE</Badge>
                  <h3 className="text-xs font-bold text-navy-950">Delivery Management</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Embedded AI leadership oversight guiding your internal software engineers and external vendor teams to execute AI roadmaps safely.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <Badge variant="navy">MODEL 3: MONITOR</Badge>
                  <h3 className="text-xs font-bold text-navy-950">Independent Advisory</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Continuous model evaluation, hallucination audits, sub-200ms latency benchmarking, and token cost optimization advice.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 - IP Rights & Zero Lock-in */}
          <section id="ip-rights" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/40 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="golden">GUARANTEED ZERO VENDOR LOCK-IN</Badge>
                <h2 className="text-xl font-bold text-white">3. IP Ownership & Zero Vendor Lock-in</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nisol AI operates on a foundational commitment: <strong>Your strategy, code, and data belong to your enterprise.</strong>
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-1 text-xs">
                  <strong className="text-golden-400 font-bold">A. Client Intellectual Property Ownership:</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Upon full payment of applicable engagement fees, Client shall own all right, title, and interest in and to all custom deliverables created specifically for Client under an executed Statement of Work (SOW), including custom source code, prompt libraries, fine-tuned model weights, RAG pipeline code, workflow DAGs, and board reports.
                  </p>
                </div>

                <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-1 text-xs">
                  <strong className="text-golden-400 font-bold">B. Nisol AI Pre-Existing IP:</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Nisol AI retains ownership of its pre-existing core frameworks, proprietary AI engines (such as RoSense AI), reusable utility libraries, and transformation methodologies. To the extent any pre-existing IP is embedded into Client deliverables, Nisol AI grants Client a perpetual, worldwide, non-exclusive, royalty-free license to use, modify, and expand such pre-existing IP internally.
                  </p>
                </div>

                <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-1 text-xs">
                  <strong className="text-golden-400 font-bold">C. Complete Offboarding & Documentation:</strong>
                  <p className="text-slate-300 leading-relaxed">
                    We provide complete architectural documentation, code repositories, and cloud deployment scripts (Terraform/CloudFormation) enabling your in-house engineering team to operate all deployed AI systems independently.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="client-duties" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">04.</span>
                Client Responsibilities & Access
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                To ensure successful project execution and adherence to engagement schedules, Client agrees to:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li>Provide timely access to designated enterprise personnel, cloud environments, and necessary API credentials.</li>
                <li>Ensure all data uploaded or supplied to Nisol AI platforms complies with applicable laws and does not infringe third-party rights.</li>
                <li>Maintain strict confidentiality of client discovery portal credentials and administrative access tokens.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="confidentiality" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">05.</span>
                Confidentiality & Mutual NDA
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                "Confidential Information" includes all non-public technical data, trade secrets, architecture blueprints, business metrics, customer data, and source code disclosed by either party.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Each party agrees to hold the other's Confidential Information in strict confidence using the same degree of care it uses for its own confidential assets (and no less than reasonable care). Confidential Information shall not be disclosed to any third party except to authorized personnel, cloud sub-processors under equivalent confidentiality obligations, or as required by court order.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="sla-pricing" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">06.</span>
                Service Levels & Engagement Timelines
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                For Nisol Discovery™ fixed-price executive packages:
              </p>
              <div className="p-4 bg-golden-50 border border-golden-200 rounded-xl text-xs space-y-2 text-navy-950">
                <div className="flex items-center gap-2 font-bold text-golden-700">
                  <Zap className="w-4 h-4" />
                  <span>7 to 11 Business Day Delivery Commitment</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Upon completion of initial discovery diagnostic inputs, Nisol AI guarantees delivery of 15 board-ready deliverables within 7 to 11 business days, contingent upon prompt Client response to diagnostic verification steps.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="acceptable-use" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">07.</span>
                Acceptable Use & AI Safety Guardrails
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Clients and portal users shall not attempt to:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li>Probe, scan, or exploit vulnerabilities in Nisol AI's agent orchestration layer, API gateways, or cloud infrastructure (Azure / AWS).</li>
                <li>Execute adversarial prompt injection attacks or bypass built-in PII and toxicity guardrails.</li>
                <li>Reverse-engineer or decompile Nisol AI's proprietary AI engine source code (including RoSense AI core modules).</li>
                <li>Use Nisol AI services to generate unlawful, defamatory, or harmful content.</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section id="billing" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">08.</span>
                Payment Terms & Invoicing
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Fees for Nisol Discovery™ and AI Implementation statements of work are specified in the applicable ordering document. Unless stated otherwise:
              </p>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                <li>Fixed-price packages require upfront invoice settlement prior to deliverable handoff.</li>
                <li>All fees are net of applicable taxes (sales tax, VAT, or withholding taxes).</li>
                <li>Late payments beyond Net 30 terms may accrue interest at 1.5% per month or the maximum statutory rate.</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section id="warranties" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">09.</span>
                Warranties & Disclaimers
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nisol AI warrants that all engineering services shall be performed in a professional, workmanlike manner adhering to modern software and cloud security standards.
              </p>
              <div className="p-4 bg-slate-100 rounded-xl text-xs space-y-1 text-slate-700">
                <strong className="text-navy-950 font-bold">Generative AI Nondeterminism Notice:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Client acknowledges that third-party Large Language Models (LLMs) operate nondeterministically. While Nisol AI deploys sub-200ms evaluation loops, structured outputs, and automated guardrails to mitigate hallucinations, Nisol AI does not guarantee 100% error-free outputs from underlying foundational model providers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section id="liability" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">10.</span>
                Limitation of Liability
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, special, or punitive damages (including loss of profits or revenue) arising out of or related to these terms.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Each party's maximum cumulative liability under any Statement of Work shall be limited to the total fees paid by Client to Nisol AI under that specific Statement of Work during the 12-month period preceding the claim.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="termination" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">11.</span>
                Termination & Data Portability
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Either party may terminate an active agreement for cause upon 30 days' written notice if the other party materially breaches any provision and fails to cure such breach within the notice period.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Upon termination, Client shall receive all completed deliverables and source code, and Nisol AI shall delete or return Client Confidential Information in accordance with our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="governing-law" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">12.</span>
                Governing Law & Dispute Resolution
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, with primary jurisdiction under the courts of Mumbai, Maharashtra, without regard to conflict of law principles. Parties agree to attempt good-faith executive negotiations prior to initiating formal legal proceedings or binding arbitration in Mumbai.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section id="contact" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">13. Legal Contact Information</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                For questions regarding these Terms of Service or to request formal corporate master service agreements (MSAs):
              </p>

              <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2 text-xs">
                <p className="text-white font-bold">Nisol AI — Enterprise Legal Operations</p>
                <p className="text-slate-300">Email: <a href="mailto:contact@nisolai.com" className="text-golden-400 hover:underline">contact@nisolai.com</a></p>
                <p className="text-slate-300">Website: <a href="https://www.nisolai.com" className="text-golden-400 hover:underline">www.nisolai.com</a></p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/contact?type=legal-inquiry" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Contact Legal Department
                </Button>
                <Button href="/privacy" variant="outline" size="sm">
                  View Privacy Policy
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
