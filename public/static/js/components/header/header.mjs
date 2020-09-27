import { html, Hooks } from '../../preact/preact.mjs';
import {
  RouteIndex,
  RouteCategories,
  RouteStoriesOfMonth,
  RoutePage,
  RouteFallback,
} from '../../routes.mjs';
import { useRouteData } from '../../utils/router/route-component.mjs';
import { useIfMounted } from '../../utils/if-mounted.mjs';
import { useApi } from '../../api/api.mjs';
import { SearchForm } from './search-form.mjs';
import { NavLink } from './nav-link.mjs';

const COLLAPSE_ID = 'navbarCollapse';

export const Header = ({ children }) => {
  const ifMounted = useIfMounted();
  const { push } = useRouteData();
  const { getRandom } = useApi();

  const handlePushIndex = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      push(RouteIndex.link());
    },
    [push]
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

  return html`
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <a
          className="navbar-brand"
          href=${`/#${RouteIndex.link()}`}
          onClick=${handlePushIndex}
        >
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
            ${children}
          </ul>
          <${SearchForm} />
        </div>
      </nav>
    </header>
  `;
};
