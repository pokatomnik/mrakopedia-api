import { NowResponse } from '@vercel/node';
import Axios, { AxiosResponse } from 'axios';
import { MRAKOPEDIA_ORIGIN } from '../constants';
import { STATUS_CODES } from 'http';
import { Error } from '../utils';
import cheerio from 'cheerio';

interface VotedInfo {
  rating: number;
  voted: number;
}

type VotedResponse = Record<string, VotedInfo>;

export async function getRating(_: unknown, response: NowResponse) {
  const ratingUrl = `${MRAKOPEDIA_ORIGIN}/wiki/${encodeURIComponent(
    'Рейтинг:Общий_рейтинг'
  )}`;

  let html: string = '';
  try {
    html = (await Axios.get<unknown, AxiosResponse<string>>(ratingUrl)).data;
  } catch (e) {
    return response
      .status(500)
      .json(Error('ERROR_FETCHING_DATA', STATUS_CODES[500] ?? ''));
  }

  try {
    const $ = cheerio.load(html);

    const rows = $('table tr');

    const ratingTable: VotedResponse = {};

    for (let i = 1; i < rows.length; ++i) {
      const row = rows[i];
      const [tdTitle, tdRating, tdVoted] = row.children;
      const title = $(tdTitle).text();
      const rating = Number.parseInt($(tdRating).text());
      const voted = Number.parseInt($(tdVoted).text());
      ratingTable[title] = { rating, voted };
    }

    response.status(200).json(ratingTable);
  } catch (e) {
    response.status(500).json(Error('PARSE_ERROR', STATUS_CODES[500] ?? ''));
  }
}
