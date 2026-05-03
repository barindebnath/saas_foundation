import { createHmac } from "crypto";
import { db, subscriptions } from "@repo/db";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("x-signature") || "";

  if (!WEBHOOK_SECRET) {
    console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  // Verify signature
  const hmac = createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(body).digest("hex");

  if (signature !== digest) {
    return new Response("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(body);
  const eventName = payload.meta.event_name;
  const data = payload.data;

  console.log(`[Lemon Squeezy Webhook] Received event: ${eventName}`);

  try {
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated": {
        const attributes = data.attributes;
        const orgId = payload.meta.custom_data?.org_id; // Passed during checkout

        if (!orgId) {
          console.error("No org_id found in custom_data");
          break;
        }

        // LS uses variant_id as the plan identifier
        const planId = attributes.variant_id.toString();
        const status = attributes.status; // active, trialing, past_due, etc.
        const customerId = attributes.customer_id.toString();
        const subscriptionId = data.id.toString();
        const currentPeriodEnd = new Date(attributes.renews_at);

        await db.insert(subscriptions).values({
          organizationId: orgId,
          customerId,
          subscriptionId,
          status: mapStatus(status),
          planId,
          currentPeriodEnd,
          updatedAt: new Date(),
        }).onConflictDoUpdate({
          target: [subscriptions.organizationId],
          set: {
            status: mapStatus(status),
            planId,
            subscriptionId,
            currentPeriodEnd,
            updatedAt: new Date(),
          },
        });
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        const subscriptionId = data.id.toString();
        await db.update(subscriptions)
          .set({ status: "canceled", updatedAt: new Date() })
          .where(eq(subscriptions.subscriptionId, subscriptionId));
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Lemon Squeezy Webhook Error]", error);
    return new Response("Webhook handler failed", { status: 500 });
  }
}

function mapStatus(lsStatus: string): "active" | "trialing" | "past_due" | "canceled" | "unpaid" {
  switch (lsStatus) {
    case "active":
    case "on_trial":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "cancelled":
    case "expired":
      return "canceled";
    default:
      return "active";
  }
}
