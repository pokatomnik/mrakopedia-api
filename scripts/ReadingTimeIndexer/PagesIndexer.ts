import { readFile, writeFile } from 'fs/promises';
import type { IBufferIndex, ICategory, IPageMetaInfo } from './domain';
import {
  fetchPageTextAndRetry,
  getReadableCharacters,
  getAllCategories,
  getAllPagesByCategoryUrl,
  delay,
} from './api';
import type { ILogger } from './ILogger';

interface IPageIndexerOptions {
  readonly retriesNumber: number;
  readonly sourceFilePath: string;
  readonly logger: ILogger;
  readonly makeDelayEvery: number;
  readonly delayMilliseconds: number;
  readonly flushEvery: number;
}

export class PagesIndexer {
  private readonly pageMetaInfoByTitle = new Map<string, IPageMetaInfo>();

  public constructor(private readonly options: IPageIndexerOptions) {}

  private async processPage(name: string) {
    try {
      this.options.logger.log(`Start indexing page ${name}`);
      const existingEntry = this.pageMetaInfoByTitle.get(name);
      if (existingEntry?.readableCharacters !== undefined) {
        // Entry already exists
        return;
      }

      const text = await fetchPageTextAndRetry(name);
      const readableCharacters = getReadableCharacters(text);
      this.pageMetaInfoByTitle.set(name, { readableCharacters });
      this.options.logger.log(`Done indexing page ${name}`);
    } catch (e) {
      this.options.logger.log(`Failed to index page ${name}`);
    }
  }

  private async flush() {
    this.options.logger.log(`Trying to flush data`);
    const dataToFlush: IBufferIndex = {};
    for (const [name, metaInfo] of this.pageMetaInfoByTitle.entries()) {
      dataToFlush[name] = metaInfo;
    }
    try {
      await writeFile(this.options.sourceFilePath, JSON.stringify(dataToFlush));
      this.options.logger.log(
        `Successfully flushed data to ${this.options.sourceFilePath}`
      );
    } catch (e) {
      this.options.logger.warn(
        `Failed to flush file ${this.options.sourceFilePath}`
      );
    }
  }

  private async init(): Promise<void> {
    this.options.logger.log(
      `Initialization started, source file: ${this.options.sourceFilePath}`
    );
    let buffer: Buffer | null = null;
    let bufferAsString: string | null = null;

    try {
      buffer = await readFile(this.options.sourceFilePath);
    } catch (e) {
      this.options.logger.warn(
        `No index file (${this.options.sourceFilePath}). Starting indexing from scratch`
      );
    }

    try {
      bufferAsString = buffer?.toString() ?? null;
      if (bufferAsString === null) {
        return;
      }
      const indexedData: IBufferIndex = JSON.parse(bufferAsString);
      for (const [pageName, pageMetaInfo] of Object.entries(indexedData)) {
        if (pageMetaInfo) {
          this.pageMetaInfoByTitle.set(pageName, pageMetaInfo);
        }
      }
      this.options.logger.log(
        `Initialization finished from file ${this.options.sourceFilePath}`
      );
    } catch (e) {
      throw new Error(
        `Failed to parse indexed data. Remove ${this.options.sourceFilePath} first`
      );
    }
  }

  public async indexPageByName(name: string) {
    await this.init();
    await this.processPage(name);
    await this.flush();
  }

  public async indexAllPages() {
    await this.init();
    let categories: Array<ICategory> = [];

    try {
      this.options.logger.log(`Trying to fetch categories`);
      categories = await getAllCategories();
      this.options.logger.log(
        `Finished fetching categories. Total: ${categories.length}`
      );
    } catch (e) {
      this.options.logger.error(`Fatal: failed to get categories`);
      throw e;
    }

    let pagesProcessed = 0;

    for (const category of categories) {
      try {
        this.options.logger.log(`Entering ${category.title} category`);
        const pagesOfCategory = await getAllPagesByCategoryUrl(category.url);
        for (const pageOfCategory of pagesOfCategory) {
          await this.processPage(pageOfCategory.title);
          ++pagesProcessed;
          if (pagesProcessed % this.options.makeDelayEvery === 0) {
            this.options.logger.log(`Making a short pause:)`);
            await delay(this.options.delayMilliseconds);
            this.options.logger.log(`Go on!`);
          }
          if (pagesProcessed % this.options.flushEvery === 0) {
            await this.flush();
          }
        }
        this.options.logger.log(`Category ${category.title} processed`);
      } catch (e) {
        this.options.logger.log(`Failed to process category ${category.title}`);
      }
    }
  }
}
