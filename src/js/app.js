/* eslint-disable no-console */
/**
 * app.js
 * Punto de entrada principal de la aplicación
 * Integra todos los componentes: Carousel, DownloadCounter, FileDownloader
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicializando aplicación del Taller de Lectura...');

  // ==========================================
  // 1. INICIALIZAR CARRUSEL
  // ==========================================
  const carouselContainer = document.getElementById('carouselTrack');

  let carousel = null;

  if (carouselContainer) {
    carousel = new Carousel(carouselContainer, {
      autoPlayInterval: 1500, // 1.5 segundos
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

    console.log('Carrusel inicializado');
  } else {
    console.warn('No se encontró el carrusel en el DOM');
  }

  // ==========================================
  // 2. INICIALIZAR CONTADOR DE DESCARGAS
  // ==========================================
  const counter = new DownloadCounter(localStorage);
  const counterElement = document.getElementById('downloadCounter');

  // Crear elemento visual del contador si no existe
  if (counterElement) {
    counterElement.innerHTML = `
      <div class="counter-display">
        <span class="counter-label">Descargas totales:</span>
        <span id="counterValue" class="counter-value">${counter.getCount()}</span>
      </div>
    `;
    // console.log('Contador inicializado:', counter.getCount());
  }

  // ==========================================
  // 3. INICIALIZAR DESCARGADOR DE ARCHIVOS
  // ==========================================
  const downloader = new FileDownloader();

  // URL del libro en AWS S3
  const BOOK_URL = 'http://taller-lectura-prod.s3-website-us-east-1.amazonaws.com/assets/libro-taller-lectura-UNAM-v2.0.pdf';

  console.log('FileDownloader inicializado');

  // ==========================================
  // 4. CONECTAR BOTÓN DE DESCARGA
  // ==========================================
  const downloadButton = document.getElementById('downloadButton');

  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      console.log('Iniciando descarga del libro...');

      // Incrementar contador
      counter.increment();

      // Actualizar UI del contador
      const counterValueElement = document.getElementById('counterValue');
      if (counterValueElement) {
        counterValueElement.textContent = counter.getCount();

        // Animación de pulso
        counterValueElement.classList.add('pulse');
        setTimeout(() => {
          counterValueElement.classList.remove('pulse');
        }, 600);
      }

      // Iniciar descarga desde S3
      downloader.download(BOOK_URL, () => {
        console.log('Descarga iniciada desde AWS S3');
      });

      // Feedback visual en el botón
      const originalText = downloadButton.textContent;
      downloadButton.textContent = '¡Descargando...!';
      downloadButton.disabled = true;

      setTimeout(() => {
        downloadButton.textContent = originalText;
        downloadButton.disabled = false;
      }, 2000);
    });

    console.log('Botón de descarga configurado');
  } else {
    console.warn('No se encontró el botón de descarga');
  }
});
