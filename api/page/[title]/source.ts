import { RouteHandler } from '../../../app/RouteHandler';
import { getSourceOfPage } from '../../../app/controllers';
import { withCors } from '../../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getSourceOfPage)
  .getHandler(withCors);
