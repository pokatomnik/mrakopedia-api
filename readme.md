# Mrakopedia reader API

[Mrakopedia](https://mrakopedia.net) is a wonderful Wiki project for sharing scary stories from the Internet.

The website's engine ([MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)) provides a rich API, but a lot of things there are not used by the Mrakopedia website.

The goal of this project is to provide a simple API for the [Mrakopedia Reader](https://github.com/pokatomnik/mrakopedia-reader) using Vercel's web [framework](https://vercel.com/).

## API URLs are:

### Search

```
GET /api/search/SEARCH_KEYWORD
```

Will return the list of pages:

```typescript
interface IPage {
  title: string;
  url: string;
}
type Response = Array<IPage>;
```

### Get Reader-friendly HTML

```
GET /api/page/TITLE
```

Will return Reader-friendly page HTML

### Get the pages related to page with TITLE:

```
GET /api/page/TITLE/related
```

Will return the list of pages related to choosen one:

```typescript
interface IPage {
  title: string;
  url: string;
}
type Response = Array<IPage>;
```

### Get the categories related to page with TITLE:

```
GET /api/page/TITLE/categories
```

Will return the list of categories related to choosen one:

```typescript
interface ICategory {
  title: string;
  url: string;
}
type Response = Array<ICategory>;
```

### Get the main picture related to page with TITLE:

```
GET /api/page/TITLE/picture
```

Will return the image (`jpg`/`png`/`svg`) for the page

### Get the source url for the page with TITLE:

```
GET /api/page/TITLE/source
```

Will return the link to the Mrakopedia:

```typescript
interface IMrakopediaSource {
  title: string;
  url: string;
}
```

### Get all categories (500 max)

```
GET /api/categories
```

Will return the list of categories:

```typescript
interface ICategory {
  title: string;
  url: string;
}
type Response = Array<ICategory>;
```

### Get all pages by category

```
GET /api/categories/CATEGORY_NAME
```

Will return the list of pages related to choosen category:

```typescript
interface IPage {
  title: string;
  url: string;
}
type Response = Array<IPage>;
```

### Get random page

```
GET /api/random
```

Will return the random page:

```typescript
interface IPage {
  title: string;
  url: string;
}
```

### Get stories of the month

```
GET /api/hotm
```

Will return the list of stories of month:

```typescript
interface IPage {
  title: string;
  url: string;
}
type Response = Array<IPage>;
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

## Checking Typescript files

```
npm run tscheck
```
