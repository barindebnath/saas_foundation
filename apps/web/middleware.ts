import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes — accessible without authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const { userId, orgId } = await auth();

  // If user is authenticated
  if (userId) {
    const isOnboarding = request.nextUrl.pathname.startsWith("/onboarding");

    // If user is authenticated AND has no orgId in session AND is not on /onboarding
    if (!orgId && !isOnboarding) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // If user is authenticated AND has orgId → skip /onboarding
    if (orgId && isOnboarding) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
