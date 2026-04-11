# Antigravity Agent Prompts — SaaS Foundation
# How this works:
# 1. Antigravity agent calls Stitch MCP to generate the UI design
# 2. Agent fetches the HTML/CSS from Stitch and extracts the DESIGN.md
# 3. Agent converts the design into Next.js React components
# 4. Agent wires in real data, auth, and business logic
#
# Paste each prompt into the Antigravity Agent chat tab.
# Run them one page at a time. Review before moving to the next.

---

## SETUP PROMPT — Run this first, once

```
Use the Stitch MCP to extract the design system from my current Stitch project.
Save the output as .stitch/DESIGN.md in the project root.

Then read the following project constraints and save them as .stitch/PROJECT_RULES.md:

PROJECT RULES:
- Framework: Next.js 15 App Router
- Styling: Tailwind CSS utility classes only. No inline styles. No CSS modules.
- Components: shadcn/ui for all interactive elements (Dialog, Table, Badge, Progress, Input, Select, Button, Card, AlertDialog, Toast)
- Auth: Clerk (@clerk/nextjs). Use auth() from @clerk/nextjs/server in Server Components. Use useAuth() and useOrganization() in Client Components.
- Database: Drizzle ORM. Import db from @repo/db. Import schema tables from @repo/db.
- Icons: lucide-react only. No Material Symbols. No heroicons.
- Fonts: Use "DM Sans" from next/font/google. Not Inter. Not system fonts.
- organizationId: ALWAYS derived from auth() server-side. NEVER sent from client. NEVER a form field.
- File locations: Pages go in apps/web/app/. Shared components go in apps/web/components/.
- No TypeScript errors. No any types. All props must be typed.
- No placeholder data in final components. Empty states instead.
```

---

## PROMPT 1 — Landing Page

```
Use the Stitch MCP to design and then implement the landing page for SaaS Foundation.

STITCH DESIGN INSTRUCTIONS:
Generate a B2B SaaS marketing landing page with these exact sections:

Section 1 — Hero (split screen, full viewport height):
- Left: Headline "The Operating System for Modern Teams", subheadline "Multi-tenant workspaces, role-based access control, and Stripe billing — production-ready.", two buttons: "Start Free" (black filled) and "View Demo" (ghost/outlined)
- Right: A UI mockup showing a dark sidebar with icons + white main area with 4 stat cards in a row + a project list table below. This is a UI component illustration, not a photo.
- Background: #f9f9ff

Section 2 — Logo cloud:
- Label: "Trusted by teams at" in small caps gray
- 6 company wordmarks in a row: Acme Corp, Pinnacle, Nexus Labs, Orion, Meridian, Vertex
- Styled as text, grayscale, thin separator borders top and bottom

Section 3 — Feature grid (2 rows × 3 cols):
- Title: "Everything you need to run a multi-tenant product"
- 6 cards with icon + bold title + one sentence:
  1. "Organization Isolation" — Every tenant's data is scoped by organization_id. Nothing leaks.
  2. "Role-Based Access" — Owner, Admin, Member roles enforced at the database and UI layer.
  3. "Stripe Billing Per Org" — Each organization gets its own subscription, plan, and billing portal.
  4. "Webhook-Synced Members" — Clerk organization events sync to your database automatically.
  5. "Edge-Ready Database" — Drizzle ORM on Neon serverless Postgres. Zero cold starts.
  6. "Project CRUD" — Searchable, sortable project table with optimistic UI updates.

Section 4 — Pricing (3 columns):
- Free: $0/month, 1 org, 3 projects, community support, "Get Started" outlined button
- Pro: $29/month, BLACK background WHITE text, unlimited orgs, unlimited projects, Stripe billing, priority support, "Upgrade to Pro" white filled button
- Enterprise: Custom, custom contracts, dedicated support, SLA, "Contact Us" outlined button

Section 5 — Footer:
- Left: "SaaS Foundation © 2026"
- Right: GitHub, Docs, Privacy, Terms links
- Thin top border

Typography: DM Sans. Colors: bg #f9f9ff, text #151c27, muted #747878. No animations. No dark mode.

IMPLEMENTATION INSTRUCTIONS:
After Stitch generates the design, fetch the HTML/CSS and implement it as:
- File: apps/web/app/page.tsx (Server Component)
- Replace the existing placeholder landing page entirely
- "Start Free" button links to /sign-up
- "View Demo" button links to /dashboard (Clerk will redirect to sign-in if not authed)
- Pricing "Upgrade to Pro" button: for now links to /sign-up (Stripe Checkout comes later)
- Use next/font/google for DM Sans, apply to body in apps/web/app/layout.tsx
- No DB queries on this page. Fully static.
- Follow .stitch/DESIGN.md for all colors, spacing, and typography
- Follow .stitch/PROJECT_RULES.md for all technical decisions
```

