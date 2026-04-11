import { auth } from "@clerk/nextjs/server"
import { db, projects } from "@repo/db"
import { eq, and } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { orgId } = await auth()
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  
  const { name } = await request.json()
  const project = await db.insert(projects).values({ name, organizationId: orgId }).returning()
  return NextResponse.json(project[0])
}

export async function DELETE(request: Request) {
  const { orgId } = await auth()
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get("id")
  if (!projectId) return NextResponse.json({ error: "Project ID required" }, { status: 400 })

  const deleted = await db.delete(projects)
    .where(and(eq(projects.id, projectId), eq(projects.organizationId, orgId)))
    .returning()
    
  return NextResponse.json(deleted[0] ?? null)
}
