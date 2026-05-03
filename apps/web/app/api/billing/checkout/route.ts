import { auth } from "@clerk/nextjs/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";
import { setupLS, LS_CONFIG } from "@/lib/lemonsqueezy";

export async function POST() {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  setupLS();

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = LS_CONFIG.plans.pro;

  if (!storeId || variantId === "placeholder_pro_variant") {
    console.error("Lemon Squeezy Store ID or Variant ID not configured");
    return NextResponse.json({ error: "Billing not configured" }, { status: 500 });
  }

  try {
    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutData: {
        custom: {
          org_id: orgId,
          user_id: userId,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
      },
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ url: data?.data.attributes.url });
  } catch (err) {
    console.error("[LS Checkout Error]", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
