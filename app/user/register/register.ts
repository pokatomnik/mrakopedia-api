import { NowRequest, NowResponse } from '@vercel/node';
import * as HttpMethods from '../http-methods';
import * as CommonErrors from '../common-errors';
import * as RegisterErrors from './errors';
import { InviteModel } from '../../db/models/Invite';
import { UserModel } from '../../db/models/User';

export const register = async (request: NowRequest, response: NowResponse) => {
  const {
    method,
    body: { email, passwordHash, userName, inviteId },
  } = request;

  if (method !== HttpMethods.POST) {
    return response.status(400).json(CommonErrors.NO_METHOD_ERROR);
  }

  if (!email || !passwordHash || !userName || !inviteId) {
    return response.status(400).json(RegisterErrors.INCOMPLETE_DATA_ERROR);
  }

  try {
    const invite = await InviteModel().model.findOne({
      _id: inviteId,
    });

    if (!invite) {
      return response.status(404).json(RegisterErrors.INVITE_NOT_FOUND);
    }
  } catch (e) {
    console.error(e);
    return response.status(500).json(RegisterErrors.REGISTER_DATABASE_ERROR);
  }

  try {
    const { db, model: userModel } = UserModel();
    const { model: inviteModel } = InviteModel();
    const session = await db.startSession();
    session.startTransaction();

    await userModel.create([{ email, passwordHash, userName }], { session });
    await inviteModel.findByIdAndDelete(inviteId, { session });

    await session.commitTransaction();
    session.endSession();
    return response.json(null);
  } catch (e) {
    if (e.code === RegisterErrors.ALREADY_EXISTS_CODE) {
      return response.status(400).json(RegisterErrors.USER_EXISTS_ERROR);
    }
    console.log(e);
    return response.status(500).json(RegisterErrors.REGISTER_DATABASE_ERROR);
  }
};
