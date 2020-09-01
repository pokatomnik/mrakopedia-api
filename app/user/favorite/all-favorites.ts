import { NowRequest, NowResponse } from '@vercel/node';
import Mongoose from 'mongoose';
import { getToken } from '../token';
import * as FavoriteErrors from './errors';
import * as CommonErrors from '../common-errors';
import { FavoriteModel } from '../../db/models/Favorite';
import { ISignParams, verify } from '../../auth';
import { makePageResponse } from '../../utils';

export const allFavorites = async (
  request: NowRequest,
  response: NowResponse
) => {
  const token = getToken(request);

  if (!token) {
    return response.status(403).json(CommonErrors.NO_TOKEN);
  }

  let tokenParams: ISignParams | null = null;
  try {
    tokenParams = await verify<ISignParams>(token);
  } catch (e) {
    return response.status(403).json(CommonErrors.INVALID_TOKEN);
  }

  try {
    const result = await FavoriteModel().find({
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
};
