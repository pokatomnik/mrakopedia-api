import Mongoose, { Schema } from 'mongoose';
import { connect } from '../connection';

interface IInvite extends Mongoose.Document {
  invitingUserId: Mongoose.Types.ObjectId;
}

const InviteSchema = new Schema(
  {
    invitingUserId: {
      type: Mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    toObject: {
      transform({ invitingUserId, _id }) {
        return {
          id: _id,
          invitingUserId: invitingUserId.toString(),
        };
      },
    },
  }
);

export const InviteModel = () => {
  const db = connect();
  const model = db.model<IInvite>('invite', InviteSchema);
  return { db, model };
};
