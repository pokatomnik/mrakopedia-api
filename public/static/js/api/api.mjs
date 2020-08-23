import {
  apiCategories,
  apiCategoriesByPage,
  apiPage,
  apiPagesByCategory,
  apiRelated,
  apiSearch,
  apiSourceUrl,
  apiStoriesOfMonth,
} from './api-routes.mjs';
import { ApiCall } from './fetch.mjs';
import { useAuth } from '../utils/auth/auth.mjs';
import { Hooks } from '../preact/preact.mjs';

export const useApi = () => {
  const { getToken } = useAuth();
  const getCategories = Hooks.useCallback(
    () => ApiCall(getToken()).get(apiCategories()),
    [getToken]
  );
  const getCategoriesByPage = Hooks.useCallback(
    (pageName) => ApiCall(getToken()).get(apiCategoriesByPage(pageName)),
    [getToken]
  );
  const getPage = Hooks.useCallback(
    (pageName) => ApiCall(getToken()).get(apiPage(pageName)),
    [getToken]
  );
  const getPagesByCategory = Hooks.useCallback(
    (categoryName) => ApiCall(getToken()).get(apiPagesByCategory(categoryName)),
    [getToken]
  );
  const getRelated = Hooks.useCallback(
    (pageName) => ApiCall(getToken()).get(apiRelated(pageName)),
    [getToken]
  );
  const search = Hooks.useCallback(
    (searchInput) => ApiCall(getToken()).get(apiSearch(searchInput)),
    [getToken]
  );
  const getSourceUrl = Hooks.useCallback(
    (pageName) => ApiCall(getToken()).get(apiSourceUrl(pageName)),
    [getToken]
  );
  const getStoriesOfMonth = Hooks.useCallback(
    () => ApiCall(getToken()).get(apiStoriesOfMonth()),
    [getToken]
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
  };
};
