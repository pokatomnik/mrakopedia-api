interface IPage {
  title: string;
  url: string;
}

interface ICategory {
  title: string;
  url: string;
}

interface ISourceUrl {
  title: string;
  url: string;
}

interface IApi {
  getCategories: () => Promise<Array<ICategory>>;
  getCategoriesByPage: (title: string) => Promise<Array<ICategory>>;
  getPage: (title: string) => Promise<string>;
  getPagesByCategory: (title: string) => Promise<Array<IPage>>;
  getRelated: (title: string) => Promise<Array<IPage>>;
  search: (searchInput) => Promise<Array<IPage>>;
  getSourceUrl: (title: string) => Promise<ISourceUrl>;
  getStoriesOfMonth: () => Promise<Array<IPage>>;
}

export function useApi(): IApi;
