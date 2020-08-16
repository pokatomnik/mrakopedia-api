import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { apiPagesByCategory } from '../api/api-routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';

export const PagesByCategory = () => {
  const {
    params: { categoryName },
  } = useRouteData();
  const fetchPages = Hooks.useCallback(() => {
    return fetch(apiPagesByCategory(categoryName)).then((res) => res.json());
  }, [categoryName]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${PageResults} fetchPages=${fetchPages} groupBy=${groupByFirstLetter} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
