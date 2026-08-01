"use client"

import { useState, useEffect, useCallback, useRef, useMemo, memo } from "react"
import { useParams, useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"
import { INITIAL_62_QUESTIONS, QuestionItem } from "@/data/questionsData"

type SingleResponse = {
  answer: string
  score: number // 1 to 5
}

// Sub-component with local state to ensure instant focus and typing speed without main thread freezing
function AssessmentNotesTextarea({
  initialValue,
  onSaveAnswer
}: {
  initialValue: string
  onSaveAnswer: (text: string) => void
}) {
  const [text, setText] = useState(initialValue)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onSaveRef = useRef(onSaveAnswer)

  useEffect(() => {
    onSaveRef.current = onSaveAnswer
  }, [onSaveAnswer])

  // Sync internal text state whenever initialValue changes (e.g. question navigation)
  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setText(val)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onSaveRef.current(val)
    }, 350)
  }

  const handleBlur = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    onSaveRef.current(text)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <textarea
      rows={6}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      spellCheck={false}
      placeholder="Record operational observations, key metrics, pain points, or consultant findings for this question..."
      className="w-full text-sm border border-slate-200 rounded-xl p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] focus:border-transparent transition-colors shadow-inner"
    />
  )
}

// Memoized Jump Dropdown to prevent unnecessary re-renders during typing or focus
const QuestionDropdown = memo(function QuestionDropdown({
  questions,
  currentIndex,
  responses,
  onSelectQuestion
}: {
  questions: QuestionItem[]
  currentIndex: number
  responses: Record<string, SingleResponse>
  onSelectQuestion: (index: number) => void
}) {
  return (
    <select
      value={currentIndex}
      onChange={(e) => onSelectQuestion(Number(e.target.value))}
      className="text-xs border rounded-lg px-3 py-2 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0A1E3C]"
    >
      {questions.map((q, idx) => {
        const qKey = String(q.order_index || q.id)
        const isAns = Boolean(responses[qKey]?.answer?.trim() || responses[qKey]?.score)
        return (
          <option key={q.id || idx} value={idx}>
            Q{q.order_index}: {q.section} ({isAns ? "✓" : "–"})
          </option>
        )
      })}
    </select>
  )
})

