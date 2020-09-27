import { RouteHandler } from '../app/RouteHandler';
import { getAllCategories } from '../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getAllCategories)
  .getHandler();
