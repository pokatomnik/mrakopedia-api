import { applyMiddlewares, cors } from './middleware';

export const withCors = applyMiddlewares(cors);
