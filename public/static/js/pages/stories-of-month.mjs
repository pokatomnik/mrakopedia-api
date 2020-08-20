import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { apiStoriesOfMonth } from '../api/api-routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';
import { Container } from '../components/container.mjs';

export const StoriesOfMonth = () => {
  const fetchPages = Hooks.useCallback(() => {
    return fetch(apiStoriesOfMonth()).then((res) => res.json());
  }, []);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">
          Истории месяца
        </h1>
      </${Container}>
      <${PageResults} fetchPages=${fetchPages} groupBy=${groupByFirstLetter} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
