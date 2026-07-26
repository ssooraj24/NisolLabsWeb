-- ============================================
-- 1. ENUMS
-- ============================================
-- Added 'consultant' role so internal staff aren't all "admins"
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'consultant', 'client');

-- ============================================
-- 2. TENANTS (was Companies)
-- ============================================
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  -- ADDED: Industry metadata for benchmarking
  industry TEXT, 
  employee_count INT,
  revenue_range TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. PROFILES (Auth Extension)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. AUDITS (Was Workshops)
-- ============================================
CREATE TABLE public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL, -- e.g. "Q1 2026 AI Maturity Assessment"
  conducted_by UUID REFERENCES public.profiles(id),
  conducted_at TIMESTAMPTZ DEFAULT now(),
  
  -- Statuses: draft, data_collection, data_collected, in_analysis, report_ready
  status TEXT DEFAULT 'draft',
  notes TEXT,

  -- ⭐⭐⭐ THE MOST IMPORTANT COLUMN ⭐⭐⭐
  -- Stores ALL 62 answers as JSON.
  -- Structure: { "1": { "text": "...", "score": 2 }, "2": {...} }
  raw_responses JSONB DEFAULT '{}'::jsonb,

  -- Cached overall score for fast dashboard loading (updated after analysis)
  overall_maturity_score NUMERIC(3, 2), -- e.g. 3.80 out of 5.00

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 5. AUDIT MATURITY SCORES (Pillar Breakdowns)
-- ============================================
CREATE TABLE public.audit_maturity_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
  
  -- e.g. 'Leadership & Strategy', 'Data & Analytics', 'IT / Technology'
  pillar_name TEXT NOT NULL, 
  
  -- Score out of 5.00 (e.g., 3.50)
  maturity_score NUMERIC(3, 2) NOT NULL, 
  
  -- AI-generated or Consultant-added recommendations for THIS pillar
  recommendations TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. QUESTIONS TABLE (Unchanged from before)
-- ============================================
CREATE TABLE public.questions (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  order_index INT NOT NULL,
  question_text TEXT NOT NULL,
  tip_discussion TEXT,
  triggered_patterns TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- (INSERT YOUR 62 QUESTIONS HERE using the previous script)

-- ============================================
-- 7. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_audits_tenant_id ON public.audits(tenant_id);
CREATE INDEX idx_audits_conducted_by ON public.audits(conducted_by);
CREATE INDEX idx_audits_status ON public.audits(status);
CREATE INDEX idx_audits_conducted_at ON public.audits(conducted_at);
CREATE INDEX idx_profiles_tenant_id ON public.profiles(tenant_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_audit_maturity_scores_audit_id ON public.audit_maturity_scores(audit_id);

-- ============================================
-- 8. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 9. ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_maturity_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- ---------------------
-- Helper Functions
-- ---------------------
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION get_user_tenant()
RETURNS UUID AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION is_internal_user()
RETURNS BOOLEAN AS $$
  SELECT role IN ('super_admin', 'admin', 'consultant') FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

-- ---------------------
-- RLS Policies for TENANTS
-- ---------------------
CREATE POLICY "Internal users see all tenants" ON public.tenants
  FOR SELECT USING (is_internal_user());
CREATE POLICY "Clients see own tenant" ON public.tenants
  FOR SELECT USING (id = get_user_tenant());
CREATE POLICY "Internal users manage tenants" ON public.tenants
  FOR ALL USING (is_internal_user());

-- ---------------------
-- RLS Policies for AUDITS
-- ---------------------
CREATE POLICY "Internal users see all audits" ON public.audits
  FOR SELECT USING (is_internal_user());
CREATE POLICY "Clients read-only own audits" ON public.audits
  FOR SELECT USING (tenant_id = get_user_tenant());
CREATE POLICY "Internal users create audits" ON public.audits
  FOR INSERT WITH CHECK (is_internal_user());
CREATE POLICY "Internal users update audits" ON public.audits
  FOR UPDATE USING (is_internal_user()) WITH CHECK (is_internal_user());
CREATE POLICY "Internal users delete audits" ON public.audits
  FOR DELETE USING (is_internal_user());

-- ---------------------
-- RLS Policies for AUDIT MATURITY SCORES
-- ---------------------
-- Inherits access via audit_id
CREATE POLICY "Users can view scores via audit" ON public.audit_maturity_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.audits 
      WHERE audits.id = audit_maturity_scores.audit_id 
      AND (is_internal_user() OR audits.tenant_id = get_user_tenant())
    )
  );
