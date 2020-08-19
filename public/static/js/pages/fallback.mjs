import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { Container } from '../components/container.mjs';
import { Jumbotron } from '../components/jumbotron.mjs';

export const Fallback = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Jumbotron}>
        <${Container}>
          <h1>404</h1>
          <p>Страница не найдена.</p>
        </${Container}>
      </${Jumbotron}>
    </${Main}>
    </${Preact.Fragment}>
  `;
};
