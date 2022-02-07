import { join } from 'path';

import { LogFormatter } from './LogFormatter';
import { PagesIndexer } from './PagesIndexer';

const pagesIndexer = new PagesIndexer({
  delayMilliseconds: 3000,
  logger: new LogFormatter('PageIndexer'),
  makeDelayEvery: 5,
  retriesNumber: 3,
  sourceFilePath: join(process.cwd(), 'public/static/files/pages-index.json'),
  flushEvery: 5,
});

pagesIndexer
  .start()
  .then(() => {
    console.log('Indexing done');
  })
  .catch((err) => {
    console.error(`Indexing finished with error ${err.message}`);
  });
