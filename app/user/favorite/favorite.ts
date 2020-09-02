import Mongoose from 'mongoose';
import { stringify } from '../../utils';
import { FavoriteModel } from '../../db/models/Favorite';
import * as FavoriteErrors from './errors';
import * as CommonErrors from '../common-errors';
import * as Methods from '../http-methods';
import { ensureToken } from '../../auth';

export const favorite = ensureToken(async (request, response, tokenParams) => {
  const {
    method,
    query: { favorite: favoriteRaw },
  } = request;
  if (method !== Methods.POST && method !== Methods.DELETE) {
    return response.status(400).json(CommonErrors.NO_METHOD_ERROR);
  }

  if (!favoriteRaw) {
    return response.status(400).json(FavoriteErrors.NO_PAGE_ERROR);
  }

  const favoriteModel = FavoriteModel();
  const favorite = stringify(favoriteRaw);
  const userId = Mongoose.Types.ObjectId(tokenParams.id);
  const query = {
    title: favorite,
    userId,
  };
  if (method === 'POST')
    try {
      await favoriteModel.create(query);
      return response.json(null);
    } catch (e) {
      return response.status(500).json(FavoriteErrors.FAILED_TO_ADD_FAVORITE);
    }
  else
    try {
      await favoriteModel.findOneAndRemove(query);
      return response.json(null);
    } catch (e) {
      return response
        .status(500)
        .json(FavoriteErrors.FAILED_TO_REMOVE_FAVORITE);
    }
});
