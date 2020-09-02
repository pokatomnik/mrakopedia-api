import { NowRequest, NowResponse } from '@vercel/node';
import {
  stringify,
  Error,
  makePageResponse,
  makeSortFnBy,
} from '../../app/utils';
import { wiki } from '../../app/Wiki';

export default (req: NowRequest, res: NowResponse) => {
  const query = stringify(req.query.query);
  if (!query) {
    res.json([]);
    return;
  }

  wiki
    .search(query)
    .then((result) => result.results)
    .then((titles) => {
      return titles.map(makePageResponse);
    })
    .then((results) => {
      res.json(results.sort(makeSortFnBy('title')));
    })
    .catch(() => {
      res.status(500).json(Error('FAILED_SEARCH_RESPONSE', 'Search failed'));
    });
};
