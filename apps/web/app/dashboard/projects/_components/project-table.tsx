"use client"

import { useOptimistic, useState } from "react"
import { Search, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { Badge } from "../../../../components/ui/badge"

interface Project {
  id: string
  name: string
  organizationId: string
  createdAt: string
  updatedAt: string
}

export function ProjectTable({ initialProjects }: { initialProjects: Project[] }) {
  const [search, setSearch] = useState("")

  const [optimisticProjects] = useOptimistic(
    initialProjects,
    (state, newProject: Project) => [newProject, ...state]
  )

  const filteredProjects = optimisticProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    
    // In a real app we'd also use optimistic updates for delete, but page reload serves as safety fallback here
    const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search and filter bar */}
      <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#c4c7c7]/30 shadow-sm">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878]" />
          <input 
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-[280px] rounded-md bg-transparent pl-10 pr-4 text-[15px] outline-none placeholder:text-[#747878] text-[#151c27] transition-all"
          />
        </div>
        <select className="h-10 rounded-md border border-[#c4c7c7]/30 bg-[#f9f9ff] px-3 font-semibold text-[#1c1b1b] outline-none mr-2">
          <option>Sort by: Name ↕</option>
          <option>Sort by: Date</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-[#c4c7c7]/30 shadow-sm overflow-hidden flex flex-col">
        <Table>
          <TableHeader className="bg-[#f9f9ff]">
            <TableRow>
              <TableHead className="w-14 text-center"><input type="checkbox" className="rounded border-[#c4c7c7]" /></TableHead>
              <TableHead className="font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">Name ↕</TableHead>
              <TableHead className="font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">Created ↕</TableHead>
              <TableHead className="font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">Status</TableHead>
              <TableHead className="text-right font-bold text-[#1c1b1b] tracking-wider text-xs uppercase">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-[15px] text-[#747878]">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="text-center"><input type="checkbox" className="rounded border-[#c4c7c7]" /></TableCell>
                <TableCell className="font-bold text-[#1c1b1b] text-[15px]">{project.name}</TableCell>
                <TableCell className="text-[#747878] font-medium text-sm">
                  {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </TableCell>
                <TableCell>
                  <Badge variant="success">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="w-9 h-9 rounded hover:bg-[#f2f3fb] text-[#747878] hover:text-[#1c1b1b] flex items-center justify-center transition-colors">
                      <Edit className="w-[18px] h-[18px]" />
                    </button>
                    <button onClick={() => handleDelete(project.id, project.name)} className="w-9 h-9 rounded hover:bg-red-50 text-[#747878] hover:text-red-600 flex items-center justify-center transition-colors">
                      <Trash2 className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-[#c4c7c7]/30 flex items-center justify-between text-[13px] font-semibold text-[#747878] bg-[#f9f9ff]">
          <span>Showing {filteredProjects.length} of {optimisticProjects.length} projects</span>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded bg-white border border-[#c4c7c7]/30 hover:bg-black/5 disabled:opacity-50 transition-colors text-[#1c1b1b]">Prev</button>
            <button className="px-4 py-1.5 rounded bg-white border border-[#c4c7c7]/30 hover:bg-black/5 disabled:opacity-50 transition-colors text-[#1c1b1b]">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
