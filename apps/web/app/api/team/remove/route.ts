import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { orgId } = await auth()
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { userId } = await request.json()
  if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 })

  try {
    const clerk = await clerkClient()
    await clerk.organizations.deleteOrganizationMembership({
      organizationId: orgId,
      userId,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to remove member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
