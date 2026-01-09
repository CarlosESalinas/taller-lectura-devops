// ==========================================
  // 1. INICIALIZAR CARRUSEL
  // ==========================================
  const carouselContainer = document.getElementById('carouselTrack');
  
  let carousel = null;
  
  if (carouselContainer) {
    carousel = new Carousel(carouselContainer, {
      autoPlayInterval: 5000 // 5 segundos
    });

    carousel.startAutoPlay();

    // Pausar auto-play cuando el usuario hace hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => {
        carousel.pauseAutoPlay();
      });
      
      carouselWrapper.addEventListener('mouseleave', () => {
        carousel.startAutoPlay();
      });
    }

    console.log('✅ Carrusel inicializado');
  } else {
    console.warn('⚠️ No se encontró el carrusel en el DOM');
  }
