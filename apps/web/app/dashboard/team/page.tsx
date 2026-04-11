import { auth, clerkClient } from "@clerk/nextjs/server"
import { db, memberships } from "@repo/db"
import { eq } from "drizzle-orm"
import { MembersTable } from "./_components/members-table"
import { InviteDialog } from "./_components/invite-dialog"
import { Check, X } from "lucide-react"

export default async function TeamPage() {
  const { orgId, has } = await auth()
  if (!orgId) return null

  // System permissions aren't available in session claims, use role check instead
  const canInvite = has({ role: "org:admin" }) || has({ role: "org:owner" })

  const memberList = await db.query.memberships.findMany({
    where: eq(memberships.organizationId, orgId),
  })

  // Enrich each membership with Clerk user data (name, email, imageUrl)
  const clerk = await clerkClient()
  const enrichedMembers = await Promise.all(
    memberList.map(async (m) => {
      try {
        const user = await clerk.users.getUser(m.userId)
        return {
          id: m.id,
          userId: m.userId,
          role: m.role,
          createdAt: m.createdAt.toISOString(),
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.emailAddresses[0]?.emailAddress ?? "",
          imageUrl: user.imageUrl ?? null,
        }
      } catch {
        return {
          id: m.id,
          userId: m.userId,
          role: m.role,
          createdAt: m.createdAt.toISOString(),
          firstName: "Unknown",
          lastName: "User",
          email: "—",
          imageUrl: null,
        }
      }
    })
  )

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1c1b1b]">Team</h1>
          <span className="text-[15px] font-medium text-[#747878]">
            Manage members and roles for your organization
          </span>
        </div>
        {canInvite && (
          <div className="flex flex-col items-end gap-1">
            <InviteDialog />
            <span className="text-[11px] text-[#747878]">Owners and Admins only</span>
          </div>
        )}
      </div>

      {/* Members table */}
      <MembersTable members={enrichedMembers} canManage={canInvite ?? false} />

      {/* Role Permissions reference card */}
      <div className="bg-[#f0f3ff] rounded-xl border border-[#c4c7c7]/20 p-8">
        <h3 className="text-xs font-bold text-[#747878] tracking-widest uppercase mb-6">
          Role Permissions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="border-b border-[#c4c7c7]/30">
                <th className="text-left pb-3 font-bold text-[#1c1b1b]">Action</th>
                <th className="text-center pb-3 font-bold text-[#1c1b1b] w-28">Owner</th>
                <th className="text-center pb-3 font-bold text-[#1c1b1b] w-28">Admin</th>
                <th className="text-center pb-3 font-bold text-[#1c1b1b] w-28">Member</th>
              </tr>
            </thead>
            <tbody className="text-[#151c27]">
              {[
                { action: "Invite members", owner: true, admin: true, member: false },
                { action: "Remove members", owner: true, admin: false, member: false },
                { action: "Change roles", owner: true, admin: false, member: false },
                { action: "View team", owner: true, admin: true, member: true },
                { action: "Manage billing", owner: true, admin: false, member: false },
              ].map((row) => (
                <tr key={row.action} className="border-b border-[#c4c7c7]/20 last:border-0">
                  <td className="py-3 font-medium">{row.action}</td>
                  <td className="py-3 text-center">
                    {row.owner ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#c4c7c7] mx-auto" />
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.admin ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#c4c7c7] mx-auto" />
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.member ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-[#c4c7c7] mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
