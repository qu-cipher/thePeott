export class EngineTextures {
  constructor() {
    this.textures = new Map();
    this.loadingPromises = new Map();
    this.loadingErrors = new Set();
  }

  async loadTexture(key, url) {
    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key);
    }

    const loadPromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      
      image.onload = () => {
        this.textures.set(key, image);
        this.loadingPromises.delete(key);
        resolve(image);
      };

      image.onerror = () => {
        this.loadingErrors.add(key);
        this.loadingPromises.delete(key);
        reject(new Error(`Failed to load texture: ${url}`));
      };

      image.src = url;
    });

    this.loadingPromises.set(key, loadPromise);
    return loadPromise;
  }

  getTexture(key) {
    return this.textures.get(key);
  }

  hasTexture(key) {
    return this.textures.has(key);
  }

  hasError(key) {
    return this.loadingErrors.has(key);
  }

  clear() {
    this.textures.clear();
    this.loadingPromises.clear();
    this.loadingErrors.clear();
  }
}