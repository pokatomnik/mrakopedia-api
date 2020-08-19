import { html } from '../preact/preact.mjs';
import { style } from '../utils/style.mjs';

const PRELOADER_SRC = '/static/img/preloader.gif';
const PRELOADER_ALT_TEXT = 'Загрузка';

const IMAGE_CONTAINER_STYLE = style({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
});

export const Preloader = () => {
  return html` <img src=${PRELOADER_SRC} alt=${PRELOADER_ALT_TEXT} /> `;
};

export const PreloaderContainer = () => {
  return html`
    <div className="container" style=${IMAGE_CONTAINER_STYLE}>
      <${Preloader} />
    </div>
  `;
};
