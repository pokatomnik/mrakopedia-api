import { html } from '../preact/preact.mjs';
import { Container } from './container.mjs';

export const NotFoundContainer = ({ children }) => {
  return html`
  <${Container}>
    <h1>404</h1>
    <p>${children}</p>
  </${Container}>
  `;
};
