const isAbortError = (error) => {
  return error && error.name === 'AbortError';
};

const handleResponse = async (response) => {
  const ok = response.ok;
  const result = await response.json();
  if (ok) {
    return result;
  }
  throw result;
};

const neverResolve = () => {
  return new Promise(() => {});
};

export const ApiCall = (abortController) => {
  const withoutBody = (method) => async (url) => {
    try {
      const response = await fetch(url, {
        method,
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'follow',
        signal: abortController.signal,
      });
      return handleResponse(response);
    } catch (error) {
      if (isAbortError(error)) {
        return neverResolve();
      }
      throw error;
    }
  };

  const withBody = (method) => async (url, params) => {
    const urlSearchParams = Object.entries(params).reduce(
      (urlSearchParams, [key, value]) => {
        urlSearchParams.append(key, String(value));
        return urlSearchParams;
      },
      new URLSearchParams()
    );
    try {
      const response = await fetch(url, {
        method,
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'follow',
        body: urlSearchParams,
        signal: abortController.signal,
      });
      return handleResponse(response);
    } catch (error) {
      if (isAbortError(error)) {
        return neverResolve();
      }
      throw error;
    }
  };

  return {
    get: withoutBody('GET'),
    post: withBody('POST'),
    delete: withoutBody('DELETE'),
  };
};
