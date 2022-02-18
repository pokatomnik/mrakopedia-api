import type { IReadableCharactersInfo } from '../../app/IPagesMetaInfo';

export interface IBufferIndex {
  [K: string]: IReadableCharactersInfo | undefined;
}

export interface ICategory {
  title: string;
  // `/api/categories/CATEGORY_NAME`
  url: string;
}

export interface IPage {
  title: string;
  // `/api/page/PAGE_NAME`
  url: string;
}
