import { capitalize } from './utils';

interface IOptions {
  simpleTitle?: boolean;
}

const DEFAULT_OPTIONS: IOptions = {
  simpleTitle: false,
};

/**
 * Very simple page template renderer,
 * Probably It will be replaced with something
 * more feature-rich
 */
export class Page {
  private static DEFAULT_CHARACTERS_PER_MINUTE = 1500;

  private readonly options: IOptions;

  private pagesIndex = require('../public/static/files/pages-index.json');

  constructor(
    private readonly title: string,
    private readonly html: string,
    options: IOptions = DEFAULT_OPTIONS
  ) {
    this.title = title;
    this.html = html;
    this.options = options;
  }

  private get capitalizedTitle() {
    return capitalize(this.title);
  }

  private simpleTitle() {
    return `
      <h1>
        ${this.capitalizedTitle}
      </h1>
    `;
  }

  private getReadingTime(): number | null {
    const charsInPage = this.pagesIndex[this.title]?.readableCharacters ?? null;
    return typeof charsInPage === 'number'
      ? Math.ceil(charsInPage / Page.DEFAULT_CHARACTERS_PER_MINUTE)
      : charsInPage;
  }

  private detailedTitle() {
    return `
    <details>
      <summary>
        <h1 class="page-header">
          ${this.capitalizedTitle}
        </h1>
      </summary>
      <img
        src="/api/page/${this.title}/picture"
        class="mrakopedia-reader-logo"
        alt="Главное изображение"
      />
    </details>
  `;
  }

  public render() {
    const heading = this.options.simpleTitle
      ? this.simpleTitle()
      : this.detailedTitle();
    const readingTime = this.getReadingTime();
    return `
      <!doctype html>
      <html lang="ru">
          <head>
              <meta charset="utf-8" />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
              <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png">
              <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
              <link rel="manifest" href="/site.webmanifest">
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
              <meta name="msapplication-TileColor" content="#da532c">
              <meta name="theme-color" content="#ffffff">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap-reboot.css" />
              <link rel="stylesheet" href="/static/overrides.css" />
              <link rel="stylesheet" href="/static/custom-styles.css" />
              <title>${this.capitalizedTitle}</title>
          </head>
          <body>
              ${heading}
              ${
                readingTime !== null
                  ? `<p><strong>Время на чтение, минут: ${readingTime}</strong></p>`
                  : ''
              }
              ${this.html}
          </body>
      </html>
      `;
  }
}
