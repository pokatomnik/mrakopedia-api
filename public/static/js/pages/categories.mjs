import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { CategoriesList } from '../components/categories-list.mjs';

export const Categories = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${CategoriesList} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
