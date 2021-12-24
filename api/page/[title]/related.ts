import { RouteHandler } from '../../../app/RouteHandler';
import { getRelatedPagesOfPage } from '../../../app/controllers';
import { withCors } from '../../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getRelatedPagesOfPage)
  .getHandler(withCors);
