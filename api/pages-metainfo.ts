import { RouteHandler } from '../app/RouteHandler';
import { withCors } from '../app/api-middleware';
import { getPagesMatainfo } from '../app/controllers/get.pages-matainfo';

export default new RouteHandler()
  .handleMethod('GET', getPagesMatainfo)
  .getHandler(withCors);
