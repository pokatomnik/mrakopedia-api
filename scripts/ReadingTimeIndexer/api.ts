import fetch, { Response } from 'node-fetch';
import * as cheerio from 'cheerio';
import type { ICategory, IPage } from './domain';

async function fetchAndHandleError(url: string): Promise<Response> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response;
}

async function fetchCategories(): Promise<Array<ICategory>> {
  const response = await fetchAndHandleError(
    'https://mrakopedia.tk/api/categories'
  );
  return response.json();
}

async function getPagesByCategoryUrl(
  categoryUrl: string
): Promise<Array<IPage>> {
  const response = await fetchAndHandleError(
    `https://mrakopedia.tk${categoryUrl}`
  );
  return response.json();
}

async function fetchPage(name: string): Promise<string> {
  const response = await fetchAndHandleError(
    `https://mrakopedia.tk/api/page/${encodeURIComponent(name)}`
  );
  return await response.text();
}

async function withRetry<T>(promiseFactory: () => Promise<T>, times: number) {
  let lastError: Error | null = null;
  let counter = times;
  while (counter)
    try {
      return await promiseFactory();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error('Failed to fetch');
      --counter;
    }
  throw lastError;
}

export async function fetchPageTextAndRetry(name: string) {
  const html = await withRetry(() => fetchPage(name), 3);
  const $ = cheerio.load(html);
  return $('body').text();
}

export function getReadableCharacters(characters: string) {
  const cleanUpRegex = /[\s.,:?!—-]/gi;

  const cleanString = characters.replace(cleanUpRegex, '');
  return Math.ceil(cleanString.length);
}

export async function getAllCategories(): Promise<Array<ICategory>> {
  return await withRetry<Array<ICategory>>(() => fetchCategories(), 3);
}

export async function getAllPagesByCategoryUrl(categoryUrl: string) {
  return await withRetry<Array<IPage>>(
    () => getPagesByCategoryUrl(categoryUrl),
    3
  );
}

export function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}
