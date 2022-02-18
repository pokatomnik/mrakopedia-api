import { join } from 'path';
import { argv } from 'process';

const args = argv.slice(2);

import { LogFormatter } from './LogFormatter';
import { PagesIndexer } from './PagesIndexer';

const pagesIndexer = new PagesIndexer({
  delayMilliseconds: 3000,
  logger: new LogFormatter('PageIndexer'),
  makeDelayEvery: 5,
  retriesNumber: 3,
  sourceFilePath: join(process.cwd(), 'app/pages-index.json'),
  flushEvery: 5,
});

const reindexPromise =
  args.length === 0
    ? pagesIndexer.indexAllPages()
    : args.length === 1
    ? pagesIndexer.indexPageByName(args[0])
    : (() => {
        throw new Error('Incorrect arguments');
      })();

reindexPromise
  .then(() => {
    console.log('Indexing done');
  })
  .catch((err) => {
    console.error(`Indexing finished with error ${err.message}`);
  });
