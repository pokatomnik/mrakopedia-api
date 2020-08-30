import Preact, { html, Hooks } from '../preact/preact.mjs';
import {
  RouteIndex,
  RouteSearch,
  RouteCategories,
  RouteStoriesOfMonth,
  RouteLogin,
  RouteFavorites,
  RoutePage,
  RouteFallback,
} from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { useAuth } from '../utils/auth/auth.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';
import { useApi } from '../api/api.mjs';

const COLLAPSE_ID = 'navbarCollapse';

export const NavLink = ({ link, children }) => {
  const { push } = useRouteData();
  const handleClick = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      push(link);
    },
    [link, push]
  );
  return html`
    <li className="nav-item">
      <a className="nav-link" href=${`/#${link}`} onClick=${handleClick}>
        ${children}
      </a>
    </li>
  `;
};

export const Header = ({ children }) => {
  const ifMounted = useIfMounted();
  const { push } = useRouteData();
  const { user, logout } = useAuth();
  const { getRandom } = useApi();
  const [searchString, setSearchString] = Hooks.useState('');

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

  const handlePushIndex = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      push(RouteIndex.link());
    },
    [push]
  );

  const handleInput = Hooks.useCallback(({ currentTarget: { value } }) => {
    setSearchString(value);
  }, []);

  const handleSubmit = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      push(RouteSearch.link(searchString));
    },
    [searchString, push]
  );

  const handleRandomClick = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      getRandom()
        .then(
          ifMounted(({ title }) => {
            push(RoutePage.link(title));
          })
        )
        .catch(
          ifMounted(() => {
            push(RouteFallback.link());
          })
        );
    },
    [getRandom, push, ifMounted]
  );

  const navMenuItemClass = 'dropdown-item';
  const loginMenuItemClasses = user
    ? `${navMenuItemClass} disabled`
    : navMenuItemClass;
  const logoutMenuItemClasses = user
    ? navMenuItemClass
    : `${navMenuItemClass} disabled`;

  const favoritesLink = user
    ? html`<${NavLink} link=${RouteFavorites.link()}>
      Избранное
    </${NavLink}>`
    : html`<${Preact.Fragment} />`;

  return html`
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <a
          className="navbar-brand"
          href=${`/#${RouteIndex.link()}`}
          onClick=${handlePushIndex}
        >
          ${user ? user.userName : 'MrakopediaReader'}
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#${COLLAPSE_ID}"
          aria-controls="${COLLAPSE_ID}"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="${COLLAPSE_ID}">
          <ul className="navbar-nav mr-auto">
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
                <a
                  className=${logoutMenuItemClasses}
                  href="#"
                  onClick=${handleLogout}
                >
                  Выйти
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick=${handleRandomClick}>
                Случайная страница
              </a>
            </li>
            <${NavLink} link=${RouteCategories.link()}>
              Категории
            </${NavLink}>
            <${NavLink} link=${RouteStoriesOfMonth.link()}>
              Истории месяца
            </${NavLink}>
            ${favoritesLink}
            ${children}
          </ul>
          <form className="form-inline mt-2 mt-md-0" onSubmit=${handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Навание истории..."
              aria-label="Название истории..."
              value=${searchString}
              onInput=${handleInput}
            />
            <button
              className="btn btn-primary my-2 my-sm-0"
              type="submit"
              disabled=${!searchString}
            >
              Поиск
            </button>
          </form>
        </div>
      </nav>
    </header>
  `;
};
