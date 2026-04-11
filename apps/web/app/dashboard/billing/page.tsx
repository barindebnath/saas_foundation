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
  const hasStripeCustomer = !!subscription?.stripeCustomerId

  const trialEnd = new Date()
  trialEnd.setDate(trialEnd.getDate() + 30)

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      {/* Page heading */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-[#1c1b1b]">Billing</h1>
        <span className="text-[15px] font-medium text-[#747878]">
          Manage your subscription and usage for your organization
        </span>
      </div>

      {/* Card 1 — Current Plan */}
      <div className="bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#747878] tracking-widest uppercase">
            Current Plan
          </span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#1c1b1b] capitalize">{planName}</span>
            <Badge
              variant={status === "active" ? "success" : "secondary"}
              className="capitalize"
            >
              {status}
            </Badge>
          </div>
          <span className="text-[13px] text-[#747878]">
            {status === "trialing"
              ? `Your trial ends on ${trialEnd.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`
              : status === "active"
                ? "Your subscription is active"
                : `Status: ${status}`}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {hasStripeCustomer && <ManageBillingButton />}
          {hasStripeCustomer && (
            <span className="text-[11px] text-[#747878]">
              Update payment method, download invoices
            </span>
          )}
        </div>
      </div>

      {/* Card 2 — Usage */}
      <div className="bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm p-8 flex flex-col gap-6">
        <h3 className="font-bold text-lg text-[#1c1b1b]">Usage This Period</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[15px]">
            <span className="font-medium text-[#1c1b1b]">Projects</span>
            <span className="text-[#747878] font-medium">
              {projectCount} of {planLimit === Infinity ? "∞" : planLimit} used
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2.5 rounded-full bg-[#e2e8f8] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1c1b1b] transition-all duration-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-[#1c1b1b] w-12 text-right">
              {Math.round(usagePercent)}%
            </span>
          </div>
          {planName.toLowerCase() !== "pro" && (
            <p className="text-[13px] text-[#747878] mt-1">
              Upgrade to Pro for unlimited projects{" "}
              <span className="font-bold text-[#1c1b1b] underline underline-offset-4 cursor-pointer">
                Upgrade →
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Card 3 — Upgrade CTA (dark) */}
      {planName.toLowerCase() !== "pro" && (
        <div className="bg-[#1c1b1b] rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-start justify-between gap-8 text-white">
          <div className="flex flex-col gap-6 flex-1">
            <h3 className="text-2xl font-bold">Unlock everything</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
              {[
                "Unlimited organizations",
                "Unlimited projects",
                "Stripe billing management",
                "Priority support",
                "RBAC permissions",
                "Webhook integrations",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 shrink-0 md:min-w-[220px]">
            <div className="text-center">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-lg text-white/60"> / month</span>
            </div>
            <span className="text-[13px] text-white/50 text-center">
              per organization, billed monthly
            </span>
            <UpgradeButton />
            <span className="text-[11px] text-white/40">
              No commitment. Cancel anytime.
            </span>
          </div>
        </div>
      )}

      {/* Card 4 — Billing History */}
      <div className="bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm p-8 flex flex-col gap-4">
        <h3 className="font-bold text-lg text-[#1c1b1b]">Billing History</h3>
        <div className="py-12 text-center text-[15px] text-[#747878]">
          No invoices yet. Your invoices will appear here after your first payment.
        </div>
      </div>
    </div>
  )
}
