import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, makePageResponse, makeSearch } from '../utils';
import { wiki } from '../Wiki';
import Axios, { AxiosResponse } from 'axios';
import { IWikiQueryResponse } from '../IWikiQueryResponse';
import { MRAKOPEDIA_API_ENDPOINT } from '../constants';
import uniqBy from 'lodash/uniqBy';
import identity from 'lodash/identity';

function searchByTitle(query: string): Promise<Array<string>> {
  return wiki.search(query).then((result) => result.results);
}

async function searchByText(query: string): Promise<Array<string>> {
  const params: Record<string, string> = {
    action: 'query',
    list: 'search',
    srwhat: 'text',
    format: 'json',
    srlimit: '500',
    srsearch: encodeURIComponent(query),
  };
  const apiQuery = makeSearch(params);
  const result = await Axios.get<
    unknown,
    AxiosResponse<IWikiQueryResponse<'search', Array<{ title: string }>>>
  >(`${MRAKOPEDIA_API_ENDPOINT}?${apiQuery}`);

  return result.data.query.search.map((it) => it.title);
}

export async function searchByString(req: NowRequest, res: NowResponse) {
  const query = stringify(req.query.query);
  if (!query) {
    return res.json([]);
  }

  try {
    const [pagesByTitle, pagesByText] = await Promise.all([
      searchByTitle(query),
      searchByText(query),
    ]);

    const joinedResults = uniqBy(pagesByTitle.concat(pagesByText), identity);
    const pages = joinedResults.map(makePageResponse);
    return res.json(pages);
  } catch (e) {
    return res
      .status(500)
      .json(Error('FAILED_SEARCH_RESPONSE', 'Search failed'));
  }
}
