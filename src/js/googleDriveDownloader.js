/**
 * GoogleDriveDownloader
 *
 * Maneja descargas de archivos desde Google Drive
 *
 * SOLID Principles:
 * - S: Solo maneja lógica de descarga de Google Drive
 * - D: Inyección de dependencias (window para testing)
 */

class GoogleDriveDownloader {
  /**
   * @param {Object} options - Opciones de configuración
   */
  constructor(options = {}) {
    this.window =
      options.window || (typeof window !== 'undefined' ? window : null);
  }

  /**
   * Extraer file ID de URL de Google Drive
   * @param {string} url - URL de Google Drive
   * @returns {string|null} - File ID o null si no se encuentra
   */
  extractFileId(url) {
    if (!url || typeof url !== 'string') {
      return null;
    }

    // Pattern 1: /file/d/{FILE_ID}/view
    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return match[1];
    }

    // Pattern 2: ?id={FILE_ID}
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) {
      return match[1];
    }

    return null;
  }

  /**
   * Convertir URL de viewer a URL de descarga directa
   * @param {string} viewerUrl - URL del viewer de Google Drive
   * @returns {string} - URL de descarga directa
   */
  getDirectDownloadUrl(viewerUrl) {
    const fileId = this.extractFileId(viewerUrl);

    if (!fileId) {
      throw new Error('No se pudo extraer el file ID de la URL');
    }

    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  /**
   * Iniciar descarga del archivo
   * @param {string} fileIdOrUrl - File ID o URL completa
   * @param {Function} callback - Callback a ejecutar después de iniciar descarga
   */
  download(fileIdOrUrl, callback) {
    let downloadUrl;

    // Si parece una URL, extraer el ID
    if (fileIdOrUrl.includes('http')) {
      downloadUrl = this.getDirectDownloadUrl(fileIdOrUrl);
    } else {
      // Asumir que es un file ID directo
      downloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdOrUrl}`;
    }

    // Abrir en nueva pestaña
    if (this.window) {
      this.window.open(downloadUrl, '_blank');
    }

    // Ejecutar callback si existe
    if (callback && typeof callback === 'function') {
      callback();
    }
  }
}

// Export para navegador
if (typeof window !== 'undefined') {
  window.GoogleDriveDownloader = GoogleDriveDownloader;
}

// Export para Jest (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GoogleDriveDownloader };
}
