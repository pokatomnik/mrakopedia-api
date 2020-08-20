import { html, Hooks } from '../preact/preact.mjs';
import {
  RouteIndex,
  RouteSearch,
  RouteCategories,
  RouteStoriesOfMonth,
} from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';

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
  const { push } = useRouteData();
  const [searchString, setSearchString] = Hooks.useState('');

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

  return html`
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="/#" onClick=${handlePushIndex}>
          MrakopediaReader
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
            <${NavLink} link=${RouteCategories.link()}>
              Категории
            </${NavLink}>
            <${NavLink} link=${RouteStoriesOfMonth.link()}>
              Истории месяца
            </${NavLink}>
            ${children}
          </ul>
          <form className="form-inline mt-2 mt-md-0" onSubmit=${handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Навание истории..."
              aria-label="Название истории..."
              value=${searchString}
              onChange=${handleInput}
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Поиск
            </button>
          </form>
        </div>
      </nav>
    </header>
  `;
};
