type IQueryResponse<K extends string, V extends unknown> = {
  [key in K]: V;
};

export interface IWikiQueryResponse<K extends string, V extends unknown> {
  batchcomplete: string;
  query: IQueryResponse<K, V>;
}
