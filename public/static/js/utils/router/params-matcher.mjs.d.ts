interface IMatch {
  match: boolean;
  params: Record<string, string | boolean>;
}

export function matchParams(route: string, pattern: string): IMatch;
