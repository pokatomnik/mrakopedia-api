interface IApiCall {
  get: <T>(url: string) => Promise<T>;
  post: <T, D>(url: string, data: D) => Promise<T>;
}

export function ApiCall(token?: string): IApiCall;
