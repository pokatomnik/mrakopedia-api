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
  const abortController = Hooks.useMemo(() => {
    return new AbortController();
  }, []);

  const getCategories = Hooks.useCallback(
    () => ApiCall(abortController).get(apiCategories()),
    [abortController]
  );
  const getCategoriesByPage = Hooks.useCallback(
    (title) => ApiCall(abortController).get(apiCategoriesByPage(title)),
    [abortController]
  );
  const getPage = Hooks.useCallback(
    (title) => ApiCall(abortController).get(apiPage(title)),
    [abortController]
  );
  const getPagesByCategory = Hooks.useCallback(
    (title) => ApiCall(abortController).get(apiPagesByCategory(title)),
    [abortController]
  );
  const getRelated = Hooks.useCallback(
    (title) => ApiCall(abortController).get(apiRelated(title)),
    [abortController]
  );
  const search = Hooks.useCallback(
    (searchInput) => ApiCall(abortController).get(apiSearch(searchInput)),
    [abortController]
  );
  const getSourceUrl = Hooks.useCallback(
    (title) => ApiCall(abortController).get(apiSourceUrl(title)),
    [abortController]
  );

  const getRandom = Hooks.useCallback(
    () => ApiCall(abortController).get(apiRandom()),
    [abortController]
  );

  const getStoriesOfMonth = Hooks.useCallback(
    () => ApiCall(abortController).get(apiStoriesOfMonth()),
    [abortController]
  );

  Hooks.useEffect(() => {
    return () => {
      return abortController.abort();
    };
  }, [abortController]);

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
