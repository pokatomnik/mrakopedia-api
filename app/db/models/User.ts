import Mongoose, { Schema } from 'mongoose';

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

export const UserModel = Mongoose.model('user', UserSchema);
