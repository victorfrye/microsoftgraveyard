import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@test-utils$': '<rootDir>/test-utils',
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.test.{ts,tsx}',
    '!app/**/index.ts',
    '!app/**/*.d.ts',
    '!app/**/page.tsx',
    '!app/**/layout.tsx',
    '!app/robots.tsx',
    '!app/sitemap.tsx',
    '!app/globals.css',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default createJestConfig(config);
