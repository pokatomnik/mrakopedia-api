import JWT from 'jsonwebtoken';
import { getSecret } from './secret';

export interface ISignParams {
  email: string;
  id: string;
  userName: string;
}

export const sign = ({ email, id, userName }: ISignParams) =>
  new Promise<string>((resolve, reject) => {
    JWT.sign(
      { email, id, userName },
      getSecret(),
      (err: Error | null, encoded: string | undefined) => {
        if (err || !encoded) {
          reject(err ?? new Error('Unauthorized'));
        } else {
          resolve(encoded);
        }
      }
    );
  });
