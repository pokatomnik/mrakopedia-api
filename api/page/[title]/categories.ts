import { RouteHandler } from '../../../app/RouteHandler';
import { getCategoriesOfPage } from '../../../app/controllers';
import { withCors } from '../../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getCategoriesOfPage)
  .getHandler(withCors);
