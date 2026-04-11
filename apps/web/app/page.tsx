import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, Users, CreditCard, Webhook, Database, Folders, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f9f9ff] text-[#151c27] font-sans selection:bg-[#151c27] selection:text-white">
      {/* Section 1 — Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-0">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-6xl">
          <div className="flex flex-col space-y-8 z-10">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-[#151c27]">
              The Operating System for Modern Teams
            </h1>
            <p className="text-xl text-[#747878] max-w-lg leading-relaxed">
              Multi-tenant workspaces, role-based access control, and Stripe billing — production-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="rounded-full shadow-lg font-semibold px-8 h-12">
                <Link href="/sign-up">Start Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full font-semibold px-8 h-12 border-[#c4c7c7] text-[#151c27]">
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:ml-auto">
            {/* UI Mockup Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden flex flex-col md:flex-row h-[500px]">
              {/* Sidebar */}
              <div className="w-16 bg-[#1c1b1b] flex-shrink-0 hidden md:flex flex-col items-center py-6 gap-6">
                <div className="w-8 h-8 rounded bg-white" />
                <div className="w-6 h-6 rounded-md bg-white/10" />
                <div className="w-6 h-6 rounded-md bg-white/10" />
                <div className="w-6 h-6 rounded-md bg-white/10" />
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 p-6 lg:p-8 bg-white flex flex-col gap-6 overflow-hidden">
                <div className="w-32 h-6 bg-black/5 rounded-md" />
                
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#f9f9ff] p-4 rounded-xl border border-black/5 flex flex-col gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/5" />
                      <div className="w-1/2 h-4 bg-black/10 rounded" />
                      <div className="w-full h-8 bg-black/5 rounded" />
                    </div>
                  ))}
                </div>

                {/* Table Mockup */}
                <div className="flex-1 bg-white border border-black/5 rounded-xl flex flex-col overflow-hidden">
                  <div className="h-10 border-b border-black/5 bg-[#f9f9ff] flex items-center px-4">
                    <div className="w-24 h-3 bg-black/10 rounded" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="w-full h-8 bg-[#f9f9ff] rounded border border-black/5" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Logo cloud */}
      <section className="w-full py-12 border-y border-black/5 bg-white">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center gap-8">
          <p className="text-xs font-semibold tracking-widest text-[#747878] uppercase">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale filter">
            <span className="text-xl font-bold tracking-tight">Acme Corp</span>
            <span className="text-xl font-black italic tracking-tighter">Pinnacle</span>
            <span className="text-xl font-semibold uppercase tracking-widest">Nexus Labs</span>
            <span className="text-xl font-medium tracking-wide">Orion</span>
            <span className="text-xl font-bold" style={{fontFamily: "serif"}}>Meridian</span>
            <span className="text-xl font-bold lowercase tracking-tighter">vertex</span>
          </div>
        </div>
      </section>

      {/* Section 3 — Feature grid */}
      <section className="w-full py-24 bg-[#f9f9ff]">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#151c27]">
              Everything you need to run a multi-tenant product
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white shadow-sm border border-black/5 rounded-2xl overflow-hidden">
              <CardHeader className="gap-2">
                <Shield className="w-6 h-6 text-[#151c27] mb-2" />
                <CardTitle className="text-lg">Organization Isolation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#747878]">
                  Every tenant's data is scoped by organization_id. Nothing leaks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-black/5 rounded-2xl overflow-hidden">
              <CardHeader className="gap-2">
                <Users className="w-6 h-6 text-[#151c27] mb-2" />
                <CardTitle className="text-lg">Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#747878]">
                  Owner, Admin, Member roles enforced at the database and UI layer.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-black/5 rounded-2xl overflow-hidden">
              <CardHeader className="gap-2">
                <CreditCard className="w-6 h-6 text-[#151c27] mb-2" />
                <CardTitle className="text-lg">Stripe Billing Per Org</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#747878]">
                  Each organization gets its own subscription, plan, and billing portal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-black/5 rounded-2xl overflow-hidden">
              <CardHeader className="gap-2">
                <Webhook className="w-6 h-6 text-[#151c27] mb-2" />
                <CardTitle className="text-lg">Webhook-Synced Members</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#747878]">
                  Clerk organization events sync to your database automatically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-black/5 rounded-2xl overflow-hidden">
              <CardHeader className="gap-2">
                <Database className="w-6 h-6 text-[#151c27] mb-2" />
                <CardTitle className="text-lg">Edge-Ready Database</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#747878]">
                  Drizzle ORM on Neon serverless Postgres. Zero cold starts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-black/5 rounded-2xl overflow-hidden">
              <CardHeader className="gap-2">
                <Folders className="w-6 h-6 text-[#151c27] mb-2" />
                <CardTitle className="text-lg">Project CRUD</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#747878]">
                  Searchable, sortable project table with optimistic UI updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4 — Pricing */}
      <section className="w-full py-24 bg-white border-t border-black/5">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#151c27]">
              Simple, scalable pricing
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <div className="flex flex-col p-8 rounded-3xl border border-[#c4c7c7]/50 bg-[#f9f9ff] gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-[#747878]">/month</span>
                </div>
              </div>
              
              <ul className="flex flex-col gap-4 text-[#151c27]">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#747878]" /> 1 org</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#747878]" /> 3 projects</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#747878]" /> Community support</li>
              </ul>
              
              <Button variant="outline" size="lg" className="w-full rounded-full mt-4" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="flex flex-col p-8 rounded-3xl border-transparent bg-[#151c27] text-white gap-8 shadow-xl relative -mt-4 md:-mb-4 z-10">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-white text-[#151c27] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$29</span>
                  <span className="text-white/70">/month</span>
                </div>
              </div>
              
              <ul className="flex flex-col gap-4 text-white/90">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/70" /> Unlimited orgs</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/70" /> Unlimited projects</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/70" /> Stripe billing</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/70" /> Priority support</li>
              </ul>
              
              <Button size="lg" className="w-full rounded-full mt-4 bg-white text-[#151c27] hover:bg-white/90" asChild>
                <Link href="/sign-up">Upgrade to Pro</Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col p-8 rounded-3xl border border-[#c4c7c7]/50 bg-[#f9f9ff] gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </div>
              
              <ul className="flex flex-col gap-4 text-[#151c27]">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#747878]" /> Custom contracts</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#747878]" /> Dedicated support</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#747878]" /> SLA</li>
              </ul>
              
              <Button variant="outline" size="lg" className="w-full rounded-full mt-4" asChild>
                <Link href="#">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Footer */}
      <footer className="w-full py-8 border-t border-black/5 bg-[#f9f9ff]">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#747878]">
          <p>SaaS Foundation © 2026</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#151c27] transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-[#151c27] transition-colors">Docs</Link>
            <Link href="#" className="hover:text-[#151c27] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#151c27] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}