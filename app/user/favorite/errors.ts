import { Error } from '../../utils';

export const NO_PAGE_ERROR = Error('NO_PAGE', 'No page title provided');
export const FAILED_TO_ADD_FAVORITE = Error(
  'FAVORITE_POST_FAILED',
  'Failed to save favorite'
);
export const FAILED_TO_REMOVE_FAVORITE = Error(
  'FAVORITE_REMOVE_FAILED',
  'Failed to remove favorite'
);
export const FAILED_TO_GET_ALL_FAVORITES = Error(
  'GET_ALL_FAVORITES_FAILED',
  'Failed to get all favorites'
);