CREATE POLICY "Internal users manage scores" ON public.audit_maturity_scores
  FOR ALL USING (is_internal_user());

-- ---------------------
-- RLS Policies for QUESTIONS
-- ---------------------
CREATE POLICY "Anyone can read questions" ON public.questions
  FOR SELECT USING (true);
CREATE POLICY "Admins manage questions" ON public.questions
  FOR ALL USING (get_user_role() IN ('super_admin', 'admin'));

-- ---------------------
-- RLS Policies for PROFILES
-- ---------------------
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid() OR is_internal_user());
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());

  -- ============================================
-- INSERT ALL 62 QUESTIONS
-- ============================================

INSERT INTO public.questions (section, order_index, question_text, tip_discussion, triggered_patterns) VALUES

-- ============================================
-- SECTION 1: Leadership & Strategy (1-5)
-- ============================================
('Leadership & Strategy', 1, 
 'What is the organization''s top-level strategic vision for AI over the next 3 years?',
 'Look for specifics: Is there a formal AI roadmap? Is AI mentioned in the annual report? Who is driving it—CEO, CTO, or a dedicated CAIO?',
 ARRAY['AI Strategy Advisor', 'Innovation Portfolio Manager']),

('Leadership & Strategy', 2, 
 'Who holds the ultimate decision-making authority and budget for AI investments?',
 'Identify if this is the CEO, CTO, CIO, or a dedicated CAIO. Check if budget is centralized (one pool) or distributed across departments.',
 ARRAY['Governance Framework Setup', 'Executive Dashboard']),

('Leadership & Strategy', 3, 
 'How does the organization currently measure the success of technology or digital transformation initiatives?',
 'Probe for specific KPIs: ROI, time-to-market, efficiency gains, cost savings, or user adoption rates. Are these tracked systematically?',
 ARRAY['Transformation KPI Tracker', 'Value Realization Office']),

('Leadership & Strategy', 4, 
 'Has the organization undergone any major digital transformations in the last 3 years, and if so, what were the outcomes?',
 'Understand their change appetite. Did they succeed? Fail? What were the cultural impacts? This reveals their readiness for AI-led change.',
 ARRAY['Change Management Predictor', 'Legacy Migration Planner']),

('Leadership & Strategy', 5, 
 'Is there a formal AI ethics, governance, or responsible AI policy currently in place?',
 'Ask about responsible AI, bias testing, transparency requirements, and who oversees ethical AI usage.',
 ARRAY['AI Governance Framework', 'Bias Detection Suite']),

-- ============================================
-- SECTION 2: IT / Technology (6-10)
-- ============================================
('IT / Technology', 6, 
 'What is the current state of your cloud infrastructure (On-prem, Hybrid, Cloud-native)?',
 'Assess maturity: Are they lifting-and-shifting legacy apps, or building cloud-native microservices? Do they use containers (Docker/K8s)?',
 ARRAY['Cloud Optimization Agent', 'Application Modernization Planner']),

('IT / Technology', 7, 
 'How mature is your API ecosystem and system integration capability?',
 'Do they have an API gateway? Are systems tightly coupled (point-to-point) or loosely coupled (event-driven)?',
 ARRAY['API Discovery & Governance', 'Integration Accelerator']),

('IT / Technology', 8, 
 'What does your current software development lifecycle (SDLC) and DevOps velocity look like?',
 'Probe for deployment frequency, lead time for changes, mean time to recovery (MTTR). Do they practice CI/CD?',
 ARRAY['DevOps Assistant', 'CI/CD Pipeline Optimizer']),

('IT / Technology', 9, 
 'What are the top 3 legacy systems or technical debts that are currently constraining your business?',
 'Identify mainframe, outdated ERPs, or custom monolithic code that hinders AI adoption and integration.',
 ARRAY['Legacy Modernization Copilot', 'Technical Debt Analyzer']),

