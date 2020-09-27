import { RouteHandler } from '../../app/RouteHandler';
import { getPageByTitle } from '../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getPageByTitle)
  .getHandler();
