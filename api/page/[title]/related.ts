import { RouteHandler } from '../../../app/RouteHandler';
import { getRelatedPagesOfPage } from '../../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getRelatedPagesOfPage)
  .getHandler();
