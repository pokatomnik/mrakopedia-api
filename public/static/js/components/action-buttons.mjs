import { html } from '../preact/preact.mjs';
import { style } from '../utils/style.mjs';

const BUTTON_STYLE = style({ margin: '0 2px' });

export const ActionButtons = () => {
  return html`
    <p>
      <a
        href="/static/files/MrakopediaReader.apk"
        rel="noopener noreferrer"
        target="_blank"
        className="btn btn-primary my-2"
        style="${BUTTON_STYLE}"
      >
        Скачать APK
      </a>
      <a
        href="https://github.com/pokatomnik/mrakopedia-reader"
        rel="noopener noreferrer"
        target="_blank"
        style="${BUTTON_STYLE}"
        className="btn btn-secondary my-2"
      >
        Исходный код приложения
      </a>
      <a
        href="https://github.com/pokatomnik/mrakopedia-api"
        rel="noopener noreferrer"
        target="_blank"
        style="${BUTTON_STYLE}"
        className="btn btn-secondary my-2"
      >
        Исходный код сервера
      </a>
    </p>
  `;
};
