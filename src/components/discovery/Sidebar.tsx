"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tenants / Clients", href: "/clients" },
    { label: "Audits", href: "/audits" },
    { label: "Questionnaire Library", href: "/questionnaire" },
    { label: "Profile", href: "/profile" },
  ]

  return (
    <aside className="w-64 bg-[#0A1E3C] border-r border-slate-800 h-full p-4 text-white flex flex-col justify-between">
      <div>
        <div className="px-3 py-4 border-b border-white/10 mb-4">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold block">
            Nisol Labs
          </span>
          <span className="text-lg font-bold text-white">Discovery Portal</span>
        </div>

        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-400">
        <p className="font-semibold text-slate-200">Supabase Connected</p>
        <p className="mt-0.5">Enterprise Discovery v1.0</p>
      </div>
    </aside>
  )
}
