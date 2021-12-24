import { NowResponse, NowRequest } from '@vercel/node';

export function applyMiddlewares(
  ...middlewares: Array<
    (request: NowRequest, response: NowResponse) => Promise<boolean>
  >
) {
  return (
    initialHandler: (request: NowRequest, response: NowResponse) => void
  ) => {
    const handler = async (request: NowRequest, response: NowResponse) => {
      for (const middleware of middlewares) {
        const shouldProceed = await middleware(request, response);
        if (!shouldProceed) {
          return;
        }
      }
      return initialHandler(request, response);
    };
    return (request: NowRequest, response: NowResponse) => {
      handler(request, response);
    };
  };
}
