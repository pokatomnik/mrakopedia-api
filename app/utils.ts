import { Page as WikiJSPage } from 'wikijs';
import { wiki } from './Wiki';

export const stringify = <T extends unknown>(
  input: T | Array<T> | undefined,
  toString: (value: T) => string = String
) => {
  if (input === undefined) {
    return '';
  }

  if (Array.isArray(input) && input.length === 0) {
    return '';
  }

  return Array.isArray(input) ? toString(input[0]) : toString(input);
};

export const makeSearch = <T extends Record<string, string | undefined>>(
  params: T
) => {
  return Object.entries(params).reduce((searchString, [key, value]) => {
    if (value === undefined) {
      return searchString;
    }
    return searchString + `&${key}=${value}`;
  }, '');
};

export const Error = (id: string, message: string) => ({
  error: id,
  errorMessage: message,
});

export interface IPageResponse {
  title: string;
  url: string;
}

export const makePageResponse = (title: string): IPageResponse => ({
  title,
  url: `/api/page/${encodeURIComponent(title)}`,
});

export const makeCategoryResponse = (categoryName: string) => ({
  title: categoryName,
  url: `/api/categories/${encodeURIComponent(categoryName)}`,
});

export const capitalize = (input: string) => {
  if (input.length === 0) {
    return input;
  }

  return `${input.slice(0, 1).toLocaleUpperCase()}${input.slice(1)}`;
};

export const fetchPageByName = async (name: string): Promise<WikiJSPage> => {
  const pageError = new global.Error('No such page');
  let page: WikiJSPage | undefined = undefined;

  try {
    page = await wiki.page(name);
  } catch {
    throw pageError;
  }

  if (page === undefined) {
    throw pageError;
  }

  return page;
};
