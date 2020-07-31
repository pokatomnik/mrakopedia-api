import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, IPageResponse } from '../../../app/utils';
import { wiki } from '../../../app/Wiki';

const ERROR_NOT_FOUND = Error('ERROR_SOURCE_NOT_FOUND', 'Source not found');
const ERROR_FAILED_FETCH_URL = Error(
  'ERROR_FAILED_FETCH',
  'Failed to fetch the source URL'
);

export default async (request: NowRequest, response: NowResponse) => {
  const name = stringify(request.query.name);
  if (!name) {
    response.status(404).json(ERROR_NOT_FOUND);
    return;
  }

  let imageUrl: URL | undefined = undefined;

  try {
    imageUrl = await wiki.page(name).then((page) => page.url());
  } catch {
    response.json(500).json(ERROR_FAILED_FETCH_URL);
    return;
  }

  if (!imageUrl) {
    response.status(404).json(ERROR_NOT_FOUND);
    return;
  }

  const page: IPageResponse = {
    title: name,
    url: imageUrl.toString(),
  };

  response.json(page);
};
