/**
 * Tests para DownloadCounter
 * Aplica TDD: Primero el test, luego la implementación
 */

describe('DownloadCounter', () => {
  let counter;
  let mockStorage;

  // Setup: Ejecuta ANTES de cada test
  beforeEach(() => {
    // Mock de localStorage
    mockStorage = {
      data: {},
      getItem: jest.fn((key) => mockStorage.data[key] || null),
      setItem: jest.fn((key, value) => {
        mockStorage.data[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete mockStorage.data[key];
      }),
      clear: jest.fn(() => {
        mockStorage.data = {};
      }),
    };

    // Importar clase (todavía no existe, test fallará)
    const { DownloadCounter } = require('../../src/js/downloadCounter.js');
    counter = new DownloadCounter(mockStorage);
  });

  /**
   * Test 1: Inicialización
   * SOLID: Single Responsibility - el contador solo maneja el conteo
   */
  test('debe inicializar contador en 0 si no existe en storage', () => {
    expect(counter.getCount()).toBe(0);
  });

  /**
   * Test 2: Incremento
   */
  test('debe incrementar contador correctamente', () => {
    counter.increment();
    expect(counter.getCount()).toBe(1);
    
    counter.increment();
    expect(counter.getCount()).toBe(2);
  });

  /**
   * Test 3: Persistencia
   * Verifica que el contador se guarde en storage
   */
  test('debe persistir contador en storage al incrementar', () => {
    counter.increment();
    expect(mockStorage.setItem).toHaveBeenCalledWith('downloadCount', '1');
  });

  /**
   * Test 4: Carga desde storage
   * Verifica que cargue valor existente
   */
  test('debe cargar contador existente del storage', () => {
    mockStorage.data.downloadCount = '42';
    
    const { DownloadCounter } = require('../../src/js/downloadCounter.js');
    const newCounter = new DownloadCounter(mockStorage);
    
    expect(newCounter.getCount()).toBe(42);
  });

  /**
   * Test 5: Dependency Injection
   * SOLID: Dependency Inversion - depende de abstracción (storage), no de localStorage concreto
   */
  test('debe funcionar con cualquier storage que implemente la interfaz', () => {
    const customStorage = {
      getItem: jest.fn(() => '10'),
      setItem: jest.fn(),
    };
    
    const { DownloadCounter } = require('../../src/js/downloadCounter.js');
    const customCounter = new DownloadCounter(customStorage);
    
    expect(customCounter.getCount()).toBe(10);
  });

  /**
   * Test 6: Reset
   */
  test('debe poder resetear el contador', () => {
    counter.increment();
    counter.increment();
    counter.reset();
    
    expect(counter.getCount()).toBe(0);
    expect(mockStorage.setItem).toHaveBeenCalledWith('downloadCount', '0');
  });
});
