import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header, NavLink } from '../components/header.mjs';
import { PageContents } from '../components/page-contents.mjs';
import { RouteLike } from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';

export const Page = () => {
  const {
    params: { pageName },
  } = useRouteData();

  return html`
    <${Preact.Fragment}>
    <${Header}>
      <${NavLink} link=${RouteLike.link(pageName)}>
        Похожие истории
      </${NavLink}>
    </${Header}>
    <${Main}>
      <${PageContents} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
