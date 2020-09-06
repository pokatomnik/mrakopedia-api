# Mrakopedia reader API

[Mrakopedia](https://mrakopedia.net) is a wonderful Wiki project for sharing scary stories from the Internet.

The website's engine ([MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)) provides a rich API, but a lot of things there are not used by the Mrakopedia website.

The goal of this project is to provide a simple API for the [Mrakopedia Reader](https://github.com/pokatomnik/mrakopedia-reader) using Vercel's web [framework](https://vercel.com/).

## User-related methods:

### Login

```
POST /api/user?action=login
```

Body data should be:

```typescript
interface ILoginParams {
  email: string; // user email
  passwordHash: string; // md5 password hash
}
```

Response will be the error or the object containing success flag:

```typescript
interface ILoginSuccess {
  /**
   * JWT token, assign all further user-related request with It.
   * Place this token to a header named `x-token`
   */
  token: string;
}
```

### Check if token is valid:

```
GET /api/user?action=check
```

Place token to the header by key `x-token`. The result will be:

```typescript
interface ICheckResult {
  /**
   * Token state. `true` if valid and `false` otherwise
   */
  valid: boolean;
  /**
   * If `valid` is `false`, the description will be here. Or `undefined` if the token provided is valid
   */
  description?: string;
}
```

### Add page to favorites:

```
POST /api/user?action=favorite&favorite=PAGE_TITLE
```

### Remove pages from favorites:

```
DELETE /api/user?action=favorite&favorite=PAGE_TITLE
```

### Check if the page is in favorites:

```
GET /api/user?action=is-favorite&favorite=PAGE_TITLE
```

The result will be:

```typescript
interface IFavoriteFound {
  isFavorite: boolean;
  title: string;
}
```

### Get all user favorites:

```
GET /api/user?action=all-favorites
```

The result will be:

```typescript
interface IPage {
  title: string;
  url: string;
}
type Response = Array<IPage>;
```

### Invite user:

```
POST /api/user?action=invite
```

The result will be:

```typescript
interface IInvite {
  id: string;
  invitingUserId: string;
}
```

### Show my invites:

```
GET /api/user?action=my-invites
```

The result will be:

```typescript
interface IInvite {
  id: string;
  invitingUserId: string;
}
type Response = Array<IInvite>;
```

## Unprotected URLS are:

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
