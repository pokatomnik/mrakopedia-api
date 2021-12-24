import { RouteHandler } from '../app/RouteHandler';
import { getRandomPage } from '../app/controllers';
import { withCors } from '../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getRandomPage)
  .getHandler(withCors);
