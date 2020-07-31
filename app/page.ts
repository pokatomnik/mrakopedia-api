import { capitalize } from './utils';

/**
 * Very simple page template renderer,
 * Probably It will be replaced with something
 * more feature-rich
 */
export class Page {
  private readonly title: string;

  private readonly html: string;

  constructor(title: string, html: string) {
    this.title = title;
    this.html = html;
  }

  public render() {
    const title = capitalize(this.title);
    return `
      <!doctype html>
      <html>
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
              <title>${title}</title>
          </head>
          <body>
              <details>
                <summary>
                  <h1>
                    ${title}&#8287;<span class="show-hide">(показать/скрыть)</span>
                  </h1>
                </summary>
                <img
                  src="/api/page/${this.title}/picture"
                  class="mrakopedia-reader-logo"
                  alt="Главное изображение"
                />
              </details>
              ${this.html}
          </body>
      </html>
      `;
  }
}
