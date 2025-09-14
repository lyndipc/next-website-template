import {
  getClientIdentifier,
  createRateLimitResponse,
} from "../../src/lib/rate-limit";

jest.mock("@upstash/ratelimit");
jest.mock("@upstash/redis");

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<void>;
}

// Create a mock Request with only the headers we need
function createMockRequest(headerMap: Record<string, string | null>): Request {
  return {
    headers: {
      get: jest.fn((header: string) => headerMap[header] || null),
    },
  } as unknown as Request;
}

describe("Rate Limiting Utils", () => {
  describe("getClientIdentifier", () => {
    it("should extract IP from x-forwarded-for header", () => {
      const mockRequest = createMockRequest({
        "x-forwarded-for": "192.168.1.100, 10.0.0.1",
      });

      const ip = getClientIdentifier(mockRequest);
      expect(ip).toBe("192.168.1.100");
    });

    it("should extract IP from x-real-ip header when x-forwarded-for is not available", () => {
      const mockRequest = createMockRequest({
        "x-real-ip": "203.0.113.45",
      });

      const ip = getClientIdentifier(mockRequest);
      expect(ip).toBe("203.0.113.45");
    });

    it("should extract IP from cf-connecting-ip header as fallback", () => {
      const mockRequest = createMockRequest({
        "cf-connecting-ip": "198.51.100.25",
      });

      const ip = getClientIdentifier(mockRequest);
      expect(ip).toBe("198.51.100.25");
    });

    it("should fallback to localhost when no headers are present", () => {
      const mockRequest = createMockRequest({});

      const ip = getClientIdentifier(mockRequest);
      expect(ip).toBe("127.0.0.1");
    });
  });

  describe("createRateLimitResponse", () => {
    it("should return null when rate limit is not exceeded", () => {
      const result: RateLimitResult = {
        success: true,
        limit: 5,
        remaining: 3,
        reset: Date.now() + 60000,
        pending: Promise.resolve(),
      };

      const response = createRateLimitResponse(result);
      expect(response).toBeNull();
    });

    it("should return 429 response when rate limit is exceeded", () => {
      const resetTime = Date.now() + 45000;
      const result: RateLimitResult = {
        success: false,
        limit: 5,
        remaining: 0,
        reset: resetTime,
        pending: Promise.resolve(),
      };

      const response = createRateLimitResponse(result);
      expect(response).toBeInstanceOf(Response);
      expect(response?.status).toBe(429);

      // Check headers
      expect(response?.headers.get("X-RateLimit-Limit")).toBe("5");
      expect(response?.headers.get("X-RateLimit-Remaining")).toBe("0");
      expect(response?.headers.get("X-RateLimit-Reset")).toBe(
        resetTime.toString(),
      );
      expect(response?.headers.get("Retry-After")).toBe(
        Math.round(resetTime / 1000).toString(),
      );
    });

    it("should include proper error message in response body", async () => {
      const result: RateLimitResult = {
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 45000,
        pending: Promise.resolve(),
      };

      const response = createRateLimitResponse(result);
      const body = await response?.json();
      expect(body).toEqual({
        error: "Too many requests",
        message: "You have exceeded the rate limit. Please try again later.",
        retryAfter: expect.any(Number),
      });
    });
  });
});
