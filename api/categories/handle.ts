import { NowResponse } from '@vercel/node';
import Axios, { AxiosResponse } from 'axios';
import { makeSearch, Error } from '../../app/utils';
import { MRAKOPEDIA_API_ENDPOINT } from '../../app/constants';
import { IWikiQueryResponse } from '../../app/IWikiQueryResponse';

interface ICategoryEntry {
  '*': string;
}

export const handle = (_: unknown, response: NowResponse) => {
  const params: Record<string, string> = {
    action: 'query',
    format: 'json',
    list: 'allcategories',
    // Maximum allowed
    aclimit: '500',
  };

  const searchString = makeSearch(params);

  Axios.get<
    never,
    AxiosResponse<IWikiQueryResponse<'allcategories', Array<ICategoryEntry>>>
  >(`${MRAKOPEDIA_API_ENDPOINT}?${searchString}`)
    .then((res) =>
      res.data.query.allcategories.map(({ '*': entry }) => ({
        title: entry,
        url: `/api/categories/${encodeURIComponent(entry)}`,
      }))
    )
    .then((entries) => {
      response.json(entries);
    })
    .catch(() => {
      response
        .status(500)
        .json(Error('FAILED_GET_CATEGORIES', 'Categories reqest failed'));
    });
};
