import Mongoose, { Schema } from 'mongoose';
import { connect } from '../connection';

interface IFavorite extends Mongoose.Document {
  title: string;
  userId: Mongoose.Types.ObjectId;
}

const FavoriteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    toObject: {
      transform({ title }) {
        return {
          title,
        };
      },
    },
  }
);

FavoriteSchema.index({ title: 1, userId: 1 }, { unique: true });

export const FavoriteModel = () =>
  connect().model<IFavorite>('favorite', FavoriteSchema);
