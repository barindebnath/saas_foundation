"use client"

import { Button } from "../../../../components/ui/button"

export function ManageBillingButton() {
  const handleClick = async () => {
    const res = await fetch("/api/billing/portal")
    if (res.redirected) {
      window.location.href = res.url
    } else {
      // Fallback: try to parse URL from JSON response
      try {
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
        }
      } catch {
        // Portal not available
      }
    }
  }

  return (
    <Button variant="outline" onClick={handleClick} className="font-bold">
      Manage Billing →
    </Button>
  )
}
