// src/lib/report/departmentEngine.ts

import { BusinessContextJSON, DepartmentScorecard, UseCaseItem } from "./types";

interface DepartmentProfile {
  name: string;
  aliases: string[];
  targetStakeholder: string;
  operationalFriction: string;
  targetOutcomes: string;
  hubAndSpokeModel: string;
  smeAsk: string;
}

const ENTERPRISE_15_DEPARTMENTS: DepartmentProfile[] = [
  {
    name: "Sales & Business Development",
    aliases: ["sales", "business development", "bd", "commercial", "revenue"],
    targetStakeholder: "Chief Commercial Officer / VP Sales",
    operationalFriction: "Reps spend 20+ hrs/wk drafting complex RFP bids and researching prospect firmographic intent manually.",
    targetOutcomes: "RAG Proposal Generator cuts bid turnaround from 3 days to 25 mins; Predictive lead scoring boosts conversion by +22%.",
    hubAndSpokeModel: "Sales VP controls pricing logic and margin guardrails; Nisol AI delivers the secure RAG proposal engine.",
    smeAsk: "1 Senior Sales Rep for 3 hrs/wk during Week 8 to calibrate winning proposal examples and rate cards.",
  },
  {
    name: "Marketing & Growth",
    aliases: ["marketing", "growth", "brand", "demand gen"],
    targetStakeholder: "Chief Marketing Officer (CMO)",
    operationalFriction: "80+ hrs/wk spent manually drafting and formatting multi-channel A/B ad variations across regional segments.",
    targetOutcomes: "Generative Content Engine synthesizes 50 localized variants in seconds; +15% conversion lift without agency spend.",
    hubAndSpokeModel: "CMO retains 100% creative control; AI functions as a high-velocity drafting accelerator.",
    smeAsk: "1 Content Lead for 2 hrs/wk to calibrate brand tone-of-voice and style guidelines.",
  },
  {
    name: "Finance & Accounting",
    aliases: ["finance", "accounting", "accounts", "treasury"],
    targetStakeholder: "Chief Financial Officer / Corporate Controller",
    operationalFriction: "15,000 invoices/month with 5 manual touches each; 10-day month-end financial close cycle across ledgers.",
    targetOutcomes: "Multi-modal OCR cuts touches from 5 to 1; Real-time reconciliation compresses close cycle from 10 days to 4 days.",
    hubAndSpokeModel: "Finance Controller retains full approval thresholds and exception signing authority.",
    smeAsk: "1 Accounting Lead for 4 hrs/wk in Weeks 8–10 to review sample invoice extractions in staging sandbox.",
  },
  {
    name: "Customer Support & CX",
    aliases: ["customer support", "customer service", "cx", "support", "client success"],
    targetStakeholder: "VP Customer Experience / Support",
    operationalFriction: "High agent burnout; 40% of tier-1 tickets are repetitive password, billing, and status inquiries.",
    targetOutcomes: "In-line Agent Co-Pilot auto-drafts responses from historical ticket archives, reducing AHT by 40%.",
    hubAndSpokeModel: "Support VP reviews response templates; human-in-the-loop agent approves before sending.",
    smeAsk: "2 Senior Agents for 3 hrs in sandbox to validate draft suggestion accuracy.",
  },
  {
    name: "Software Engineering",
    aliases: ["engineering", "software", "development", "dev"],
    targetStakeholder: "VP Engineering / CTO",
    operationalFriction: "Senior engineers spend 15 hrs/wk writing boilerplate regression suites and conducting manual code reviews.",
    targetOutcomes: "AI agent auto-generates Playwright/Cypress end-to-end tests, recovering 10 dev hours/week per senior engineer.",
    hubAndSpokeModel: "Engineering VP retains full git merge controls; AI runs strictly as a CI/CD checking pipeline.",
    smeAsk: "1 QA Lead for 4 hrs/wk to review initial 20 auto-generated Playwright tests.",
  },
  {
    name: "IT Operations & Cloud",
    aliases: ["it", "it operations", "cloud", "sre", "infrastructure"],
    targetStakeholder: "Chief Information Officer / VP IT Operations",
    operationalFriction: "6-hour MTTR on server alerts; manual VPN and SaaS ticket provisioning backlogs.",
    targetOutcomes: "Autonomous IT Helpdesk Bot resolves 55% of L1 access requests in <60 seconds, cutting ticket backlog by 45%.",
    hubAndSpokeModel: "CIO sets access boundaries and SSO roles; bot operates under strict least-privilege tokens.",
    smeAsk: "1 Sysadmin for 2 hrs/wk to test Jira/Slack provisioning action scripts.",
  },
  {
    name: "InfoSec & Data Privacy",
    aliases: ["security", "infosec", "cybersecurity", "privacy", "ciso"],
    targetStakeholder: "Chief Information Security Officer (CISO) / DPO",
    operationalFriction: "Zero visibility into employee shadow AI usage; high risk of proprietary IP and customer PII exfiltration.",
    targetOutcomes: "Zero-retention enterprise proxy with inline PII masking, guaranteeing 100% audit logging.",
    hubAndSpokeModel: "CISO controls DLP regex patterns and compliance inspection logs.",
    smeAsk: "1 SecOps Analyst for 2 hrs to review tokenization proxy architecture and audit logging.",
  },
  {
    name: "Legal & Compliance",
    aliases: ["legal", "compliance", "regulatory", "risk"],
    targetStakeholder: "General Counsel / Chief Compliance Officer",
    operationalFriction: "200+ vendor NDAs and master service agreements reviewed monthly with 5-7 business day backlog.",
    targetOutcomes: "RAG contract review highlights non-standard clauses and flags deviations in <5 minutes, cutting turnaround by 70%.",
    hubAndSpokeModel: "General Counsel establishes fallback clause taxonomy; AI never signs or executes contracts.",
    smeAsk: "1 In-house Counsel for 3 hrs in Week 8 to calibrate acceptable standard clauses.",
  },
  {
    name: "Human Resources",
    aliases: ["human resources", "hr", "people", "talent"],
    targetStakeholder: "Chief Human Resources Officer (CHRO)",
    operationalFriction: "HR team spends 35% of weekly capacity answering redundant policy, leave, and benefits questions.",
    targetOutcomes: "Enterprise HR Knowledge Assistant resolves 60% of routine policy queries citing employee handbook.",
    hubAndSpokeModel: "CHRO controls policy source documents and approves cultural communication tone.",
    smeAsk: "1 HR Coordinator for 2 hrs to verify handbook question-and-answer accuracy.",
  },
  {
    name: "Operations & Logistics",
    aliases: ["operations", "logistics", "supply chain", "warehouse"],
    targetStakeholder: "Chief Operating Officer / VP Supply Chain",
    operationalFriction: "Buffer stock over-allocations and sudden component stockouts tie up working capital in static warehouses.",
    targetOutcomes: "Dynamic ML demand forecasting balances sales pipeline velocity against supplier lead times, reducing holding costs by 18%.",
    hubAndSpokeModel: "Supply Chain Lead adjusts demand thresholds and safety buffer overrides.",
    smeAsk: "1 Operations Planner for 3 hrs/wk to inspect demand forecasting historical curves.",
  },
  {
    name: "Procurement & Sourcing",
    aliases: ["procurement", "sourcing", "purchasing", "vendor management"],
    targetStakeholder: "Head of Procurement",
    operationalFriction: "Inconsistent vendor rate cards and uncoordinated departmental purchasing cause 3-5% spend leakage.",
    targetOutcomes: "Continuous AI audit tool scanning vendor contracts and purchase orders to flag duplicate rates and unauthorized discounts.",
    hubAndSpokeModel: "Procurement Head controls supplier negotiation limits; AI handles contract comparison.",
    smeAsk: "1 Sourcing Manager for 2 hrs/wk to review supplier rate card comparisons.",
  },
  {
    name: "Quality Assurance & Testing",
    aliases: ["qa", "quality assurance", "testing"],
    targetStakeholder: "Head of Quality & Software Compliance",
    operationalFriction: "Manual regression test cycles delay weekly releases by 48–72 hours before deployment.",
    targetOutcomes: "Automated test case generation from Jira stories compresses pre-release regression window from 3 days to 4 hours.",
    hubAndSpokeModel: "QA Lead sets coverage thresholds (>85%) and defines flaky-test exclusion rules.",
    smeAsk: "1 Senior QA Engineer for 3 hrs/wk during sandbox integration sprint.",
  },
  {
    name: "Data, BI & Analytics",
    aliases: ["data", "analytics", "bi", "business intelligence"],
    targetStakeholder: "Chief Data Officer / Head of BI",
    operationalFriction: "Data analysts overwhelmed writing custom SQL queries for non-technical business managers with 2-week backlog.",
    targetOutcomes: "Text-to-SQL Semantic Agent allows department heads to query data warehouses in plain English, cutting backlog by 65%.",
    hubAndSpokeModel: "CDO controls database read-only views, column masking, and semantic metric definitions.",
    smeAsk: "1 BI Lead for 4 hrs/wk to validate SQL generation against core business definitions.",
  },
  {
    name: "Product Management & R&D",
    aliases: ["product", "r&d", "research", "innovation"],
    targetStakeholder: "Chief Product Officer (CPO)",
    operationalFriction: "Hundreds of hours of user research recordings sit unindexed, causing product teams to repeat discovery cycles.",
    targetOutcomes: "Multimodal RAG synthesizes user interview transcripts into actionable feature matrices, cutting discovery time by 50%.",
    hubAndSpokeModel: "CPO defines roadmap priority filters; AI synthesizes unstructured customer quotes.",
    smeAsk: "1 Product Manager for 2 hrs/wk to review synthesized feature insights.",
  },
  {
    name: "Corporate Strategy & PMO",
    aliases: ["strategy", "pmo", "executive", "leadership"],
    targetStakeholder: "Chief of Staff / VP Strategy",
    operationalFriction: "30+ project managers spend Fridays manually chasing updates across Jira/Slack and formatting status decks.",
    targetOutcomes: "Autonomous PMO Agent aggregates Jira/Slack/Git updates into executive flight-deck reports, saving 500+ PM hours monthly.",
    hubAndSpokeModel: "Chief of Staff sets executive reporting templates and milestone health definitions.",
    smeAsk: "1 PMO Lead for 2 hrs/wk to calibrate executive project health status formats.",
  },
];

