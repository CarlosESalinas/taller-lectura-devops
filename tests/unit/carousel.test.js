/**
 * Tests para Carousel
 * Maneja la rotación automática y manual de imágenes
 */

describe('Carousel', () => {
  let carousel;
  let mockContainer;
  let mockImages;

  beforeEach(() => {
    // Mock de elementos DOM
    const createMockElement = () => ({
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
      addEventListener: jest.fn(),
    });

    // Mock de imágenes
    mockImages = [
      createMockElement(),
      createMockElement(),
      createMockElement(),
    ];

    // Mock de botones y dots
    const mockPrevBtn = createMockElement();
    const mockNextBtn = createMockElement();
    const mockDots = []; // Array vacío porque no hay dots en el test

    // Mock del container
    mockContainer = {
      querySelectorAll: jest.fn((selector) => {
        if (selector === '.carousel-image') {
          return mockImages;
        }
        if (selector === '.carousel-dot') {
          return mockDots;
        }
        return [];
      }),
      querySelector: jest.fn((selector) => {
        if (selector === '.carousel-prev') {
          return mockPrevBtn;
        }
        if (selector === '.carousel-next') {
          return mockNextBtn;
        }
        return null;
      }),
      addEventListener: jest.fn(),
    };

    const { Carousel } = require('../../src/js/carousel.js');
    carousel = new Carousel(mockContainer);
  });

  afterEach(() => {
    // Limpiar timers
    jest.clearAllTimers();
  });

  /**
   * Test 1: Inicialización
   * SOLID: Single Responsibility - solo maneja el carrusel
   */
  test('debe inicializar en la primera imagen', () => {
    expect(carousel.currentIndex).toBe(0);
    expect(carousel.images).toHaveLength(3);
  });

  /**
   * Test 2: Navegación hacia adelante
   */
  test('debe avanzar a la siguiente imagen', () => {
    carousel.next();
    expect(carousel.currentIndex).toBe(1);

    carousel.next();
    expect(carousel.currentIndex).toBe(2);
  });

  /**
   * Test 3: Navegación circular (al final vuelve al inicio)
   */
  test('debe volver al inicio después de la última imagen', () => {
    carousel.currentIndex = 2;
    carousel.next();
    expect(carousel.currentIndex).toBe(0);
  });

  /**
   * Test 4: Navegación hacia atrás
   */
  test('debe retroceder a la imagen anterior', () => {
    carousel.currentIndex = 2;
    carousel.prev();
    expect(carousel.currentIndex).toBe(1);
  });

  /**
   * Test 5: Navegación circular reversa
   */
  test('debe ir a la última imagen cuando retrocede desde la primera', () => {
    carousel.currentIndex = 0;
    carousel.prev();
    expect(carousel.currentIndex).toBe(2);
  });

  /**
   * Test 6: Actualizar visualización
   */
  test('debe actualizar las clases CSS al cambiar de imagen', () => {
    carousel.currentIndex = 1;
    carousel.updateDisplay();

    // La imagen 1 debe tener clase 'active'
    expect(mockImages[1].classList.add).toHaveBeenCalledWith('active');

    // Las demás deben quitar la clase 'active'
    expect(mockImages[0].classList.remove).toHaveBeenCalledWith('active');
    expect(mockImages[2].classList.remove).toHaveBeenCalledWith('active');
  });

  /**
   * Test 7: Ir a imagen específica
   */
  test('debe poder ir a un índice específico', () => {
    carousel.goToSlide(2);
    expect(carousel.currentIndex).toBe(2);
  });

  /**
   * Test 8: Validación de índice
   */
  test('debe validar índices fuera de rango', () => {
    carousel.goToSlide(10);
    expect(carousel.currentIndex).toBe(0); // Se mantiene en posición segura

    carousel.goToSlide(-5);
    expect(carousel.currentIndex).toBe(0);
  });
});
