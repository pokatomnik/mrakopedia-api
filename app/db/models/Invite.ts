import Mongoose, { Schema } from 'mongoose';
import { connect } from '../connection';
import { v4 as uuidv4 } from 'uuid';

interface IInvite extends Mongoose.Document {
  invitingUserId: Mongoose.Types.ObjectId;
  uuid: string;
}

const InviteSchema = new Schema(
  {
    invitingUserId: {
      type: Mongoose.Types.ObjectId,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
      default: () => uuidv4(),
      unique: true,
    },
  },
  {
    toObject: {
      transform({ invitingUserId, uuid, _id }) {
        return {
          id: _id,
          uuid,
          invitingUserId: invitingUserId.toString(),
        };
      },
    },
  }
);

export const InviteModel = () =>
  connect().model<IInvite>('invite', InviteSchema);
