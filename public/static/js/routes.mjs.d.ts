import { Element } from './preact/preact.mjs';

interface IRouteObject<T> {
  url: string;
  Component: () => Element;
  link: (params: T) => string;
}

export const RouteIndex: IRouteObject<void>;
export const RoutePage: IRouteObject<string>;
export const RouteSearch: IRouteObject<string>;
export const RouteCategories: IRouteObject<void>;
export const RoutePagesByCategory: IRouteObject<string>;
export const routes = [
  RouteIndex,
  RoutePage,
  RouteSearch,
  RouteCategories,
  RoutePagesByCategory,
] as const;