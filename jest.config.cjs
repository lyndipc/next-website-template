// Minimal Jest configuration - use this if the main config has issues
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testTimeout: 10000,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  // Ignore node_modules except for ES modules that need transformation
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$))"],
  // Handle ES modules
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: false,
      tsconfig: {
        target: "es2020",
        module: "commonjs",
      },
    },
  },
};
