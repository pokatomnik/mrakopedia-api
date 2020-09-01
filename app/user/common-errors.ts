import { Error } from '../utils';

export const NO_TOKEN = Error('NO_TOKEN', 'No jwt token provided');
export const NO_METHOD_ERROR = Error('NO_METHOD', 'Incorrect HTTP method');
export const INVALID_TOKEN = Error('INVALID_TOKEN', 'Invalid token');
