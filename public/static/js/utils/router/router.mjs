export class Router {
  constructor() {
    this._subscribers = [];

    this._hashChangeHandler = () => {
      this._subscribers.forEach((subscriber) => {
        subscriber(this.getRoute());
      });
    };

    window.addEventListener('hashchange', this._hashChangeHandler);
  }

  dispose() {
    window.removeEventListener('hashchange', this._hashChangeHandler);
  }

  get _hash() {
    return window.location.hash.slice(1);
  }

  getRoute() {
    return this._hash;
  }

  push(newHash) {
    window.location.hash = newHash;
  }

  subscribe(subscriber) {
    if (typeof subscriber !== 'function') {
      throw new Error('The provided subscriber is not a function');
    }

    this._subscribers = [...this._subscribers, subscriber];

    subscriber(this.getRoute());

    return () => {
      this._subscribers = this._subscribers.filter(
        (currentSubscriber) => currentSubscriber !== subscriber
      );
    };
  }
}
