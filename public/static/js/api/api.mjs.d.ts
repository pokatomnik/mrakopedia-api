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
  invitingUserId: string;
}

interface IInviteExists {
  invite: string;
  exists: boolean;
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
  invite: () => Promise<IInvite>;
  getMyInvites: () => Promise<Array<IInvite>>;
  removeInviteById: (inviteId: string) => Promise<void>;
  checkInvite: (inviteId: string) => Promise<IInviteExists>;
  register: (
    inviteId: string,
    userName: string,
    email: string,
    passwordHash: string
  ) => Promise<void>;
}

export function useApi(): IApi;
