import Mongoose from 'mongoose';
import { ensureToken } from '../../auth';
import * as Methods from '../http-methods';
import * as CommonErrors from '../common-errors';
import * as InviteErrors from './errors';
import { stringify } from '../../utils';
import { InviteModel } from '../../db/models/Invite';

export const removeInvite = ensureToken(
  async (request, response, tokenData) => {
    const {
      method,
      query: { inviteId: rawInviteId },
    } = request;

    if (method !== Methods.DELETE) {
      return response.status(400).json(CommonErrors.NO_METHOD_ERROR);
    }

    const inviteId = stringify(rawInviteId);

    if (!inviteId) {
      return response.json(400).json(InviteErrors.NO_INVITE_ID);
    }

    try {
      await InviteModel().findOneAndDelete({
        invitingUserId: Mongoose.Types.ObjectId(tokenData.id),
        _id: Mongoose.Types.ObjectId(inviteId),
      });
      return response.json(null);
    } catch (e) {
      response.status(500).json(InviteErrors.REMOVE_INVITE_FAILED);
    }
  }
);
