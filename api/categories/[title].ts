import { RouteHandler } from '../../app/RouteHandler';
import { getPagesByCategoryTitle } from '../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getPagesByCategoryTitle)
  .getHandler();
