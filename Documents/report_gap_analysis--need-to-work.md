# Report Section — Gap Analysis
### *Thinking like KPMG / PwC / McKinsey*

---

## What You Have Today

The report has **8 tabs** across the full intelligence pipeline:

| # | Tab | What's There |
|---|-----|-------------|
| 1 | Executive Summary | Single editable text block |
| 2 | Readiness & Radar | SVG spider/radar chart + editable JSON |
| 3 | Opportunity Matrix | 2×2 quadrant cards (Quick Wins, Bets, Incremental, Long-Term) |
| 4 | Top 20 Use Cases | AI-generated use-case cards with department + ROI% |
| 5 | Transformation Roadmap | 4-phase timeline (30 / 90 / 180 / 365 days) |
| 6 | ROI Analysis | 4 KPI cards + dept breakdown, editable JSON |
| 7 | Solution Blueprints | Blueprint cards with tech stack + implementation steps |
| 8 | Proposal Draft | Pricing engine + template-variable markdown + Word/PDF export |

---

## 🔴 Critical Gaps — Missing Entirely

These are standard deliverables in every Big-4 / MBB AI advisory report.

### 1. No Cover Page / Title Slide
Every KPMG / McKinsey report begins with a branded cover containing:
- Client name, logo placeholder
- Report title (e.g., *"AI Readiness & Transformation Assessment"*)
- Engagement date & version
- Prepared by (Nisol AI) + Confidentiality level
- Document control number

**Currently:** No dedicated `CoverTab` or report header block exists. The PDF export jumps straight into content.

---

### 2. No Competitive Benchmarking Section
Top consulting firms always anchor findings in **industry peer comparisons**:
- *"Your AI Maturity Score is 3.4/5.0 — the sector median for Manufacturing is 3.8"*
- Peer company anonymized benchmarks (e.g., Top Quartile, Median, Bottom Quartile)
- Gap-to-leader analysis: *"Closing this gap is worth ₹X Cr annually"*

**Currently:** The maturity radar shows the client's scores vs. a static internal target (+1.0 added mechanically). There is **zero external benchmarking data** or industry context.

---

### 3. No Risk & Governance Assessment
Every AI transformation report from a credible firm includes a **Risk Register**:
- Regulatory / Compliance risks (DPDP Act, GDPR, AI Act)
- Data privacy and sovereignty risks
- Model bias & hallucination risk
- Change management & adoption risk
- Vendor lock-in & technology dependency risk
- Cybersecurity risks introduced by AI

**Currently:** The maturity radar has a "Security & Compliance" axis but no dedicated risk register, no risk scoring matrix (Likelihood × Impact), and no mitigation strategies per risk.

---

### 4. No Organizational Change Management (OCM) Plan
MBB firms dedicate an entire chapter to this. AI transformations fail at ~70% rate due to people/culture, not technology:
- Stakeholder impact analysis (who is affected, how)
- Roles & responsibilities matrix (RACI)
- Training & upskilling plan by role
- Communication plan
- Change adoption KPIs

**Currently:** No OCM section exists anywhere in the report.

---

### 5. No Data Readiness Assessment
The number-one blocker for AI projects is data quality. This section is mandatory:
- Data inventory / data catalog status
- Data quality score by domain (completeness, accuracy, timeliness)
- Data governance maturity
- Gaps required before AI implementation (data labeling, pipelines, warehousing)
- Estimated data prep cost (often 60–70% of total project cost)

**Currently:** Not a single data-readiness field exists in the questionnaire or report. This is a **major credibility gap** — you cannot quote ROI estimates without grounding them in data readiness.

---

### 6. No Dependency / Pre-requisites Mapping
Before recommending use cases, consulting reports identify **what must be in place first**:
- Technology pre-requisites per initiative
- Integration complexity (legacy systems, API availability)
- Skill gaps that must be bridged
- Regulatory approvals needed

**Currently:** Roadmap phases show initiatives but have no dependency graph, no pre-requisite checklist, no integration complexity rating.

---

### 7. No Strategic Fit / Alignment Section
McKinsey always ties recommendations back to the **client's stated strategic objectives**:
- Company's stated 3-year / 5-year strategy
- How each AI initiative maps to a strategic priority
- A "Strategy Alignment Matrix" showing which initiatives deliver which strategic outcomes

**Currently:** Use cases and blueprints float independently with no link back to the client's business strategy.

---

## 🟡 Significant Gaps — Partially Implemented But Weak

### 8. Executive Summary is a Single Text Block
**What it is:** A plain editable `<textarea>` saved as a string.

**What KPMG delivers:**
- **Situation:** 2–3 sentences on the client's current state
- **Complication:** The specific AI readiness gap or urgency
- **Resolution:** The recommended transformation path
- **Key Financials at a Glance:** Total investment, 5-year ROI, payback period, # of initiatives — all pulled dynamically from the other tabs
- **Top 3 Executive Recommendations** as clear, numbered bullets

**Gap:** There's no structured template, no auto-pulled KPI summary block, no hierarchy.

---

### 9. ROI Tab — Missing Charts & Sensitivity Analysis
**What's there:** 4 static KPI cards (total investment, annual savings, payback, ROI%) + a department table.

