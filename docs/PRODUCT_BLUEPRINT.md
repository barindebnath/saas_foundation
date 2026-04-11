# SaaS Foundation — Product Blueprint

> This document is the single source of truth for what gets built.
> Every page, component, and data connection is defined here.
> AI tools and developers must reference this before generating any UI or logic.

---

## Stack Reference

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Monorepo | Turborepo + pnpm workspaces |
| Database | PostgreSQL on Neon (serverless) |
| ORM | Drizzle ORM |
| Auth | Clerk (organizations + RBAC) |
| Billing | Stripe (Checkout + Customer Portal + Webhooks) |
| UI | Tailwind CSS + shadcn/ui |
| Deployment | Vercel |

---

## Database Schema (Source of Truth)

```
organizations        — Clerk org ID (text PK), name, slug, timestamps
memberships          — UUID PK, organizationId → organizations.id, userId (Clerk), role enum(owner|admin|member), unique(orgId+userId)
subscriptions        — UUID PK, organizationId (unique), stripeCustomerId, stripeSubscriptionId, status enum(active|trialing|past_due|canceled|unpaid), planId, currentPeriodEnd
projects             — UUID PK, organizationId → organizations.id, name, timestamps
```

**Key rule:** Every tenant-scoped resource carries `organizationId`. Never scope data to `userId` directly.

---

## Route Map

```
/ (public)
/sign-in (public, Clerk)
/sign-up (public, Clerk)
/onboarding (protected, no-org gate)
/dashboard (protected, org required) → redirects to /dashboard/[org-slug]
/dashboard/[org-slug] (protected, org scoped)
/dashboard/[org-slug]/projects (protected, org scoped)
/dashboard/[org-slug]/team (protected, org scoped)
/dashboard/[org-slug]/billing (protected, org scoped)
/api/webhooks/clerk (public endpoint, HMAC verified)
/api/webhooks/stripe (public endpoint, HMAC verified)
```

---

## Page 1 — Landing Page (Public)

**Route:** `/`
**Purpose:** Sell the product. Explain multi-tenant value prop. Drive sign-ups.

### Sections (in order)

#### Hero
- Layout: Split-screen (text left, UI mockup right)
- Left: Headline + sub-headline + two CTAs ("Start Free" → /sign-up, "View Demo" → anchors to feature section)
- Right: High-fidelity static screenshot or iframe of the dashboard
- Design trend: 2026 split-screen hero with floating UI mockup

#### Logo Cloud (Social Proof)
- 6 fake B2B company logos (grayscale)
- Label: "Trusted by teams at"
- Purpose: Pattern recognition for B2B SaaS — recruiters know what this means

#### Feature Grid
- 3-column grid, 6 features
- Each card: icon + title + 1-line description
- Features to highlight:
  1. Multi-tenant organizations (org isolation)
  2. Role-based access control (owner / admin / member)
  3. Stripe billing per organization
  4. Real-time activity feed per tenant
  5. Webhook-synced membership
  6. Edge-compatible Drizzle + Neon

#### Pricing Table
- 3 tiers: Free / Pro / Enterprise
- Free: 1 org, 3 projects, community support
- Pro: Unlimited orgs, unlimited projects, priority support — links to Stripe Checkout
- Enterprise: Custom pricing, custom contracts — "Contact us" CTA
- Each tier: feature checklist, CTA button
- Active plan highlighted

#### Footer
- Links: Docs, GitHub, Privacy, Terms
- No newsletter form (not needed for portfolio)

### Data
- No DB queries. Static page.
- Stripe: Price IDs referenced in CTA links for Checkout redirect

---

## Page 2 — Onboarding (Protected, No-Org Gate)

**Route:** `/onboarding`
**Purpose:** Gatekeeper. User is authenticated but has no active org. Must create or join one before reaching dashboard.

### Logic
- Middleware: If user is authenticated AND has no `orgId` in session → redirect to `/onboarding`
- If user has `orgId` → redirect to `/dashboard/[org-slug]`

### UI Components
- Page title: "Welcome. Let's set up your workspace."
- Section A — Existing orgs: List of orgs the user already belongs to (from Clerk). Each row: org name, user's role, "Enter" button
- Section B — Create new: "Create Organization" button → triggers Clerk `<CreateOrganization />` modal
- No dashboard content visible. No sidebar. Minimal layout.

### Data
- Clerk: `auth().orgMemberships` to list existing orgs
- No Drizzle query needed (org list comes from Clerk session)

### Recruiter Hook
- Proves middleware logic works
- Users cannot bypass this page to access dashboard without `organizationId`

---

