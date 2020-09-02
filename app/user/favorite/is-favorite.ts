import Mongoose from 'mongoose';
import { stringify } from '../../utils';
import { FavoriteModel } from '../../db/models/Favorite';
import { ensureToken } from '../../auth';
import * as FavoriteErrors from './errors';
import { IFavoriteFound } from './interfaces';

export const isFavorite = ensureToken(
  async (request, response, tokenParams) => {
    const {
      query: { favorite: favoriteRaw },
    } = request;

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

    try {
      const favoritesFound = await favoriteModel.find(query);
      const respondWith: IFavoriteFound = {
        isFavorite: Boolean(favoritesFound.length),
        title: favorite,
      };
      return response.json(respondWith);
    } catch (e) {
      return response.status(500).json(FavoriteErrors.FAILED_TO_ADD_FAVORITE);
    }
  }
);
