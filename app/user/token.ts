import { NowRequest } from '@vercel/node';
import { stringify } from '../utils';

const TOKEN_KEY = 'x-token';

export const getToken = (request: NowRequest) => {
  return stringify(request.headers[TOKEN_KEY]);
};
