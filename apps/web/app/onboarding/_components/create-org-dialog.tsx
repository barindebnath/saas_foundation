"use client"

import { CreateOrganization } from "@clerk/nextjs"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "../../../components/ui/dialog"
import { PlusCircle } from "lucide-react"

export function CreateOrgDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full relative overflow-hidden group flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-[#c4c7c7] transition-all hover:bg-black/5 hover:border-solid hover:border-[#151c27]">
          <div className="flex flex-col items-center transition-transform group-hover:scale-105">
            <PlusCircle className="w-8 h-8 mb-3 text-[#151c27]" strokeWidth={1.5} />
            <span className="font-bold text-[#151c27] mb-1">Create a new organization</span>
            <span className="text-sm text-[#747878]">Start fresh with your own workspace.</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[440px] p-0 border-none bg-transparent shadow-none [&>button]:hidden flex justify-center overflow-visible">
        {/* Accessibility titles for Radix */}
        <DialogTitle className="sr-only">Create Organization</DialogTitle>
        <DialogDescription className="sr-only">
          Fill in the details below to create a new organization.
        </DialogDescription>
        
        {/* We use hiding on the default close button because the Clerk component has its own header */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full">
          <CreateOrganization routing="hash" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
