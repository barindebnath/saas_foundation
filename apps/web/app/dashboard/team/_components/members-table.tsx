"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table"
import { Badge } from "../../../../components/ui/badge"

interface Member {
  id: string
  userId: string
  role: string
  createdAt: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string | null
}

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  owner: "default",
  admin: "outline",
  member: "secondary",
}

const avatarColors = [
  "bg-[#1c1b1b] text-white",
  "bg-[#474646] text-white",
  "bg-[#e2e8f8] text-[#151c27]",
  "bg-emerald-600 text-white",
  "bg-amber-500 text-white",
]

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]!
}

export function MembersTable({
  members,
  canManage,
}: {
  members: Member[]
  canManage: boolean
}) {
  const router = useRouter()

  const handleRemove = async (userId: string, name: string) => {
    if (!confirm(`Remove ${name} from this organization?`)) return

    const res = await fetch("/api/team/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-[#f9f9ff]">
          <TableRow>
            <TableHead className="font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">
              Member
            </TableHead>
            <TableHead className="font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">
              Role
            </TableHead>
            <TableHead className="font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">
              Joined
            </TableHead>
            <TableHead className="text-right font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-12 text-[15px] text-[#747878]"
              >
                No team members found.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => {
              const fullName = `${member.firstName} ${member.lastName}`.trim()
              const initial = (member.firstName?.[0] ?? member.email?.[0] ?? "?").toUpperCase()

              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getAvatarColor(fullName)}`}
                      >
                        {initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1c1b1b] text-[15px]">
                          {fullName || "Unknown User"}
                        </span>
                        <span className="text-[13px] text-[#747878]">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={roleBadgeVariant[member.role] ?? "secondary"}
                      className="capitalize"
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#747878] font-medium text-sm">
                    {new Date(member.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {canManage && member.role !== "owner" ? (
                      <button
                        onClick={() => handleRemove(member.userId, fullName)}
                        className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    ) : null}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
