export const stringify = <T extends unknown>(
  input: T | Array<T>,
  toString: (value: T) => string = String
) => {
  if (input === undefined) {
    return '';
  }

  if (Array.isArray(input) && input.length === 0) {
    return '';
  }

  return Array.isArray(input) ? input.map(toString).join('') : toString(input);
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

interface IPageResponse {
  title: string;
  url: string;
}

export const makePageResponse = (title: string): IPageResponse => ({
  title,
  url: `/api/page/${encodeURIComponent(title)}`,
});
