import Preact, { html } from '../preact/preact.mjs';
import { LoginForm } from '../components/login-form.mjs';
import { Header } from '../components/header/header.mjs';
import { Main } from '../components/main.mjs';
import { Container } from '../components/container.mjs';

export const Login = () => {
  return html`
    <${Preact.Fragment}>
      <${Header} />
      <${Main}>
        <${Container}>
          <${LoginForm} />
        </${Container}>
      </${Main}>
    </${Preact.Fragment}>
  `;
};
