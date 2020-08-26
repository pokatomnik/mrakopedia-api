import { NowRequest, NowResponse } from '@vercel/node';
import { getToken } from '../token';
import { ICheckResult } from './interfaces';
import { verify } from '../../auth';

export const check = async (request: NowRequest, response: NowResponse) => {
  const token = getToken(request);

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