export function generateDepartmentScorecards(
  context: BusinessContextJSON,
  useCases: UseCaseItem[],
  planTier?: string
): DepartmentScorecard[] {
  const isSpark = planTier?.toLowerCase().trim() === "spark";

  let targetProfiles = ENTERPRISE_15_DEPARTMENTS;

  if (isSpark) {
    // Nisol Spark picks 3 core departments: Leadership (Strategy), Change/Risk (InfoSec), and 1 Functional Department (e.g. Sales/IT/HR/Finance)
    const leadershipDept =
      ENTERPRISE_15_DEPARTMENTS.find((d) => d.name.includes("Corporate Strategy")) ||
      ENTERPRISE_15_DEPARTMENTS[14];

    const changeDept =
      ENTERPRISE_15_DEPARTMENTS.find((d) => d.name.includes("InfoSec")) ||
      ENTERPRISE_15_DEPARTMENTS[6];

    let functionalDept = ENTERPRISE_15_DEPARTMENTS.find(
      (d) =>
        d !== leadershipDept &&
        d !== changeDept &&
        useCases.some(
          (uc) =>
            uc.department.toLowerCase().includes(d.name.toLowerCase()) ||
            d.aliases.some((alias) => uc.department.toLowerCase().includes(alias))
        )
    );

    if (!functionalDept) {
      functionalDept = ENTERPRISE_15_DEPARTMENTS[0]; // Fallback to Sales
    }

    targetProfiles = [leadershipDept, changeDept, functionalDept];
  }

  return targetProfiles.map((deptProfile) => {
    const deptUseCases = useCases.filter(
      (uc) =>
        uc.department.toLowerCase().includes(deptProfile.name.toLowerCase()) ||
        deptProfile.aliases.some((alias) => uc.department.toLowerCase().includes(alias))
    );
    const quickWins = deptUseCases.filter((uc) => uc.category === "Quick Win").length;

    // Baseline score calculation per department
    const sectionScore =
      context.sectionScores[deptProfile.name] ||
      context.overallMaturityScore ||
      2.1;
    const score = Math.round(sectionScore * 20); // 1-5 to 20-100 scale

    let maturityLevel = "Developing Baseline";
    if (score >= 80) maturityLevel = "Advanced Optimizing";
    else if (score >= 60) maturityLevel = "Structured Baseline";
    else if (score >= 40) maturityLevel = "Emerging Capability";

    return {
      department: deptProfile.name,
      maturityScore: score,
      maturityLevel,
      painPointsCount: Math.floor(Math.random() * 2) + 3,
      topOpportunitiesCount: Math.max(1, deptUseCases.length),
      quickWinsCount: quickWins,
      estimatedRoi: score < 70 ? "High (>300%)" : "Medium (180-250%)",
      estimatedTimeline: "4 - 8 Weeks",
      painPoints: [
        deptProfile.operationalFriction,
        `Siloed communication and manual coordination loops across ${deptProfile.name}`,
        `Lack of centralized automated intelligence synthesis`,
      ],
      topRecommendations: [
        deptProfile.targetOutcomes,
        `Establish centralized knowledge indexing under ${deptProfile.hubAndSpokeModel}`,
        `Enroll designated departmental lead for ${deptProfile.smeAsk}`,
      ],
      targetStakeholder: deptProfile.targetStakeholder,
      operationalFriction: deptProfile.operationalFriction,
      targetOutcomes: deptProfile.targetOutcomes,
      hubAndSpokeModel: deptProfile.hubAndSpokeModel,
      smeAsk: deptProfile.smeAsk,
    };
  });
}
