"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: "dashboard", label: "Dash" },
  { href: "/dashboard/stats", icon: "monitoring", label: "Stats" },
  { href: "/dashboard/team", icon: "group", label: "Team" },
  { href: "/dashboard/projects", icon: "inventory_2", label: "Works" },
  { href: "/dashboard/settings", icon: "settings", label: "Setup" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="bg-[#1c1b1b] h-screen w-20 fixed left-0 top-0 flex flex-col py-6 z-50">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <span
              className="text-[#1c1b1b] text-xl font-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              token
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col items-center space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-full py-3 transition-all ${
                  isActive
                    ? "border-l-4 border-[#e5e2e1] bg-[#474646] text-white"
                    : "text-neutral-400 hover:text-white hover:bg-[#474646]/50 border-l-4 border-transparent"
                }`}
              >
                <span className="font-icon">
                  {item.icon}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-tighter">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto flex flex-col items-center space-y-6">
          <button
            className="w-12 h-12 bg-white text-[#1c1b1b] rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-lg"
            title="Invite Member"
          >
            <span className="font-icon">add</span>
          </button>
          <div className="pt-4 border-t border-white/10 w-full flex flex-col items-center space-y-4">
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors"
              title="Help"
            >
              <span className="font-icon">
                help_outline
              </span>
            </a>
            <a
              href="/sign-out"
              className="text-neutral-400 hover:text-white transition-colors pb-4"
              title="Logout"
            >
              <span className="font-icon">
                logout
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}