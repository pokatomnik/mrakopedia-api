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

interface IFavorite {
  isFavorite: boolean;
  title: string;
}

interface IInvite {
  id: string;
  uuid: string;
  invitingUserId: string;
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
  getAllFavorites: () => Promise<Array<IPage>>;
  getRandom: () => Promise<IPage>;
  isFavorite: (title: string) => Promise<IFavorite>;
  addToFavorites: (title: string) => Promise<void>;
  removeFromFavorites: (title: string) => Promise<void>;
  invite: () => Promise<void>;
  getMyInvites: () => Promise<Array<IInvite>>;
}

export function useApi(): IApi;
