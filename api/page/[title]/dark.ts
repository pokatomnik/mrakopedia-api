import { RouteHandler } from '../../../app/RouteHandler';
import { makeGetPageByTitleHandler } from '../../../app/controllers';
import { withCors } from '../../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', makeGetPageByTitleHandler(true))
  .getHandler(withCors);
