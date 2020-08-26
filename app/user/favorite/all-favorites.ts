import { NowRequest, NowResponse } from '@vercel/node';
import Mongoose from 'mongoose';
import { getToken } from '../token';
import * as Errors from './errors';
import { FavoriteModel } from '../../db/models/Favorite';
import { ISignParams, verify } from '../../auth';

export const allFavorites = async (
  request: NowRequest,
  response: NowResponse
) => {
  const token = getToken(request);

  if (!token) {
    response.status(403).json(Errors.NO_TOKEN);
  }

  let tokenParams: ISignParams | null = null;
  try {
    tokenParams = await verify<ISignParams>(token);
  } catch (e) {
    return response.status(403).json(Errors.INVALID_TOKEN);
  }

  try {
    const result = await FavoriteModel().find({
      userId: Mongoose.Types.ObjectId(tokenParams.id),
    });
    const responseItems = result.map((item) => item.toObject());
    return response.json(responseItems);
  } catch (e) {
    return response.status(500).json(Errors.FAILED_TO_GET_ALL_FAVORITES);
  }
};
