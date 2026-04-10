# Architecture Overview

## Multi-Tenancy Strategy: Logical Isolation

All tenant-scoped data is partitioned by `organization_id` within a shared PostgreSQL database.

### Data Flow

```
Clerk (Auth) ──webhook──▶ /api/webhooks/clerk ──▶ memberships table
                                                      │
User Request ──middleware──▶ resolve org from session ─┘
                                │
                                ▼
                     Query with WHERE organization_id = ?
```

### Why Not Physical Isolation?

| Approach                   | Pros                                                           | Cons                                                  |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| **Logical (this project)** | Simple migrations, single connection pool, works on serverless | Requires careful WHERE clauses                        |
| **Schema-per-tenant**      | Stronger isolation                                             | Migration complexity scales linearly with tenants     |
| **Database-per-tenant**    | Strongest isolation                                            | Operationally expensive, connection pooling nightmare |

For a B2B SaaS serving up to ~10k organizations, logical isolation with proper indexing and (optionally) Postgres RLS is the industry-standard approach.

---

## Auth → DB Sync

Clerk owns the user identity and organization membership. We sync relevant state into our database via webhooks:

1. **User created** → No-op (users only matter in context of an org)
2. **Organization created** → Insert into `organizations`
3. **Membership created** → Insert into `memberships`
4. **Membership updated** → Update role in `memberships`
5. **Membership deleted** → Delete from `memberships`

This means our DB is the source of truth for **billing** and **app-specific data**, while Clerk is the source of truth for **identity** and **org membership**.

---

## Billing Architecture

Stripe state is decoupled from the `organizations` table into a dedicated `subscriptions` table.

**Why?**

- Stripe sends ~15 different webhook event types
- Billing state changes independently of org settings
- Easier to add plan tiers, trials, and grace periods without touching org logic

### Webhook Events Handled

| Event                           | Action                     |
| ------------------------------- | -------------------------- |
| `checkout.session.completed`    | Create subscription record |
| `customer.subscription.updated` | Update status, period end  |
| `customer.subscription.deleted` | Mark as canceled           |
| `invoice.payment_failed`        | Mark as past_due           |
