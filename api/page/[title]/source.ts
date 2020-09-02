import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, fetchPageByName } from '../../../app/utils';
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
  const title = stringify(request.query.title);
  if (!title) {
    return response.status(404).json(ERROR_NOT_FOUND);
  }

  let page: WikiJSPage | undefined = undefined;
  let sourceURL: URL | undefined = undefined;

  try {
    page = await fetchPageByName(title);
  } catch {
    return response.status(404).json(FETCH_PAGE_FAILED_ERROR);
  }

  try {
    sourceURL = await page.url();
  } catch {
    return response.status(500).json(ERROR_FAILED_FETCH_URL);
  }

  if (!sourceURL) {
    return response.status(404).json(ERROR_NOT_FOUND);
  }

  return response.json({
    title: title,
    url: sourceURL.toString(),
  });
};
