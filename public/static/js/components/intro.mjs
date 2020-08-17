import { html } from '../preact/preact.mjs';
import { ActionButtons } from './action-buttons.mjs';
import { Container } from './container.mjs';

export const Intro = () => {
  return html`
    <section className="jumbotron text-center">
      <${Container}>
        <img
          src="/static/img/comfy.png"
          className="img-fluid"
          alt="Responsive image"
        />
        <h1 className="jumbotron-heading">
          Mrakopedia Reader
        </h1>
        <p className="lead text-muted">
          Android-приложение для чтения историй из${' '}
          <a
            href="https://mrakopedia.net"
            rel="noreferrer noopener"
            target="_blank"
            >Mrakopedia</a
          >.
        </p>
        <${ActionButtons} />
      </${Container}>
    </section>
  `;
};
