import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { useApi } from '../api/api.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';
import { Container } from '../components/container.mjs';

export const StoriesOfMonth = () => {
  const { getStoriesOfMonth } = useApi();
  const fetchPages = Hooks.useCallback(() => {
    return getStoriesOfMonth();
  }, [getStoriesOfMonth]);

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
