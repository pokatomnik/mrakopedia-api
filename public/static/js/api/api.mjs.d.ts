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
  getCategoriesByPage: (pageName: string) => Promise<Array<ICategory>>;
  getPage: (pageName: string) => Promise<string>;
  getPagesByCategory: (categoryName: string) => Promise<Array<IPage>>;
  getRelated: (pageName: string) => Promise<Array<IPage>>;
  search: (searchInput) => Promise<Array<IPage>>;
  getSourceUrl: (pageName: string) => Promise<ISourceUrl>;
  getStoriesOfMonth: () => Promise<Array<IPage>>;
}

export function useApi(): IApi;
