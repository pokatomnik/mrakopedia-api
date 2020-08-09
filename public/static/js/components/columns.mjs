import { html } from '../preact.mjs';

export const LargeColumn = ({ title, children }) => {
  return html`
    <div class="col-lg-4">
      <h2>${title}</h2>
      <p>${children}</p>
    </div>
  `;
};

export const Row = ({ children }) => {
  return html`<div class="container">
    <div class="row">
      ${children}
    </div>
  </div>`;
};
