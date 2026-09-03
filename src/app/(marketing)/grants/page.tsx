"use client"

import { useState } from "react"
import Link from "next/link"

export default function GrantsPage() {
  const [formData, setFormData] = useState({
    org_name: "",
    registration_type: "Section 8 Company",
    hq_location: "",
    mission_statement: "",
    problem_solved: "",
    tech_bottleneck: "",
    leadership_confirmed: true,
    grant_use_case: "",
    amplification_pledged: true,
    media_reach_link: "",
    contact_name: "",
    contact_title: "",
    contact_email: "",
    contact_phone: "",
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try {
      const res = await fetch("/api/grants/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setSubmitted(true)
      } else {
        setErrorMessage(result.error || "Failed to submit application. Please try again.")
      }
    } catch (err: any) {
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070F1E] text-white selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
          <span>Enterprise Intelligence Grant Program 2026</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Apply for the <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            Enterprise Intelligence Grant
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Three flagship awards. <strong className="text-white font-semibold">₹4,50,000 ($5,500)</strong> in full strategic AI architecture. <span className="text-blue-400 font-medium">Zero cost to your institution.</span>
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg mb-4">
              7
            </div>
            <h3 className="text-lg font-semibold text-white">7-Day Diagnostic Sprint</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Full audit of your data, workflows, and operations by senior AI architects using the Nisol One™ framework.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg mb-4">
              15
            </div>
            <h3 className="text-lg font-semibold text-white">15 Board-Ready Deliverables</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Capability scorecards, 3-scenario stress tests, solution blueprints, and a custom financial ROI model.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-lg mb-4">
              📦
            </div>
            <h3 className="text-lg font-semibold text-white">Museum-Grade Dossier</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              A physical, cloth-bound hardcover Intelligence Portfolio delivered to your leadership team with zero vendor lock-in.
            </p>
          </div>
        </div>

        {/* 7-Day Sprint Guide Brochure Download Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/40 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">📄 Client Onboarding Booklet</span>
            <h4 className="text-lg font-bold text-white">The 7-Day Intelligence Sprint Guide</h4>
            <p className="text-xs text-slate-300">
              Download our complete 7-day day-by-day roadmap booklet detailing stakeholder time commitments, deliverables, and board presentation formats.
            </p>
          </div>
          <a
            href="/api/grants/sprint-guide"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide transition-colors whitespace-nowrap shadow-md"
          >
            Download Sprint Booklet (PDF) →
          </a>
        </div>
      </section>

      {/* Main Application Container */}
      <section className="pb-32 px-6 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-6">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white">Application Submitted</h2>
              <p className="text-slate-300 mt-4 max-w-lg mx-auto leading-relaxed">
                Thank you for applying for the Nisol Enterprise Intelligence Grant. A confirmation email has been sent to <strong className="text-white">{formData.contact_email}</strong>.
              </p>
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-sm text-slate-400">
                Our Grant Advisory Board will review your application against our 4-point impact rubric within 5 business days.
              </div>
              <div className="mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Section A */}
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                    A
                  </span>
                  <h2 className="text-xl font-bold text-white">Your Organization</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="org_name"
                      required
                      value={formData.org_name}
                      onChange={handleChange}
                      placeholder="e.g. IIT Bombay AI Center / Akshaya Patra Foundation"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Registration Type *
                    </label>
                    <select
                      name="registration_type"
                      value={formData.registration_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F1E36] border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="Educational Institution">Educational Institution / University</option>
                      <option value="Section 8 Company">Section 8 Company</option>
                      <option value="Trust">Trust</option>
                      <option value="Society">Society</option>
                      <option value="Other">Other Non-Profit Entity</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Headquarters Location *
                    </label>
                    <input
                      type="text"
                      name="hq_location"
                      required
                      value={formData.hq_location}
                      onChange={handleChange}
                      placeholder="City, State / Emirate, Country (e.g. Mumbai, Maharashtra, India)"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Mission Statement *
                    </label>
                    <textarea
                      name="mission_statement"
                      required
                      rows={2}
                      value={formData.mission_statement}
                      onChange={handleChange}
                      placeholder="We exist to accelerate technical research and democratize access to education..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Section B */}
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">
                    B
                  </span>
                  <h2 className="text-xl font-bold text-white">The Impact & The Bottleneck</h2>
                </div>

                <div className="space-y-6 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      The Problem You Solve *
                    </label>
                    <textarea
                      name="problem_solved"
                      required
                      rows={3}
                      value={formData.problem_solved}
                      onChange={handleChange}
                      placeholder="Tell us about the community, students, or cause you serve. What primary challenge are you tackling?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Current Technology Bottleneck *
                    </label>
                    <textarea
                      name="tech_bottleneck"
                      required
                      rows={3}
                      value={formData.tech_bottleneck}
                      onChange={handleChange}
                      placeholder="What manual process consumes the most team hours? Where do you struggle to manage student, donor, or research data?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Section C */}
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">
                    C
                  </span>
                  <h2 className="text-xl font-bold text-white">The Partnership Commitment</h2>
                </div>

                <div className="space-y-6 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Why This Grant? *
                    </label>
                    <textarea
                      name="grant_use_case"
                      required
                      rows={3}
                      value={formData.grant_use_case}
                      onChange={handleChange}
                      placeholder="If awarded this grant, we will use the Nisol Intelligence Architecture to..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Media Reach / Website Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="media_reach_link"
                      value={formData.media_reach_link}
                      onChange={handleChange}
                      placeholder="https://your-institution.edu / social channel link"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="leadership_confirmed"
                        checked={formData.leadership_confirmed}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-0"
                      />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        I confirm our Executive Director / Dean / CEO will be available for the 7-day intensive discovery sprint and final deliverable review.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="amplification_pledged"
                        checked={formData.amplification_pledged}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-0"
                      />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        <strong>Amplification Pledge:</strong> If selected, we are excited to share our journey publicly via a co-produced case study, video testimonial, and joint press release to inspire other institutions.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section D */}
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                    D
                  </span>
                  <h2 className="text-xl font-bold text-white">Primary Contact Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="contact_name"
                      required
                      value={formData.contact_name}
                      onChange={handleChange}
                      placeholder="Dr. Rajesh Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Title / Designation *
                    </label>
                    <input
                      type="text"
                      name="contact_title"
                      required
                      value={formData.contact_title}
                      onChange={handleChange}
                      placeholder="Dean of Research / Executive Director"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      name="contact_email"
                      required
                      value={formData.contact_email}
                      onChange={handleChange}
                      placeholder="rajesh@iitb.ac.in"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="contact_phone"
                      required
                      value={formData.contact_phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  🔒 Applications are reviewed confidentially by the Nisol Grant Advisory Board.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
                >
                  {loading ? "Submitting Application..." : "Apply for the Intelligence Grant →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
