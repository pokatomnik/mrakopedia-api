import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, makeCategoryResponse, makeSortFnBy } from '../utils';
import { wiki } from '../Wiki';

const FETCH_LINKS_FAILED_ERROR = Error(
  'LINKS_FETCH_FAILED',
  'Failed to fetch links'
);

const SPLIT_BY = ':';

export const getCategoriesOfPage = async (
  req: NowRequest,
  res: NowResponse
) => {
  const title = stringify(req.query.title);
  if (!title) {
    return res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
  }

  let rawTitles: Array<string> | undefined = undefined;
  try {
    rawTitles = await wiki.page(title).then((page) => page.categories());
  } catch {
    return res.status(500).json(FETCH_LINKS_FAILED_ERROR);
  }

  if (rawTitles === undefined) {
    return res.status(500).json(FETCH_LINKS_FAILED_ERROR);
  }

  const titles = rawTitles
    .map((title) => title.split(SPLIT_BY)[1])
    .filter(Boolean);

  return res.json(titles.map(makeCategoryResponse).sort(makeSortFnBy('title')));
};
