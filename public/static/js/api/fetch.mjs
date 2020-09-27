const handleResponse = async (response) => {
  const ok = response.ok;
  const result = await response.json();
  if (ok) {
    return result;
  }
  throw result;
};

export const ApiCall = () => {
  const withoutBody = (method) => async (url) => {
    const response = await fetch(url, {
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
      method,
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow',
      body: urlSearchParams,
    });
    return handleResponse(response);
  };

  return {
    get: withoutBody('GET'),
    post: withBody('POST'),
    delete: withoutBody('DELETE'),
  };
};