## Page 3 — Dashboard Overview (Tenant Scoped)

**Route:** `/dashboard/[org-slug]`
**Purpose:** High-level metrics for the active organization.

### Layout
- Sidebar: Dark icon sidebar (fixed left, 80px wide)
  - Logo top
  - Nav items: Dashboard, Projects, Team, Billing, Settings
  - Bottom: Add button, Help, Logout
- Top nav: Org switcher (Clerk `<OrganizationSwitcher />`), page nav links, search, notifications bell, user avatar (Clerk `<UserButton />`)
- Main content: scrollable

### UI Components

#### Metric Cards (4 cards, grid)
| Card | Value Source |
|---|---|
| Active Members | `count(memberships WHERE orgId = current)` |
| Projects | `count(projects WHERE orgId = current)` |
| Subscription Status | `subscriptions.status WHERE orgId = current` |
| Plan | `subscriptions.planId WHERE orgId = current` |

#### Project Performance Section
- List of most recent 3 projects with a visual progress bar (% complete — placeholder field to add to schema later)
- Empty state: "No projects yet. Create your first project."
- "Weekly / Monthly" toggle (UI only for now)

#### Recent Activity Feed
- Chronological list of recent actions within this org
- For now: static/hardcoded entries based on real data (e.g., "Org created", "Member joined")
- Later: real activity log table

### Data Queries
```typescript
// All scoped to current orgId from auth()
const org = await db.query.organizations.findFirst({ where: eq(organizations.id, orgId) })
const memberCount = await db.select({ count: count() }).from(memberships).where(eq(memberships.organizationId, orgId))
const projectCount = await db.select({ count: count() }).from(projects).where(eq(projects.organizationId, orgId))
const subscription = await db.query.subscriptions.findFirst({ where: eq(subscriptions.organizationId, orgId) })
```

---

## Page 4 — Project Management (Tenant Scoped)

**Route:** `/dashboard/[org-slug]/projects`
**Purpose:** CRUD for the `projects` table scoped to the current org.

### UI Components

#### Data Table
- Columns: Name, Created At, Actions (Edit, Delete)
- Searchable: client-side filter by name
- Sortable: by name or created date
- Shadcn `<Table />` component

#### Create Project
- Button: "New Project" (top right of table)
- Opens a Shadcn `<Dialog />` modal
- Form fields: Project Name (required)
- On submit: POST to `/api/projects` → inserts with current `organizationId` from server session
- `organizationId` is never sent from client — always derived server-side from `auth()`

#### Delete Project
- Inline delete button per row
- Confirmation: Shadcn `<AlertDialog />` before delete

### Recruiter Hook — Optimistic UI
```typescript
// useOptimistic so new project appears instantly without spinner
const [optimisticProjects, addOptimisticProject] = useOptimistic(
  projects,
  (state, newProject) => [...state, newProject]
)
```

### Data
- GET: `db.query.projects.findMany({ where: eq(projects.organizationId, orgId) })`
- POST: `db.insert(projects).values({ name, organizationId: orgId })`
- DELETE: `db.delete(projects).where(and(eq(projects.id, id), eq(projects.organizationId, orgId)))`

**Security rule:** Every mutation validates that `organizationId` matches the session org. Never trust client-sent `organizationId`.

---

## Page 5 — Team Management / RBAC (Tenant Scoped)

**Route:** `/dashboard/[org-slug]/team`
**Purpose:** Manage who has access to this organization and at what role.

### UI Components

#### Members Table
- Columns: Avatar (Clerk), Name, Email, Role (badge), Joined date, Actions
- Data: `db.query.memberships.findMany({ where: eq(memberships.organizationId, orgId) })`
- Role displayed as a colored badge: Owner (black), Admin (dark gray), Member (light gray)

#### Invite Member
- Button: "Invite Member" (top right)
- Modal form: Email input + Role select (Member | Admin)
- Action: Clerk `inviteOrganizationMember()` — Clerk handles email delivery
- On Clerk webhook `organizationMembership.created` → row inserted to `memberships` table automatically

#### Remove Member
- Actions column: "Remove" button (owner/admin only)
- Calls Clerk `removeOrganizationMember()` → webhook fires → row deleted from `memberships`

### RBAC — Permissions-Based UI
```typescript
const { has } = await auth()

// Owner and Admin see Invite button
// Member sees it disabled or hidden
const canInvite = has({ permission: "org:member:invite" })
```

| Action | Owner | Admin | Member |
|---|---|---|---|
| Invite member | ✓ | ✓ | ✗ |
| Remove member | ✓ | ✗ | ✗ |
| Change role | ✓ | ✗ | ✗ |
| View team list | ✓ | ✓ | ✓ |

