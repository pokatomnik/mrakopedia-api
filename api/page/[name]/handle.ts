import { NowRequest, NowResponse } from '@vercel/node';
import { STATUS_CODES } from 'http';
import { stringify } from '../../../app/utils';
import { Page } from '../../../app/page';
import { wiki } from '../../../app/Wiki';

export const handle = (req: NowRequest, res: NowResponse) => {
  const name = stringify(req.query.name);
  if (!name) {
    res.status(404).send(Page(STATUS_CODES[404] ?? '', ''));
    return;
  }

  wiki
    .page(name)
    .then((result) => {
      return result.html();
    })
    .then((html) => {
      res.send(Page(name, html));
    });
};
