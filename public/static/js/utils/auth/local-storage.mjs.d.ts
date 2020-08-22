interface IStorage {
  get: () => string;
  set: (value: string) => void;
  remove: () => void;
  has: () => boolean;
}

export class Storage implements IStorage {
  constructor(key: string);
  get: () => string;
  set: (value: string) => void;
  remove: () => void;
  has: () => boolean;
}
