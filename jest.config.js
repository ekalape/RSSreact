export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/react/dont-cleanup-after-each'],
  moduleNameMapper: {
    // Add any custom module name mappings here
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    // Add any global variables you need here
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  collectCoverageFrom: ['src/**/*.ts*'],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
};
