import { html } from '../preact/preact.mjs';

export const Jumbotron = ({ children, textCenter = true }) => {
  const jumbotronClassName = `jumbotron`;
  const classNames = textCenter
    ? `${jumbotronClassName} text-center`
    : jumbotronClassName;

  return html`
    <section className=${classNames}>
      ${children}
    </section>
  `;
};
