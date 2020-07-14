export const Page = (title: string, html: string) =>
  `
<!doctype html>
<html prefix="og: http://ogp.me/ns#">
    <head>
        <meta charset="utf-8" />
        <meta property="og:url" content="https://mylink.com" />
        <title>${title}</title>
        <style>
            div.box, span.tocnumber, span.mw-editsection, div.rating_box {
                display: none;
            }
        </style>
    </head>
    <body>
        ${html}
    </body>
</html>
`;
