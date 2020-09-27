import { RouteHandler } from '../../../app/RouteHandler';
import { getSourceOfPage } from '../../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getSourceOfPage)
  .getHandler();
