import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header/header.mjs';
import { NotFoundContainer } from '../components/not-found-container.mjs';
import { Jumbotron } from '../components/jumbotron.mjs';

export const Fallback = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Jumbotron}>
        <${NotFoundContainer}>
          Страница не найдена.
        </${NotFoundContainer}>
      </${Jumbotron}>
    </${Main}>
    </${Preact.Fragment}>
  `;
};
