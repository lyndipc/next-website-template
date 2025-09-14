import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

interface RatelimitResponse {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET || "your-secret-key";

  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const keys = await redis.keys("ratelimit:*");
    const analytics: Record<
      string,
      RatelimitResponse | string | number | unknown
    > = {};

    for (const key of keys) {
      const data = await redis.get(key);
      analytics[key] = data;
    }

    return NextResponse.json({
      status: "Rate limiting active",
      analytics,
      timestamp: new Date().toISOString(),
      keysCount: keys.length,
    });
  } catch (error) {
    console.error("Rate limit status error:", error);
    return NextResponse.json(
      { error: "Failed to get rate limit status" },
      { status: 500 },
    );
  }
}
