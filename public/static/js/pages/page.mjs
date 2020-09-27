import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { NavLink } from '../components/header/nav-link.mjs';
import { PageContents } from '../components/page-contents.mjs';
import { RouteLike, RouteCategoriesByPage } from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { useApi } from '../api/api.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';

const useMrakopediaUrl = () => {
  const {
    params: { title },
  } = useRouteData();
  const { getSourceUrl } = useApi();
  const ifMounted = useIfMounted();
  const [mrakopediaUrl, setMrakopediaUrl] = Hooks.useState(null);

  Hooks.useEffect(() => {
    getSourceUrl(title).then(
      ifMounted(({ url }) => {
        setMrakopediaUrl(url);
      })
    );
  }, [title, getSourceUrl, ifMounted]);

  return mrakopediaUrl;
};

export const Page = () => {
  const {
    params: { title },
  } = useRouteData();
  const mrakopediaUrl = useMrakopediaUrl();

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
