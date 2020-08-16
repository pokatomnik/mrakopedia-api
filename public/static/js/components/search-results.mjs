import Preact, { Hooks, html } from '../preact/preact.mjs';
import { search } from '../api/api-routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { ListView } from './list-view.mjs';
import { RoutePage } from '../routes.mjs';

const SearchResultItem = ({ title }) => {
  const { push } = useRouteData();
  const handleClick = Hooks.useCallback(() => {
    push(RoutePage.link(title));
  }, [push, title]);
  return html`
    <a href=${`/#${RoutePage.link(title)}`} onClick=${handleClick}>
      ${title}
    </a>
  `;
};

export const SearchResults = () => {
  const {
    params: { searchInput },
  } = useRouteData();
  const [searchResults, setSearchResults] = Hooks.useState([]);
  const [error, setError] = Hooks.useState('');

  Hooks.useEffect(() => {
    setError('');
    fetch(search(searchInput))
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res);
      })
      .catch(() => {
        setError(
          'Поиск завершился ошибкой, попробуйте позднее или поменяйте строку поиска'
        );
      });
  }, [searchInput]);

  if (error) {
    return html`
      <${ListView}
        items=${[]}
        defaultName="Ошибка поиска"
      >
        ${() => html`<${Preact.Fragment} />`}
      </${ListView}>
    `;
  }

  return html`
    <${ListView}
      items=${searchResults}
      defaultName="Результаты поиска"
    >
      ${({ title }) => html`<${SearchResultItem} title=${title} />`}
    </${ListView}>
  `;
};
