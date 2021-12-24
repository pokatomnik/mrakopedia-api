import { RouteHandler } from '../../app/RouteHandler';
import { searchByString } from '../../app/controllers';
import { withCors } from '../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', searchByString)
  .getHandler(withCors);