### Recruiter Hook
- Demonstrates permissions-based UI rendering
- Member literally cannot see or click the Invite button
- Proves RBAC is enforced at component level, not just API level

---

## Page 6 — Billing & Subscription (Tenant Scoped)

**Route:** `/dashboard/[org-slug]/billing`
**Purpose:** Display current plan and allow management via Stripe Customer Portal.

### UI Components

#### Current Plan Card
- Data from `subscriptions` table: plan name, status badge, current period end date
- Status badges: Active (green), Trialing (blue), Past Due (red), Canceled (gray)

#### Manage Billing Button
- Calls `/api/billing/portal` → server creates Stripe Customer Portal session → redirects user
- Server action:
```typescript
const session = await stripe.billingPortal.sessions.create({
  customer: subscription.stripeCustomerId,
  return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${orgSlug}/billing`,
})
redirect(session.url)
```

#### Usage Progress
- "Projects Used" progress bar
- Value: `projectCount / planLimit` (Free = 3, Pro = unlimited)
- Shadcn `<Progress />` component
- Shows "3 / 3 projects — Upgrade to add more" when at limit

#### Upgrade CTA (if on Free plan)
- Card with Pro plan features list
- "Upgrade to Pro" button → Stripe Checkout session
- Server action creates Checkout session with `client_reference_id: orgId`

### Stripe Webhook Events Handled
```
checkout.session.completed       → create subscription record
customer.subscription.updated   → update status, planId, currentPeriodEnd
customer.subscription.deleted   → mark as canceled
invoice.payment_failed          → mark as past_due
```

### Data
```typescript
const subscription = await db.query.subscriptions.findFirst({
  where: eq(subscriptions.organizationId, orgId)
})
const projectCount = await db.select({ count: count() }).from(projects).where(eq(projects.organizationId, orgId))
```

---

## Webhook Architecture

### `/api/webhooks/clerk`
Events: `organization.created/updated/deleted`, `organizationMembership.created/updated/deleted`
Verification: Svix HMAC (`CLERK_WEBHOOK_SECRET`)
Already implemented ✓

### `/api/webhooks/stripe`
Events: `checkout.session.completed`, `customer.subscription.updated/deleted`, `invoice.payment_failed`
Verification: `stripe.webhooks.constructEvent()` with `STRIPE_WEBHOOK_SECRET`
Status: Not yet implemented

---

## Component Library Rules

Use **shadcn/ui** for all interactive components. Do not build custom variants of things shadcn provides.

| Need | Use |
|---|---|
| Data tables | `<Table />` |
| Modals / dialogs | `<Dialog />` |
| Confirmation prompts | `<AlertDialog />` |
| Form inputs | `<Input />`, `<Select />`, `<Label />` |
| Loading states | `<Skeleton />` |
| Progress bars | `<Progress />` |
| Status badges | `<Badge />` |
| Notifications | `<Toast />` via `useToast()` |
| Cards | `<Card />`, `<CardHeader />`, `<CardContent />` |

Do not use inline styles. Use Tailwind utility classes only.
Do not import from external CDNs. All dependencies via pnpm.

---

## Security Rules (Non-Negotiable)

1. Every DB query that touches tenant data must include `WHERE organizationId = currentOrgId`
2. `organizationId` is always derived from `auth()` server-side — never trusted from client request body
3. Webhook endpoints verify HMAC signatures before processing any payload
4. RBAC checks use Clerk `has()` — not custom role checks against the DB
5. All protected routes go through Clerk middleware — no ad-hoc auth checks in page components

---

## Build Order

```
Phase 1 (Done ✓)
  ✓ Turborepo scaffold
  ✓ Drizzle schema + Neon migration
  ✓ Clerk auth + org switching
  ✓ Webhook handler (Clerk → DB sync)
  ✓ Deployed to Vercel

Phase 2 (Next)
  → Install shadcn/ui
  → Dashboard UI (metric cards, activity feed)
  → Project Management page (CRUD + optimistic UI)

Phase 3
  → Team Management page (RBAC UI)
  → Billing page (Stripe Customer Portal)
  → Stripe webhooks

Phase 4
  → Landing page (split-screen hero, pricing table)
  → Onboarding flow (/onboarding gatekeeper)
  → E2E tests with Playwright
```

---

## What This Project Is NOT

- Not a CMS
- Not a multi-database setup (logical isolation only)
- Not a real-time app (no WebSockets)
- Not a mobile app
- No dark mode toggle (light mode only for now)
- No i18n
- No AI features