---

## PROMPT 2 — Onboarding Page

```
Use the Stitch MCP to design and then implement the onboarding page for SaaS Foundation.

STITCH DESIGN INSTRUCTIONS:
Generate a minimal onboarding/org-selection page.

Layout: Single centered column, max-width 480px, vertically centered on the full page. No sidebar. No top nav. Background #f9f9ff.

Content (top to bottom):
- Small dark square logo icon, "SaaS Foundation" gray text below it, centered
- Heading: "Welcome. Set up your workspace." large bold centered
- Subheading: "You need an organization to continue. Join an existing one or create a new one." small gray centered

Section A — "Your Organizations" (small caps label):
- List of organization rows. Each row: colored square avatar with org initials | org name bold + role below it | "Enter →" small outlined button
- Empty state if no orgs: "You don't belong to any organizations yet." italic gray

Horizontal divider with "or" centered

Section B — Create New:
- Large dashed border card. Center: add_circle icon large + "Create a new organization" bold + "Start fresh with your own workspace." small gray below
- Full width. Hover: dashed border goes solid black.

Bottom: "Need help? Contact support" small gray underlined link

Typography: DM Sans. Colors: bg #f9f9ff, text #151c27, borders #c4c7c7. No dashboard elements.

IMPLEMENTATION INSTRUCTIONS:
After Stitch generates the design, fetch the HTML/CSS and implement it as:
- File: apps/web/app/onboarding/page.tsx (Server Component with Client child)
- This page is protected. Add it to the public routes exclusion list in middleware.ts so Clerk protects it (it is NOT public, it requires auth but not an org).

Data to fetch server-side:
  import { auth, clerkClient } from "@clerk/nextjs/server"
  const { userId } = await auth()
  const memberships = await clerkClient.users.getOrganizationMembershipList({ userId })

Render the org list from real Clerk membership data:
- Each org: show org name, user's role in that org, "Enter" button that navigates to /dashboard
- "Enter" button action: set the active org using Clerk, then redirect to /dashboard

"Create a new organization" card: onClick opens Clerk's <CreateOrganization /> modal (Client Component)

Middleware rule to add in apps/web/middleware.ts:
- If user is authenticated AND has no orgId in session AND is not on /onboarding → redirect to /onboarding
- If user is authenticated AND has orgId → skip /onboarding and redirect to /dashboard

Follow .stitch/DESIGN.md and .stitch/PROJECT_RULES.md.
```

---

## PROMPT 3 — Dashboard Overview

