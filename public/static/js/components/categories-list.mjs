import Preact, { Hooks, html } from '../preact/preact.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { ListView } from './list-view.mjs';
import { apiCategories } from '../api/api-routes.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';
import { RoutePagesByCategory } from '../routes.mjs';
import { PreloaderContainer } from './preloader.mjs';

const NO_CATEGORIES = 'Не нашлось категорий:(';
const CATEGORIES_REQUEST_FAILED =
  'Получение категорий завершилось ошибкой, попробуйте позднее';
const NO_CATEGORY = 'Без категории';
const CATEGORIES_LOADING_MESSAGE = 'Загрузка категорий...';

const CategoryItem = ({ categoryTitle }) => {
  const { push } = useRouteData();
  const handleClick = Hooks.useCallback(() => {
    push(RoutePagesByCategory.link(categoryTitle));
  }, [push, categoryTitle]);
  return html`
    <a
      href=${`/#${RoutePagesByCategory.link(categoryTitle)}`}
      onClick=${handleClick}
    >
      ${categoryTitle}
    </a>
  `;
};

export const CategoriesList = () => {
  const mounted = Hooks.useRef(false);
  const [categories, setCategories] = Hooks.useState([]);
  const [error, setError] = Hooks.useState('');
  const [noResults, setNoResults] = Hooks.useState(false);
  const [isLoading, setIsLoading] = Hooks.useState(false);

  Hooks.useEffect(() => {
    mounted.current = true;
    setError('');
    setIsLoading(true);
    setNoResults(false);
    fetch(apiCategories())
      .then((res) => res.json())
      .then((res) => {
        if (!mounted.current) {
          return;
        }

        setCategories(res);
        setIsLoading(false);
        setNoResults(res.length === 0);
      })
      .catch(() => {
        if (!mounted.current) {
          return;
        }

        setError(CATEGORIES_REQUEST_FAILED);
        setIsLoading(false);
        setNoResults(false);
      });

    return () => {
      mounted.current = false;
    };
  }, []);

  if (isLoading) {
    return html`
      <${Preact.Fragment}>
        <${ListView}
          items=${[]}
          defaultName=${CATEGORIES_LOADING_MESSAGE}
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
        defaultName=${NO_CATEGORIES}
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
      items=${categories}
      defaultName=${NO_CATEGORY}
      groupBy=${groupByFirstLetter}
    >
      ${({ title }) => html`<${CategoryItem} categoryTitle=${title} />`}
    </${ListView}>
  `;
};
