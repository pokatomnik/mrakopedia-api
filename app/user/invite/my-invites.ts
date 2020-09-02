import { NowRequest, NowResponse } from '@vercel/node';
import Mongoose from 'mongoose';
import { getToken } from '../token';
import * as InviteErrors from './errors';
import * as CommonErrors from '../common-errors';
import { InviteModel } from '../../db/models/Invite';
import { ensureToken } from '../../auth';

export const myInvites = ensureToken(async (_, response, tokenParams) => {
  try {
    const invites = await InviteModel().find({
      invitingUserId: Mongoose.Types.ObjectId(tokenParams.id),
    });
    const result = invites.map((invite) => invite.toObject());
    return response.json(result);
  } catch (e) {
    return response.status(500).json(InviteErrors.GET_INVITES_ERROR);
  }
});
