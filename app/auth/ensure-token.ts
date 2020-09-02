import { NowRequest, NowResponse, NowApiHandler } from '@vercel/node';
import { ISignParams } from './sign';
import { getToken } from '../user/token';
import { verify } from './verify';

import * as CommonErrors from '../user/common-errors';

export const ensureToken = (
  protectedHandler: (
    request: NowRequest,
    response: NowResponse,
    tokenData: ISignParams
  ) => void
): NowApiHandler => {
  return async (request: NowRequest, response: NowResponse) => {
    const token = getToken(request);

    if (!token) {
      return response.status(403).json(CommonErrors.NO_TOKEN);
    }

    let tokenParams: ISignParams | null = null;

    try {
      tokenParams = await verify<ISignParams>(token);
    } catch (e) {
      return response.status(403).json(CommonErrors.INVALID_TOKEN);
    }

    return protectedHandler(request, response, tokenParams);
  };
};
