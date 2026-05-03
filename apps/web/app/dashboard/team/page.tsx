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
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto py-4">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#747878] uppercase tracking-widest font-label">Governance</span>
          <h1 className="text-5xl font-bold tracking-tighter text-[#1c1b1b] font-headline">Team</h1>
          <span className="text-[15px] font-medium text-[#747878] mt-1">
            Manage members and role permissions for your workspace
          </span>
        </div>
        {canInvite && (
          <div className="flex flex-col items-end gap-2">
            <InviteDialog />
            <span className="text-[11px] font-bold text-[#747878] uppercase tracking-wider">Authorized Admins Only</span>
          </div>
        )}
      </div>

      {/* Members table */}
      <MembersTable members={enrichedMembers} canManage={canInvite ?? false} />

      {/* Role Permissions reference card - No lines, tonal layering */}
      <div className="bg-white rounded-2xl p-10 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-[#1c1b1b] font-headline">
            Role Matrix
          </h3>
          <p className="text-[15px] text-[#747878]">Global permission set for each organizational role</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="border-none">
                <th className="text-left pb-6 font-bold text-[#747878] uppercase text-[10px] tracking-widest font-label">Functional Area</th>
                <th className="text-center pb-6 font-bold text-[#1c1b1b] w-32 uppercase text-[10px] tracking-widest font-label bg-[#f9f9ff] rounded-t-xl">Owner</th>
                <th className="text-center pb-6 font-bold text-[#1c1b1b] w-32 uppercase text-[10px] tracking-widest font-label">Admin</th>
                <th className="text-center pb-6 font-bold text-[#1c1b1b] w-32 uppercase text-[10px] tracking-widest font-label">Member</th>
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
                <tr key={row.action} className="border-none group">
                  <td className="py-4 font-bold font-headline">{row.action}</td>
                  <td className="py-4 text-center bg-[#f9f9ff] group-last:rounded-b-xl">
                    {row.owner ? (
                      <Check className="w-5 h-5 text-[#1c1b1b] mx-auto" strokeWidth={3} />
                    ) : (
                      <X className="w-5 h-5 text-[#c4c7c7] mx-auto" />
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {row.admin ? (
                      <Check className="w-5 h-5 text-[#1c1b1b] mx-auto" strokeWidth={3} />
                    ) : (
                      <X className="w-5 h-5 text-[#c4c7c7] mx-auto" />
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {row.member ? (
                      <Check className="w-5 h-5 text-[#1c1b1b] mx-auto" strokeWidth={3} />
                    ) : (
                      <X className="w-5 h-5 text-[#c4c7c7] mx-auto" />
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
