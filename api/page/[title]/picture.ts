import Axios from 'axios';
import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, allowCors } from '../../../app/utils';
import { wiki } from '../../../app/Wiki';

const SVG_CONTENTS = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 0 0" />`;
const CONTENT_TYPE_SVG = 'image/svg+xml';

const CONTENT_TYPE_KEY = 'content-type';
const CONTENT_LENGTH_KEY = 'content-length';

export default allowCors(async (request: NowRequest, response: NowResponse) => {
  const title = stringify(request.query.title);
  if (!title) {
    response.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_SVG);
    response.send(SVG_CONTENTS);
    return;
  }

  let imageUrl: string | undefined = undefined;

  try {
    imageUrl = await wiki.page(title).then((page) => page.mainImage());
  } catch {
    response.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_SVG);
    response.send(SVG_CONTENTS);
    return;
  }

  if (!imageUrl) {
    response.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_SVG);
    response.send(SVG_CONTENTS);
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
    response.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_SVG);
    response.send(SVG_CONTENTS);
  }
});
