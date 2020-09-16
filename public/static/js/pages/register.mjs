import Preact, { html } from '../preact/preact.mjs';
import { Header } from '../components/header/header.mjs';
import { Main } from '../components/main.mjs';
import { Container } from '../components/container.mjs';
import { CheckInvite } from '../components/check-invite.mjs';
import { RegisterForm } from '../components/register-form.mjs';

export const Register = () => {
  return html`
    <${Preact.Fragment}>
      <${Header} />
      <${Main}>
        <${CheckInvite}>
          ${(inviteId) => html`
            <${Container}>
              <${RegisterForm} inviteId=${inviteId} />
            </${Container}>
          `}
        </${CheckInvite}>
      </${Main}>
    </${Preact.Fragment}>
  `;
};