**What consulting firms show:**
- **5-Year Cumulative Cash Flow Chart** (bar/line chart showing break-even crossing point)
- **Sensitivity Analysis Table:** What if adoption is 10% lower? What if implementation takes 20% longer?
- **NPV (Net Present Value)** calculation at a discount rate
- **Benefit realization timeline** — when does each benefit start accruing?
- **Benefit categorization:** Hard savings (FTE reduction, cost avoidance) vs Soft benefits (revenue uplift, NPS improvement)

**Current code:** The `roiCalculator` utility computes `annual_cost_savings_usd`, `payback_period_months`, `overall_roi_percentage` but there are **no charts rendered**, only text numbers. The `scratch_roi.txt` planning doc has much richer formulas that were never implemented in the UI.

---

### 10. Roadmap — No Owner / Budget / Dependency Fields
**What's there:** 4 phase columns (30/90/180/365 days) with initiative title, description, and a success metric.

**What's missing:**
- Initiative owner / accountable team
- Budget allocation per phase
- Dependencies between initiatives
- Status tracking (Not Started / In Progress / Complete)
- Milestone dates (not just generic "30 days" but actual calendar dates based on engagement start)
- Gantt-style visual (currently just 4 boxes in a grid)

---

### 11. Opportunity Matrix — Cards are Names Only
**What's there:** 4 quadrant boxes showing initiative name + department label.

**What consulting firms show:**
- **Bubble chart** where X = feasibility, Y = value, bubble size = estimated ROI \$
- Each bubble labeled with initiative name
- Tooltip on hover with full details
- Estimated cost-to-implement and benefit for each item

**Current code:** `OpportunityMatrix.tsx` renders simple name-only `<div>` cards. No axis visualization, no sizing by ROI magnitude.

---

### 12. Proposal Tab — Pricing is Only Advisory Engagement Pricing
**What's there:** A pricing calculator for the *consulting engagement* (daily rate × days = total).

**What's missing from a full proposal:**
- **Total Program Investment** — the actual cost to *implement* all AI use cases (separate from the advisory fee)
- **Phased investment schedule** aligned to the roadmap phases
- **Expected benefits schedule** showing when benefits start accruing
- **Investment-vs-Return waterfall chart**
- **Scope of work table** with deliverable-by-deliverable breakdown
- **Terms & Conditions / SLA** section
- **Annexures** reference section

---

### 13. Use Cases — No Prioritization Score / Ranking Table
**What's there:** A 2-column grid of use-case cards with department, ROI%, name, description, and tech stack.

**What's missing:**
- **Prioritization scoring table** with columns: Strategic Fit, ROI Potential, Ease of Implementation, Data Readiness, Risk — each scored 1–5, summed for a composite priority score
- **Rank order** (Use Case #1, #2 … not just an unordered grid)
- **Quick Win flag** clearly surfaced per card
- **Estimated FTE savings** per use case
- **Time-to-value** (weeks to first value realization)

---

## 🟢 Cosmetic / UX Gaps

### 14. No Report-Level Metadata Header
There is no persistent header on the report page showing:
- Client company name + industry
- Overall maturity score badge (e.g., "3.4 / 5.0 — Developing")
- Audit date / report version
- Report status (Draft / Under Review / Final / Approved)

### 15. No Report Versioning / History
Consulting firms deliver v0.1 → v0.2 → Final versions with change tracking. No version control or audit trail exists.

### 16. No Collaboration / Reviewer Comments
No ability for a second consultant or client stakeholder to leave comments or annotations on specific sections.

### 17. PDF Export Uses `window.print()` for Blueprints Page
The Blueprint Library's "Export PDF" button calls `window.print()` — this is a placeholder. It does not produce a branded, formatted report like the main `PDFExporter` component does.

### 18. No Page Numbering / Section Headers in PDF
The existing PDF export API assembles HTML sections but has no global page-number footer, section break headers, or chapter numbering that a professional report requires.

---

## Priority Build Order (McKinsey "80/20" View)

| Priority | Gap | Effort | Client Credibility Impact |
|----------|-----|--------|--------------------------|
| 🔴 P0 | **Competitive Benchmarking** | Medium | Very High |
| 🔴 P0 | **Risk & Governance Register** | Medium | Very High |
| 🔴 P0 | **Data Readiness Assessment** | High | Very High |
| 🔴 P0 | **Executive Summary structured template** | Low | High |
| 🟡 P1 | **ROI 5-Year Chart + Sensitivity Analysis** | Medium | High |
| 🟡 P1 | **Opportunity Matrix Bubble Chart** | Medium | High |
| 🟡 P1 | **Use Case Prioritization Scoring Table** | Low | High |
| 🟡 P1 | **Roadmap — owner + budget + Gantt view** | Medium | High |
| 🟠 P2 | **OCM / Change Management Section** | High | Medium |
| 🟠 P2 | **Report Cover Page Tab** | Low | Medium |
| 🟠 P2 | **Strategic Fit Alignment Matrix** | Medium | Medium |
| 🟠 P2 | **Report metadata header bar** | Low | Medium |

---

> *"A McKinsey report is 30% analysis and 70% how it's framed. Right now you have the skeleton — what's missing is the flesh that makes a client sign the cheque."*