('IT / Technology', 10, 
 'How do you currently manage vendor lock-in risk for your core technology platforms?',
 'Are there open-source alternatives? Are their contracts flexible? Do they have a multi-cloud or hybrid strategy?',
 ARRAY['Vendor Risk Intelligence', 'Multi-Cloud Strategy Planner']),

-- ============================================
-- SECTION 3: Data & Analytics (11-15)
-- ============================================
('Data & Analytics', 11, 
 'How do you currently handle data quality monitoring? Who is responsible, and what tools are used?',
 'Probe: Is it proactive (automated) or reactive (manual checks)? Do they have data stewards? Are there data quality SLAs?',
 ARRAY['Data Quality Monitor', 'Data Profiling Agent']),

('Data & Analytics', 12, 
 'Is there a centralized data warehouse/lake, or are systems siloed?',
 'Determine the existence of a Single Source of Truth (SSOT). Are data pipelines ETL/ELT? Do they use tools like Snowflake, BigQuery, or Databricks?',
 ARRAY['Data Fabric Architect', 'Data Lakehouse Builder']),

('Data & Analytics', 13, 
 'How mature is your Master Data Management (MDM) for critical entities (e.g., Customer, Product, Supplier)?',
 'Are customer IDs consistent across Sales, Support, and Billing? Is there a golden record?',
 ARRAY['MDM Harmonization Tool', 'Entity Resolution AI']),

('Data & Analytics', 14, 
 'What is your current BI and reporting cadence? Is it real-time, daily, or weekly?',
 'Identify if decisions are made on stale data. Do they have self-service BI tools (PowerBI, Tableau) or rely on IT for every report?',
 ARRAY['Real-time Analytics Pipeline', 'Automated Reporting Assistant']),

('Data & Analytics', 15, 
 'Do you have a dedicated data science or advanced analytics team, and what is their primary focus?',
 'Probe for skill levels: Descriptive analytics (what happened), Predictive (what will happen), or Prescriptive (what should we do).',
 ARRAY['Talent Augmentation Planner', 'AI/ML Platform Setup']),

-- ============================================
-- SECTION 4: Security & Compliance (16-20)
-- ============================================
('Security & Compliance', 16, 
 'How mature is your cybersecurity posture, and do you have a formal incident response plan?',
 'Assess if they have a Security Operations Center (SOC) or rely on outsourcing. Do they conduct regular penetration testing?',
 ARRAY['AI Threat Intelligence', 'Automated Incident Response']),

('Security & Compliance', 17, 
 'Which regulatory frameworks apply to you (GDPR, HIPAA, SOC2, PCI-DSS, ISO 27001), and how are they managed?',
 'Are they manually audited (spreadsheets) or are controls automated with continuous compliance monitoring?',
 ARRAY['Compliance Automation Agent', 'Regulatory Change Tracker']),

('Security & Compliance', 18, 
 'How do you handle Data Privacy (PII) and sensitive data discovery?',
 'Is data classified at rest? Are there automated data masking or anonymization tools in place?',
 ARRAY['PII Discovery & Masking', 'Data Privacy Copilot']),

('Security & Compliance', 19, 
 'What is the current process for third-party vendor security assessments?',
 'Is it a manual checklist sent once a year, or is there continuous monitoring with security scores (e.g., BitSight, SecurityScorecard)?',
 ARRAY['Vendor Risk Intelligence', 'Automated Security Scoring']),

('Security & Compliance', 20, 
 'How quickly can you identify and patch newly discovered vulnerabilities in your environment?',
 'Measure their Mean Time to Remediate (MTTR). Do they have automated patch management?',
 ARRAY['Vulnerability Prioritizer', 'Patch Automation Bot']),

-- ============================================
-- SECTION 5: Customer Service (21-24)
-- ============================================
('Customer Service', 21, 
 'What is your current monthly ticket volume across all support channels?',
 'Is volume growing year-over-year? What is the peak season like? This helps size AI automation opportunities.',
 ARRAY['AI Chatbot', 'Agent Assist Tool']),

