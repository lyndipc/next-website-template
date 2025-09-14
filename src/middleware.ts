import { NextRequest, NextResponse } from "next/server";
import {
  rateLimiters,
  getClientIdentifier,
  createRateLimitResponse,
} from "@/lib/rate-limit";

export async function middleware(request: NextRequest) {
  // Skip rate limiting in development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const identifier = getClientIdentifier(request);

  try {
    // Rate limit API routes more strictly
    if (pathname.startsWith("/api/")) {
      const result = await rateLimiters.api.limit(identifier);
      const rateLimitResponse = createRateLimitResponse(result);

      if (rateLimitResponse) {
        return rateLimitResponse;
      }

      // Additional strict limiting for contact form
      if (pathname === "/api/contact") {
        const contactResult = await rateLimiters.contact.limit(identifier);
        const contactRateLimitResponse = createRateLimitResponse(contactResult);

        if (contactRateLimitResponse) {
          return contactRateLimitResponse;
        }
      }
    } else {
      // Rate limit page requests (very generous)
      const result = await rateLimiters.pages.limit(identifier);

      if (!result.success) {
        // For pages, we'll be more lenient - just add headers but allow through
        console.warn(
          `Rate limit exceeded for pages: ${identifier} on ${pathname}`,
        );
      }
    }

    // Continue to the next middleware or route handler
    const response = NextResponse.next();

    // Add rate limit headers to all responses for debugging
    if (pathname.startsWith("/api/")) {
      const result = await rateLimiters.api.limit(identifier);
      response.headers.set("X-RateLimit-Limit", result.limit.toString());
      response.headers.set(
        "X-RateLimit-Remaining",
        result.remaining.toString(),
      );
      response.headers.set("X-RateLimit-Reset", result.reset.toString());
    }

    return response;
  } catch (error) {
    // If rate limiting fails (e.g., Redis is down), allow the request through
    console.error("Rate limiting error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
};
