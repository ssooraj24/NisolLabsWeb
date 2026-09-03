import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Code2,
  Zap,
  Scale,
  Building,
  Mail,
  ArrowRight,
  Clock,
  Users,
  FileCheck,
  Eye,
  HeartHandshake,
  Sparkles,
  HelpCircle,
  ArrowLeft
} from "lucide-react";
import { LegalHeader } from "@/components/legal/LegalHeader";
import { LegalSidebar, TOCItem } from "@/components/legal/LegalSidebar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Enterprise Intelligence Grant Terms & Conditions | Nisol AI",
  description:
    "Official legal terms, grant scope, recipient commitments, media rights, Nisol Data Promise, 100% IP ownership, and selection rubric for the Nisol Enterprise Intelligence Grant Program.",
};

const tocItems: TOCItem[] = [
  { id: "highlights", title: "Core Partnership Principles" },
  { id: "grant-scope", title: "1. Grant Scope & Award Valuation" },
  { id: "recipient-commitments", title: "2. Recipient Commitments & SLA" },
  { id: "media-rights", title: "3. Media Rights & Nisol Data Promise" },
  { id: "ip-ownership", title: "4. 100% IP Ownership & Zero Lock-in" },
  { id: "selection-rubric", title: "5. Advisory Board & Selection Rubric" },
  { id: "confidentiality", title: "6. Confidentiality & Security Guardrails" },
  { id: "handoff-offboarding", title: "7. Sprint Offboarding & Independence" },
  { id: "contact", title: "8. Grant Advisory Board & Contact" },
];

