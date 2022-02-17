import { RouteHandler } from '../app/RouteHandler';
import { withCors } from '../app/api-middleware';
import { getRating } from '../app/controllers/get.rating';

export default new RouteHandler()
  .handleMethod('GET', getRating)
  .getHandler(withCors);
