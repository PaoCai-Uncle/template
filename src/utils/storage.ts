class WebStorage {
  private storage;
  constructor(type = 'localStorage') {
    this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
  }

  getItem = (key: string) => {
    if (!key) {
      this.nokey();
      return;
    }
    return this.storage.getItem(key) || '';
  };

  setItem = (key: string, value: object | string) => {
    if (!key) {
      this.nokey();
      return;
    }
    this.storage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
  };

  removeItem = (key: string) => {
    if (!key) {
      this.nokey();
      return;
    }
    this.storage.removeItem(key);
  };

  clear(key: string) {
    if (!key) {
      this.nokey();
      return;
    }
    this.storage.clear();
  }

  nokey() {
    console.warn('no key');
  }
}

export const lStorage = new WebStorage();
export const sStorage = new WebStorage('sessionStorage');