import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { useApi } from '../api/api.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { groupByFirstLetter } from '../utils/group-by-first-letter.mjs';
import { Container } from '../components/container.mjs';

export const PagesByCategory = () => {
  const { getPagesByCategory } = useApi();
  const {
    params: { title },
  } = useRouteData();
  const fetchPages = Hooks.useCallback(() => {
    return getPagesByCategory(title);
  }, [title, getPagesByCategory]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">
          Категория: ${decodeURIComponent(title)}
        </h1>
      </${Container}>
      <${PageResults} fetchPages=${fetchPages} groupBy=${groupByFirstLetter} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
