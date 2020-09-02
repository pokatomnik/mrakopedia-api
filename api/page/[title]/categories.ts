import { NowRequest, NowResponse } from '@vercel/node';
import {
  stringify,
  Error,
  makeCategoryResponse,
  makeSortFnBy,
} from '../../../app/utils';
import { wiki } from '../../../app/Wiki';

const FETCH_LINKS_FAILED_ERROR = Error(
  'LINKS_FETCH_FAILED',
  'Failed to fetch links'
);

const SPLIT_BY = ':';

export default async (req: NowRequest, res: NowResponse) => {
  const title = stringify(req.query.title);
  if (!title) {
    res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
    return;
  }

  let rawTitles: Array<string> | undefined = undefined;
  try {
    rawTitles = await wiki.page(title).then((page) => page.categories());
  } catch {
    res.status(500).json(FETCH_LINKS_FAILED_ERROR);
    return;
  }

  if (rawTitles === undefined) {
    res.status(500).json(FETCH_LINKS_FAILED_ERROR);
    return;
  }

  const titles = rawTitles
    .map((title) => title.split(SPLIT_BY)[1])
    .filter(Boolean);

  res.json(titles.map(makeCategoryResponse).sort(makeSortFnBy('title')));
};
