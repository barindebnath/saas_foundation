export const dynamic = "force-dynamic";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@repo/db";
import { organizations, memberships } from "@repo/db";
import { eq, and } from "drizzle-orm";
import type { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
  }

  // Verify the webhook signature
  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    // ─── Organization Events ──────────────────────────────────────────
    case "organization.created": {
      const { id, name, slug } = event.data;
      await db.insert(organizations).values({
        id,
        name,
        slug: slug ?? id,
      });
      break;
    }

    case "organization.updated": {
      const { id, name, slug } = event.data;
      await db
        .update(organizations)
        .set({
          name,
          slug: slug ?? id,
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, id));
      break;
    }

    case "organization.deleted": {
      const { id } = event.data;
      if (id) {
        // Cascade deletes memberships, subscriptions, projects
        await db.delete(organizations).where(eq(organizations.id, id));
      }
      break;
    }

    // ─── Membership Events ────────────────────────────────────────────
    case "organizationMembership.created": {
      const { organization, public_user_data, role } = event.data;
      await db
        .insert(memberships)
        .values({
          organizationId: organization.id,
          userId: public_user_data.user_id,
          role: mapClerkRole(role),
        })
        .onConflictDoUpdate({
          target: [memberships.organizationId, memberships.userId],
          set: { role: mapClerkRole(role) },
        });
      break;
    }

    case "organizationMembership.updated": {
      const { organization, public_user_data, role } = event.data;
      await db
        .update(memberships)
        .set({ role: mapClerkRole(role) })
        .where(
          and(
            eq(memberships.organizationId, organization.id),
            eq(memberships.userId, public_user_data.user_id)
          )
        );
      break;
    }

    case "organizationMembership.deleted": {
      const { organization, public_user_data } = event.data;
      await db
        .delete(memberships)
        .where(
          and(
            eq(memberships.organizationId, organization.id),
            eq(memberships.userId, public_user_data.user_id)
          )
        );
      break;
    }

    default:
      // Unhandled event type — log but don't fail
      console.log(`Unhandled webhook event: ${event.type}`);
  }

  return new Response("OK", { status: 200 });
}

// Map Clerk's role strings to our pgEnum values
function mapClerkRole(clerkRole: string): "owner" | "admin" | "member" {
  switch (clerkRole) {
    case "org:admin":
      return "admin";
    case "org:member":
      return "member";
    default:
      return "member";
  }
}
