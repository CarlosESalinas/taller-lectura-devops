// Setup global para todos los tests
// Este archivo se ejecuta UNA VEZ antes de todos los tests

require('@testing-library/jest-dom');

// Mock de localStorage (por si algunos navegadores no lo soportan en tests)
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

// Configuración global de timeout para tests
jest.setTimeout(10000); // 10 segundos

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});
