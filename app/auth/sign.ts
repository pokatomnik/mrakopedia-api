import JWT from 'jsonwebtoken';
import { getSecret } from './secret';

interface ISignParams {
  email: string;
  id: string;
}

export const sign = ({ email, id }: ISignParams) =>
  new Promise<string>((resolve, reject) => {
    JWT.sign(
      { email, id },
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
