const defaultConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@api/(.*)$': '<rootDir>/src/@api/$1',
    '^@cron/(.*)$': '<rootDir>/src/@cron/$1'
  }
}

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testTimeout: 50000,
  projects: [
    {
      displayName: 'OnlyYes',
      testMatch: ['<rootDir>/src/only-yes/**/*.test.ts'],
      ...defaultConfig
    }
  ]
}
