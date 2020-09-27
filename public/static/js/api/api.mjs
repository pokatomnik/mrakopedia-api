import {
  apiCategories,
  apiCategoriesByPage,
  apiPage,
  apiPagesByCategory,
  apiRelated,
  apiSearch,
  apiSourceUrl,
  apiStoriesOfMonth,
  apiRandom,
} from './api-routes.mjs';
import { ApiCall } from './fetch.mjs';
import { Hooks } from '../preact/preact.mjs';

export const useApi = () => {
  const getCategories = Hooks.useCallback(
    () => ApiCall().get(apiCategories()),
    []
  );
  const getCategoriesByPage = Hooks.useCallback(
    (title) => ApiCall().get(apiCategoriesByPage(title)),
    []
  );
  const getPage = Hooks.useCallback(
    (title) => ApiCall().get(apiPage(title)),
    []
  );
  const getPagesByCategory = Hooks.useCallback(
    (title) => ApiCall().get(apiPagesByCategory(title)),
    []
  );
  const getRelated = Hooks.useCallback(
    (title) => ApiCall().get(apiRelated(title)),
    []
  );
  const search = Hooks.useCallback(
    (searchInput) => ApiCall().get(apiSearch(searchInput)),
    []
  );
  const getSourceUrl = Hooks.useCallback(
    (title) => ApiCall().get(apiSourceUrl(title)),
    []
  );

  const getRandom = Hooks.useCallback(() => ApiCall().get(apiRandom()), []);

  const getStoriesOfMonth = Hooks.useCallback(
    () => ApiCall().get(apiStoriesOfMonth()),
    []
  );

  return {
    getCategories,
    getCategoriesByPage,
    getPage,
    getPagesByCategory,
    getRelated,
    search,
    getSourceUrl,
    getStoriesOfMonth,
    getRandom,
  };
};
