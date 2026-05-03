// packages/db/src/schema.ts
//
// Multi-tenant schema using Logical Isolation.
// Every resource is scoped to an organization_id — never a user_id directly.

import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const membershipRoleEnum = pgEnum("membership_role", [
  "owner",
  "admin",
  "member",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "trialing",
  "past_due",
  "canceled",
  "unpaid",
]);

// ─── Organizations ─────────────────────────────────────────────────────────────

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(), // Clerk org ID (e.g. org_2abc...)
  name: text("name").notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Memberships ───────────────────────────────────────────────────────────────

export const memberships = pgTable(
  "memberships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: text("organization_id")
      .references(() => organizations.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id").notNull(), // Clerk User ID (external)
    role: membershipRoleEnum("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    // One membership per user per org — enforced at DB level
    uniqueMembership: uniqueIndex("unique_membership_idx").on(
      table.organizationId,
      table.userId
    ),
  })
);

// ─── Subscriptions ─────────────────────────────────────────────────────────────
// Separate from organizations intentionally — billing state changes frequently
// and is driven by billing provider webhooks (e.g. Lemon Squeezy).

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull()
    .unique(), // One active subscription per org
  customerId: text("customer_id").unique(), // Provider-specific customer ID
  subscriptionId: text("subscription_id").unique(), // Provider-specific sub ID
  status: subscriptionStatusEnum("status").notNull().default("trialing"),
  planId: text("plan_id"), // Internal plan identifier (variant ID in LS)
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Projects (Example tenant-scoped resource) ─────────────────────────────────

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  progress: text("progress").default("0").notNull(), // percentage 0-100 as string or int, keeping it simple
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Activity Logs ─────────────────────────────────────────────────────────────

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type").notNull(), // e.g. 'project_created'
  message: text("message").notNull(),
  metadata: text("metadata"), // Stringified JSON or just text
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
