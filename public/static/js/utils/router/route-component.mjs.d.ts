import { Element } from '../../preact/preact.mjs';
import { routes } from '../../routes.mjs';

interface IContextValue {
  params: Record<string, string>;
  query: Record<string, string | boolean>;
  push: (route: string) => void;
}

export function useRouteData(): IContextValue;

interface IRouterComponentProps {
  routes: typeof routes;
  fallback: () => Element;
}

export function RouterComponent(props: IRouterComponentProps): Element;
