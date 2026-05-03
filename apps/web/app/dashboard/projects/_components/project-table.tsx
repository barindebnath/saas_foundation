"use client"

import { useOptimistic, useState } from "react"
import { Search, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"

interface Project {
  id: string
  name: string
  organizationId: string
  progress: string
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
    
    const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Search and filter bar */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#747878]" />
          <input 
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-[320px] rounded-xl bg-[#f2f3fb] pl-12 pr-4 text-[15px] outline-none border-none placeholder:text-[#747878] text-[#151c27] transition-all focus:ring-2 focus:ring-[#1c1b1b]/5"
          />
        </div>
        <select className="h-11 rounded-xl bg-[#f2f3fb] px-4 font-bold text-xs uppercase tracking-widest text-[#1c1b1b] outline-none mr-2 border-none">
          <option>Sort by: Name</option>
          <option>Sort by: Date</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        <Table>
          <TableHeader className="bg-[#f2f3fb]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-14 text-center"></TableHead>
              <TableHead className="font-bold text-[#1c1b1b] tracking-widest text-[10px] uppercase font-label py-5">Project Name</TableHead>
              <TableHead className="font-bold text-[#1c1b1b] tracking-widest text-[10px] uppercase font-label py-5">Progress</TableHead>
              <TableHead className="font-bold text-[#1c1b1b] tracking-widest text-[10px] uppercase font-label py-5">Created On</TableHead>
              <TableHead className="text-right font-bold text-[#1c1b1b] tracking-widest text-[10px] uppercase font-label py-5 pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow className="hover:bg-transparent border-none">
                <TableCell colSpan={5} className="text-center py-20 text-[15px] text-[#747878] font-medium">
                  No projects found in this workspace.
                </TableCell>
              </TableRow>
            ) : filteredProjects.map((project) => (
              <TableRow key={project.id} className="border-b border-[#f2f3fb] last:border-none group hover:bg-[#f9f9ff] transition-colors">
                <TableCell className="text-center"></TableCell>
                <TableCell className="font-bold text-[#1c1b1b] text-[15px] font-headline py-6">{project.name}</TableCell>
                <TableCell className="py-6">
                  <div className="flex flex-col gap-2 w-40">
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#747878] uppercase tracking-wider">
                      <span>Completion</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#f2f3fb] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1c1b1b] rounded-full transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[#747878] font-bold text-[11px] uppercase tracking-widest py-6">
                  {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </TableCell>
                <TableCell className="text-right py-6 pr-8">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 rounded-xl hover:bg-[#1c1b1b] text-[#747878] hover:text-white flex items-center justify-center transition-all duration-200">
                      <Edit className="w-[18px] h-[18px]" />
                    </button>
                    <button onClick={() => handleDelete(project.id, project.name)} className="w-10 h-10 rounded-xl hover:bg-[#ba1a1a] text-[#747878] hover:text-white flex items-center justify-center transition-all duration-200">
                      <Trash2 className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-6 border-t border-[#f2f3fb] flex items-center justify-between text-[11px] font-bold text-[#747878] bg-[#f9f9ff] uppercase tracking-widest">
          <span>{filteredProjects.length} OF {optimisticProjects.length} PROJECTS DISPLAYED</span>
          <div className="flex gap-4">
            <button className="text-[#1c1b1b] hover:underline disabled:opacity-30">Previous</button>
            <button className="text-[#1c1b1b] hover:underline disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
