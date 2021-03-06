// Common URLs
export const apiPage = (title) => `/api/page/${title}`;
export const apiSearch = (searchInput) => `/api/search/${searchInput}`;
export const apiCategories = () => '/api/categories';
export const apiPagesByCategory = (title) => `${apiCategories()}/${title}`;
export const apiStoriesOfMonth = () => `/api/hotm`;
export const apiRelated = (title) => `/api/page/${title}/related`;
export const apiCategoriesByPage = (title) => `/api/page/${title}/categories`;
export const apiSourceUrl = (title) => `/api/page/${title}/source`;
export const apiRandom = () => `/api/random`;
