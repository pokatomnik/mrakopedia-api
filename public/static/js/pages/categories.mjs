import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { CategoriesList } from '../components/categories-list.mjs';
import { Container } from '../components/container.mjs';

export const Categories = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">Категории</h1>
      </${Container}>
      <${CategoriesList} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
