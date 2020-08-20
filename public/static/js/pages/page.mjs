import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header, NavLink } from '../components/header.mjs';
import { PageContents } from '../components/page-contents.mjs';
import { RouteLike, RouteCategoriesByPage } from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { apiSourceUrl } from '../api/api-routes.mjs';

export const Page = () => {
  const mountedRef = Hooks.useRef(false);
  const [mrakopediaUrl, setMrakopediaUrl] = Hooks.useState(null);

  const {
    params: { pageName },
  } = useRouteData();

  Hooks.useEffect(() => {
    mountedRef.current = true;

    fetch(apiSourceUrl(pageName))
      .then((res) => res.json())
      .then(({ url }) => {
        if (!mountedRef.current) {
          return;
        }

        setMrakopediaUrl(url);
      });

    return () => {
      mountedRef.current = false;
    };
  }, [pageName]);

  const navLinkClass = 'nav-link';
  const mrakopediaUrlLinkClasses = mrakopediaUrl
    ? navLinkClass
    : `${navLinkClass} disabled`;

  return html`
    <${Preact.Fragment}>
    <${Header}>
      <${NavLink} link=${RouteLike.link(pageName)}>
        Похожие истории
      </${NavLink}>
      <${NavLink} link=${RouteCategoriesByPage.link(pageName)}>
        Категории истории
      </${NavLink}>
      <li className="nav-item">
        <a
          className=${mrakopediaUrlLinkClasses}
          href=${mrakopediaUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Читать на Мракопедии
        </a>
      </li>
    </${Header}>
    <${Main}>
      <${PageContents} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
