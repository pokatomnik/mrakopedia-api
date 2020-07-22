type IQueryResponse<K extends string, V extends unknown> = {
  [key in K]: V;
};

interface IContinue {
  cmcontinue: string;
  continue: string;
}

export interface IWikiQueryResponse<K extends string, V extends unknown> {
  batchcomplete: string;
  continue?: IContinue;
  query: IQueryResponse<K, V>;
}
