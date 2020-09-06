import { Hooks, html } from '../../preact/preact.mjs';
import { RouteIndex, RouteLogin, RouteMyInvites } from '../../routes.mjs';
import { useAuth } from '../../utils/auth/auth.mjs';
import { useRouteData } from '../../utils/router/route-component.mjs';

const getMenuItemClass = (disabled) => {
  return 'dropdown-item'.concat(disabled ? ' disabled' : '');
};

export const UserItems = () => {
  const { user, logout } = useAuth();
  const { push } = useRouteData();

  const handleLogout = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
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
      evt.stopPropagation();
      if (user) {
        return;
      }
      push(RouteLogin.link());
    },
    [user]
  );

  const goToMyInvites = Hooks.useCallback(() => {
    push(RouteMyInvites.link());
  }, [push]);

  const handleMyInvites = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      goToMyInvites();
    },
    [push, goToMyInvites]
  );

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
          className=${getMenuItemClass(!user)}
          href=${`/#${RouteLogin.link()}`}
          onClick=${handleLogin}
        >
          Войти
        </a>
        <a
          className=${getMenuItemClass(Boolean(user))}
          href="#"
          onClick=${handleLogout}
        >
          Выйти
        </a>
        ${user &&
        html`
          <a
            href=${`/#${RouteMyInvites.link()}`}
            className=${getMenuItemClass(!user)}
            onClick=${handleMyInvites}
          >
            Мои приглашения
          </a>
        `}
      </div>
    </li>
  `;
};