// Memoized Quick Index List
const QuickIndexList = memo(function QuickIndexList({
  questions,
  currentIndex,
  responses,
  onSelectQuestion
}: {
  questions: QuestionItem[]
  currentIndex: number
  responses: Record<string, SingleResponse>
  onSelectQuestion: (index: number) => void
}) {
  return (
    <div className="space-y-1 max-h-60 overflow-y-auto pr-1 text-xs">
      {questions.map((q, idx) => {
        const isCurrent = idx === currentIndex
        const qKey = String(q.order_index || q.id)
        const isAnswered = Boolean(responses[qKey]?.answer?.trim() || responses[qKey]?.score)
        return (
          <button
            key={q.id || idx}
            type="button"
            onClick={() => onSelectQuestion(idx)}
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
  )
})

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
  const [auditTitle, setAuditTitle] = useState<string>("AI Maturity Assessment")

  // Auto-save debounce timer ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Fetch Audit & Questions safely with try...finally
  useEffect(() => {
    if (!auditId) return

    let isMounted = true

    const initData = async () => {
      try {
        setLoading(true)

        // Fetch audit raw_responses and title
        const { data: auditData, error: auditErr } = await supabase
          .from("audits")
          .select("title, raw_responses")
          .eq("id", auditId)
          .maybeSingle()

        if (isMounted && auditData) {
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

        if (isMounted) {
          if (!qErr && dbQuestions && dbQuestions.length > 0) {
            setQuestions(dbQuestions)
          } else {
            setQuestions(INITIAL_62_QUESTIONS)
          }
        }
      } catch (err: any) {
        console.error("Error initializing questionnaire:", err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initData()

    return () => {
      isMounted = false
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
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
  const triggerAutoSave = useCallback(
    (newResponses: Record<string, SingleResponse>) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        saveToDatabase(newResponses)
      }, 800)
    },
    [saveToDatabase]
  )

  const currentQuestion = questions[currentIndex] || questions[0] || INITIAL_62_QUESTIONS[0]
  const currentKey = String(currentQuestion.order_index || currentQuestion.id || currentIndex + 1)
  const currentResp = responses[currentKey] || { answer: "", score: 3 }

  // Handlers
  const handleAnswerChange = useCallback(
    (text: string) => {
      setResponses((prev) => {
        const existing = prev[currentKey] || { answer: "", score: 3 }
        if (existing.answer === text) return prev
        const next = {
          ...prev,
          [currentKey]: { ...existing, answer: text }
        }
        triggerAutoSave(next)
        return next
      })
    },
    [currentKey, triggerAutoSave]
  )

  const handleScoreChange = useCallback(
    (scoreVal: number) => {
      setResponses((prev) => {
        const existing = prev[currentKey] || { answer: "", score: 3 }
        const next = {
          ...prev,
          [currentKey]: { ...existing, score: scoreVal }
        }
        triggerAutoSave(next)
        return next
      })
    },
    [currentKey, triggerAutoSave]
  )

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      const mainEl = document.getElementById("portal-main-content")
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }, [])

  const handleSelectQuestion = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      scrollToTop()
    },
    [scrollToTop]
  )

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      scrollToTop()
    }
  }, [currentIndex, questions.length, scrollToTop])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      scrollToTop()
    }
  }, [currentIndex, scrollToTop])

  const handleComplete = useCallback(async () => {
    if (!auditId) return
    setSavingStatus("saving")
    try {
      await supabase
        .from("audits")
        .update({
          raw_responses: responses,
          status: "data_collected",
          updated_at: new Date().toISOString()
        })
        .eq("id", auditId)
      setSavingStatus("saved")
    } catch (e: any) {
      console.error("Error completing audit:", e)
      setSavingStatus("error")
    } finally {
      router.push(`/audits/${auditId}`)
    }
  }, [auditId, responses, router, supabase])

  // Calculate completed count
  const completedCount = useMemo(() => {
    return Object.values(responses).filter(
      (r) => (r.answer && r.answer.trim().length > 0) || r.score !== undefined
    ).length
  }, [responses])

  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-4 bg-white p-8 rounded-2xl border shadow-lg max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-[#0A1E3C] border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="text-base font-bold text-[#0A1E3C]">Loading Assessment Wizard</h3>
          <p className="text-xs text-slate-500">Retrieving audit data and questions...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      {/* Top Header & Navigation */}
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
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-xs text-xs font-medium">
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
            <QuestionDropdown
              questions={questions}
              currentIndex={currentIndex}
              responses={responses}
              onSelectQuestion={handleSelectQuestion}
            />
          </div>
        </div>

        {/* Progress Counter & Bar */}
        <div className="bg-white rounded-xl p-4 border shadow-xs space-y-2">
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
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border shadow-xs space-y-6">
          
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

          {/* Maturity Level Selection Buttons (1 to 5) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
              Maturity Score Rating (1 - 5)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { score: 1, label: "Initial" },
                { score: 2, label: "Emerging" },
                { score: 3, label: "Defined" },
                { score: 4, label: "Managed" },
                { score: 5, label: "Optimized" }
              ].map(({ score, label }) => {
                const isSelected = currentResp.score === score
                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => handleScoreChange(score)}
                    className={`border rounded-xl p-3 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "bg-[#0A1E3C] text-white border-[#0A1E3C] shadow-md ring-2 ring-blue-300 font-bold"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="text-lg font-extrabold">{score}</span>
                    <span className={`text-[10px] font-medium ${isSelected ? "text-blue-200" : "text-slate-500"}`}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Assessment Notes Textarea */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500">
              Assessment Notes & Findings
            </label>
            <AssessmentNotesTextarea
              key={currentKey}
              initialValue={currentResp.answer || ""}
              onSaveAnswer={handleAnswerChange}
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
              <button
                type="button"
                onClick={handleComplete}
                className="px-8 py-3 bg-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-emerald-800 shadow-md transition-all cursor-pointer"
              >
                Complete Audit ✓
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 30% (Tips, Discussion & Triggered Patterns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Consultant Discussion Card */}
          <div className="bg-white rounded-2xl p-6 border shadow-xs space-y-3">
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
          <div className="bg-white rounded-2xl p-6 border shadow-xs space-y-3">
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
          <div className="bg-white rounded-2xl p-6 border shadow-xs space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
              Pillar Quick Index
            </h4>
            <QuickIndexList
              questions={questions}
              currentIndex={currentIndex}
              responses={responses}
              onSelectQuestion={handleSelectQuestion}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
