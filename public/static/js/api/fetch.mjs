import { TOKEN_KEY } from '../utils/auth/auth.mjs';

const handleResponse = async (response) => {
  const ok = response.ok;
  const result = await response.json();
  if (ok) {
    return result;
  }
  throw result;
};

export const ApiCall = (token) => {
  const headers = token ? { [TOKEN_KEY]: token } : {};

  const withoutBody = (method) => async (url) => {
    const response = await fetch(url, {
      headers,
      method,
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow',
    });
    return handleResponse(response);
  };

  const withBody = (method) => async (url, params) => {
    const urlSearchParams = Object.entries(params).reduce(
      (urlSearchParams, [key, value]) => {
        urlSearchParams.append(key, String(value));
        return urlSearchParams;
      },
      new URLSearchParams()
    );
    const response = await fetch(url, {
      headers,
      method,
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow',
      body: urlSearchParams,
    });
    return handleResponse(response);
  };

  const get = withoutBody('GET');
  const post = withBody('POST');

  return { get, post };
};
