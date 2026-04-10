# SaaS Foundation

A production-grade, multi-tenant B2B SaaS starter built with the modern TypeScript ecosystem. Designed as an architectural foundation for subscription-based products where **data isolation**, **role-based access**, and **billing** are first-class concerns.

> **Not a tutorial project.** This is structured the way a real engineering team would bootstrap a new SaaS product in 2025+.

---

## Architecture

| Layer         | Technology                      | Why                                                       |
| ------------- | ------------------------------- | --------------------------------------------------------- |
| **Framework** | Next.js 15 (App Router)         | RSC, Route Handlers, middleware-level auth                |
| **Language**  | TypeScript 5.9 (strict)         | End-to-end type safety, schema-as-types via Drizzle       |
| **Monorepo**  | Turborepo + pnpm workspaces     | Shared packages (`db`, `ui`, `auth`) with parallel builds |
| **Database**  | PostgreSQL on Neon (serverless) | Branching, autoscaling, zero cold-start HTTP driver       |
| **ORM**       | Drizzle ORM                     | TypeScript-native, no codegen, edge-compatible            |
| **Auth**      | Clerk                           | Organization switching, RBAC, webhook-synced memberships  |
| **Billing**   | Stripe (Checkout + Webhooks)    | Per-org subscriptions, decoupled billing state            |
| **UI**        | Tailwind CSS + shadcn/ui        | Accessible components, zero runtime overhead              |

---

## Multi-Tenancy Model

This project uses **Logical Isolation**: every row of tenant-scoped data carries an `organization_id` foreign key. There are no separate databases or schemas per tenant.

```
organizations ──┐
                 ├── memberships (user ↔ org, with role)
                 ├── subscriptions (Stripe state, 1:1 per org)
                 └── projects (example scoped resource)
```

**Why logical isolation?**

- Single connection pool — no per-tenant connection overhead on serverless
- Simpler migrations — one schema, one migration path
- Row-Level Security can be layered on later if needed
- Good enough for 99% of B2B SaaS up to enterprise scale

---

## Security

- **RBAC** enforced at the database level via `pgEnum` (`owner` | `admin` | `member`) and a unique constraint on `(organization_id, user_id)`
- **CSRF** protection via Clerk's session tokens + SameSite cookies
- **Webhook verification** — Stripe and Clerk webhooks validated with HMAC signatures before processing
- **Environment isolation** — secrets never committed; `.env.example` documents required variables
- **Timestamps with timezone** — all `timestamp` columns use `withTimezone: true` to prevent silent timezone bugs

---

## Project Structure

```
/saas-starter
├── apps/
│   └── web/              # Next.js 15 — landing, dashboard, billing
├── packages/
│   ├── db/               # Drizzle schema, migrations, Neon client
│   ├── ui/               # Shared Tailwind/shadcn components
│   ├── eslint-config/    # Shared ESLint rules
│   └── typescript-config/ # Shared tsconfig bases
├── docs/                 # Architecture diagrams, compliance notes
├── .env.example
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9
- A [Neon](https://neon.tech) database (free tier works)
- A [Clerk](https://clerk.com) application
- A [Stripe](https://stripe.com) account (test mode)

### Setup

```bash
# 1. Clone and install
pnpm install

# 2. Configure environment
cp .env.example .env
# Fill in DATABASE_URL, Clerk keys, Stripe keys

# 3. Push schema to Neon (rapid prototyping)
pnpm --filter @repo/db db:push

# 4. Start development
pnpm dev
```

### Database Commands

```bash
pnpm --filter @repo/db db:push      # Push schema directly (dev)
pnpm --filter @repo/db db:generate   # Generate migration files (prod)
pnpm --filter @repo/db db:migrate    # Run pending migrations
pnpm --filter @repo/db db:studio     # Open Drizzle Studio GUI
```

---

## Roadmap

- [x] Turborepo monorepo scaffold
- [x] Drizzle + Neon multi-tenant schema
- [ ] Clerk auth integration with org switching
- [ ] Clerk → DB membership sync via webhooks
- [ ] Stripe Checkout + subscription webhooks
- [ ] Dashboard with org-scoped data
- [ ] RBAC middleware (owner/admin/member gates)
- [ ] Landing page with pricing table
- [ ] E2E tests with Playwright

---

## License

MIT
