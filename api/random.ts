import { RouteHandler } from '../app/RouteHandler';
import { getRandomPage } from '../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getRandomPage)
  .getHandler();
