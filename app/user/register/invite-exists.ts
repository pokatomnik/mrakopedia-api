import Mongoose from 'mongoose';
import { NowRequest, NowResponse } from '@vercel/node';
import { stringify } from '../../utils';
import { InviteModel } from '../../db/models/Invite';
import * as RegisterErrors from './errors';

interface IInviteExists {
  invite: string;
  exists: boolean;
}

export const inviteExists = async (
  request: NowRequest,
  response: NowResponse
) => {
  const {
    query: { inviteId: inviteIdRaw },
  } = request;

  const inviteId = stringify(inviteIdRaw);

  if (!inviteId) {
    return response.status(400).json(RegisterErrors.INCOMPLETE_DATA_ERROR);
  }

  try {
    const invite = await InviteModel().model.findById(
      Mongoose.Types.ObjectId(inviteId)
    );
    const result: IInviteExists = {
      exists: Boolean(invite),
      invite: inviteId,
    };
    return response.json(result);
  } catch (e) {
    console.error(e);
    const result: IInviteExists = {
      exists: false,
      invite: inviteId,
    };
    return response.json(result);
  }
};
