"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, Users, Folders, Settings, Plus, HelpCircle, LogOut, Square } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dash" },
  { href: "/dashboard/stats", icon: BarChart3, label: "Stats" },
  { href: "/dashboard/team", icon: Users, label: "Team" },
  { href: "/dashboard/projects", icon: Folders, label: "Works" },
  { href: "/dashboard/settings", icon: Settings, label: "Setup" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#f2f3fb] h-screen w-20 fixed left-0 top-0 flex flex-col py-8 z-50">
      {/* Logo */}
      <div className="mb-12 flex flex-col items-center">
        <div className="w-10 h-10 rounded-lg bg-[#1c1b1b] flex items-center justify-center shadow-sm">
          <Square className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 w-full py-4 transition-all relative ${
                isActive
                  ? "text-[#1c1b1b]"
                  : "text-[#747878] hover:text-[#1c1b1b]"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#1c1b1b] rounded-r-full" />
              )}
              <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] uppercase font-bold tracking-widest font-label">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="mt-auto flex flex-col items-center space-y-8">
        <button
          className="w-12 h-12 bg-[#1c1b1b] text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-md active:scale-95"
          title="New Action"
        >
          <Plus className="w-6 h-6" strokeWidth={3} />
        </button>
        <div className="flex flex-col items-center space-y-6 pb-4">
          <a
            href="#"
            className="text-[#747878] hover:text-[#1c1b1b] transition-colors"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </a>
          <a
            href="/sign-out"
            className="text-[#747878] hover:text-[#1c1b1b] transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </a>
        </div>
      </div>
    </aside>
  );
}