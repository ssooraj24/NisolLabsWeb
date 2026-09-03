"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  ChevronDown, 
  ChevronRight,
  ExternalLink
} from "lucide-react"

interface MenuItem {
  label: string
  href: string
  badge?: string
  external?: boolean
}

interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
}

export const Sidebar = () => {
  const pathname = usePathname()

  // Track collapsed state for each menu section
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    partners: false,
    intelligence: false,
    discovery: false,
  })

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const menuSections: MenuSection[] = [
    {
      id: "partners",
      title: "🤝 NISOL PARTNER PROGRAM",
      items: [
        { label: "Partner Management Hub", href: "/dashboard/partners", badge: "SUPERADMIN" },
        { label: "📥 Applications & Approvals", href: "/dashboard/partners?tab=applications" },
        { label: "🛡️ Timestamped Deal Conflicts", href: "/dashboard/partners?tab=deals" },
        { label: "👥 Partner Directory & Tiers", href: "/dashboard/partners?tab=directory" },
        { label: "💰 Commissions & Payouts", href: "/dashboard/partners?tab=commissions" },
        { label: "📄 Partner Terms & Conditions", href: "/partner/terms", external: true, badge: "NEW TAB" },
      ],
    },
    {
      id: "intelligence",
      title: "🧠 NISOL INTELLIGENCE & GRANTS",
      items: [
        { label: "Intelligence Dashboard", href: "/intelligence/dashboard" },
        { label: "🎓 Intelligence Grants Program", href: "/intelligence/grants", external: true, badge: "NEW TAB" },
        { label: "📐 Solution Blueprints", href: "/intelligence/blueprints" },
      ],
    },
    {
      id: "discovery",
      title: "📋 NISOL DISCOVERY & CLIENTS",
      items: [
        { label: "Discovery Dashboard", href: "/dashboard" },
        { label: "Tenants / Clients", href: "/clients" },
        { label: "Users & Team", href: "/users" },
        { label: "Discovery Audits", href: "/audits" },
        { label: "Intelligence Audits", href: "/intelligence/audits" },
        { label: "Templates Library", href: "/intelligence/templates" },
        { label: "Questionnaire Library", href: "/questionnaire" },
        { label: "Profile", href: "/profile" },
      ],
    },
  ]

  return (
    <aside className="w-64 bg-[#0A1E3C] border-r border-slate-800 h-full p-4 text-white flex flex-col justify-between overflow-y-auto shrink-0 shadow-xl font-sans">
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

        {/* Menu Sections (Collapsible & Expandable) */}
        <div className="space-y-4">
          {menuSections.map((section) => {
            const isCollapsed = collapsedSections[section.id]

            return (
              <div key={section.id} className="space-y-1">
                {/* Collapsible Section Header */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider hover:text-white flex items-center justify-between transition-colors cursor-pointer rounded-lg hover:bg-white/5"
                >
                  <span className="truncate">{section.title}</span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-golden-400 shrink-0" />
                  )}
                </button>

                {/* Section Items */}
                {!isCollapsed && (
                  <ul className="space-y-1 pl-1">
                    {section.items.map((item) => {
                      const isActive =
                        !item.external &&
                        (pathname === item.href ||
                          (item.href !== "/dashboard" &&
                            item.href !== "/intelligence/dashboard" &&
                            item.href.includes("?") === false &&
                            pathname.startsWith(item.href)))

                      if (item.external) {
                        return (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all group"
                            >
                              <span className="truncate flex items-center gap-1.5">
                                <span>{item.label}</span>
                              </span>
                              <div className="flex items-center gap-1">
                                {item.badge && (
                                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-golden-500/20 text-golden-300 border border-golden-400/30">
                                    {item.badge}
                                  </span>
                                )}
                                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-golden-400 shrink-0" />
                              </div>
                            </a>
                          </li>
                        )
                      }

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
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                                  isActive
                                    ? "bg-navy-950 text-golden-400"
                                    : item.badge === "SUPERADMIN"
                                    ? "bg-golden-500/20 text-golden-300 border border-golden-500/30"
                                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
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
