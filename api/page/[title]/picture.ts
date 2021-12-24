import { RouteHandler } from '../../../app/RouteHandler';
import { getPictureOfPage } from '../../../app/controllers';
import { withCors } from '../../../app/api-middleware';

export default new RouteHandler()
  .handleMethod('GET', getPictureOfPage)
  .getHandler(withCors);
