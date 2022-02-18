import { NowResponse } from '@vercel/node';
import Axios, { AxiosResponse } from 'axios';
import { MRAKOPEDIA_ORIGIN } from '../constants';
import { STATUS_CODES } from 'http';
import { Error } from '../utils';
import cheerio from 'cheerio';
import { readFile } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import {
  IPageMetaInfo,
  IVotedInfo,
  IReadableCharactersInfo,
} from '../IPagesMetaInfo';

async function measureTime<R>(fn: () => Promise<R>) {
  const start = Date.now();
  const result = await fn();
  const end = Date.now();
  return { result, took: (end - start) / 1000 };
}

function readFilePromisified(path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    readFile(path, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.toString('utf-8'));
    });
  });
}

function getRatingIndex(html: string): Record<string, IVotedInfo> {
  const ratingIndex: Record<string, IVotedInfo> = {};
  const $ = cheerio.load(html);
  const rows = $('table tr');
  for (let i = 1; i < rows.length; ++i) {
    const row = rows[i];
    const [tdTitle, tdRating, tdVoted] = row.children;
    const title = $(tdTitle).text();
    const rating = Number.parseInt($(tdRating).text());
    const voted = Number.parseInt($(tdVoted).text());
    ratingIndex[title] = { rating, voted };
  }
  return ratingIndex;
}

function getReadableCharactersIndex(
  jsonString: string
): Record<string, IReadableCharactersInfo> {
  return JSON.parse(jsonString);
}

function aggregate(
  ratingIndex: Record<string, IVotedInfo>,
  readableCharactersIndex: Record<string, IReadableCharactersInfo>
): Record<string, Partial<IPageMetaInfo>> {
  const aggregated: Record<string, Partial<IPageMetaInfo>> = {};
  const aggregatedKeys = Object.keys(ratingIndex).concat(
    Object.keys(readableCharactersIndex)
  );
  for (const key of aggregatedKeys) {
    aggregated[key] = {
      rating: ratingIndex[key]?.rating,
      voted: ratingIndex[key]?.voted,
      readableCharacters: readableCharactersIndex[key]?.readableCharacters,
    };
  }
  return aggregated;
}

export async function getPagesMataInfo(_: unknown, response: NowResponse) {
  const ratingUrl = `${MRAKOPEDIA_ORIGIN}/wiki/${encodeURIComponent(
    'Рейтинг:Общий_рейтинг'
  )}`;

  let html: string = '';
  let json: string = '{}';
  let fetchingTook = 0;
  try {
    const result = await measureTime(() =>
      Promise.all([
        Axios.get<unknown, AxiosResponse<string>>(ratingUrl).then(
          (response) => response.data
        ),
        readFilePromisified(join(cwd(), 'app/pages-index.json')),
      ])
    );
    [html, json] = result.result;
    fetchingTook = result.took;
  } catch (e) {
    return response
      .status(500)
      .json(Error('ERROR_FETCHING_DATA', STATUS_CODES[500] ?? ''));
  }

  try {
    const result = await measureTime(() => {
      return Promise.resolve(
        aggregate(getRatingIndex(html), getReadableCharactersIndex(json))
      );
    });

    const pagesMetaInfoIndex = result.result;
    const parsingTook = result.took;

    response.setHeader('X-Fetching-Took', fetchingTook);
    response.setHeader('X-Parsing-Took', parsingTook);
    response.status(200).json(pagesMetaInfoIndex);
  } catch (e) {
    response.status(500).json(Error('PARSE_ERROR', STATUS_CODES[500] ?? ''));
  }
}
