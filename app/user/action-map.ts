import { NowApiHandler } from '@vercel/node';
import { login, check } from './login';
import { favorite, allFavorites, isFavorite } from './favorite';

export const actionMap: Record<string, NowApiHandler | undefined> = {
  login,
  check,
  favorite,
  'all-favorites': allFavorites,
  'is-favorite': isFavorite,
};
