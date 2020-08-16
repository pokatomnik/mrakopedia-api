import { Index } from './pages/index.mjs';
import { Page } from './pages/page.mjs';
import { Search } from './pages/search.mjs';

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
    return `/page/${pageName}`;
  },
};

export const RouteSearch = {
  url: '/search/:searchInput',
  Component: Search,
  link(searchInput) {
    return `/search/${searchInput}`;
  },
};

export const routes = [RouteIndex, RoutePage, RouteSearch];
