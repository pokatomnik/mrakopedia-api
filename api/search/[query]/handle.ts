import { NowRequest, NowResponse } from '@vercel/node';
import { stringify } from '../../../app/utils';
import { wiki } from '../../../app/Wiki';

interface IPage {
  title: string;
  url: string;
}

export const handle = (req: NowRequest, res: NowResponse) => {
  const query = stringify(req.query.query);
  if (!query) {
    res.json([]);
    return;
  }

  wiki
    .search(query)
    .then((result) => result.results)
    .then((titles) => {
      return titles.map(
        (title): IPage => ({
          title,
          url: `/api/page/${title}`,
        })
      );
    })
    .then((results) => {
      res.json(results);
    });
};
