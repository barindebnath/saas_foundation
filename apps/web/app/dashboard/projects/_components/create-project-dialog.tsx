"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../../../../components/ui/dialog"
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
        <Button className="h-11 px-6 flex items-center gap-2 rounded-xl font-bold shrink-0 bg-[#1c1b1b] text-white hover:bg-[#1c1b1b]/90 shadow-sm transition-all duration-300">
          <Plus className="w-4 h-4" strokeWidth={3} /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] rounded-2xl border-none p-8 gap-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-headline text-[#1c1b1b]">New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-[10px] font-bold text-[#747878] uppercase tracking-widest font-label">
              Project Identity
            </label>
            <input
              id="name"
              type="text"
              required
              autoFocus
              placeholder="e.g. Website Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#f2f3fb] px-4 text-[15px] outline-none border-none placeholder:text-[#747878] text-[#1c1b1b] transition-all focus:ring-2 focus:ring-[#1c1b1b]/5"
            />
            <p className="text-[13px] text-[#747878] mt-1 font-medium">Your team will see this project in the shared workspace.</p>
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-2">
            <DialogClose asChild>
              <button type="button" disabled={loading} className="px-6 py-3 rounded-xl font-bold text-sm text-[#747878] hover:text-[#1c1b1b] transition-colors">
                Cancel
              </button>
            </DialogClose>
            <button 
              type="submit" 
              disabled={loading || !name.trim()} 
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[#1c1b1b] text-white hover:bg-[#1c1b1b]/90 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Generate Project"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
