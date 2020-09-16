import Preact, { html } from './preact/preact.mjs';
import { Index } from './pages/index.mjs';
import { Page } from './pages/page.mjs';
import { Search } from './pages/search.mjs';
import { Categories } from './pages/categories.mjs';
import { PagesByCategory } from './pages/pages-by-category.mjs';
import { StoriesOfMonth } from './pages/stories-of-month.mjs';
import { Like } from './pages/like.mjs';
import { CategoriesByPage } from './pages/categories-by-page.mjs';
import { Login } from './pages/login.mjs';
import { Favorites } from './pages/favorites.mjs';
import { MyInvites } from './pages/my-invites.mjs';
import { Register } from './pages/register.mjs';

/**
 * Do not use this directly in the routes array,
 * because the Router component handles this automatically.
 */

export const RouteFallback = {
  url: '/404',
  Component: () => html`<${Preact.Fragment} />`,
  link() {
    return this.url;
  },
};

export const RouteIndex = {
  url: '/',
  Component: Index,
  link() {
    return this.url;
  },
};

export const RoutePage = {
  url: '/page/:title',
  Component: Page,
  link(title) {
    return `/page/${encodeURIComponent(title)}`;
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
  url: '/categories/:title',
  Component: PagesByCategory,
  link(title) {
    return `/categories/${encodeURIComponent(title)}`;
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
  url: '/page/:title/like',
  Component: Like,
  link(title) {
    return `/page/${encodeURIComponent(title)}/like`;
  },
};

export const RouteCategoriesByPage = {
  url: '/page/:title/categories',
  Component: CategoriesByPage,
  link(title) {
    return `/page/${encodeURIComponent(title)}/categories`;
  },
};

export const RouteLogin = {
  url: '/login',
  Component: Login,
  link() {
    return this.url;
  },
};

export const RouteFavorites = {
  url: '/favorites',
  Component: Favorites,
  link() {
    return this.url;
  },
};

export const RouteMyInvites = {
  url: '/my-invites',
  Component: MyInvites,
  link() {
    return this.url;
  },
};

export const RouteRegister = {
  url: '/register/:inviteId',
  Component: Register,
  link(inviteId) {
    return `/register/${inviteId}`;
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
  RouteFavorites,
  RouteMyInvites,
  RouteRegister,
];