```
Use the Stitch MCP to design and then implement the dashboard overview page for SaaS Foundation.

STITCH DESIGN INSTRUCTIONS:
Generate a B2B SaaS dashboard overview. 

Layout:
- Fixed dark sidebar, 80px wide, full height, background #1c1b1b
- Sticky white top nav, 64px tall
- Main content area, background #f9f9ff, padding 32px

Sidebar (top to bottom):
- White square logo icon top center
- Nav items (icon above label, 48px tall each):
  dashboard icon "DASH" — active state: left white border + #474646 bg + white text
  monitoring icon "STATS" — inactive gray
  group icon "TEAM" — inactive gray
  inventory_2 icon "WORKS" — inactive gray
  settings icon "SETUP" — inactive gray
- Bottom: white circular add button, help icon, logout icon

Top nav:
- Left: org avatar + "Acme Corp" with dropdown icon (org switcher) | "Overview" underlined active | "Reports" | "Activity"
- Right: search input | notification bell with red dot | user avatar circle

Main content:
- Small caps "EXECUTIVE OVERVIEW" label, large bold "Overview" heading

4 metric cards in a row (white bg, rounded, bordered, padded 32px):
- Card 1: group icon + "ACTIVE MEMBERS" + large bold number "1" + "Synced from Clerk" green
- Card 2: inventory_2 icon + "PROJECTS" + "0" + "No projects yet" gray
- Card 3: verified_user icon + "SUBSCRIPTION STATUS" + "Trialing" + "Upgrade to activate" gray
- Card 4: workspace_premium icon + "PLAN" + "Free" + "Manage Billing" underline link

Two column section below:
- Left (2/3): "Project Performance" card. White bg. Toggle buttons Weekly/Monthly. Empty state: large gray icon + "No projects yet" + "Create your first project to see performance here"
- Right (1/3): "Recent Activity" card. Light bg. Vertical timeline with 3 items. "View All Logs" outlined button.

Typography: DM Sans. Icons: lucide-react (not Material Symbols). Colors: sidebar #1c1b1b, bg #f9f9ff, cards white, text #151c27.

IMPLEMENTATION INSTRUCTIONS:
After Stitch generates the design, fetch the HTML/CSS and implement it as:

Files to create:
- apps/web/app/dashboard/layout.tsx — contains Sidebar + TopNav wrapper
- apps/web/app/dashboard/page.tsx — Server Component with real data
- apps/web/components/sidebar.tsx — "use client" — active state from usePathname()
- apps/web/components/top-nav.tsx — contains Clerk <OrganizationSwitcher /> and <UserButton />

Server-side data in dashboard/page.tsx:
  import { auth } from "@clerk/nextjs/server"
  import { db, organizations, memberships, projects, subscriptions } from "@repo/db"
  import { eq, count } from "drizzle-orm"

  const { orgId } = await auth()
  const [org, memberCount, projectCount, subscription] = await Promise.all([
    db.query.organizations.findFirst({ where: eq(organizations.id, orgId) }),
    db.select({ count: count() }).from(memberships).where(eq(memberships.organizationId, orgId)),
    db.select({ count: count() }).from(projects).where(eq(projects.organizationId, orgId)),
    db.query.subscriptions.findFirst({ where: eq(subscriptions.organizationId, orgId) })
  ])

Pass real values to metric cards:
- Active Members: memberCount[0].count
- Projects: projectCount[0].count
- Subscription Status: subscription?.status ?? "trialing"
- Plan: subscription?.planId ?? "Free"

OrganizationSwitcher appearance: match sidebar styling, use Clerk appearance prop.
Replace existing dashboard/layout.tsx and dashboard/page.tsx completely.
Follow .stitch/DESIGN.md and .stitch/PROJECT_RULES.md.
```

---

## PROMPT 4 — Project Management Page

```
Use the Stitch MCP to design and then implement the project management page for SaaS Foundation.

STITCH DESIGN INSTRUCTIONS:
Generate a project management page. Use the same sidebar and top nav as the dashboard overview (same dark sidebar 80px, same white top nav). Active sidebar item: inventory_2 "WORKS".

Main content area:

Page header row:
- Left: "Projects" large bold heading + "All projects for this organization" small gray sub
- Right: "New Project" black filled button with + icon prefix

Search and filter bar:
- Left: search input with search icon, placeholder "Search projects...", 280px wide
- Right: "Sort by: Name ↕" outlined dropdown small

Data table (white bg, full width, rounded, bordered):
Columns: checkbox | Name (↕ sortable) | Created (↕ sortable) | Status | Actions
3 example rows:
- "Website Redesign" | "Apr 10, 2026" | "Active" green badge | edit icon + trash icon
- "API Integration" | "Apr 9, 2026" | "Complete" gray badge | edit icon + trash icon
- "Mobile App v2" | "Apr 8, 2026" | "Active" green badge | edit icon + trash icon
Table footer: "Showing 3 of 3 projects" left | pagination prev/next right

Create Project Modal overlay:
- Dark backdrop, white modal 400px wide, rounded
- Header: "New Project" bold + X close button
- Form: Label "Project Name *" + text input placeholder "e.g. Website Redesign" + helper "This project will be scoped to [org name]"
- IMPORTANT: No organizationId field. No orgId input. Not in the form at all.
- Footer: "Cancel" outlined + "Create Project" black filled, right-aligned

Typography: DM Sans. Same colors as dashboard.

IMPLEMENTATION INSTRUCTIONS:
After Stitch generates the design, fetch the HTML/CSS and implement as:

Files to create:
- apps/web/app/dashboard/projects/page.tsx — Server Component
- apps/web/app/dashboard/projects/_components/project-table.tsx — "use client"
- apps/web/app/dashboard/projects/_components/create-project-dialog.tsx — "use client"
- apps/web/app/api/projects/route.ts — API route for POST and DELETE

Server Component (page.tsx):
  const { orgId } = await auth()
  const projectList = await db.query.projects.findMany({
    where: eq(projects.organizationId, orgId),
    orderBy: [desc(projects.createdAt)]
  })

Client Component (project-table.tsx):
- Implement useOptimistic for instant project appearance on create:
  const [optimisticProjects, addOptimisticProject] = useOptimistic(
    projects,
    (state, newProject) => [newProject, ...state]
  )
- Client-side search: filter optimisticProjects by name on input change
- Use shadcn <Table>, <TableHeader>, <TableRow>, <TableCell>, <Badge>

API route (POST /api/projects):
  const { orgId } = await auth()
  if (!orgId) return Response.json({ error: "Unauthorized" }, { status: 401 })
  const { name } = await request.json()
  // organizationId comes from auth(), never from request body
  const project = await db.insert(projects).values({ name, organizationId: orgId }).returning()
  return Response.json(project[0])

API route (DELETE /api/projects):
  // Always include AND eq(projects.organizationId, orgId) in WHERE clause
  // Never delete by id alone

Use shadcn <Dialog> for the create modal, <AlertDialog> for delete confirmation.
Follow .stitch/DESIGN.md and .stitch/PROJECT_RULES.md.
```

