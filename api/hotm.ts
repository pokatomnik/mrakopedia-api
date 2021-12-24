import { RouteHandler } from '../app/RouteHandler';
import { getHOTM } from '../app/controllers';
import { withCors } from '../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getHOTM)
  .getHandler(withCors);
