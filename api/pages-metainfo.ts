import { RouteHandler } from '../app/RouteHandler';
import { withCors } from '../app/api-middleware';
import { getPagesMataInfo } from '../app/controllers/get-pages-mata.info';

export default new RouteHandler()
  .handleMethod('GET', getPagesMataInfo)
  .getHandler(withCors);
