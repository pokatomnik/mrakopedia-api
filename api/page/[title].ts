import { NowRequest, NowResponse } from '@vercel/node';
import { Page as PageResponse } from 'wikijs';
import { STATUS_CODES } from 'http';
import { stringify, allowCors } from '../../app/utils';
import { Page } from '../../app/page';
import { wiki } from '../../app/Wiki';

const ERROR_404 = STATUS_CODES[404] ?? '';
const ERROR_500 = STATUS_CODES[500] ?? '';

const page404 = new Page(ERROR_404, ERROR_404, { simpleTitle: true });
const page500 = new Page(ERROR_500, ERROR_500, { simpleTitle: true });

export default allowCors(async (req: NowRequest, res: NowResponse) => {
  const title = stringify(req.query.title);
  if (!title) {
    res.status(404).send(page404.render());
    return;
  }

  let page: PageResponse | null = null;
  try {
    page = await wiki.page(title);
  } catch {
    res.status(404).send(page404.render());
    return;
  }

  let html: string | null = null;
  try {
    html = await page.html();
  } catch (err) {
    res.status(500).send(page500.render());
    return;
  }

  res.send(new Page(title, html).render());
});
