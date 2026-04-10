import { auth } from "@clerk/nextjs/server";
import { db } from "@repo/db";
import { organizations, memberships } from "@repo/db";
import { eq, count } from "drizzle-orm";
import { MetricCard } from "./_components/metric-card";

export default async function DashboardPage() {
  const { orgId } = await auth();

  // Fetch real data from DB
  const [org, memberCount] = await Promise.all([
    orgId
      ? db.query.organizations.findFirst({
          where: eq(organizations.id, orgId),
        })
      : null,
    orgId
      ? db
          .select({ count: count() })
          .from(memberships)
          .where(eq(memberships.organizationId, orgId))
          .then((r) => r[0]?.count ?? 0)
      : 0,
  ]);

  if (!orgId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#444748]">
          Select or create an organization to get started.
        </p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-8 bg-[#f9f9ff] space-y-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#444748]">
          Executive Overview
        </p>
        <h2 className="text-4xl font-extrabold tracking-tight text-[#151c27] pt-2">
          Overview
        </h2>
      </section>

      {/* Metric Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon="group"
          label="Active Members"
          value={String(memberCount)}
          sub="↑ Synced from Clerk"
          subClassName="text-green-600"
        />
        <MetricCard
          icon="inventory_2"
          label="Projects"
          value="0"
          sub="No projects yet"
        />
        <MetricCard
          icon="verified_user"
          label="Subscription Status"
          value="Trialing"
          sub="Upgrade to activate"
        />
        <MetricCard
          icon="workspace_premium"
          label="Plan"
          value="Free"
          sub="Manage Billing"
          subClassName="text-[#151c27] cursor-pointer hover:underline"
        />
      </section>

      {/* Bottom Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 border border-black/5 shadow-[0px_24px_48px_rgba(21,28,39,0.06)]">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold tracking-tight text-[#151c27]">
              Project Performance
            </h4>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-xs font-bold bg-[#151c27] text-white rounded-md">
                Weekly
              </button>
              <button className="px-4 py-1.5 text-xs font-bold bg-[#f0f3ff] text-[#444748] rounded-md">
                Monthly
              </button>
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span
              className="text-4xl text-[#c4c7c7] mb-3"
              style={{ fontFamily: "Material Symbols Outlined" }}
            >
              inventory_2
            </span>
            <p className="text-sm font-medium text-[#444748]">
              No projects yet
            </p>
            <p className="text-xs text-[#747878] mt-1">
              Create your first project to see performance here
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#f0f3ff]/50 rounded-xl p-8 border border-black/5">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#444748] mb-6">
            Recent Activity
          </h4>
          <div className="space-y-8 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-black/10" />
            {[
              {
                icon: "add",
                text: `${org?.name ?? "Org"} created`,
                time: "Just now",
              },
              {
                icon: "check_circle",
                text: "Schema migrated to Neon",
                time: "Earlier today",
              },
              {
                icon: "analytics",
                text: "Webhooks connected",
                time: "Earlier today",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center z-10 shadow-sm">
                  <span
                    className="text-xs text-[#151c27]"
                    style={{ fontFamily: "Material Symbols Outlined" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="flex-1 -mt-0.5">
                  <p className="text-sm font-medium text-[#151c27]">{item.text}</p>
                  <p className="text-xs text-[#444748]">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-[#444748] hover:text-[#151c27] transition-colors border border-black/10 rounded-md">
            View All Logs
          </button>
        </div>
      </section>
    </main>
  );
}