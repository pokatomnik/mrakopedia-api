import Preact, { html } from '../preact.mjs';
import { style } from '../utils/style.mjs';

const BUTTON_STYLE = style({ margin: '0 2px' });

export class ActionButtons extends Preact.Component {
  constructor(props) {
    super(props);

    this.handleDownloadAPK = () => {
      window.open('/static/files/MrakopediaReader.apk', '_blank');
    };

    this.handleApplicationSourcesClick = () => {
      window.open('https://github.com/pokatomnik/mrakopedia-reader', '_blank');
    };

    this.handleServerSourcesClick = () => {
      window.open('https://github.com/pokatomnik/mrakopedia-api', '_blank');
    };
  }

  render() {
    return html`
      <p>
        <button
          onClick=${this.handleDownloadAPK}
          className="btn btn-primary my-2"
          style="${BUTTON_STYLE}"
        >
          Download APK
        </button>
        <button
          style="${BUTTON_STYLE}"
          onClick=${this.handleApplicationSourcesClick}
          className="btn btn-secondary my-2"
        >
          Application Sources
        </button>
        <button
          style="${BUTTON_STYLE}"
          onClick=${this.handleServerSourcesClick}
          className="btn btn-secondary my-2"
        >
          Server Sources
        </button>
      </p>
    `;
  }
}
