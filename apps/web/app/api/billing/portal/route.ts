import { auth } from "@clerk/nextjs/server";
import { db, subscriptions } from "@repo/db";
import { eq } from "drizzle-orm";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";
import { setupLS } from "@/lib/lemonsqueezy";

export async function GET() {
  const { orgId } = await auth();
  if (!orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.organizationId, orgId),
  });

  if (!sub?.subscriptionId) {
    return NextResponse.json({ error: "No active subscription" }, { status: 404 });
  }

  setupLS();

  try {
    const { data, error } = await getSubscription(sub.subscriptionId);
    
    if (error) throw error;

    const portalUrl = data?.data.attributes.urls.customer_portal;

    if (!portalUrl) {
      return NextResponse.json({ error: "Portal URL not found" }, { status: 404 });
    }

    return NextResponse.json({ url: portalUrl });
  } catch (err) {
    console.error("[LS Portal Error]", err);
    return NextResponse.json({ error: "Failed to get portal URL" }, { status: 500 });
  }
}
