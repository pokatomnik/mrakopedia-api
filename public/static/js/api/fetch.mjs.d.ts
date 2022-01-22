interface IApiCall {
  get: <T>(url: string) => Promise<T>;
  post: <T, D>(url: string, data: D) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
}

export function ApiCall(abortController: AbortController): IApiCall;
