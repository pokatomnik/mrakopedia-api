import Mongoose from 'mongoose';
import { InviteModel } from '../../db/models/Invite';
import { ensureToken } from '../../auth';
import * as InviteErrors from './errors';
import * as CommonErrors from '../common-errors';
import * as Methods from '../http-methods';

export const invite = ensureToken(async (request, response, tokenParams) => {
  const { method } = request;

  if (method !== Methods.POST) {
    return response.status(400).json(CommonErrors.NO_METHOD_ERROR);
  }

  try {
    const newInvintation = await InviteModel().model.create({
      invitingUserId: Mongoose.Types.ObjectId(tokenParams.id),
    });
    const result = newInvintation.toObject();
    return response.json(result);
  } catch (e) {
    return response.status(500).json(InviteErrors.ADD_INVITE_ERROR);
  }
});
