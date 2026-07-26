"use client"

import { useEffect, useState, useMemo } from "react"
import { createBrowserClient } from "@supabase/ssr"

export type Question = {
  id: number
  section: string
  order_index: number
  question_text: string
  tip_discussion: string | null
  triggered_patterns: string[] | null
}

// Fallback initial questions in case DB table is not yet populated
const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 1,
    section: "Leadership & Strategy",
    order_index: 1,
    question_text: "What is the organization's top-level strategic vision for AI over the next 3 years?",
    tip_discussion: "Look for specifics: Is there a formal AI roadmap? Is AI mentioned in the annual report? Who is driving it—CEO, CTO, or a dedicated CAIO?",
    triggered_patterns: ["AI Strategy Advisor", "Innovation Portfolio Manager"]
  },
  {
    id: 2,
    section: "Leadership & Strategy",
    order_index: 2,
    question_text: "Who holds the ultimate decision-making authority and budget for AI investments?",
    tip_discussion: "Identify if this is the CEO, CTO, CIO, or a dedicated CAIO. Check if budget is centralized or distributed.",
    triggered_patterns: ["Governance Framework Setup", "Executive Dashboard"]
  },
  {
    id: 3,
    section: "Leadership & Strategy",
    order_index: 3,
    question_text: "How does the organization currently measure the success of technology or digital transformation initiatives?",
    tip_discussion: "Probe for specific KPIs: ROI, time-to-market, efficiency gains, cost savings, or user adoption rates.",
    triggered_patterns: ["Transformation KPI Tracker", "Value Realization Office"]
  },
  {
    id: 4,
    section: "Leadership & Strategy",
    order_index: 4,
    question_text: "Has the organization undergone any major digital transformations in the last 3 years, and if so, what were the outcomes?",
    tip_discussion: "Understand their change appetite. Did they succeed? Fail? What were the cultural impacts?",
    triggered_patterns: ["Change Management Predictor", "Legacy Migration Planner"]
  },
  {
    id: 5,
    section: "Leadership & Strategy",
    order_index: 5,
    question_text: "Is there a formal AI ethics, governance, or responsible AI policy currently in place?",
    tip_discussion: "Ask about responsible AI, bias testing, transparency requirements, and oversight.",
    triggered_patterns: ["AI Governance Framework", "Bias Detection Suite"]
  },
  {
    id: 6,
    section: "IT / Technology",
    order_index: 6,
    question_text: "What is the current state of your cloud infrastructure (On-prem, Hybrid, Cloud-native)?",
    tip_discussion: "Assess maturity: Are they lifting-and-shifting legacy apps, or building cloud-native microservices?",
    triggered_patterns: ["Cloud Optimization Agent", "Application Modernization Planner"]
  },
  {
    id: 7,
    section: "IT / Technology",
    order_index: 7,
    question_text: "How mature is your API ecosystem and system integration capability?",
    tip_discussion: "Do they have an API gateway? Are systems tightly coupled or loosely coupled?",
    triggered_patterns: ["API Discovery & Governance", "Integration Accelerator"]
  },
  {
    id: 8,
    section: "IT / Technology",
    order_index: 8,
    question_text: "What does your current software development lifecycle (SDLC) and DevOps velocity look like?",
    tip_discussion: "Probe for deployment frequency, lead time for changes, MTTR. Do they practice CI/CD?",
    triggered_patterns: ["DevOps Assistant", "CI/CD Pipeline Optimizer"]
  },
  {
    id: 9,
    section: "IT / Technology",
    order_index: 9,
    question_text: "What are the top 3 legacy systems or technical debts that are currently constraining your business?",
    tip_discussion: "Identify mainframe, outdated ERPs, or custom monolithic code that hinders AI adoption.",
    triggered_patterns: ["Legacy Modernization Copilot", "Technical Debt Analyzer"]
  },
  {
    id: 10,
    section: "IT / Technology",
    order_index: 10,
    question_text: "How do you currently manage vendor lock-in risk for your core technology platforms?",
    tip_discussion: "Are there open-source alternatives? Are their contracts flexible? Hybrid cloud strategy?",
    triggered_patterns: ["Vendor Risk Intelligence", "Multi-Cloud Strategy Planner"]
  },
  {
    id: 11,
    section: "Data & Analytics",
    order_index: 11,
    question_text: "How do you currently handle data quality monitoring? Who is responsible, and what tools are used?",
    tip_discussion: "Probe: Is it proactive or reactive? Do they have data stewards?",
    triggered_patterns: ["Data Quality Monitor", "Data Profiling Agent"]
  },
  {
    id: 12,
    section: "Data & Analytics",
    order_index: 12,
    question_text: "Is there a centralized data warehouse/lake, or are systems siloed?",
    tip_discussion: "Determine the existence of a Single Source of Truth (SSOT). ETL/ELT pipelines?",
    triggered_patterns: ["Data Fabric Architect", "Data Lakehouse Builder"]
  },
  {
    id: 13,
    section: "Data & Analytics",
    order_index: 13,
    question_text: "How mature is your Master Data Management (MDM) for critical entities?",
    tip_discussion: "Are customer IDs consistent across Sales, Support, and Billing?",
    triggered_patterns: ["MDM Harmonization Tool", "Entity Resolution AI"]
  },
  {
    id: 14,
    section: "Data & Analytics",
    order_index: 14,
    question_text: "What is your current BI and reporting cadence? Is it real-time, daily, or weekly?",
    tip_discussion: "Identify if decisions are made on stale data. Do they have self-service BI tools?",
    triggered_patterns: ["Real-time Analytics Pipeline", "Automated Reporting Assistant"]
  },
  {
    id: 15,
    section: "Data & Analytics",
    order_index: 15,
    question_text: "Do you have a dedicated data science or advanced analytics team, and what is their primary focus?",
    tip_discussion: "Probe for skill levels: Descriptive, Predictive, or Prescriptive analytics.",
    triggered_patterns: ["Talent Augmentation Planner", "AI/ML Platform Setup"]
  },
  {
    id: 16,
    section: "Security & Compliance",
    order_index: 16,
    question_text: "How mature is your cybersecurity posture, and do you have a formal incident response plan?",
    tip_discussion: "Assess if they have a Security Operations Center (SOC) or rely on outsourcing.",
    triggered_patterns: ["AI Threat Intelligence", "Automated Incident Response"]
  },
  {
    id: 17,
    section: "Security & Compliance",
    order_index: 17,
    question_text: "Which regulatory frameworks apply to you (GDPR, HIPAA, SOC2, PCI-DSS), and how are they managed?",
    tip_discussion: "Are controls automated with continuous compliance monitoring?",
    triggered_patterns: ["Compliance Automation Agent", "Regulatory Change Tracker"]
  },
  {
    id: 18,
    section: "Security & Compliance",
    order_index: 18,
    question_text: "How do you handle Data Privacy (PII) and sensitive data discovery?",
    tip_discussion: "Is data classified at rest? Are there automated data masking tools?",
    triggered_patterns: ["PII Discovery & Masking", "Data Privacy Copilot"]
  },
  {
    id: 19,
    section: "Customer Service",
    order_index: 21,
    question_text: "What is your current monthly ticket volume across all support channels?",
    tip_discussion: "Is volume growing year-over-year? What is peak season like?",
    triggered_patterns: ["AI Chatbot", "Agent Assist Tool"]
  },
  {
    id: 20,
    section: "Finance",
    order_index: 37,
    question_text: "How are invoices received, processed, and approved in your accounts payable team?",
    tip_discussion: "Count the number of manual touches. Are they using OCR for invoice extraction?",
    triggered_patterns: ["Invoice Intelligence", "Automated AP Processing"]
  }
]

