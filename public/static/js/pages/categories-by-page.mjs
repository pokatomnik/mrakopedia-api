import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { CategoriesList } from '../components/categories-list.mjs';
import { Container } from '../components/container.mjs';
import { apiCategoriesByPage } from '../api/api-routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';

export const CategoriesByPage = () => {
  const {
    params: { pageName },
  } = useRouteData();

  const fetchCategories = Hooks.useCallback(() => {
    return fetch(apiCategoriesByPage(pageName));
  }, [pageName]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">
          Категории истории "${decodeURIComponent(pageName)}"
        </h1>
      </${Container}>
      <${CategoriesList} fetchCategories=${fetchCategories} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
