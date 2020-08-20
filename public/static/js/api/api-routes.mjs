export const apiPage = (pageName) => `/api/page/${pageName}`;
export const apiSearch = (searchInput) => `/api/search/${searchInput}`;
export const apiCategories = () => '/api/categories';
export const apiPagesByCategory = (categoryName) =>
  `${apiCategories()}/${categoryName}`;
export const apiStoriesOfMonth = () => `/api/hotm`;
