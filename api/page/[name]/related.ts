import { NowRequest, NowResponse } from '@vercel/node';
import { stringify, Error, makePageResponse } from '../../../app/utils';
import { wiki } from '../../../app/Wiki';

const FETCH_LINKS_FAILED_ERROR = Error(
  'LINKS_FETCH_FAILED',
  'Failed to fetch links'
);

export default async (req: NowRequest, res: NowResponse) => {
  const name = stringify(req.query.name);
  if (!name) {
    res.status(404).json(Error('NO_PAGE_NAME', 'Missing page name'));
    return;
  }

  let links: Array<string> | undefined = undefined;
  try {
    links = await wiki.page(name).then((page) => page.links());
  } catch {
    res.status(500).json(FETCH_LINKS_FAILED_ERROR);
    return;
  }

  if (links === undefined) {
    res.status(500).json(FETCH_LINKS_FAILED_ERROR);
    return;
  }

  res.json(links.map(makePageResponse));
};
