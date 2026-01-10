module.exports = {
  testEnvironment: 'jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  collectCoverageFrom: [
    'src/js/**/*.js',
    '!src/js/app.js',
    '!**/node_modules/**',
  ],
  
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 65,
      lines: 75,
      statements: 75
    }
  },
  
  moduleDirectories: ['node_modules'],
  
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};