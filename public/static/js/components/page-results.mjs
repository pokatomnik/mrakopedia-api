import Preact, { Hooks, html } from '../preact/preact.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { ListView } from './list-view.mjs';
import { RoutePage } from '../routes.mjs';
import { PreloaderContainer } from './preloader.mjs';

const SEARCH_ERROR =
  'Поиск завершился ошибкой, попробуйте позднее или поменяйте строку поиска';
const NO_RESULTS_MESSAGE = 'Нет результатов по данному запросу:(';
const PAGE_RESULTS = 'Результаты поиска';
const LOADING_MESSAGE = 'Загрузка историй...';

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
  const mounted = Hooks.useRef(false);
  const [searchResults, setSearchResults] = Hooks.useState([]);
  const [error, setError] = Hooks.useState('');
  const [noResults, setNoResults] = Hooks.useState(false);
  const [isLoading, setIsLoading] = Hooks.useState(false);

  Hooks.useEffect(() => {
    mounted.current = true;
    setError('');
    setIsLoading(true);
    setNoResults(false);

    fetchPages()
      .then((res) => {
        if (!mounted.current) {
          return;
        }

        setSearchResults(res);
        setIsLoading(false);
        setNoResults(res.length === 0);
      })
      .catch(() => {
        if (!mounted.current) {
          return;
        }

        setError(SEARCH_ERROR);
        setIsLoading(false);
        setNoResults(false);
      });
    return () => {
      mounted.current = false;
    };
  }, [fetchPages]);

  if (isLoading) {
    return html`
      <${Preact.Fragment}>
        <${ListView}
          items=${[]}
          defaultName=${LOADING_MESSAGE}
        >
          ${() => html`<${Preact.Fragment} />`}
        </${ListView}>
        <${PreloaderContainer} />
      </${Preact.Fragment}>
    `;
  }

  if (noResults) {
    return html`
      <${ListView}
        items=${[]}
        defaultName=${NO_RESULTS_MESSAGE}
      >
        ${() => html`<${Preact.Fragment} />`}
      </${ListView}>
    `;
  }

  if (error) {
    return html`
      <${ListView}
        items=${[]}
        defaultName=${error}
      >
        ${() => html`<${Preact.Fragment} />`}
      </${ListView}>
    `;
  }

  return html`
    <${ListView}
      items=${searchResults}
      defaultName=${PAGE_RESULTS}
      groupBy=${groupBy}
    >
      ${({ title }) => html`<${PageResultItem} title=${title} />`}
    </${ListView}>
  `;
};