export default function GrantTermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back to Grants Link */}
      <div>
        <Link
          href="/grants"
          className="inline-flex items-center gap-2 text-xs font-bold text-golden-600 hover:text-golden-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Grant Program Application</span>
        </Link>
      </div>

      {/* Page Header */}
      <LegalHeader
        title="Grant Program Terms & Conditions"
        subtitle="These Terms & Conditions govern participation in the Nisol Enterprise Intelligence Grant Program. A shared commitment to strategic clarity, zero vendor lock-in, and ethical storytelling."
        lastUpdated="September 3, 2026"
        badgeText="Grant Partnership Framework"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">
          
          {/* Highlights Box */}
          <section id="highlights" className="scroll-mt-28 space-y-4">
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
                <Award className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">Core Partnership Principles</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Zap className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">₹4,50,000 ($5,500) Award Valuation</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Delivered at <strong>zero financial cost</strong> to 3 selected educational institutions, Section 8 entities, trusts, or mission-driven organizations per cycle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Clock className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">High Leadership Commitment</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Requires 90 minutes with your CEO/Dean on Day 1, 3–5 stakeholder interviews, and a 48-hour deliverable feedback turnaround.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <Code2 className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">100% IP Ownership</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Your institution retains complete legal ownership of all custom strategy, code, DAGs, roadmaps, and board-ready deliverables created during the grant.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-navy-900/80 p-4 rounded-xl border border-navy-800">
                  <ShieldCheck className="w-5 h-5 text-golden-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">The Nisol Data Promise</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Raw proprietary data, internal financials, and student/personnel records are strictly protected and <strong>never published or shared</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Grant Scope */}
          <section id="grant-scope" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">01.</span>
                Grant Scope & Award Valuation
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                1.1 <strong>Program Designation:</strong> The Nisol Enterprise Intelligence Grant ("Grant") is an annual initiative by Nisol AI ("Grantor") awarding full 7-day strategic AI architecture diagnostics to mission-driven organizations ("Recipient").
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                1.2 <strong>Monetary Valuation:</strong> Each Grant award carries a commercial value of <strong>₹4,50,000 INR ($5,500 USD)</strong> and is delivered to the Recipient at <strong>zero financial cost</strong>.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                1.3 <strong>Included Deliverables:</strong> The Grant includes full access to the Nisol Discovery™ framework:
              </p>
              
              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <Badge variant="navy">7-DAY SPRINT</Badge>
                  <h3 className="text-xs font-bold text-navy-950">Diagnostic Audit</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Senior AI architect diagnostic review of data workflows, tech stack bottlenecks, and manual overhead.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <Badge variant="navy">15 ASSETS</Badge>
                  <h3 className="text-xs font-bold text-navy-950">Board Deliverables</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Capability scorecards, 3-scenario stress tests, solution architecture blueprints, and financial ROI models.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <Badge variant="navy">MUSEUM-GRADE</Badge>
                  <h3 className="text-xs font-bold text-navy-950">Hardcover Dossier</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A physical, cloth-bound hardcover Intelligence Portfolio couriered directly to Recipient executive leadership.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Recipient Commitments */}
          <section id="recipient-commitments" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">02.</span>
                Recipient Commitments & Operational SLA
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                In exchange for receiving the Grant at zero financial cost, the Recipient agrees to fulfill three operational time commitments to ensure successful execution:
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-navy-950 text-sm">
                    <Users className="w-4 h-4 text-golden-600" />
                    <span>A. CEO / Dean 90-Minute Vision Interview (Day 1)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Recipient's Executive Director, Dean, Vice-Chancellor, or CEO commits to a 90-minute strategic vision interview on Day 1 of the sprint to align AI architecture goals with top-level institutional priorities.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-navy-950 text-sm">
                    <FileCheck className="w-4 h-4 text-golden-600" />
                    <span>B. 3 to 5 Key Stakeholder Diagnostic Interviews</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Recipient agrees to grant 30–45 minute interview access to 3 to 5 key department heads (e.g. IT Lead, Research Dean, Operations Director, Grant Manager) to audit workflow pain points and system data structures.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-navy-950 text-sm">
                    <Clock className="w-4 h-4 text-golden-600" />
                    <span>C. 48-Hour Review Feedback SLA</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Because the 7-day diagnostic sprint operates on an intensive schedule, the Recipient commits to reviewing draft deliverables and providing feedback within <strong>48 hours</strong> of receipt to prevent project bottlenecks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Media Rights & Nisol Data Promise */}
          <section id="media-rights" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-golden-500/40 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="golden">STORYTELLING & BRANDING</Badge>
                <h2 className="text-xl font-bold text-white">3. Media Rights & The Nisol Data Promise</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                3.1 <strong>Co-Produced Marketing Rights:</strong> Recipient agrees that Grantor may capture, produce, and distribute content related to the Grant engagement for educational, research, and promotional purposes, including:
              </p>

              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5">
                <li><strong>Written Case Study:</strong> A detailed transformation case study published on Nisol AI's website, LinkedIn, and annual "State of Enterprise AI" report.</li>
                <li><strong>Visual Content:</strong> Photography and short 3–5 minute executive interview videos highlighting the collaborative process.</li>
                <li><strong>Public Announcements:</strong> A joint press release announcing the Recipient as an Enterprise Intelligence Grant recipient.</li>
              </ul>

              {/* Highlight Box for The Nisol Data Promise */}
              <div className="p-5 bg-navy-900 rounded-xl border border-golden-500/30 space-y-2 mt-4">
                <div className="flex items-center gap-2 text-golden-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>The Nisol Data Protection Promise</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  We will <strong>NEVER</strong> share or publish your raw proprietary data, internal financial statements, student records, donor lists, or internal system keys. We only share high-level strategic insights, the operational journey, and overall impact metrics—never your underlying raw data.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: 100% IP Ownership */}
          <section id="ip-ownership" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">04.</span>
                100% Intellectual Property Ownership & Zero Lock-in
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                4.1 <strong>Recipient IP Ownership:</strong> The custom AI architecture blueprints, workflow DAGs, prompt libraries, financial ROI models, and board reports produced during the Grant remain the <strong>100% sole intellectual property of the Recipient</strong>.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                4.2 <strong>Grantor Methodology:</strong> Grantor retains ownership of its pre-existing diagnostic frameworks, RoSense AI core engine modules, and general transformation methodologies.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                4.3 <strong>Zero Downstream Commitment:</strong> At the conclusion of the Grant, Recipient is under no obligation to purchase implementation services, software licenses, or ongoing retainer subscriptions from Grantor.
              </p>
            </div>
          </section>

          {/* Section 5: Advisory Board & Selection Rubric */}
          <section id="selection-rubric" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">05.</span>
                Grant Advisory Board & 4-Point Selection Rubric
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Grant awards are evaluated by the external <strong>Nisol Grant Advisory Board</strong> using a standardized, transparent 4-point scoring rubric:
              </p>

              <div className="overflow-x-auto py-2">
                <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-navy-950 text-white font-bold">
                    <tr>
                      <th className="p-3">Criteria</th>
                      <th className="p-3">Weight</th>
                      <th className="p-3">Evaluation Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Social / Educational Impact</td>
                      <td className="p-3 text-golden-600 font-bold">35%</td>
                      <td className="p-3 text-slate-600">Does the institution solve a critical challenge affecting students, research, or underserved communities?</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Data Complexity & Readiness</td>
                      <td className="p-3 text-golden-600 font-bold">25%</td>
                      <td className="p-3 text-slate-600">Does the data bottleneck provide a strong showcase for RoSense AI architecture frameworks?</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Leadership Buy-In</td>
                      <td className="p-3 text-golden-600 font-bold">20%</td>
                      <td className="p-3 text-slate-600">Is top leadership (Dean/CEO) committed to the 90-minute vision interview and 7-day sprint velocity?</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-navy-950">Amplification Potential</td>
                      <td className="p-3 text-golden-600 font-bold">20%</td>
                      <td className="p-3 text-slate-600">Does the institution have an active audience to co-publish and inspire other peer organizations?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 6: Confidentiality & Security */}
          <section id="confidentiality" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">06.</span>
                Confidentiality & Security Guardrails
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Both parties agree to execute a mutual Non-Disclosure Agreement (NDA) prior to sprint commencement. All system credential sharing, database schema reviews, and architectural audits occur within isolated, encrypted cloud environments complying with SOC 2 Type II and ISO 27001 security standards.
              </p>
            </div>
          </section>

          {/* Section 7: Sprint Offboarding */}
          <section id="handoff-offboarding" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <span className="text-golden-500 font-mono text-base">07.</span>
                Sprint Offboarding & Independence Protocol
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Upon completion of the 7-day sprint, Grantor provides complete offboarding documentation (including architecture diagrams, code repositories, and CloudFormation/Terraform scripts) enabling Recipient's internal IT team or chosen vendors to execute the roadmap independently.
              </p>
            </div>
          </section>

          {/* Section 8: Contact */}
          <section id="contact" className="scroll-mt-28 space-y-4">
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-golden-400 shrink-0" />
                <h2 className="text-xl font-bold text-white">08. Grant Advisory Board Contact</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                For questions regarding the Grant Program, eligibility criteria, or partnership agreements:
              </p>

              <div className="p-4 bg-navy-900 rounded-xl border border-navy-800 space-y-2 text-xs">
                <p className="text-white font-bold">Nisol Grant Advisory Board — Selection Operations</p>
                <p className="text-slate-300">Email: <a href="mailto:grants@nisolai.com" className="text-golden-400 hover:underline">grants@nisolai.com</a></p>
                <p className="text-slate-300">Website: <a href="https://www.nisolai.com/grants" className="text-golden-400 hover:underline">www.nisolai.com/grants</a></p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/grants" variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Apply for Intelligence Grant
                </Button>
                <Button href="/terms" variant="outline" size="sm">
                  View General Terms of Service
                </Button>
              </div>
            </div>
          </section>

        </main>

        {/* Sidebar TOC */}
        <div className="lg:col-span-1">
          <LegalSidebar items={tocItems} contactEmail="grants@nisolai.com" />
        </div>
      </div>
    </div>
  );
}
