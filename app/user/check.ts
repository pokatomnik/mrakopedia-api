import { NowRequest, NowResponse } from '@vercel/node';
import { TOKEN_KEY } from './constants';
import { ICheckResult } from './interfaces';
import { verify } from '../auth';
import { stringify } from '../utils';

export const check = async (request: NowRequest, response: NowResponse) => {
  const tokenRaw = request.headers[TOKEN_KEY];
  const token = stringify(tokenRaw);

  if (!token) {
    const checkResult: ICheckResult = {
      valid: false,
      description: 'No token',
    };

    return response.json(checkResult);
  }

  try {
    await verify(token);
    const checkResult: ICheckResult = {
      valid: true,
    };
    return response.json(checkResult);
  } catch (err) {
    const checkResult: ICheckResult = {
      valid: false,
      description: err.message ?? 'Invalid token',
    };
    return response.json(checkResult);
  }
};
