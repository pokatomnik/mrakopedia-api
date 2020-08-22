import { NowApiHandler } from '@vercel/node';
import { login } from './login';
import { check } from './check';

export const actionMap: Record<string, NowApiHandler | undefined> = {
  login,
  check,
};
