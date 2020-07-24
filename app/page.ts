export const IGNORE_SELECTORS = [
  'div.box',
  'span.tocnumber',
  'span.mw-editsection',
  'div.spoilers-button-container',
  'div.rating_box',
  'img',
];

/**
 * Very simple page template renderer,
 * Probably It will be replaced with something
 * more feature-rich
 */
export class Page {
  private ignoreList: Array<string> = IGNORE_SELECTORS;

  private readonly title: string;

  private readonly html: string;

  constructor(title: string, html: string) {
    this.title = title;
    this.html = html;
  }

  public updateIgnoreList(
    mapList: (list: Array<string>) => Array<string> = (list) => list
  ): this {
    this.ignoreList = mapList(this.ignoreList);
    return this;
  }

  public render() {
    return `
      <!doctype html>
      <html>
          <head>
              <meta charset="utf-8" />
              <link rel="stylesheet" href="/static/style.css" />
              <title>${this.title}</title>
              <style>
                  ${this.ignoreList.join(', ')} {
                      display: none;
                  }
              </style>
          </head>
          <body>
              <h1>
                ${this.title}
              </h1>
              ${this.html}
          </body>
      </html>
      `;
  }
}
