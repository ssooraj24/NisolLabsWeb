"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { 
  Handshake, 
  Sparkles, 
  Award, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  ChevronDown, 
  ChevronRight,
  Compass,
  LayoutDashboard,
  Building2,
  Layers,
  HelpCircle,
  Zap
} from "lucide-react"

interface MenuItem {
  label: string
  href: string
  badge?: string
  icon?: any
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

export const Sidebar = () => {
  const pathname = usePathname()
  const [partnerMenuExpanded, setPartnerMenuExpanded] = useState(true)

  const menuSections: MenuSection[] = [
    {
      title: "🤝 NISOL PARTNER PROGRAM",
      items: [
        { label: "Partner Management Hub", href: "/dashboard/partners", badge: "SUPERADMIN" },
        { label: "📥 Applications & Approvals", href: "/dashboard/partners?tab=applications" },
        { label: "🛡️ Timestamped Deal Conflicts", href: "/dashboard/partners?tab=deals" },
        { label: "👥 Partner Directory & Tiers", href: "/dashboard/partners?tab=directory" },
        { label: "💰 Commissions & Payouts", href: "/dashboard/partners?tab=commissions" },
        { label: "📄 Partner Terms & Conditions", href: "/partner/terms" },
      ],
    },
    {
      title: "🧠 NISOL INTELLIGENCE & GRANTS",
      items: [
        { label: "Intelligence Dashboard", href: "/intelligence/dashboard" },
        { label: "Intelligence Grants", href: "/intelligence/grants", badge: "GRANTS" },
        { label: "Public Grants Program", href: "/grants" },
        { label: "Audits", href: "/intelligence/audits" },
        { label: "Templates", href: "/intelligence/templates" },
        { label: "Blueprints", href: "/intelligence/blueprints" },
      ],
    },
    {
      title: "📋 NISOL DISCOVERY & CLIENTS",
      items: [
        { label: "Discovery Dashboard", href: "/dashboard" },
        { label: "Tenants / Clients", href: "/clients" },
        { label: "Users & Team", href: "/users" },
        { label: "Discovery Audits", href: "/audits" },
        { label: "Questionnaire Library", href: "/questionnaire" },
        { label: "Profile", href: "/profile" },
      ],
    },
  ]

  return (
    <aside className="w-64 bg-[#0A1E3C] border-r border-slate-800 h-full p-4 text-white flex flex-col justify-between overflow-y-auto shrink-0 shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="px-3 py-4 border-b border-white/10 mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-golden-400 font-bold block">
              Nisol AI Core
            </span>
            <span className="text-base font-extrabold text-white flex items-center gap-1.5">
              <span>Platform Portal</span>
            </span>
          </div>
          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-golden-500/20 text-golden-300 border border-golden-400/40">
            v2.4
          </span>
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{section.title}</span>
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      item.href !== "/intelligence/dashboard" &&
                      item.href.includes("?") === false &&
                      pathname.startsWith(item.href))

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-golden-500 text-navy-950 font-bold shadow-md"
                            : "text-slate-200 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                            isActive
                              ? "bg-navy-950 text-golden-400"
                              : item.badge === "SUPERADMIN"
                              ? "bg-golden-500/20 text-golden-300 border border-golden-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between font-bold text-slate-200">
          <span>Superadmin Active</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-[10px]">Supabase & Deal Engine Active</p>
      </div>
    </aside>
  )
}
