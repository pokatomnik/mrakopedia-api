import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, fetchPageByName } from '../../../app/utils';
import { wiki } from '../../../app/Wiki';
import { Page as WikiJSPage } from 'wikijs';

const ERROR_NOT_FOUND = Error('ERROR_SOURCE_NOT_FOUND', 'Source not found');
const ERROR_FAILED_FETCH_URL = Error(
  'ERROR_FAILED_FETCH',
  'Failed to fetch the source URL'
);
const FETCH_PAGE_FAILED_ERROR = Error(
  'PAGE_FETCH_FAILED',
  'Failed to fetch page'
);

export default async (request: NowRequest, response: NowResponse) => {
  const name = stringify(request.query.name);
  if (!name) {
    response.status(404).json(ERROR_NOT_FOUND);
    return;
  }

  let page: WikiJSPage | undefined = undefined;
  let sourceURL: URL | undefined = undefined;

  try {
    page = await fetchPageByName(name);
  } catch {
    response.status(404).json(FETCH_PAGE_FAILED_ERROR);
    return;
  }

  try {
    sourceURL = await wiki.page(name).then((page) => page.url());
  } catch {
    response.json(500).json(ERROR_FAILED_FETCH_URL);
    return;
  }

  if (!sourceURL) {
    response.status(404).json(ERROR_NOT_FOUND);
    return;
  }

  response.json({
    title: name,
    url: sourceURL.toString(),
  });
};
