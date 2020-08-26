import JWT from 'jsonwebtoken';
import { getSecret } from './secret';

export const verify = <T>(token: string) =>
  new Promise<T>((resolve, reject) => {
    JWT.verify(token, getSecret(), (err: Error | null, decoded: any) => {
      if (err || !decoded) {
        reject(err ?? new Error('Invalid token'));
      } else {
        resolve(decoded);
      }
    });
  });
