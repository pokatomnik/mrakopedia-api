import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { useApi } from '../api/api.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';

export const Search = () => {
  const { search } = useApi();
  const {
    params: { searchInput },
  } = useRouteData();
  const fetchPages = Hooks.useCallback(() => {
    return search(searchInput);
  }, [searchInput, search]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${PageResults} fetchPages=${fetchPages} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
