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
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap-reboot.css" />
              <link rel="stylesheet" href="/static/overrides.css" />
              <link rel="stylesheet" href="/static/custom-styles.css" />
              <title>${title}</title>
          </head>
          <body>
              <h1>
                ${title}
              </h1>
              ${this.html}
          </body>
      </html>
      `;
  }
}
