import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, makePageResponse, makeSortFnBy } from '../utils';
import { wiki } from '../Wiki';

export const searchByString = (req: NowRequest, res: NowResponse) => {
  const query = stringify(req.query.query);
  if (!query) {
    return res.json([]);
  }

  wiki
    .search(query)
    .then((result) => result.results)
    .then((titles) => {
      return titles.map(makePageResponse);
    })
    .then((results) => {
      return res.json(results.sort(makeSortFnBy('title')));
    })
    .catch(() => {
      return res
        .status(500)
        .json(Error('FAILED_SEARCH_RESPONSE', 'Search failed'));
    });
};
