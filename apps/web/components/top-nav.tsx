"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Search, Bell } from "lucide-react"

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-[#c4c7c7]/30 flex items-center justify-between px-6">
      <div className="flex items-center gap-8 h-full">
        {/* Clerk Org Switcher matching sidebar styling with Clerk appearance prop */}
        <div className="flex items-center">
          <OrganizationSwitcher 
            hidePersonal
            appearance={{
              elements: {
                organizationSwitcherTrigger: "focus:shadow-none hover:bg-black/5 py-1.5 px-2 rounded-md transition-colors",
                organizationPreviewMainIdentifier: "font-semibold text-[#151c27] text-[15px]",
                organizationPreviewAvatarContainer: "w-6 h-6",
              }
            }}
          />
        </div>

        {/* Local Navigation */}
        <nav className="hidden md:flex items-center gap-6 h-full text-[15px] font-medium text-[#747878]">
          <span className="h-full flex items-center border-b-2 border-[#151c27] text-[#151c27] pt-0.5">
            Overview
          </span>
          <span className="h-full flex items-center border-b-2 border-transparent hover:border-[#c4c7c7] hover:text-[#151c27] cursor-pointer transition-colors pt-0.5">
            Reports
          </span>
          <span className="h-full flex items-center border-b-2 border-transparent hover:border-[#c4c7c7] hover:text-[#151c27] cursor-pointer transition-colors pt-0.5">
            Activity
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878]" />
          <input 
            type="text"
            placeholder="Search..."
            className="h-9 w-[280px] rounded-md border border-[#c4c7c7]/40 bg-[#f9f9ff] pl-9 pr-4 text-[15px] outline-none focus:border-[#1c1b1b] focus:ring-1 focus:ring-[#1c1b1b] transition-all placeholder:text-[#c4c7c7]"
          />
        </div>
        
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-[#747878] shrink-0">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>

        <div className="shrink-0 flex translate-y-px">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 rounded-full border border-black/10"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}
