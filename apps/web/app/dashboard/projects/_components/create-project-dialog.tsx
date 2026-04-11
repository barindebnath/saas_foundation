"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Plus } from "lucide-react"

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      })

      if (res.ok) {
        setName("")
        setOpen(false)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 px-5 flex items-center gap-2 rounded-md font-bold shrink-0">
          <Plus className="w-4 h-4" strokeWidth={2.5} /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[13px] font-bold text-[#1c1b1b] uppercase tracking-wider">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Website Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="h-11 w-full rounded-md border border-[#c4c7c7]/50 bg-white px-3 text-[15px] outline-none focus:border-[#1c1b1b] focus:ring-1 focus:ring-[#1c1b1b] transition-all"
            />
            <p className="text-[13px] text-[#747878] mt-1 font-medium">This project will be scoped to your active organization.</p>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading} className="font-bold">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading || !name.trim()} className="font-bold">
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