export default function QuestionnairePage() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    async function loadQuestions() {
      setLoading(true)
      setDbError(null)

      try {
        const { data, error } = await supabase
          .from("questions")
          .select("id, section, order_index, question_text, tip_discussion, triggered_patterns")
          .order("order_index", { ascending: true })

        if (error) {
          console.warn("Could not fetch questions from Supabase, using fallback:", error.message)
          setDbError(`Supabase notice: ${error.message} (showing fallback questions)`)
          setQuestions(FALLBACK_QUESTIONS)
        } else if (data && data.length > 0) {
          setQuestions(data)
        } else {
          // Empty table
          setQuestions(FALLBACK_QUESTIONS)
        }
      } catch (err: any) {
        console.error("Error loading questions:", err)
        setQuestions(FALLBACK_QUESTIONS)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [supabase])

  const sections = useMemo(() => {
    const list = Array.from(new Set(questions.map((q) => q.section)))
    return ["All", ...list]
  }, [questions])

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSection = selectedSection === "All" || q.section === selectedSection
      const matchesQuery =
        searchQuery.trim() === "" ||
        q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.tip_discussion && q.tip_discussion.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSection && matchesQuery
    })
  }, [questions, selectedSection, searchQuery])

  return (
    <section className="min-h-screen bg-[#F8FAFC] p-6">
      {/* Header Banner */}
      <div className="bg-[#0A1E3C] text-white rounded-xl p-6 mb-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
            Discovery Assessment Library
          </span>
          <h1 className="text-3xl font-bold mt-1">Audit Questionnaire Database</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Explore the standard 62 AI Discovery assessment questions organized across core enterprise pillars.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-lg text-center">
            <span className="block text-2xl font-extrabold">{questions.length}</span>
            <span className="text-xs text-slate-300">Total Questions</span>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-lg text-center">
            <span className="block text-2xl font-extrabold">{sections.length - 1}</span>
            <span className="text-xs text-slate-300">Pillars / Sections</span>
          </div>
        </div>
      </div>

      {dbError && (
        <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          {dbError}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Section Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Pillar:</span>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
          >
            {sections.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section Quick Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSection(sec)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedSection === sec
                ? "bg-[#0A1E3C] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border">
          <p className="animate-pulse font-medium">Loading questionnaire database...</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border">
          <p className="font-semibold text-lg text-slate-700">No questions found</p>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search query or section filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-[#0A1E3C] font-bold text-xs flex items-center justify-center border">
                    #{q.order_index}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {q.section}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {q.question_text}
              </h3>

              {q.tip_discussion && (
                <div className="bg-slate-50 border-l-4 border-blue-500 p-3 rounded-r-md text-xs text-slate-700 my-2">
                  <span className="font-bold text-blue-900">Consultant Guidance: </span>
                  {q.tip_discussion}
                </div>
              )}

              {q.triggered_patterns && q.triggered_patterns.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs text-slate-400 font-medium mr-1">Triggered Patterns:</span>
                  {q.triggered_patterns.map((pattern, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                    >
                      {pattern}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
