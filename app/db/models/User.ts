import Mongoose, { Schema } from 'mongoose';
import { connect } from '../connection';

interface IUserDocument extends Mongoose.Document {
  userName: string;
  passwordHash: string;
  email: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    unique: false,
  },
  userName: {
    type: String,
    required: false,
    unique: false,
  },
});

export const UserModel = () => {
  const db = connect();
  const model = db.model<IUserDocument>('user', UserSchema);
  return { db, model };
};
