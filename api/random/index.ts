import { NowResponse } from '@vercel/node';
import { wiki } from '../../app/Wiki';
import { Error, makePageResponse } from '../../app/utils';

export default async (_: unknown, response: NowResponse) => {
  let randomPageTitles: Array<string> | undefined = undefined;
  try {
    randomPageTitles = await wiki.random(1);
  } catch {
    response
      .status(500)
      .json(Error('FAILED_GET_RANDOM_PAGE', 'Unable to get random page'));
    return;
  }

  if (randomPageTitles.length < 1) {
    response.status(404).json('No pages to get');
    return;
  }

  const firstRandom = randomPageTitles[0];

  response.json(makePageResponse(firstRandom));
};
