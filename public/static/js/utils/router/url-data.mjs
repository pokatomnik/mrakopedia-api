export class UrlData {
  constructor(pathName, options = {}) {
    this._pathName = pathName;
    this._options = options;
  }

  getPathName() {
    return this._pathName;
  }

  getUrlParts() {
    return this._pathName.split('/').filter(Boolean);
  }

  getOptions() {
    return this._options;
  }

  getHash() {
    const isOptionsEmpty = Object.keys(this._options).length === 0;
    if (isOptionsEmpty) {
      return this._pathName;
    }

    const queryString = Object.entries(this._options).reduce(
      (acc, [key, value]) => {
        if (value === true) {
          return `${acc}&${key}`;
        } else {
          return `${acc}&${key}=${value}`;
        }
      },
      ''
    );
    return `${this._pathName}?${queryString}`;
  }
}

UrlData.fromString = function (path) {
  const url = new URL(path, window.location.toString());
  const pathName = url.pathname;
  const optionsString = url.search ? url.search : '?';
  const options = optionsString
    .slice(1)
    .split('&')
    .reduce((acc, currentPairStr) => {
      const [key, valueRaw] = currentPairStr.split('=');
      if (!key) {
        return acc;
      }
      const value = valueRaw || true;
      return {
        ...acc,
        [key]: value,
      };
    }, {});

  return new UrlData(pathName, options);
};
