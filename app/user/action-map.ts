import { NowApiHandler } from '@vercel/node';
import { login, check } from './login';
import { favorite, allFavorites, isFavorite } from './favorite';
import { invite, myInvites } from './invite';

export const actionMap: Record<string, NowApiHandler | undefined> = {
  login,
  check,
  favorite,
  'all-favorites': allFavorites,
  'is-favorite': isFavorite,
  invite,
  'my-invites': myInvites,
};
