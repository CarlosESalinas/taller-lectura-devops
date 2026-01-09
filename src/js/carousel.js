/**
 * Carousel
 * 
 * Maneja la rotación de imágenes (dibujos de los niños)
 * 
 * SOLID Principles:
 * - S: Solo maneja lógica del carrusel
 * - O: Extensible para diferentes tipos de contenido
 * - L: Cualquier contenedor que tenga imágenes funciona
 * - I: Interfaz simple (next, prev, goToSlide)
 * - D: Depende de abstracción (container), no de DOM específico
 */

class Carousel {
  /**
   * @param {HTMLElement} container - Contenedor del carrusel
   * @param {Object} options - Opciones de configuración
   */
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('Container es requerido');
    }

    this.container = container;
    this.images = Array.from(container.querySelectorAll('.carousel-image') || []);
    this.currentIndex = 0;
    this.autoPlayInterval = options.autoPlayInterval || 3000;
    this.autoPlayTimer = null;

    if (this.images.length === 0) {
      console.warn('No se encontraron imágenes en el carrusel');
    }

    this.init();
  }

  /**
   * Inicializar carrusel
   * @private
   */
  init() {
    if (this.images.length > 0) {
      this.updateDisplay();
      this.setupEventListeners();
    }
  }

  /**
   * Configurar event listeners
   * @private
   */
  setupEventListeners() {
    const prevBtn = this.container.querySelector('.carousel-prev');
    const nextBtn = this.container.querySelector('.carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    // Dots de navegación (si existen)
    const dots = this.container.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  }

  /**
   * Ir a la siguiente imagen 
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateDisplay();
  }

  /**
   * Ir a la imagen anterior
   */
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateDisplay();
  }

  /**
   * Ir a una imagen específica
   * @param {number} index - Índice de la imagen
   */
  goToSlide(index) {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.updateDisplay();
    }
  }

  /**
   * Actualizar visualización del carrusel
   */
  updateDisplay() {
    this.images.forEach((img, index) => {
      if (index === this.currentIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    // Actualizar dots si existen
    const dots = this.container.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /**
   * Iniciar auto-play
   */
  startAutoPlay() {
    this.stopAutoPlay(); // Limpiar timer anterior si existe
    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  /**
   * Detener auto-play
   */
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  /**
   * Destruir carrusel (cleanup)
   */
  destroy() {
    this.stopAutoPlay();
    // Remover event listeners si es necesario
  }
}

// Export para navegador
if (typeof window !== 'undefined') {
  window.Carousel = Carousel;
}

// Export para Jest (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Carousel };
}
