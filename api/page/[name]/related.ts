import { NowRequest, NowResponse } from '@vercel/node';
import {
  stringify,
  Error,
  makePageResponse,
  fetchPageByName,
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

export default async (req: NowRequest, res: NowResponse) => {
  const name = stringify(req.query.name);
  if (!name) {
    res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
    return;
  }

  let page: WikiJSPage | undefined = undefined;
  let links: Array<string> | undefined = undefined;

  try {
    page = await fetchPageByName(name);
  } catch {
    res.status(404).json(FETCH_PAGE_FAILED_ERROR);
    return;
  }

  try {
    links = await page.links();
  } catch {
    links = [];
  }

  res.json(links.map(makePageResponse));
};
