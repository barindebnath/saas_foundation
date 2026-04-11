"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Square, LayoutDashboard, Activity, Users, Folders, Settings, Plus, HelpCircle, CreditCard } from "lucide-react"

import { cn } from "../lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "DASH", href: "/dashboard", icon: LayoutDashboard },
    { name: "STATS", href: "/dashboard/stats", icon: Activity },
    { name: "TEAM", href: "/dashboard/team", icon: Users },
    { name: "WORKS", href: "/dashboard/projects", icon: Folders },
    { name: "BILL", href: "/dashboard/billing", icon: CreditCard },
    { name: "SETUP", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 w-20 bg-[#1c1b1b] flex flex-col items-center py-6 border-r border-[#1c1b1b] z-50">
      <div className="w-10 h-10 bg-white rounded flex items-center justify-center mb-8 shrink-0">
        <Square className="w-5 h-5 text-[#1c1b1b]" fill="currentColor" />
      </div>

      <nav className="flex flex-col w-full gap-2 px-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-full h-14 flex flex-col justify-center items-center rounded-md gap-1 transition-colors relative text-[#747b88] hover:text-white hover:bg-white/5",
                isActive && "text-white bg-[#474646] hover:bg-[#474646]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-md" />
              )}
              <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wider">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col w-full gap-4 items-center shrink-0 mt-4">
        <button className="w-10 h-10 bg-white hover:bg-white/90 text-[#1c1b1b] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105">
          <Plus className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 text-[#747b88] hover:text-white flex items-center justify-center transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}
