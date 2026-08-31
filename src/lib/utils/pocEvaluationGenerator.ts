// src/lib/utils/pocEvaluationGenerator.ts

import { resolveClientCompanyName } from "@/lib/utils/companyNameResolver";

export interface PocEvaluationOptions {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  watermarkText?: string;
  currency?: "INR" | "USD";
}

export function generatePocEvaluationHTML(report: any, audit: any, options: PocEvaluationOptions = {}): string {
  const primaryColor = options.primaryColor || "#0F766E";
  const secondaryColor = options.secondaryColor || "#14B8A6";
  const fontFamily = options.fontFamily || "Inter, sans-serif";
  const watermarkText = options.watermarkText || "DECISION GATE PROTOCOL & PILOT SPECIFICATION";
  const currency = options.currency || report?.businessContext?.primaryCurrency || "INR";

  const tenantName = resolveClientCompanyName(report, audit);
  const reportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tenantName} - PoC Decision Gate & Acceptance Protocol</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    @page {
      size: A4 portrait;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: ${fontFamily};
        font-size: 8.5pt;
        font-weight: 600;
        color: #94A3B8;
      }
      @bottom-left {
        content: "Nisol AI Advisory — ${tenantName} PoC Decision Gate Protocol";
        font-family: ${fontFamily};
        font-size: 8.5pt;
        font-weight: 600;
        color: #94A3B8;
      }
    }

    body {
      font-family: ${fontFamily};
      color: #1E293B;
      margin: 0;
      padding: 0;
      font-size: 10.5pt;
      line-height: 1.55;
      background: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .cover-poc {
      page-break-after: always;
      padding: 32px;
      background: linear-gradient(135deg, #134E4A 0%, #042F2E 100%);
      color: #FFFFFF;
      border-radius: 14px;
      height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }

    .header-tag {
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 3px;
      color: #5EEAD4;
      text-transform: uppercase;
    }

    .doc-title {
      font-size: 28pt;
      font-weight: 900;
      line-height: 1.15;
      margin: 14px 0;
      color: #FFFFFF;
    }

    .section-title {
      font-size: 16pt;
      font-weight: 900;
      color: #134E4A;
      border-bottom: 2px solid #2DD4BF;
      padding-bottom: 6px;
      margin: 24px 0 14px 0;
    }

    .section-subtitle {
      font-size: 12.5pt;
      font-weight: 800;
      color: #0F766E;
      margin: 16px 0 8px 0;
    }

    .card-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 14px;
      font-size: 10pt;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .table-custom {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
      margin: 14px 0;
    }

    .table-custom th {
      background: #134E4A;
      color: #FFFFFF;
      padding: 10px 12px;
      text-align: left;
    }

    .table-custom td {
      padding: 9px 12px;
      border-bottom: 1px solid #E2E8F0;
    }

    .badge-pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 8.5pt;
      font-weight: 700;
    }
    .badge-green { background: #DCFCE7; color: #15803D; }
    .badge-blue { background: #DBEAFE; color: #1E40AF; }
    .badge-amber { background: #FEF3C7; color: #B45309; }

    .section-break { page-break-after: always; }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-poc">
    <div>
      <div class="header-tag">PILOT DECISION GATE & ACCEPTANCE PROTOCOL</div>
      <h1 class="doc-title">PoC EVALUATION FRAMEWORK & SCALABILITY DOSSIER</h1>
      <p style="font-size: 13pt; color: #CCFBF1; margin-top: 0;">Pre-Execution Governance Protocol: Hypotheses, SLA Benchmarks & Production Gate Criteria</p>
    </div>

    <div style="background: rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div>
        <div style="font-size: 8.5pt; color: #5EEAD4; font-weight: 700; text-transform: uppercase;">Organization</div>
        <div style="font-size: 13pt; font-weight: 700;">${tenantName}</div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: #5EEAD4; font-weight: 700; text-transform: uppercase;">Governance Gate</div>
        <div style="font-size: 13pt; font-weight: 700; color: #5EEAD4;">GATE 0: PILOT SCOPE AUTHORIZATION</div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: #5EEAD4; font-weight: 700; text-transform: uppercase;">Standard Pilot Sprint</div>
        <div style="font-size: 11.5pt; font-weight: 700; line-height: 1.3;">4-to-6 Week Active Engineering<br><span style="font-size: 8.5pt; color: #CCFBF1; font-weight: 400;">Commences upon client dependencies fulfillment</span></div>
      </div>
      <div>
        <div style="font-size: 8.5pt; color: #5EEAD4; font-weight: 700; text-transform: uppercase;">Date of Issue</div>
        <div style="font-size: 13pt; font-weight: 700;">${reportDate}</div>
      </div>
    </div>
  </div>

  <!-- SECTION 1: HYPOTHESES, DATA DEPENDENCIES & CLIENT CHECKLIST -->
  <div class="section-break">
    <div class="section-title">1. Pilot Hypotheses, Data Dependencies & Client-Side Checklist</div>
    
    <p>
      Prior to authorizing live production deployment for any enterprise AI capability, Nisol AI mandates a controlled <strong>4-to-6 week active sandbox pilot sprint</strong>. This document functions as the <strong>pre-execution governance protocol and rules of engagement</strong>—establishing quantitative acceptance thresholds, client-side data prerequisites, stop-the-clock terms, and post-pilot production decision gates.
    </p>

    <div class="grid-3" style="margin: 16px 0;">
      <div class="card-box" style="text-align: center;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #64748B; text-transform: uppercase;">Target Citation Precision</div>
        <div style="font-size: 20pt; font-weight: 900; color: #0F766E; margin: 4px 0;">&gt; 95.0%</div>
        <div style="font-size: 8.5pt; color: #059669; font-weight: 600;">Zero tolerance for uncited hallucinations</div>
      </div>
      <div class="card-box" style="text-align: center;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #64748B; text-transform: uppercase;">Target Inference Latency</div>
        <div style="font-size: 20pt; font-weight: 900; color: #0F766E; margin: 4px 0;">&lt; 2.0s</div>
        <div style="font-size: 8.5pt; color: #059669; font-weight: 600;">Interactive UI SLA at p95</div>
      </div>
      <div class="card-box" style="text-align: center;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #64748B; text-transform: uppercase;">Target User Task Reduction</div>
        <div style="font-size: 20pt; font-weight: 900; color: #0F766E; margin: 4px 0;">&gt; 40.0%</div>
        <div style="font-size: 8.5pt; color: #059669; font-weight: 600;">Measured vs. human baseline</div>
      </div>
    </div>

    <!-- 1.1 CANDIDATE WORKSTREAMS TABLE -->
    <div class="section-subtitle">1.1 Candidate Pilot Workstreams & Required Data Dependencies</div>
    <table class="table-custom">
      <thead>
        <tr>
          <th style="width: 22%;">Candidate Workstream</th>
          <th style="width: 24%;">Hypothesis to Validate</th>
          <th style="width: 24%;">Required Acceptance Threshold</th>
          <th style="width: 30%;">Required Data Source Dependency</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Automated QA Test Generation</strong><br><span style="font-size: 8.5pt; color: #64748B;">Engineering & DevOps</span></td>
          <td>Agent auto-generates executable Playwright tests from PR diffs</td>
          <td>&ge; 85% valid syntactical execution; zero broken existing tests</td>
          <td><span class="badge-pill badge-blue">GitHub PR Webhook Access</span><br><span style="font-size: 8pt; color: #475569;">Read-only repo diff tokens + Playwright runner container</span></td>
        </tr>
        <tr>
          <td><strong>Intelligent Invoice OCR Parser</strong><br><span style="font-size: 8.5pt; color: #64748B;">Finance & Accounting</span></td>
          <td>Vision LLM extracts 15 line items and matches ERP PO numbers</td>
          <td>&ge; 95% field extraction accuracy across 100 historical invoices</td>
          <td><span class="badge-pill badge-blue">Historical Invoices & PO Ledger</span><br><span style="font-size: 8pt; color: #475569;">100 historical vendor PDFs + ERP PO CSV export table</span></td>
        </tr>
        <tr>
          <td><strong>Enterprise SOP Knowledge Hub</strong><br><span style="font-size: 8.5pt; color: #64748B;">HR & Operations</span></td>
          <td>RAG engine answers policy queries with exact PDF handbook citations</td>
          <td>&ge; 98% factual precision across 200 synthetic challenge queries</td>
          <td><span class="badge-pill badge-blue">Verified Policy Repositories</span><br><span style="font-size: 8pt; color: #475569;">Unrestricted HR/Operations handbook PDFs + 200 SME QA pairs</span></td>
        </tr>
      </tbody>
    </table>

    <!-- 1.2 CLIENT-SIDE DEPENDENCY & DATA READINESS CHECKLIST -->
    <div style="margin-top: 18px;">
      <div class="section-subtitle">1.2 Client-Side Dependency & Data Readiness Checklist (Prerequisites)</div>
      <p style="font-size: 9.5pt; color: #475569; margin-bottom: 8px;">
        To guarantee sprint velocity and protect delivery margins, the <strong>4-to-6 week Pilot Sprint clock shall commence only upon Nisol AI's formal written confirmation</strong> that all prerequisite client-side dependencies have been satisfied:
      </p>

      <table class="table-custom">
        <thead>
          <tr>
            <th style="width: 22%;">Dependency Category</th>
            <th style="width: 40%;">Required Deliverable</th>
            <th style="width: 20%;">Responsible Party</th>
            <th style="width: 18%;">SLA Deadline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Invoice Data Sample</strong></td>
            <td>100 historical vendor invoices (PDF/JPEG) + corresponding ERP PO numbers in CSV</td>
            <td><strong>Finance Controller</strong></td>
            <td><span class="badge-pill badge-amber">5 Business Days</span></td>
          </tr>
          <tr>
            <td><strong>RAG Golden Test Set</strong></td>
            <td>200 question-answer verification pairs reviewed by nominated internal SMEs</td>
            <td><strong>Ops / Legal SMEs</strong></td>
            <td><span class="badge-pill badge-amber">7 Business Days</span></td>
          </tr>
          <tr>
            <td><strong>API & Code Diff Access</strong></td>
            <td>Read-only tokens for GitHub PR diffs (Engineering) + Jira read access (PMO)</td>
            <td><strong>CTO / IT Ops Lead</strong></td>
            <td><span class="badge-pill badge-amber">10 Business Days</span></td>
          </tr>
          <tr>
            <td><strong>SME Time Allocation</strong></td>
            <td>Confirmed calendar holds for nominated SMEs (2 hours/week for testing & validation)</td>
            <td><strong>Department Heads</strong></td>
            <td><span class="badge-pill badge-green">At Signing</span></td>
          </tr>
          <tr>
            <td><strong>Cloud Sandbox VPC</strong></td>
            <td>Client-provisioned VPC / Sandbox environment with foundation model API quotas approved</td>
            <td><strong>CTO / Cloud Ops</strong></td>
            <td><span class="badge-pill badge-amber">10 Business Days</span></td>
          </tr>
        </tbody>
      </table>

      <!-- STOP-THE-CLOCK PROTECTION CALLOUT -->
      <div class="card-box" style="border-left: 4px solid #D97706; background: #FFFBEB; margin-top: 10px;">
        <strong style="color: #92400E; display: block; margin-bottom: 3px;">Institutional Safeguard: Stop-the-Clock Clause</strong>
        <p style="margin: 0; font-size: 9pt; color: #78350F; line-height: 1.45;">
          If client-side data delivery, credential provisioning, or SME availability slips beyond the agreed deadlines, the active pilot sprint clock automatically pauses until all prerequisites are validated in writing. This ensures delivery pod capacity is not stranded while awaiting internal client sign-offs.
        </p>
      </div>
    </div>
  </div>

  <!-- SECTION 2: POST-PILOT GATES & COMMERCIAL SAFEGUARDS -->
  <div>
    <div class="section-title">2. Post-Pilot Production Go-Live Gates & Authorization Sign-off</div>
    
    <p style="font-size: 9.5pt; color: #475569; margin-bottom: 10px;">
      At the conclusion of the 4-to-6 week active sandbox sprint, the joint Steering Committee evaluates empirical metrics against four strict <strong>Post-Pilot Production Go-Live Gates</strong> before authorizing live enterprise-wide deployment:
    </p>

    <table class="table-custom">
      <thead>
        <tr>
          <th style="width: 25%;">Decision Gate</th>
          <th style="width: 35%;">Evaluation Method</th>
          <th style="width: 20%;">Pass Condition</th>
          <th style="width: 20%;">Accountable Lead</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Gate 1: Accuracy & Fidelity</strong></td>
          <td>Automated evaluation against 200 ground-truth golden test cases</td>
          <td>&ge; 95.0% Accuracy</td>
          <td>AI Solutions Architect</td>
        </tr>
        <tr>
          <td><strong>Gate 2: Security & PII Redaction</strong></td>
          <td>Adversarial red-teaming and prompt-injection stress testing</td>
          <td>Zero PII Leaks</td>
          <td>CISO / InfoSec Sponsor</td>
        </tr>
        <tr>
          <td><strong>Gate 3: End-User Usability</strong></td>
          <td>Department super-user evaluation across 5 business workflows</td>
          <td>&ge; 80% User Satisfaction</td>
          <td>Department Business Sponsor</td>
        </tr>
        <tr>
          <td><strong>Gate 4: Unit Economics</strong></td>
          <td>Inference token cost per completed workflow calculation</td>
          <td>Within Target OPEX Budget</td>
          <td>Corporate Controller</td>
        </tr>
      </tbody>
    </table>

    <!-- 2.2 PILOT SCOPE FREEZE & NO-BLAME EARLY TERMINATION CLAUSES -->
    <div class="grid-2" style="margin-top: 14px;">
      <div class="card-box" style="border-top: 3px solid #0F766E; background: #F0FDFA;">
        <strong style="color: #115E59; display: block; margin-bottom: 6px; font-size: 9.5pt;">Pilot Scope Freeze Protocol</strong>
        <p style="margin: 0; font-size: 8.5pt; color: #134E4A; line-height: 1.45;">
          The Pilot Sprint evaluates strictly the Candidate Workstreams enumerated in this dossier. Any additional capability requests, feature enhancements, or adjacent departmental use cases proposed during the sprint are formally logged for Wave 2+ scoping and shall not alter current sprint deliverables without a mutually executed Change Order.
        </p>
      </div>

      <div class="card-box" style="border-top: 3px solid #2563EB; background: #EFF6FF;">
        <strong style="color: #1E40AF; display: block; margin-bottom: 6px; font-size: 9.5pt;">No-Blame Early Termination (Client Right)</strong>
        <p style="margin: 0; font-size: 8.5pt; color: #1E3A8A; line-height: 1.45;">
          If at any point during the Pilot Sprint ${tenantName} determines in its sole discretion that the AI capability is unlikely to achieve target acceptance thresholds, ${tenantName} may terminate the pilot upon 5 business days' written notice. Nisol AI shall invoice solely for services actually rendered to date, and ${tenantName} retains all generated prompts, test harnesses, and scripts at zero additional charge.
        </p>
      </div>
    </div>

    <!-- FORMAL GATE 0 AUTHORIZATION PROTOCOL -->
    <div class="card-box" style="border-left: 4px solid #0D9488; margin-top: 14px;">
      <strong style="color: #134E4A; font-size: 10.5pt; display: block; margin-bottom: 6px;">
        Formal Authorization Protocol: Gate 0 Approval
      </strong>
      <p style="margin: 0; font-size: 9pt; color: #334155;">
        By executing below, ${tenantName} authorizes Nisol AI to initiate the Sandbox Pilot Sprint under the terms, data dependency requirements, scope freeze boundaries, and quantitative acceptance criteria outlined in this dossier.
      </p>
    </div>

    <div class="grid-2" style="margin-top: 20px;">
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 18px;">
        <div style="font-weight: 700; color: #134E4A; margin-bottom: 35px;">For: ${tenantName} Evaluation Sponsor</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 6px;"></div>
        <div style="font-size: 8.5pt; color: #64748B;">Product Leader / VP Sponsor Signature & Date</div>
      </div>
      <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 18px;">
        <div style="font-weight: 700; color: #134E4A; margin-bottom: 35px;">For: Nisol AI Advisory</div>
        <div style="border-bottom: 1px solid #94A3B8; margin-bottom: 6px;"></div>
        <div style="font-size: 8.5pt; color: #64748B;">Lead AI Solutions Architect Signature & Date</div>
      </div>
    </div>
  </div>

</body>
</html>
  `;
}
