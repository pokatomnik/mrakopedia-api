import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { Container } from '../components/container.mjs';
import { InvitesList } from '../components/invites-list.mjs';

export const MyInvites = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Container}>
        <h1 className="mt-5">Мои приглашения</h1>
      </${Container}>
      <${InvitesList} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
