import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { useApi } from '../api/api.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';

export const Favorites = () => {
  const { getAllFavorites } = useApi();
  const fetchPages = Hooks.useCallback(() => {
    return getAllFavorites();
  }, [getAllFavorites]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${PageResults}
        fetchPages=${fetchPages}
        groupBy=${groupByFirstLetter}
       />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
