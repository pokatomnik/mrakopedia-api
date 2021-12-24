import { RouteHandler } from '../../app/RouteHandler';
import { getPagesByCategoryTitle } from '../../app/controllers';
import { withCors } from '../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getPagesByCategoryTitle)
  .getHandler(withCors);
