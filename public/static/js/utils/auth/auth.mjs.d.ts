import { Element } from '../../preact/preact.mjs';

interface IAuthProviderProps {
  children: Element;
}

interface IUserData {
  email: string;
  id: string;
  userName: string;
}

interface IAuthContextValue {
  login: (email: string, password: string) => Promise<IUserData>;
  logout: () => Promise<null>;
  getToken: () => string;
  user: IUserData;
}

export function AuthProvider(props: IAuthProviderProps): Element;

export function useAuth(): IAuthContextValue;