('Customer Service', 22, 
 'What channels do you support, and are they unified (Email, Chat, Social, Phone)?',
 'Siloed channels often lead to poor experiences. Check if they have an omnichannel platform (Zendesk, Freshdesk, Salesforce).',
 ARRAY['Omnichannel Routing AI', 'Unified Agent Desktop']),

('Customer Service', 23, 
 'Do you have a self-service knowledge base, and how is it maintained?',
 'Is it static PDFs or a dynamic, searchable wiki? Is it integrated with their ticketing system?',
 ARRAY['Knowledge Assistant', 'Self-Service Optimizer']),

('Customer Service', 24, 
 'How do you currently measure CSAT/NPS, and what is the average response and resolution time?',
 'Identify automation opportunities in post-call surveys and sentiment analysis.',
 ARRAY['Sentiment Analysis Engine', 'Predictive CSAT Analyzer']),

-- ============================================
-- SECTION 6: Sales (25-28)
-- ============================================
('Sales', 25, 
 'How mature is your CRM system, and how accurate is your sales forecasting?',
 'Compare forecast vs. actuals over the last 4 quarters. Is forecasting done by AI/ML or purely sales rep intuition?',
 ARRAY['Forecasting Intelligence', 'Deal Risk Predictor']),

('Sales', 26, 
 'How are proposals, quotes, and contracts currently generated?',
 'Is it manual (copy-paste from Word) or automated via a CPQ (Configure, Price, Quote) system?',
 ARRAY['Proposal Generator', 'CPQ (Configure Price Quote) AI']),

('Sales', 27, 
 'How do you prioritize leads and account scoring?',
 'Are they using BANT, CHAMP, or purely manual intuition? Is there a lead scoring model?',
 ARRAY['Lead Scoring AI', 'Next-Best-Action Recommender']),

('Sales', 28, 
 'Where are the biggest friction points in your sales cycle?',
 'Look for bottlenecks: legal review, compliance, pricing approvals, or lengthy procurement processes.',
 ARRAY['Sales Cycle Optimizer', 'Deal Acceleration AI']),

-- ============================================
-- SECTION 7: Marketing (29-32)
-- ============================================
('Marketing', 29, 
 'How do you currently personalize digital content for different customer segments?',
 'Is it dynamic in real-time (based on behavior) or static generic messaging sent to everyone?',
 ARRAY['Content Personalization AI', 'Segmentation Engine']),

('Marketing', 30, 
 'What automation tools do you use for ad buying (PPC/Programmatic) and SEO?',
 'Are campaigns optimized manually daily or algorithmically via AI bidding?',
 ARRAY['Ad Optimizer', 'SEO Content Generator']),

('Marketing', 31, 
 'How is marketing attribution (touchpoint tracking) currently handled?',
 'Challenges with multi-channel attribution are common. Are they using last-click, multi-touch, or algorithmic attribution?',
 ARRAY['Multi-Touch Attribution AI', 'Customer Journey Mapping']),

('Marketing', 32, 
 'What is the process for creating and distributing new marketing collateral?',
 'Is there a review bottleneck? Are they using DAM (Digital Asset Management) tools?',
 ARRAY['Creative Asset Generator', 'Marketing Calendar AI']),

-- ============================================
-- SECTION 8: Operations & Supply Chain (33-36)
-- ============================================
('Operations & Supply Chain', 33, 
 'How automated are your core operational processes (e.g., order-to-cash, procure-to-pay)?',
 'Identify manual handoffs between departments. Count the number of times a human touches a process.',
 ARRAY['Process Mining AI', 'Robotic Process Automation (RPA) Spotter']),

('Operations & Supply Chain', 34, 
 'How do you currently manage inventory, warehousing, or logistics visibility?',
 'For manufacturing: IoT sensors on machines. For retail: SKU-level tracking. For logistics: fleet tracking GPS.',
 ARRAY['Inventory Optimizer', 'Predictive Maintenance (Mfg)']),

('Operations & Supply Chain', 35, 
 'How do you collaborate with suppliers and manage disruptions?',
 'Probe for visibility into tier-2/tier-3 suppliers. Are they using supplier portals or email/Excel?',
 ARRAY['Supply Chain Risk Radar', 'Supplier Collaboration Portal']),

