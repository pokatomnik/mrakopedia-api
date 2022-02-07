export interface IPageMetaInfo {
  readonly readableCharacters: number;
}

export interface IBufferIndex {
  [K: string]: IPageMetaInfo | undefined;
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
