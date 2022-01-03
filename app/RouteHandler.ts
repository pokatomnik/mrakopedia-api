import { NowApiHandler, NowRequest, NowResponse } from '@vercel/node';
import { Error } from './utils';

export class RouteHandler {
  private readonly methods = new Map<string, NowApiHandler>();

  private defaultHandler?: NowApiHandler;

  private static defaultHandler(_: unknown, response: NowResponse) {
    return response.status(404).json(Error('NOT_FOUND', 'Resource not found'));
  }

  public handleMethod(method: string, handler: NowApiHandler) {
    this.methods.set(method, handler);
    return this;
  }

  public setDefaultHandler(defaultHandler: NowApiHandler) {
    this.defaultHandler = defaultHandler;
  }

  private handleDefault(request: NowRequest, response: NowResponse) {
    return (this.defaultHandler ?? RouteHandler.defaultHandler)(
      request,
      response
    );
  }

  public getHandler(
    ...middlewares: Array<(handler: NowApiHandler) => NowApiHandler>
  ): NowApiHandler {
    const handler: NowApiHandler = (request, response) => {
      const method = request.method;
      if (!method) {
        return this.handleDefault(request, response);
      }

      const handler = this.methods.get(method);
      if (!handler) {
        return this.handleDefault(request, response);
      }

      return handler(request, response);
    };

    return middlewares.reduce((currentHandler, currentMiddleware) => {
      return currentMiddleware(currentHandler);
    }, handler);
  }
}
