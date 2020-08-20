import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { PageResults } from '../components/page-results.mjs';
import { apiRelated } from '../api/api-routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { Container } from '../components/container.mjs';

export const Like = () => {
  const {
    params: { pageName },
  } = useRouteData();

  const fetchPages = Hooks.useCallback(() => {
    return fetch(apiRelated(pageName)).then((res) => res.json());
  }, [pageName]);

  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">
          Похожие на "${decodeURIComponent(pageName)}"
        </h1>
      </${Container}>
      <${PageResults} fetchPages=${fetchPages} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
