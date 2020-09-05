import { Hooks, html } from '../../preact/preact.mjs';
import { RouteIndex, RouteLogin } from '../../routes.mjs';
import { useAuth } from '../../utils/auth/auth.mjs';
import { useRouteData } from '../../utils/router/route-component.mjs';

export const UserItems = () => {
  const { user, logout } = useAuth();
  const { push } = useRouteData();

  const handleLogout = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      if (!user) {
        return;
      }

      logout().then(() => {
        push(RouteIndex.link());
      });
    },
    [logout, user]
  );

  const handleLogin = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      if (user) {
        return;
      }
      push(RouteLogin.link());
    },
    [user]
  );

  const navMenuItemClass = 'dropdown-item';
  const loginMenuItemClasses = user
    ? `${navMenuItemClass} disabled`
    : navMenuItemClass;
  const logoutMenuItemClasses = user
    ? navMenuItemClass
    : `${navMenuItemClass} disabled`;

  return html`
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href=${`/#${RouteIndex.link()}`}
        id="user-dropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Пользователь
      </a>
      <div className="dropdown-menu" aria-labelledby="user-dropdown">
        <a
          className=${loginMenuItemClasses}
          href=${`/#${RouteLogin.link()}`}
          onClick=${handleLogin}
        >
          Войти
        </a>
        <a className=${logoutMenuItemClasses} href="#" onClick=${handleLogout}>
          Выйти
        </a>
      </div>
    </li>
  `;
};
