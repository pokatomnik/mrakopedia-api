import { RouteHandler } from '../../../app/RouteHandler';
import { getPictureOfPage } from '../../../app/controllers';

export default new RouteHandler()
  .handleMethod('GET', getPictureOfPage)
  .getHandler();
