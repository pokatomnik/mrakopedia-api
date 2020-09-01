import { NowRequest, NowResponse } from '@vercel/node';
import Mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from '../token';
import { InviteModel } from '../../db/models/Invite';
import { ISignParams, verify } from '../../auth';
import * as InviteErrors from './errors';
import * as CommonErrors from '../common-errors';
import * as Methods from '../http-methods';

export const invite = async (request: NowRequest, response: NowResponse) => {
  const { method } = request;

  if (method !== Methods.POST) {
    return response.status(400).json(CommonErrors.NO_METHOD_ERROR);
  }

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

  try {
    const newInvintation = await InviteModel().create({
      invitingUserId: Mongoose.Types.ObjectId(tokenParams.id),
      uuid: uuidv4(),
    });
    const result = newInvintation.toObject();
    return response.json(result);
  } catch (e) {
    return response.status(500).json(InviteErrors.ADD_INVITE_ERROR);
  }
};
