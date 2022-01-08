import { RouteHandler } from '../app/RouteHandler';
import { withCors } from '../app/api-middleware';
import { getConfiguration } from '../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getConfiguration)
  .getHandler(withCors);
