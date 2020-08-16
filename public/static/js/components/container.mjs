import { html } from '../preact/preact.mjs';

export const Container = ({ children }) => {
  return html`
    <div className="container">
      ${children}
    </div>
  `;
};
