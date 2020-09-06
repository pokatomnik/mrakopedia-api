import Preact, { Hooks, html } from '../preact/preact.mjs';
import { ListView } from './list-view.mjs';
import { PreloaderContainer } from './preloader.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';
import { useApi } from '../api/api.mjs';
import { Container } from './container.mjs';

const NO_INVITES = 'Нет активных приглашений';
const INVITES_REQUEST_FAILED =
  'Загрузка приглашений завершилась ошибкой, попробуйте позднее.';
const LOADING_MESSAGE = 'Загрузка приглашений';

const InviteItem = ({ uuid }) => {
  const inputRef = Hooks.useRef(null);
  const handleFocus = Hooks.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  // TODO: replace this hardcoded "register/" string with a route `link()` method result
  return html`
    <input
      onFocus=${handleFocus}
      ref=${inputRef}
      className="form-control mr-sm-2"
      readonly
      type="text"
      aria-label="Название истории..."
      value=${`${window.location.origin}/#/register/${uuid}`}
    />
  `;
};

export const InvitesList = () => {
  const { getMyInvites, invite } = useApi();
  const ifMounted = useIfMounted();
  const [invites, setInvites] = Hooks.useState([]);
  const [error, setError] = Hooks.useState('');
  const [noResults, setNoResults] = Hooks.useState(false);
  const [isLoading, setIsLoading] = Hooks.useState(false);
  const [isInviting, setIsInviting] = Hooks.useState(false);

  const loadInvites = Hooks.useCallback(() => {
    setError('');
    setIsLoading(true);
    setNoResults(false);

    getMyInvites()
      .then(
        ifMounted((res) => {
          setInvites(res);
          setIsLoading(false);
          setNoResults(res.length === 0);
        })
      )
      .catch(
        ifMounted(() => {
          setError(INVITES_REQUEST_FAILED);
          setIsLoading(false);
          setNoResults(false);
        })
      );
  }, [ifMounted, getMyInvites]);

  const handleInviteClick = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (isInviting) {
        return;
      }
      setIsInviting(true);
      invite()
        .then(() => {
          setIsInviting(false);
          loadInvites();
        })
        .catch(() => {
          setIsInviting(false);
          alert('Не удалось пригласить, попробуйте позже');
        });
    },
    [invite, isInviting]
  );

  Hooks.useEffect(() => {
    loadInvites();
  }, [loadInvites]);

  if (isLoading) {
    return html`
      <${Preact.Fragment}>
        <${ListView} items=${[]} defaultName=${LOADING_MESSAGE}>
          ${() => html`<${Preact.Fragment} />`}
        </${ListView}>
        <${PreloaderContainer}>
      </${Preact.Fragment}>
    `;
  }

  if (noResults) {
    return html`
      <${ListView}
        items=${[]}
        defaultName=${NO_INVITES}
      >
        ${() => html`<${Preact.Fragment} />`}
      </${ListView}>
    `;
  }

  if (error) {
    return html`
      <${ListView}
        items=${[]}
        defaultName=${error}
      >
        ${() => html`<${Preact.Fragment} />`}
      </${ListView}>
    `;
  }

  return html`
    <${Preact.Fragment}>
      <${Container}>
        <a
          href="#"
          className=${isInviting ? 'btn-link disabled' : 'btn-link'}
          onClick=${handleInviteClick}
        >
          Пригласить
        </a>
        ${isInviting && ' (создаем приглашение...)'}
      </${Container}>
      <${ListView}
        items=${invites}
        defaultName="Поделитесь одной из ссылок ниже"
      >
        ${({ uuid }) => html`<${InviteItem} uuid=${uuid}></${InviteItem}>`}
      </${ListView}>
    </${Preact.Fragment}>
  `;
};
