import Mongoose, { Schema } from 'mongoose';

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

export const UserModel = (connection: Mongoose.Connection) =>
  connection.model<IUserDocument>('user', UserSchema);
