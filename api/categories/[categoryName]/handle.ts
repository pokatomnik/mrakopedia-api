import { STATUS_CODES } from 'http';
import { NowRequest, NowResponse } from '@vercel/node';
import Axios, { AxiosResponse } from 'axios';
import {
  stringify,
  Error,
  makeSearch,
  makePageResponse,
} from '../../../app/utils';
import { IWikiQueryResponse } from '../../../app/IWikiQueryResponse';
import { MRAKOPEDIA_API_ENDPOINT } from '../../../app/constants';

interface IPageInfo {
  pageid: number;
  ns: number;
  title: string;
}

export const handle = (request: NowRequest, response: NowResponse) => {
  const categoryName = stringify(request.query.categoryName);

  if (!categoryName) {
    response.status(404).json(Error('NOT_FOUND', STATUS_CODES[404] ?? ''));
    return;
  }

  const params: Record<string, string> = {
    action: 'query',
    list: 'categorymembers',
    cmtitle: `Category:${encodeURIComponent(categoryName)}`,
    cmlimit: '500',
    format: 'json',
  };

  const searchString = makeSearch(params);
  console.log(`${MRAKOPEDIA_API_ENDPOINT}?${searchString}`);

  Axios.get<
    never,
    AxiosResponse<IWikiQueryResponse<'categorymembers', Array<IPageInfo>>>
  >(`${MRAKOPEDIA_API_ENDPOINT}?${searchString}`)
    .then((res) => res.data)
    .then((data) => data.query.categorymembers.map(({ title }) => title))
    .then((titles) => titles.map(makePageResponse))
    .then((pageResponses) => {
      response.json(pageResponses);
    })
    .catch(() => {
      response
        .status(500)
        .json(
          Error(
            'FAILED_TO_TO_FETCH_PAGES_BY_CATEGORY',
            `Failed to fetch pages by category ${categoryName}`
          )
        );
    });
};
