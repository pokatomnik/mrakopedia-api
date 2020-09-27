import { RouteHandler } from '../app/RouteHandler';
import { getHOTM } from '../app/controllers';

export default new RouteHandler().handleMethod('GET', getHOTM).getHandler();
