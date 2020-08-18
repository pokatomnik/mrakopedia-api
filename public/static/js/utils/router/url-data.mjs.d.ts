export interface IUrlData {
  getPathName: () => string;
  getUrlParts: () => Array<string>;
  getOptions: () => Record<string, string | boolean>;
  getHash: () => string;
}

export class UrlData implements IUrlData {
  public static fromString = function (path: string): IUrlData {};
  constructor(
    pathName: string,
    options?: Record<string, string | boolean>
  ): IUrlData;
  getPathName: () => string;
  getUrlParts: () => Array<string>;
  getOptions: () => Record<string, string | boolean>;
  getHash: () => string;
}
