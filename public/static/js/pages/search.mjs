import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { SearchResults } from '../components/search-results.mjs';

export const Search = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${SearchResults} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
