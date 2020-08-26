import Mongoose from 'mongoose';
import { NowRequest, NowResponse } from '@vercel/node';
import { stringify } from '../../utils';
import { FavoriteModel } from '../../db/models/Favorite';
import { getToken } from '../token';
import { verify, ISignParams } from '../../auth';
import * as Errors from './errors';
import { IFavoriteFound } from './interfaces';

export const isFavorite = async (
  request: NowRequest,
  response: NowResponse
) => {
  const {
    query: { favorite: favoriteRaw },
  } = request;
  const token = getToken(request);

  if (!token) {
    return response.status(403).json(Errors.NO_TOKEN);
  }

  if (!favoriteRaw) {
    return response.status(400).json(Errors.NO_PAGE_ERROR);
  }

  let tokenParams: ISignParams | null = null;

  try {
    tokenParams = await verify<ISignParams>(token);
  } catch (e) {
    return response.status(403).json(Errors.INVALID_TOKEN);
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
    response.status(500).json(Errors.FAILED_TO_ADD_FAVORITE);
  }
};
