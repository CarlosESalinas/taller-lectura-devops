module.exports = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  collectCoverageFrom: [
    'src/js/**/*.js',
    '!src/js/app.js', // Código de integración del navegador
    '!**/node_modules/**',
  ],

  coverageThreshold: {
    global: {
      branches: 55,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },

  moduleDirectories: ['node_modules'],

  testMatch: ['**/tests/**/*.test.js'],
};