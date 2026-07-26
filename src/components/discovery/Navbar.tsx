"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

export const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userInitials, setUserInitials] = useState<string>("U")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUserEmail(data.user.email || "Consultant")
        const initial = (data.user.email?.[0] || "U").toUpperCase()
        setUserInitials(initial)
      }
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  // Generate breadcrumb from current pathname
  const getBreadcrumb = () => {
    if (pathname.includes("/dashboard")) return "Dashboard"
    if (pathname.includes("/clients") || pathname.includes("/tenants")) return "Clients & Tenants"
    if (pathname.includes("/audits")) {
      if (pathname.includes("/questionnaire")) return "Audits / Assessment Wizard"
      return "Audits Directory"
    }
    if (pathname.includes("/questionnaire")) return "Questionnaire Library"
    if (pathname.includes("/profile")) return "Account Profile"
    return "Discovery Portal"
  }

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between z-30 sticky top-0 shadow-xs">
      {/* Left: Dynamic Breadcrumb & Context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-slate-400">Portal</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#0A1E3C] font-bold text-sm bg-slate-100 px-2.5 py-1 rounded-lg">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Center: Search Bar Mockup */}
      <div className="hidden md:flex items-center w-72 relative">
        <input
          type="text"
          placeholder="Search audits, clients, questions..."
          className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-100/80 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1E3C] focus:bg-white transition-all"
        />
        <svg
          className="w-4 h-4 text-slate-400 absolute left-3 top-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 bg-white px-1.5 rounded border">
          ⌘K
        </span>
      </div>

      {/* Right: Quick Action, Status & User Menu */}
      <div className="flex items-center gap-4">
        {/* Quick New Audit Link */}
        <Link
          href="/dashboard"
          className="hidden sm:flex items-center gap-1.5 bg-[#0A1E3C] text-white hover:bg-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <svg className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Audit
        </Link>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Session</span>
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0A1E3C] to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs border border-white">
              {userInitials}
            </div>
            <div className="hidden md:block text-left">
              <span className="block text-xs font-bold text-[#0A1E3C] max-w-[120px] truncate">
                {userEmail ? userEmail.split("@")[0] : "Consultant"}
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">Internal Assessor</span>
            </div>
            <svg
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
              <div className="px-3 py-2 border-b mb-1">
                <p className="text-xs font-bold text-[#0A1E3C] truncate">{userEmail || "Consultant User"}</p>
                <p className="text-[10px] text-slate-400">Authenticated Supabase User</p>
              </div>

              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Settings
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
