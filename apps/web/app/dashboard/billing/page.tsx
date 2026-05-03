import { auth } from "@clerk/nextjs/server"
import { db, subscriptions, projects } from "@repo/db"
import { eq, count } from "drizzle-orm"
import { Check } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { ManageBillingButton } from "./_components/manage-billing-button"
import { UpgradeButton } from "./_components/upgrade-button"

export default async function BillingPage() {
  const { orgId } = await auth()
  if (!orgId) return null

  const [subscription, projectCountRes] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(subscriptions.organizationId, orgId),
    }),
    db.select({ count: count() })
      .from(projects)
      .where(eq(projects.organizationId, orgId)),
  ])

  const projectCount = projectCountRes[0]?.count ?? 0
  const planLimit = subscription?.planId === "pro" ? Infinity : 3
  const usagePercent = planLimit === Infinity ? 0 : Math.min((projectCount / planLimit) * 100, 100)
  const status = subscription?.status ?? "trialing"
  const planName = subscription?.planId ?? "Free"
  const hasSubscription = !!subscription?.subscriptionId

  const trialEnd = new Date()
  trialEnd.setDate(trialEnd.getDate() + 30)

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto py-4">
      {/* Page heading */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-[#747878] uppercase tracking-widest font-label">Financials</span>
        <h1 className="text-5xl font-bold tracking-tighter text-[#1c1b1b] font-headline">Billing</h1>
        <span className="text-[15px] font-medium text-[#747878] mt-1">
          Manage your subscription, invoices, and organization usage
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Card 1 — Current Plan */}
        <div className="bg-white rounded-2xl p-10 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-[#747878] tracking-widest uppercase font-label">
              Active Plan
            </span>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-[#1c1b1b] capitalize font-headline">{planName}</span>
              <Badge
                variant={status === "active" ? "success" : "secondary"}
                className="capitalize px-3 py-1 rounded-lg text-xs font-bold"
              >
                {status}
              </Badge>
            </div>
            <p className="text-[15px] text-[#747878] font-medium">
              {status === "trialing"
                ? `Your trial period concludes on ${trialEnd.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`
                : status === "active"
                  ? "Your organization is currently on a paid subscription."
                  : `Current account status: ${status}`}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {hasSubscription && <ManageBillingButton />}
            {hasSubscription && (
              <span className="text-[11px] font-bold text-[#747878] uppercase tracking-wider">
                Managed via Lemon Squeezy Portal
              </span>
            )}
          </div>
        </div>

        {/* Card 2 — Usage */}
        <div className="bg-[#f2f3fb] rounded-2xl p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-2xl text-[#1c1b1b] font-headline">Resource Usage</h3>
            <p className="text-[15px] text-[#747878]">Capacity utilization for the current billing cycle</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-[13px] font-bold uppercase tracking-widest font-label text-[#747878]">
              <span>Projects Provisioned</span>
              <span className="text-[#1c1b1b]">
                {projectCount} / {planLimit === Infinity ? "Unlimited" : planLimit}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex-1 h-3 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1c1b1b] transition-all duration-700 ease-out"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <span className="text-lg font-bold text-[#1c1b1b] w-12 text-right font-headline">
                {Math.round(usagePercent)}%
              </span>
            </div>
            {planName.toLowerCase() !== "pro" && (
              <p className="text-[13px] text-[#747878] mt-2 font-medium">
                You are approaching your limit. <span className="font-bold text-[#1c1b1b] underline cursor-pointer">Upgrade to Pro</span> for unlimited scale.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 3 — Upgrade CTA (premium dark) */}
      {planName.toLowerCase() !== "pro" && (
        <div className="bg-[#1c1b1b] rounded-3xl p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all duration-1000"></div>
          <div className="flex flex-col gap-10 flex-1 relative z-10">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] font-label">Premium Expansion</span>
              <h3 className="text-5xl font-bold font-headline tracking-tighter">Scale without limits.</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-[15px]">
              {[
                "Unlimited organizations",
                "Unlimited projects",
                "Advanced team permissions",
                "Dedicated priority support",
                "Custom webhook events",
                "SLA guarantees",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-white/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 shrink-0 lg:min-w-[300px] bg-white/5 p-10 rounded-3xl backdrop-blur-sm relative z-10 border border-white/10">
            <div className="text-center">
              <span className="text-6xl font-bold font-headline">$29</span>
              <span className="text-xl text-white/50 font-medium"> / mo</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <UpgradeButton />
              <span className="text-[11px] text-white/40 font-bold uppercase tracking-widest mt-2">Billed per workspace</span>
            </div>
          </div>
        </div>
      )}

      {/* Card 4 — Billing History */}
      <div className="bg-white rounded-2xl p-12 flex flex-col gap-6">
        <h3 className="font-bold text-2xl text-[#1c1b1b] font-headline">Billing History</h3>
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f2f3fb] flex items-center justify-center">
            <Check className="w-8 h-8 text-[#c4c7c7]" />
          </div>
          <p className="text-[15px] text-[#747878] max-w-xs font-medium">
            Your billing history is currently empty. Invoices will be generated upon your first successful transaction.
          </p>
        </div>
      </div>
    </div>
  )
}
