import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header, NavLink } from '../components/header.mjs';
import { PageContents } from '../components/page-contents.mjs';
import { RouteLike, RouteCategoriesByPage } from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { useApi } from '../api/api.mjs';

export const Page = () => {
  const { getSourceUrl } = useApi();
  const mountedRef = Hooks.useRef(false);
  const [mrakopediaUrl, setMrakopediaUrl] = Hooks.useState(null);

  const {
    params: { title },
  } = useRouteData();

  Hooks.useEffect(() => {
    mountedRef.current = true;

    getSourceUrl(title).then(({ url }) => {
      if (!mountedRef.current) {
        return;
      }

      setMrakopediaUrl(url);
    });

    return () => {
      mountedRef.current = false;
    };
  }, [title, getSourceUrl]);

  const navLinkClass = 'nav-link';
  const mrakopediaUrlLinkClasses = mrakopediaUrl
    ? navLinkClass
    : `${navLinkClass} disabled`;

  return html`
    <${Preact.Fragment}>
    <${Header}>
      <${NavLink} link=${RouteLike.link(decodeURIComponent(title))}>
        Похожие истории
      </${NavLink}>
      <${NavLink} link=${RouteCategoriesByPage.link(decodeURIComponent(title))}>
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
