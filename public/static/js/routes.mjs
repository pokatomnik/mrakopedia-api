import { Index } from './pages/index.mjs';
import { Test } from './pages/test.mjs';

export const routes = [
  {
    url: '/',
    Component: Index,
  },
  {
    url: '/test',
    Component: Test,
  },
];
