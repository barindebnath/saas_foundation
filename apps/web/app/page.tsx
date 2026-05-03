import Link from "next/link";
import { Button } from "../components/ui/button";
import { Shield, Users, CreditCard, Webhook, Database, Folders, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f9f9ff] text-[#151c27] font-sans selection:bg-[#1c1b1b] selection:text-white">
      {/* Section 1 — Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-0">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center max-w-7xl">
          <div className="flex flex-col space-y-10 z-10">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-[#747878] uppercase tracking-[0.3em] font-label">
                The New Architecture of SaaS
              </span>
              <h1 className="text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-[#1c1b1b] font-headline">
                Build without <br /> friction.
              </h1>
            </div>
            <p className="text-xl text-[#747878] max-w-lg leading-relaxed font-medium">
              Multi-tenant workspaces, integrated governance, and scalable billing. The foundational engine for your next billion-dollar product.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" asChild className="rounded-2xl bg-[#1c1b1b] text-white hover:bg-black px-10 h-16 text-lg font-bold transition-all duration-300">
                <Link href="/sign-up">Start Free</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="rounded-2xl font-bold px-10 h-16 text-lg text-[#1c1b1b] hover:bg-[#f2f3fb] transition-all duration-300">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Live Preview <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-xl mx-auto lg:max-w-none lg:ml-auto">
            {/* UI Mockup Card — Architectural Minimalist style */}
            <div className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex h-[580px]">
              {/* Sidebar Mockup */}
              <div className="w-20 bg-[#1c1b1b] flex-shrink-0 flex flex-col items-center py-10 gap-8">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <div className="w-5 h-5 rounded bg-white" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/5" />
                <div className="w-8 h-8 rounded-xl bg-white/5" />
                <div className="w-8 h-8 rounded-xl bg-white/5" />
              </div>
              
              {/* Main Content Mockup */}
              <div className="flex-1 p-10 bg-white flex flex-col gap-10 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="w-24 h-2 bg-[#f2f3fb] rounded" />
                    <div className="w-48 h-8 bg-[#1c1b1b]/5 rounded-lg" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#f2f3fb]" />
                </div>
                
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#f9f9ff] p-6 rounded-2xl flex flex-col gap-4">
                      <div className="w-8 h-8 rounded-xl bg-[#1c1b1b]/5" />
                      <div className="w-2/3 h-6 bg-[#1c1b1b] rounded-md opacity-10" />
                    </div>
                  ))}
                </div>

                {/* Table Mockup */}
                <div className="flex-1 bg-[#f9f9ff] rounded-2xl flex flex-col overflow-hidden">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="w-full h-12 bg-white rounded-xl shadow-sm" />
                    <div className="w-full h-12 bg-white rounded-xl shadow-sm" />
                    <div className="w-full h-12 bg-white rounded-xl shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white p-6 rounded-3xl shadow-xl z-20 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">System Health</span>
              <span className="text-xl font-bold font-headline">Operational</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Logo cloud */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center gap-10">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#747878] uppercase font-label">
            The standard for modern engineering teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale filter">
            <span className="text-2xl font-bold tracking-tight font-headline">Acme</span>
            <span className="text-2xl font-black italic tracking-tighter font-headline">Pinnacle</span>
            <span className="text-2xl font-semibold uppercase tracking-widest font-label">Nexus</span>
            <span className="text-2xl font-medium tracking-wide">Orion</span>
            <span className="text-2xl font-bold font-headline">Meridian</span>
            <span className="text-2xl font-bold lowercase tracking-tighter font-headline">vertex</span>
          </div>
        </div>
      </section>

      {/* Section 3 — Feature grid */}
      <section className="w-full py-32 bg-[#f9f9ff]">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-24">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em] font-label">Capability</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-[#1c1b1b] font-headline tracking-tighter leading-[1.1]">
              Architected for <br /> massive scale.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Organization Isolation", desc: "Every tenant's data is logically scoped by organization_id. Zero leakage, guaranteed." },
              { icon: Users, title: "Sovereign Governance", desc: "Fine-grained RBAC permissions enforced from the database to the component level." },
              { icon: CreditCard, title: "Flexible Billing", desc: "Native support for modern billing providers. Scale from Free to Enterprise seamlessly." },
              { icon: Webhook, title: "Identity Sync", desc: "Real-time membership synchronization via secure HMAC-verified webhooks." },
              { icon: Database, title: "Edge Performance", desc: "Powered by Drizzle and Neon serverless Postgres for global, low-latency execution." },
              { icon: Folders, title: "Fluid Workspaces", desc: "Intuitive project management with optimistic UI and real-time activity intelligence." },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-[32px] p-10 flex flex-col gap-6 transition-all duration-300 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] group">
                <div className="w-14 h-14 rounded-2xl bg-[#f9f9ff] flex items-center justify-center group-hover:bg-[#1c1b1b] group-hover:text-white transition-all duration-300">
                  <f.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-[#1c1b1b] font-headline">{f.title}</h3>
                  <p className="text-[15px] text-[#747878] leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Pricing */}
      <section className="w-full py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-24">
          <div className="flex flex-col gap-4 text-center items-center">
            <span className="text-[10px] font-bold text-[#747878] uppercase tracking-[0.3em] font-label">Simple Pricing</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-[#1c1b1b] font-headline tracking-tighter leading-[1.1]">
              Scale on your terms.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <div className="flex flex-col p-12 rounded-[40px] bg-[#f9f9ff] gap-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold font-headline uppercase tracking-widest text-[#747878]">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold font-headline">$0</span>
                  <span className="text-[#747878] font-bold uppercase text-xs">/ month</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {[ "1 Organization", "3 Active Projects", "Community Governance"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[15px] font-medium text-[#1c1b1b]">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="lg" className="w-full rounded-2xl h-14 font-bold border-[#c4c7c7] text-[#1c1b1b] hover:bg-white" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="flex flex-col p-12 rounded-[40px] bg-[#1c1b1b] text-white gap-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] relative lg:-mt-8 lg:-mb-8 z-10 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-all duration-1000"></div>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-headline uppercase tracking-widest text-white/50">Pro</h3>
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold font-headline">$29</span>
                  <span className="text-white/40 font-bold uppercase text-xs">/ month</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10">
                {[ "Unlimited Organizations", "Unlimited Projects", "Global Member Sync", "Priority Infrastructure"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[15px] font-medium text-white/90">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="w-full rounded-2xl h-14 font-bold bg-white text-[#1c1b1b] hover:bg-white/90 relative z-10" asChild>
                <Link href="/sign-up">Upgrade to Pro</Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col p-12 rounded-[40px] bg-[#f9f9ff] gap-10">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold font-headline uppercase tracking-widest text-[#747878]">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-headline">Custom</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {[ "Bespoke Contracts", "Dedicated Success Manager", "SLA Performance", "Advanced Security"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[15px] font-medium text-[#1c1b1b]">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="lg" className="w-full rounded-2xl h-14 font-bold border-[#c4c7c7] text-[#1c1b1b] hover:bg-white" asChild>
                <Link href="#">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Footer */}
      <footer className="w-full py-20 bg-[#f9f9ff]">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-10 border-t border-[#1c1b1b]/5 pt-20">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-xl font-bold font-headline text-[#1c1b1b]">SaaS Foundation</span>
            <p className="text-[13px] text-[#747878] font-medium">The architectural OS for modern products.</p>
          </div>
          <div className="flex gap-10 text-[13px] font-bold text-[#747878] uppercase tracking-widest font-label">
            <Link href="#" className="hover:text-[#1c1b1b] transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-[#1c1b1b] transition-colors">Docs</Link>
            <Link href="#" className="hover:text-[#1c1b1b] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#1c1b1b] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
