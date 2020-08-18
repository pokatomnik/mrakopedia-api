export class Router {
  dispose: () => void;
  getRoute: () => string;
  push: (newHash: string) => void;
  subscribe: (subscriber: (hash: string) => void) => () => void;
}
