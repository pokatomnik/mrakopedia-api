import { NowResponse } from '@vercel/node';
import { wiki } from '../Wiki';
import { HISTORY_OF_THE_MONTH_PAGE_NAME } from '../constants';
import { Error, makePageResponse, makeSortFnBy } from '../utils';

const PAGE_FETCH_ERROR = Error(
  'FAILED_TO_GET_PAGE_WITH_HISTORIES',
  'Failed to get page with histories of the month'
);
const LINKS_FETCH_ERROR = Error(
  'FAILED_TO_GET_LINKS',
  'Failed to get history of the month links'
);

type InferPromise<T> = T extends PromiseLike<infer U> ? U : T;

type Page = InferPromise<ReturnType<typeof wiki['page']>>;

export const getHOTM = async (_: unknown, response: NowResponse) => {
  let page: Page | null = null;

  try {
    page = await wiki.page(HISTORY_OF_THE_MONTH_PAGE_NAME);
  } catch {
    return response.status(500).json(PAGE_FETCH_ERROR);
  }

  if (page === null) {
    return response.status(500).json(PAGE_FETCH_ERROR);
  }

  let links: Array<string> = [];

  try {
    links = await page.links();
  } catch {
    return response.status(500).json(LINKS_FETCH_ERROR);
  }

  return response.json(links.map(makePageResponse).sort(makeSortFnBy('title')));
};
