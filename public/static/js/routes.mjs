import { Index } from './pages/index.mjs';
import { Page } from './pages/page.mjs';
import { Search } from './pages/search.mjs';
import { Categories } from './pages/categories.mjs';
import { PagesByCategory } from './pages/pages-by-category.mjs';
import { StoriesOfMonth } from './pages/stories-of-month.mjs';
import { Like } from './pages/like.mjs';
import { CategoriesByPage } from './pages/categories-by-page.mjs';
import { Login } from './pages/login.mjs';

export const RouteIndex = {
  url: '/',
  Component: Index,
  link() {
    return this.url;
  },
};

export const RoutePage = {
  url: '/page/:pageName',
  Component: Page,
  link(pageName) {
    return `/page/${encodeURIComponent(pageName)}`;
  },
};

export const RouteSearch = {
  url: '/search/:searchInput',
  Component: Search,
  link(searchInput) {
    return `/search/${encodeURIComponent(searchInput)}`;
  },
};

export const RouteCategories = {
  url: '/categories',
  Component: Categories,
  link() {
    return this.url;
  },
};

export const RoutePagesByCategory = {
  url: '/categories/:categoryName',
  Component: PagesByCategory,
  link(categoryName) {
    return `/categories/${encodeURIComponent(categoryName)}`;
  },
};

export const RouteStoriesOfMonth = {
  url: '/stories-of-month',
  Component: StoriesOfMonth,
  link() {
    return this.url;
  },
};

export const RouteLike = {
  url: '/page/:pageName/like',
  Component: Like,
  link(pageName) {
    return `/page/${encodeURIComponent(pageName)}/like`;
  },
};

export const RouteCategoriesByPage = {
  url: '/page/:pageName/categories',
  Component: CategoriesByPage,
  link(pageName) {
    return `/page/${encodeURIComponent(pageName)}/categories`;
  },
};

export const RouteLogin = {
  url: '/login',
  Component: Login,
  link() {
    return this.url;
  },
};

export const routes = [
  RouteIndex,
  RoutePage,
  RouteSearch,
  RouteCategories,
  RoutePagesByCategory,
  RouteStoriesOfMonth,
  RouteLike,
  RouteCategoriesByPage,
  RouteLogin,
];
