import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { useApi } from '../api/api.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { Container } from '../components/container.mjs';

export const Like = () => {
  const { getRelated } = useApi();
  const {
    params: { title },
  } = useRouteData();

  const fetchPages = Hooks.useCallback(() => {
    return getRelated(title);
  }, [title, getRelated]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">
          Похожие на "${decodeURIComponent(title)}"
        </h1>
      </${Container}>
      <${PageResults} fetchPages=${fetchPages} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
