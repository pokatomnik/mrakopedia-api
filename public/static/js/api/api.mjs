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
  apiAllFavorites,
  apiFavorite,
  apiIsFavorite,
  apiInvite,
  apiMyInvites,
  apiRemoveInvite,
  checkInvite as checkInviteRoute,
  register as registerRoute,
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
    (title) => ApiCall(getToken()).get(apiCategoriesByPage(title)),
    [getToken]
  );
  const getPage = Hooks.useCallback(
    (title) => ApiCall(getToken()).get(apiPage(title)),
    [getToken]
  );
  const getPagesByCategory = Hooks.useCallback(
    (title) => ApiCall(getToken()).get(apiPagesByCategory(title)),
    [getToken]
  );
  const getRelated = Hooks.useCallback(
    (title) => ApiCall(getToken()).get(apiRelated(title)),
    [getToken]
  );
  const search = Hooks.useCallback(
    (searchInput) => ApiCall(getToken()).get(apiSearch(searchInput)),
    [getToken]
  );
  const getSourceUrl = Hooks.useCallback(
    (title) => ApiCall(getToken()).get(apiSourceUrl(title)),
    [getToken]
  );

  const getRandom = Hooks.useCallback(
    () => ApiCall(getToken()).get(apiRandom()),
    [getToken]
  );

  const getStoriesOfMonth = Hooks.useCallback(
    () => ApiCall(getToken()).get(apiStoriesOfMonth()),
    [getToken]
  );

  const getAllFavorites = Hooks.useCallback(
    () => ApiCall(getToken()).get(apiAllFavorites()),
    [getToken]
  );

  const isFavorite = Hooks.useCallback(
    (title) => ApiCall(getToken()).get(apiIsFavorite(title)),
    [getToken]
  );

  const addToFavorites = Hooks.useCallback(
    (title) => ApiCall(getToken()).post(apiFavorite(title), {}),
    [getToken]
  );

  const removeFromFavorites = Hooks.useCallback(
    (title) => ApiCall(getToken()).delete(apiFavorite(title)),
    [getToken]
  );

  const invite = Hooks.useCallback(
    () => ApiCall(getToken()).post(apiInvite(), {}),
    [getToken]
  );

  const getMyInvites = Hooks.useCallback(
    () => ApiCall(getToken()).get(apiMyInvites()),
    [getToken]
  );

  const removeInviteById = Hooks.useCallback(
    (inviteId) => ApiCall(getToken()).delete(apiRemoveInvite(inviteId)),
    [getToken]
  );

  const checkInvite = Hooks.useCallback(
    (inviteId) => ApiCall().get(checkInviteRoute(inviteId)),
    []
  );

  const register = Hooks.useCallback(
    (inviteId, userName, email, passwordHash) =>
      ApiCall().post(registerRoute(), {
        inviteId,
        userName,
        email,
        passwordHash,
      }),
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
    getAllFavorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    invite,
    getMyInvites,
    removeInviteById,
    checkInvite,
    register,
  };
};
