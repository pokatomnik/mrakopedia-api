import { STATUS_CODES } from 'http';
import { NowRequest, NowResponse } from '@vercel/node';
import Axios, { AxiosResponse } from 'axios';
import {
  stringify,
  Error,
  makeSearch,
  makePageResponse,
  makeSortFnBy,
} from '../utils';
import { IWikiQueryResponse } from '../IWikiQueryResponse';
import { MRAKOPEDIA_API_ENDPOINT } from '../constants';

interface IPageInfo {
  pageid: number;
  ns: number;
  title: string;
}

async function searchByParams(
  params: Record<string, string>,
  result: Array<IWikiQueryResponse<'categorymembers', IPageInfo[]>>
): Promise<Array<IWikiQueryResponse<'categorymembers', IPageInfo[]>>> {
  const searchString = makeSearch(params);

  try {
    const response = await Axios.get<
      never,
      AxiosResponse<IWikiQueryResponse<'categorymembers', Array<IPageInfo>>>
    >(`${MRAKOPEDIA_API_ENDPOINT}?${searchString}`).then((res) => res.data);
    if (response.continue) {
      return searchByParams(
        { ...params, cmcontinue: response.continue.cmcontinue },
        [...result, response]
      );
    } else {
      return [...result, response];
    }
  } catch (err) {
    throw new global.Error('Failed to fetch pages');
  }
}

async function preparePages(params: Record<string, string>) {
  const results = await searchByParams(params, []);
  return results
    .map(({ query: { categorymembers } }) => categorymembers)
    .map((categoryMembers) => categoryMembers.map(({ title }) => title))
    .map((titles) => titles.map(makePageResponse))
    .reduce((acc, pageResponses) => [...acc, ...pageResponses], []);
}

export const getPagesByCategoryTitle = (
  request: NowRequest,
  response: NowResponse
) => {
  const title = stringify(request.query.title);

  if (!title) {
    return response
      .status(404)
      .json(Error('NOT_FOUND', STATUS_CODES[404] ?? ''));
  }

  const params: Record<string, string> = {
    action: 'query',
    list: 'categorymembers',
    cmtitle: `Category:${encodeURIComponent(title)}`,
    cmlimit: '500',
    format: 'json',
  };

  preparePages(params)
    .then((pageResponses) => {
      return response.json(pageResponses.sort(makeSortFnBy('title')));
    })
    .catch(() => {
      return response
        .status(500)
        .json(
          Error(
            'FAILED_TO_TO_FETCH_PAGES_BY_CATEGORY',
            `Failed to fetch pages by category ${title}`
          )
        );
    });
};
