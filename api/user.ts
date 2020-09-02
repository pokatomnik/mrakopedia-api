import { NowRequest, NowResponse } from '@vercel/node';
import { actionMap } from '../app/user';
import { stringify } from '../app/utils';

export default (request: NowRequest, response: NowResponse) => {
  const { action: actionRaw } = request.query;
  const action = stringify(actionRaw);
  const handler = actionMap[action];
  if (handler) {
    return handler(request, response);
  } else {
    return response.json({
      availableActions: Object.keys(actionMap),
    });
  }
};
