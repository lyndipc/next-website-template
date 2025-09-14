# Rate Limiting Test Suite

This directory contains comprehensive tests for the rate limiting functionality in the Next.js Website Template.

## Test Structure

```
tests/
├── setup.js                           # Global test configuration
├── rate-limiting/
│   ├── rate-limit.test.ts             # Unit tests for utility functions
│   ├── api-endpoints.test.ts          # API endpoint tests
│   └── integration.test.js            # Full integration tests
└── README.md                          # This file
```

## Running Tests

### Prerequisites

1. **Install dependencies**:

   ```zsh
   npm install
   ```

2. **Set up environment variables**:
   ```zsh
   cp .env.test .env.local
   # Edit .env.local with your test credentials
   ```

### Test Commands

```zsh
# Run all rate limiting tests
npm run test:rate-limit

# Run specific test types
npm run test:rate-limit:unit         # Unit tests only
npm run test:rate-limit:api          # API endpoint tests
npm run test:rate-limit:integration  # Full integration tests

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## Test Types

### Unit Tests (`rate-limit.test.ts`)

Tests individual utility functions:

- ✅ IP address extraction from headers
- ✅ IP whitelisting logic
- ✅ Rate limit response creation
- ✅ Error handling

**Example output**:

```
✓ should extract IP from x-forwarded-for header
✓ should whitelist localhost IPv4
✓ should return 429 response when rate limit exceeded
```

### API Tests (`api-endpoints.test.ts`)

Tests API endpoints with mocked dependencies:

- ✅ Contact form validation
- ✅ Rate limit integration in API routes
- ✅ Error response formatting

### Integration Tests (`integration.test.js`)

Tests the complete system with real requests:

- ✅ Contact form rate limiting (5 requests/minute)
- ✅ API endpoint rate limiting (100 requests/minute)
- ✅ Rate limit header verification
- ✅ Error response validation
- ✅ Performance measurement

**Example output**:

```
🧪 Testing Contact Form Rate Limiting
   Expected: 5 requests allowed, 6th should be blocked

✅ Request 1: Success (45ms)
✅ Request 2: Success (38ms)
✅ Request 3: Success (42ms)
✅ Request 4: Success (39ms)
✅ Request 5: Success (41ms)
🚫 Request 6: Rate limited (35ms)
   Retry after: 45s

📊 Test Report
==================================================
Contact Form Tests:
  ✅ Successful requests: 5
  🚫 Rate limited requests: 1
  ✅ Rate limiting is working correctly
```

## Test Configuration

### Environment Variables

Create `.env.test` with:

```zsh
NODE_ENV=test
UPSTASH_REDIS_REST_URL=your_test_redis_url
UPSTASH_REDIS_REST_TOKEN=your_test_redis_token
ADMIN_SECRET=test-admin-secret
TEST_BASE_URL=http://localhost:3000
```

### Jest Configuration

Tests use custom Jest config (`jest.config.js`) with:

- Next.js integration
- TypeScript support
- Path mapping (@/ aliases)
- Custom test environment
- Extended timeout for integration tests

## Debugging Tests

### Common Issues

1. **Rate limiting not working**:

   ```zsh
   # Check if running in development mode
   echo $NODE_ENV

   # Verify Upstash credentials
   npm run test:rate-limit:integration
   ```

2. **Integration tests failing**:

   ```zsh
   # Ensure server is running
   npm run dev

   # Check server connectivity
   curl http://localhost:3000
   ```

3. **Mock issues in unit tests**:

   ```zsh
   # Clear Jest cache
   npx jest --clearCache

   # Run with verbose output
   npm run test:rate-limit -- --verbose
   ```

### Debugging Commands

```zsh
# Run single test file
npx jest tests/rate-limiting/rate-limit.test.ts

# Run with debug output
npx jest --verbose --no-cache

# Run integration test with debug mode
DEBUG=true npm run test:rate-limit:integration
```

## Continuous Integration

### GitHub Actions

The workflow (`.github/workflows/test-rate-limiting.yml`) runs:

1. Unit tests with mocked dependencies
2. Build verification
3. Integration tests with real server
4. Coverage reporting

### Local CI Testing

```zsh
# Simulate CI environment
NODE_ENV=production npm run build
NODE_ENV=production npm run start &
npm run test:rate-limit:integration
```

## Writing New Tests

### Adding Unit Tests

```typescript
// tests/rate-limiting/new-feature.test.ts
import { newFunction } from "@/lib/rate-limit";

describe("New Feature", () => {
  it("should handle edge case", () => {
    expect(newFunction("input")).toBe("expected");
  });
});
```

### Adding Integration Tests

```javascript
// In integration.test.js
async function testNewFeature() {
  log("blue", "\n🧪 Testing New Feature");

  const result = await makeRequest("/api/new-endpoint");

  if (result.status === 200) {
    log("green", "✅ New feature works");
  } else {
    log("red", "❌ New feature failed");
  }

  return result;
}
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Clear rate limits after tests
3. **Mocking**: Mock external services in unit tests
4. **Real Testing**: Use integration tests for end-to-end verification
5. **Performance**: Measure and assert on response times
6. **Error Handling**: Test both success and failure scenarios

## Troubleshooting

### Rate Limits Persist Between Tests

```zsh
# Clear all rate limits
curl -X POST http://localhost:3000/api/admin/clear-rate-limits \
  -H "Authorization: Bearer test-admin-secret" \
  -H "Content-Type: application/json" \
  -d '{"ip": "127.0.0.1", "type": "all"}'
```

### Tests Running Too Slowly

```zsh
# Run tests in parallel
npm run test:rate-limit -- --maxWorkers=4

# Run only changed files
npm run test:rate-limit -- --onlyChanged
```

### Mock Issues

```zsh
# Reset all mocks
jest.clearAllMocks()

# Manual mock reset
jest.resetModules()
```

This test suite provides comprehensive coverage of your rate limiting system and integrates seamlessly with your development workflow!