---

## PROMPT 5 — Team Management Page

```
Use the Stitch MCP to design and then implement the team management page for SaaS Foundation.

STITCH DESIGN INSTRUCTIONS:
Generate a team management page. Same sidebar and top nav. Active sidebar item: group "TEAM".

Main content area:

Page header row:
- Left: "Team" large bold heading + "Manage members and roles for Acme Corp" small gray
- Right: "Invite Member" black filled button with person_add icon. Below it: tiny gray text "Owners and Admins only"

Members table (white bg, full width, rounded, bordered):
Columns: Member (avatar circle + name + email) | Role (badge) | Joined | Actions

3 example rows:
- "B" avatar | "Barin Debnath" "barin@example.com" | "Owner" badge black bg white text | no action buttons
- "J" avatar | "Jane Smith" "jane@example.com" | "Admin" badge #474646 bg white text | "Remove" red text button
- "M" avatar | "Mike Lee" "mike@example.com" | "Member" badge #e7eefe bg dark text | "Remove" red text button

Invite Member Modal (overlay):
- Dark backdrop, white modal 420px wide, rounded
- Header: "Invite a Member" bold + X close
- Form: Email input | Role select (Member, Admin options only — no Owner option, add note "Only one owner per organization")
- Helper text: "Members can view. Admins can invite and manage projects."
- Footer: "Cancel" outlined + "Send Invite" black filled

Permissions table card (below members table, full width, light gray bg, rounded, padded):
- Title: "Role Permissions" small caps
- Table: Action | Owner | Admin | Member
  Invite members | ✓ | ✓ | ✗
  Remove members | ✓ | ✗ | ✗
  Change roles | ✓ | ✗ | ✗
  View team | ✓ | ✓ | ✓
  Manage billing | ✓ | ✗ | ✗

Typography: DM Sans. Same colors as dashboard.

IMPLEMENTATION INSTRUCTIONS:
After Stitch generates the design, implement as:

Files to create:
- apps/web/app/dashboard/team/page.tsx — Server Component
- apps/web/app/dashboard/team/_components/members-table.tsx — "use client"
- apps/web/app/dashboard/team/_components/invite-dialog.tsx — "use client"

Server Component data:
  const { orgId, has } = await auth()
  const canInvite = has({ permission: "org:member:invite" })
  const memberList = await db.query.memberships.findMany({
    where: eq(memberships.organizationId, orgId)
  })
  // Pass canInvite as prop to client components

RBAC UI rules (enforce these exactly):
  // Invite button: only render if canInvite === true
  {canInvite && <Button>Invite Member</Button>}

  // Remove button: only show for non-owner members, only if current user canInvite
  {canInvite && membership.role !== "owner" && <Button variant="destructive">Remove</Button>}

Invite action: use Clerk inviteOrganizationMember() — do NOT manually insert to memberships table. The webhook handles DB sync.

Remove action: use Clerk removeOrganizationMember() — do NOT manually delete from memberships. The webhook handles DB sync.

Avatar: Use first letter of name from Clerk user data. Colored circle background.
Use shadcn <Table>, <Badge>, <Dialog>, <Select>, <Input>.
Follow .stitch/DESIGN.md and .stitch/PROJECT_RULES.md.
```

---

## PROMPT 6 — Billing Page

