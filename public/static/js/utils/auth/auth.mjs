import Preact, { Hooks, html } from '../../preact/preact.mjs';
import { Storage } from './local-storage.mjs';
import { MD5 } from './MD5.mjs';
import { apiLogin } from '../../api/api-routes.mjs';

const TOKEN_KEY = 'x-token';

const noAuthProviderError = new Error('No AuthProvider');

const AuthContext = Preact.createContext({
  login: () => Promise.reject(noAuthProviderError),
  logout: () => Promise.reject(noAuthProviderError),
  getToken: () => {
    throw noAuthProviderError;
  },
  get user() {
    throw noAuthProviderError;
  },
});

const getUserFromToken = (token) => {
  const commonError = new Error(`Invalid token ${token}`);
  if (!token) {
    throw commonError;
  }

  const [, userDataString] = token.split('.');

  if (!userDataString) {
    throw commonError;
  }

  try {
    return JSON.parse(atob(userDataString));
  } catch (e) {
    throw new Error('Token has invalid data');
  }
};

export const AuthProvider = ({ children }) => {
  const storageRef = Hooks.useRef(new Storage(TOKEN_KEY));
  const [user, setUser] = Hooks.useState(
    storageRef.current.has() ? getUserFromToken(storageRef.current.get()) : null
  );

  const login = Hooks.useCallback((email, password) => {
    const passwordHash = MD5(password);
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('passwordHash', passwordHash);
    return fetch(apiLogin(), {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow',
      body: params,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Invalid credentials');
        } else {
          return res.json();
        }
      })
      .then(({ token }) => {
        storageRef.current.set(token);
        const userFromToken = getUserFromToken(token);
        setUser(userFromToken);
        return userFromToken;
      });
  }, []);

  const logout = Hooks.useCallback(() => {
    storageRef.current.remove();
    setUser(null);
    return Promise.resolve(null);
  }, []);

  const getToken = Hooks.useCallback(() => {
    return storageRef.current.get();
  }, []);

  const contextValue = Hooks.useMemo(
    () => ({
      getToken,
      login,
      logout,
      user,
    }),
    [getToken, login, logout, user]
  );

  return html`
    <${AuthContext.Provider} value=${contextValue}>
      ${children}
    </${AuthContext.Provider}>
  `;
};

export const useAuth = () => {
  return Hooks.useContext(AuthContext);
};
