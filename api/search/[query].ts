import { RouteHandler } from '../../app/RouteHandler';
import { searchByString } from '../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', searchByString)
  .getHandler();
