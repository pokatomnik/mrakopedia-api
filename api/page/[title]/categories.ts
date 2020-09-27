import { RouteHandler } from '../../../app/RouteHandler';
import { getCategoriesOfPage } from '../../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getCategoriesOfPage)
  .getHandler();
