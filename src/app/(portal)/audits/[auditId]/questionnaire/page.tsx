"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"
import { INITIAL_62_QUESTIONS, QuestionItem } from "@/data/questionsData"

type SingleResponse = {
  answer: string
  score: number // 1 to 5
}

export default function AuditQuestionnaireWizard() {
  const params = useParams()
  const router = useRouter()
  const auditId = params?.auditId as string

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_62_QUESTIONS)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [responses, setResponses] = useState<Record<string, SingleResponse>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [auditTitle, setAuditTitle] = useState<string>("AI Assessment")

  // Auto-save debounce timer ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Fetch Audit & Questions
  useEffect(() => {
    if (!auditId) return

    const initData = async () => {
      setLoading(true)

      // Fetch audit raw_responses and title
      const { data: auditData } = await supabase
        .from("audits")
        .select("title, raw_responses")
        .eq("id", auditId)
        .single()

      if (auditData) {
        if (auditData.title) setAuditTitle(auditData.title)
        if (auditData.raw_responses && typeof auditData.raw_responses === "object") {
          setResponses(auditData.raw_responses)
        }
      }

      // Fetch questions from DB if available
      const { data: dbQuestions, error: qErr } = await supabase
        .from("questions")
        .select("id, section, order_index, question_text, tip_discussion, triggered_patterns")
        .order("order_index", { ascending: true })

      if (!qErr && dbQuestions && dbQuestions.length > 0) {
        setQuestions(dbQuestions)
      } else {
        setQuestions(INITIAL_62_QUESTIONS)
      }

      setLoading(false)
    }

    initData()
  }, [auditId, supabase])

  // Save responses to Supabase
  const saveToDatabase = useCallback(
    async (updatedResponses: Record<string, SingleResponse>) => {
      if (!auditId) return
      setSavingStatus("saving")
      try {
        const { error } = await supabase
          .from("audits")
          .update({
            raw_responses: updatedResponses,
            status: "data_collection",
            updated_at: new Date().toISOString()
          })
          .eq("id", auditId)

        if (error) {
          console.error("Auto-save error:", error)
          setSavingStatus("error")
          setErrorMessage(error.message)
        } else {
          setSavingStatus("saved")
          setErrorMessage(null)
        }
      } catch (e: any) {
        console.error("Auto-save exception:", e)
        setSavingStatus("error")
      }
    },
    [auditId, supabase]
  )

  // Trigger debounced auto-save
  const triggerAutoSave = (newResponses: Record<string, SingleResponse>) => {
    setSavingStatus("saving")
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      saveToDatabase(newResponses)
    }, 800)
  }

  const currentQuestion = questions[currentIndex] || questions[0]
  const currentKey = String(currentQuestion?.id || currentIndex + 1)
  const currentResp = responses[currentKey] || { answer: "", score: 3 }

  // Handlers
  const handleAnswerChange = (text: string) => {
    const next = {
      ...responses,
      [currentKey]: { ...currentResp, answer: text }
    }
    setResponses(next)
    triggerAutoSave(next)
  }

  const handleScoreChange = (scoreVal: number) => {
    const next = {
      ...responses,
      [currentKey]: { ...currentResp, score: scoreVal }
    }
    setResponses(next)
    triggerAutoSave(next)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Calculate completed count
  const completedCount = Object.values(responses).filter(
    (r) => r.answer?.trim().length > 0 || r.score !== undefined
  ).length

  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#0A1E3C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading audit wizard...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <Link
              href={`/audits/${auditId}`}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 mb-1"
            >
              ← Back to Audit Details
            </Link>
            <h1 className="text-2xl font-bold text-[#0A1E3C]">{auditTitle}</h1>
          </div>

          {/* Saving Status & Index Dropdown */}
          <div className="flex items-center gap-4">
            {/* Auto-save Badge */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm text-xs font-medium">
              {savingStatus === "saving" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-amber-700">Auto-saving...</span>
                </>
              )}
              {savingStatus === "saved" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-700">Auto-saved to cloud</span>
                </>
              )}
              {savingStatus === "idle" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-slate-500">Ready</span>
                </>
              )}
              {savingStatus === "error" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-red-600">Save failed</span>
                </>
              )}
            </div>

            {/* Jump to Question Dropdown */}
            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              className="text-xs border rounded-lg px-3 py-2 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
            >
              {questions.map((q, idx) => (
                <option key={q.id} value={idx}>
                  Q{q.order_index}: {q.section} ({responses[String(q.id)] ? "✓" : "–"})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Counter & Bar */}
        <div className="bg-white rounded-xl p-4 border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#0A1E3C] text-sm font-bold">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-slate-500">
              Overall Progress: <strong className="text-blue-700">{progressPercentage}%</strong> ({completedCount}/{questions.length} answered)
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0A1E3C] to-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 70% / 30% Split Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        {/* LEFT COLUMN: 70% (Main Question Area) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border shadow-sm space-y-6">
          
          {/* Question Meta Badges */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0A1E3C] text-white">
                #{currentQuestion.order_index}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100">
                {currentQuestion.section}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Step {currentIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#0A1E3C] leading-relaxed">
              {currentQuestion.question_text}
            </h2>
          </div>

          {/* Maturity Level Selection (Radio Buttons 1 - 5) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
              Maturity Score Rating (1 - 5)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { score: 1, label: "1 - Initial" },
                { score: 2, label: "2 - Emerging" },
                { score: 3, label: "3 - Defined" },
                { score: 4, label: "4 - Managed" },
                { score: 5, label: "5 - Optimized" }
              ].map(({ score, label }) => {
                const isSelected = currentResp.score === score
                return (
                  <label
                    key={score}
                    onClick={() => handleScoreChange(score)}
                    className={`cursor-pointer border rounded-xl p-3 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "bg-[#0A1E3C] text-white border-[#0A1E3C] shadow-md ring-2 ring-blue-300"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`maturity-${currentQuestion.id}`}
                      value={score}
                      checked={isSelected}
                      onChange={() => handleScoreChange(score)}
                      className="sr-only"
                    />
                    <span className="text-lg font-extrabold">{score}</span>
                    <span className={`text-[10px] font-medium ${isSelected ? "text-blue-200" : "text-slate-500"}`}>
                      {label.split(" - ")[1]}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Assessment Notes Textarea */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
              Assessment Notes & Findings
            </label>
            <textarea
              rows={6}
              value={currentResp.answer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Record operational observations, key metrics, pain points, or consultant findings for this question..."
              className="w-full text-sm border border-slate-200 rounded-xl p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Navigation Controls: Previous / Next */}
          <div className="flex items-center justify-between border-t pt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-6 py-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              Auto-saves on navigation
            </div>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-[#0A1E3C] text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-md hover:shadow-lg transition-all"
              >
                Next Question →
              </button>
            ) : (
              <Link
                href={`/audits/${auditId}`}
                className="px-8 py-3 bg-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-emerald-800 shadow-md transition-all"
              >
                Complete Audit ✓
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 30% (Tips, Discussion & Triggered Patterns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Consultant Discussion Card */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Consultant Guidance & Tips</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
              {currentQuestion.tip_discussion || "No specific tips provided for this question."}
            </p>
          </div>

          {/* Triggered Patterns Card */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Triggered Patterns</span>
            </div>
            {currentQuestion.triggered_patterns && currentQuestion.triggered_patterns.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentQuestion.triggered_patterns.map((pattern, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No patterns assigned.</p>
            )}
          </div>

          {/* Quick Navigator Drawer */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
              Pillar Quick Index
            </h4>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1 text-xs">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex
                const isAnswered = Boolean(responses[String(q.id)]?.answer?.trim())
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      isCurrent
                        ? "bg-[#0A1E3C] text-white font-bold"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span className="truncate max-w-[170px]">
                      Q{q.order_index}. {q.question_text}
                    </span>
                    <span className="ml-2 text-[10px]">
                      {isAnswered ? "✓" : "–"}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
