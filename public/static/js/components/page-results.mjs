import Preact, { Hooks, html } from '../preact/preact.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { ListView } from './list-view.mjs';
import { RoutePage } from '../routes.mjs';

const PageResultItem = ({ title }) => {
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

export const PageResults = ({ fetchPages, groupBy }) => {
  const [searchResults, setSearchResults] = Hooks.useState([]);
  const [error, setError] = Hooks.useState('');

  Hooks.useEffect(() => {
    setError('');
    fetchPages()
      .then((res) => {
        setSearchResults(res);
      })
      .catch(() => {
        setError(
          'Поиск завершился ошибкой, попробуйте позднее или поменяйте строку поиска'
        );
      });
  }, [fetchPages]);

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
      groupBy=${groupBy}
    >
      ${({ title }) => html`<${PageResultItem} title=${title} />`}
    </${ListView}>
  `;
};
