import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { CategoriesList } from '../components/categories-list.mjs';
import { Container } from '../components/container.mjs';
import { apiCategories } from '../api/api-routes.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';

export const Categories = () => {
  const fetchCategories = Hooks.useCallback(() => {
    return fetch(apiCategories());
  }, []);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">Категории</h1>
      </${Container}>
      <${CategoriesList}
        fetchCategories=${fetchCategories}
        groupBy=${groupByFirstLetter}
      />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
