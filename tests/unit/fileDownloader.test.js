/**
 * Tests para FileDownloader
 */
const { FileDownloader } = require('../../src/js/fileDownloader');

describe('FileDownloader', () => {
  let downloader;
  let mockWindow;

  beforeEach(() => {
    mockWindow = {
      open: jest.fn(),
    };
    downloader = new FileDownloader({ window: mockWindow });
  });

  describe('download', () => {
    test('debe abrir URL en nueva pestaña', () => {
      const url = 'http://example.com/file.pdf';

      downloader.download(url);

      expect(mockWindow.open).toHaveBeenCalledWith(url, '_blank');
    });

    test('debe ejecutar callback después de abrir URL', () => {
      const url = 'http://example.com/file.pdf';
      const callback = jest.fn();

      downloader.download(url, callback);

      expect(callback).toHaveBeenCalled();
    });

    test('debe lanzar error con URL inválida', () => {
      expect(() => {
        downloader.download(null);
      }).toThrow('URL inválida');

      expect(() => {
        downloader.download('');
      }).toThrow('URL inválida');
    });

    test('debe funcionar con URLs de S3', () => {
      const s3Url =
        'http://taller-lectura-prod.s3-website-us-east-1.amazonaws.com/assets/libro.pdf';

      downloader.download(s3Url);

      expect(mockWindow.open).toHaveBeenCalledWith(s3Url, '_blank');
    });
  });

  describe('constructor', () => {
    test('debe usar window del browser si no se provee', () => {
      // Simular ambiente de navegador
      global.window = { open: jest.fn() };

      const browserDownloader = new FileDownloader();

      expect(browserDownloader.window).toBe(global.window);

      // Limpiar
      delete global.window;
    });
  });
});
