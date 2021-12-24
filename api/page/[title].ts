import { RouteHandler } from '../../app/RouteHandler';
import { getPageByTitle } from '../../app/controllers';
import { withCors } from '../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getPageByTitle)
  .getHandler(withCors);
