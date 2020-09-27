import { NowRequest, NowResponse } from '@vercel/node';
import {
  stringify,
  Error,
  makePageResponse,
  fetchPageByName,
  makeSortFnBy,
} from '../utils';
import { Page as WikiJSPage } from 'wikijs';

const FETCH_PAGE_FAILED_ERROR = Error(
  'PAGE_FETCH_FAILED',
  'Failed to fetch page'
);

export const getRelatedPagesOfPage = async (
  req: NowRequest,
  res: NowResponse
) => {
  const title = stringify(req.query.title);
  if (!title) {
    return res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
  }

  let page: WikiJSPage | undefined = undefined;
  let links: Array<string> | undefined = undefined;

  try {
    page = await fetchPageByName(title);
  } catch {
    return res.status(404).json(FETCH_PAGE_FAILED_ERROR);
  }

  try {
    links = await page.links();
  } catch {
    links = [];
  }

  return res.json(links.map(makePageResponse).sort(makeSortFnBy('title')));
};
