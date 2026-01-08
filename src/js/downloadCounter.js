class DownloadCounter {
  /**
   * @param {Object} storage - Objeto con interfaz de storage (getItem, setItem)
   * 
   * Dependency Injection: Inyectamos el storage en lugar de usar localStorage directamente
   * Ventaja: Podemos mockear en tests, cambiar a sessionStorage, IndexedDB, etc.
   */
  constructor(storage) {
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
      throw new Error('Storage debe implementar getItem y setItem');
    }

    this.storage = storage;
    this.storageKey = 'downloadCount';
    
    // Cargar contador existente o inicializar en 0
    this.count = this._loadCount();
  }

  /**
   * Método privado para cargar contador del storage
   * @private
   * @returns {number}
   */
  _loadCount() {
    const stored = this.storage.getItem(this.storageKey);
    return stored ? parseInt(stored, 10) : 0;
  }

  /**
   * Obtener valor actual del contador
   * @returns {number}
   */
  getCount() {
    return this.count;
  }

  /**
   * Incrementar contador en 1
   */
  increment() {
    this.count += 1;
    this._persist();
  }

  /**
   * Resetear contador a 0
   */
  reset() {
    this.count = 0;
    this._persist();
  }

  /**
   * Persistir contador en storage
   * @private
   */
  _persist() {
    this.storage.setItem(this.storageKey, this.count.toString());
  }
}

// CommonJS export para Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DownloadCounter };
}