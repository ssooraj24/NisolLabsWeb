"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"

type Audit = {
  id: string
  title: string
  status: string | null
  overall_maturity_score: number | null
  tenant_id: string
  conducted_by: string | null
  created_at: string
  raw_responses?: Record<string, any>
}

export default function AuditPage() {
  const params = useParams()
  const auditId = params?.auditId as string

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )
  const [audit, setAudit] = useState<Audit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auditId) return
    const fetchAudit = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", auditId)
        .single()

      if (error) {
        setError(error.message)
        setAudit(null)
      } else {
        setAudit(data as Audit)
        setError(null)
      }
      setLoading(false)
    }
    fetchAudit()
  }, [auditId, supabase])

  if (loading) return <p className="p-6">Loading audit details...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>
  if (!audit) return <p className="p-6">Audit not found.</p>

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/audits" className="text-xs text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Audits
          </Link>
          <h1 className="text-2xl font-bold text-[#0A1E3C]">{audit.title}</h1>
        </div>
        <Link
          href={`/audits/${audit.id}/questionnaire`}
          className="px-4 py-2 bg-[#0A1E3C] text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          Conduct / Answer Questionnaire
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm space-y-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b">
          <div>
            <span className="block text-xs text-slate-400 font-medium">Status</span>
            <span className="font-semibold text-slate-800 capitalize">{audit.status || "draft"}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium">Overall Score</span>
            <span className="font-semibold text-[#0A1E3C]">{audit.overall_maturity_score ?? 0} / 5.0</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium">Created Date</span>
            <span className="font-semibold text-slate-800">{new Date(audit.created_at).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium">Audit ID</span>
            <span className="font-mono text-xs text-slate-600 truncate block">{audit.id}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Recorded Responses</h3>
          {audit.raw_responses && Object.keys(audit.raw_responses).length > 0 ? (
            <pre className="bg-slate-50 p-4 rounded-lg text-xs font-mono text-slate-700 overflow-x-auto border">
              {JSON.stringify(audit.raw_responses, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-slate-500 italic">No responses recorded yet for this audit.</p>
          )}
        </div>
      </div>
    </section>
  )
}
