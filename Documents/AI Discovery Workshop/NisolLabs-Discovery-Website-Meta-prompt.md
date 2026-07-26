# GEMINI.md - Nisol Discovery Phase 1 (Existing Site Integration Mode)

## 0. Project Identity & Integration Mode
**Project:** Nisol Discovery - Questionnaire Module (Phase 1) - ADD-ON to existing Nisol Labs static website
**Goal:** Add consultant workbench as protected module INSIDE existing static site. Do NOT break marketing site.
**Version:** 2.0 - Existing Site Mode | Target: Google Antigravity

**CRITICAL INTEGRATION RULES - DO NOT VIOLATE:**
1.  EXISTING STATIC SITE IS UNTOUCHED: Do NOT modify app/page.tsx, app/layout.tsx root marketing layout, or any existing (marketing) pages. No refactor.
2.  NEW MODULE IS ISOLATED: All discovery code lives ONLY in `app/(discovery)/` folder with its OWN layout.tsx (Navy #0A1E3C). This is Option A - Zero changes to marketing.
3.  DATABASE ALREADY EXISTS: All tables, RLS, functions, 62 questions already in Supabase. NEVER run CREATE TABLE/TYPE/POLICY DDL.
4.  NEVER write to `audit_maturity_scores` table. Reserved for Phase 2.
5.  DO NOT build AI Report Generation, ROI, Maturity Scoring Algorithms.
6.  Supabase client only - NO custom Next.js API routes.

## 1. Existing Codebase Structure (LOCKED - DO NOT CHANGE)
```
Current (KEEP AS IS):
app/layout.tsx          <- Marketing root layout - DO NOT EDIT
app/page.tsx            <- Marketing homepage - DO NOT EDIT
app/globals.css         <- Keep, add discovery styles if needed via tailwind merge
components/             <- Marketing components - DO NOT EDIT, reuse if possible

New to Create (ONLY THESE):
app/(discovery)/layout.tsx              <- NEW discovery shell (Navy header, Sidebar, Auth check)
app/(discovery)/login/page.tsx          <- Public login
app/(discovery)/dashboard/page.tsx      <- Protected
app/(discovery)/clients/page.tsx        <- Protected, Internal only
app/(discovery)/audits/new/page.tsx     <- Protected, Internal only
app/(discovery)/audits/[id]/page.tsx    <- Audit detail
app/(discovery)/audits/[id]/questionnaire/page.tsx <- THE CORE
app/(discovery)/profile/page.tsx        <- Protected

lib/supabase/client.ts  <- NEW
lib/supabase/server.ts  <- NEW
middleware.ts           <- NEW but MINIMAL (protects only discovery routes)
components/ui/*         <- NEW shadcn components, do NOT overwrite existing
components/layout/*     <- NEW discovery Header, Sidebar
components/questionnaire/* <- NEW
```

## 2. Middleware Rule (CRITICAL - Protects only discovery, NOT marketing)
```ts
// middleware.ts - MUST be like this
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/clients/:path*',
    '/audits/:path*',
    '/profile/:path*',
    // DO NOT match '/', '/about', '/services', etc. Marketing stays public
  ]
}
// Logic: Check supabase auth, if no session and path is protected -> redirect /login
// If path is '/' or marketing pages -> skip auth check entirely
```

## 3. Tech Stack (Existing + Additions)
- Existing: Next.js 15 App Router, React 19, TypeScript, Tailwind (already installed)
- Add: @supabase/supabase-js v2, shadcn/ui components (Button, Dialog, Input, Textarea, RadioGroup, Progress, Table, Card, Badge)
- Env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (add to existing .env.local, do NOT overwrite other envs)
- Hosting: Vercel (same deployment)

## 4. Brand & UI System for Discovery Module (LOCKED)
Discovery has its OWN visual identity separate from marketing site:
```js
colors: {
  primary: "#0A1E3C", // Navy - Header, Sidebar
  secondary: "#EBB44B", // Gold - Accent, CTA
  background: "#F8FAFC", // Slate 50 - Page bg
  card: "#FFFFFF",
  text: "#1E293B",
  muted: "#64748B",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444"
}
font: Inter
```
Discovery Layout: 
Header: [Logo] Nisol Discovery | [Progress: X/62] | [Profile] [Logout] - bg #0A1E3C text white
Sidebar: width 240px, bg #0A1E3C, nav items
Main content: bg #F8FAFC, Card #FFFFFF

Consultant Workbench Layout (Questionnaire):
Header with Progress | Sub-header: Capability: {section} (Section Y of 14) + Progress Bar value=(currentIndex+1)/62*100
Core: Large Question Text + Large Textarea for notes
Bottom: MATURITY SCORE: [1][2][3][4][5] Radio
Right Sidebar Sticky: DISCUSSION GUIDE (tip_discussion) + TRIGGERED PATTERNS (pills)
Footer: [◀ Previous] [Save & Continue] [Next ▶] -> Q62 becomes "Complete Assessment"

## 5. Roles & RLS (ENFORCE)
Roles: super_admin | admin | consultant | client
Status: draft | data_collection | data_collected | in_analysis | report_ready | presented
- Super Admin/Consultant: All tenants, all audits, Create, Write, Edit/Delete
- Client: ONLY own tenant (id = get_user_tenant()) + own audits, Read-Only with 🔒 badge, inputs disabled
- Helper functions already exist: get_user_role(), get_user_tenant(), is_internal_user()
- Trigger on_auth_user_created already exists -> creates profile role='client'

## 6. Database Schema Status
**ALL EXISTS - DO NOT RE-CREATE:**
- tenants, profiles, audits, questions (62 seeded), audit_maturity_scores
- ENUMs, Indexes, RLS Policies, Functions all exist
- Antigravity instruction: Read schema via supabase client introspection only, NEVER DDL.

## 7. Supabase Queries (MANDATORY PATTERN)
- Fetch Questions: supabase.from('questions').select('*').order('order_index')
- Fetch Tenants: supabase.from('tenants').select('*').order('name')
- Fetch Audits: supabase.from('audits').select('*, tenants(name)').order('created_at', {ascending:false})
- Create Audit: supabase.from('audits').insert({tenant_id, title, conducted_by, status: 'draft'})
- Fetch Single Audit: supabase.from('audits').select('*, tenants(*)').eq('id', auditId).single()
- Update Audit: supabase.from('audits').update({raw_responses: updatedJson, status: 'data_collection'}).eq('id', auditId)
- Complete: supabase.from('audits').update({status: 'data_collected'}).eq('id', auditId)

## 8. Pages to Build (Inside app/(discovery)/ ONLY)

### 8.1 (discovery)/login - Public
Email, Password, Login button, Forgot Password. supabase.auth.signInWithPassword() -> redirect /dashboard. Use shadcn Card, centered, bg #F8FAFC. Must NOT use marketing layout.

### 8.2 (discovery)/dashboard
Internal: Table Title | Client (Tenant) | Status Badge | Date | Actions + [New Assessment] button (Gold #EBB44B)
Client: Filtered where tenant_id = get_user_tenant(). Read-only.
Badge: draft=secondary, data_collection=warning (amber), data_collected=success (green)

### 8.3 (discovery)/clients - Super Admin, Consultant only
Search bar, Add Client Dialog, Table: Name, Industry, Employees, Actions (Edit, Delete)

### 8.4 (discovery)/audits/new
Internal only. Fields: Title (Input), Tenant (Select dropdown), Consultant (pre-filled current user). On submit -> create audit -> redirect to /audits/[id]/questionnaire

### 8.5 (discovery)/audits/[id]/questionnaire - THE CORE 80%
State:
- audit = fetch audit
- questions = fetch all order_index asc
- currentIndex from localStorage `audit_{id}_index` OR last answered key in raw_responses OR 0
- currentQuestion = questions[currentIndex]
- currentAnswer = raw_responses[currentQuestion.id] || {text:'', score:null}

Components:
- components/layout/Header (discovery only)
- components/layout/Sidebar (discovery only)
- components/questionnaire/QuestionCard, AnswerTextArea, ScoreSelector, DiscussionPanel
- components/ui/* (new shadcn)

Save Logic:
1. Debounce 5s on TextArea+Score change -> merge JSONB {...raw_responses, [questionId]: {text, score}} -> update audit
2. Previous/Next -> immediate save -> setCurrentIndex +/-1 -> save to localStorage
3. Q62 -> Button "Complete Assessment" -> status='data_collected' -> redirect /dashboard
4. If role===client -> disable all inputs, show 🔒 Read-Only badge

Performance: React.memo QuestionCard, useCallback save, prefetch next question, nav <200ms

### 8.6 (discovery)/profile
Editable Full Name, Read-only Role, Tenant, Change Password via supabase.auth.updateUser()

## 9. What NOT to Build
- No audit_maturity_scores writes, No charts, No AI, No ROI, No maturity calc, No email, No mobile native (14" laptop primary)

## 10. Antigravity Execution Order (FOR EXISTING SITE)
Step 1: INSPECT existing app/ folder structure. DO NOT edit existing marketing files. Report structure.
Step 2: Create lib/supabase/client.ts and server.ts. Add env keys to .env.local (ask user if missing). Create middleware.ts with matcher ONLY for /dashboard, /clients, /audits/*, /profile
Step 3: SKIP DB creation - verify connection via supabase.from('questions').select('count')
Step 4: Build (discovery)/layout.tsx (Navy #0A1E3C shell, separate from marketing) + (discovery)/login
Step 5: Build (discovery)/dashboard, (discovery)/clients, (discovery)/audits/new
Step 6: Build THE CORE (discovery)/audits/[id]/questionnaire with auto-save, progress, read-only, localStorage recovery
Step 7: Test RLS with consultant vs client role. Ensure marketing routes / still public without login.

Final check: `npm run build` must still build marketing static pages + new discovery dynamic pages. No conflicts.
