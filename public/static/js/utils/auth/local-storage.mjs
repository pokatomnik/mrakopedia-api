export class Storage {
  constructor(key) {
    this._key = key;
  }

  set(value) {
    localStorage.setItem(this._key, value);
  }

  get() {
    return localStorage.getItem(this._key);
  }

  remove() {
    localStorage.removeItem(this._key);
  }

  has() {
    return this.get() !== null;
  }
}
