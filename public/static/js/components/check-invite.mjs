import Preact, { Hooks, html } from '../preact/preact.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';
import { useApi } from '../api/api.mjs';
import { PreloaderContainer } from './preloader.mjs';
import { NotFoundContainer } from './not-found-container.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { style } from '../utils/style.mjs';

const preloaderContainerStyle = style({
  'margin-top': '150px',
});

const useInviteCheck = (inviteId) => {
  const ifMounted = useIfMounted();
  const [isChecking, setIsChecking] = Hooks.useState(false);
  const [exists, setExists] = Hooks.useState(undefined);
  const { checkInvite } = useApi();
  Hooks.useEffect(() => {
    setIsChecking(true);
    setExists(undefined);
    checkInvite(inviteId)
      .then(
        ifMounted(({ exists }) => {
          setExists(exists);
          setIsChecking(false);
        })
      )
      .catch(
        ifMounted(() => {
          setExists(false);
          setIsChecking(false);
        })
      );
  }, [inviteId]);
  return { isChecking, exists };
};

export const CheckInvite = ({ children }) => {
  const {
    params: { inviteId },
  } = useRouteData();
  const { exists, isChecking } = useInviteCheck(inviteId);

  if (isChecking) {
    return html`
      <div style=${preloaderContainerStyle}>
        <${PreloaderContainer} />
      </div>
    `;
  }

  if (!exists) {
    return html`
      <${NotFoundContainer}>
        Приглашение не найдено
      </${NotFoundContainer}>
    `;
  }

  return html`
    <${Preact.Fragment}>
      ${children(inviteId)}
    </${Preact.Fragment}>
  `;
};
