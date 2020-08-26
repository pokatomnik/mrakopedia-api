import { NowRequest, NowResponse } from '@vercel/node';
import {
  stringify,
  Error,
  makePageResponse,
  fetchPageByName,
  makeSortFnBy,
  allowCors,
} from '../../../app/utils';
import { Page as WikiJSPage } from 'wikijs';

const FETCH_PAGE_FAILED_ERROR = Error(
  'PAGE_FETCH_FAILED',
  'Failed to fetch page'
);

const FETCH_LINKS_FAILED_ERROR = Error(
  'LINKS_FETCH_FAILED',
  'Failed to fetch links'
);

export default allowCors(async (req: NowRequest, res: NowResponse) => {
  const title = stringify(req.query.title);
  if (!title) {
    res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
    return;
  }

  let page: WikiJSPage | undefined = undefined;
  let links: Array<string> | undefined = undefined;

  try {
    page = await fetchPageByName(title);
  } catch {
    res.status(404).json(FETCH_PAGE_FAILED_ERROR);
    return;
  }

  try {
    links = await page.links();
  } catch {
    links = [];
  }

  res.json(links.map(makePageResponse).sort(makeSortFnBy('title')));
});
