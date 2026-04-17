module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/tests/**'],
  coverageDirectory: 'coverage',
  testTimeout: 30000, // Increase timeout to 30 seconds
  testTimeout: 30000, // Increase timeout to 30 seconds
};