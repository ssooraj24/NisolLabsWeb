"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

interface MenuItem {
  label: string
  href: string
  role?: string
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

export const Sidebar = () => {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single()
          if (profile) {
            setUserRole(profile.role)
          }
        }
      } catch (err) {
        console.error("Failed to fetch user role for sidebar:", err)
      }
    }
    fetchRole()
  }, [])

  const menuSections: MenuSection[] = [
    {
      title: "🧠 NISOL INTELLIGENCE",
      items: [
        { label: "Dashboard", href: "/intelligence/dashboard" },
        { label: "Audits", href: "/intelligence/audits" },
        { label: "Templates", href: "/intelligence/templates", role: "super_admin" },
        { label: "Blueprints", href: "/intelligence/blueprints" },
      ],
    },
    {
      title: "📋 NISOL DISCOVERY",
      items: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Tenants / Clients", href: "/clients" },
        { label: "Audits", href: "/audits" },
        { label: "Questionnaire Library", href: "/questionnaire" },
        { label: "Profile", href: "/profile" },
      ],
    },
  ]

  return (
    <aside className="w-64 bg-[#0A1E3C] border-r border-slate-800 h-full p-4 text-white flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="px-3 py-4 border-b border-white/10 mb-4">
          <span className="text-xs uppercase tracking-wider text-blue-300 font-bold block">
            Nisol Labs
          </span>
          <span className="text-lg font-bold text-white">Platform Portal</span>
        </div>

        <div className="space-y-6">
          {menuSections.map((section) => {
            const visibleItems = section.items.filter((item) => {
              if (!item.role) return true
              if (item.role === "super_admin") {
                return userRole === "super_admin"
              }
              return true
            })

            return (
              <div key={section.title}>
                <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {visibleItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        item.href !== "/intelligence/dashboard" &&
                        pathname.startsWith(item.href))
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-600 text-white font-semibold shadow-sm"
                              : "text-slate-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.role === "super_admin" && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-semibold">
                              Admin
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-400">
        <p className="font-semibold text-slate-200">Supabase Connected</p>
        <p className="mt-0.5">Enterprise Intelligence v1.0</p>
      </div>
    </aside>
  )
}
