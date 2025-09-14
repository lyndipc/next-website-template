import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitResponse {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending?: Promise<unknown>;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimiters = {
  // General API rate limiter - 20 requests per minute
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1m"),
    analytics: true,
    prefix: "ratelimit:api",
  }),

  // Contact form - stricter limit to prevent spam
  contact: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1m"), // 3 submissions per minute
    analytics: true,
    prefix: "ratelimit:contact",
  }),

  // Website pages - very generous limit
  pages: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1m"),
    analytics: true,
    prefix: "ratelimit:pages",
  }),
};

export function getClientIdentifier(request: Request): string {
  // Try to get real IP from various headers (for production with proxies)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  // Use the first available IP
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    cfConnectingIp ||
    "127.0.0.1";

  return ip;
}

export function createRateLimitResponse(
  result: RateLimitResponse,
): Response | null {
  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: "Too many requests",
        message: "You have exceeded the rate limit. Please try again later.",
        retryAfter: Math.round(result.reset / 1000),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": result.limit.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": result.reset.toString(),
          "Retry-After": Math.round(result.reset / 1000).toString(),
        },
      },
    );
  }

  return null;
}
