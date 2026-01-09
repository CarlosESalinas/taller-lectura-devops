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
    
    // Adaptación: buscar .carousel-slide en lugar de .carousel-image
    this.images = Array.from(container.querySelectorAll('.carousel-slide') || []);
    
    // Si no hay slides, intentar buscar .carousel-image (retrocompatibilidad)
    if (this.images.length === 0) {
      this.images = Array.from(container.querySelectorAll('.carousel-image') || []);
    }
    
    this.currentIndex = 0;
    this.autoPlayInterval = options.autoPlayInterval || 3000;
    this.autoPlayTimer = null;
    this.isScrolling = false;

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

    // Adaptación: buscar tanto .carousel-dot como .indicator
    const dots = this.container.querySelectorAll('.carousel-dot, .indicator');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Detectar scroll manual (si el container tiene overflow)
    if (this.container.scrollWidth > this.container.clientWidth) {
      this.container.addEventListener('scroll', () => {
        if (!this.isScrolling) {
          this.handleManualScroll();
        }
      });
    }
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
   * Manejar scroll manual del usuario
   * @private
   */
  handleManualScroll() {
    // Calcular qué imagen está más centrada
    const containerCenter = this.container.scrollLeft + this.container.offsetWidth / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;

    this.images.forEach((img, index) => {
      const imgCenter = img.offsetLeft + img.offsetWidth / 2;
      const distance = Math.abs(containerCenter - imgCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== this.currentIndex) {
      this.currentIndex = closestIndex;
      this.updateDisplay();
      this.resetAutoPlay();
    }
  }

  /**
   * Actualizar visualización del carrusel
   */
  updateDisplay() {
    // Actualizar clases de las imágenes
    this.images.forEach((img, index) => {
      if (index === this.currentIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    // Scroll suave a la imagen actual (si hay scroll)
    if (this.container.scrollWidth > this.container.clientWidth) {
      this.scrollToCurrentImage();
    }

    // Actualizar dots (buscar tanto .carousel-dot como .indicator)
    const dots = this.container.querySelectorAll('.carousel-dot, .indicator');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /**
   * Scroll suave a la imagen actual
   * @private
   */
  scrollToCurrentImage() {
    const currentImage = this.images[this.currentIndex];
    if (!currentImage) return;

    this.isScrolling = true;

    const scrollPosition = currentImage.offsetLeft - 
      (this.container.offsetWidth - currentImage.offsetWidth) / 2;

    this.container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.isScrolling = false;
    }, 600);
  }

  /**
   * Iniciar auto-play
   */
  startAutoPlay() {
    this.stopAutoPlay();
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
   * Resetear auto-play (reiniciar timer)
   */
  resetAutoPlay() {
    this.startAutoPlay();
  }

  /**
   * Pausar auto-play
   */
  pauseAutoPlay() {
    this.stopAutoPlay();
  }

  /**
   * Destruir carrusel (cleanup)
   */
  destroy() {
    this.stopAutoPlay();
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