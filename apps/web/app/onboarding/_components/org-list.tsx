"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { CreateOrgDialog } from "./create-org-dialog"
import { Button } from "../../../components/ui/button"
import { ArrowRight } from "lucide-react"

interface Organization {
  id: string
  name: string
  role: string
  imageUrl?: string
}

export default function OrgList({ organizations }: { organizations: Organization[] }) {
  const { setActive } = useOrganizationList()
  const router = useRouter()

  const handleEnter = async (orgId: string) => {
    if (!setActive) return
    await setActive({ organization: orgId })
    router.push("/dashboard")
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-[#747878]">
          Your Organizations
        </h2>
        
        {organizations.length === 0 ? (
          <p className="text-sm italic text-[#747878] py-4 text-center">
            You don't belong to any organizations yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {organizations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  {org.imageUrl ? (
                    <img src={org.imageUrl} alt={org.name} className="w-10 h-10 rounded shadow-sm object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-[#e2e8f8] flex items-center justify-center font-bold text-[#151c27] shadow-sm">
                      {org.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-[#151c27]">{org.name}</span>
                    <span className="text-xs text-[#747878] capitalize">{org.role.replace("org:", "")}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleEnter(org.id)} className="h-8 group rounded text-xs gap-1 border border-[#c4c7c7]/50 text-[#151c27]">
                  Enter <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <hr className="flex-1 border-[#c4c7c7]/30" />
        <span className="text-xs text-[#747878]">or</span>
        <hr className="flex-1 border-[#c4c7c7]/30" />
      </div>

      <CreateOrgDialog />
    </div>
  )
}
