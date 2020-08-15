import { UrlData } from './url-data.mjs';

const NO_MATCH = {
  match: false,
  params: undefined,
};

const PARAM_TAG = ':';

export const matchParams = (route, pattern) => {
  const routeUrlData = UrlData.fromString(route);
  const patternUrlData = UrlData.fromString(pattern);
  const routeParts = routeUrlData.getUrlParts();
  const patternParts = patternUrlData.getUrlParts();
  if (routeParts.length !== patternParts.length) {
    return NO_MATCH;
  }

  const routeParmsLength = routeParts.length;

  const params = {};

  for (let i = 0; i < routeParmsLength; ++i) {
    const routePart = routeParts[i];
    const patternPart = patternParts[i];
    if (!patternPart.startsWith(PARAM_TAG) && routePart !== patternPart) {
      return NO_MATCH;
    } else if (routePart === patternPart) {
      continue;
    } else if (patternPart.startsWith(PARAM_TAG)) {
      const tagName = patternPart.slice(1);
      params[tagName] = routePart;
    }
  }

  return {
    match: true,
    params,
  };
};

window.matchParams = matchParams;
