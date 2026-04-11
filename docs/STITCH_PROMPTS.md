# Google Stitch Prompts — SaaS Foundation

---

## PROMPT 1 — Landing Page

Design a B2B SaaS landing page for a multi-tenant project management tool called "SaaS Foundation".

**Layout:** Single scrolling page, light background (#f9f9ff), no dark mode toggle.

**Section 1 — Hero (Split Screen)**
- Left half: Large bold headline "The Operating System for Modern Teams", subheadline "Multi-tenant workspaces, role-based access, and Stripe billing — out of the box.", two buttons side by side: "Start Free" (black filled) and "View Demo" (outlined)
- Right half: A high-fidelity UI mockup of a dashboard — dark sidebar on far left with icons, white main area with 4 metric stat cards in a row, below that a table of projects with a progress bar column
- No hero image from stock photos. The right side is a UI component, not photography.
- Full viewport height section

**Section 2 — Logo Cloud**
- Label: "Trusted by teams at" (small caps, gray)
- 6 company name wordmarks in a horizontal row, grayscale: "Acme Corp", "Pinnacle", "Nexus Labs", "Orion", "Meridian", "Vertex"
- No actual images, just styled text in a clean monospace or sans font
- Thin top and bottom border separating this section

**Section 3 — Feature Grid**
- Section title: "Everything you need to run a multi-tenant product"
- 2 rows × 3 columns grid, each card has: a single Material Symbol icon (filled), bold title, one sentence description
- Cards:
  1. Icon: "corporate_fare" — "Organization Isolation" — "Every tenant's data is scoped by organization_id. Nothing leaks."
  2. Icon: "shield_person" — "Role-Based Access" — "Owner, Admin, Member roles enforced at the database and UI layer."
  3. Icon: "payments" — "Stripe Billing Per Org" — "Each organization gets its own subscription, plan, and billing portal."
  4. Icon: "sync" — "Webhook-Synced Members" — "Clerk organization events sync to your database automatically."
  5. Icon: "bolt" — "Edge-Ready Database" — "Drizzle ORM on Neon serverless Postgres. Zero cold starts."
  6. Icon: "view_kanban" — "Project CRUD" — "Searchable, sortable project table with optimistic UI updates."
- Light card background, subtle border, no shadows

**Section 4 — Pricing Table**
- Section title: "Simple, transparent pricing"
- 3 columns: Free / Pro / Enterprise
- Free column: "$0/month", features list (1 organization, 3 projects max, community support), "Get Started" outlined button
- Pro column: "$29/month", highlighted with black background and white text, features list (unlimited orgs, unlimited projects, Stripe billing, priority support), "Upgrade to Pro" filled white button
- Enterprise column: "Custom pricing", features list (custom contracts, dedicated support, SLA), "Contact Us" outlined button
- Each feature list uses a checkmark icon prefix

**Section 5 — Footer**
- Left: "SaaS Foundation" wordmark + "© 2026"
- Right: text links — GitHub, Docs, Privacy, Terms
- Thin top border, minimal height

**Typography:** Use "DM Sans" or "Sora" — not Inter, not Roboto
**Colors:** Background #f9f9ff, text #151c27, accent/black #000000, muted #747878
**No:** animations, carousels, video backgrounds, testimonial sections, newsletter forms, chatbots

---

## PROMPT 2 — Onboarding Page

Design a minimal onboarding page for a B2B SaaS app. The user is authenticated but has no organization yet.

**Layout:** Centered single column, max-width 480px, vertically centered on page. No sidebar. No top navigation bar. Light background (#f9f9ff).

**Top:** Small logo icon (square, dark, top center), below it the app name "SaaS Foundation" in small gray text

**Heading:** "Welcome. Set up your workspace." — large, bold, centered

**Sub-heading:** "You need an organization to continue. Join an existing one or create a new one." — small, gray, centered

**Section A — Your Organizations**
- Heading: "Your Organizations" (small caps label)
- A list of 2 example organization rows. Each row:
  - Left: A small colored square avatar with org initials (e.g. "AC" for Acme Corp)
  - Middle: Org name bold, below it the user's role in that org (e.g. "Admin")
  - Right: "Enter →" button, small, outlined black
- If list is empty, show: "You don't belong to any organizations yet." in gray italic

**Divider:** Horizontal line with "or" text centered

**Section B — Create New**
- A single large outlined card/button area
- Icon: "add_circle" (Material Symbol, large, centered)
- Text: "Create a new organization" bold, below it "Start fresh with your own workspace." small gray
- Full width, dashed border, hover state: border goes solid black

**Bottom:** Small gray text "Need help? Contact support" with underline

**Typography:** "DM Sans" or "Sora"
**Colors:** Background #f9f9ff, text #151c27, muted #747878, borders #c4c7c7
**No:** sidebar, top nav, dashboard content, metric cards, anything unrelated to org selection/creation

---

## PROMPT 3 — Dashboard Overview

Design a B2B SaaS dashboard overview page. This is the main screen after login.

**Layout:**
- Fixed dark sidebar on the far left, 80px wide, full height, background #1c1b1b
- Main content area takes the remaining width
- Sticky top navigation bar, white, 64px tall, above the main content

**Sidebar contents (top to bottom):**
- Top: Small white square logo icon
- Nav items stacked vertically, icon above label, each 48px tall:
  - dashboard icon — "DASH" label — currently active (left border accent #e5e2e1, background #474646, white text)
  - monitoring icon — "STATS" — inactive (gray)
  - group icon — "TEAM" — inactive (gray)
  - inventory_2 icon — "WORKS" — inactive (gray)
  - settings icon — "SETUP" — inactive (gray)
- Bottom: white circular "+" button, then help_outline icon, then logout icon

**Top navigation bar:**
- Left: small org avatar square + "Acme Corp" text with unfold_more icon (this is the org switcher), then horizontal nav links: "Overview" (active, underlined), "Reports", "Activity"
- Right: search input field (64px wide, pill shape), bell icon with red dot, user avatar circle

**Main content (light gray background #f9f9ff, padding 32px):**

**Row 1 — Page header:**
- Small caps label: "EXECUTIVE OVERVIEW"
- Large bold heading: "Overview"

**Row 2 — Metric cards (4 columns):**
Each card: white background, rounded corners, padding 32px, subtle border
- Card 1: group icon (filled) — "ACTIVE MEMBERS" label — large bold number "1" — sub: "Synced from Clerk" green text
- Card 2: inventory_2 icon — "PROJECTS" label — large bold number "0" — sub: "No projects yet" gray
- Card 3: verified_user icon — "SUBSCRIPTION STATUS" label — large bold "Trialing" — sub: "Upgrade to activate" gray
- Card 4: workspace_premium icon — "PLAN" label — large bold "Free" — sub: "Manage Billing" black underline link

**Row 3 — Two column layout:**
Left (2/3 width): "Project Performance" card
- White background, rounded, padded
- Header row: "Project Performance" title + "Weekly" (black filled) / "Monthly" (gray) toggle buttons
- Body: empty state centered — large inventory_2 icon in light gray, "No projects yet" text, "Create your first project to see performance here" sub-text

Right (1/3 width): "Recent Activity" card
- Light gray background, rounded, padded
- Small caps header: "RECENT ACTIVITY"
- Vertical timeline: thin line on left, 3 activity items each with: white circle icon button, activity text, timestamp
  - Item 1: add icon — "Org created" — "Just now"
  - Item 2: check_circle icon — "Schema migrated" — "Earlier today"
  - Item 3: analytics icon — "Webhooks connected" — "Earlier today"
- "View All Logs" button at bottom, full width, outlined

**Typography:** "DM Sans" or "Sora"
**Icons:** Material Symbols Outlined (use Google Fonts CDN)
**Colors:** Sidebar #1c1b1b, main bg #f9f9ff, cards white, text #151c27, muted #444748
**No:** charts, graphs, bar charts, pie charts, dark mode, mobile hamburger menu, breadcrumbs

---

## PROMPT 4 — Project Management Page

Design a project management page for a B2B SaaS app. Same sidebar and top nav as the dashboard overview (dark sidebar 80px, sticky white top nav with org switcher).

**Active sidebar item:** inventory_2 icon — "WORKS"

**Main content area:**

**Page header row:**
- Left: "Projects" as large bold heading, below it small gray text "All projects for this organization"
- Right: "New Project" button — black filled, with add icon prefix

**Search and filter bar (below header):**
- Left: Search input with search icon, placeholder "Search projects...", width 280px
- Right: "Sort by: Name" dropdown (outlined, small)

**Data table (full width, white background, rounded, bordered):**
Table columns: checkbox column, "Name" (sortable arrow), "Created" (sortable arrow), "Status", "Actions"

Show 3 example rows:
- Row 1: "Website Redesign" — "Apr 10, 2026" — "Active" badge (green) — Edit icon + Delete icon
- Row 2: "API Integration" — "Apr 9, 2026" — "Complete" badge (gray) — Edit icon + Delete icon  
- Row 3: "Mobile App v2" — "Apr 8, 2026" — "Active" badge (green) — Edit icon + Delete icon

Table footer: "Showing 3 of 3 projects" small gray text left, pagination controls right (prev/next arrows, disabled state)

**Create Project Modal (shown as overlay on top of the page):**
- Dark backdrop overlay
- White modal card, centered, max-width 400px, rounded
- Header: "New Project" bold title, X close button top right
- Form:
  - Label "Project Name" with asterisk
  - Text input, full width, placeholder "e.g. Website Redesign"
  - Small gray helper text: "This project will be scoped to Acme Corp"
- Footer: "Cancel" outlined button + "Create Project" black filled button, right-aligned
- Note: organizationId is never a form field. It is derived server-side.

**Typography:** "DM Sans" or "Sora"
**Colors:** Same as dashboard. Table rows have hover state (very light gray).
**No:** Kanban board, drag and drop, file attachments, comments, tags, priority levels, due dates, assigned users

---

## PROMPT 5 — Team Management Page

Design a team management page for a B2B SaaS app. Same sidebar and top nav layout.

**Active sidebar item:** group icon — "TEAM"

**Main content area:**

**Page header row:**
- Left: "Team" large bold heading, below it "Manage members and roles for Acme Corp" small gray
- Right: "Invite Member" button — black filled, with person_add icon prefix (this button is only visible to owners and admins — add a small tooltip or note below: "Members cannot invite")

**Members table (full width, white background, rounded, bordered):**
Columns: "Member" (avatar + name + email), "Role" (badge), "Joined", "Actions"

Show 3 example rows:
- Row 1: Avatar circle "B", "Barin Debnath", "barin@example.com" — "Owner" badge (black background white text) — no action buttons (cannot remove yourself)
- Row 2: Avatar circle "J", "Jane Smith", "jane@example.com" — "Admin" badge (dark gray background) — "Remove" text button (red, small)
- Row 3: Avatar circle "M", "Mike Lee", "mike@example.com" — "Member" badge (light gray background dark text) — "Remove" text button (red, small)

**Invite Member Modal (shown as overlay):**
- Dark backdrop overlay
- White modal, centered, max-width 420px, rounded
- Header: "Invite a Member" bold title, X close button
- Form:
  - Label "Email Address" + input, placeholder "colleague@company.com"
  - Label "Role" + select dropdown with options: Member, Admin (Owner not selectable — add note: "Only one owner per org")
  - Helper text below role: "Members can view. Admins can invite and manage projects."
- Footer: "Cancel" outlined + "Send Invite" black filled, right-aligned

**Permissions reference card (below table, full width):**
- Light gray background, rounded, padded 24px
- Title: "Role Permissions" small caps
- A 4-column table:
  - Column headers: Action | Owner | Admin | Member
  - Rows: "Invite members" ✓ ✓ ✗ | "Remove members" ✓ ✗ ✗ | "Change roles" ✓ ✗ ✗ | "View team" ✓ ✓ ✓ | "Manage billing" ✓ ✗ ✗
- Checkmarks in black, X marks in gray

**Typography:** "DM Sans" or "Sora"
**Colors:** Same as dashboard. Owner badge black, Admin badge #474646, Member badge #e7eefe with dark text.
**No:** org chart view, Slack-style user cards, activity per member, calendar, DM/messaging features

---

## PROMPT 6 — Billing Page

Design a billing and subscription page for a B2B SaaS app. Same sidebar and top nav layout.

**Active sidebar item:** (use a credit card or payments icon) — no label or "BILL" label

**Main content area:**

**Page header:**
- "Billing" large bold heading
- "Manage your subscription and usage for Acme Corp" small gray sub

**Section 1 — Current Plan (full width card):**
- White background, rounded, padded, bordered
- Left side: 
  - "CURRENT PLAN" small caps gray label
  - "Free" large bold heading
  - "Trialing" status badge (blue, pill shape) inline next to heading
  - "Your trial ends on May 10, 2026" small gray text below
- Right side:
  - "Manage Billing" button — outlined black — "Opens Stripe Customer Portal →"
  - Small gray text below button: "Update payment method, download invoices"

**Section 2 — Usage (full width card):**
- White background, rounded, padded, bordered
- Title: "Usage This Period" bold
- One usage row: 
  - Left: "Projects" label + "1 of 3 used" gray text
  - Right: a progress bar (1/3 filled, black fill, gray track), "33%" label
- Below progress bar: "Upgrade to Pro for unlimited projects" small gray text with "Upgrade →" black link inline

**Section 3 — Upgrade CTA (full width card):**
- Black background, white text, rounded, padded
- Left: 
  - "Unlock everything" large bold white heading
  - Features list (white text, checkmark prefix, two columns):
    - Unlimited organizations
    - Unlimited projects
    - Stripe billing management
    - Priority support
    - RBAC permissions
    - Webhook integrations
- Right: 
  - "$29 / month" large white number
  - "per organization, billed monthly" small gray-ish text
  - "Upgrade to Pro" button — white background black text, full width
  - "No commitment. Cancel anytime." tiny gray text below

**Section 4 — Billing History (full width card):**
- White background, rounded, padded, bordered
- Title: "Billing History" bold
- Empty state: "No invoices yet. Your invoices will appear here after your first payment." centered gray text
- Or show 1 placeholder row: "Apr 2026 — Free Plan — $0.00 — "No invoice" gray italic

**Typography:** "DM Sans" or "Sora"
**Colors:** Same as dashboard. Upgrade card: solid black background.
**No:** crypto payments, usage graphs, multiple payment methods UI, annual/monthly billing toggle, tax settings, invoice editor