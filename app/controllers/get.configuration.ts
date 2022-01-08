import { NowResponse } from '@vercel/node';
import { CONFIGURATION } from '../config';

export function getConfiguration(_: unknown, response: NowResponse) {
  return response.status(200).json(CONFIGURATION);
}
