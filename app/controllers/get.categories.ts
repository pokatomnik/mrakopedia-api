import { NowResponse } from '@vercel/node';
import Axios, { AxiosResponse } from 'axios';
import {
  makeSearch,
  Error,
  makeCategoryResponse,
  makeSortFnBy,
} from '../utils';
import { MRAKOPEDIA_API_ENDPOINT } from '../constants';
import { IWikiQueryResponse } from '../IWikiQueryResponse';

interface ICategoryEntry {
  '*': string;
}

// This are the hardcoded page titles which should not be sent
const exceptions = [
  'крипи',
  'шаблоны',
  'шаблоны:внутренние ссылки',
  'шаблоны:форматирование',
  'шаблоны для документирования шаблонов',
  'википедия:шаблоны для документирования шаблонов',
  'шаблоны для шаблонов',
  'документация шаблонов',
  'страницы, использующие повторяющиеся аргументы в вызовах шаблонов',
  'страницы со слишком большим количеством вызовов ресурсоёмких функций',
  'страницы, использующие недопустимые самозакрывающиеся html-теги',
  'страницы с неработающими файловыми ссылками',
  'страницы с опросами',
];

export const getAllCategories = (_: unknown, response: NowResponse) => {
  const params: Record<string, string> = {
    action: 'query',
    format: 'json',
    list: 'allcategories',
    // Maximum allowed
    aclimit: '500',
  };

  const searchString = makeSearch(params);

  Axios.get<
    never,
    AxiosResponse<IWikiQueryResponse<'allcategories', Array<ICategoryEntry>>>
  >(`${MRAKOPEDIA_API_ENDPOINT}?${searchString}`)
    .then((res) => res.data.query.allcategories.map(({ '*': entry }) => entry))
    .then((entryNames) =>
      entryNames.filter(
        (entryName) => !exceptions.includes(entryName.toLocaleLowerCase())
      )
    )
    .then((entries) => entries.map(makeCategoryResponse))
    .then((entries) => {
      return response.json(entries.sort(makeSortFnBy('title')));
    })
    .catch(() => {
      return response
        .status(500)
        .json(Error('FAILED_GET_CATEGORIES', 'Categories reqest failed'));
    });
};
