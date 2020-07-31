# Mrakopedia reader API

[Mrakopedia](https://mrakopedia.net) is a wonderful Wiki project for sharing scary stories from the Internet.

The website's engine ([MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)) provides a rich API, but a lot of things there are not used by the Mrakopedia website.

The goal of this project is to provide a simple API for the [Mrakopedia Reader](https://github.com/pokatomnik/mrakopedia-reader) using Vercel's web [framework](https://vercel.com/).

## Available URLS are:

Search

```
/api/search/SEARCH_KEYWORD
```

Get Reader-friendly HTML

```
/api/page/TITLE
```

Get the pages related to page with TITLE:

```
/api/page/TITLE/related
```

Get the categories related to page with TITLE:

```
/api/page/TITLE/categories
```

Get the main picture related to page with TITLE:

```
/api/page/TITLE/picture
```

Get all categories (500 max)

```
/api/categories
```

Get all pages by category

```
/api/categories/CATEGORY_NAME
```

Get random page

```
/api/random
```

Get stories of the month

```
/api/hotm
```

Please note, `SEARCH_KEYWORD`, `TITLE`, and `CATEGORY_NAME` should be escaped first.

## Running dev server

```
npm start
```

## Deploying to development

```
npm run deploy:dev
```

## Deploying to production

```
npm run deploy:prod
```
