/**
 * Tests para GoogleDriveDownloader
 * Maneja descargas desde Google Drive
 */

describe('GoogleDriveDownloader', () => {
  let downloader;
  let mockWindow;

  beforeEach(() => {
    // Mock de window.open
    mockWindow = {
      open: jest.fn(),
    };

    const {
      GoogleDriveDownloader,
    } = require('../../src/js/googleDriveDownloader.js');
    downloader = new GoogleDriveDownloader({ window: mockWindow });
  });

  /**
   * Test 1: Convertir URL de viewer a descarga directa
   */
  test('debe convertir URL de viewer a descarga directa', () => {
    const viewerUrl = 'https://drive.google.com/file/d/ABC123/view?usp=sharing';
    const downloadUrl = downloader.getDirectDownloadUrl(viewerUrl);

    expect(downloadUrl).toBe(
      'https://drive.google.com/uc?export=download&id=ABC123'
    );
  });

  /**
   * Test 2: Extraer file ID de diferentes formatos
   */
  test('debe extraer file ID de diferentes formatos de URL', () => {
    const urls = [
      'https://drive.google.com/file/d/ABC123/view',
      'https://drive.google.com/file/d/ABC123/view?usp=sharing',
      'https://drive.google.com/open?id=ABC123',
    ];

    urls.forEach((url) => {
      const fileId = downloader.extractFileId(url);
      expect(fileId).toBe('ABC123');
    });
  });

  /**
   * Test 3: Iniciar descarga
   */
  test('debe iniciar descarga abriendo nueva ventana', () => {
    const fileId = 'ABC123';
    downloader.download(fileId);

    expect(mockWindow.open).toHaveBeenCalledWith(
      'https://drive.google.com/uc?export=download&id=ABC123',
      '_blank'
    );
  });

  /**
   * Test 4: Manejar URLs inválidas
   */
  test('debe manejar URLs inválidas sin lanzar error', () => {
    const invalidUrl = 'https://example.com/not-a-drive-url';
    const fileId = downloader.extractFileId(invalidUrl);

    expect(fileId).toBeNull();
  });

  /**
   * Test 5: Callback después de iniciar descarga
   */
  test('debe ejecutar callback después de iniciar descarga', () => {
    const callback = jest.fn();
    const fileId = 'ABC123';

    downloader.download(fileId, callback);

    expect(callback).toHaveBeenCalled();
    expect(mockWindow.open).toHaveBeenCalled();
  });
});
