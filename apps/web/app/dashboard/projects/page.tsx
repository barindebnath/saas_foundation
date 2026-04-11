import { auth } from "@clerk/nextjs/server"
import { db, projects } from "@repo/db"
import { eq, desc } from "drizzle-orm"
import { ProjectTable } from "./_components/project-table"
import { CreateProjectDialog } from "./_components/create-project-dialog"

export default async function ProjectsPage() {
  const { orgId } = await auth()
  if (!orgId) return null

  const projectList = await db.query.projects.findMany({
    where: eq(projects.organizationId, orgId),
    orderBy: [desc(projects.createdAt)]
  })

  // Serialize complex dates to primitive strings for client boundaries
  const serializedProjects = projectList.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      {/* Page header row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1c1b1b]">Projects</h1>
          <span className="text-[15px] font-medium text-[#747878]">All projects for this organization</span>
        </div>
        <div>
          <CreateProjectDialog />
        </div>
      </div>

      <ProjectTable initialProjects={serializedProjects} />
    </div>
  )
}
