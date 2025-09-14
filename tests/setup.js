// eslint-disable-next-line @typescript-eslint/no-require-imports
const { loadEnvConfig } = require("@next/env");

// Load environment variables for testing
loadEnvConfig(process.cwd());

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test timeout
jest.setTimeout(10000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
