import Axios from 'axios';
import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error } from '../../../../app/utils';
import { wiki } from '../../../../app/Wiki';

const FETCH_IMAGE_FAILED_ERROR = Error(
  'IMAGE_FETCH_FAILED',
  'Failed to fetch image'
);

const CONTENT_TYPE_KEY = 'content-type';
const CONTENT_LENGTH_KEY = 'content-length';

export default async (request: NowRequest, response: NowResponse) => {
  const name = stringify(request.query.name);
  if (!name) {
    response.status(404).setHeader('Content-Type', 'image/png');
    response.send('');
    return;
  }

  let imageUrl: string | undefined = undefined;

  try {
    imageUrl = await wiki.page(name).then((page) => page.mainImage());
  } catch {
    response.status(500).json(FETCH_IMAGE_FAILED_ERROR);
    return;
  }

  if (!imageUrl) {
    response.status(404).setHeader('Content-Type', 'image/png');
    response.send('');
    return;
  }

  try {
    const imageResponse = await Axios.get<unknown>(imageUrl, {
      responseType: 'arraybuffer',
    });
    response.setHeader(
      CONTENT_TYPE_KEY,
      imageResponse.headers[CONTENT_TYPE_KEY]
    );
    response.setHeader(
      CONTENT_LENGTH_KEY,
      imageResponse.headers[CONTENT_LENGTH_KEY]
    );
    response.send(imageResponse.data);
  } catch (err) {
    response.status(500).json(FETCH_IMAGE_FAILED_ERROR);
  }
};
