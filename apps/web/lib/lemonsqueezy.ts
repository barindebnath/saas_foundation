// apps/web/lib/lemonsqueezy.ts
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

/**
 * Setup Lemon Squeezy SDK
 */
export function setupLS() {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY ?? "",
    onError: (error) => {
      console.error("Lemon Squeezy SDK Error:", error);
    },
  });
}

/**
 * Generic LS Constants
 */
export const LS_CONFIG = {
  // Replace these with actual variant IDs from Lemon Squeezy Dashboard
  plans: {
    free: "free",
    pro: process.env.LEMONSQUEEZY_PRO_VARIANT_ID ?? "placeholder_pro_variant",
  },
};
