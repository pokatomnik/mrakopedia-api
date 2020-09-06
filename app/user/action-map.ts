import { NowApiHandler } from '@vercel/node';
import { login, check } from './login';
import { favorite, allFavorites, isFavorite } from './favorite';
import { invite, myInvites, removeInvite } from './invite';
import { register } from './register';

export const actionMap: Record<string, NowApiHandler | undefined> = {
  login,
  check,
  favorite,
  'all-favorites': allFavorites,
  'is-favorite': isFavorite,
  invite,
  'my-invites': myInvites,
  'remove-invite': removeInvite,
  register,
};
