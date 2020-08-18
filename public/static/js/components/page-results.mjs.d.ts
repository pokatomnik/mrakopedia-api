import { Element } from '../preact/preact.mjs';

interface IPage {
  title: string;
  url: string;
}

interface IPageResultsProps {
  fetchPages: () => Promise<Array<IPage>>;
  groupBy: (items: Array<IPage>) => Record<string, Array<IPage>>;
}

export function PageResults(props: IPageResultsProps): Element;
