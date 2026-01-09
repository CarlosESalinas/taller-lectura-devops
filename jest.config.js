module.exports = {
  // Entorno de testing (simula navegador)
  testEnvironment: 'jsdom',
  
  // Dónde buscar los tests
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  
  // Qué archivos ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],
  
  // Configuración de cobertura
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ],
  
  // Umbrales de cobertura (opcionales pero recomendados)
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 65,
      lines: 75,
      statements: 75
    }
  },
  
  // Setup files (se ejecutan antes de cada test)
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Module paths
  moduleDirectories: ['node_modules', 'src'],
  
  // Verbose output
  verbose: true
};
