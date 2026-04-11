import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <>
      <header className="bg-[#f9f9ff] sticky top-0 z-40 flex justify-between items-center h-16 px-8 border-b border-black/5">
        <div className="flex items-center gap-8">
          {/* Org Switcher */}
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "flex items-center",
                organizationSwitcherTrigger:
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e7eefe] border border-black/5 hover:bg-[#dce2f3] transition-colors text-sm font-medium text-[#151c27]",
              },
            }}
          />

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a
              href="/dashboard"
              className="text-neutral-900 border-b-2 border-black pb-1"
            >
              Overview
            </a>
            <a
              href="/dashboard/stats"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Reports
            </a>
            <a
              href="/dashboard/team"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Activity
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg font-icon">
              search
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-1.5 bg-[#f0f3ff] border border-black/5 rounded-lg text-sm w-64 focus:ring-1 focus:ring-black focus:bg-white transition-all outline-none"
            />
          </div>

          {/* Notifications */}
          <button className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors relative">
            <span className="font-icon">
              notifications
            </span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full" />
          </button>

          {/* User */}
          <UserButton />
        </div>
      </header>
    </>
  );
}