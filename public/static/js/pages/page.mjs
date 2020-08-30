import Preact, { html, Hooks } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header, NavLink } from '../components/header.mjs';
import { PageContents } from '../components/page-contents.mjs';
import { RouteLike, RouteCategoriesByPage } from '../routes.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { useApi } from '../api/api.mjs';
import { useAuth } from '../utils/auth/auth.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';

const useIsFavorite = () => {
  const {
    params: { title },
  } = useRouteData();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = Hooks.useState(null);
  const ifMounted = useIfMounted();
  const { isFavorite: checkIsFavorite } = useApi();

  Hooks.useEffect(() => {
    if (!user) {
      return;
    }
    checkIsFavorite(title).then(
      ifMounted(({ isFavorite }) => {
        setIsFavorite(isFavorite);
      })
    );
  }, [title, checkIsFavorite, user, ifMounted]);
  return isFavorite;
};

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
  const ifMounted = useIfMounted();
  const { addToFavorites, removeFromFavorites } = useApi();
  const mrakopediaUrl = useMrakopediaUrl();
  const isFavoriteInitial = useIsFavorite();
  const [isFavorite, setIsFavorite] = Hooks.useState(null);
  Hooks.useEffect(() => {
    setIsFavorite(isFavoriteInitial);
  }, [isFavoriteInitial]);

  const navLinkClass = 'nav-link';
  const mrakopediaUrlLinkClasses = mrakopediaUrl
    ? navLinkClass
    : `${navLinkClass} disabled`;

  const handleToggleFavoriteClick = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const oldValue = isFavorite;
      setIsFavorite(!isFavorite);
      (isFavorite ? removeFromFavorites : addToFavorites)(title).catch(
        ifMounted(() => {
          setIsFavorite(oldValue);
        })
      );
    },
    [title, isFavorite, addToFavorites, removeFromFavorites, ifMounted]
  );

  const favoritesBlock =
    isFavorite === null
      ? html`<${Preact.Fragment} />`
      : html`<li class="nav-item">
          <a class="nav-link" href="#" onClick=${handleToggleFavoriteClick}>
            ${isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          </a>
        </li>`;

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
      ${favoritesBlock}
    </${Header}>
    <${Main}>
      <${PageContents} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
