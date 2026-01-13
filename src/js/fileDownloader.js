/**
 * FileDownloader
 *
 * Maneja descargas de archivos desde URLs directas (S3, etc.)
 *
 * SOLID Principles:
 * - S: Solo maneja lógica de descarga
 * - D: Inyección de dependencias (window para testing)
 */
class FileDownloader {
  /**
   * @param {Object} options - Opciones de configuración
   */
  constructor(options = {}) {
    this.window =
      options.window || (typeof window !== 'undefined' ? window : null);
  }

  /**
   * Iniciar descarga del archivo
   * @param {string} url - URL directa del archivo
   * @param {Function} callback - Callback a ejecutar después de iniciar descarga
   */
  download(url, callback) {
    if (!url || typeof url !== 'string') {
      throw new Error('URL inválida');
    }

    // Abrir en nueva pestaña
    if (this.window) {
      this.window.open(url, '_blank');
    }

    // Ejecutar callback si existe
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
}

// Export para navegador
if (typeof window !== 'undefined') {
  window.FileDownloader = FileDownloader;
}

// Export para Jest (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FileDownloader };
}
