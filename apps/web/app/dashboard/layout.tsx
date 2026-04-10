import { Sidebar } from "./_components/sidebar";
import { TopNav } from "./_components/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f9f9ff]">
      <Sidebar />
      <div className="ml-20 flex flex-col min-h-screen">
        <TopNav />
        {children}
      </div>
    </div>
  );
}