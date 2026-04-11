import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { orgId } = await auth()
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { email, role } = await request.json()
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 })

  try {
    const clerk = await clerkClient()
    await clerk.organizations.createOrganizationInvitation({
      organizationId: orgId,
      emailAddress: email,
      role: role === "admin" ? "org:admin" : "org:member",
      inviterUserId: (await auth()).userId!,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send invitation"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
