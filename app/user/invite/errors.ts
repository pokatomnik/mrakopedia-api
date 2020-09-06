import { Error } from '../../utils';

export const ADD_INVITE_ERROR = Error(
  'ERROR_FAILED_ADD_INVITE',
  'Failed to add a new invintation'
);
export const GET_INVITES_ERROR = Error(
  'ERROR_FAILED_TO_GET_INVITES',
  'Failed to get user invites'
);
export const NO_INVITE_ID = Error('NO_INVITE_ID', 'No Invite ID');
export const REMOVE_INVITE_FAILED = Error(
  'REMOVE_INVITE FAILED',
  'Failed to remove invite'
);
