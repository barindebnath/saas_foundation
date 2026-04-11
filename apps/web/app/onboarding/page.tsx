import { auth, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Square } from "lucide-react"
import OrgList from "./_components/org-list"
import Link from "next/link"

export default async function OnboardingPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  const client = await clerkClient()
  const memberships = await client.users.getOrganizationMembershipList({ userId })

  const orgs = memberships.data.map(m => ({
    id: m.organization.id,
    name: m.organization.name,
    role: m.role,
    imageUrl: m.organization.imageUrl,
  }))

  return (
    <main className="min-h-screen bg-[#f9f9ff] text-[#151c27] flex items-center justify-center p-4 font-sans selection:bg-[#151c27] selection:text-white">
      <div className="w-full max-w-[480px] flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-12 h-12 bg-[#151c27] rounded shadow-sm mb-6 flex items-center justify-center">
            <Square className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
          <span className="text-xs font-semibold text-[#747878] tracking-widest uppercase mb-4">SaaS Foundation</span>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 tracking-tight">Welcome. Set up your workspace.</h1>
          <p className="text-[15px] text-[#747878]">
            You need an organization to continue. Join an existing one or create a new one.
          </p>
        </div>

        {/* Action Form */}
        <OrgList organizations={orgs} />

        <div className="mt-12 text-center">
          <Link href="mailto:support@saasfoundation.com" className="text-sm text-[#747878] hover:text-[#151c27] transition-colors underline decoration-[#c4c7c7] hover:decoration-[#151c27] underline-offset-4">
            Need help? Contact support
          </Link>
        </div>
      </div>
    </main>
  )
}
