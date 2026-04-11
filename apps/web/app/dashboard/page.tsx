import { auth } from "@clerk/nextjs/server"
import { db, organizations, memberships, projects, subscriptions } from "@repo/db"
import { eq, count } from "drizzle-orm"
import { Users, Folders, ShieldCheck, Award } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const { orgId } = await auth()
  
  if (!orgId) {
    return null // Handled smoothly by middleware
  }

  const [org, memberCountRes, projectCountRes, subscription] = await Promise.all([
    db.query.organizations.findFirst({ where: eq(organizations.id, orgId) }),
    db.select({ count: count() }).from(memberships).where(eq(memberships.organizationId, orgId)),
    db.select({ count: count() }).from(projects).where(eq(projects.organizationId, orgId)),
    db.query.subscriptions.findFirst({ where: eq(subscriptions.organizationId, orgId) })
  ])

  const activeMembersCount = memberCountRes[0]?.count ?? 0
  const projectsCount = projectCountRes[0]?.count ?? 0
  const subStatus = subscription?.status ?? "Trialing"
  const planName = subscription?.planId ?? "Free"

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-[#747878] tracking-widest uppercase">Executive Overview</span>
        <h1 className="text-3xl font-bold tracking-tight text-[#1c1b1b]">Overview</h1>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-[#c4c7c7]/30 p-8 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#151c27]">
            <Users className="w-5 h-5 opacity-70" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Active Members</h3>
          </div>
          <div className="flex flex-col items-start gap-1 mt-2">
            <span className="text-4xl font-bold">{activeMembersCount}</span>
            <span className="text-[13px] font-medium text-emerald-600">Synced from Clerk</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-[#c4c7c7]/30 p-8 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#151c27]">
            <Folders className="w-5 h-5 opacity-70" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Projects</h3>
          </div>
          <div className="flex flex-col items-start gap-1 mt-2">
            <span className="text-4xl font-bold">{projectsCount}</span>
            <span className="text-[13px] font-medium text-[#747878]">
              {projectsCount === 0 ? "No projects yet" : "Active projects"}
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-[#c4c7c7]/30 p-8 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#151c27]">
            <ShieldCheck className="w-5 h-5 opacity-70" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Subscription Status</h3>
          </div>
          <div className="flex flex-col items-start gap-1 mt-2">
            <span className="text-3xl font-bold capitalize truncate w-full">{subStatus}</span>
            <span className="text-[13px] font-medium text-[#747878]">
              {subStatus.toLowerCase() === "trialing" ? "Upgrade to activate" : "Good standing"}
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-[#c4c7c7]/30 p-8 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#151c27]">
            <Award className="w-5 h-5 opacity-70" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Plan</h3>
          </div>
          <div className="flex flex-col items-start gap-1 mt-2">
            <span className="text-3xl font-bold capitalize truncate w-full">{planName}</span>
            {planName.toLowerCase() === "free" ? (
              <Link href="/dashboard/billing" className="text-[13px] font-medium text-[#1c1b1b] underline decoration-[#c4c7c7] underline-offset-4 hover:decoration-[#1c1b1b] transition-all">
                Manage Billing
              </Link>
            ) : (
              <span className="text-[13px] font-medium text-emerald-600">Active</span>
            )}
          </div>
        </div>
      </div>

      {/* Two column section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm flex flex-col min-h-[420px]">
          <div className="p-6 border-b border-[#c4c7c7]/30 flex items-center justify-between">
            <h3 className="font-semibold text-lg">Project Performance</h3>
            <div className="flex items-center bg-[#f9f9ff] p-1 rounded-lg border border-[#c4c7c7]/30">
              <button className="px-4 py-1.5 text-[13px] font-bold rounded-md bg-white shadow-sm text-[#1c1b1b]">Weekly</button>
              <button className="px-4 py-1.5 text-[13px] font-semibold rounded-md text-[#747878] hover:text-[#1c1b1b] transition-colors">Monthly</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#747878]">
            <Folders className="w-16 h-16 mb-4 opacity-20 text-[#1c1b1b]" />
            <h4 className="text-lg font-bold text-[#1c1b1b] mb-1">No projects yet</h4>
            <p className="text-[15px] max-w-sm">Create your first project to see performance logs here.</p>
          </div>
        </div>

        <div className="bg-[#f0f3ff] rounded-xl border border-[#c4c7c7]/20 shadow-sm flex flex-col">
          <div className="p-6 border-b border-[#c4c7c7]/20">
            <h3 className="font-semibold text-lg text-[#1c1b1b]">Recent Activity</h3>
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <div className="relative pl-6 border-l-2 border-[#1c1b1b]/10 pb-8 flex flex-col gap-10 flex-1 mt-2">
              <div className="relative">
                <span className="absolute -left-[30px] w-3 h-3 bg-[#f0f3ff] border-2 border-[#1c1b1b] rounded-full top-1.5"></span>
                <p className="text-[15px] font-bold text-[#1c1b1b]">Organization Created</p>
                <span className="text-sm text-[#747878]">Just now</span>
              </div>
              <div className="relative">
                <span className="absolute -left-[30px] w-3 h-3 bg-[#f0f3ff] border-2 border-[#1c1b1b]/40 rounded-full top-1.5"></span>
                <p className="text-[15px] font-bold text-[#1c1b1b]">Owner Joined</p>
                <span className="text-sm text-[#747878]">2 mins ago</span>
              </div>
              <div className="relative">
                <span className="absolute -left-[30px] w-3 h-3 bg-[#f0f3ff] border-2 border-[#1c1b1b]/40 rounded-full top-1.5"></span>
                <p className="text-[15px] font-bold text-[#1c1b1b]">Trial Started</p>
                <span className="text-sm text-[#747878]">5 mins ago</span>
              </div>
            </div>
            
            <button className="w-full mt-auto py-3 rounded-lg border border-[#c4c7c7]/50 text-[15px] font-bold text-[#1c1b1b] bg-white shadow-sm hover:bg-black/5 transition-colors">
              View All Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}