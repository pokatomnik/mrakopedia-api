import Preact, { Hooks, html } from '../preact/preact.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { ListView } from './list-view.mjs';
import { apiCategories } from '../api/api-routes.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';
import { RoutePagesByCategory } from '../routes.mjs';

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
  const [categories, setCategories] = Hooks.useState([]);
  const [error, setError] = Hooks.useState('');

  Hooks.useEffect(() => {
    setError('');
    fetch(apiCategories())
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      })
      .catch(() => {
        setError('Получение категорий завершилось ошибкой, попробуйте позднее');
      });
  }, []);

  if (error) {
    return html`
      <${ListView}
        items=${[]}
        defaultName="Ошибка получения категорий"
      >
        ${() => html`<${Preact.Fragment} />`}
      </${ListView}>
    `;
  }

  return html`
    <${ListView}
      items=${categories}
      defaultName="Без категории"
      groupBy=${groupByFirstLetter}
    >
      ${({ title }) => html`<${CategoryItem} categoryTitle=${title} />`}
    </${ListView}>
  `;
};
