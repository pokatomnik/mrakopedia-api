export interface IReadableCharactersInfo {
  readonly readableCharacters: number;
}

export interface IVotedInfo {
  rating: number;
  voted: number;
}

export interface IPageMetaInfo extends IReadableCharactersInfo, IVotedInfo {}