('Operations & Supply Chain', 36, 
 'What is your biggest operational bottleneck causing delays or cost overruns?',
 'Note: Is it labor shortages, machine downtime, shipping delays, or quality issues?',
 ARRAY['Bottleneck Analysis AI', 'Operational Efficiency Copilot']),

-- ============================================
-- SECTION 9: Finance (37-40)
-- ============================================
('Finance', 37, 
 'How are invoices received, processed, and approved in your accounts payable team?',
 'Count the number of manual touches. Are they using OCR for invoice extraction? What is the approval workflow?',
 ARRAY['Invoice Intelligence', 'Automated AP Processing']),

('Finance', 38, 
 'How long does your monthly/quarterly financial close and reconciliation process take?',
 'Speed of close indicates data integration maturity. Are they using spreadsheets for consolidation?',
 ARRAY['Financial Close Automation', 'Reconciliation AI']),

('Finance', 39, 
 'How do you handle Financial Planning & Analysis (FP&A) and forecasting?',
 'Are spreadsheets still heavily used? Is there a dedicated FP&A tool (Adaptive, Anaplan, etc.)?',
 ARRAY['FP&A Copilot', 'Predictive Budgeting AI']),

('Finance', 40, 
 'What is your current approach to fraud detection and transaction monitoring?',
 'Is it rule-based (static), or is there ML detection for anomalies?',
 ARRAY['Fraud Detection AI', 'Anomaly Monitoring System']),

-- ============================================
-- SECTION 10: HR / Talent (41-44)
-- ============================================
('HR', 41, 
 'How is recruitment sourcing, screening, and onboarding currently managed?',
 'Assess volume of resumes processed manually. Is there an ATS (Applicant Tracking System)?',
 ARRAY['Resume Screening AI', 'Recruiter Copilot']),

('HR', 42, 
 'How are Learning & Development (L&D) courses and training delivered and tracked?',
 'Are they personalized? Is completion tracked? Do they have an LMS (Learning Management System)?',
 ARRAY['L&D Recommender', 'Skills Gap Analyzer']),

('HR', 43, 
 'What tools support employee engagement and attrition tracking?',
 'Can they predict high-risk departures? Do they conduct pulse surveys?',
 ARRAY['Attrition Predictor', 'Engagement Sentiment Analyzer']),

('HR', 44, 
 'How are performance reviews and goal-setting (OKRs) managed across teams?',
 'Is it an annual pain point or continuous feedback? Is there a tool (Culture Amp, Lattice, 15Five)?',
 ARRAY['Performance Insight AI', 'Goal Alignment Tracker']),

-- ============================================
-- SECTION 11: Procurement (45-47)
-- ============================================
('Procurement', 45, 
 'How do you identify, evaluate, and onboard new suppliers?',
 'Is it manual or digital? Do they use a supplier discovery platform?',
 ARRAY['Sourcing Automation', 'Supplier Discovery AI']),

('Procurement', 46, 
 'How are procurement contracts managed throughout their lifecycle?',
 'Are they in a CLM (Contract Lifecycle Management) system or scattered drives and emails?',
 ARRAY['Contract Lifecycle Management (CLM) AI', 'Obligation Tracker']),

('Procurement', 47, 
 'How do you track and benchmark supplier performance against SLAs?',
 'Quantitative (scorecards, dashboards) or anecdotal? Is data shared back with suppliers?',
 ARRAY['Supplier Scorecard AI', 'Performance Analytics']),

-- ============================================
-- SECTION 12: Legal (48-50)
-- ============================================
('Legal', 48, 
 'What is the volume of contracts, NDAs, and legal documents reviewed weekly?',
 'High volume suggests AI contract review. What is the current average turnaround time?',
 ARRAY['Contract Review AI', 'NDA Analyzer']),

('Legal', 49, 
 'How does the legal team stay on top of changes in relevant regulations?',
 'Manual monitoring (trade journals, regulators) or automated alerts (regulatory intelligence platforms)?',
 ARRAY['Regulatory Monitoring AI', 'Regulatory Change Impact Analysis']),

