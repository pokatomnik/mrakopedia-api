import { Error } from '../../utils';

export const INCOMPLETE_DATA_ERROR = Error(
  'INCOMPLETE_DATA',
  'Incomplete data'
);

export const INVITE_NOT_FOUND = Error('INVITE_NOT_FOUND', 'Invite not found');

export const REGISTER_DATABASE_ERROR = Error(
  'REGISTER_DATABASE_ERROR',
  'Database error during registration'
);

export const USER_EXISTS_ERROR = Error(
  'USER_ALREADY_EXISTS',
  'User with this email already exists'
);

export const ALREADY_EXISTS_CODE = 11000;
