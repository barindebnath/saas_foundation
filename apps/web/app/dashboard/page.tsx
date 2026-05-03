import { auth } from "@clerk/nextjs/server"
import { db, memberships, projects, subscriptions, activityLogs } from "@repo/db"
import { eq, count, desc } from "drizzle-orm"
import { Users, Folders, ShieldCheck, Award } from "lucide-react"
import { MetricCard } from "./_components/metric-card"

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

function formatDistanceToNow(date: Date) {
  const diffDays = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return rtf.format(diffDays, "day")
}

export default async function DashboardPage() {
  const { orgId } = await auth()
  
  if (!orgId) {
    return null
  }

  const [memberCountRes, projectCountRes, subscription, logs] = await Promise.all([
    db.select({ count: count() }).from(memberships).where(eq(memberships.organizationId, orgId)).catch(() => [{ count: 0 }]),
    db.select({ count: count() }).from(projects).where(eq(projects.organizationId, orgId)).catch(() => [{ count: 0 }]),
    db.query.subscriptions.findFirst({ where: eq(subscriptions.organizationId, orgId) }).catch(() => null),
    db.query.activityLogs.findMany({
      where: eq(activityLogs.organizationId, orgId),
      orderBy: [desc(activityLogs.createdAt)],
      limit: 5,
    }).catch(() => []),
  ])

  const activeMembersCount = Number(memberCountRes[0]?.count ?? 0)
  const projectsCount = Number(projectCountRes[0]?.count ?? 0)
  const subStatus = subscription?.status ?? "trialing"
  const planName = subscription?.planId ?? "free"

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto py-4">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-[#747878] uppercase tracking-widest font-label">Executive Intelligence</span>
        <h1 className="text-5xl font-bold tracking-tighter text-[#1c1b1b] font-headline">Overview</h1>
      </div>

      {/* 4 Metric Cards - No borders, tonal layering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={Users} 
          label="Active Members" 
          value={activeMembersCount.toString()} 
          sub="Synced from Clerk" 
          subClassName="text-emerald-600"
        />
        <MetricCard 
          icon={Folders} 
          label="Total Projects" 
          value={projectsCount.toString()} 
          sub={projectsCount === 0 ? "No active work" : "Organization workspace"} 
        />
        <MetricCard 
          icon={ShieldCheck} 
          label="Subscription" 
          value={subStatus} 
          sub={subStatus.toLowerCase() === "trialing" ? "Upgrade required" : "Account active"} 
        />
        <MetricCard 
          icon={Award} 
          label="Service Tier" 
          value={planName} 
          sub={planName.toLowerCase() === "free" ? "Limited Features" : "Premium Tier"} 
          subClassName={planName.toLowerCase() !== 'free' ? 'text-emerald-600' : ''}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl flex flex-col min-h-[420px]">
          <div className="p-8 flex items-center justify-between">
            <h3 className="font-bold text-xl font-headline">Project Performance</h3>
            <div className="flex items-center bg-[#f2f3fb] p-1 rounded-xl">
              <button className="px-4 py-1.5 text-[13px] font-bold rounded-lg bg-white shadow-sm text-[#1c1b1b]">Weekly</button>
              <button className="px-4 py-1.5 text-[13px] font-semibold rounded-lg text-[#747878] hover:text-[#1c1b1b] transition-colors">Monthly</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#747878]">
            <Folders className="w-16 h-16 mb-4 opacity-10 text-[#1c1b1b]" />
            <h4 className="text-lg font-bold text-[#1c1b1b] font-headline mb-1">No performance data</h4>
            <p className="text-[15px] max-w-sm">Activity analytics will appear here as your team grows.</p>
          </div>
        </div>

        <div className="bg-[#f2f3fb] rounded-2xl flex flex-col">
          <div className="p-8">
            <h3 className="font-bold text-xl text-[#1c1b1b] font-headline">Recent Activity</h3>
          </div>
          <div className="flex-1 p-8 pt-0 flex flex-col">
            <div className="relative pl-6 border-l border-[#1c1b1b]/10 pb-8 flex flex-col gap-8 flex-1 mt-2">
              {logs.length > 0 ? logs.map((log) => (
                <div key={log.id} className="relative">
                  <span className="absolute -left-[30px] w-2 h-2 bg-[#1c1b1b] rounded-full top-2"></span>
                  <p className="text-[15px] font-bold text-[#1c1b1b] leading-tight">{log.message}</p>
                  <span className="text-xs text-[#747878] font-medium uppercase tracking-wider">
                    {formatDistanceToNow(new Date(log.createdAt))}
                  </span>
                </div>
              )) : (
                <div className="text-[#747878] text-sm italic">No recent activity</div>
              )}
            </div>
            
            <button className="w-full mt-auto py-4 rounded-xl text-sm font-bold text-[#1c1b1b] bg-white shadow-sm hover:bg-[#1c1b1b] hover:text-white transition-all duration-300">
              View All Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}