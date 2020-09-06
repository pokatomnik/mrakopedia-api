import Mongoose from 'mongoose';
import * as FavoriteErrors from './errors';
import { FavoriteModel } from '../../db/models/Favorite';
import { makePageResponse } from '../../utils';
import { ensureToken } from '../../auth';

export const allFavorites = ensureToken(async (_, response, tokenParams) => {
  try {
    const result = await FavoriteModel().model.find({
      userId: Mongoose.Types.ObjectId(tokenParams.id),
    });
    const responseItems = result.map((item) =>
      makePageResponse(item.toObject().title)
    );
    return response.json(responseItems);
  } catch (e) {
    return response
      .status(500)
      .json(FavoriteErrors.FAILED_TO_GET_ALL_FAVORITES);
  }
});
