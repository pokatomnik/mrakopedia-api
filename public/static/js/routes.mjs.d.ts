import { Element } from './preact/preact.mjs';

interface IRouteObject<T> {
  url: string;
  Component: () => Element;
  link: (params: T) => string;
}
// Fallback page (404)
export const RouteFallback: IRouteObject<void>;

// Route pages
export const RouteIndex: IRouteObject<void>;
export const RoutePage: IRouteObject<string>;
export const RouteSearch: IRouteObject<string>;
export const RouteCategories: IRouteObject<void>;
export const RoutePagesByCategory: IRouteObject<string>;
export const RouteStoriesOfMonth: IRouteObject<void>;
export const RouteLike: IRouteObject<string>;
export const RouteCategoriesByPage: IRouteObject<string>;
export const routes = [
  RouteIndex,
  RoutePage,
  RouteSearch,
  RouteCategories,
  RoutePagesByCategory,
  RouteStoriesOfMonth,
  RouteLike,
  RouteCategoriesByPage,
] as const;
