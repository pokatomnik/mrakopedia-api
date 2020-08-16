import { html } from '../preact/preact.mjs';
import { ActionButtons } from './action-buttons.mjs';

export const Intro = () => {
  return html`
    <section className="jumbotron text-center">
      <div className="container">
        <img
          src="/static/img/comfy.png"
          className="img-fluid"
          alt="Responsive image"
        />
        <h1 className="jumbotron-heading">
          Mrakopedia Reader
        </h1>
        <p className="lead text-muted">
          Android application for reading stories from the${' '}
          <a
            href="https://mrakopedia.net"
            rel="noreferrer noopener"
            target="_blank"
            >Mrakopedia</a
          >.
        </p>
        <${ActionButtons} />
      </div>
    </section>
  `;
};