```
Use the Stitch MCP to design and then implement the billing page for SaaS Foundation.

STITCH DESIGN INSTRUCTIONS:
Generate a billing and subscription page. Same sidebar and top nav. Active sidebar item: credit_card icon "BILL".

Main content area:

Page heading: "Billing" large bold + "Manage your subscription and usage for Acme Corp" small gray

Card 1 — Current Plan (white bg, rounded, bordered, full width):
- Left: "CURRENT PLAN" small caps gray | "Free" large bold + "Trialing" blue pill badge inline | "Your trial ends on May 10, 2026" small gray below
- Right: "Manage Billing →" outlined black button | "Update payment method, download invoices" tiny gray below

Card 2 — Usage (white bg, rounded, bordered, full width):
- Title: "Usage This Period" bold
- One row: "Projects" label + "1 of 3 used" gray | progress bar (1/3 filled black, gray track) + "33%"
- Below: "Upgrade to Pro for unlimited projects" gray + "Upgrade →" black inline link

Card 3 — Upgrade CTA (BLACK background, white text, full width, rounded):
- Left: "Unlock everything" large bold white heading
  Feature list two columns with checkmarks:
  Unlimited organizations | Unlimited projects
  Stripe billing management | Priority support
  RBAC permissions | Webhook integrations
- Right: "$29 / month" large white | "per organization, billed monthly" small | "Upgrade to Pro" white bg black text button full width | "No commitment. Cancel anytime." tiny gray below

Card 4 — Billing History (white bg, rounded, bordered, full width):
- Title: "Billing History" bold
- Empty state: "No invoices yet. Your invoices will appear here after your first payment." centered gray

Typography: DM Sans. Same colors. Upgrade card: solid black background.

IMPLEMENTATION INSTRUCTIONS:
After Stitch generates the design, implement as:

Files to create:
- apps/web/app/dashboard/billing/page.tsx — Server Component
- apps/web/app/dashboard/billing/_components/manage-billing-button.tsx — "use client"
- apps/web/app/dashboard/billing/_components/upgrade-button.tsx — "use client"
- apps/web/app/api/billing/portal/route.ts — Stripe portal redirect
- apps/web/app/api/billing/checkout/route.ts — Stripe checkout redirect

Server Component data:
  const { orgId } = await auth()
  const [subscription, projectCount] = await Promise.all([
    db.query.subscriptions.findFirst({ where: eq(subscriptions.organizationId, orgId) }),
    db.select({ count: count() }).from(projects).where(eq(projects.organizationId, orgId))
  ])
  const planLimit = subscription?.planId === "pro" ? Infinity : 3
  const usagePercent = Math.min((projectCount[0].count / planLimit) * 100, 100)

Stripe Portal API route (GET /api/billing/portal):
  const { orgId } = await auth()
  const sub = await db.query.subscriptions.findFirst({ where: eq(subscriptions.organizationId, orgId) })
  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard/billing"
  })
  return Response.redirect(session.url)

Stripe Checkout API route (POST /api/billing/checkout):
  const { orgId } = await auth()
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID, quantity: 1 }],
    client_reference_id: orgId,
    success_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard/billing?upgraded=true",
    cancel_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard/billing"
  })
  return Response.json({ url: session.url })

"Manage Billing" button: calls /api/billing/portal — redirects to Stripe Customer Portal.
"Upgrade to Pro" button: calls /api/billing/checkout — redirects to Stripe Checkout.
If subscription is null (no Stripe record yet): hide Manage Billing, show only Upgrade CTA.
Use shadcn <Progress> for usage bar, <Badge> for status with variant based on status value.
Add STRIPE_SECRET_KEY and STRIPE_PRO_PRICE_ID to .env.local before running.
Follow .stitch/DESIGN.md and .stitch/PROJECT_RULES.md.
```

---

## AFTER EACH PAGE — Verification prompt

```
Open the integrated browser and compare the rendered page against the Stitch design.

Check these specific things:
1. Font: Is it DM Sans? Not Inter, not system font.
2. Colors: Sidebar is #1c1b1b. Background is #f9f9ff. Cards are white. Text is #151c27.
3. Sidebar width: exactly 80px.
4. No inline styles anywhere in the component files.
5. No TypeScript errors (run: pnpm --filter web check-types).
6. No "any" types.
7. Auth check: every DB query includes WHERE organizationId = orgId from auth().
8. Empty states: visible when there is no data, not placeholder fake data.

Fix any visual or type errors before moving to the next page.
```