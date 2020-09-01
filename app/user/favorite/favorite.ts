import Mongoose from 'mongoose';
import { NowRequest, NowResponse } from '@vercel/node';
import { stringify } from '../../utils';
import { FavoriteModel } from '../../db/models/Favorite';
import { getToken } from '../token';
import { verify, ISignParams } from '../../auth';
import * as FavoriteErrors from './errors';
import * as CommonErrors from '../common-errors';
import * as Methods from '../http-methods';

export const favorite = async (request: NowRequest, response: NowResponse) => {
  const {
    method,
    query: { favorite: favoriteRaw },
  } = request;
  const token = getToken(request);

  if (!token) {
    return response.status(403).json(CommonErrors.NO_TOKEN);
  }

  if (method !== Methods.POST && method !== Methods.DELETE) {
    return response.status(400).json(CommonErrors.NO_METHOD_ERROR);
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
};
