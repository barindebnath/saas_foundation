import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Search, Bell } from "lucide-react";

export function TopNav() {
  return (
    <header className="bg-[#f9f9ff] sticky top-0 z-40 flex justify-between items-center h-20 px-8">
      <div className="flex items-center gap-12">
        {/* Org Switcher */}
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "flex items-center",
              organizationSwitcherTrigger:
                "flex items-center gap-3 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-[#f2f3fb] transition-all text-sm font-bold text-[#151c27] font-label uppercase tracking-widest",
            },
          }}
        />

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest font-label">
          <a
            href="/dashboard"
            className="text-[#1c1b1b] relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#1c1b1b]"
          >
            Overview
          </a>
          <a
            href="/dashboard/stats"
            className="text-[#747878] hover:text-[#1c1b1b] transition-colors"
          >
            Reports
          </a>
          <a
            href="/dashboard/team"
            className="text-[#747878] hover:text-[#1c1b1b] transition-colors"
          >
            Activity
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747878] w-4 h-4" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search workspace..."
            className="pl-11 pr-4 py-2.5 bg-[#f2f3fb] rounded-xl text-sm w-72 focus:ring-2 focus:ring-[#1c1b1b]/5 transition-all outline-none border-none placeholder:text-[#747878] text-[#1c1b1b] font-medium"
          />
        </div>

        {/* Notifications */}
        <button className="w-10 h-10 flex items-center justify-center text-[#747878] hover:text-[#1c1b1b] hover:bg-white hover:shadow-sm rounded-xl transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#1c1b1b] rounded-full border-2 border-[#f9f9ff]" />
        </button>

        {/* User */}
        <div className="pl-2 border-l border-[#f2f3fb] ml-2">
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 rounded-xl" } }} />
        </div>
      </div>
    </header>
  );
}