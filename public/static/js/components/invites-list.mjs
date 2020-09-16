import Preact, { Hooks, html } from '../preact/preact.mjs';
import { ListView } from './list-view.mjs';
import { PreloaderContainer } from './preloader.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';
import { useApi } from '../api/api.mjs';
import { Container } from './container.mjs';
import { RouteRegister } from '../routes.mjs';

const NO_INVITES = 'Нет активных приглашений';
const INVITES_REQUEST_FAILED =
  'Загрузка приглашений завершилась ошибкой, попробуйте позднее.';
const LOADING_MESSAGE = 'Загрузка приглашений';

const InviteItem = ({ id, onRemoveClick }) => {
  const inputRef = Hooks.useRef(null);
  const handleFocus = Hooks.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const handleRemoveClick = Hooks.useCallback(() => {
    onRemoveClick(id);
  }, [id, onRemoveClick]);

  // TODO: replace this hardcoded "register/" string with a route `link()` method result
  return html`
    <div className="input-group mb-3">
      <input
        onFocus=${handleFocus}
        ref=${inputRef}
        className="form-control"
        readonly
        type="text"
        aria-label="Название истории..."
        value=${`${window.location.origin}/#${RouteRegister.link(id)}`}
      />
      <div className="input-group-append">
        <button
          className="btn btn-danger"
          type="button"
          onClick=${handleRemoveClick}
        >
          Удалить
        </button>
      </div>
    </div>
  `;
};

export const InvitesList = () => {
  const { getMyInvites, invite, removeInviteById } = useApi();
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

  const handleRemoveClick = Hooks.useCallback(
    (id) => {
      const oldInvites = invites;
      const invitesFiltered = invites.filter((invite) => invite.id !== id);
      setInvites(invitesFiltered);
      setNoResults(!invitesFiltered.length);
      removeInviteById(id).catch(
        ifMounted(() => {
          setInvites(oldInvites);
          setNoResults(!oldInvites.length);
          alert('Не удалось удалить приглашение, попробуйте позднее');
        })
      );
    },
    [invites]
  );

  const inviteEl = html`
    <${Container}>
      <a
        href="#"
        className=${isInviting ? 'btn-link disabled' : 'btn-link'}
        onClick=${handleInviteClick}
      >
        Пригласить
      </a>
      ${isInviting && ' (создаем приглашение...)'}
    </${Container} />
  `;

  if (isLoading) {
    return html`
      <${Preact.Fragment}>
        <${ListView} items=${[]} defaultName=${LOADING_MESSAGE}>
          ${() => html`<${Preact.Fragment} />`}
        </${ListView}>
        <${PreloaderContainer} />
      </${Preact.Fragment}>
    `;
  }

  if (noResults) {
    return html`
      <${Preact.Fragment}>
        ${inviteEl}
        <${ListView}
          items=${[]}
          defaultName=${NO_INVITES}
        >
          ${() => html`<${Preact.Fragment} />`}
        </${ListView}>
      </${Preact.Fragment}>
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
      ${inviteEl}
      <${ListView}
        items=${invites}
        defaultName="Поделитесь одной из ссылок ниже"
      >
        ${({ id }) =>
          html`<${InviteItem} id=${id} onRemoveClick=${handleRemoveClick} />`}
      </${ListView}>
    </${Preact.Fragment}>
  `;
};
