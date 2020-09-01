import { NowRequest, NowResponse } from '@vercel/node';
import Mongoose from 'mongoose';
import { getToken } from '../token';
import * as InviteErrors from './errors';
import * as CommonErrors from '../common-errors';
import { InviteModel } from '../../db/models/Invite';
import { ISignParams, verify } from '../../auth';

export const myInvites = async (request: NowRequest, response: NowResponse) => {
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
    const invites = await InviteModel().find({
      invitingUserId: Mongoose.Types.ObjectId(tokenParams.id),
    });
    const result = invites.map((invite) => invite.toObject());
    return response.json(result);
  } catch (e) {
    return response.status(500).json(InviteErrors.GET_INVITES_ERROR);
  }
};
