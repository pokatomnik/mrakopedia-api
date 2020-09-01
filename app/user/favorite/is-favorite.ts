import Mongoose from 'mongoose';
import { NowRequest, NowResponse } from '@vercel/node';
import { stringify } from '../../utils';
import { FavoriteModel } from '../../db/models/Favorite';
import { getToken } from '../token';
import { verify, ISignParams } from '../../auth';
import * as FavoriteErrors from './errors';
import * as CommonErrors from '../common-errors';
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
    return response.status(403).json(CommonErrors.NO_TOKEN);
  }

  if (!favoriteRaw) {
    return response.status(400).json(FavoriteErrors.NO_PAGE_ERROR);
  }

  let tokenParams: ISignParams | null = null;

  try {
    tokenParams = await verify<ISignParams>(token);
  } catch (e) {
    return response.status(403).json(CommonErrors.INVALID_TOKEN);
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
    response.status(500).json(FavoriteErrors.FAILED_TO_ADD_FAVORITE);
  }
};
