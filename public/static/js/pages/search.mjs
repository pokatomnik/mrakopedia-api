import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { apiSearch } from '../api/api-routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';

export const Search = () => {
  const {
    params: { searchInput },
  } = useRouteData();
  const fetchPages = Hooks.useCallback(() => {
    return fetch(apiSearch(searchInput)).then((res) => res.json());
  }, [searchInput]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${PageResults} fetchPages=${fetchPages} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
