"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"

export function InviteDialog() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"member" | "admin">("member")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Failed to send invitation")
        return
      }

      setEmail("")
      setRole("member")
      setOpen(false)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 px-5 flex items-center gap-2 rounded-md font-bold shrink-0">
          <UserPlus className="w-4 h-4" strokeWidth={2.5} /> Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">Invite a Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 pt-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="invite-email"
              className="text-[13px] font-bold text-[#1c1b1b] uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              id="invite-email"
              type="email"
              required
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-11 w-full rounded-md border border-[#c4c7c7]/50 bg-white px-3 text-[15px] outline-none focus:border-[#1c1b1b] focus:ring-1 focus:ring-[#1c1b1b] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="invite-role"
              className="text-[13px] font-bold text-[#1c1b1b] uppercase tracking-wider"
            >
              Role
            </label>
            <select
              id="invite-role"
              value={role}
              onChange={(e) => setRole(e.target.value as "member" | "admin")}
              disabled={loading}
              className="h-11 w-full rounded-md border border-[#c4c7c7]/50 bg-white px-3 text-[15px] outline-none focus:border-[#1c1b1b] focus:ring-1 focus:ring-[#1c1b1b] transition-all"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-[11px] text-[#747878] italic">
              Only one owner per organization
            </p>
          </div>

          <p className="text-[13px] text-[#747878] font-medium">
            Members can view. Admins can invite and manage projects.
          </p>

          {error && (
            <p className="text-[13px] text-red-500 font-medium">{error}</p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="font-bold"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading || !email.trim()}
              className="font-bold"
            >
              {loading ? "Sending..." : "Send Invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
