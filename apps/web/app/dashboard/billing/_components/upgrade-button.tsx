"use client"

import { useState } from "react"
import { Button } from "../../../../components/ui/button"

export function UpgradeButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-white text-[#1c1b1b] hover:bg-white/90 font-bold h-12 text-[15px]"
    >
      {loading ? "Redirecting..." : "Upgrade to Pro"}
    </Button>
  )
}
