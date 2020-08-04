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
  const name = stringify(req.query.name);
  if (!name) {
    res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
    return;
  }

  let rawCategoryNames: Array<string> | undefined = undefined;
  try {
    rawCategoryNames = await wiki.page(name).then((page) => page.categories());
  } catch {
    res.status(500).json(FETCH_LINKS_FAILED_ERROR);
    return;
  }

  if (rawCategoryNames === undefined) {
    res.status(500).json(FETCH_LINKS_FAILED_ERROR);
    return;
  }

  const categoryNames = rawCategoryNames
    .map((name) => name.split(SPLIT_BY)[1])
    .filter(Boolean);

  res.json(categoryNames.map(makeCategoryResponse).sort(makeSortFnBy('title')));
};
