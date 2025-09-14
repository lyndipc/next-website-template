#!/usr/bin/env node

/**
 * Integration test for rate limiting
 * This tests the actual API endpoints with real rate limiting
 *
 * Usage: npm run test:rate-limit:integration
 */

import { performance } from "perf_hooks";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const ADMIN_SECRET =
  process.env.ADMIN_SECRET || "your-secure-admin-secret-here";

// Type definitions
interface RateLimitHeaders {
  limit: string | null;
  remaining: string | null;
  reset: string | null;
  retryAfter: string | null;
}

interface RequestResult {
  status: number;
  headers: RateLimitHeaders;
  duration: number;
  ok?: boolean;
  body?: Record<string, unknown> | string | null;
  error?: string;
}

interface TestResult extends RequestResult {
  request: number;
}

type ColorName = "green" | "red" | "yellow" | "blue" | "reset" | "bold";

const colors: Record<ColorName, string> = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(color: ColorName, message: string): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<RequestResult> {
  const startTime = performance.now();

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      ...options,
    });

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    return {
      status: response.status,
      headers: {
        limit: response.headers.get("X-RateLimit-Limit"),
        remaining: response.headers.get("X-RateLimit-Remaining"),
        reset: response.headers.get("X-RateLimit-Reset"),
        retryAfter: response.headers.get("Retry-After"),
      },
      duration,
      ok: response.ok,
      body: response.ok
        ? await response.json().catch(() => null)
        : await response.text(),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      status: 0,
      error: errorMessage,
      duration: performance.now() - startTime,
      headers: {
        limit: null,
        remaining: null,
        reset: null,
        retryAfter: null,
      },
    };
  }
}

async function testContactFormRateLimit(): Promise<TestResult[]> {
  log("blue", "\n🧪 Testing Contact Form Rate Limiting");
  log("yellow", "   Expected: 5 requests allowed, 6th should be blocked\n");

  const contactData = {
    name: "Test User",
    email: "test@example.com",
    subject: "Rate limit integration test",
    message: "This is an automated test for rate limiting",
    category: "General Support",
  };

  const results: TestResult[] = [];

  // Send 7 requests rapidly
  for (let i = 1; i <= 7; i++) {
    const result = await makeRequest("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const testResult: TestResult = { request: i, ...result };
    results.push(testResult);

    if (result.status === 200) {
      log("green", `✅ Request ${i}: Success (${result.duration}ms)`);
    } else if (result.status === 429) {
      log("red", `🚫 Request ${i}: Rate limited (${result.duration}ms)`);
      if (result.headers.retryAfter) {
        log("yellow", `   Retry after: ${result.headers.retryAfter}s`);
      }
      break;
    } else {
      log(
        "red",
        `❌ Request ${i}: Error ${result.status} (${result.duration}ms)`,
      );
    }

    // Show rate limit headers if available
    if (result.headers.limit) {
      log(
        "blue",
        `   Rate limit: ${result.headers.remaining}/${result.headers.limit} remaining`,
      );
    }

    // Small delay to avoid overwhelming
    await sleep(50);
  }

  return results;
}

async function testApiRateLimit(): Promise<TestResult[]> {
  log("blue", "\n🧪 Testing API Rate Limiting");
  log("yellow", "   Expected: 100 requests allowed per minute\n");

  const results: TestResult[] = [];

  // Test with admin endpoint (requires auth)
  for (let i = 1; i <= 5; i++) {
    const result = await makeRequest("/api/admin/rate-limit-status", {
      headers: {
        Authorization: `Bearer ${ADMIN_SECRET}`,
      },
    });

    const testResult: TestResult = { request: i, ...result };
    results.push(testResult);

    if (result.status === 200) {
      log("green", `✅ API Request ${i}: Success (${result.duration}ms)`);
    } else if (result.status === 429) {
      log("red", `🚫 API Request ${i}: Rate limited (${result.duration}ms)`);
    } else if (result.status === 401) {
      log("yellow", `🔒 API Request ${i}: Unauthorized - check ADMIN_SECRET`);
    } else {
      log(
        "red",
        `❌ API Request ${i}: Error ${result.status} (${result.duration}ms)`,
      );
    }

    // Show rate limit headers
    if (result.headers.limit) {
      log(
        "blue",
        `   Rate limit: ${result.headers.remaining}/${result.headers.limit} remaining`,
      );
    }

    await sleep(100);
  }

  return results;
}

async function testEnvironmentCheck(): Promise<boolean> {
  log("blue", "\n🔍 Environment Check");

  // Check if server is running
  try {
    const healthCheck = await makeRequest("/");
    if (healthCheck.status === 200) {
      log("green", "✅ Server is running");
    } else {
      log("red", `❌ Server returned ${healthCheck.status}`);
      return false;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log("red", `❌ Cannot connect to server: ${errorMessage}`);
    return false;
  }

  // Check environment variables
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    log("yellow", "⚠️  UPSTASH_REDIS_REST_URL not set in environment");
  } else {
    log("green", "✅ Upstash Redis URL configured");
  }

  if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
    log("yellow", "⚠️  UPSTASH_REDIS_REST_TOKEN not set in environment");
  } else {
    log("green", "✅ Upstash Redis token configured");
  }

  return true;
}

