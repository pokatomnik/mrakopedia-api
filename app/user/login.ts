import { NowRequest, NowResponse } from '@vercel/node';
import { Document } from 'mongoose';
import { Error } from '../utils';
import { connect, DB_ERROR } from '../db/connection';
import { UserModel } from '../db/models/User';
import { sign } from '../auth';
import { ILoginSuccess } from './interfaces';

const WRONG_CREDENTIALS_ERROR = Error(
  'ERROR_WRONG_CREDENTIALS',
  'Invalid credentials'
);
const INVALID_METHOD = Error('ERROR_INVALID_METHOD', 'Invalid HTTP hethod');
const FAILED_TO_SIGN = Error(
  'ERROR_FAILED_TO_SIGN',
  'Failed to sign with this credentials'
);

export const login = async (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') {
    return response.status(400).json(INVALID_METHOD);
  }

  if (!request.body) {
    return response.status(403).json(WRONG_CREDENTIALS_ERROR);
  }

  let { email, passwordHash } = request.body;

  if (!email || !passwordHash) {
    return response.status(403).json(WRONG_CREDENTIALS_ERROR);
  }

  email = String(email);
  passwordHash = String(passwordHash);

  let user: Document | null = null;

  try {
    await connect();
    user = await UserModel.findOne({
      email,
      passwordHash,
    });

    if (!user) {
      return response.status(403).json(WRONG_CREDENTIALS_ERROR);
    }
  } catch (e) {
    return response.status(403).json(DB_ERROR);
  }

  let token: string | null = null;
  try {
    const userObject = user.toObject();
    const paramsToSign = {
      email: userObject.email,
      id: userObject._id.toString(),
      userName: userObject.userName,
    };
    token = await sign(paramsToSign);
    const loginResult: ILoginSuccess = { token };
    return response.json(loginResult);
  } catch (e) {
    return response.status(500).json(FAILED_TO_SIGN);
  }
};
