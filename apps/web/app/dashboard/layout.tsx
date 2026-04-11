import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f9f9ff] flex text-[#151c27] font-sans selection:bg-[#1c1b1b] selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-20 min-h-screen">
        <TopNav />
        <main className="flex-1 flex flex-col p-8 pb-16 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}