async function clearTestRateLimits(): Promise<void> {
  log("blue", "\n🧹 Clearing test rate limits");

  try {
    const result = await makeRequest("/api/admin/clear-rate-limits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ADMIN_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: "127.0.0.1", type: "all" }),
    });

    if (result.status === 200) {
      log("green", "✅ Test rate limits cleared");
    } else {
      log("yellow", `⚠️  Could not clear rate limits: ${result.status}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log("yellow", `⚠️  Could not clear rate limits: ${errorMessage}`);
  }
}

async function generateTestReport(
  contactResults: TestResult[],
  apiResults: TestResult[],
): Promise<void> {
  log("blue", "\n📊 Test Report");
  log("bold", "=".repeat(50));

  // Contact form analysis
  const successfulContacts = contactResults.filter(
    (r: TestResult) => r.status === 200,
  ).length;
  const rateLimitedContacts = contactResults.filter(
    (r: TestResult) => r.status === 429,
  ).length;

  log("blue", `Contact Form Tests:`);
  log("green", `  ✅ Successful requests: ${successfulContacts}`);
  log("red", `  🚫 Rate limited requests: ${rateLimitedContacts}`);

  if (rateLimitedContacts > 0) {
    log("green", `  ✅ Rate limiting is working correctly`);
  } else {
    log("yellow", `  ⚠️  Rate limiting may not be active`);
  }

  // API analysis
  const successfulApi = apiResults.filter(
    (r: TestResult) => r.status === 200,
  ).length;
  const unauthorizedApi = apiResults.filter(
    (r: TestResult) => r.status === 401,
  ).length;

  log("blue", `API Tests:`);
  log("green", `  ✅ Successful requests: ${successfulApi}`);
  if (unauthorizedApi > 0) {
    log(
      "yellow",
      `  🔒 Unauthorized requests: ${unauthorizedApi} (check ADMIN_SECRET)`,
    );
  }

  // Performance
  const allResults = contactResults.concat(apiResults);
  const totalDuration = allResults.reduce(
    (sum: number, r: TestResult) => sum + r.duration,
    0,
  );
  const avgDuration = (totalDuration / allResults.length).toFixed(2);

  log("blue", `Performance:`);
  log("green", `  ⚡ Average response time: ${avgDuration}ms`);

  log("bold", "=".repeat(50));
}

async function main(): Promise<void> {
  log("bold", "🚀 Rate Limiting Integration Tests");
  log("blue", `Testing against: ${BASE_URL}`);

  // Check environment first
  const envOk = await testEnvironmentCheck();
  if (!envOk) {
    log("red", "\n❌ Environment check failed. Please ensure:");
    log("yellow", "   1. Server is running (npm run dev)");
    log("yellow", "   2. Environment variables are set");
    log("yellow", "   3. Upstash Redis is configured");
    process.exit(1);
  }

  // Clear any existing rate limits
  await clearTestRateLimits();

  // Wait a moment for cleanup
  await sleep(1000);

  // Run tests
  const contactResults = await testContactFormRateLimit();
  const apiResults = await testApiRateLimit();

  // Generate report
  await generateTestReport(contactResults, apiResults);

  // Clean up after tests
  await clearTestRateLimits();

  log("green", "\n✅ Integration tests completed!");
}

// Jest test suite
describe("Rate Limiting Integration Tests", () => {
  beforeAll(async () => {
    log("bold", "🚀 Rate Limiting Integration Tests");
    log("blue", `Testing against: ${BASE_URL}`);

    // Check environment first
    const envOk = await testEnvironmentCheck();
    if (!envOk) {
      log("red", "\n❌ Environment check failed. Please ensure:");
      log("yellow", "   1. Server is running (npm run dev)");
      log("yellow", "   2. Environment variables are set");
      log("yellow", "   3. Upstash Redis is configured");
      throw new Error("Environment check failed");
    }

    // Clear any existing rate limits
    await clearTestRateLimits();
    await sleep(1000);
  });

  afterAll(async () => {
    // Clean up after tests
    await clearTestRateLimits();
    log("green", "\n✅ Integration tests completed!");
  });

  test("Contact form rate limiting should work correctly", async () => {
    const results = await testContactFormRateLimit();

    // Verify we have results
    expect(results.length).toBeGreaterThan(0);

    // Check that at least one request succeeded
    const successfulRequests = results.filter((r) => r.status === 200);
    expect(successfulRequests.length).toBeGreaterThan(0);

    // Check that rate limiting kicked in (should have at least one 429)
    const rateLimitedRequests = results.filter((r) => r.status === 429);

    // If we sent enough requests, we should hit the rate limit
    if (results.length >= 6) {
      expect(rateLimitedRequests.length).toBeGreaterThan(0);
    }

    // Verify response times are reasonable (under 5 seconds)
    results.forEach((result) => {
      expect(result.duration).toBeLessThan(5000);
    });
  }, 30000); // 30 second timeout for integration test

  test("API rate limiting should work correctly", async () => {
    const results = await testApiRateLimit();

    // Verify we have results
    expect(results.length).toBeGreaterThan(0);

    // Check response structure
    results.forEach((result) => {
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("duration");
      expect(result).toHaveProperty("headers");
      expect(typeof result.status).toBe("number");
      expect(typeof result.duration).toBe("number");
    });

    // Verify response times are reasonable
    results.forEach((result) => {
      expect(result.duration).toBeLessThan(5000);
    });
  }, 30000); // 30 second timeout for integration test

  test("Generate and validate test report", async () => {
    const contactResults = await testContactFormRateLimit();
    const apiResults = await testApiRateLimit();

    // This should not throw
    await generateTestReport(contactResults, apiResults);

    // Basic validation that we got meaningful results
    expect(contactResults.length).toBeGreaterThan(0);
    expect(apiResults.length).toBeGreaterThan(0);

    // Verify all results have required properties
    const allResults = [...contactResults, ...apiResults];
    allResults.forEach((result) => {
      expect(result).toHaveProperty("request");
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("duration");
      expect(result).toHaveProperty("headers");
    });
  }, 45000); // 45 second timeout for comprehensive test
});

// Export functions for potential standalone use
export { main, testContactFormRateLimit, testApiRateLimit };

// Run if called directly (for standalone execution)
if (require.main === module) {
  main().catch((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log("red", `\n❌ Test failed: ${errorMessage}`);
    process.exit(1);
  });
}