('Legal', 50, 
 'How are legal holds, e-discovery, and litigation support currently handled?',
 'Probe for data retrieval times. Is there a dedicated e-discovery tool?',
 ARRAY['E-Discovery Assistant', 'Legal Hold Automation']),

-- ============================================
-- SECTION 13: Knowledge Management (51-53)
-- ============================================
('Knowledge Management', 51, 
 'How do employees currently search for internal documents and expertise?',
 'Is there a company wiki or intranet, and is it effective? Or do they rely on asking colleagues (tribal knowledge)?',
 ARRAY['Enterprise Search AI', 'Internal Wiki GPT']),

('Knowledge Management', 52, 
 'How are standard operating procedures (SOPs) and best practices captured and updated?',
 'Are they living documents (version-controlled, searchable) or dusty PDFs in a shared drive?',
 ARRAY['SOP Generator', 'Knowledge Base Health Monitor']),

('Knowledge Management', 53, 
 'What happens when a new employee needs to find technical knowledge to solve a problem?',
 'Do they ask a colleague (tribal knowledge) or search a system? This reveals knowledge silos.',
 ARRAY['Expertise Location AI', 'Contextual Knowledge Assistant']),

-- ============================================
-- SECTION 14: Project Management / PMO (54-56)
-- ============================================
('Project Management', 54, 
 'How does the PMO track resource allocation and capacity planning across projects?',
 'Is it spreadsheets or enterprise PPM (Project Portfolio Management) tools like Jira, Asana, or MS Project?',
 ARRAY['Resource Optimizer', 'Capacity Planning AI']),

('Project Management', 55, 
 'What is the current project delivery predictability (e.g., on-time/on-budget rate)?',
 'Track the variance percentage. Do you have a standard delivery methodology (Agile, Waterfall, Hybrid)?',
 ARRAY['Delivery Risk Predictor', 'Project Health Dashboard']),

('Project Management', 56, 
 'How are project status reports, meeting minutes, and action items generated?',
 'Is the PM writing them manually from multiple emails and Slack threads, or is there a tool?',
 ARRAY['Status Report Generator', 'Meeting Intelligence Assistant']),

-- ============================================
-- BONUS: Culture & Change (57-62)
-- ============================================
('Culture & Change', 57, 
 'How would you describe the overall data-driven culture of your organization?',
 'Do leaders make decisions based on data/evidence or primarily on intuition? Is data literacy widespread?',
 ARRAY['Culture Change Navigator', 'Digital Fluency Assessment']),

('Culture & Change', 58, 
 'What is the level of AI literacy among your leadership and middle management?',
 'Have they had AI training or workshops? Do they understand basic AI concepts (ML, NLP, Generative AI)?',
 ARRAY['AI Literacy Bootcamp', 'Leadership AI Workshop Planner']),

('Culture & Change', 59, 
 'How does the organization handle failure and risk-taking regarding new technologies?',
 'Is it a "fail fast, learn fast" culture, or is it highly risk-averse (requiring 100% certainty before any investment)?',
 ARRAY['Innovation Sandbox Planner', 'Risk-Tolerance Assessment']),

('Culture & Change', 60, 
 'What are the primary barriers to change you foresee in adopting AI?',
 'Top answers: Fear of job loss, lack of trust in AI, unclear business value, or lack of technical skills.',
 ARRAY['Change Impact Analysis', 'Stakeholder Communication Generator']),

('Culture & Change', 61, 
 'How siloed are the departments currently?',
 'Probe about cross-functional collaboration. Do teams share data and insights freely, or operate in isolation?',
 ARRAY['Silo Breaker Strategy', 'Cross-Functional AI Council Planner']),

('Culture & Change', 62, 
 'Is there a clear internal communications channel for upcoming tech changes?',
 'Crucial for managing digital transformation. Do they have an internal comms plan for major tech rollouts?',
 ARRAY['Internal Comms AI', 'Digital Change Agent']);

-- ============================================
-- VERIFICATION QUERY (Run after INSERT)
-- ============================================
SELECT 
  COUNT(*) AS total_questions,
  COUNT(DISTINCT section) AS total_sections
FROM public.questions;

-- Expected Result: 62 total_questions, 15 total_sections
-- (14 departments + Culture & Change)